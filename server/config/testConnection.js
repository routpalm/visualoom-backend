// ./server/config/testConnection.js
// This was primarily used for debugging and is not required by the application.
// Author - Brett DeWitt
// Created - Monday, November 18, 2024, 12:38:10 PM


// Imports
const { Sequelize } = require('sequelize');


// Create a new sequelize instance to connect with localhost
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: '127.0.0.1',
    dialect: 'postgres',
});

// Attempt to connect with the local postgres database
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
})();

// Exports nothing
