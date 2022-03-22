'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   let usersData = require('../data/user.json')
    await queryInterface.bulkInsert('Users', usersData.map(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    }), {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
