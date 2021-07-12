import {Species} from '../../utils/models/species';
import {speciesRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for get list of Species from API by list of primary keys;
 * Return array of Species clas objects;
 * @param keyList
 * @return {Promise<*[]>}
 */
export async function getSpeciesByKeyList(keyList){
    const query = speciesRef
        .where('pk','in',keyList);
    return await getRequestToAPI(query,'species');
}

export async function getFullSpeciesList(){
    const query = speciesRef;
    return await getRequestToAPI(query, 'species');
}

/**
 * Function for transform doc from API to Species class object
 * @param doc
 * @return {Species}
 */
export function castToSpeciesClass(doc){
    const data = doc.fields;
    data.pk = doc.pk;
    return new Species(data);
}
