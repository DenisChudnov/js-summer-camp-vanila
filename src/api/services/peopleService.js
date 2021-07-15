// import {People, createPeople} frapi layer shouldn't open a dialog, it just makes a request and return a valueom '../../utils/models/people';
import '../../utils/models/people.js'
import {peopleRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';


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

export async function getFullPeoplesList(){
    const query = peopleRef;
    return await getRequestToAPI(query,'people');
}
