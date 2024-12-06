// ./server/controllers/helloWorldController.js

// Author - Brett DeWitt
// Created - Sunday, October 27, 2024, 9:59:47 PM
// Provides logic for '/helloWorld' endpoint in the application
// Handles fetching, creating, modifying, and deleting HelloWorld messages


// ---------------------- Import Models ----------------------
const { HelloWorld } = require('../models');



// ---------------------- Get HelloWorld Messages ----------------------
/**
 * Handler to fetch a list of HelloWorld messages with pagination support.
 * Fetches messages based on query parameters 'n' (limit) and 'offset'.
 * @param {Object} req - The request object containing 'n' (limit) and 'offset' query parameters.
 * @param {Object} res - The response object that will contain the list of messages or an error message.
 */
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


// ---------------------- Get HelloWorld Message by ID ----------------------
/**
 * Handler to fetch a HelloWorld message by its ID.
 * @param {Object} req - The request object containing the message ID as a parameter.
 * @param {Object} res - The response object that will contain the message data or an error message.
 */
exports.getHelloWorldById = async (req, res) => {
    try {

        const id = req.params.id;

        const hello = await HelloWorld.findByPk(id);

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


// ---------------------- Create HelloWorld Message ----------------------
/**
 * Handler to create a new HelloWorld message.
 * @param {Object} req - The request object containing the 'message' for the new HelloWorld.
 * @param {Object} res - The response object that will contain the created message or an error message.
 */
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


// ---------------------- Modify HelloWorld Message ----------------------
/**
 * Handler to modify an existing HelloWorld message by its ID.
 * @param {Object} req - The request object containing the message ID as a parameter and the new message in the body.
 * @param {Object} res - The response object that will contain the updated message or an error message.
 */
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


// ---------------------- Delete HelloWorld Message ----------------------
/**
 * Handler to delete a HelloWorld message by its ID.
 * @param {Object} req - The request object containing the message ID as a parameter.
 * @param {Object} res - The response object that will indicate the success or failure of the deletion.
 */
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
