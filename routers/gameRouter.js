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
      .post("/newgame",this.controller.newGame.bind(this.controller))
      // get the page to play the game
      .get("/start",this.controller.loadGame.bind(this.controller))
      .post("/check",this.controller.checkLetter.bind(this.controller ))
      .post("/end",this.controller.checkLetter.bind(this.controller ))
    return router;
  }
}

module.exports = GameRouter;