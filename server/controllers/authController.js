const passport = require('passport');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.googleLogin = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
}

exports.googleCallback = (req, res) => {
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

exports.googleLogout = (req, res) => {
    req.logout();
}