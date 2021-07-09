import {auth} from '../firebaseSettings.js';
import {addUserToLocalStorage, removeUserFromLocalStorage} from '../../utils/authLocalStorage';
import {setAuthButtonText} from '../../components/header/header';

/**
 * Function for registration with cred in params;
 * @param email string
 * @param password string
 */
export function createNewUser(email, password, _callback) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        _callback(userCredential)
        return userCredential;
    })
    .catch((error) => {
      _callback(error, error.message);
      return error;
    });
}

/**
 * Function for send creds to API and authorize;
 * @param email string
 * @param password string
 * @param _callback function
 */
export async function login(email, password, _callback) {
  auth.signInWithEmailAndPassword(email, password)
    .then(async (userCredenial) => {
      await addUserToLocalStorage(auth.currentUser);
      setAuthButtonText();
      _callback('success');
    })
    .catch((error) => {
        _callback('fail', error)
    });
}

/**
 * Function for logged out and
 * remove user from local storage
 */
export function logout(){
    removeUserFromLocalStorage();
}
