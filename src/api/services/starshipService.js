import '../../utils/models/starship';
import {starshipsRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for get all list of starships from API
 * @return {Promise<*[]>}
 */
export async function getFullStarshipsList(){
    const query = starshipsRef;
    return await getRequestToAPI(query, 'starship');
}

/**
 * Function for transform doc from API to object with Starship class
 * @param {Object} doc - object doc from API
 * @return {Starship} - type of starship
 */
export function castToStarshipClass(doc, Starship){
    Starship = doc.fields;
    Starship.pk = doc.pk;
    return Starship;
}
