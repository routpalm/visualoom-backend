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

// get artwork by user
exports.getUserArtworks = async (req, res) => {
    try {
        const { id } = req.params;
        const limit = parseInt(req.query.limit) || 20; // Default to 20
        const offset = parseInt(req.query.offset) || 0; // Default to 0

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
        console.error('Error deleting User object:', error)
        res.status(500).json({error: 'Failed to delete user'});
    }
}
