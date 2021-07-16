import '../../utils/models/people.js'
import {peopleRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';


/**
 * Function for transform doc, getted from API to people class object
 * @param {Object} doc - doc object from API
 * @param {Object} People - type of object
 * @return {People} - object of People class
 */
export function castToPeopleClass(doc, People){
    People = doc.fields;
    People.pk = doc.pk
    return People
}

/**
 * Function for get all peoples
 * @return {Promise<*[]>}
 */
export async function getFullPeoplesList(){
    const query = peopleRef;
    return await getRequestToAPI(query,'people');
}
