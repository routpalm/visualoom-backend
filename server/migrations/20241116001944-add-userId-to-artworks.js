'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Artworks', 'userId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Users', // Name of the referenced table
              key: 'id', // Column in the referenced table
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Artworks', 'userId');
  },
};
