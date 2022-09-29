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
    const rep = await (await fetch(`${URL}/films/${id}`)).json();
    const peoples = rep.people;
    const title = document.createElement('h1');
    title.insertAdjacentText('beforeend', rep.title);
    container.appendChild(title);
    const original_title = document.createElement('h2');
    original_title.insertAdjacentText('beforeend', rep.original_title + "("+rep.original_title_romanised+")");
    container.appendChild(original_title);
    const description = document.createElement('p');
    description.insertAdjacentText('beforeend', rep.description);
    container.appendChild(description);
    console.log(rep);
    console.log(rep.release_date);
    console.log(rep.running_time);
    console.log(rep.producer);
    console.log(rep.director);
    if (peoples == 'https://ghibliapi.herokuapp.com/people/') {
        const data = false
        return data
    } else {
    const data = Promise.all(
        peoples.map(async (i) => await ( await fetch(i)).json())
    )
    return data
    }
}

function description(data) {
    if (data != false){
        const people = document.createElement('div');
        const list = document.createElement('ul')
        const title = document.createElement('h3')
        title.insertAdjacentText('beforeend', "Peoples :")
        people.setAttribute('class', 'people');
        container.appendChild(people)
        people.appendChild(title)
        people.appendChild(list)
        data.forEach(i => {
            const listA = document.createElement('li');
            const link = document.createElement('a');
            link.setAttribute('href', "?people="+i.id);
            link.insertAdjacentText('beforeend', i.name)
            list.appendChild(listA)
            listA.appendChild(link)
    });}
}


const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id) {
    fetchMoviesById(id).then(data => description(data))
} else {
    fetchMovies();
}