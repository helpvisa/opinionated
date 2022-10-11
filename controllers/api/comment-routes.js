// dependencies
const router = require('express').Router();
const auth = require('../../utils/auth');
const {Comment, User, Post, Like, Dislike} = require('../../models');
const sequelize = require('../../config/connection'); // for literals

// GET all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'content',
            'user_id',
            'post_id'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['name', 'content']
            }
        ]
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST a new comment
router.post('/', auth, (req, res) => {
    // check user is logged in
    if (req.session) {
        Comment.create({
            content: req.body.content,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    } else {
        res.status(404).json({
            message: 'Not logged in!'
        });
    }
});

// DELETE a comment
router.delete('/:id', auth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if (!data) {
            res.status(404).json({
                message: 'No comment found with ID of ' + req.params.id
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

// LIKE a comment
router.put('/like/:id', auth, (req, res) => {
    Like.create({
        user_id: req.session.user_id,
        comment_id: req.params.id
    }).then(() => {
        Comment.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'name',
                [ // return a like count after the post is liked
                    sequelize.literal('(SELECT COUNT(*) FROM likes WHERE comment.id = likes.comment_id)'), 'like_count'
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

// DISLIKE a comment
router.put('/dislike/:id', auth, (req, res) => {
    Dislike.create({
        user_id: req.session.user_id,
        comment_id: req.params.id
    }).then(() => {
        Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'name',
                [ // return a like count after the post is liked
                    sequelize.literal('(SELECT COUNT(*) FROM dislikes WHERE comment.id = dislikes.comment_id)'), 'dislike_count'
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