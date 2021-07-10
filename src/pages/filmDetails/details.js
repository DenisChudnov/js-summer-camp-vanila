//There are imports of styles, component and functions
import './details.css';
import '../../components/header/header.js';
import '../../components/accordion/accordion.js';
import {checkUserInLocalStorage} from '../../utils/authLocalStorage';
import {getCurrentFilm} from '../../api/services/filmService';
import {getPeopleListByPrimaryKeys} from "../../api/services/peopleService";
import {getPlanetsByKeyList} from "../../api/services/planetService";
import {getSpeciesByKeyList} from "../../api/services/speciesService";
import {getStarshipsByKeyList} from "../../api/services/starshipService";
import {getVehicleByKeyList} from "../../api/services/vehicleService";

import {openModalWindow} from "../../components/modal/modal";

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
document.getElementById('characters-panel').innerHTML = '<ul id="characters-list"></ul>';
charactersAccordionElement.addEventListener('click', ()=>{
  if (characters.length == 0){
    fillCharactersList();
  }
});

/**
 * PLANETS LIST, which render only on click
 * @type {Element}
 */
const planetsAccordionElement = document.getElementsByClassName('accordion-button-panel')[1];
planetsAccordionElement.innerText = 'PLANETS';
document.getElementsByClassName('accordion-content-panel')[1].setAttribute('id','planets-panel');
document.getElementById('planets-panel').innerHTML = '<ul id="planets-list"></ul>';
planetsAccordionElement.addEventListener('click', ()=>{
  if (planets.length == 0){
    fillPlanetsList();
  }
});

/**
 * SPECIES LIST, render by click
 * @type {Element}
 */
const speciesAccordionElement = document.getElementsByClassName('accordion-button-panel')[2];
speciesAccordionElement.innerText = 'SPECIES';
document.getElementsByClassName('accordion-content-panel')[2].setAttribute('id','species-panel');
document.getElementById('species-panel').innerHTML = '<ul id="species-list"></ul>';
speciesAccordionElement.addEventListener('click', ()=>{
  if (species.length == 0){
    fillSpeciesList();
  }
});

/**
 * STARSHIPS LIST, render by click
 * @type {Element}
 */
const starshipsAccordionElement = document.getElementsByClassName('accordion-button-panel')[3];
starshipsAccordionElement.innerText = 'STARSHIPS';
document.getElementsByClassName('accordion-content-panel')[3].setAttribute('id','starship-panel');
document.getElementById('starship-panel').innerHTML = '<ul id="starships-list"></ul>';
starshipsAccordionElement.addEventListener('click', ()=>{
  if (starships.length == 0){
    fillStarshipsList();
  }
});

/**
 * VEHICLES LIST, render by click
 * @type {Element}
 */
const vehiclesAccordionElement = document.getElementsByClassName('accordion-button-panel')[4];
vehiclesAccordionElement.innerText = 'VEHICLES';
document.getElementsByClassName('accordion-content-panel')[4].setAttribute('id','vehicles-panel');
document.getElementById('vehicles-panel').innerHTML = '<ul id="vehicles-list"></ul>';
vehiclesAccordionElement.addEventListener('click', ()=>{
  if (vehicles.length == 0){
    fillVehiclesList();
  }
});


/**
 * This function get integer key and return film object with equal primary key.
 * @param key
 * @return {Promise<*>}
 */
export async function getCurrentFilmData(key){
  return  await getCurrentFilm(key);
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
async function fillCharactersList(){
  const countOfFilmCharacters = film.characters.length;
  //unfortunatelly, firestore can send back values,
  //which has primary key, included in array of keys
  //only for 10 max keys.
  //So, i just separate my keys array for pieces with 10 values;
  //And get all data, that i need without data, which i don't need;
  //optimization, bitch!(c) *Jesse_Pinkman.PNG*
  for(let i = 0; i<=countOfFilmCharacters;i+=10){
    let listForQuery = film.characters.slice(i,i+10);
    if(listForQuery!=[] && listForQuery.length>0){
      const result = await getPeopleListByPrimaryKeys(listForQuery);
      characters = characters.concat(result);
    }
  }
  characters.forEach(character=>{
    const newLi = document.createElement('li');
    newLi.innerText = character.name;
    document.getElementById('characters-list').appendChild(newLi);
  })
}

async function fillPlanetsList(){
  const countOfFilmPlanets = film.planets.length;
  for(let i = 0; i<=countOfFilmPlanets;i+=10){
    let listForQuery = film.planets.slice(i,i+10);
    if(listForQuery!=[] && listForQuery.length>0){
      const result = await getPlanetsByKeyList(listForQuery);
      planets = planets.concat(result);
    }
  }
  planets.forEach(planet=>{
    const newLi = document.createElement('li');
    newLi.innerText = planet.name;
    document.getElementById('planets-list').appendChild(newLi);
  })
}

async function fillSpeciesList(){
  const countOfFilmSpecies = film.species.length;
  for(let i = 0; i<=countOfFilmSpecies;i+=10){
    let listForQuery = film.species.slice(i,i+10);
    if(listForQuery!=[] && listForQuery.length>0){
      const result = await getSpeciesByKeyList(listForQuery);
      species = species.concat(result);
    }
  }
  species.forEach(spec=>{
    const newLi = document.createElement('li');
    newLi.innerText = spec.name;
    document.getElementById('species-list').appendChild(newLi);
  })
}

async function fillStarshipsList(){
  const countOfFilmStarships = film.starships.length;
  for(let i = 0; i<=countOfFilmStarships;i+=10){
    let listForQuery = film.starships.slice(i,i+10);
    if(listForQuery!=[] && listForQuery.length>0){
      const result = await getStarshipsByKeyList(listForQuery);
      starships = starships.concat(result);
    }
  }
  starships.forEach(spec=>{
    const newLi = document.createElement('li');
    newLi.innerText = spec.MGLT;
    document.getElementById('starships-list').appendChild(newLi);
  })
}

async function fillVehiclesList(){
  const countOfFilmVehicles = film.vehicles.length;
  for(let i = 0; i<=countOfFilmVehicles;i+=10){
    let listForQuery = film.vehicles.slice(i,i+10);
    if(listForQuery!=[] && listForQuery.length>0){
      const result = await getVehicleByKeyList(listForQuery);
      vehicles = vehicles.concat(result);
    }
  }
  vehicles.forEach(spec=>{
    const newLi = document.createElement('li');
    newLi.innerText = spec.vehicle_class;
    document.getElementById('vehicles-list').appendChild(newLi);
  })
}
