// ./server/routes/likeRoutes.js
// Sub-Routes for '/likes' API Branch
// Author: Brett DeWitt
// Created: Saturday, November 9, 2024, 1:29:19 PM
//
// Description:
// This file defines the routes under the '/likes' endpoint of the API.
// It provides operations for managing likes associated with users and
// artworks. These routes include functionality for creating, updating,
// retrieving, and deleting likes, as well as accessing associated user
// and artwork data.
//
// Routes:
// - GET '/': Retrieves all likes.
// - GET '/:id': Retrieves a like by its ID.
// - GET '/:id/user': Retrieves the user associated with a specific like.
// - GET '/:id/artwork': Retrieves the artwork associated with a specific like.
// - POST '/': Creates a new like.
// - PUT '/:id': Updates a like by its ID.
// - DELETE '/:id': Deletes a like by its ID.


// --------------------- Package Imports ---------------------
const router = require("express").Router();
const likesController = require("../controllers/likesController");


// --------------------- Route Definitions ---------------------

// Retrieves all likes in the system
router.get("/", likesController.getLikes)

// Retrieves a like by its unique ID
router.get("/:id", likesController.getLikeById)

// Retrieves the user associated with a specific like
router.get("/:id/user", likesController.getLikeUser)

// Retrieves the artwork associated with a specific like
router.get("/:id/artwork", likesController.getLikeArtwork)

// Creates a new like record in the database
router.post("/", likesController.createLike)

// Updates an existing like by its unique ID
router.put("/:id", likesController.modifyLike)

// Deletes a like record by its unique ID
router.delete("/:id", likesController.deleteLike)


// export the router
module.exports = router;
