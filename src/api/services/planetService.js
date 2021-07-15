import '../../utils/models/planet';
import {planetsRef} from '../firebaseSettings';
import {getRequestToAPI} from '../firestoreCommunication';


export async function getFullPlanetsList(){
    const query = planetsRef;
    return await getRequestToAPI(query, 'planet');
}


/**
 * Function for transform doc from API to object with Planet class;
 * @param doc
 * @return {Planet}
 */
export function castToPlanetClass(doc, Planet){
    Planet = doc.fields;
    Planet.pk = doc.pk;
    return Planet;
}
