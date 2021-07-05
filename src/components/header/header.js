import {checkUserInLocalStorage} from '../../utils/authLocalStorage';
import {logout} from '../../api/users/auth';

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(){
    this.innerHTML = '    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">\n' +
            '        <div class="container-fluid">\n' +
            '            <a class="navbar-brand" href="../">\n' +
            '                <span>will be logo</span>\n' +
            '            </a>\n' +
            '            <div class="collapse navbar-collapse" id="navbarText">\n' +
            '                <ul class="navbar-nav me-auto mb-2 mb-lg-0">\n' +
            '                    <li class="nav-item">\n' +
            '                        <a class="nav-link" id="films-table-link">Films</a>\n' +
            '                    </li>\n' +
            '<!--                    <li class="nav-item">-->\n' +
            '<!--                        <a class="nav-link" href="">About</a>-->\n' +
            '<!--                    </li>-->\n' +
            '                </ul>\n' +
            '                <button class="btn btn-outline-success" type="button" id="auth-call-btn"></button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </nav>';
  }

}


customElements.get('header-component') || customElements.define('header-component', Header);

let authButton = document.getElementById('auth-call-btn');
let linkToFilmsPage = document.getElementById('films-table-link');

document.addEventListener('DOMContentLoaded', ()=>{
  setAuthButtonText();
});

linkToFilmsPage.addEventListener('click', ()=>{
  window.open('/', '_self');
});

/**
 * Handler of click on auth-button
 * redirect to login page and
 * logout, if user is already logged in
 */
authButton.addEventListener('click', ()=>{
  if (checkUserInLocalStorage()) {
    logout();
  }
  window.open('auth.html', '_self');
});

/**
 * Simple function for set text on auth-button
 * if user is logged in - text is Logout
 * and in other case - text is Login
 */
export function setAuthButtonText(){
  authButton.innerText = checkUserInLocalStorage() ? 'Logout' : 'Login';
}


