import '../../utils/models/vehicle';
import {vehiclesRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for get array of vehicle objects from the API by primary keys array;
 * @param keyList
 * @return {Promise<*[]>}
 */
export async function getVehicleByKeyList(keyList, callback){
    const query = vehiclesRef
        .where('pk','in',keyList);
    return await getRequestToAPI(query,'vehicle', function(type, message){
        callback(type, message)
    });
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
export function castToVehicleClass(doc, Vehicle){
    Vehicle = doc.fields;
    Vehicle.pk = doc.pk;
    return Vehicle;
}
