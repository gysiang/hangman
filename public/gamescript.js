const onePlayerOption = document.getElementById("onePlayer");
const twoPlayerOption = document.getElementById("twoPlayer");

onePlayerOption.addEventListener('click', ()=> {
  console.log('one player btn is clicked')
  onePlayerOption.classList.add("active");
  twoPlayerOption.classList.add("disabled");
  twoPlayerOption.classList.remove("active");
  console.log('one player btn is disabled')
});

twoPlayerOption.addEventListener('click', ()=> {
  console.log('two player btn is clicked')
  onePlayerOption.classList.add("disabled");
  onePlayerOption.classList.remove("active");
  twoPlayerOption.classList.add("active");
  console.log('two player btn is disabled')
});

const easyModeBtn = document.getElementById("easyMode");
const normalModeBtn = document.getElementById("normalMode");
const hardModeBtn = document.getElementById("hardMode");

easyModeBtn.addEventListener('click', ()=> {
  console.log('easy mode btn is clicked')
  easyModeBtn.classList.add("active");
  normalModeBtn.classList.add("disabled");
  normalModeBtn.classList.remove("active");
  hardModeBtn.classList.add("disabled");
  hardModeBtn.classList.remove("active")
});

normalModeBtn.addEventListener('click', ()=> {
  console.log('normal mode btn is clicked')
  normalModeBtn.classList.add("active");
  easyModeBtn.classList.add("disabled");
  easyModeBtn.classList.remove("active");
  hardModeBtn.classList.add("disabled");
   hardModeBtn.classList.remove("active");
});

hardModeBtn.addEventListener('click', ()=> {
    console.log('hard mode btn is clicked')
    hardModeBtn.classList.add("active");
    easyModeBtn.classList.add("disabled");
    easyModeBtn.classList.remove("active")
    normalModeBtn.classList.add("disabled");
    normalModeBtn.classList.remove("active")
});

const randomWordBtn = document.getElementById("randomWord");

randomWordBtn.addEventListener('click', ()=>{
  randomWordBtn.classList.toggle("active");
})

const gameStartBtn = document.getElementById("gameStartBtn")

gameStartBtn.addEventListener('click', async ()=>{
  const activeValues = document.querySelectorAll(".active");

  const data = {
    game_mode: activeValues[0].value,
    difficulty_id: activeValues[2].value,
  }
  console.log(data);

  // do a axios.post to /newgame
  const result = await axios.post("/game/options", data);
  console.log('result',result.data);
  if (result.data.message == "success"){
      window.location.href = `/game/${result.data.id}`;
  }
});