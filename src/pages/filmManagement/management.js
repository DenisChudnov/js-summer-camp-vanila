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
import {getDataFullList} from "../../api/services/detailsService";

//some variables for page managment
let characters = [];
let planets = [];
let species = [];
let starships = [];
let vehicles = [];
let film;

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
const charactersPanelElement = document.getElementsByClassName('accordion-content-panel')[0]
    charactersPanelElement.setAttribute('id','characters-panel');
document.getElementById('characters-panel').innerHTML = '<ul id="characters-list"></ul>';
charactersAccordionElement.addEventListener('click', async () => {
    if (characters.length == 0){
        characters = await getEntityDataListFromAPI('people');
        renderDataListSelector(
            film.characters,
            characters,
            document.getElementById('characters-list'),
            charactersAccordionElement,
            'name',
            'character',
            charactersPanelElement
        )
    }
});

/**
 * PLANETS LIST, which render only on click
 * @type {Element}
 */
const planetsAccordionElement = document.getElementsByClassName('accordion-button-panel')[1];
planetsAccordionElement.innerText = 'PLANETS';
const planetsPanelElement = document.getElementsByClassName('accordion-content-panel')[1]
    planetsPanelElement.setAttribute('id','planets-panel');
document.getElementById('planets-panel').innerHTML = '<ul id="planets-list"></ul>';
planetsAccordionElement.addEventListener('click', async () => {
    if (planets.length == 0){
        planets = await getEntityDataListFromAPI('planet');
        renderDataListSelector(
            film.planets,
            planets,
            document.getElementById('planets-list'),
            planetsAccordionElement,
            'name',
            'planet',
            planetsPanelElement
        )
    }
});

/**
 * SPECIES LIST, render by click
 * @type {Element}
 */
const speciesAccordionElement = document.getElementsByClassName('accordion-button-panel')[2];
speciesAccordionElement.innerText = 'SPECIES';
const speciesPanelElement = document.getElementsByClassName('accordion-content-panel')[2]
    speciesPanelElement.setAttribute('id','species-panel');
document.getElementById('species-panel').innerHTML = '<ul id="species-list"></ul>';
speciesAccordionElement.addEventListener('click', async () => {
    if (species.length == 0){
        species = await getEntityDataListFromAPI('species');
        renderDataListSelector(
            film.species,
            species,
            document.getElementById('species-list'),
            speciesAccordionElement,
            'name',
            'species',
            speciesPanelElement
        )
    }
});

/**
 * STARSHIPS LIST, render by click
 * @type {Element}
 */
const starshipsAccordionElement = document.getElementsByClassName('accordion-button-panel')[3];
starshipsAccordionElement.innerText = 'STARSHIPS';
const starshipsPanelElement = document.getElementsByClassName('accordion-content-panel')[3]
    starshipsPanelElement.setAttribute('id','starships-panel');
document.getElementById('starships-panel').innerHTML = '<ul id="starships-list"></ul>';
starshipsAccordionElement.addEventListener('click', async () => {
    if (starships.length == 0){
        starships = await getEntityDataListFromAPI('starship');
        renderDataListSelector(
            film.starships,
            starships,
            document.getElementById('starships-list'),
            starshipsAccordionElement,
            'starship_class',
            'starships',
            starshipsPanelElement
        )
    }
});

/**
 * VEHICLES LIST, render by click
 * @type {Element}
 */
const vehiclesAccordionElement = document.getElementsByClassName('accordion-button-panel')[4];
vehiclesAccordionElement.innerText = 'VEHICLES';
const vehiclesPanelElement = document.getElementsByClassName('accordion-content-panel')[4]
    vehiclesPanelElement.setAttribute('id','vehicles-panel');
document.getElementById('vehicles-panel').innerHTML = '<ul id="vehicles-list"></ul>';
vehiclesAccordionElement.addEventListener('click', async () => {
    if (vehicles.length == 0){
        vehicles = await getEntityDataListFromAPI('vehicle');
        renderDataListSelector(
            film.vehicles,
            vehicles,
            document.getElementById('vehicles-list'),
            vehiclesAccordionElement,
            'vehicle_class',
            'vehicles',
            vehiclesPanelElement
        )
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


/**
 * Simple function for render filminformation, which not need to requests
 */
function renderBasicFilmInformation(){
    document.getElementById('film-title').value = film.title;
    document.getElementById('film-director').value = film.director;
    document.getElementById('film-producer').value = film.producer;
    document.getElementById('film-episode').value = film.episode_id;
    document.getElementById('film-opening-crawl').value = film.opening_crawl;
    document.getElementById('film-release-date').value = film.release_date;
}

/**
 * Function for render list of entityes objects
 * @param {Array} filmDataList
 * @param {Array} APIDataList
 * @param {Element} listHTMLElement
 * @param {Element} accordionHTMLElement
 * @param {string} displayingFieldName
 * @param {string} entityName
 * @param {Element} panelHTMLElement
 */
function renderDataListSelector(
    filmDataList,
    APIDataList,
    listHTMLElement,
    accordionHTMLElement,
    displayingFieldName,
    entityName,
    panelHTMLElement
    ){
    APIDataList.forEach(function (item){
        let checkedAttribute = '';
        if(filmDataList.includes(item.pk)){
            checkedAttribute = 'checked';
        }
        const listItem = document.createElement('li');
        listItem.innerHTML += `
        <input
        name = ${entityName}-check-${item.pk}
        class=${entityName}-check
        type=checkbox
        value=${item.pk}
        ${checkedAttribute}
        >
        <label
        class=${entityName}-checkbox-label
        for=${entityName}-check
        >
        ${item[displayingFieldName]}
        </label>
        <br>
        `;
        listHTMLElement.appendChild(listItem);
    })
    panelHTMLElement.style.maxHeight = 24 * APIDataList.length + 'px';

}

/**
 * Function for get all list of entity objects from API
 * @param entityName
 * @return {Promise<*[]>}
 */
async function getEntityDataListFromAPI(entityName){
    return await getDataFullList(entityName)
}

/**
 * Function for get film data, which entered in form by user
 */
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

/**
 * Funtion for check if entered data is valid
 * @return {boolean}
 */
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

/**
 * Function for send request to creqte film with entered parameters
 * @return {Promise<void>}
 */
async function createFilm(){
    getFilmDataFromForm();
    if(isFilmValid){
        await createFilmQuery(film)
            .then(value => {
                openModalWindow('success','film successfully created');
                setTimeout(function (){
                    window.open('../','_self')
                },5000);
            })
            .catch(error => {
                openModalWindow('error', error);
            })
    }
}

/**
 * Function for update existing film with data, entered by user
 * @return {Promise<void>}
 */
async function updateFilm(){
    getFilmDataFromForm();
    if(isFilmValid){
        await updateFilmQuery(film)
            .then(value => {
                openModalWindow('success','film successfully updated');
            })
            .catch(error => {
                openModalWindow('error', error);
            })
    }
}
