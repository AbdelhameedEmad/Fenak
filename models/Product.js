const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'products',
  {
    product_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: Sequelize.STRING(50),
    },
    price: {
      type: Sequelize.INTEGER,
    },
    business_id: {
      type: Sequelize.INTEGER,
    },
  }, {
    timestamps: false,
  },
);
