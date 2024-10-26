// Set env when on DEV, otherwise PROD will use its own env
require('dotenv').config({ path: './../config/config.env' });

// Import models
const HelloWorldModel = require('./HelloWorld');

// Initialize Sequelize
const sequelize = require('./initSequelize');

// Initialize models
  const HelloWorld = HelloWorldModel(sequelize);

// Export the Sequelize instance and models
  module.exports = {
    sequelize,
    HelloWorld
  };
