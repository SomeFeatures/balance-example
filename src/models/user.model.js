const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  },
);

module.exports = { User };
