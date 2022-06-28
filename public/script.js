
const signupBtn = document.getElementById('signupBtn')

signupBtn.addEventListener('click', async ()=>{
  const name =document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorText = document.getElementById('errortext');
  
  const data = {
    name,
    email,
    password,
  }
  console.log(data);

  if (name === '' || email === '' || password === ''){
    errorText.textContent = 'Please fill in everything!';
    errorText.classList.remove('d-none');
    return;
  }
  try {
    const result = await axios.post("/signup", data);
    console.log(result);
    // if signup okay then load the game options
    if (result.data = "success"){
      window.location.href = '/game';
    }
  
    } catch(error) {
      // if there is an error show the error to the user.
      console.log(error)
      errorText.textContent = 'Email is in use!';
      errorText.classList.remove('d-none');
    }
})

const userInput = () => {
    for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    button.addEventListener("onclick", ()=> {
      button.disabled = true;
    })
    letterContainer.append(button);
  }
}
const chanceImgDiv = document.getElementById("chanceImageDiv")
const chancesImage = (input) => {
  for (let i=0; i< input; i+=1){
    let chance_img = document.createElement("IMG");
    chance_img.setAttribute("src", "images/apple.png");
    chanceImgDiv.appendChild(chance_img);
  }
}