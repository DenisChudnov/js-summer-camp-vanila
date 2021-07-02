import {firestore, auth} from '../firebase-setting.js';

/**
 *
 */
export function createNewUser() {
  auth.createUserWithEmailAndPassword('qwerty@qa.aq', 'qwerty')
    .then((userCredential) => {
      console.log('successfully create of user! ' + userCredential);
    })
    .catch((error) => {
      console.log('something went wrong... ' + error);
    });
}

/**
 *
 */
export function signIn(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredenial) => {
      alert('OK');
      console.log('success ' + userCredenial);
    })
    .catch((error) => {
      alert('NO');
      console.log('something went wrong ' + error);
    });
}

/**
 *
 */
export function checkWork(smthng) {
  alert('it is ' + smthng);
}
