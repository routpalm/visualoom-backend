// ./server/routes/userRoutes.js
// Sub-Routes for '/users' API Branch
// Author: Brett DeWitt
// Created: Friday, November 8, 2024, 6:37:36 PM
//
// Description:
// This file defines the routes under the '/users' endpoint of the API.
// It provides various operations related to user resources, such as
// retrieving user data, creating new users, updating user information,
// and deleting users. Additional sub-routes are included to retrieve
// related resources like user artwork and likes.
//
// Routes:
// - GET '/map-jwt': Maps a decoded JSON Web Token (JWT) to a user record.
// - GET '/:id': Retrieves a user by their ID.
// - GET '/:id/likes': Retrieves the likes of a specific user.
// - GET '/:id/artwork': Retrieves the artworks of a specific user.
// - POST '/': Creates a new user record.
// - PUT '/:id': Updates the information of an existing user.
// - DELETE '/:id': Deletes a user record by their ID.


// --------------------- Package Imports ---------------------
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { decodeJWTAndMapUser } = require('../controllers/authController');


// Maps a decoded JSON Web Token (JWT) to a user record, creating a new user if necessary
router.get('/map-jwt', decodeJWTAndMapUser);

// Retrieves a user by their unique ID
router.get('/:id', usersController.getUserById)

// Retrieves the likes associated with a specific user
router.get('/:id/likes', usersController.getUserLikes)

// Retrieves the artworks associated with a specific user
router.get('/:id/artwork', usersController.getUserArtworks)


// Creates a new user in the database
router.post('/', usersController.createUser);

// Updates an existing user by their unique ID
router.put('/:id', usersController.updateUser)

// Deletes a user record by their unique ID
router.delete('/:id', usersController.deleteUser)


// Export the router
module.exports = router;
