import Sequelize from 'sequelize';
import instanceSequelize from '.';

const ProductModel = instanceSequelize.define(
  'product', {
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
  }, {
    timestamps: false,
  }
);

export default ProductModel;
