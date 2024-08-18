'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const salt = await bcrypt.genSalt(10);

    await queryInterface.bulkInsert('Users', [{
      name: 'admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('123', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'member',
      email: 'member@gmail.com',
      password: await bcrypt.hash('123', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};