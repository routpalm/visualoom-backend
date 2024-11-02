// ./server/controllers/authController.js


const passport = require('passport');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.loginWithGoogle = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
}

exports.handleGoogleCallback = (req, res) => {
    // after successful verification, generate JWT
    const user = req.user;  // we are assuming user info is available

    // create JWT with user ID and relevant data
    const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }  // token exp. time (need to have it for security)
    );

    // send token to frontend
    res.json({ token });
}

exports.authenticateGoogleResponse = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/' })(req, res, next);
}

exports.logoutFromGoogle = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}
