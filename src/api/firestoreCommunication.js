import {castToFilmClass} from "./services/filmService";
import {castToPeopleClass} from "./services/peopleService";
import {castToPlanetClass} from "./services/planetService";
import {castToStarshipClass} from "./services/starshipService";
import {castToSpeciesClass} from "./services/speciesService";
import {castToTransportClass} from "./services/transportService";
import {castToVehicleClass} from "./services/vehicleService";


/**
 * Function for realise request to API,
 * get query and type of entity - one of model names
 * return - response on getted query.
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
            if(responseFromAPI.length == 0){
                responseFromAPI = null;
            }
        })
        .catch((error)=>{
            console.log('There are some error on getting data from API: '+error);
            responseFromAPI = null;
        })
    return responseFromAPI;
}

function castItemDataToEntityClass(doc, entity){
    let result;
    if (entity == 'film'){
        result = castToFilmClass(doc);
    }
    else if (entity == 'people'){
        result = castToPeopleClass(doc);
    }
    else if (entity == 'planet'){
        result = castToPlanetClass(doc);
    }
    else if (entity == 'species'){
        result = castToSpeciesClass(doc);
    }
    else if (entity == 'starship'){
        result = castToStarshipClass(doc);
    }
    else if (entity == 'transport'){
        result = castToTransportClass(doc);
    }
    else if (entity == 'vehicle'){
        result = castToVehicleClass(doc);
    }
    return result;
}
