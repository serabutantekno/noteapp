'use strict';

const bcrypt = require('bcrypt')
const faker = require('faker')

const generateDummyUsers = (total) => {

  const data = []

  data.push({
    first_name: 'admin',
    last_name: 'todoapp',
    email: 'admin@domain.com',
    password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
    username: 'admin',
    role: 'admin',
    confirmed_at: new Date(),
    created_at: new Date(),
    updated_at: new Date()
  }, {
    first_name: 'user',
    last_name: 'todoapp',
    email: 'user@domain.com',
    password: bcrypt.hashSync('user', bcrypt.genSaltSync(10)),
    username: 'user',
    role: 'user',
    confirmed_at: new Date(),
    created_at: new Date(),
    updated_at: new Date()
  })

  for (let i = 0; i < total; i++) {
    data.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(4),
      username: faker.internet.userName(),
      role: 'user',
      confirmed_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  return data
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Users', generateDummyUsers(50))
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
