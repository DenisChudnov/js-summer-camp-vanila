import '../../utils/models/vehicle';
import {vehiclesRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function for get all list of vehicles from API
 * @return {Promise<*[]>}
 */
export async function getFullVehicleList(){
    const query = vehiclesRef;
    return await getRequestToAPI(query,'vehicle');
}

/**
 * Function for transform doc from API to object with class Vehicle
 * @param {Object} doc - doc from API
 * @return {Vehicle} - type of vehicles objects
 */
export function castToVehicleClass(doc, Vehicle){
    Vehicle = doc.fields;
    Vehicle.pk = doc.pk;
    return Vehicle;
}
