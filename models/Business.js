const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'businesses',
  {
    business_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
    },
    email: {
      type: Sequelize.STRING(320),
    },
    password: {
      type: Sequelize.STRING(40),
    },
    latitude: {
      type: Sequelize.DECIMAL(10, 8),
    },
    longitudes: {
      type: Sequelize.DECIMAL(11, 8),
    },
    category: {
      type: Sequelize.TEXT,
    },
    phone: {
      type: Sequelize.STRING(13),
    },
    description: {
      type: Sequelize.TEXT,
    },
    governorate: {
      type: Sequelize.STRING(20),
    },
  }, {
    timestamps: false,
  },
);
