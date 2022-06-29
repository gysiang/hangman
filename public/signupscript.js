
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
      window.location = '/game';
    }
  
    } catch(error) {
      // if there is an error show the error to the user.
      console.log(error)
      errorText.textContent = 'Email is in use!';
      errorText.classList.remove('d-none');
    }
})


