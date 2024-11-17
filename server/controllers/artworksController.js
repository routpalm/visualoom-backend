// ./server/controllers/artworksController.js


const { Artwork, Like, User } = require('../models');


exports.getAllArtworks = async (req, res) => {
    try {
        const num_to_get = parseInt(req.query.n) || 20;  // Default to 1
        const offset = parseInt(req.query.offset) || 0; // Default to 0

        const artworks = await Artwork.findAll({
            limit: num_to_get,
            offset: offset,
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: User,
                    as: 'user'
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
        res.status(500).json({error: 'Failed to fetch artworks'});
    }
}

exports.getArtworkById = async (req, res) => {
    try {
        const { id } = req.params
        const artwork = await Artwork.findByPk( id,{
            include: [
                {
                    model: User,
                    as: 'user'
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

exports.createArtwork = async (req, res) => {
    try {
        const {
            userId,
            seed,
            colVibrant,
            colLightVibrant,
            colDarkVibrant,
            colMuted,
            colLightMuted,
            colDarkMuted,
            param1,
            param2,
            param3,
            param4,
            param5,
            param6,
            param7,
            param8
        } = req.body;
        const artwork = await Artwork.create({
            userId: userId,
            seed: seed,
            colVibrant: colVibrant,
            colLightVibrant: colLightVibrant,
            colDarkVibrant: colDarkMuted,
            colMuted: colMuted,
            colLightMuted: colLightMuted,
            colDarkMuted: colDarkVibrant,
            param1: param1,
            param2: param2,
            param3: param3,
            param4: param4,
            param5: param5,
            param6: param6,
            param7: param7,
            param8: param8
        })
        res.status(201).json(artwork);

        // validate required fields
        if (!userId || !algorithm) {
            return res.status(400).json({ error: 'userId and algorithm are required.' });
        }

        // save the artwork to the database
        const newArtwork = await Artwork.create({
            userId,
            algorithm,
            exifData,
            colorPalette,
            pixelCluster,
        });

        res.status(201).json(newArtwork);
    } catch (error) {
        console.error('Error creating artwork:', error);
        res.status(500).json({ error: 'Failed to create artwork.' });
    }
}

// TODO: add parameters as they become available
exports.updateArtwork = async (req, res) => {
    try {
        const { id } = req.params;
        // deconstruct the members we want to update
        const {} = req.body;
        const artwork = await Artwork.findByPk(id)
        if (!artwork) return res.status(404).json({message: 'No Artwork found'});
        // update fields here
        await artwork.update({
            // members with values to update go here
        });
        res.status(200).json(artwork);
    }
    catch (error) {
        res.status(505).json({error: 'Failed to update artwork'});
    }
}

exports.deleteArtwork = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = Artwork.destroy(id);
        if (!deleted) return res.status(404).json({message: 'No Artwork found'});
        res.status(204).send(); // no content
    }
    catch (error) {
        res.status(500).json({error: 'Failed to delete artwork'});
    }
}
