// const socket = io("http://localhost:8000/");
// // receiving others moves
// socket.on('move', ((data) => {
//     console.log('I HAVE RECIEVED A Move!', data)
//     let playerid = data[0]
//     let playermove = data[1]
//     console.log(playerid, playermove)
// }));

const letterContainer = document.getElementById("letterContainer");
const feedbackContainer = document.getElementById("feedbackContainer");
const gameContainer = document.getElementById("gameContainer");
const mainContainer = document.getElementById("mainContainer");
const lineBreak = document.createElement('br');

let rightGuesses = 0;

const generateLoseGameContainer = async () => {
    const result = await axios.get("/game/word"); 
    console.log(result)
    gameContainer.innerHTML = "";
    const resultHeader = document.createElement("h3");
    const answerHeader = document.createElement("h3");
    gameContainer.classList.add("d-flex","flex-column","justify-content-center","align-items-center");
    answerHeader.innerText = `The answer is ${result.data.word}`
    resultHeader.innerText=`You Lose!`
    resultHeader.classList.add("font-normal");
    const restartBtn = document.createElement("btn");
    restartBtn.classList.add("button", "mx-2","pt-3","text-center");
    restartBtn.innerText='Restart Game'
    restartBtn.addEventListener("click", ()=>{
      window.location = "/game";
    })
    const logoutBtn = document.createElement("btn");
    logoutBtn.classList.add("button", "mx-2","pt-3","text-center");
    logoutBtn.innerText='Log Out';
    logoutBtn.addEventListener("click", async()=>{
        const result = await axios.delete("/logout")
        if (result.data = 'success'){
          window.location ='/';
        }
    })
    gameContainer.append(lineBreak);
    gameContainer.append(resultHeader);
    gameContainer.append(lineBreak);
    gameContainer.append(answerHeader);
    gameContainer.append(lineBreak);
    gameContainer.append(restartBtn);
    gameContainer.append(logoutBtn);
};

const generateWinGameContainer = async () => {
    const result = await axios.get("/game/word"); 
    gameContainer.innerHTML = "";
    const resultHeader = document.createElement("h3");
    const answerHeader = document.createElement("h3");
    gameContainer.classList.add("d-flex","flex-column","justify-content-center","align-items-center");
    answerHeader.innerText = `The answer is ${result.data.word}`
    resultHeader.innerText=`You Win!`
    resultHeader.classList.add("font-normal");
    const restartBtn = document.createElement("btn");
    restartBtn.classList.add("button", "mx-2","pt-3","text-center");
    restartBtn.innerText='Restart Game';
    restartBtn.addEventListener("click", ()=>{
      window.location = "/game";
    })
    const logoutBtn = document.createElement("btn");
    logoutBtn.classList.add("button", "mx-2","pt-3","text-center");
    logoutBtn.innerText='Log Out';
    logoutBtn.addEventListener("click", async ()=>{
        const result = await axios.delete("/logout")
        if (result.data = 'success'){
          window.location ='/';
        }
    })
    const data = {game_win: true,}
    console.log('saving win game result');
    const postresult = await axios.put('/game/setWinner',  data);
    if (postresult.data="success"){
    gameContainer.append(lineBreak);
    gameContainer.append(resultHeader);
    gameContainer.append(lineBreak);
    gameContainer.append(answerHeader);
    gameContainer.append(lineBreak);
    gameContainer.append(restartBtn);
    gameContainer.append(logoutBtn);
    }
};

const generateLetterButtons = ()=>{
 //For creating letter buttons
  for (let i = 65; i < 91; i+=1) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    button.classList.add("letter-button");
    button.classList.add("font-normal");
    button.classList.add("rounded");
    //character button click
    button.addEventListener("click", async () => {
      console.log(`you clicked on ${button.innerText}`);
      feedbackContainer.innerText = `You Guessed ${button.innerText}.`;
      button.disabled = true;
      const data = {
        player1_guess: `${button.innerText}`,
      }
      const checkLetter = await axios.post('/game/check', data);
      console.log('send a post to check letter', checkLetter)

      if (checkLetter.data != true) {
          // If false, append the message. 'You got it wrong.' to feedback div
          feedbackContainer.append(lineBreak);
          feedbackContainer.append(`You got it wrong`);
          // reduce 1 in the noOfChances variable
          chancesLeft -=1;
          ImgDiv.innerHTML = "";
          noOfChances(chancesLeft);
          if (chancesLeft == 0){
            console.log('you lose')
            generateLoseGameContainer();
          }
      } 
      if (checkLetter.data.result == true){
        // If true, append the message. 'You got it!' to feedback div
          feedbackContainer.innerHTML= "";
          feedbackContainer.append('You got it!');
        // check the wincount(global variable) add 1, 
        let indexArray = checkLetter.data.index
        // select the right span from the id and replace it with the letter clicked
        indexArray.forEach((element) => {
          rightGuesses +=1;
          let selectDash = document.getElementById(`${element}`)
          // console.log(selectDash);
          selectDash.innerHTML=`${button.innerText}&nbsp;`;
         })
        }
        if (rightGuesses == dasheslength){
          generateWinGameContainer();
        }
      })
        letterContainer.append(button);
    }
  };



generateLetterButtons();




