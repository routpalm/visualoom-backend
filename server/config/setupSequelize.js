// models/setupSequelize.js


// Author - Brett DeWitt
// Created - Saturday, November 2, 2024, 8:38:29 PM
// Initializes Sequelize to connect to the supported database
// Sets up database authentication, synchronization, and testing


// ---------------------- Import Sequelize ----------------------
/**
 * Import the Sequelize module for database interaction.
 * Import the database configuration from dbConfig.
 */
const { Sequelize } = require('sequelize');
const dbConfig = require('./dbConfig')();


// ---------------------- Initialize Sequelize ----------------------
/**
 * Create a new Sequelize instance with the provided configuration.
 */
const sequelize = new Sequelize(dbConfig.url,
    {
        dialect: dbConfig.dialect,
        protocol: dbConfig.protocol,
        dialectOptions: dbConfig.dialectOptions,
    });


// ---------------------- Test Database Connection ----------------------
/**
 * Test the connection to the database to ensure the connection is successful.
 * Logs a success message if connected, or an error message if failed.
 */
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect to the database:', err));


// ---------------------- Sync Database ----------------------
/**
 * Synchronize the database schema with the Sequelize models.
 * Use {force: true} to reset the schema (WARNING: This will delete data).
 */
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Unable to sync database:', err));


// ---------------------- Test Query ----------------------
/**
 * Execute a simple test query to ensure the database is accessible and responsive.
 * Logs the result of the query or an error message.
 */
sequelize.query('SELECT 1+1 AS result')
    .then(([results]) => console.log('Test Query Result:', results))
    .catch(err => console.error('Test Query Error:', err));


// Export sequelize instance
module.exports = sequelize;
