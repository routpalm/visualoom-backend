// models/setupSequelize.js


// Imports
const { Sequelize } = require('sequelize');
const dbConfig = require('./dbConfig')();


// Initialization
const sequelize = new Sequelize(dbConfig.url,
    {
        dialect: dbConfig.dialect,
        protocol: dbConfig.protocol,
        dialectOptions: dbConfig.dialectOptions,
    });

// Test connection to database
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect to the database:', err));

// Sync database  (use {force: true} to reset, DATA WILL BE LOST)
sequelize.sync({force: true})
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Unable to sync database:', err));

// test connection
sequelize.query('SELECT 1+1 AS result')
    .then(([results]) => console.log('Test Query Result:', results))
    .catch(err => console.error('Test Query Error:', err));

module.exports = sequelize;
