import {People} from '../../utils/models/people';
import {peopleRef} from "../firebaseSettings";
import {getRequestToAPI} from "../firestoreCommunication";

export async function getPeopleListByPrimaryKeys(pkList){
    let peoplesList = []
    let query = peopleRef
        .where('pk','in',pkList);
    peoplesList = await getRequestToAPI(query,'people');
    return peoplesList;
}

export function castToPeopleClass(doc){
    let data = doc.fields;
    data.pk = doc.pk;
    return new People(data);
}
