import {auth} from '../firebase-setting.js';

/**
 *
 * @param email
 * @param password
 */
export function createNewUser(email, password) {
    console.log('creating of new user with creds... '+email+', '+password);
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log('successfully create of user! ' + userCredential);
    })
    .catch((error) => {
      console.log('something went wrong... ' + error);
    });
}

/**
 *
 * @param email
 * @param password
 */
export function loginAsExistingUser(email, password) {
    console.log('LOGIN with creds... '+email+', '+password);
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
