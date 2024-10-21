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
                allowNull: false // ensures messages are not empty
            }
        },
        {
            sequelize,
            modelName: "HelloWorld",
            tableName: "HelloWorlds", // Explicitly specify the table name
        }
    );

    return HelloWorld;
};
