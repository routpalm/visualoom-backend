// ./server/routes/baseRoutes.js
// Base Route for the API
// Author: Brett DeWitt
// Created: Sunday, October 27, 2024, 9:59:47 PM
//
// Description:
// This file defines the base route for the API. The root endpoint ('/') provides
// a basic response for verifying the API is running and accessible. This can
// serve as a health check or an entry point for documentation links or status
// information.
//
// Routes:
// - GET '/': Returns a default response from the base controller.


// --------------------- Package Imports ---------------------
const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController');


// --------------------- Route Definitions ---------------------

// Handles GET requests to the root endpoint of the API
router.get('/', baseController.getBaseResponse);


// Export router
module.exports = router;
