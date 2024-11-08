// ./models/Params.js


const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Params extends Model {
    }

    Params.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            seed: {
                type: DataTypes.INTEGER,
                allowNull: false,       // Seed should be required
                unique: false           // Can have same seed with different params
            }
        },
        {
            sequelize,
            modelName: "Param",
            tableName: "Params",        // Explicitly set the table name
        }
    );
    Params.associate = (models) => {
        Params.belongsTo(models.Artwork,
            {
                foreignKey: 'artworkId', // ensures consistent foreign key naming
                as: 'artwork'           // alias for easier reference
            });
    };

    return Params;
};
