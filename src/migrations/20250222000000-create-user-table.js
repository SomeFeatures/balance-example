const { Sequelize } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    console.log(queryInterface, Sequelize);
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('users');
  },
};
