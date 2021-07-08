import './accordion.css';

/**
 * Accordion class - need for create new accordion element just as html element.
 * Including element in HTML layout of page return connected callback value into HTML;
 */
class Accordion extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <button class="accordion-button-panel" type="button"></button>
        <div class="accordion-content-panel">
        </div> 
        `;
  }

}


customElements.get('accordion-component') || customElements.define('accordion-component', Accordion);

const acc = document.getElementsByClassName('accordion-button-panel');

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}

