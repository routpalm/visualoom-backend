// models/database.js

// Imports
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig');

// Get sequelize config
const config = dbConfig();

// Initialize sequelize
const sequelize = new Sequelize(config.url,
        {
            dialect: config.dialect,
            protocol: config.protocol,
            dialectOptions: config.dialectOptions,
        });

module.exports = sequelize;
