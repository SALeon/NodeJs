import Sequelize from 'sequelize';
import instanceSequelize from '.';

const UserModel = instanceSequelize.define(
  'user', {
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
  }, {
    timestamps: false,
  }
);

export default UserModel;
