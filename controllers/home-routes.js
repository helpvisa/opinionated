// dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');
const auth = require('../utils/auth');
const {Post, User, Comment, Like, Dislike} = require('../models');

// homepage
router.get('/', (req, res) => {
    // get post data
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
            ],
            [ // return a like count after the post is liked
                sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count'
            ]
        ],
        order: [['created_date', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(data => {
        // map and serialize
        const posts = data.map(post => post.get({plain: true}));
        // render page and pass in posts
        res.render('homepage', {posts, loggedIn: req.session.loggedIn, user: req.session.username});
    }).catch(err => {
        console.log(err);
        res.status(500).send("<h1>500!</h1>");
    });
});

// single post page
router.get('/post/:id', (req, res) => {
    // get post data
    Post.findOne({
        where: {
            id: req.params.id
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
            ],
            [ // return a like count after the post is liked
                sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count'
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
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    }).then(data => {
        // map and serialize
        const post = data.get({plain: true});
        // render page and pass in posts
        res.render('single-post', {post, loggedIn: req.session.loggedIn, user: req.session.username});
    }).catch(err => {
        console.log(err);
        res.status(500).send("<h1>500!</h1>");
    });
});

// user page
router.get('/:user', (req, res) => {
    // get user
    User.findOne({
        where: {
            username: req.params.user
        },
        attributes: { exclude: ['password'] }
    }).then(data => {
        // reject if user not found
        if (!data) {
            res.status(404).send("<h1>404!</h1>");
            return;
        }
        // get post data
        Post.findAll({
            where: {
                user_id: data.id
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
                ],
                [ // return a like count after the post is liked
                    sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count'
                ]
            ],
            order: [['created_date', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        }).then(data => {
            // map and serialize
            const posts = data.map(post => post.get({ plain: true }));
            // render page and pass in posts
            res.render('user', {posts, loggedIn: req.session.loggedIn, user: data[0].user.username});
        }).catch(err => {
            console.log(err);
            res.status(500).send("<h1>500!</h1>");
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send("<h1>500!</h1>");
    });
});

// export
module.exports = router;