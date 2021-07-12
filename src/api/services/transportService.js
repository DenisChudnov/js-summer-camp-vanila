import {Transport} from '../../utils/models/transport';
import {transportRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for get array of Transport objects by array of primary keys;
 * @param keyList
 * @return {Promise<*[]>}
 */
export async function getTransportByKeyList(keyList){
    const query = transportRef
        .where('pk','in',keyList);
    return await getRequestToAPI(query,'transport');
}

export async function getFullTransportList(){
    const query = transportRef;
    return await getRequestToAPI(query, 'transport');
}

/**
 * Function for transform doc from API to object with transport class
 * @param doc
 * @return {Transport}
 */
export function castToTransportClass(doc){
    const data = doc.fields;
    data.pk = doc.pk;
    return new Transport(data);
}
