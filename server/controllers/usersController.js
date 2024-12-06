// ./server/controllers/usersController.js

// Author - Brett DeWitt
// Created - Friday, November 8, 2024, 6:39:32 PM
// Provides logic for handling '/users' endpoint

// ---------------------- Import Models ----------------------
const { User, Artwork, Like } = require('../models');


// ---------------------- Get All Users ----------------------
/**
 * Handler to fetch all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};


// ---------------------- Get User by ID ----------------------
/**
 * Handler to fetch a user by their ID.
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object.
 */
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch user and include related artworks and likes
        const user = await User.findByPk(id,
            {
                include: [
                    {
                        model: Artwork,
                        as: 'artworks'
                    },
                    {
                        model: Like,
                        as: 'likes'
                    }
                ]
            })
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `No user with ${id} found` });
        }
    }
    catch (error) {
        console.error('Error fetching user', error);
        res.status(500).json({error: 'Error fetching user'});
    }
}

// ---------------------- Get User Artworks ----------------------
/**
 * Handler to fetch artworks by a user.
 * Supports pagination via query parameters `limit` and `offset`.
 * @param {Object} req - The request object containing the user ID and query parameters.
 * @param {Object} res - The response object.
 */
exports.getUserArtworks = async (req, res) => {
    try {
        const { id } = req.params;
        const limit = parseInt(req.query.limit) || 20; // Default to 20
        const offset = parseInt(req.query.offset) || 0; // Default to 0

        // Fetch user with artworks, applying pagination
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Artwork,
                    as: 'artworks',
                    limit: limit,
                    offset: offset,
                    order: [['createdAt', 'DESC']],
                },
            ],
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(user.artworks);
    } catch (error) {
        console.error('Error fetching user artworks:', error);
        res.status(500).json({ error: 'Failed to fetch user artworks' });
    }
};

// ---------------------- Get User Likes ----------------------
/**
 * Handler to fetch likes by a user.
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object.
 */
exports.getUserLikes = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch user with their likes
        const user = await User.findByPk(id, {
            include: [{ model: Like, as: 'like' }]
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user.like);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user likes' });
    }
};


// ---------------------- Create User ----------------------
/**
 * Handler to create a new user.
 * @param {Object} req - The request object containing user data (googleId, email, name).
 * @param {Object} res - The response object.
 */
exports.createUser = async (req, res) => {
    try {
        const {googleId, email, name} = req.body;
        const user = await User.create({googleId, email, name});
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({error: 'Failed to create user'});
    }
};

// ---------------------- Update User ----------------------
/**
 * Handler to update a user's details (email or name).
 * @param {Object} req - The request object containing the user ID and update data.
 * @param {Object} res - The response object.
 */
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const {email, name} = req.body;
        user.email = email || user.email;
        user.name = name || user.name;
        await user.save();
        res.status(200).json(user);
    }
    catch(error) {
        res.status(400).json({error: 'Failed to update user'});
    }
}

// ---------------------- Delete User ----------------------
/**
 * Handler to delete a user by their ID.
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object.
 */
exports.deleteUser = async (req, res) => {
    // TODO: Protect using req.user from verifyJWT
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.destroy();
        res.status(204).send(); // empty record
    }
    catch (error) {
        console.error('Error deleting User object:', error)
        res.status(500).json({error: 'Failed to delete user'});
    }
}
