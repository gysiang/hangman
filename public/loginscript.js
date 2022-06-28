const loginBtn = document.getElementById('loginBtn')

loginBtn.addEventListener('click', async ()=>{
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  }
  console.log(data);
  try {
  const user = await axios.post("/login", data)
      console.log(user)
      if (user.data = 'success'){
        window.location = "/game";
      }
    } catch (error){
      console.log(error)
      errorText.textContent = 'Wrong Email or Password!';
      errorText.classList.remove('d-none');
    }
  });
