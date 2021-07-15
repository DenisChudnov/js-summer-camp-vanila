import '../../utils/models/starship';
import {starshipsRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';


export async function getFullStarshipsList(){
    const query = starshipsRef;
    return await getRequestToAPI(query, 'starship');
}

/**
 * Function for transform doc from API to object with Starship class
 * @param doc
 * @return {Starship}
 */
export function castToStarshipClass(doc, Starship){
    Starship = doc.fields;
    Starship.pk = doc.pk;
    return Starship;
}
