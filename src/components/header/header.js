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

    this.authButton = document.getElementById('auth-call-btn');
    this.authButton.addEventListener('click', handlerAuthButtonClick);

    document.addEventListener('DOMContentLoaded', () => {
      this.setAuthButtonText();
      if (checkUserInLocalStorage()){
        document.getElementById('links-list').innerHTML += `
     <li class="nav-item" id="new-film-create-item">
        <a class="nav-link" id="new-film-create-link" href="../management.html">Create new film</a>
     </li>
    `;
      }
    });

  }

  disconnectedCallback(){
    this.authButton.removeEventListener('click', handlerAuthButtonClick);
  }

  setAuthButtonText(){
    this.authButton.innerText = checkUserInLocalStorage() ? 'Logout' : 'Login';
  }

}

/**
 * Function for handling auth button
 * if user logged in - he wil logout
 * and in each case - redirect to auth page
 */
function handlerAuthButtonClick(){
  if (checkUserInLocalStorage()) {
    logout();
  }
  window.open('auth.html', '_self');
}

customElements.get('header-component') || customElements.define('header-component', Header);


