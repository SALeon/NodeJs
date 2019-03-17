'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: Sequelize.STRING,
      detail: Sequelize.TEXT,
      price: Sequelize.NUMERIC,
      info: Sequelize.TEXT,
      reviews: Sequelize.ARRAY(Sequelize.STRING),
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
