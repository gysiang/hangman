const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller) {
    this.controller = controller;
  }

  router() {
     router.get("/",this.controller.main.bind(this.controller))
     router.get("/signup",this.controller.getSignUp.bind(this.controller))
     router.post("/signup",this.controller.signUp.bind(this.controller))
     router.get("/login",this.controller.getlogin.bind(this.controller))
     router.post("/login",this.controller.login.bind(this.controller))
     router.delete("/logout",this.controller.logout.bind(this.controller))

    return router;
  }
}

module.exports = UserRouter;