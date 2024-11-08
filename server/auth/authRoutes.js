// ./server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const authController = require('./authController');

// Google OAuth2 Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Redirect user to google login
// TODO: Consider renaming to /google/connect as this will handle login and signup
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

// POST /oauth2
router.post('/oauth2', async (req, res) => {
    const { idToken } = req.body;
    console.log(req.body);

    if (!idToken) {
        return res.status(400).json({ error: 'ID token is required' });
    }

    try {
        // Verify the ID token
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID, // Replace with your Google Client ID
        });

        const payload = ticket.getPayload();
        const userId = payload['sub']; // Google user ID

        // Generate a JWT for the user
        const token = jwt.sign({ userId, email: payload.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(401).json({ error: 'Invalid ID token' });
    }
});


module.exports = router;
