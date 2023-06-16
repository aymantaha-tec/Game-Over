// ? =============> Global ===============>
const btnLogin = document.getElementById('btnLogin');
const inputs = document.querySelectorAll('input');
const formData =document.forms[0];

const mode =document.getElementById('mode');
let isValid = false;

// ! =============> When Start ===============>

if (localStorage.getItem('theme') !== null){
  const themeData = localStorage.getItem('theme');

  if(themeData === 'light'){
    document.documentElement.setAttribute('data-theme', 'light');
    mode.classList.replace('fa-sun', 'fa-moon');
  }else {
    document.documentElement.setAttribute('data-theme', 'dark');
    mode.classList.replace('fa-moon', 'fa-sun');
  }
};

// * =============> Events ===============>
formData.addEventListener('submit', (e)=> {
  e.preventDefault();

  if(isValid){
    setForm()
  }

  });

formData.addEventListener('input', ()=>{
  if(
    validtionEmail() && 
    validtionPassword() ) {
    isValid = true;
    }
  else{
    isValid = false;
    }
});

function attachInputListeners() {
  let validationFunctions = [
    validtionEmail,
    validtionPassword
  ];

  inputs.forEach((input, index) => {
    input.addEventListener('input', function() {
      validationFunctions[index]();
    });
  });
}

attachInputListeners()

// ! =============> Functions ===============>

function setForm(){
  const user = {
    email:inputs[0].value,
    password:inputs[1].value
  };
  
  loginForm(user)
};

async function loginForm(userData){
  const api = await fetch(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, {
    method: 'post',
    body: JSON.stringify(userData),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      
    },
  })
  const response =await api.json()
  console.log(response)
  if (response.message === 'success'){
    localStorage.setItem('userToken', response.token)
    document.getElementById('msg').innerHTML = response.message;
    location.href= 'home.html'
  }
  else {
    document.getElementById('msg').innerHTML = response.message;
  }
};

  mode.addEventListener('click', ()=>{

  if (mode.classList.contains('fa-sun')){
    document.documentElement.setAttribute('data-theme', 'light');
    mode.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
  else {
    mode.classList.replace ( 'fa-moon','fa-sun');
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  };

  });
//&  =============> Validation ===============>



function validtionEmail(){
  const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (regexEmail.test(inputs[0].value)){
      inputs[0].classList.add('is-valid');
      inputs[0].classList.remove('is-invalid');
      return true;
    }
    else {
      inputs[0].classList.add('is-invalid');
      inputs[0].classList.remove('is-valid');
      return false;
    };

  };

function validtionPassword(){
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regexPassword.test(inputs[1].value)){
      inputs[1].classList.add('is-valid');
      inputs[1].classList.remove('is-invalid');
      return true;
    }
    else {
      inputs[1].classList.add('is-invalid');
      inputs[1].classList.remove('is-valid');
      return false;
    };

  };





