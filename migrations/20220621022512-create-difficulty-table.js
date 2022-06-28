'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
       await queryInterface.createTable("games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      difficulty_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "difficulties",
          key: "id",
        }
      },
      game_mode: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      chosen_word: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      definition: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      winner_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: "id",
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("games");
  }
};
