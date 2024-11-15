// ./server/controllers/usersController.js


const { User, Artwork, Like } = require('../models');

// TODO: verifyJWT attaches req.user for use in succeeding controllers


// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// get user by internal id
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id)

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `No user with ${id} found` });
        }
    }
    catch (error) {
        res.status(500).json({error: 'Failed to fetch user'});
    }
}

// get artwork by user
exports.getUserArtworks = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            include: [{ model: Artwork, as: 'artwork' }]
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user.like);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user artwork' });
    }
};

// get likes by user
exports.getUserLikes = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            include: [{ model: Like, as: 'like' }]
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user.like);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user likes' });
    }
};

// creates a user with googleId, email, and name
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

// update a user's name or email
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

// delete a user
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
        res.status(500).json({error: 'Failed to delete user'});
    }
}
