import '../../utils/models/planet';
import {planetsRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for get all planets objects
 * @return {Promise<*[]>}
 */
export async function getFullPlanetsList(){
    const query = planetsRef;
    return await getRequestToAPI(query, 'planet');
}


/**
 * Function for transform doc from API to object with Planet class;
 * @param {Object} doc - doc object from API
 * @return {Planet}
 */
export function castToPlanetClass(doc, Planet){
    Planet = doc.fields;
    Planet.pk = doc.pk;
    return Planet;
}
