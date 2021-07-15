import '../../utils/models/species';
import {speciesRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';


export async function getFullSpeciesList(){
    const query = speciesRef;
    return await getRequestToAPI(query, 'species');
}

/**
 * Function for transform doc from API to Species class object
 * @param doc
 * @return {Species}
 */
export function castToSpeciesClass(doc, Species){
    Species = doc.fields;
    Species.pk = doc.pk;
    return Species;
}
