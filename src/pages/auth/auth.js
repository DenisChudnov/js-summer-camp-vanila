import './auth.css';
import '../../styles/style.css';
import {createNewUser, login} from '../../api/users/auth.js';
import {isEmailValid, isFieldValueLengthValid} from '../../utils/authValidator';
import {checkUserInLocalStorage, removeUserFromLocalStorage} from '../../utils/authLocalStorage';
import '../../components/header/header.js';
import {setAuthButtonText} from '../../components/header/header';

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
    const email = signUpForm.inputEmail1.value;
    const password = signUpForm.inputPassword1.value;
    if (isFieldValueLengthValid(email) && isFieldValueLengthValid(password)){
      if (isEmailValid(email)) {
        createNewUser(email, password);
      } else {
        alert('Invalid email');
      }
    } else {
      alert('email and password length should be more, than 5 symbols and less, than 80 symbols');
    }
  });

document
  .getElementById('sign-in-button')
  .addEventListener('click', () => {
    const signInForm = document.getElementById('sign-in-form');
    const email = signInForm.inputEmail2.value;
    const password = signInForm.inputPassword2.value;
    login(email, password);

  });

document
  .getElementById('check')
  .addEventListener('click', ()=>{
    console.log('check');
    if (checkUserInLocalStorage()) alert('there are exist active user'); else {
      alert('no users authenticated');
    }
  });


document
  .getElementById('logout')
  .addEventListener('click', ()=>{
    console.log('logout');
    removeUserFromLocalStorage();
    setAuthButtonText();
    console.log('User was logged out');
  });
