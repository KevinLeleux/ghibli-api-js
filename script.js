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

const URL = "https://ghibliapi.herokuapp.com/films";

//Generate home page with all the movies (cards)
async function fetchTitles() {
    const data = await fetch(URL).then(res => res.json());
    data.forEach(createCard);
}
//Generate movie page with description and infos
async function fetchTitleById(id){
    const rep = await fetch(`${URL}/${id}`);
    const response = await rep.json();
    description(response);
}

async function fetchPeopleById(id) {
    const rep = await fetch(`https://ghibliapi.herokuapp.com/people/${id}`);
    const response = await rep.json();
    console.log(response.name)
}

function createCard(data) {
    //create link with movie id
    const link = document.createElement('a');
    link.setAttribute('href', "?id="+data.id);
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('style', `background-image: url(${data.image})`);   
    container.appendChild(link);
    link.appendChild(card);
} 

function description(response) {
    const description = document.createElement('div');
    description.setAttribute('class', 'description');
    const text = document.createElement('p')
    text.insertAdjacentText('beforeend', response.description)

    container.appendChild(description)
    description.appendChild(text)
    people(response)
}
function people(response) {
    const people = document.createElement('div');
    const list = document.createElement('ul')
    people.setAttribute('class', 'people');
    container.appendChild(people)
    people.appendChild(list)
    response.people.forEach(function(element) {
        var peopleId = element.replace('https://ghibliapi.herokuapp.com/people/','');
        console.log(peopleId);
        fetchPeopleById(peopleId);
        const listA = document.createElement('li');
        const link = document.createElement('a');
        link.setAttribute('href', "?people="+peopleId);
        link.insertAdjacentText('beforeend', response)
        list.appendChild(listA)
        listA.appendChild(link)
    })
}

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id) {
    fetchTitleById(id)
} else {
    fetchTitles()
}