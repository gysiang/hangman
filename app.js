const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static("public"));

// Import DB
const db = require("./models/index");

// Import Controllers
const game = require("./controllers/games");
const user = require("./controllers/users");

// initializing controller
const gamesController = new game(db.Game);
const userController = new user(db.User);

// import routers
const GameRouter = require("./routers/gameRouter");
const UserRouter = require("./routers/userRouter");

// init Routers
const gameRouter = new GameRouter(gamesController).router();
const userRouter = new UserRouter(userController).router();

app.use("/game",gameRouter);
app.use("/",userRouter);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
