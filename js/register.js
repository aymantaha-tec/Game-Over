// ? =============> Global ===============>
const btnRegister = document.getElementById('btnRegister');
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
    validtionName() && 
    validtionEmail() && 
    validtionPassword() &&
    validtionRePassword() && 
    validtionPhone()) {
    isValid = true;
    }
  else{
    isValid = false;
    }
});

function attachInputListeners() {
  let validationFunctions = [
    validtionName,
    validtionEmail,
    validtionPassword,
    validtionRePassword,
    validtionPhone
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
    name:inputs[0].value,
    email:inputs[1].value,
    password:inputs[2].value,
    rePassword: inputs[3].value,
	  phone:inputs[4].value,
  };
  
  registerFrom(user)
};




async function registerFrom(userData){
  const api = await fetch(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, {
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

    
    document.getElementById('msg').innerHTML = response.message;
    location.href= 'index.html';
  
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




//  =============> Validation ===============>

function validtionName(){
  const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
  if (regexStyle.test(inputs[0].value)){
    inputs[0].classList.add('is-valid');
    inputs[0].classList.remove('is-invalid');
    return true;
  }
  else {
    inputs[0].classList.add('is-invalid');
    inputs[0].classList.remove('is-valid');
    return false;
  }
};

function validtionEmail(){
  const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (regexEmail.test(inputs[1].value)){
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

function validtionPassword(){
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regexPassword.test(inputs[2].value)){
      inputs[2].classList.add('is-valid');
      inputs[2].classList.remove('is-invalid');
      return true;
    }
    else {
      inputs[2].classList.add('is-invalid');
      inputs[2].classList.remove('is-valid');
      return false;
    };

  };

function validtionRePassword(){

    if ((inputs[2].value == inputs[3].value) ){
      inputs[3].classList.add('is-valid');
      inputs[3].classList.remove('is-invalid');
      return true;
    }
    else {
      inputs[3].classList.add('is-invalid');
      inputs[3].classList.remove('is-valid');
      return false;
    };
  };

  function validtionPhone(){
    const regexPhone = /^(002)?01[0125][0-9]{8}$/;
  
      if (regexPhone.test(inputs[4].value)){
        inputs[4].classList.add('is-valid');
        inputs[4].classList.remove('is-invalid');
        return true;
      }
      else {
        inputs[4].classList.add('is-invalid');
        inputs[4].classList.remove('is-valid');
        return false;
      };
  
    };





