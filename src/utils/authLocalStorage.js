

/**
 *function for save user data object
 * in browser local storage after
 * authorizate
 * @param {object} user
 */
export function addUserToLocalStorage(user){
  localStorage.setItem('activeUser', user);
}

/**
 *function for clean up user data
 * from browser local storage after
 * logout
 */
export function removeUserFromLocalStorage(){
  localStorage.removeItem('activeUser');
}

/**
 *function for check if some user
 * is loggined in,
 * @return {boolean}, with true, if some user is loggined in,
 * and false in other case
 */
export function checkUserInLocalStorage(){
  return !!localStorage.getItem('activeUser');
}
