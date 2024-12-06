// ./server/routes/adminRoutes.js
// Sub-Routes for '/admin' API Branch
// Author: Brett DeWitt
// Created: Wednesday, December 4, 2024, 9:11:43 PM
//
// Description:
// This file defines the admin-specific routes for the '/admin' branch of the API.
// Currently, it includes a route for resetting the database. This route is restricted
// to the development environment to ensure it is not inadvertently executed in production.
// it was necessary to implement in order to control the database when performing
// integration tests.
//
// Routes:
// - GET '/resetdb': Resets the database to its initial state. This route is available
//   only in development and test environments to facilitate testing and debugging.


// --------------------- Package Imports ---------------------
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


// --------------------- Route Definitions ---------------------

// Admin route to reset the database, available only in development environment
if (process.env.NODE_ENV === 'development') {
    router.get('/resetdb', adminController.resetdb);
}


// Export router
module.exports = router;
