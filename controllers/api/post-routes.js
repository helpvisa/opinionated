// dependencies
const router = require('express').Router();
const auth = require('../../utils/auth');
const {Post, User, Comment, Like, Dislike} = require('../../models');
const sequelize = require('../../config/connection'); // for literals

// GET all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'name',
            'content',
            'created_date',
            'updated_at',
            [ // return a like count after the post is liked
                sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'like_count'
            ],
            [ // return a like count after the post is liked
                sequelize.literal('(SELECT COUNT(*) FROM dislikes WHERE post.id = dislikes.post_id)'), 'dislike_count'
            ]
        ],
        order: [['created_date', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'content',
                    'post_id',
                    'user_id',
                    'created_date',
                    'updated_at'
                ],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// GET single post
router.get('/:id', (req, res) => {
    Post.findAll({
        where: {
            'id': req.params.id
        },
        attributes: [
            'id',
            'name',
            'content',
            'created_date',
            'updated_at',
            [ // return a like count after the post is liked
                sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'like_count'
            ],
            [ // return a like count after the post is liked
                sequelize.literal('(SELECT COUNT(*) FROM dislikes WHERE post.id = dislikes.post_id)'), 'dislike_count'
            ]
        ],
        order: [['created_date', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'content',
                    'post_id',
                    'user_id',
                    'created_date',
                    'updated_at'
                ],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
    .then(data => {
        if (!data) {
            res.status(404).json({
                message: "No post found with ID of " + req.params.id
            });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST a post :^)
router.post('/', auth, (req, res) => {
    // expects title, text, and user_id
    Post.create({
        name: req.body.name,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE a post
router.delete('/:id', auth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id
        }
    })
    .then(data => {
        if (!data) {
            res.status(404).json({
                message: "Could not find post with ID of " + req.params.id
            });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT (update) a post
router.put('/:id', auth, (req, res) => {
    // expects title, text
    Post.update(
        {
            name: req.body.name,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(data => {
        if (!data) {
            res.status(404).json({
                message: "Could not find post with ID of " + req.params.id
            });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// LIKE a post
router.put('/like/:id', auth, (req, res) => {
    Like.create({
        user_id: req.session.user_id,
        post_id: req.params.id
    }).then(() => {
        Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'name',
                [ // return a like count after the post is liked
                    sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'like_count'
                ]
            ]
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DISLIKE a post
router.put('/dislike/:id', auth, (req, res) => {
    Dislike.create({
        user_id: req.session.user_id,
        post_id: req.params.id
    }).then(() => {
        Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'name',
                [ // return a like count after the post is liked
                    sequelize.literal('(SELECT COUNT(*) FROM dislikes WHERE post.id = dislikes.post_id)'), 'dislike_count'
                ]
            ]
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// export
module.exports = router;