// ./server/controllers/authController.js


const passport = require('passport');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.loginWithGoogle = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
}

exports.handleGoogleCallback = async (req, res) => {
    const googleUser = req.user; // Obtained from Google profile through passport
    let user = await User.findOne({ where: { googleId: googleUser.id } });

    // Check if user already exists
    if (!user) {
        // If user doesn't exist, create a new one
        user = await User.create({
            googleId: googleUser.id,
            email: googleUser.emails[0].value,
            name: googleUser.displayName,
            // Other fields as needed
        });
    }

    // Generate JWT for the user (existing or new)
    const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    // Send the token to the frontend
    res.json({ token });
};

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

exports.verifyJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded;  // attaching the decoded user info to the request
        next();
    });
};
