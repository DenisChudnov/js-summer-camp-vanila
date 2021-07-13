import {Planet} from '../../utils/models/planet';
import {planetsRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for make request to API and get list of planets by primary keys list;
 * Return array of Planet objects;
 * @param keyList
 * @return {Promise<*[]>}
 */
export async function getPlanetsByKeyList(keyList){
    const query = planetsRef
        .where('pk','in',keyList);
    return await getRequestToAPI(query,'planet');
}


/**
 * Function for transform doc from API to object with Planet class;
 * @param doc
 * @return {Planet}
 */
export function castToPlanetClass(doc){
    const data = doc.fields;
    data.pk = doc.pk;
    return new Planet(data);
}
