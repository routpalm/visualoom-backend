// ./server/models/User.js
// Sequelize Model Definition for 'User'
// Author: Brett DeWitt
// Created: Friday, November 8, 2024, 2:19:49 PM
//
// Description:
// This file defines the 'User' model using Sequelize, which maps to the 'Users' table
// in the database. The model includes fields for storing user-specific information such
// as Google ID, email, and name. It also defines associations with other models such as
// 'Artwork' and 'Like' to represent user-created content and interactions.
//
// Key Features:
// - Columns:
//   - `id`: Primary key, auto-incremented integer.
//   - `googleId`: Unique string identifier for Google OAuth2 integration.
//   - `email`: Unique email address for the user.
//   - `name`: Optional user name field.
// - Table Name: Explicitly mapped to 'Users'.
// - Timestamps: Enabled to track creation and update times.
// - Associations:
//   - `User` -> `Artwork`: One-to-many relationship for user-created artworks.
//   - `User` -> `Like`: One-to-many relationship for user likes.


// --------------------- Imports ---------------------
const { Model, DataTypes } = require('sequelize');



// --------------------- Model Definition ---------------------

/**
 * Defines the User model with its schema and associations.
 *
 * @param {Object} sequelize - Sequelize instance for database interaction.
 * @returns {Model} The defined User model.
 */
module.exports = (sequelize) => {
    class User extends Model {}

    User.init(
        {
            // Unique identifier for the user
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            // Google OAuth2 identifier, required and unique
            googleId: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            // Email address, required and unique
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            // User's name, optional
            name: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: "User",
            tableName: "Users", // make sure this matches the database table
            timestamps: true
        }
    );

    // --------------------- Associations ---------------------

    /**
     * Defines the associations between the User model and other models.
     *
     * @param {Object} models - All defined models in the Sequelize instance.
     */
    User.associate = (models) => {
        User.hasMany(models.Artwork, {
            foreignKey: 'userId',
            as: 'artworks'
        })
        User.hasMany(models.Like, {
            foreignKey: 'userId',
            as: 'likes'
        })
    }

    return User; // return the model for export
};
