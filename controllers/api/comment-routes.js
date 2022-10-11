// dependencies
const router = require('express').Router();
const auth = require('../../utils/auth');
const {Comment, User, Post} = require('../../models');

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

// to-do: add like + dislike routes to comments

// export
module.exports = router;