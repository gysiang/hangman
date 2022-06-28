const letterContainer = document.getElementById("letterContainer");
const feedbackContainer = document.getElementById("feedbackContainer");
const lineBreak = document.createElement('br');

let rightGuesses = 0;


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
      console.log(checkLetter.data)
      if (checkLetter.data != true) {
          // If false, append the message. 'You got it wrong.' to feedback div
          feedbackContainer.append(lineBreak);
          feedbackContainer.append(`You got it wrong`);
          // reduce 1 in the noOfChances variable
          chancesLeft -=1;
          ImgDiv.innerHTML = "";
          noOfChances(chancesLeft);
      } 
      if (checkLetter.data.result == true){
        // If true, append the message. 'You got it!' to feedback div
          feedbackContainer.innerHTML= "";
          feedbackContainer.append('You got it!');
        // check the wincount(global variable) add 1, 
          rightGuesses +=1;
        let indexArray = checkLetter.data.index
        // select the right span from the id and replace it with the letter clicked
        indexArray.forEach((element) => {
          let selectDash = document.getElementById(`${element}`)
          console.log(selectDash);
          selectDash.innerHTML=`${button.innerText}&nbsp;`;
        })
      } 
    })
    letterContainer.append(button);
  }
};

generateLetterButtons();
