const db = require("../models/index");
const axios = require('axios').default;

class gameController {
  constructor(model) {
    this.model = model;
  }

    gameOptions (req,res) {
      res.render("options")
    }

    async newGame (req,res){
      console.log(req.body);
      const { game_mode , difficulty_id } = req.body
      console.log("creating a new game");

    // if (game_mode == "onePlayer") {
    const chosenWord = await axios
      .get('https://random-words-api.vercel.app/word')
      .then((result) => {
      return (JSON.stringify(result.data[0]));
      })

      const jsonChosenWord = JSON.parse(chosenWord)
      console.log('generating word',jsonChosenWord.word)
    
      const newGame = await this.model.create({
          difficulty_id,
          game_mode,
          chosen_word: jsonChosenWord.word,
          definition: jsonChosenWord.definition,
      });
      console.log(newGame.id)
      const data = {
        message: "success",
        id: newGame.id
      }
      res.cookie('gameID',newGame.id);
      res.send(data);
    } 
    // else {

    //   const newGame = await this.model.create({
    //       difficulty_id,
    //       game_mode,
    //       chosen_word: jsonChosenWord.word,
    //       definition: jsonChosenWord.definition,
    //   });
      
    //   const getTwoPlayerGames = await this.model.findAll({
    //       where: {
    //         game_mode: twoPlayer,
    //         winner_id: '',
    //       },
    //   })
    //   const data = {
    //     message: "success",
    //     games: getTwoPlayerGames,
    //   }
    //   res.render("gamelobby", data)
      // }
    // };
  
    async loadGame (req,res){
      try {
      const gameID = req.cookies.gameID;

      const game = await db.Difficulty.findOne(
        { include:[{
          model: db.Game,
          where: {  id : gameID },
          required: true,
          raw:true,
        }]
     })

      const chosenWordLength = (JSON.stringify(game.games[0].chosen_word)).length

      const data = {
        message: "okay",
        chances: JSON.stringify(game.chances),
        dashlength: chosenWordLength,
        definition: JSON.stringify(game.games[0].definition),
      }
      console.log(data);
      res.render("game", data);
      } catch(error){
        console.log(error);
      }
    }

  async checkLetter(req,res){

    const { player1_guess } = req.body;
    const player1_id = req.cookies.userID;
    const game_id = req.cookies.gameID;
    try {
    // do a create in the moves table;
    const newMove = await db.Move.create({
          game_id,
          player1_id,
          player1_guess,
      });
    // do a request to get the chosen word
     const word = await this.model.findOne(
        { 
          where: {  id : game_id },
          attributes: ['chosen_word'],
          raw:true,
        }
     )
    const uppercaseWord = word.chosen_word.toUpperCase();
    // split the chosen word by "" into an array
    const splitWord = uppercaseWord.split("");
    console.log(splitWord);
    // compare the userguess to the letters in array
    if (splitWord.indexOf(player1_guess) != -1){
      // if not found, return false
      // function to include all the index matched to the array
      const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

      const indexArray = indexOfAll(splitWord, player1_guess);

     const data = {
        index: indexArray,
        result: true,
      }
      console.log(data)
      res.send(data);
    } else {res.send(false);}
    } catch(error){
        console.log(error);
      }
  }

    async chosenword(req,res) {
      const { gameID } = req.cookies;
      try {
        const word = await this.model.findOne(
        { 
          where: {  id : gameID },
          attributes: ['chosen_word'],
          raw:true,
        })
        const data = {
          word: (word.chosen_word),
        }
        console.log(data);
        res.send(data);
      } catch(error){
        console.log(error);
      }
  }
}
module.exports = gameController;