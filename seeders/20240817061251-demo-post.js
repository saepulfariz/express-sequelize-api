'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      title: 'First Post',
      content: 'Content of the first post',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Second Post',
      content: 'Content of the second post',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};