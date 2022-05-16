'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('wallets', [
  {
    "user_id": 1,
    "coins": 25.50,
  },
  {
    "user_id": 2,
    "coins": 5.80,
  },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('wallets', null, {});
  }
};
