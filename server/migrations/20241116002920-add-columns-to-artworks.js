'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Artworks', 'algorithm', {
          type: Sequelize.STRING,
          allowNull: false,
      });
      await queryInterface.addColumn('Artworks', 'exifData', {
          type: Sequelize.JSON,
          allowNull: true,
      });
      await queryInterface.addColumn('Artworks', 'colorPalette', {
          type: Sequelize.JSON,
          allowNull: true,
      });
      await queryInterface.addColumn('Artworks', 'pixelCluster', {
          type: Sequelize.JSON,
          allowNull: true,
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Artworks', 'algorithm');
      await queryInterface.removeColumn('Artworks', 'exifData');
      await queryInterface.removeColumn('Artworks', 'colorPalette');
      await queryInterface.removeColumn('Artworks', 'pixelCluster');
  },
};