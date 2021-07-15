//There are imports of styles, component and functions
import './details.css';
import '../../components/header/header.js';
import '../../components/accordion/accordion.js';
import {checkUserInLocalStorage} from '../../utils/authLocalStorage';
import {getCurrentFilm} from '../../api/services/filmService';
import {openModalWindow} from "../../components/modal/modal";
import {getDataByKeysList} from "../../api/services/detailsService";

//some variables for page managment
let characters = [];
let planets = [];
let species = [];
let starships = [];
let vehicles = [];
let film;

/**
 * Listener for dom loaded event.
 * Additional check for user auth and return it to login page,
 * if user is not authenticated.
 * If user is authenticated - call method for get
 * current film data from API and render basic info,
 * which do not require additional requests to the API
 */
document.addEventListener('DOMContentLoaded', async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const primaryKey = Number(urlParams.get('pk'));
  if (!checkUserInLocalStorage()){
    openModalWindow('error', 'You should be authorized to watch this page, dude');
    window.open('auth.html', '_self');
  } else {
    film = await getCurrentFilmData(primaryKey);
    displayFilmBasicDetails(film);
    openModalWindow('welcome', `welcome, dude! This page for ${film.title} film.`)
  }
});

/**
 * CHARACTERS LIST, wich rendered only on click
 * For every film data, which can require additional request -
 * there are appear accordion element,
 * which send request to get data only if user want to see this data.
 * Every accordion created with custom element and has click event listener - to call API and render result.
 * This actual for every accordion in this page;
 * @type {Element}
 */
const charactersAccordionElement = document.getElementsByClassName('accordion-button-panel')[0];
charactersAccordionElement.innerText = 'CHARACTERS';
document.getElementsByClassName('accordion-content-panel')[0].setAttribute('id','characters-panel');
document.getElementById('characters-panel').innerHTML = '<ul id = "characters-list"></ul>';
charactersAccordionElement.addEventListener('click', async () => {
  if (characters.length == 0){
    characters = await fillDataList(
        'people',
        film.characters,
        characters,
        document.getElementById('characters-list'),
        charactersAccordionElement);
  }
});

/**
 * PLANETS LIST, which render only on click
 * @type {Element}
 */
const planetsAccordionElement = document.getElementsByClassName('accordion-button-panel')[1];
planetsAccordionElement.innerText = 'PLANETS';
document.getElementsByClassName('accordion-content-panel')[1].setAttribute('id','planets-panel');
document.getElementById('planets-panel').innerHTML = '<ul id = "planets-list"></ul>';
planetsAccordionElement.addEventListener('click', async () => {
  if (planets.length == 0){
    planets = await fillDataList(
        'planet',
        film.planets,
        planets,
        document.getElementById('planets-list'),
        planetsAccordionElement);
  }
});

/**
 * SPECIES LIST, render by click
 * @type {Element}
 */
const speciesAccordionElement = document.getElementsByClassName('accordion-button-panel')[2];
speciesAccordionElement.innerText = 'SPECIES';
document.getElementsByClassName('accordion-content-panel')[2].setAttribute('id','species-panel');
document.getElementById('species-panel').innerHTML = '<ul id = "species-list"></ul>';
speciesAccordionElement.addEventListener('click', async () => {
  if (species.length == 0){
    species = await fillDataList(
        'species',
        film.species,
        species,
        document.getElementById('species-list'),
        speciesAccordionElement);
  }
});

/**
 * STARSHIPS LIST, render by click
 * @type {Element}
 */
const starshipsAccordionElement = document.getElementsByClassName('accordion-button-panel')[3];
starshipsAccordionElement.innerText = 'STARSHIPS';
document.getElementsByClassName('accordion-content-panel')[3].setAttribute('id','starship-panel');
document.getElementById('starship-panel').innerHTML = '<ul id = "starships-list"></ul>';
starshipsAccordionElement.addEventListener('click', async () => {
  if (starships.length == 0){
    starships = await fillDataList(
        'starship',
        film.starships,
        starships,
        document.getElementById('starships-list'),
        starshipsAccordionElement);
  }
});

/**
 * VEHICLES LIST, render by click
 * @type {Element}
 */
const vehiclesAccordionElement = document.getElementsByClassName('accordion-button-panel')[4];
vehiclesAccordionElement.innerText = 'VEHICLES';
document.getElementsByClassName('accordion-content-panel')[4].setAttribute('id','vehicles-panel');
document.getElementById('vehicles-panel').innerHTML = '<ul id = "vehicles-list"></ul>';
vehiclesAccordionElement.addEventListener('click', async () => {
  if (vehicles.length == 0){
    vehicles = await fillDataList(
        'vehicle',
        film.vehicles,
        vehicles,
        document.getElementById('vehicles-list'),
        vehiclesAccordionElement);
  }
});


/**
 * This function get integer key and return film object with equal primary key.
 * @param key
 * @return {Promise<*>}
 */
export async function getCurrentFilmData(key){
  return await getCurrentFilm(key, function(type, message){
    openModalWindow(type, message)
  });
}

/**
 * This function for render basic film data, which not required additional API requests;
 * @param film
 */
function displayFilmBasicDetails(film){
  document.getElementById('film-title').innerText = film.title;
  document.getElementById('director').innerText = film.director
  document.getElementById('producer').innerText = film.producer
  document.getElementById('release-date').innerText = film.release_date
  document.getElementById('opening-crawl').innerText = film.opening_crawl
}

/**
 * This function for call service functions, making request and get characters,
 * which included to current film;
 * and after get response - render it to list on accordion body
 * @return {Promise<void>}
 */

async function fillDataList(entityName, entityList, dataList, listHTMLElement, accordionHTMLElement){
  dataList = await getDataByKeysList(entityName, entityList, function (type, message) {
    openModalWindow(type, message);
  })

  dataList.forEach(item => {
    const newLI = document.createElement('li');
    if(item.starship_class){
      newLI.innerText = item.starship_class
    } else if (item.vehicle_class){
      newLI.innerText = item.vehicle_class
    } else {
      newLI.innerText = item.name
    }
  listHTMLElement.appendChild(newLI);
  })
  accordionHTMLElement.nextElementSibling.style.maxHeight = 24 * entityList.length + 'px';
  return dataList;
}
