const express = require("express");
const router = express.Router();

class GameRouter {
  constructor(controller) {
    this.controller = controller;
  }

  router() {
      // get game options page
      router.get("/",this.controller.gameOptions.bind(this.controller))
      // post game options to start new game
      router.post("/options",this.controller.newGame.bind(this.controller))
      // update the moves
      router.post("/check",this.controller.checkLetter.bind(this.controller ))
      // get the word to display it endgame
      router.get("/word",this.controller.chosenword.bind(this.controller ))
      router.put("/setwinner",this.controller.setWinner.bind(this.controller ))
       // get the page to play the game
      router.get("/:id",this.controller.loadGame.bind(this.controller))
    return router;
  }
}

module.exports = GameRouter;