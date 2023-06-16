// ? =============> Global ===============>

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

const searchParam = location.search;
const pramas = new URLSearchParams(searchParam);

const id = pramas.get('id');

(async function(){

  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '959d976a00msha3cd72ef3f678eap1ee65cjsnf7c22e9a6f11',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
    const api = await fetch(url, options);

    const respons = await api.json();
    console.log(respons)
    displayData(respons)
})();

function displayData(data) {
  let detailsBox = `
  
  <div class="col-md-4">
  <figure>
    <img src="${data.thumbnail}" class="w-100" alt="details image" />
  </figure>
</div>
<div class="col-md-8">

  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
        <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
      </ol>
    </nav>

    <h1>${data.title}</h1>

    <h3>About ${data.title}</h3>
    <p>${data.description}</p>

  </div>
  <a class="play-now btn btn-outline-primary" href=${data.game_url}> Play Now</a>
</div>

  `;

  document.getElementById("detailsData").innerHTML = detailsBox;
  document.body.style.cssText = `background:url('${data.thumbnail.replace("thumbnail", "background")}') center / cover no-repeat`;
}

// ? =============> Event ===============>

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

