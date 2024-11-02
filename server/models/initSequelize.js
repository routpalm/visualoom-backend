// models/initSequelize.js


// Imports
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig')();


// Initialize sequelize
const sequelize = new Sequelize(dbConfig.url,
        {
            dialect: dbConfig.dialect,
            protocol: dbConfig.protocol,
            dialectOptions: dbConfig.dialectOptions,
        });

module.exports = sequelize;
