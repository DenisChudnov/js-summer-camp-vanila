import {Vehicle} from '../../utils/models/vehicle';
import {vehiclesRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for get array of vehicle objects from the API by primary keys array;
 * @param keyList
 * @return {Promise<*[]>}
 */
export async function getVehicleByKeyList(keyList){
    const query = vehiclesRef
        .where('pk','in',keyList);
    return await getRequestToAPI(query,'vehicle');
}

export async function getFullVehicleList(){
    const query = vehiclesRef;
    return await getRequestToAPI(query,'vehicle');
}

/**
 * Function for transform doc from API to object with class Vehicle
 * @param doc
 * @return {Vehicle}
 */
export function castToVehicleClass(doc){
    const data = doc.fields;
    data.pk = doc.pk;
    return new Vehicle(data);
}
