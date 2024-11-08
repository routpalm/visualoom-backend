// ./models/HelloWorld.js


const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class HelloWorld extends Model {}

    HelloWorld.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
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

    return HelloWorld;
};
