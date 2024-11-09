// ./server/controllers/helloWorldController.js


const { HelloWorld } = require('../models');


// Controller for handling GET request
exports.getHelloWorld = async (req, res) => {
    try {
        // Get the number of items to retrieve and the offset from the query parameters
        const num_to_get = parseInt(req.query.n) || 1;  // Default to 1
        const offset = parseInt(req.query.offset) || 0; // Default to 0

        // Fetch the HelloWorld messages using the limit and offset
        const hellos = await HelloWorld.findAll({
            limit: num_to_get,
            offset: offset,
            order: [['createdAt', 'DESC']] // Optional: order by creation date, most recent first
        });

        // Check if any messages were found
        if (hellos.length > 0) {
            // Send the retrieved messages in the response
            res.status(200).json(hellos); // Respond with the array of messages
        } else {
            res.status(404).json({
                message: 'No HelloWorld messages found'
            });
        }
    } catch (error) {
        console.error('Error fetching HelloWorld object:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// Controller for handling GET request
exports.getHelloWorldById = async (req, res) => {
    try {

        const id = req.params.id;

        const hello = await HelloWorld.findOne( { where: { id } } );

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

exports.modifyHelloWorld = async (req, res) => {
    try {
        const { message } = req.body;
        const { id } = req.params; // Assuming the ID comes from the route parameters

        // Find the HelloWorld record by primary key (id)
        const hello = await HelloWorld.findByPk(id);

        // If the id doesn't exist in the table, dip
        if (!hello) {
            return res.status(404).json({ message: 'HelloWorld object not found' });
        }

        // Update the message field and save the changes
        hello.message = message;
        await hello.save();

        // Respond with the updated object
        res.status(200).json(hello);
    } catch (error) {
        console.error('Error modifying HelloWorld object:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteHelloWorld = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCount = await HelloWorld.destroy({ where: { id } });

        if (deletedCount === 0) {
            // No record found to delete
            return res.status(404).json({ message: 'HelloWorld message not found' });
        }

        // Successfully deleted
        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error('Error deleting HelloWorld object:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
