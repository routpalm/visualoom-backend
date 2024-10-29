// ./models/index.js

// Load environment variables
require('dotenv').config({ path: './../config/config.env' });

// Import the sequelize instance
const sequelize = require('./initSequelize');

// Import model definitions and initialize
const models = {
  HelloWorld: HelloWorld = require('./HelloWorld')(sequelize),
  User: User = require('./UserModel')(sequelize),
  Like: Like = require('./LikeModel')(sequelize),
}

// Define relationships
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Export the Sequelize and model instances
module.exports = {
  sequelize,
  ...models
};
