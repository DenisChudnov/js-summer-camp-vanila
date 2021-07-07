import {Transport} from '../../utils/models/transport';
import {transportRef} from "../firebaseSettings";
import {getRequestToAPI} from "../firestoreCommunication";

export async function getTransportByKeyList(keyList){
    let transportList = []
    let query = transportRef
        .where('pk','in',keyList);
    transportList = await getRequestToAPI(query,'transport');
    return transportList;
}

export function castToTransportClass(doc){
    let data = doc.fields;
    data.pk = doc.pk;
    return new Transport(data);
}
