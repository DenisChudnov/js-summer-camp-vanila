import '../../utils/models/transport';
import {transportRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';


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
