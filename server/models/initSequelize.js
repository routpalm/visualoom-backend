// models/database.js
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig');

const config = dbConfig();
const sequelize = process.env.NODE_ENV === 'development'
    ? new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
        port: config.port,
    })
    : new Sequelize(config.url, {
        dialect: config.dialect,
        protocol: config.protocol,
        dialectOptions: config.dialectOptions,
    });

module.exports = sequelize;
