import {checkUserInLocalStorage} from '../../utils/authLocalStorage';
import {logout} from '../../api/services/auth';

/**
 * Class for create the same HTML element on all pages, where <header-component> included
 * return connected callback value to HTML
 */
class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(){
    this.innerHTML = `   
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="../">
                    <span>LOGO.png :)</span>
                </a>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="links-list">
                        <li class="nav-item">
                            <a class="nav-link" id="films-table-link" href="../">Films</a>
                        </li>
                    </ul>
                    <button class="btn btn-outline-success" type="button" id="auth-call-btn"></button>
                </div>
            </div>
        </nav>
       `;
  }

}


customElements.get('header-component') || customElements.define('header-component', Header);

const authButton = document.getElementById('auth-call-btn');


document.addEventListener('DOMContentLoaded', ()=>{
  setAuthButtonText();
  if (checkUserInLocalStorage()){
    document.getElementById('links-list').innerHTML += `
     <li class="nav-item" id="new-film-create-item">
        <a class="nav-link" id="new-film-create-link" href="../management.html">Create new film</a>
     </li>
    `;
  }
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


