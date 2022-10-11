// dependencies
const router = require('express').Router();
const userRoutes = require('./user-routes'); // routes for user creation / login / deletion
const postRoutes = require('./post-routes'); // routes for post creation / editing / deletion
const commentRoutes = require('./comment-routes'); // routes for commention creation / deletion

// use routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// export routes
module.exports = router;