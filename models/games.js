'use strict';

const initGameModel = (sequelize, DataTypes) => {
    return sequelize.define(
    "game",
     {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      difficulty_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "difficulties",
          key: "id",
        }
      },
      game_mode: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      chosen_word: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      definition: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      game_win: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },    
    { underscored: true }
  );
}

module.exports = initGameModel;