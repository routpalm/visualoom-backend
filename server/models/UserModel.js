const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {}

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true, // no duplicate usernames
                allowNull: false // ensures usernames are not empty
            }
        },
        {
            sequelize,
            modelName: "User",
            tableName: "Users", // explicitly specify the table name - do not use default
            timestamps: true // adds createdAt and updatedAt
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Like, {
            foreignKey: 'userId', // ensures consistent foreign key naming
            as: 'likes' // alias for easier reference
        });
    };

    return User;
};
