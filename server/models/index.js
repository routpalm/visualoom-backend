const { Sequelize } = require('sequelize');
const HelloWorldModel = require('./HelloWorld'); // Example of importing one of your models
require('dotenv').config({ path: './config/config.env' });

// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.DB_DEV_NAME, process.env.DB_DEV_USERNAME, process.env.DB_DEV_PASSWORD, {
  host: process.env.DB_DEV_HOST,
  dialect: 'postgres',
  port: Number(process.env.DB_DEV_PORT)
});

// Initialize models
const HelloWorld = HelloWorldModel(sequelize);

// Export the Sequelize instance and models
module.exports = {
  sequelize,
  HelloWorld
};
