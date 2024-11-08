// ./server/models/User.js


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
            googleId: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: "User",
            tableName: "Users", // Ensure this matches your database table
            timestamps: true
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Artwork, {
            foreignKey: 'artworkId',
            as: 'artwork'
        })
        User.hasMany(models.Like, {
            foreignKey: 'likeId',
            as: 'like'
        })
    }

    return User; // Make sure you're returning the model
};
