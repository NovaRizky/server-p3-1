'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let postNews = require('../data/posts.json')
    await queryInterface.bulkInsert('Posts', postNews.map(el=>{
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
    await queryInterface.bulkDelete('Posts', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
