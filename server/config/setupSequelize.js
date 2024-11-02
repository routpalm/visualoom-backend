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

// Sync database  (use force=True to reset, DATA WILL BE LOST)
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Unable to sync database:', err));


module.exports = sequelize;
