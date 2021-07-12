//There are import of some functions, styles and components
import './main.css';
import '../../components/header/header.js';
import '../../styles/style.css'
import {
  getFilmsQueryBuilder
} from "../../api/services/filmService";
import {checkUserInLocalStorage} from "../../utils/authLocalStorage";
import {transformation} from "../../utils/filmGenerateSortingFieldName";

//There are variables for table managment
let filmList = [];
let sortingField = 'pk';
let sortingOrder = 'asc';
let filmsCountOnPage = 3;
let paginationClickCount = 0;
const defaultSortingField = 'pk';
const defaultSortingOrder = 'asc';
const defaultFilmsCountOnPage = 3;

//There are page element, which need to interaction
const previousPageButton = document.getElementById('previous-page-button');
const nextPageButton = document.getElementById('next-page-button');
const searchInput = document.getElementById('table-search-word');
const filmTable = document.getElementById('table-films');

//Document events listeners
previousPageButton
    .addEventListener('click',loadPreviousPage);

nextPageButton
    .addEventListener('click',loadNextPage);


document.getElementById('managment-check').addEventListener('click',()=>{
  window.open('../management.html?pk=1','_self');
})

document.getElementById('new-check').addEventListener('click',()=>{
  window.open('../management.html','_self');
})

/**
 * On start enter something in search input -
 * we firstly cleaning up table content,
 * and then - calling function to make a request
 * for render all films, finded by title started with
 * entered search value;
 */
searchInput
    .addEventListener('keyup',async () => {
  let searchingValue = searchInput.value;
      paginationClickCount = 0;
  let result = await getFilmListFromAPI(sortingField, sortingOrder,filmsCountOnPage,'current','','', searchingValue);
  cleanUpTable();
  result.forEach(film=>{
    renderFilmInTable(film);
  })
})

/**
 * On loaded DOM content we need to render film table.
 * If user is logged in - table will include additional column
 * with details button, which can open film detail page
 * After this check - fill rendered table content by call renderUI function
 */
document
    .addEventListener('DOMContentLoaded', async () => {
  if(checkUserInLocalStorage()){
    let cell = document.createElement("th");
    cell.setAttribute('class','films-table-header')
    cell.appendChild(document.createTextNode('more...'))
    filmTable.rows[0].appendChild(cell);
  }
  renderUI();
})

document
    .getElementById('select-count')
    .addEventListener('change', changeFilmsCountOnPage, true);

/**
 * There are click listener for every table column name (excluded additional column with details button) ;
 * On click on some column head - will calling sorting handler function - it work with column name and
 * call sorting functions with asc by 1 click, desc by 2 click and without filtering on 3 click.
 */
document
    .querySelectorAll('.films-table-header')
    .forEach((headerCell, index)=>{
      headerCell.addEventListener('click', ()=>{
        sortingHandler(transformation(index));
      })
    })


/**
 * This is function for call service function, which communicate with API;
 * Get all actual table parameters, return array of objects of film class
 * @param sortingField
 * @param sortingOrder
 * @param limit
 * @param direction
 * @param firstValueOnPage
 * @param lastValueOnPage
 * @return {Promise<*[]>}
 */
async function getFilmListFromAPI(sortingField = defaultSortingField, sortingOrder = defaultSortingOrder, limit = defaultFilmsCountOnPage,  direction,firstValueOnPage = '', lastValueOnPage = '', searchValue = ''){
  if(!firstValueOnPage || firstValueOnPage == ''){
    lastValueOnPage = 0;
  }

  const queryParameters = {
    'sortingByField':sortingField,
    'sortingOrder':sortingOrder,
    'limit':limit,
    'direction':direction,
    'endBeforeValue':firstValueOnPage,
    'startAfterValue':lastValueOnPage,
    'filterValue':searchValue
  }

  let films =  getFilmsQueryBuilder(queryParameters);
  return films;
}

/**
 * Function for determinate
 * sorting parameters: field and order;
 * On first click on some column - select column name and order asc;
 * On second - column name and order desc;
 * on third - sorting is default - by primary key with asc order;
 * and call render function
 * @param index
 */
function sortingHandler(index){
  if (index == sortingField){
    if (sortingOrder == 'desc'){
      sortingOrder = defaultSortingOrder;
      sortingField = defaultSortingField;
    } else if (sortingOrder == defaultSortingOrder){
      sortingOrder = 'desc'
    }
  } else if (index != sortingField){
    sortingField = index;
    sortingOrder = defaultSortingOrder;
  }
  paginationClickCount = 0;
  renderUI();
}

/**
 * Simple function for change films count on page value and calling render function
 * @param e
 */
function changeFilmsCountOnPage(e){
  e.preventDefault();
  paginationClickCount = 0;
  filmsCountOnPage = Number(e.target.value);
  renderUI();
}

/**
 * Function for render table content and prev and next buttons:
 * source - is page, wich calling render (default = current),
 * for render next or previous page - sourse is next or prev;
 * there are call function, which interactive with API method with all needed parameters.
 * and after get response from API - call render function for each responses films;
 * @param source
 * @return {Promise<void>}
 */
async function renderUI(source = 'current'){
  cleanUpTable();
  let lastValueOnPage = '';
  let firstValueOnPage = '';

    if(filmList[0]){
      firstValueOnPage = filmList[0][sortingField]
    }
    if(filmList[filmList.length-1]){
      lastValueOnPage = filmList[filmList.length-1][sortingField];
    }

    let count = filmsCountOnPage;
    if(source != 'prev'){
      count+=1;
    }

  filmList = await getFilmListFromAPI(sortingField,sortingOrder,count,source,firstValueOnPage,lastValueOnPage);
  let isNextPageExist = false;

  if((filmList.length > filmsCountOnPage) || source == 'prev'){
    isNextPageExist = true
  } else if (filmList.length <= filmsCountOnPage) {
    isNextPageExist = false;
  }

  filmList = filmList.slice(0,filmsCountOnPage);
  filmList.forEach(film => {
    renderFilmInTable(film);
  })
 if(!isNextPageExist){
    nextPageButton.classList.add('hidden');
  } else if (isNextPageExist){
    nextPageButton.classList.remove('hidden');
  }
  if(paginationClickCount === 0){
    previousPageButton.classList.add('hidden');
  } else if (paginationClickCount >0){
    previousPageButton.classList.remove('hidden');
  }
}



/**
 * Funtion for call render page content
 * for NEXT page after current
 * @return {Promise<void>}
 */
async function loadNextPage(){
  paginationClickCount++;
  renderUI('next');
}

/**
 * Function for call render page contenr
 * for PREVIOUS page, before current
 * @return {Promise<void>}
 */
async function loadPreviousPage(){
  paginationClickCount --;
  renderUI('prev');
}

/**
 * Function for render table row;
 * Get film class object, and render it, as table row;
 * @param film
 */
function renderFilmInTable(film) {
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
    detailsButton.innerHTML = `<a href='../details.html?pk=${film.pk}'><button class='btn btn-light'>Details</button></a>`
    cell5.appendChild(detailsButton);
  }
  row.setAttribute('class', 'film-row');
  row.setAttribute('id', `film-${film.pk}`);
}

/**
 * Function for remove all table rows
 */
function cleanUpTable(){
  document.querySelectorAll('.film-row').forEach(function (row){
    row.remove();
  })
}
