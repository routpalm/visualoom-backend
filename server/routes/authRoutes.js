// ./server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// TODO: Save new users

// POST /oauth2
router.post('/oauth2', authController.verifyOauth2Token);


module.exports = router;
