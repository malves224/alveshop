'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('wallets', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      coins: {
        type: Sequelize.DECIMAL(9,2)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('wallets');
  }
};