// ./server/controllers/artworksController.js


const { Artwork, Like, User } = require('../models');


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

// TODO: add parameters as they become available
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

exports.deleteArtwork = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Artwork.destroy( {where: {id}} );
        if (!deleted) return res.status(404).json({message: 'No Artwork found'});
        res.status(204).send(); // no content
    }
    catch (error) {
        res.status(500).json({error: 'Failed to delete artwork'});
    }
}
