// ./models/HelloWorld.js
// Sequelize model definition for the "HelloWorld" entity
// Author: Brett DeWitt
// Created: Friday, November 8, 2024, 2:19:49 PM
//
// Description:
// This file defines the "HelloWorld" model used by Sequelize, which represents the
// structure of a "HelloWorlds" table in the database. The model includes an auto-incrementing
// `id` field as the primary key and a `message` field to store the message text.
//
// Key Features:
// - `id`: An integer field, automatically incremented, and serves as the primary key for
//   the model.
// - `message`: A string field that stores the message content. It is a required field,
//   meaning the value cannot be null or empty.
// - Table Name: Explicitly sets the table name to "HelloWorlds" to avoid Sequelize's
//   default table name pluralization rules.


// --------------------- Import Required Sequelize Components ---------------------
const { Model, DataTypes } = require('sequelize');


// --------------------- Define HelloWorld Model ---------------------
/**
 * HelloWorld model represents a simple entity with an `id` and `message` field. It is
 * used to interact with the "HelloWorlds" table in the database.
 *
 * @class HelloWorld
 */
module.exports = (sequelize) => {
    class HelloWorld extends Model {}

    // Initialize the model with the table structure
    HelloWorld.init(
        {
            // The primary key and auto-incrementing ID field
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            // The 'message' field to store text
            message: {
                type: DataTypes.STRING,
                allowNull: false        // Messages should not be empty
            }
        },
        {
            sequelize,
            modelName: "HelloWorld",
            tableName: "HelloWorlds",   // Explicitly set the table name
        }
    );

    // Return the model instance for use in other parts of the application
    return HelloWorld;
};
