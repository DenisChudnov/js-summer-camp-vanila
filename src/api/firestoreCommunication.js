import {castToFilmClass} from './services/filmService';
import {castToPeopleClass} from './services/peopleService';
import {castToPlanetClass} from './services/planetService';
import {castToStarshipClass} from './services/starshipService';
import {castToSpeciesClass} from './services/speciesService';
import {castToTransportClass} from './services/transportService';
import {castToVehicleClass} from './services/vehicleService';

import '../components/base';
import '../components/modal/modal.js';
import '../components/modal/modal.css';

const dict = {
    'film':castToFilmClass,
    'people':castToPeopleClass,
    'planet':castToPlanetClass,
    'species':castToSpeciesClass,
    'starship':castToStarshipClass,
    'transport':castToTransportClass,
    'vehicle':castToVehicleClass,
}

/**
 * Function for realise GET request to API,
 * get query and type of entity - one of model names
 * return - array of objects with entity class, getted from API;
 * @param query
 * @param entity
 * @return {Promise<*[]>}
 */
export async function getRequestToAPI(query, entity){
    let responseFromAPI = [];
    await query
        .get()
        .then((snapshot)=>{
            snapshot.docs.forEach(item=>{
                if(item){
                    responseFromAPI.push(castItemDataToEntityClass(item.data(), entity));
                }
            });
        })
        .catch((error)=>{
            openModalWindow('There are some error on getting data from API: '+error)
        })
    return responseFromAPI;
}

/**
 * function for call method of transformation API getted value to frontend models classes;
 * Get API doc of object and entity name
 * Return - object of entity class;
 * @param doc
 * @param entity
 * @return {Film|Planet|Starship|Vehicle|Transport|Species|People}
 */
function castItemDataToEntityClass(doc, entity){
    const castEntity = dict[entity];
    return castEntity(doc);
}

/**
 * For remove all alert, i made custom modal, which need for parameters.
 * @type {{close(): void, open(): (void|undefined)} & {setContent(*): void, destroy(): void}}
 */
const msgModal = $.modal({
    title: 'Error',
    closable: true,
    width: '300px',
    footerButtons: [
        {text: 'Close', type: 'primary', handler() {
                msgModal.close();
            }},
    ],
});

/**
 * Function for call custom modal window
 * @param message string - message, which will displayed on modal window.
 */
function openModalWindow(message){
    msgModal.setContent(`
      <p>${message}</p>
    `);
    msgModal.open();
}
