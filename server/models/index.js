// ./models/index.js
// Initialization script for Sequelize models
// Author: Brett DeWitt
// Created: Friday, November 8, 2024, 2:19:49 PM
//
// Description:
// This file imports the Sequelize instance and initializes all models for the application.
// The models include HelloWorld, User, Artwork, and Like, and are associated with each
// other through Sequelize’s ORM relationship functions. This file ensures that all models
// are set up and properly linked before being exported for use throughout the application.
//
// Key Features:
// - Imports: The required models are imported and initialized with the Sequelize instance.
// - Model Initialization: Each model is initialized by passing the Sequelize instance to
//   its definition.
// - Associations: The `associate` function is called for each model to set up relationships
//   between models (e.g., foreign keys, belongsTo, hasMany).
// - Export: The Sequelize instance and all initialized models are exported for use in
//   controllers, routes, and other parts of the application.


// --------------------- Import the Sequelize instance ---------------------
const sequelize = require('../config/setupSequelize');


// --------------------- Import Model Definitions ---------------------
const HelloWorld = require('./HelloWorld')(sequelize)
const User = require('./User')(sequelize)
const Artwork = require('./Artwork')(sequelize)
const Like = require('./Like')(sequelize)

// Store models for export
const models = {
  HelloWorld,
  User,
  Artwork,
  Like
}


// --------------------- Define Associations ---------------------
/**
 * Loop through the models object and call the `associate` method for each model
 * that has an `associate` function. This sets up the ORM relationships between
 * the models (e.g., one-to-many, many-to-many).
 */
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});


// --------------------- Export Sequelize and Models ---------------------
/**
 * Export the Sequelize instance and all models for use in other parts of the application.
 */
module.exports = {
  sequelize,
  ...models
};
