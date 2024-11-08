// ./models/index.js


// Import the sequelize instance
const sequelize = require('../config/setupSequelize');

// Import model definitions and initialize
const models = {
  Artwork: Artwork = require('./Artwork')(sequelize),
  HelloWorld: HelloWorld = require('./HelloWorld')(sequelize),
  Like: Like = require('./Like')(sequelize),
  Params: Params = require('./Params')(sequelize),
  User: User = require('./User')(sequelize)
}

// Define relationships
// Object.values(models).forEach((model) => {
//   if (model.associate) {
//     model.associate(models);
//   }
// });


// Export the Sequelize and model instances
module.exports = {
  sequelize,
  ...models
};
