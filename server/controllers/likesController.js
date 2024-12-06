// ./server/controllers/likesController.js

// Author - Brett DeWitt
// Created - Saturday, November 9, 2024, 1:30:03 PM
// Provides logic for '/likes' endpoint in the application
// Handles creating, fetching, modifying, and deleting likes, as well as fetching associated user and artwork data


// ---------------------- Import Models ----------------------
/**
 * Import the Like, User, and Artwork models for interacting with the database.
 * @module models
 */
const { Like, User, Artwork } = require('../models');


// ---------------------- Get Likes ----------------------
/**
 * Handler to fetch a list of likes with pagination support.
 * Fetches likes based on query parameters 'limit' and 'offset'.
 * @param {Object} req - The request object containing 'limit' and 'offset' query parameters.
 * @param {Object} res - The response object that will contain the list of likes or an error message.
 */
exports.getLikes = async (req, res) => {
    try {

        const offset = req.query.offset || 0;
        const limit = req.query.limit || 1;

        const likes = await Like.findAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: Artwork,
                    as: 'artwork'
                }
            ]
        });

        if (likes.length > 0) {
            res.status(200).json(likes);
        } else {
            res.status(404).json({message: 'No Likes found'});
        }
    } catch (error) {
        console.error('Error fetching Likes', error);
    }
}


// ---------------------- Get Like by ID ----------------------
/**
 * Handler to fetch a like by its ID.
 * @param {Object} req - The request object containing the like ID as a parameter.
 * @param {Object} res - The response object that will contain the like data or an error message.
 */
exports.getLikeById = async (req, res) => {
    try {
        const { id } = req.params;
        const like = await Like.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: Artwork,
                    as: 'artwork'
                }
            ]
        });
        if (!like) return res.status(404).json({message: 'No Like found'});
        res.status(200).json(like);
    } catch(error) {
        res.status(500).json({error: 'Failed to fetch Like'});
    }
}


// ---------------------- Get Like User ----------------------
/**
 * Handler to fetch the user associated with a like.
 * @param {Object} req - The request object containing the like ID as a parameter.
 * @param {Object} res - The response object that will contain the user associated with the like or an error message.
 */
exports.getLikeUser = async (req, res) => {
    try {
        const { id } = req.params;

        const like = await Like.findByPk(id)
        if (!like) return res.status(404).json({message: 'No Like found'});

        const user = await User.findByPk(like.userId);  // IDE is catching a reference to authcontroller.js line 27 for some odd reason. Changing the reference object results in the correct reference to Like.js
        if (!like) return res.status(404).json({message: 'No user found associated with this like'});

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({error: 'Failed to fetch like user'});
    }
}


// ---------------------- Get Like Artwork ----------------------
/**
 * Handler to fetch the artwork associated with a like.
 * @param {Object} req - The request object containing the like ID as a parameter.
 * @param {Object} res - The response object that will contain the artwork associated with the like or an error message.
 */
exports.getLikeArtwork = async (req, res) => {
    try {
        const { id } = req.params;

        const like = await Like.findByPk(id);
        if (!like) return res.status(404).json({message: 'No Like found'});

        const artwork = await Artwork.findByPk(like.artworkId);
        if (!artwork) return res.status(404).json({message: 'No Artwork found'});

        res.status(200).json(artwork);

    } catch (error) {
        res.status(500).json({error: 'Failed to fetch like artwork'});
    }
}


// ---------------------- Create Like ----------------------
/**
 * Handler to create a new like.
 * @param {Object} req - The request object containing the userId and artworkId for the new like.
 * @param {Object} res - The response object that will contain the created like or an error message.
 */
exports.createLike = async (req, res) => {
    try {
        const { userId, artworkId } = req.body;
        const like = await Like.create({
            userId: userId,
            artworkId: artworkId
        });
        res.status(201).json(like);
    } catch (error) {
        res.status(500).json({error: 'Failed to create like'})
    }
}


// ---------------------- Modify Like ----------------------
/**
 * Handler to modify the userId and artworkId of an existing like.
 * @param {Object} req - The request object containing the like ID as a parameter and the new userId and artworkId in the body.
 * @param {Object} res - The response object that will contain the modified like or an error message.
 */
exports.modifyLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, artworkId } = req.body;
        const like = await Like.findByPk(id);
        if (!like) return res.status(404).json({message: 'No Like found'});
        await like.update( {
            userId: userId,
            artworkId: artworkId
        });
        res.status(200).json(like);
    } catch (error) {
        res.status(500).json({error: 'Failed to update like'});
    }
}


// ---------------------- Delete Like ----------------------
/**
 * Handler to delete a like by its ID.
 * @param {Object} req - The request object containing the like ID as a parameter.
 * @param {Object} res - The response object that will indicate the success or failure of the deletion.
 */
exports.deleteLike = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Like.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({message: 'No Like found'});
        res.status(204).send(); // empty record
    } catch (error) {
        res.status(500).json({error: 'Failed to delete Like'});
    }
}
