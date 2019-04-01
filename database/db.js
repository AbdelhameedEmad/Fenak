const Sequelize = require('sequelize');

const db = {};
const sequelize = new Sequelize('fenak', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
