const { Sequelize } = require('sequelize');
const config = require('../config');

const { username, password, database, host, dialect, logging } = config.db;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging,
});

module.exports = sequelize;
