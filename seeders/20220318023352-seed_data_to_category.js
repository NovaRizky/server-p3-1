'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>{
    let categoriesData = require('../data/categories.json')
    await queryInterface.bulkInsert('Categories', categoriesData.map(el=>{
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

  down: async (queryInterface, Sequelize) =>{
    await queryInterface.bulkDelete('Categories', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
