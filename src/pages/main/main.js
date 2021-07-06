import './main.css';
import '../../components/header/header.js';
import '../../styles/style.css'
import {isNextPageExist, isPreviousPageExist, getFilms} from "../../api/films/interactionDB";
import {checkUserInLocalStorage} from "../../utils/authLocalStorage";
import {transformation} from "../../utils/filmGenerateSortingFieldName";
let filmList = [];
let filteredFilmList = [];
let searchInput = document.getElementById('table-search-word');
let filmTable = document.getElementById('table-films');
let sortingField = 'pk';
let sortingOrder = 'asc';
let filmsCountOnPage = 3;
let actualPageNumber = 1;
const defaultSortingField = 'pk';
const defaultSortingOrder = 'asc';
const defaultFilmsCountOnPage = 3;
const defaultActualPageNumber = 1;

let previousPageButton = document.getElementById('previous-page-button');
let nextPageButton = document.getElementById('next-page-button');

document.addEventListener('DOMContentLoaded', async ()=>{
  if(checkUserInLocalStorage()){
    let cell = document.createElement("th");
    cell.setAttribute('class','films-table-header')
    cell.appendChild(document.createTextNode('more...'))
    filmTable.rows[0].appendChild(cell);
  }
  renderUI();
})

document.getElementById('select-count')
    .addEventListener('change', changeFilmsCountOnPage, true);

document
    .querySelectorAll('.films-table-header')
    .forEach((headerCell, index)=>{
      headerCell.addEventListener('click', ()=>{
        console.log(transformation(index));
        sortingHandler(transformation(index));
      })
    })

function sortingHandler(index){
  if (index == sortingField){
    if (sortingOrder == 'desc'){
      sortingOrder = defaultSortingOrder;
      sortingField = defaultSortingField;
    } else if (sortingOrder == 'asc'){
      sortingOrder = 'desc'
    }
  } else if (index != sortingField){
    sortingField = index;
    sortingOrder = defaultSortingOrder;
  }

  sortingTable(sortingField, sortingOrder);
}

function sortingTable(fieldName, direction){
  renderUI();
}

previousPageButton.addEventListener('click',loadPreviousPage);

nextPageButton.addEventListener('click',loadNextPage);

searchInput.addEventListener('keyup',()=>{
  console.log('we need to search: '+searchInput.value);
})

function changeFilmsCountOnPage(e){
  e.preventDefault();
  filmsCountOnPage = 1*(e.target.value);
  actualPageNumber = defaultActualPageNumber;
  renderUI();
}

async function renderUI(source = ''){
  cleanUpTable();
  let nextPageFilms = await isNextPageExist(sortingField,sortingOrder,filmsCountOnPage,actualPageNumber);
  let prevPageFilms = await isPreviousPageExist(sortingField,sortingOrder,filmsCountOnPage,actualPageNumber);
  if(!nextPageFilms){
    nextPageButton.classList.add('hidden');
  } else if (nextPageFilms){
    nextPageButton.classList.remove('hidden');
  }
  if(!prevPageFilms){
    previousPageButton.classList.add('hidden');
  } else if (prevPageFilms){
    previousPageButton.classList.remove('hidden');
  }
  console.log('from render: '+sortingField+", "+sortingOrder+", "+filmsCountOnPage+", "+actualPageNumber);
    let lastValueOnPage = '';
    let firstValueOnPage = '';
    if(source == 'next' || source == 'prev'){
      if(filmList[0]){
        firstValueOnPage = filmList[0][sortingField]
        console.log('FVP: '+firstValueOnPage);
      }
      if(filmList[filmList.length-1]){
        lastValueOnPage = filmList[filmList.length-1][sortingField];
        console.log('FVP: '+lastValueOnPage);
      }

    }

  filmList = await getFilmListFromAPI(sortingField,sortingOrder,filmsCountOnPage,actualPageNumber,'',firstValueOnPage,lastValueOnPage);

  filmList.forEach(film => {
    renderFilmTable(film);
  })
}

async function getFilmListFromAPI(sortingField = defaultSortingField, sortingOrder = defaultSortingOrder, limit = defaultFilmsCountOnPage, page = defaultActualPageNumber, direction = '',firstValueOnPage = '', lastValueOnPage = ''){
  let films =  getFilms(sortingField, sortingOrder, limit, page, 'next', firstValueOnPage, lastValueOnPage);
  return films;
}

async function loadNextPage(){
  actualPageNumber++;
  console.log('next')
  renderUI('next');
}

async function loadPreviousPage(){
  actualPageNumber--;
  console.log('prev');
  renderUI('prev');
}

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
    detailsButton.innerHTML = "<a href='../details.html?pk=+"+film.pk+"'><button class='btn btn-light'>Details</button></a>"
    cell5.appendChild(detailsButton);
  }
  row.setAttribute('class', 'film-row');
  row.setAttribute('id', 'film-' + film.pk);
}

function cleanUpTable(){
  document.querySelectorAll('.film-row').forEach(function (row){
    row.remove();
  })
}
