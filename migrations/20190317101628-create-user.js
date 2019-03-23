'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      twitterToken: Sequelize.TEXT,
      googleToken: Sequelize.TEXT,
      facebookToken: Sequelize.TEXT,
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [3, 10]
        }
      },
      email: Sequelize.STRING,
      password: Sequelize.STRING,

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
