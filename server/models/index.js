// Set env when on DEV, otherwise PROD will use its own env
require('dotenv').config({ path: './../config/config.env' });

// Import models
const HelloWorld = require('./HelloWorld');
const User = require('./UserModel');
const Like = require('./LikeModel');

// Initialize Sequelize
const sequelize = require('./initSequelize');

// Initialize models
// const HelloWorld = HelloWorldModel(sequelize);
// const User = UserModel(sequelize);
// const Like = LikeModel(sequelize);

const models = {
  User: User(sequelize),
  Like: Like(sequelize),
  HelloWorld: HelloWorld(sequelize),
};

// Define relationships
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Export the Sequelize instance and models
  module.exports = {
    sequelize,
    HelloWorld,
    User,
    Like
  };
