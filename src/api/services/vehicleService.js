import '../../utils/models/vehicle';
import {vehiclesRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';


export async function getFullVehicleList(callback){
    const query = vehiclesRef;
    return await getRequestToAPI(query,'vehicle', function(type, message){
        callback(type, message)
    });
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
