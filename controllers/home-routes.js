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
        res.render('homepage', {posts, loggedIn: req.session.loggedIn});
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// export
module.exports = router;