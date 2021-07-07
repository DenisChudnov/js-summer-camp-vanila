import './details.css';
import '../../components/header/header.js';
import '../../components/accordion/accordion.js';
import {checkUserInLocalStorage} from '../../utils/authLocalStorage';
import {getCurrentFilm} from '../../api/services/filmService';
import {getPeopleListByPrimaryKeys} from "../../api/services/peopleService";
import {getPlanetsListByKeys} from "../../api/services/planetService";
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
charactersAccordionElement.addEventListener('click', ()=>{
  if (planets.length == 0){
    fillPlanetsList();
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
  for(let i = 0; i<=count;i+=10){
    let listForQuery = film.characters.slice(i,i+10);
    if(listForQuery!=[]){
      let result = await getPeopleListByPrimaryKeys(listForQuery);
      characters = characters.concat(result);
    }
  }
  characters.forEach(character=>{
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
      let result = await getPlanetsListByKeys(listForQuery);
      planets = planets.concat(result);
    }
  }
  planets.forEach(planet=>{
    let newLi = document.createElement('li');
    newLi.innerText = planet.name;
    document.getElementById('planets-list').appendChild(newLi);
  })
}
