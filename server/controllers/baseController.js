// ./server/controllers/baseController.js

// Author - Brett DeWitt
// Created - Sunday, October 27, 2024, 9:59:47 PM
// Provides a response for the base URL, directing the user to the GitHub repository
// Handles the base route request and returns a link to the API documentation


// ---------------------- Base Route ----------------------
/**
 * Handler to respond to requests to the base route of the application.
 * Directs the user to the GitHub repository for API documentation.
 * @param {Object} req - The request object representing the incoming request.
 * @param {Object} res - The response object that will contain the response message.
 */
exports.getBaseResponse = (req, res) => {
    console.log('Base route accessed');
    res.send("API Documentation available at https://github.com/routpalm/visualoom-backend");
};
