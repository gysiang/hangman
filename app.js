const express = require("express");
const app = express();
// const http = require('http');
// const { Server } = require('socket.io')
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

app.use("/game", gameRouter);
app.use("/",userRouter);

// get gameid of all the open games
// let openGames = [];

// const server = app.listen(8000)
// const io = require('socket.io')(server, {
//    cors: {
//     origin: "http://localhost:3004",
//     methods: ["GET", "POST"]
//   }
// });
// io.on('connection', (socket) => {
//   // console.log(socket)
//   console.log('Hey! A New User!');
//   socket.on('gamelobby', gameID => {
//     socket.join(gameID)
//     console.log('new player joined the game!',gameID)
//   })
//   socket.on('move', (movedata) => {
//     let playerid = movedata.id;
//     let playermove = movedata.move;
//     io.to(gameID).emit('movesData', [playermove, playerid]);
//   })
//   socket.on('disconnect',()=> {
//     console.log('a player has left the game')
//   })
// })

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});