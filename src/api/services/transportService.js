import '../../utils/models/transport';
import {transportRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for get array of Transport objects by array of primary keys;
 * @param keyList
 * @return {Promise<*[]>}
 */
export async function getTransportByKeyList(keyList, callback){
    const query = transportRef
        .where('pk','in',keyList);
    return await getRequestToAPI(query,'transport', function(type, message){
        callback(type, message)
    });
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
export function castToTransportClass(doc, Transport){
    Transport = doc.fields;
    Transport.pk = doc.pk;
    return Transport;
}
