const bcrypt  = require('bcrypt');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Users', [{
        full_name: "Siblil Aula",
        email: "sibli123@admin.com",
        password: await bcrypt.hash("sibli123", 10),
        gender: "male",
        role: "admin",
        balance: "50000000",
        createdAt: new Date(),
        updatedAt: new Date()  
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
