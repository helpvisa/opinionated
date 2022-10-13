const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
// const dashRoutes = require('./dash-routes');

// use routes
router.use('/api', apiRoutes);
// router.use('/dash', dashRoutes);
router.use('/', homeRoutes);

// 404
router.use((req, res) => {
  res.send("<h1>404!</h1>")
});

module.exports = router;