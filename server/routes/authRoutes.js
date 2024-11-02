// ./server/routes/authRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/AuthController');


// what the user POSTs to (why is it a get?)
router.get('/google/login', authController.googleLogin);

// what the user gets as a response (admission to /dashboard or etc.)
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  authController.googleCallback
);

// logout route (done easily by google)
router.get('/google/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
