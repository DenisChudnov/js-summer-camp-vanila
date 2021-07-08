import {Planet} from '../../utils/models/planet';
import {planetsRef} from "../firebaseSettings";
import {getRequestToAPI} from "../firestoreCommunication";

export async function getPlanetsByKeyList(keyList){
    let planetList = []
    let query = planetsRef
        .where('pk','in',keyList);
    planetList = await getRequestToAPI(query,'planet');
    return planetList;
}

export function castToPlanetClass(doc){
    let data = doc.fields;
    data.pk = doc.pk;
    return new Planet(data);
}
