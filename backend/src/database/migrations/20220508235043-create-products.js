'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
      },
      name: {
        type: Sequelize.STRING
      },
      urlImage: {
        type: Sequelize.STRING,
        field: 'url_image'
      },
      price: {
        type: Sequelize.DECIMAL(9,2)
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};