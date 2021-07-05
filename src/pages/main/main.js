import './main.css';
import '../../components/header/header.js';
import {getFilms} from "../../api/films/interactionDB";
import {checkUserInLocalStorage} from "../../utils/authLocalStorage";
let filmList = [];
let filteredFilmList = [];
let searchInput = document.getElementById('table-search-word');
let filmTable = document.getElementById('table-films');

document.addEventListener('DOMContentLoaded', async ()=>{
  filmList = await getFilmListFromAPI();

  if(checkUserInLocalStorage()){
    let cell = document.createElement("th");
    cell.setAttribute('class','films-table-header')
    cell.appendChild(document.createTextNode('more...'))
    filmTable.rows[0].appendChild(cell);
  }
  filmList.forEach(film => {
    renderFilmTable(film);
  })
})

async function getFilmListFromAPI(sortingField = 'pk', sortingOrder = 'asc', limit = 3, page = 1){
  let films =  getFilms(sortingField, sortingOrder, limit, page);
  return films;
}

searchInput.addEventListener('keyup',()=>{
  console.log('we need to search: '+searchInput.value);
})



function renderFilmTable(film) {
  const row = filmTable.insertRow(filmTable.rows.length);
  const cell0 = row.insertCell(0);
  cell0.appendChild(document.createTextNode(film.title));
  const cell1 = row.insertCell(1);
  cell1.appendChild(document.createTextNode(film.episode_id));
  const cell2 = row.insertCell(2);
  cell2.appendChild(document.createTextNode(film.release_date));
  const cell3 = row.insertCell(3);
  cell3.appendChild(document.createTextNode(film.director));
  const cell4 = row.insertCell(4);
  cell4.appendChild(document.createTextNode(film.producer));
  if(checkUserInLocalStorage()){
    const cell5 = row.insertCell(5);
    let detailsButton = document.createElement("a");
    console.log(film.pk)
    detailsButton.innerHTML = "<a href='../details.html?pk=+"+film.pk+"'><button class='btn btn-light'>Details</button></a>"
    cell5.appendChild(detailsButton);
  }

  row.setAttribute('class', 'film-row');
  row.setAttribute('id', 'film-' + film.pk);
}
