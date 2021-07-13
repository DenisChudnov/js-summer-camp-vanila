import './auth.css';
import '../../styles/style.css';
import {createNewUser, login} from '../../api/services/auth.js';
import {isEmailValid, isFieldValueLengthValid} from '../../utils/authValidator';
import '../../components/header/header.js';
import {openModalWindow} from '../../components/modal/modal';

document
  .getElementById('show-signin-form')
  .addEventListener('click', () => {
    document.getElementById('sign-in-container').classList.remove('hidden');
    document.getElementById('sign-up-container').classList.add('hidden');
  });

document
  .getElementById('show-signup-form')
  .addEventListener('click', () => {
    document.getElementById('sign-in-container').classList.add('hidden');
    document.getElementById('sign-up-container').classList.remove('hidden');
  });

document
  .getElementById('sign-up-button')
  .addEventListener('click', () => {
    const signUpForm = document.getElementById('sign-up-form');
    const email = signUpForm.registrationEmail.value;
    const password = signUpForm.registrationPassword.value;
    const fieldsLengthIsValid = (isFieldValueLengthValid(email) && isFieldValueLengthValid(password));
    if (fieldsLengthIsValid){
      if (isEmailValid(email)) {
        createNewUser(email, password);
      } else {
        openModalWindow('error', 'Invalid email');
      }
    } else {
      openModalWindow('error', 'email and password length should be more, than 5 symbols and less, than 80 symbols');
    }
  });

document
  .getElementById('sign-in-button')
  .addEventListener('click', () => {
    const signInForm = document.getElementById('sign-in-form');
    const email = signInForm.loginEmail.value;
    const password = signInForm.loginPassword.value;
    login(email, password);
  });

