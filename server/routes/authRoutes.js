// setting up authentication routes (need regular auth/google and auth/google/callback)
const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// what the user POSTs to
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// what the user gets as a response (admission to /dashboard or etc.)
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
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
);

// logout route (done easily by google)
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;