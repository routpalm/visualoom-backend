// ./server/routes/authRoutes.js
// Sub-Routes for '/auth' API Branch
// Author: Brett DeWitt
// Created: Friday, November 8, 2024, 2:19:49 PM
//
// Description:
// This file defines the routes under the '/auth' endpoint of the API.
// It includes functionality for verifying Google OAuth2 tokens, enabling
// user authentication and integration with Google's authentication system.
//
// Routes:
// - POST '/oauth2': Verifies Google's OAuth2 token and processes authentication.


// --------------------- Package Imports ---------------------
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// --------------------- Route Definitions ---------------------
// Verifies Google's OAuth2 token received from the client
router.post('/oauth2', authController.verifyOauth2Token);


// Export router
module.exports = router;
