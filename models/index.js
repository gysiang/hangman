'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const initUserModel = require("./users");
const initGameModel = require("./games");
const initDifficultyModel = require("./difficulty");
const initMoveModel = require('./moves');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Game = initGameModel(sequelize, Sequelize.DataTypes);
db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Difficulty = initDifficultyModel(sequelize, Sequelize.DataTypes);
db.Move = initMoveModel(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.Move, {
  as: 'player1_id',
  foreignKey: 'player1_id',
})

db.User.hasMany(db.Move, {
  foreignKey: 'player2_id',
})

db.Difficulty.hasMany(db.Game);
db.Game.belongsTo(db.Difficulty);

db.Game.belongsToMany(db.User, { through: 'users-games'});
db.User.belongsToMany(db.Game, { through: 'users-games'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
