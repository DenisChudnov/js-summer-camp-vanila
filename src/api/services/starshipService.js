import {Starship} from '../../utils/models/starship';
import {starshipsRef} from "../firebaseSettings";
import {getRequestToAPI} from "../firestoreCommunication";

export async function getStarshipsByKeyList(keyList){
    let starshipsList = []
    let query = starshipsRef
        .where('pk','in',keyList);
    starshipsList = await getRequestToAPI(query,'starship');
    return starshipsList;
}

export function castToStarshipClass(doc){
    let data = doc.fields;
    data.pk = doc.pk;
    return new Starship(data);
}
