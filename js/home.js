// ? =============> Global ===============>
let navLink = document.querySelectorAll('.menu .nav-link');
const loading = document.querySelector('.loading');

const mode =document.getElementById('mode');
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
getGames('mmorpg');
// * =============> Events ===============>

navLink.forEach((nav) => {
  nav.addEventListener('click', (e)=> {
    document.querySelector('.menu .active').classList.remove('active')
    nav.classList.add('active');
    const category = e.target.innerText;
    getGames (category)
  });
});

document.querySelector('.logout-btn').addEventListener('click', ()=> {
  localStorage.removeItem('userToken');
  location.href= './index.html';
});

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

// ! =============> Functions ===============>

async function getGames (categoryName){
  loading.classList.remove('d-none');
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '959d976a00msha3cd72ef3f678eap1ee65cjsnf7c22e9a6f11',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  const getApi = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options)
  const result = await getApi.json();
  displayData(result);
  loading.classList.add('d-none');
};


function displayData(data){
  let gamesBox = ``;
  for (let i = 0; i < data.length; i++) {
    let videPath = data[i].thumbnail.replace('thumbnail.jpg', 'videoplayback.webm');
    gamesBox += `
    <div class="col">
      <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" class="card h-100 bg-transparent" role="button" onclick="showDetails(${data[i].id})">
        <div class="card-body">
          <figure class="position-relative">
            <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />
            <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
            <source src="${videPath}">
            </video>
          </figure>
          <figcaption>
            <div class="hstack justify-content-between">
              <h3 class="h6 small">${data[i].title}</h3>
              <span class="badge text-bg-primary p-2">Free</span>
            </div>
            <p class="card-text small text-center opacity-50">
              ${data[i].short_description.split(" ", 8)}
            </p>
          </figcaption>
        </div>
        <footer class="card-footer small hstack justify-content-between">
          <span class="badge badge-color">${data[i].genre}</span>
          <span class="badge badge-color">${data[i].platform}</span>
        </footer>
      </div>
  </div>
    `;
  };
  document.getElementById("gameData").innerHTML = gamesBox;
  
};


 function startVideo (e) {
  let playVideo = e.target.querySelector('video');
  playVideo.muted = true;
  playVideo.classList.remove('d-none');
   playVideo.play();
 };


  function stopVideo(e){
  let playVideo = e.target.querySelector('video');
  playVideo.muted = true;
  playVideo.classList.add('d-none');  
  playVideo.pause();
};

function showDetails(id){
  location.href= `details.html?id=${id}`;
};

