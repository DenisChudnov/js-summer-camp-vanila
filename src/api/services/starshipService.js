import '../../utils/models/starship';
import {starshipsRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for get starships object array from API by primary keys array;
 * @param keyList
 * @return {Promise<*[]>}
 */
export async function getStarshipsByKeyList(keyList, callback){
    const query = starshipsRef
        .where('pk','in',keyList);
    return await getRequestToAPI(query,'starship', function(type, message){
        callback(type, message)
    });
}

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
