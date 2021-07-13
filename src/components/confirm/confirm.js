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
