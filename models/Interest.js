const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'interests',
  {
    interest_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    books: {
      type: Sequelize.INTEGER,
    },
    crafts: {
      type: Sequelize.INTEGER,
    },
    culture: {
      type: Sequelize.INTEGER,
    },
    food: {
      type: Sequelize.INTEGER,
    },
    outdoor: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
  }, {
    timestamps: false,
  },
);
