const express = require("express");
const router = express.Router();

class GameRouter {
  constructor(controller) {
    this.controller = controller;
  }

  router() {
    router
      // get game options page
      .get("/",this.controller.gameOptions.bind(this.controller))
      // post game options to start new game
      .post("/options",this.controller.newGame.bind(this.controller))
      // get the page to play the game
      .get("/:id",this.controller.loadGame.bind(this.controller))
      // update the moves
      .post("/check",this.controller.checkLetter.bind(this.controller ))
      // get the word to display it endgame
      .get("/word",this.controller.chosenword.bind(this.controller ))
    return router;
  }
}

module.exports = GameRouter;