/* global CONFIG */

if (CONFIG.chatra.embed) {
  window.ChatraSetup = {
    mode    : 'frame',
    injectTo: CONFIG.chatra.embed
  };
}

window.ChatraID = CONFIG.chatra.id;
