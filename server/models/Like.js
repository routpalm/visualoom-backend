// ./server/models/Like.js
// Sequelize Model Definition for 'Like'
// Author: Brett DeWitt
// Created: Friday, November 8, 2024, 2:19:49 PM
//
// Description:
// This file defines the 'Like' model using Sequelize, which represents the 'Likes' table
// in the database. The model is used to record the relationship between users and artworks,
// with a user liking a specific artwork. Each 'Like' includes the user ID and artwork ID
// as foreign keys, along with timestamps for tracking when a like was created or updated.
//
// Key Features:
// - Columns:
//   - `id`: Primary key, auto-incremented integer for each like record.
//   - `userId`: Foreign key to associate the like with a specific user.
//   - `artworkId`: Foreign key to associate the like with a specific artwork.
// - Table Name: Explicitly mapped to 'Likes' to avoid Sequelize’s default pluralization.
// - Timestamps: Enabled to track the creation and update of each like.
// - Associations:
//   - `Like` -> `User`: Represents a user who has liked an artwork.
//   - `Like` -> `Artwork`: Represents the artwork that has been liked.


// --------------------- Imports ---------------------
const { Model, DataTypes } = require('sequelize');


// --------------------- Model Definition ---------------------

/**
 * Defines the Like model with its schema and associations.
 *
 * @param {Object} sequelize - Sequelize instance for database interaction.
 * @returns {Model} The defined Like model.
 */
module.exports = (sequelize) => {
    class Like extends Model {}

    Like.init(
        {
            // Unique identifier for each like
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            // Foreign key to associate the like with a user
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,       // must be associated with a user
                references: {
                    model: "Users",     // use the table name
                    key: "id",          // primary key of the Users table
                }
            },
            // Foreign key to associate the like with an artwork
            artworkId: {
                type: DataTypes.INTEGER,
                allowNull: false,       // must be associated with an artwork
                references: {
                    model: "Artworks",  // use the table name
                    key: "id",          // primary key of the Artworks table
                }
            }
        },
        {
            sequelize,
            modelName: "Like",
            tableName: "Likes",         // explicitly specify the table name - do not use default
            timestamps: true            // adds createdAt and updatedAt
        }
    );

    // --------------------- Associations ---------------------

    /**
     * Defines the associations between the Like model and other models.
     *
     * @param {Object} models - All defined models in the Sequelize instance.
     */
    Like.associate = (models) => {

        Like.belongsTo(models.User,
            {
                foreignKey: 'userId',   // ensures consistent foreign key naming
                as: 'user'              // alias for easier reference
            });

        Like.belongsTo(models.Artwork,
            {
                foreignKey: 'artworkId', // ensures consistent foreign key naming
                as: 'artwork'           // alias for easier reference
            });
    }

    return Like;
};
