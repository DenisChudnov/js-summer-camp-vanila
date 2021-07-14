import '../../utils/models/planet';
import {planetsRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for make request to API and get list of planets by primary keys list;
 * Return array of Planet objects;
 * @param keyList
 * @return {Promise<*[]>}
 */
export async function getPlanetsByKeyList(keyList, callback){
    const query = planetsRef
        .where('pk','in',keyList);
    return await getRequestToAPI(query,'planet', function(type, message){
        callback(type, message)
    });
}

export async function getFullPlanetsList(){
    const query = planetsRef;
    return await getRequestToAPI(query, 'planet');
}


/**
 * Function for transform doc from API to object with Planet class;
 * @param doc
 * @return {Planet}
 */
export function castToPlanetClass(doc, Planet){
    Planet = doc.fields;
    Planet.pk = doc.pk;
    return Planet;
}
