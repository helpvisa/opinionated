// dependencies
const router = require('express').Router();
const auth = require('../../utils/auth');
const {User} = require('../../models');

// GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET single user
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {exclude: ['password']}
    })
    .then(data => {
        if (!data) {
            res.status(404).json({
                message: 'No user data found with matching ID of ' + req.params.id
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

// POST a new user
router.post('/', (req, res) => {
    // expects username and pass in JSON
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(data => {
        req.session.save(() => { // store user's session data as they create their new account
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true; // set status to logged in

            res.json({
                message: 'New account for ' + data.username + ' successfully created.'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// login route
router.post('/login', (req, res) => {
    // expects username and pass
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(async (data) => {
        if (!data) {
            res.status(400).json({
                message: 'No user found with matching username of ' + req.body.username
            });
            return;
        }

        // load hashed password and cross-check
        const valid = await data.checkPass(req.body.password);

        if (!valid) {
            res.status(400).json({
                message: 'Incorrect password for ' + req.body.username
            });
            return;
        }

        // save session and log in
        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;

            res.json({
                message: 'Successfully logged in as ' + data.username
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// logout route
router.post('/logout', auth, (req, res) => { // add auth check
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// to-do: add liked/disliked posts to user routes (for profiles)

// export routes
module.exports = router;