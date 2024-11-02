// ./server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');


// Redirect user to google login
router.get('/google/login',
    authController.loginWithGoogle);

// Successful Google logins redirect to this route
// Processes the authentication response and then handles the user session
router.get('/google/callback',
    authController.authenticateGoogleResponse,
    authController.handleGoogleCallback
);

// Logs user out of Google and, hopefully, the app
// TODO: Add error handling to logout
router.get('/google/logout',
    authController.logoutFromGoogle);

module.exports = router;
