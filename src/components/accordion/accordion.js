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
        <button class = "accordion-button-panel" type = "button" title="open/close accordion"></button>
        <div class = "accordion-content-panel">
        </div> 
        `;
    const openButton = this.getElementsByTagName('button')[0];
    openButton.addEventListener('click', openAccordionPanel);
  }

  disconnectedCallback(){
    this.removeEventListener('click', openAccordionPanel);
  }

}

function openAccordionPanel(){
  this.classList.toggle('active');
  const panel = this.nextElementSibling;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }
}

customElements.get('accordion-component') || customElements.define('accordion-component', Accordion);
