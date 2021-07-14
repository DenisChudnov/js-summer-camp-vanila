import {auth} from '../firebaseSettings.js';
import {addUserToLocalStorage, removeUserFromLocalStorage} from '../../utils/authLocalStorage';
import {setAuthButtonText} from '../../components/header/header';

/**
 * Function for registration with cred in params;
 * @param email string
 * @param password string
 */
export function createNewUser(email, password, callback) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        callback('success','New user was registered')
        return userCredential;
    })
    .catch((error) => {
      callback('error',`Something went wrong, server return error ${error}`);
      return error;
    });
}

/**
 * Function for send creds to API and authorize;
 * @param email string
 * @param password string
 * @param _callback function
 */
export async function login(email, password, callback) {
  auth.signInWithEmailAndPassword(email, password)
    .then(async (userCredenial) => {
      await addUserToLocalStorage(auth.currentUser);
      setAuthButtonText();
        callback('welcome','welcome to swapp!')
        window.open('./', '_self');
    })
    .catch((error) => {
        callback('error', `something went wrong... ${error}`);
    });
}

/**
 * Function for logged out and
 * remove user from local storage
 */
export function logout(){
    removeUserFromLocalStorage();
}
