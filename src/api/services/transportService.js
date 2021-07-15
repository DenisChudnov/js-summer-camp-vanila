import '../../utils/models/transport';
import {transportRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for get all list of transport from API
 * @return {Promise<*[]>}
 */
export async function getFullTransportList(){
    const query = transportRef;
    return await getRequestToAPI(query, 'transport');
}

/**
 * Function for transform doc from API to object with transport class
 * @param {Object} doc - doc object from API
 * @return {Transport} - type of transport
 */
export function castToTransportClass(doc, Transport){
    Transport = doc.fields;
    Transport.pk = doc.pk;
    return Transport;
}
