// ./server/controllers/helloWorldController.js


const { HelloWorld } = require('../models');

// Controller for handling GET request
exports.getHelloWorld = async (req, res) => {
    try {
        const id = req.query.id;
        let hello;

        if (id) {
            hello = await HelloWorld.findOne( { where: { id } } );
        } else {
            hello = await HelloWorld.findOne( {order: [['createdAt', 'DESC']] });
        }

        if (hello) {
            res.status(200).json({
                id: hello.id,
                message: hello.message
            });
        } else {
            res.status(404).json({
                message: 'No HelloWorld message found'
            });
        }
    } catch (error) {
        console.error('Error fetching HelloWorld object:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// Controller for handling POST request (if you allow creating records via API)
exports.createHelloWorld = async (req, res) => {
    try {
        const { message } = req.body;
        const hello = await HelloWorld.create({ message });
        res.status(201).json(hello);
    } catch (error) {
        console.error('Error creating HelloWorld object:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};
