// ./server/routes/artworksRoutes.js
// Sub-Routes for '/artworks' API Branch
// Author: Brett DeWitt
// Created: Saturday, November 9, 2024, 10:56:00 AM
//
// Description:
// This file defines the routes for the '/artworks' branch of the API. These routes
// provide CRUD (Create, Read, Update, Delete) operations for managing artwork records
// and allow for retrieving associated data like users and likes. It is a key part of
// the system's functionality, enabling interaction with the artworks resource.
//
// Routes:
// - GET '/': Retrieves a list of artworks, optionally paginated with limit and offset.
// - GET '/:id': Retrieves an artwork by its ID.
// - GET '/:id/user': Retrieves the user associated with a specific artwork by its ID.
// - GET '/:id/likes': Retrieves likes associated with a specific artwork by its ID.
// - POST '/': Creates a new artwork.
// - PUT '/:id': Updates an existing artwork by its ID.
// - DELETE '/:id': Deletes an artwork by its ID.


// --------------------- Package Imports ---------------------
const router = require('express').Router();
const artworksController = require('../controllers/artworksController');


// --------------------- Route Definitions ---------------------

// GET a list of artworks with optional pagination (limit and offset), sorted by most recent
router.get('/', artworksController.getAllArtworks)

// GET a single artwork by its ID
router.get('/:id', artworksController.getArtworkById)

// GET the user associated with a specific artwork by its ID
router.get('/:id/user', artworksController.getArtworkUser)

// GET the likes associated with a specific artwork by its ID
router.get('/:id/likes', artworksController.getArtworkLikes)

// POST a new artwork to the database
router.post('/', artworksController.createArtwork)

// PUT updates to an existing artwork by its ID
router.put('/:id', artworksController.updateArtwork)

// DELETE an artwork from the database by its ID
router.delete('/:id', artworksController.deleteArtwork)


// Export router
module.exports = router;
