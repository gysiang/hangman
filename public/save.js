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
      if (checkLetter.data[result] == true) {
    
        // If true, append the message. 'You got it!' to feedback div
          feedbackContainer.appendChild('You got it!');
        // check the wincount(global variable) add 1, 
          winCount +=1;
        // if wincount == dasheslength, win the game
        let index = checkLetter.data[index];
        // select the right span from the id and replace it with the letter clicked
        const spanToReplace = document.getElementById(`${index}`);
        spanToReplace.innerHTML=`${button.innerText}&nbsp;`;
        
          // If false, append the message. 'You got it wrong.' to feedback div
          feedbackContainer.appendChild('You got it wrong')
          // reduce 1 in the noOfChances variable
          noOfChances =-1;
          // if 0 end the game   
          // write a function to check if noOfChances ==0   
    })
    letterContainer.append(button);
  }
};