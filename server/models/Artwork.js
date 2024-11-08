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
        Artwork.hasOne(models.Params, {
            foreignKey: 'paramId',
            as: 'params'
        })
    }

    return Artwork;
}
