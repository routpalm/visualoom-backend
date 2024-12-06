// ./server/controllers/adminController.js


// Author - Brett DeWitt
// Created - Wednesday, December 4, 2024, 9:13:55 PM
// Provides logic for '/admin' endpoint in the application
// Handles administrative tasks, such as resetting the database


// ---------------------- Imports ----------------------
/**
 * Import the sequelize instance for interacting with the database.
 */
const sequelize = require('../config/setupSequelize');


// ---------------------- Reset Database ----------------------
/**
 * Handler to reset the database by synchronizing the Sequelize models.
 * This operation is only allowed in the development environment.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object that will indicate the success or failure of the reset.
 */
exports.resetdb = (req, res) => {
    console.log('Admin/reset route accessed');

    sequelize.sync({ force: true })
        .then(() => {
            console.log('Database reset');
            // Send 200 response on success
            res.status(200).json({ message: "Database reset" });
        })
        .catch(err => {
            console.error('Unable to reset database:', err);
            // Send 500 response if an error occurs
            res.status(500).json({ error: 'Unable to reset database', details: err.message });
        });
};
