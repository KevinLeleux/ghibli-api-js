const app = document.getElementById('main')

const logo = document.createElement('a')
logo.setAttribute('href', './');
const image = document.createElement('img');
image.setAttribute('class', 'logo');
image.setAttribute('src', 'src/logo.png');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
logo.appendChild(image);
app.appendChild(container);

const URL = "https://ghibliapi.herokuapp.com";

async function fetchMovies() {
    const rep = await fetch(`${URL}/films`).then(rep => rep.json());
    rep.forEach(card);
}
function card(movie) {
    const link = document.createElement('a');
    link.setAttribute('href', "?id="+movie.id);
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('style', `background-image: url(${movie.image})`);   
    container.appendChild(link);
    link.appendChild(card);
}

async function fetchMoviesById(id){
    const rep = await fetch(`${URL}/films/${id}`).then(rep => rep.json());
    console.log(rep)
    const peoples = rep.people;
    const resutl = Promise.all()
    for (let i in peoples) {
        fetchPeoples(peoples[i]);
    }
}

async function fetchPeoples(peoples){
    const rep = await fetch(peoples).then(rep => rep.json());
    
}


const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id) {
    fetchMoviesById(id);
} else {
    fetchMovies();
}