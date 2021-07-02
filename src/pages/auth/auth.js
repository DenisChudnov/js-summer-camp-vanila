console.log('welcome to auth page');
import './auth.css'
import '../../styles/style.css'
// import {checkWork} from "../../api/users/auth.js"

document
    .getElementById('show-signin-form')
    .addEventListener('click', ()=>{
        document.getElementById('sign-in-container').classList.remove('hidden');
        document.getElementById('sign-up-container').classList.add('hidden');
    })

document
    .getElementById('show-signup-form')
    .addEventListener('click', ()=>{
        document.getElementById('sign-in-container').classList.add('hidden');
        document.getElementById('sign-up-container').classList.remove('hidden');
    })
//
// document
//     .getElementById('sign-up-button')
//     .addEventListener('click', () => {
//         const signUpForm = document.getElementById('sign-up-form');
//         const email = signUpForm['inputEmail1'].value;
//         const password = signUpForm['inputPassword1'].value;
//         const firstname = signUpForm['inputFirstname'].value;
//         const surname = signUpForm['inputSurname'].value;
//         if(isEmailValid(email)){
//             alert('good')
//         } else {
//             alert('bad')
//         }
//     })
//
// document
//     .getElementById('sign-in-button')
//     .addEventListener('click', () => {
//         const signInForm = document.getElementById('sign-in-form');
//         const email = signInForm['inputEmail2'].value;
//         const password = signInForm['inputPassword2'].value;
//
//         checkWork(email);
//     })
//
/**
 * This is func for check email valid, and entered with
 * pattern *@*.*
 * If email is valid - return true. Else - return false
 * @param email - string
 */
function isEmailValid(email){
    let mailValidFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(mailValidFormat)){
        return true
    }
    return false
}

// /**
//  * In this func we check, that
//  * entered email is not
//  * registered yet.
//  * If user with entered email is already exist in
//  * database - func will return false.
//  * @param email - valid email string
//  */
// function isNewUser(email){
//
// }

