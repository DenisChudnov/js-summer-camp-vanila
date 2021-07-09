import './auth.css';
import '../../styles/style.css';
import {createNewUser, login, logout} from '../../api/services/auth.js';
import {isEmailValid, isFieldValueLengthValid} from '../../utils/authValidator';
import {checkUserInLocalStorage, removeUserFromLocalStorage} from '../../utils/authLocalStorage';
import '../../components/header/header.js';
import {setAuthButtonText} from '../../components/header/header';

import '../../components/base.js';
import '../../components/modal/modal.js';
import '../../components/modal/modal.css';

/**
 * For remove all alert, i made custom modal, which need for parameters.
 * @type {{close(): void, open(): (void|undefined)} & {setContent(*): void, destroy(): void}}
 */
const msgModal = $.modal({
  title: 'Attention',
  closable: true,
  width: '300px',
  footerButtons: [
    {text: 'Close', type: 'primary', handler() {
      msgModal.close();
    }},
  ],
});

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

document
  .getElementById('sign-up-button')
  .addEventListener('click', () => {
    const signUpForm = document.getElementById('sign-up-form');
    const email = signUpForm.registrationEmail.value;
    const password = signUpForm.registrationPassword.value;
    const fieldsLengthIsValid = (isFieldValueLengthValid(email) && isFieldValueLengthValid(password));
    if (fieldsLengthIsValid){
      if (isEmailValid(email)) {
        createNewUser(email, password, function (result, message = 'Success!'){
          openModalWindow(message);
        });
      } else {
        openModalWindow('Invalid email');
      }
    } else {
      openModalWindow('email and password length should be more, than 5 symbols and less, than 80 symbols');
    }
  });

document
  .getElementById('sign-in-button')
  .addEventListener('click', () => {
    const signInForm = document.getElementById('sign-in-form');
    const email = signInForm.loginEmail.value;
    const password = signInForm.loginPassword.value;
    login(email, password, function (result, message = 'Success!'){
      if (result == 'success'){
        window.open('./', '_self');
      } else {
        openModalWindow(message);
      }
    });
  });


/**
 * Function for call custom modal window
 * @param message string - message, which will displayed on modal window.
 */
function openModalWindow(message){
  msgModal.setContent(`
      <p>${message}</p>
    `);
  msgModal.open();
}
