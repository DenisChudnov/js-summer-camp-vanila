import {castToFilmClass} from './services/filmService';
import {castToPeopleClass} from './services/peopleService';
import {castToPlanetClass} from './services/planetService';
import {castToStarshipClass} from './services/starshipService';
import {castToSpeciesClass} from './services/speciesService';
import {castToTransportClass} from './services/transportService';
import {castToVehicleClass} from './services/vehicleService';

/**
 * Object, which include links to function for cast doc info to entity model class.
 * For call function of cast need call object field with entity name
 * @type {{starship: ((function(*): Starship)|*), species: ((function(*): Species)|*), planet: ((function(*): Planet)|*), film: ((function(*): Film)|*), transport: ((function(*): Transport)|*), people: ((function(*): People)|*), vehicle: ((function(*): Vehicle)|*)}}
 */
const classesCastCollection = {
    film:castToFilmClass,
    people:castToPeopleClass,
    planet:castToPlanetClass,
    species:castToSpeciesClass,
    starship:castToStarshipClass,
    transport:castToTransportClass,
    vehicle:castToVehicleClass,
}

/**
 * Function for realise GET request to API,
 * @param query - query object with reference and query params
 * @param entity string - one of model names
 * @return {Promise<*[]>} array of objects with entity class, getted from API;
 */
export async function getRequestToAPI(query, entity, callback){
    return await query
        .get()
        .then((snapshot) => {
           return snapshot.docs.map((doc) => {
                return castItemDataToEntityClass(doc.data(), entity);
            });
        })
        .catch((error) => {
            callback('error','There are some error on getting data from API: ' + error)
            return [];
        })
}

/**
 * function for call method of transformation API getted value to frontend models classes;
 * @param doc API doc
 * @param entity string entity name
 * @return {Film|Planet|Starship|Vehicle|Transport|Species|People} object of entity class|type;
 */
function castItemDataToEntityClass(doc, entity){
    const castEntity = classesCastCollection[entity];
    return castEntity(doc);
}

/**
 * This function realise post request to API
 * for realise create and update functionallity.
 * Get query and value for post
 * @param query
 * @param value
 * @return {Promise<*>}
 */
export async function postRequestToAPI(query, value){
    return await query
        .set(value)
        .then(()=>{
            openModalWindow('success','Document successfully written!');
            window.open('../','_self');
        })
        .catch((error)=>{
            openModalWindow('error',error);
        })
}
