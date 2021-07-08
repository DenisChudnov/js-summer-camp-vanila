import {People} from '../../utils/models/people';
import {peopleRef} from "../firebaseSettings";
import {getRequestToAPI} from "../firestoreCommunication";

/**
 * Function with created and send query for get peoples list by PrimaryKeys list;
 * @param pkList
 * @return {Promise<*[]>}
 */
export async function getPeopleListByPrimaryKeys(pkList){
    const query = peopleRef
        .where('pk','in',pkList);
    return await getRequestToAPI(query,'people');
}

/**
 * Function for transform doc, getted from API to people class object
 * @param doc
 * @return {People}
 */
export function castToPeopleClass(doc){
    let data = doc.fields;
    data.pk = doc.pk;
    return new People(data);
}
