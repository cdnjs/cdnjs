/* global tidioChatApi */

(function() {
  const chatButton = document.querySelector('.sidebar-button button');
  if (chatButton) {
    chatButton.addEventListener('click', () => {
      tidioChatApi.open();
    });
  }
})();
