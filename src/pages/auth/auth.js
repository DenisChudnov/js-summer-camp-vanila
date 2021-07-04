import firebase from "firebase/app";

console.log('welcome to auth page');
import './auth.css';
import '../../styles/style.css';
import {checkWork, createNewUser, loginAsExistingUser} from '../../api/users/auth.js';
import {isEmailValid} from "../../utils/auth-validator";



document
  .getElementById('show-signin-form')
  .addEventListener('click', ()=>{
    document.getElementById('sign-in-container').classList.remove('hidden');
    document.getElementById('sign-up-container').classList.add('hidden');
  });

document
  .getElementById('show-signup-form')
  .addEventListener('click', ()=>{
    document.getElementById('sign-in-container').classList.add('hidden');
    document.getElementById('sign-up-container').classList.remove('hidden');
  });
//
document
  .getElementById('sign-up-button')
  .addEventListener('click', () => {
    const signUpForm = document.getElementById('sign-up-form');
    const email = signUpForm.inputEmail1.value;
    const password = signUpForm.inputPassword1.value;
    if (isEmailValid(email)) {
      createNewUser(email, password);
    } else {
      alert('bad');
    }
  });

document
    .getElementById('sign-in-button')
    .addEventListener('click', () => {
        const signInForm = document.getElementById('sign-in-form');
        const email = signInForm['inputEmail2'].value;
        const password = signInForm['inputPassword2'].value;
        loginAsExistingUser(email, password);

    })



// /**
//  * In this func we check, that
//  * Entered email is not
//  * Registered yet.
//  * If user with entered email is already exist in
//  * Database - func will return false.
//  * @param email - valid email string
//  */
// Function isNewUser(email){
//
// }

