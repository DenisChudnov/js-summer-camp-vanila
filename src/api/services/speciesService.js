import {Species} from '../../utils/models/species';
import {speciesRef} from "../firebaseSettings";
import {getRequestToAPI} from "../firestoreCommunication";

export async function getSpeciesByKeyList(keyList){
    let speciesList = []
    let query = speciesRef
        .where('pk','in',keyList);
    speciesList = await getRequestToAPI(query,'species');
    return speciesList;
}

export function castToSpeciesClass(doc){
    let data = doc.fields;
    data.pk = doc.pk;
    return new Species(data);
}
