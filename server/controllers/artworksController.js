// ./server/controllers/artworksController.js

// Author - Brett DeWitt
// Created - Saturday, November 9, 2024, 10:55:32 AM
// Provides the logic for the '/artworks' endpoints in the application
// Handles retrieving, creating, updating, and deleting artworks, as well as fetching associated user and like data


// ---------------------- Import Models ----------------------

// Import the Artwork, Like, and User models for interacting with the database.
const { Artwork, Like, User } = require('../models');


// ---------------------- Get All Artworks ----------------------
/**
 * Handler to fetch a list of artworks with pagination support.
 * Fetches artworks based on query parameters 'n' (number of artworks) and 'offset'.
 * @param {Object} req - The request object containing 'n' and 'offset' query parameters.
 * @param {Object} res - The response object that will contain the list of artworks or an error message.
 */
exports.getAllArtworks = async (req, res) => {
    try {
        const n = parseInt(req.query.n) || 20;  // Default to 20
        const offset = parseInt(req.query.offset) || 0; // Default to 0

        const artworks = await Artwork.findAll({
            limit: n,
            offset: offset,
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: Like,
                    as: 'likes'
                }
            ]

        });

        if (artworks.length > 0) {
            res.status(200).json(artworks);
        } else {
            res.status(404).json({message: 'No Artwork found'});
        }

    }
    catch (error) {
        console.error('Error fetching Artworks', error);
        res.status(500).json({error: 'Failed to fetch artworks'});
    }
}


// ---------------------- Get Artwork by ID ----------------------
/**
 * Handler to fetch an artwork by its ID.
 * @param {Object} req - The request object containing the artwork ID as a parameter.
 * @param {Object} res - The response object that will contain the artwork data or an error message.
 */
exports.getArtworkById = async (req, res) => {
    try {
        const { id } = req.params
        const artwork = await Artwork.findByPk( id,{
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: Like,
                    as: 'likes'
                }
            ]
        })

        if (!artwork) {
            return res.status(404).json({ error: 'Artwork not found.' });
        }

        res.status(200).json(artwork);
    } catch (error) {
        console.error('Error retrieving artwork:', error);
        res.status(500).json({ error: 'Failed to fetch artworks' });
    }
}


// ---------------------- Get Artwork by ID ----------------------
/**
 * Handler to fetch an artwork by its ID.
 * @param {Object} req - The request object containing the artwork ID as a parameter.
 * @param {Object} res - The response object that will contain the artwork data or an error message.
 */
exports.getArtworkUser = async (req, res) => {
    try {
        const { id } = req.params;

        const artwork = Artwork.findByPk(id,{
            include: [
                {
                    model: User,
                    as: 'user'
                }]
        })
        if (!artwork) return res.status(404).json({message: 'No Artwork found'});
        res.status(200).json(artwork.user);
    }
    catch (error) {
        res.status(500).json({error: 'Failed to fetch artwork user'});
    }
}


// ---------------------- Get Artwork Likes ----------------------
/**
 * Handler to fetch the likes associated with an artwork by its ID.
 * @param {Object} req - The request object containing the artwork ID as a parameter.
 * @param {Object} res - The response object that will contain the likes or an error message.
 */
exports.getArtworkLikes = async (req, res) => {
    try {
        const { id } = req.params;
        const artwork = Artwork.findByPk(id,{
            include: [{ model: Like, as: 'likes' }]
        });
        if (!artwork) return res.status(404).json({message: 'No Artwork found'});
        res.status(200).json(artwork.likes);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch artworks'});
    }
}


// ---------------------- Create Artwork ----------------------
/**
 * Handler to create a new artwork.
 * @param {Object} req - The request object containing the userId, algorithm, exifData, colorPalette, and pixelCluster for the new artwork.
 * @param {Object} res - The response object that will contain the created artwork or an error message.
 */
exports.createArtwork = async (req, res) => {
    try {
        const { userId, algorithm, exifData, colorPalette, pixelCluster } = req.body;

        const newArtwork = await Artwork.create({
            userId,
            algorithm,
            exifData: JSON.stringify(exifData), // Store as JSON string
            colorPalette: JSON.stringify(colorPalette), // Store as JSON string
            pixelCluster: JSON.stringify(pixelCluster), // Store as JSON string
        });

        res.status(201).json(newArtwork);
    } catch (error) {
        console.error('Error creating artwork:', error);
        res.status(500).json({ error: 'Failed to create artwork' });
    }
};


// ---------------------- Update Artwork ----------------------
/**
 * Handler to modify the details of an existing artwork.
 * @param {Object} req - The request object containing the artwork ID as a parameter and the new details in the body.
 * @param {Object} res - The response object that will contain the updated artwork or an error message.
 */
exports.updateArtwork = async (req, res) => {
    try {
        const { id } = req.params;
        const { algorithm, exifData, colorPalette, pixelCluster } = req.body;

        const artwork = await Artwork.findByPk(id);
        if (!artwork) {
            return res.status(404).json({ error: 'Artwork not found' });
        }

        artwork.algorithm = algorithm || artwork.algorithm;
        artwork.exifData = exifData ? JSON.stringify(exifData) : artwork.exifData;
        artwork.colorPalette = colorPalette ? JSON.stringify(colorPalette) : artwork.colorPalette;
        artwork.pixelCluster = pixelCluster ? JSON.stringify(pixelCluster) : artwork.pixelCluster;

        await artwork.save();
        res.status(200).json(artwork);
    } catch (error) {
        console.error('Error updating artwork:', error);
        res.status(500).json({ error: 'Failed to update artwork' });
    }
};


// ---------------------- Delete Artwork ----------------------
/**
 * Handler to delete an artwork by its ID.
 * @param {Object} req - The request object containing the artwork ID as a parameter.
 * @param {Object} res - The response object that will indicate the success or failure of the deletion.
 */
exports.deleteArtwork = async (req, res) => {
    try {
        const { id } = req.params;
        const artwork = await Artwork.findByPk(id);
        if (!artwork) return res.status(404).json({message: 'Artwork not found'});
        await artwork.destroy()
        res.status(204).send(); // empty record
    }
    catch (error) {
        console.error('Error deleting Artwork object:', error);
        res.status(500).json({error: 'Failed to delete artwork'});
    }
}
