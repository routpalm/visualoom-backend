// ./server/models/Artwork.js


const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Artwork extends Model {
        // TODO: Anything needed here?
    }

    Artwork.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        seed: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        colVibrant: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colLightVibrant: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colDarkVibrant: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colMuted: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colLightMuted: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colDarkMuted: {
            type: DataTypes.STRING,
            allowNull: false
        },
        param1: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        param2: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        param3: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        param4: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        param5: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        param6: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        param7: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        param8: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
        {
        sequelize,
        modelName: "Artwork",
        tableName: "Artworks",
        timestamps: true
    }
);
    Artwork.associate = (models) => {
        Artwork.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        })
        Artwork.hasMany(models.Like, {
            foreignKey: 'artworkId',
            as: 'likes'
        })
    }
    return Artwork;
}
