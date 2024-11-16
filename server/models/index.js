// ./models/index.js


// Import the sequelize instance
const sequelize = require('../config/setupSequelize');


// Import model definitions and initialize

const HelloWorld = require('./HelloWorld')(sequelize)
const User = require('./User')(sequelize)
const Artwork = require('./Artwork')(sequelize)
const Like = require('./Like')(sequelize)

const models = {
  HelloWorld,
  User,
  Artwork,
  Like
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
