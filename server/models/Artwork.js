// ./models/index.js
// Sequelize model definition for the "Artwork" entity
// Author: Nick Anthony, Brett DeWitt,
// Created: Friday, November 8, 2024, 2:19:49 PM
//
// Description:
// This file defines the "Artwork" model used by Sequelize, representing the structure
// of an "Artworks" table in the database. The model includes fields for the artwork's
// associated user, algorithm used, EXIF data, color palette, and pixel cluster.
//
// Key Features:
// - `id`: An auto-incrementing integer that serves as the primary key for the model.
// - `userId`: A foreign key linking to the associated user who created the artwork.
// - `algorithm`: A string that stores the algorithm used to create or generate the artwork.
// - `exifData`: JSON field for storing EXIF metadata of the artwork (optional).
// - `colorPalette`: JSON field storing the color palette used in the artwork (optional).
// - `pixelCluster`: JSON field storing pixel cluster data (optional).
// - Table Name: Explicitly sets the table name to "Artworks" to ensure proper mapping.


// --------------------- Import Required Sequelize Components ---------------------
const { Model, DataTypes } = require('sequelize');


// --------------------- Define Artwork Model ---------------------
/**
 * Artwork model represents the structure of an artwork in the database. This model
 * contains information about the associated user, the algorithm used to create the
 * artwork, and optional metadata such as EXIF data, color palette, and pixel clusters.
 *
 * @class Artwork
 */
module.exports = (sequelize) => {
    // Define the Artwork model class
    class Artwork extends Model {}

    Artwork.init(
        {
            // The primary key and auto-incrementing ID field
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // Foreign key to associate the artwork with a specific user
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            // The algorithm used to create the artwork
            algorithm: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // EXIF data associated with the artwork (optional)
            exifData: {
                type: DataTypes.JSON, // Store EXIF data as JSON
                allowNull: true,
            },
            // Color palette used in the artwork (optional)
            colorPalette: {
                type: DataTypes.JSON, // Store color palette as JSON
                allowNull: true,
            },
            // Pixel cluster data for the artwork (optional)
            pixelCluster: {
                type: DataTypes.JSON, // Store pixel cluster as JSON
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Artwork',
            tableName: 'Artworks',
            timestamps: true,
        }
    );

    // --------------------- Define Associations ---------------------
    /**
     * Establishes associations between the Artwork model and other models.
     *
     * @param {Object} models - The set of models to associate with.
     */
    Artwork.associate = (models) => {
        // Each artwork belongs to a specific user
        Artwork.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        // Each artwork can have many likes
        Artwork.hasMany(models.Like, {
            foreignKey: 'artworkId',
            as: 'likes',
        });
    };

    // Return the model instance for use in other parts of the application
    return Artwork;
};
