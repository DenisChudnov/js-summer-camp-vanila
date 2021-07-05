import {db} from '../firebaseSettings';

/**
 *
 */
export function checkFBConnect(){
  console.log('lets check this');
    db.collection('films').get().then((snapshot)=>{
    console.log(snapshot.docs);
  }).catch((error)=>{
      console.log('there are error+  '+ error);
    });
}

