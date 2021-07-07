import {Planet} from "../../utils/models/planet";
import { planetsRef} from "../firebaseSettings";

/**
 *
 * @param keysArray
 * @return {Promise<void>}
 */
export async function getPlanetsListByKeys(keyList){
    let planetsList = []
    await planetsRef
        .where('pk','in',keyList)
        .get()
        .then((snapshot)=>{
            snapshot.docs.forEach(item=>{
                planetsList.push(castToPlanetClass(item.data()));
            })
            if(planetsList.length == 0){
                planetsList = [];
            }
        })
        .catch((error)=>{
            console.log('there are error: '+error);
            planetsList = []
        });
    return planetsList;
}

function castToPlanetClass(doc){
    let data = doc.fields;
    data.pk = doc.pk;
    return new Planet(data);
}
