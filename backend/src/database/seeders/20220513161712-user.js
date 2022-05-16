'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
  {
    "active": true,
    "name": "Rogeirinho cliente",
    "email": "Rogeirinho@email.com",
    "password": "c33367701511b4f6020ec61ded352059", // senha: 654321
    "role": "customer",
  },
  {
    "active": false,
    "name": "Roberta cliente",
    "email": "customer@email.com",
    "password": "c33367701511b4f6020ec61ded352059", // senha: 654321
    "role": "customer",
  },
  {
    "active": true,
    "name": "fulano administrador",
    "email": "adm@email.com",
    "password": "e10adc3949ba59abbe56e057f20f883e", // senha: 123456
    "role": "adm",
  }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
