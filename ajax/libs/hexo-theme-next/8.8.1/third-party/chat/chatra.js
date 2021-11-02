/* global CONFIG, Chatra */

(function() {
  if (CONFIG.chatra.embed) {
    window.ChatraSetup = {
      mode    : 'frame',
      injectTo: CONFIG.chatra.embed
    };
  }

  window.ChatraID = CONFIG.chatra.id;

  const chatButton = document.querySelector('.sidebar-button button');
  if (chatButton) {
    chatButton.addEventListener('click', () => {
      Chatra('openChat', true);
    });
  }
})();
