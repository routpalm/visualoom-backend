// ./server/models/LikeModel.js


const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Like extends Model {}

    Like.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false, // must be associated with a user
                references: {
                    model: "Users", // use the table name
                    key: "id", // primary key of the Users table
                }
            },
            artworkId: {
                type: DataTypes.INTEGER,
                allowNull: false // must be associated with an artwork
                // references: {
                //     model: "Artworks", // use the table name
                //     key: "id", // primary key of the Artworks table
                //}
            }
        },
        {
            sequelize,
            modelName: "Like",
            tableName: "Likes", // explicitly specify the table name - do not use default
            timestamps: true // adds createdAt and updatedAt
        }
    );

    Like.associate = (models) => {
        Like.belongsTo(models.User,
            {
                foreignKey: 'userId', // ensures consistent foreign key naming
                as: 'user' // alias for easier reference
            });
        // TODO: Implement Artwork model first
        // Like.belongsTo(models.Artwork,
        //     {
        //         foreignKey: 'artworkId', // ensures consistent foreign key naming
        //         as: 'artwork' // alias for easier reference
        //     });
    }

    return Like;
};
