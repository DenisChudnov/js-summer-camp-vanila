import {Starship} from '../../utils/models/starship';
import {starshipsRef} from "../firebaseSettings";
import {getRequestToAPI} from "../firestoreCommunication";

/**
 * Function for get starships object array from API by primary keys array;
 * @param keyList
 * @return {Promise<*[]>}
 */
export async function getStarshipsByKeyList(keyList){
    const query = starshipsRef
        .where('pk','in',keyList);
    return await getRequestToAPI(query,'starship');
}

/**
 * Function for transform doc from API to object with Starship class
 * @param doc
 * @return {Starship}
 */
export function castToStarshipClass(doc){
    let data = doc.fields;
    data.pk = doc.pk;
    return new Starship(data);
}
