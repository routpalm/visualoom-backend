// ./server/routes/helloWorldRoutes.js
// Sub-Routes for '/helloWorlds' API Branch
// Author: Brett DeWitt
// Created: Sunday, October 27, 2024, 9:59:47 PM
//
// Description:
// This file defines the routes under the '/helloWorlds' endpoint of the API.
// It provides operations for creating, retrieving, updating, and deleting
// HelloWorld resources. Additionally, protected routes requiring JWT
// authentication are defined for secured access to the same operations.
//
// Routes:
// - GET '/': Retrieves HelloWorld objects filtered by query parameters.
// - GET '/:id': Retrieves a HelloWorld object by its unique ID.
// - POST '/': Creates a new HelloWorld object.
// - PUT '/:id': Updates an existing HelloWorld object by its ID.
// - DELETE '/:id': Deletes an existing HelloWorld object by its ID.
// - Protected versions of the above routes are accessible via '/protected'.


// --------------------- Package Imports ---------------------
const express = require('express');
const router = express.Router();
const helloWorldController = require('../controllers/helloWorldController');
const { verifyJWT } = require('../controllers/authController');


// --------------------- Route Definitions ---------------------

// Public Routes
// Retrieves HelloWorld objects filtered by query parameters
router.get('/', helloWorldController.getHelloWorld);

// Retrieves a HelloWorld object by its unique ID
router.get('/:id', helloWorldController.getHelloWorldById);

// Creates a new HelloWorld object
router.post('/', helloWorldController.createHelloWorld);

// Updates an existing HelloWorld object by its unique ID
router.put('/:id', helloWorldController.modifyHelloWorld);

// Deletes an existing HelloWorld object by its unique ID
router.delete('/:id', helloWorldController.deleteHelloWorld)


// Protected Routes (require JWT authentication)
// Retrieves HelloWorld objects filtered by query parameters
router.get('/protected',
    verifyJWT,
    helloWorldController.getHelloWorld);

// Retrieves a HelloWorld object by its unique ID
router.get('/protected/:id',
    verifyJWT,
    helloWorldController.getHelloWorldById);

// Creates a new HelloWorld object
router.post('/protected/',
    verifyJWT,
    helloWorldController.createHelloWorld);

// Updates an existing HelloWorld object by its unique ID
router.put('/protected/:id',
    verifyJWT,
    helloWorldController.modifyHelloWorld);

// Deletes an existing HelloWorld object by its unique ID
router.delete('/protected/:id',
    verifyJWT,
    helloWorldController.deleteHelloWorld)


// Export the router
module.exports = router;
