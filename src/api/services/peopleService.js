// import {People, createPeople} frapi layer shouldn't open a dialog, it just makes a request and return a valueom '../../utils/models/people';
import '../../utils/models/people.js'
import {peopleRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';

/**
 * Function with created and send query for get peoples list by PrimaryKeys list;
 * @param pkList - list of primary keys
 * @return {Promise<*[]>} - result of request - object or objects array with people type
 */
export async function getPeopleListByPrimaryKeys(pkList, callback){
    const query = peopleRef
        .where('pk','in',pkList);
    return await getRequestToAPI(query,'people', function(type, message){
        callback(type, message)
    });
}

/**
 * Function for transform doc, getted from API to people class object
 * @param doc - doc object from API
 * @param People - type of object
 * @return {People} - object of People class
 */
export function castToPeopleClass(doc, People){
    People = doc.fields;
    People.pk = doc.pk
    return People
}
