import '../../utils/models/species';
import {speciesRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for get list of all species from API
 * @return {Promise<*[]>}
 */
export async function getFullSpeciesList(){
    const query = speciesRef;
    return await getRequestToAPI(query, 'species');
}

/**
 * Function for transform doc from API to Species class object
 * @param {Object} doc - doc object from api
 * @return {Species} - type of species
 */
export function castToSpeciesClass(doc, Species){
    Species = doc.fields;
    Species.pk = doc.pk;
    return Species;
}
