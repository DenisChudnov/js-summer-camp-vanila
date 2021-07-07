import './details.css';
import '../../components/header/header.js';
import '../../components/accordion/accordion.js';
import {checkUserInLocalStorage} from '../../utils/authLocalStorage';
import {getCurrentFilm} from '../../api/services/filmService';
import {getPeopleListByPrimaryKeys} from "../../api/services/peopleService";
import {getPlanetsByKeyList, getPlanetsListByKeys} from "../../api/services/planetService";
import {getSpeciesByKeyList} from "../../api/services/speciesService";
import {getStarshipsByKeyList} from "../../api/services/starshipService";
import {getVehicleByKeyList} from "../../api/services/vehicleService";
let characters = [];
let planets = [];
let species = [];
let starships = [];
let vehicles = [];
let film;




document.addEventListener('DOMContentLoaded', async () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const primaryKey = urlParams.get('pk');
  if (!checkUserInLocalStorage()){
    alert('You should be authorized to watch this page, dude');
    window.open('auth.html', '_self');
  } else {
    film = await getCurrentFilmData(primaryKey);
    alert('welcome, dude. This page for "'+film.title+'" film.');
    displayFilmBasicDetails(film);
  }

});

let charactersAccordionElement = document.getElementsByClassName('accordion-button-panel')[0];
charactersAccordionElement.innerText = 'CHARACTERS';
document.getElementsByClassName('accordion-content-panel')[0].setAttribute('id','characters-panel');
document.getElementById('characters-panel').innerHTML = '<ul id="characters-list"></ul>';
charactersAccordionElement.addEventListener('click', ()=>{
  if (characters.length == 0){
    fillCharactersList();
  }
});


let planetsAccordionElement = document.getElementsByClassName('accordion-button-panel')[1];
planetsAccordionElement.innerText = 'PLANETS';
document.getElementsByClassName('accordion-content-panel')[1].setAttribute('id','planets-panel');
document.getElementById('planets-panel').innerHTML = '<ul id="planets-list"></ul>';
planetsAccordionElement.addEventListener('click', ()=>{
  if (planets.length == 0){
    fillPlanetsList();
  }
});

let speciesAccordionElement = document.getElementsByClassName('accordion-button-panel')[2];
speciesAccordionElement.innerText = 'SPECIES';
document.getElementsByClassName('accordion-content-panel')[2].setAttribute('id','species-panel');
document.getElementById('species-panel').innerHTML = '<ul id="species-list"></ul>';
speciesAccordionElement.addEventListener('click', ()=>{
  if (species.length == 0){
    fillSpeciesList();
  }
});

let starshipsAccordionElement = document.getElementsByClassName('accordion-button-panel')[3];
starshipsAccordionElement.innerText = 'STARSHIPS';
document.getElementsByClassName('accordion-content-panel')[3].setAttribute('id','starship-panel');
document.getElementById('starship-panel').innerHTML = '<ul id="starships-list"></ul>';
starshipsAccordionElement.addEventListener('click', ()=>{
  if (starships.length == 0){
    fillStarshipsList();
  }
});

let vehiclesAccordionElement = document.getElementsByClassName('accordion-button-panel')[4];
vehiclesAccordionElement.innerText = 'VEHICLES';
document.getElementsByClassName('accordion-content-panel')[4].setAttribute('id','vehicles-panel');
document.getElementById('vehicles-panel').innerHTML = '<ul id="vehicles-list"></ul>';
vehiclesAccordionElement.addEventListener('click', ()=>{
  if (vehicles.length == 0){
    fillVehiclesList();
  }
});


/**
 *
 */
export async function getCurrentFilmData(key){
  let film = await getCurrentFilm(key*1);
  return film;
}

function displayFilmBasicDetails(film){
  document.getElementById('film-title').innerText = film.title;
  document.getElementById('director').innerText = film.director
  document.getElementById('producer').innerText = film.producer
  document.getElementById('release-date').innerText = film.release_date
  document.getElementById('opening-crawl').innerText = film.opening_crawl
}

async function fillCharactersList(){
  let count = film.characters.length;
  console.log(count);
  for(let i = 0; i<=count;i+=10){

    let listForQuery = film.characters.slice(i,i+10);
    if(listForQuery!=[]){
      let result = await getPeopleListByPrimaryKeys(listForQuery);
      console.log(result)
      characters = characters.concat(result);
    }
  }

  characters.forEach(character=>{
    console.log(character.name)
    let newLi = document.createElement('li');
    newLi.innerText = character.name;
    document.getElementById('characters-list').appendChild(newLi);
  })
}

async function fillPlanetsList(){
  let count = film.planets.length;
  for(let i = 0; i<=count;i+=10){
    let listForQuery = film.planets.slice(i,i+10);
    if(listForQuery!=[]){
      let result = await getPlanetsByKeyList(listForQuery);
      planets = planets.concat(result);
    }
  }
  planets.forEach(planet=>{
    let newLi = document.createElement('li');
    newLi.innerText = planet.name;
    document.getElementById('planets-list').appendChild(newLi);
  })
}

async function fillSpeciesList(){
  let count = film.species.length;
  for(let i = 0; i<=count;i+=10){
    let listForQuery = film.species.slice(i,i+10);
    if(listForQuery!=[]){
      let result = await getSpeciesByKeyList(listForQuery);
      species = species.concat(result);
    }
  }
  species.forEach(spec=>{
    let newLi = document.createElement('li');
    newLi.innerText = spec.name;
    document.getElementById('species-list').appendChild(newLi);
  })
}

async function fillStarshipsList(){
  let count = film.starships.length;
  for(let i = 0; i<=count;i+=10){
    let listForQuery = film.starships.slice(i,i+10);
    if(listForQuery!=[]){
      let result = await getStarshipsByKeyList(listForQuery);
      starships = starships.concat(result);
    }
  }
  starships.forEach(spec=>{
    let newLi = document.createElement('li');
    newLi.innerText = spec.MGLT;
    document.getElementById('starships-list').appendChild(newLi);
  })
}

async function fillVehiclesList(){
  let count = film.vehicles.length;
  for(let i = 0; i<=count;i+=10){
    let listForQuery = film.vehicles.slice(i,i+10);
    if(listForQuery!=[]){
      let result = await getVehicleByKeyList(listForQuery);
      vehicles = vehicles.concat(result);
    }
  }
  vehicles.forEach(spec=>{
    let newLi = document.createElement('li');
    newLi.innerText = spec.vehicle_class;
    document.getElementById('vehicles-list').appendChild(newLi);
  })
}
