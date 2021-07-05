import {db} from '../firebaseSettings';

/**
 *
 */
export function getFilms(sortingByField = 'pk', sortingOrder='asc', limit= 3, pageNumber= 1){
  console.log('lets check this');
  let startPosition = (pageNumber-1)*limit;
    sortingByField = changeOrderByFieldNameToValid(sortingByField);
  db.collection('films')
      .orderBy(sortingByField, sortingOrder)
      .limit(limit)
      .startAfter(startPosition)
    .get()
    .then((snapshot)=>{
      snapshot.docs.forEach(item => {
        if (item){
          console.log(item.data());
        }
      });
    }).catch((error)=>{
      console.log('there are error+  '+ error);
    });
}

function changeOrderByFieldNameToValid(fieldName){
    if(fieldName != 'pk'){
        fieldName = 'fields.'+fieldName;
    }
    return fieldName;
}
