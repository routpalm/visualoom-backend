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
        }//,
        // paramsId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,           // artwork instances must contain params to generate an image
        //     references: {
        //         model: "Params",
        //         key: "id"               // foreign key in 'params' table
        //     }
        //}
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
        // Artwork.hasOne(models.Params, {
        //     foreignKey: 'paramsId',
        //     as: 'params'
        // })
        Artwork.hasMany(models.Like, {
            foreignKey: 'artworkId',
            as: 'like'
        })
    }

    return Artwork;
}
