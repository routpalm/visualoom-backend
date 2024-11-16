const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Artwork extends Model {}

    Artwork.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            algorithm: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            exifData: {
                type: DataTypes.JSON, // Store EXIF data as JSON
                allowNull: true,
            },
            colorPalette: {
                type: DataTypes.JSON, // Store color palette as JSON
                allowNull: true,
            },
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

    Artwork.associate = (models) => {
        Artwork.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        Artwork.hasMany(models.Like, {
            foreignKey: 'artworkId',
            as: 'likes',
        });
    };

    return Artwork;
};
