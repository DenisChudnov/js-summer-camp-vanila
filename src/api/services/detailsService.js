import {
    filmsRef,
    peopleRef,
    planetsRef,
    speciesRef,
    starshipsRef,
    transportRef,
    vehiclesRef
} from "../firebaseSettings";
import {getRequestToAPI} from "../firestoreCommunication";

/**
 * List of referenses of API database
 * @type {{starship: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, species: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, planet: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, film: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, transport: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, people: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, vehicle: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>}}
 */
const listOfReferences = {
    film:filmsRef,
    people:peopleRef,
    planet:planetsRef,
    species:speciesRef,
    starship:starshipsRef,
    transport:transportRef,
    vehicle:vehiclesRef
}

/**
 * Function for get array of entity class objects
 * @param {string} entity - name of entity
 * @param {Array} keysList - array of primary keys of entity objects, included in film
 * @return {Promise<*[]>}
 */
export async function getDataByKeysList(entity, keysList){
    const dataListLength = keysList.length;
    let result = [];
    for(let i = 0; i <= dataListLength; i += 10){
        const queryList = keysList.slice(i, i + 10);
        if(queryList != [] && queryList.length != 0){
            const query = listOfReferences[entity]
                .where('pk', 'in', queryList);
            const queryResult = await getRequestToAPI(query, entity);
            result = result.concat(queryResult);
        }
    }
    return result;

}

/**
 * Function for get array of entity class of objects
 * @param {String} entity - name of entity
 * @return {Promise<*[]>}
 */
export async function getDataFullList(entity){
    const query = listOfReferences[entity];
    return await getRequestToAPI(query, entity);
}
