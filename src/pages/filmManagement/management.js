import './management.css';
import '../../styles/style.css'
import '../../components/header/header.js';
import '../../components/accordion/accordion.js';
import {checkUserInLocalStorage} from "../../utils/authLocalStorage";
import {Film} from "../../utils/models/film";
import {getCurrentFilm, createFilmQuery, updateFilmQuery} from "../../api/services/filmService";
import {openModalWindow} from '../../components/modal/modal.js'
import {getFullPeoplesList} from "../../api/services/peopleService";
import {getFullPlanetsList} from "../../api/services/planetService";
import {getFullSpeciesList} from "../../api/services/speciesService";
import {getFullStarshipsList} from "../../api/services/starshipService";
import {getFullVehicleList} from "../../api/services/vehicleService";

//some variables for page managment
let characters = [];
let planets = [];
let species = [];
let starships = [];
let vehicles = [];
let film;

const charactersAccordionElement = document.getElementsByClassName('accordion-button-panel')[0];
charactersAccordionElement.innerText = 'CHARACTERS';
document.getElementsByClassName('accordion-content-panel')[0].setAttribute('id','characters-panel');
document.getElementById('characters-panel').innerHTML = '<ul id="characters-list"></ul>';
charactersAccordionElement.addEventListener('click', async () => {
    if (characters.length == 0){
        await getListOfCharacters();
        renderCharactersListSelector();
    }
});

const planetsAccordionElement = document.getElementsByClassName('accordion-button-panel')[1];
planetsAccordionElement.innerText = 'PLANETS';
document.getElementsByClassName('accordion-content-panel')[1].setAttribute('id','planets-panel');
document.getElementById('planets-panel').innerHTML = '<ul id="planets-list"></ul>';
planetsAccordionElement.addEventListener('click', async () => {
    if (planets.length == 0){
        await getListOfPlanets();
        renderPlanetsListSelector();
    }
});

const speciesAccordionElement = document.getElementsByClassName('accordion-button-panel')[2];
speciesAccordionElement.innerText = 'SPECIES';
document.getElementsByClassName('accordion-content-panel')[2].setAttribute('id','species-panel');
document.getElementById('species-panel').innerHTML = '<ul id="species-list"></ul>';
speciesAccordionElement.addEventListener('click', async () => {
    if (species.length == 0){
        await getListOfSpecies();
        renderSpeciesListSelector();
    }
});

const starshipsAccordionElement = document.getElementsByClassName('accordion-button-panel')[3];
starshipsAccordionElement.innerText = 'STARSHIPS';
document.getElementsByClassName('accordion-content-panel')[3].setAttribute('id','starships-panel');
document.getElementById('starships-panel').innerHTML = '<ul id="starships-list"></ul>';
starshipsAccordionElement.addEventListener('click', async () => {
    if (starships.length == 0){
        await getListOfStarships();
        renderStarshipsListSelector();
    }
});

const vehiclesAccordionElement = document.getElementsByClassName('accordion-button-panel')[4];
vehiclesAccordionElement.innerText = 'VEHICLES';
document.getElementsByClassName('accordion-content-panel')[4].setAttribute('id','vehicles-panel');
document.getElementById('vehicles-panel').innerHTML = '<ul id="vehicles-list"></ul>';
vehiclesAccordionElement.addEventListener('click', async () => {
    if (vehicles.length == 0){
        await getListOfVehicles();
        renderVehiclesListSelector();
    }
});

const createFilmButton = document.getElementById('create-film-button');
const updateFilmButton = document.getElementById('update-film-button');

createFilmButton.addEventListener('click',createFilm);

updateFilmButton.addEventListener('click',updateFilm);

document
    .addEventListener('DOMContentLoaded', async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (!checkUserInLocalStorage()){
            openModalWindow('error','You should be authorized to watch this page, dude');
            window.open('auth.html', '_self');
        } else {
            const primaryKey = Number(urlParams.get('pk'));
            if(primaryKey){
                createFilmButton.classList.add('hidden');
                film = await getCurrentFilm(primaryKey);
                openModalWindow('welcome',`welcome, dude! This page for ${film.title} film.`)
            } else {
                updateFilmButton.classList.add('hidden');
                openModalWindow('welcome',`welcome, dude! This page for brand NEW FILM CREATION!!!`)
                film = new Film();
            }
            renderBasicFilmInformation();
        }
    })

function renderBasicFilmInformation(){
    document.getElementById('film-title').value = film.title;
    document.getElementById('film-director').value = film.director;
    document.getElementById('film-producer').value = film.producer;
    document.getElementById('film-episode').value = film.episode_id;
    document.getElementById('film-opening-crawl').value = film.opening_crawl;
    document.getElementById('film-release-date').value = film.release_date;
}

async function getListOfCharacters(){
    characters = await getFullPeoplesList();
}

function renderCharactersListSelector(){
    characters.forEach(function(item){
        let checkedAttribute = '';
        if(film.characters.includes(item.pk)){
            checkedAttribute = 'checked'
        }
        const element = document.createElement('li');

        element.innerHTML += `
        <input name="character-check-${item.pk}" 
        class="character-check" 
        type="checkbox" 
        value=${item.pk}
        ${checkedAttribute}>
        <label class="character-checkbox-label" 
        for="character-check">${item.name}</label>
        <br>
        `;
        document.getElementById('characters-list').appendChild(element);
    })
}

async function getListOfPlanets(){
    planets = await getFullPlanetsList();
}

function renderPlanetsListSelector(){
    planets.forEach(function(item){
        let checkedAttribute = '';
        if(film.planets.includes(item.pk)){
            checkedAttribute = 'checked'
        }
        const element = document.createElement('li');

        element.innerHTML += `
        <input name="planet-check-${item.pk}" 
        class="planet-check" 
        type="checkbox" 
        value=${item.pk}
        ${checkedAttribute}>
        <label class="planet-checkbox-label" 
        for="planet-check">${item.name}</label>
        <br>
        `;
        document.getElementById('planets-list').appendChild(element);
    })
}

async function getListOfSpecies(){
    species = await getFullSpeciesList();
}

function renderSpeciesListSelector(){
    species.forEach(function(item){
        let checkedAttribute = '';
        if(film.species.includes(item.pk)){
            checkedAttribute = 'checked'
        }
        const element = document.createElement('li');
        element.innerHTML += `
        <input name="species-check-${item.pk}" 
        class="species-check" 
        type="checkbox" 
        value=${item.pk}
        ${checkedAttribute}>
        <label class="species-checkbox-label" 
        for="species-check">${item.name}</label>
        <br>
        `;
        document.getElementById('species-list').appendChild(element);
    })
}

async function getListOfStarships(){
    starships = await getFullStarshipsList();
}

function renderStarshipsListSelector(){
    starships.forEach(function(item){
        let checkedAttribute = '';
        if(film.starships.includes(item.pk)){
            checkedAttribute = 'checked'
        }
        const element = document.createElement('li');
        element.innerHTML += `
        <input name="starships-check-${item.pk}" 
        class="starships-check" 
        type="checkbox" 
        value=${item.pk}
        ${checkedAttribute}>
        <label class="starships-checkbox-label" 
        for="starships-check">${item.starship_class}</label>
        <br>
        `;
        document.getElementById('starships-list').appendChild(element);
    })
}

async function getListOfVehicles(){
    vehicles = await getFullVehicleList();
}

function renderVehiclesListSelector(){
    vehicles.forEach(function(item){
        let checkedAttribute = '';
        if(film.vehicles.includes(item.pk)){
            checkedAttribute = 'checked'
        }
        const element = document.createElement('li');
        element.innerHTML += `
        <input name="vehicles-check-${item.pk}" 
        class="vehicles-check" 
        type="checkbox" 
        value=${item.pk}
        ${checkedAttribute}>
        <label class="vehicles-checkbox-label" 
        for="vehicles-check">${item.vehicle_class}</label>
        <br>
        `;
        document.getElementById('vehicles-list').appendChild(element);
    })
}

function getFilmDataFromForm(){
    const formElement = document.getElementById('film-edit-form');
    const dataFromForm = new FormData(formElement);
    film.title = dataFromForm.get('film-title');
    film.director = dataFromForm.get('film-director');
    film.producer = dataFromForm.get('film-producer');
    film.episode_id = dataFromForm.get('film-episode');
    film.opening_crawl = dataFromForm.get('film-opening-crawl');
    film.release_date = dataFromForm.get('film-release-date');
    film.created = new Date();
    film.edited = new Date();
    film.characters = getAllCheckedRowsFromSelector('character');
    film.planets = getAllCheckedRowsFromSelector('planet');
    film.species = getAllCheckedRowsFromSelector('species');
    film.starships = getAllCheckedRowsFromSelector('starships');
    film.vehicles = getAllCheckedRowsFromSelector('vehicles');
}

/**
 * Function for get values from checkbox list selector;
 * @param entity - string with one of next values: "character",
 * "planet", "species", "starships", or "vehicles"
 * @return {*[]} - array of numbers - pk of selected elements
 */
function getAllCheckedRowsFromSelector(entity){
    const resultArray = [];
    document.querySelectorAll(`.${entity}-check`).forEach(element=>{
        if(element.checked){
            resultArray.push(Number(element.value));
        }
    })
    return resultArray;
}

function isFilmValid(){
    let errorMessageText = '';
    if(film.title.length<=0){
        errorMessageText.concat(`Too short title! \n`)
    }
    if(film.title.length>254){
        errorMessageText.concat(`Too long title! \n`)
    }
    if(film.director.length<=0){
        errorMessageText.concat(`Dont forget about director! \n`)
    }
    if(film.director.length>254){
        errorMessageText.concat(`Too long director name! \n`)
    }
    if(film.producer.length<=0){
        errorMessageText.concat(`Fill producer info, dude! \n`)
    }
    if(film.producer.length>254){
        errorMessageText.concat(`Too long producer name! \n`)
    }
    if(isNaN(Number(film.episode_id))){
        errorMessageText.concat(`Incorrect episode id value. \n`)
    }
    if(film.planets.length<=0){
        errorMessageText.concat(`Add planet to film, please \n`)
    }
    if(film.characters.length<=0){
        errorMessageText.concat(`Add characters to this film, please  \n`)
    }

    if(errorMessageText === ''){
        return true
    } else {
        openModalWindow('error', errorMessageText);
        return false
    }

}

async function createFilm(){
    getFilmDataFromForm();
    if(isFilmValid()){
        await createFilmQuery(film, function (type, message){
            openModalWindow(type, message)
        });
    }
}

async function updateFilm(){
    getFilmDataFromForm();
    if(isFilmValid()){
        await updateFilmQuery(film, function (type, message){
            openModalWindow(type, message)
        });
    }
}
