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

const listOfReferences = {
    film:filmsRef,
    people:peopleRef,
    planet:planetsRef,
    species:speciesRef,
    starship:starshipsRef,
    transport:transportRef,
    vehicle:vehiclesRef
}

export async function getDataByKeysList(entity, keysList, callback){
    const dataListLength = keysList.length;
    let result = [];
    for(let i = 0; i <= dataListLength; i += 10){
        const queryList = keysList.slice(i, i+10);
        if(queryList != [] && queryList.length != 0){
            const query = listOfReferences[entity]
                .where('pk', 'in', queryList);
            const queryResult = await getRequestToAPI(query, entity, function (type, message){
                callback(type, message);
            });
            result = result.concat(queryResult);
        }
    }

    return result;

}
