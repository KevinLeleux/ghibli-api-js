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

async function fetchTitleById(id){
    const rep = await fetch(`${URL}/${id}`);
    const response = await rep.json();
    description(response)
}
function createCard(data) {
    const link = document.createElement('a');
    link.setAttribute('href', "?id="+data.id);
    //link.insertAdjacentText('beforeend', data.title);

    const card = document.createElement('div')
    card.setAttribute('class', 'card')
    card.setAttribute('style', `background-image: url(${data.image})`);
    
    container.appendChild(link)
    link.appendChild(card)
} 

function description(response) {
    const description = document.createElement('div');
    description.setAttribute('class', 'description');
    const text = document.createElement('p')
    text.insertAdjacentText('beforeend', response.description)

    container.appendChild(description)
    description.appendChild(text)
}


const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id) {
    fetchTitleById(id)
} else {
    fetchTitles()
}