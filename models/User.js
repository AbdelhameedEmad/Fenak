const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'users',
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(320),
    },
    password: {
      type: Sequelize.STRING(40),
    },
    first_name: {
      type: Sequelize.STRING(30),
    },
    last_name: {
      type: Sequelize.STRING(35),
    },
    age: {
      type: Sequelize.INTEGER,
    },
    country: {
      type: Sequelize.STRING(50),
    },
    gender: {
      type: Sequelize.STRING(6),
    },
  }, {
    timestamps: false,
  },
);
