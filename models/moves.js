'use strict';

const initMoveModel = (sequelize, DataTypes) => {
    return sequelize.define(
    "move",
     {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      game_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "games",
          key: "id",
        }
      },
      player1_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      player1_guess: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      player2_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      player2_guess: {
        allowNull: true,
        type: DataTypes.TEXT,
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

module.exports = initMoveModel;