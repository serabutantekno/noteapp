'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Users', {
      fields: ['username', 'email'],
      type: 'unique',
      name: 'custom_unique_constraint_name'
    })
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeConstraint('Users', {
      fields: ['username', 'email'],
      type: 'unique',
      name: 'custom_unique_constraint_name'
    })
  }
}
