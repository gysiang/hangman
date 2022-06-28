const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller) {
    this.controller = controller;
  }

  router() {
    router
      .get("/",this.controller.main.bind(this.controller))
      .get("/signup",this.controller.getSignUp.bind(this.controller))
      .post("/signup",this.controller.signUp.bind(this.controller))
      .get("/login",this.controller.getlogin.bind(this.controller))
      .post("/login",this.controller.login.bind(this.controller))
      .get("/logout",this.controller.logout.bind(this.controller))

    return router;
  }
}

module.exports = UserRouter;