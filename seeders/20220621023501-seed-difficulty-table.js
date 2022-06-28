'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const difficultyList = [
      {
        name: 'easy',
        chances: '10',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'normal',
        chances: '8',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'hard',
        chances:'6',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert(
      'difficulties',
      difficultyList,
      { returning: true },
    );
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('difficulties', null, {});
  }
};
