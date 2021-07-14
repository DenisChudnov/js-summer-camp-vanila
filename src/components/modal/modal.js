import './modal.css';

const customModal = {};
window.customModal = customModal;

Element.prototype.appendAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

/**
 * Function for add buttons to modal footer
 * @param buttons = array of buttons objects. Every button object
 * get params list:
 * text - string - for  displaying text on button
 * type - string - for set button type
 * handler - function - for add handling on button click
 */
function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div');
  }

  const wrap = document.createElement('div');
  wrap.classList.add('modal-footer');

  buttons.forEach(btn => {
    const $btn = document.createElement('button');
    $btn.textContent = btn.text;
    $btn.classList.add('btn');
    $btn.classList.add(`btn-${btn.type || 'secondary'}`);
    $btn.onclick = btn.handler;

    wrap.appendChild($btn);
  });
  return wrap;
}


/**
 * Function for create modal window
 * Options list:
 * @param options - object with next fields:
 * title - string, using for set modal header text
 * closable - boolean - using for managment of window and make it closable or not
 * width - need for set width of window (in some cases we can need for really big or small modal)
 * footerButtons - array of button objects
 */
function _createModal(options) {
  const DEFAULT_WIDTH = '600px';
  const modal = document.createElement('div');
  modal.classList.add('vmodal');
  modal.insertAdjacentHTML('afterbegin', `
    <div class = "modal-overlay" data-close = "true">
      <div class = "modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
        <div class = "modal-header">
          <span class = "modal-title">${options.title || 'Окно'}</span>
          ${options.closable ? '<span class = "modal-close" data-close = "true">&times;</span>' : ''}
        </div>
        <div class = "modal-body" data-content>
          ${options.content || ''}
        </div>
      </div>
    </div>
  `);
  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector('[data-content]'));
  document.body.appendChild(modal);
  return modal;
}

/**
 * Function with list of modal methods
* onClose(): void
* onOpen(): void
* beforeClose(): boolean
*/
customModal.modal = function(options) {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) {
        return console.log('Modal is destroyed');
      }
      !closing && $modal.classList.add('open');
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
        if (typeof options.onClose === 'function') {
          options.onClose();
        }
      }, ANIMATION_SPEED);
    },
  };

  const listener = event => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener('click', listener);

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    },
  });
};

/**
 * This window will using on confirmation of film removing.
 * Created on base of modal window.
 * @param options
 * @return {Promise<unknown>}
 */
customModal.confirm = function(options) {
  return new Promise((resolve, reject) => {
    const modal = customModal.modal({
      title: options.title,
      width: '500px',
      closable: false,
      content: options.content,
      onClose() {
        modal.destroy();
      },
      footerButtons: [
        {text: 'Cancel', type: 'secondary', handler() {
            modal.close();
            reject();
          }},
        {text: 'Remove', type: 'danger', handler() {
            modal.close();
            resolve();
          }},
      ],
    });

    setTimeout(() => modal.open(), 100);
  });
};



/**
 * For remove all alert, i made custom modal, which need for parameters.
 * @type {{close(): void, open(): (void|undefined)} & {setContent(*): void, destroy(): void}}
 */
const errorModal = customModal.modal({
  title: 'Error',
  closable: true,
  width: '400px',
  footerButtons: [
    {text: 'Close', type: 'primary', handler() {
        errorModal.close();
      }},
  ],
});

const attentionModal = customModal.modal({
  title: 'Attention',
  closable: true,
  width: '300px',
  footerButtons: [
    {text: 'Close', type: 'primary', handler() {
        attentionModal.close();
      }},
  ],
});

const welcomeModal = customModal.modal({
  title: 'Welcome',
  closable: true,
  width: '250px',
  footerButtons: [
    {text: 'Close', type: 'primary', handler() {
        welcomeModal.close();
      }},
  ],
});

const successModal = customModal.modal({
  title: 'Success',
  closable: true,
  width: '200px',
  footerButtons: [
    {text: 'Close', type: 'primary', handler() {
        successModal.close();
      }},
  ],
});


const modalWindowTypes = {
  'error': errorModal,
  'attention': attentionModal,
  'welcome': welcomeModal,
  'success': successModal,
}



function renderSelectedModalWindow(modal, message){
  modal.setContent(`
  <p>${message}</p>
  `);
  modal.open();
}


/**
 *
 * @param type
 * @param message
 */
export function openModalWindow(type, message){
  const selectedModalWindow = modalWindowTypes[type];
  renderSelectedModalWindow(selectedModalWindow, message);
}


