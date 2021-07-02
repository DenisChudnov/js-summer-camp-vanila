console.log('welcome to auth page');
import './auth.css';
import '../../styles/style.css';
import {checkWork, createNewUser} from '../../api/users/auth.js';
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
    const firstname = signUpForm.inputFirstname.value;
    const surname = signUpForm.inputSurname.value;
    if (isEmailValid(email)) {
      createNewUser();
    } else {
      alert('bad');
    }
  });
//
// Document
//     .getElementById('sign-in-button')
//     .addEventListener('click', () => {
//         Const signInForm = document.getElementById('sign-in-form');
//         Const email = signInForm['inputEmail2'].value;
//         Const password = signInForm['inputPassword2'].value;
//
//         CheckWork(email);
//     })
//


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

