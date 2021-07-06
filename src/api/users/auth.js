import {auth} from '../firebaseSettings.js';
import firebase from "firebase/app";
import {addUserToLocalStorage, checkUserInLocalStorage, removeUserFromLocalStorage} from "../../utils/authLocalStorage";
import {setAuthButtonText} from "../../components/header/header";

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
        return userCredential;
    })
    .catch((error) => {
      console.log('something went wrong... ' + error);
      return error;
    });
}

/**
 *
 * @param email
 * @param password
 */
export async function login(email, password, _callback) {
  auth.signInWithEmailAndPassword(email, password)
    .then(async (userCredenial) => {
      console.log('success')
      await addUserToLocalStorage(auth.currentUser);
      setAuthButtonText();
      _callback();
    })
    .catch((error) => {
      alert('Ooops, looks like something went wrong' + error);
      console.log('something went wrong ' + error);
    });
}

export function logout(){
    removeUserFromLocalStorage();
}
