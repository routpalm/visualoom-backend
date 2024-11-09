// // ./models/Params.js
//
//
// const { Model, DataTypes } = require('sequelize');
//
// module.exports = (sequelize) => {
//     class Params extends Model {
//         // additional methods here if needed
//     }
//
//     Params.init(
//         {
//             id: {
//                 type: DataTypes.INTEGER,
//                 autoIncrement: true,
//                 primaryKey: true
//             },
//             seed: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,       // Seed should be required
//                 unique: false           // Can have same seed with different params
//             }
//         },
//         {
//             sequelize,
//             modelName: "Params",
//             tableName: "Params",        // Explicitly set the table name
//         }
//     );
//
//     Params.associate = (models) => {
//         Params.belongsTo(models.Artwork,
//             {
//                 foreignKey: 'paramsId', // ensures consistent foreign key naming
//                 as: 'artwork'           // alias for easier reference
//             });
//     };
//
//     return Params;
// };
