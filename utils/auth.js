// authentication function for routes
const auth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login'); // change to redirect to login route
    } else {
        next();
    }
};

module.exports = auth;