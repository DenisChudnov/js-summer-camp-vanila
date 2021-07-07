import {Vehicle} from '../../utils/models/vehicle';
import {vehiclesRef} from "../firebaseSettings";
import {getRequestToAPI} from "../firestoreCommunication";

export async function getVehicleByKeyList(keyList){
    let vehicleList = []
    let query = vehiclesRef
        .where('pk','in',keyList);
    vehicleList = await getRequestToAPI(query,'vehicle');
    return vehicleList;
}

export function castToVehicleClass(doc){
    let data = doc.fields;
    data.pk = doc.pk;
    return new Vehicle(data);
}
