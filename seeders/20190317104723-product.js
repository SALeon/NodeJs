'use strict'
const products = require('../models/products.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'products',
      products,{}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
