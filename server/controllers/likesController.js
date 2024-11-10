// ./server/controllers/likesController.js


const { Like, User, Artwork } = require('../models');

// Gets 'limit' number of most recent likes starting with 'offset'
exports.getLikes = async (req, res) => {
    try {

        const offset = req.query.offset || 0;
        const limit = req.query.limit || 1;

        const likes = await Like.findAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
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

// Gets like with the specified id
exports.getLikeById = async (req, res) => {
    try {
        const { id } = req.params;
        const like = await Like.findByPk(id);
        if (!like) return res.status(404).json({message: 'No Like found'});
        res.status(200).json(like);
    } catch(error) {
        res.status(500).json({error: 'Failed to fetch Like'});
    }
}

// Get the user associated with the like
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

// Get the artwork associated with the like
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

// Create a new like with fields 'user' and 'artwork'
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

// Modify like fields 'userId' and 'artworkId'
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

// Delete like with the specified 'id'
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
