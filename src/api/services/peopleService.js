import {People} from '../../utils/models/people';
import {peopleRef} from "../firebaseSettings";

export async function getPeopleListByPrimaryKeys(pkList){
    let peoplesList = []
    await peopleRef
        .where('pk','in',pkList)
        .get()
        .then((snapshot)=>{
            snapshot.docs.forEach(item=>{
                peoplesList.push(castToPeopleClass(item.data()));
            })
            if(peoplesList.length == 0){
                peoplesList = [];
            }
        })
        .catch((error)=>{
            console.log('there are error: '+error);
            peoplesList = []
        });
    return peoplesList;
}

function castToPeopleClass(doc){
    let data = doc.fields;
    data.pk = doc.pk;
    return new People(data);
}
