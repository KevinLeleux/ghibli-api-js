const app = document.getElementById('root')

const logo = document.createElement('img')
logo.setAttribute('class', 'logo')
logo.src = 'src/logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

const URL = "https://ghibliapi.herokuapp.com/films";


async function fetchTitles() {
    const data = await fetch(URL).then(res => res.json());
    data.forEach(createCard);
}

function createCard(data) {
    const card = document.createElement('div')
    card.setAttribute('class', 'card')
    card.setAttribute('style', `background-image: url(${data.image})`);
    card.setAttribute('id', data.id)
    
    const newlink = document.createElement('a');
    newlink.setAttribute('href', "?id="+data.id);
    newlink.insertAdjacentText('beforeend', data.title);
    container.appendChild(card)
    card.appendChild(newlink)
} 

async function fetchTitleById(id){
    let rep = await fetch(`${URL}/${id}`);
    let response = await rep.json();
    createCard(response)
    return response;
}


const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id) {
    fetchTitleById(id)
} else {
    fetchTitles()
}