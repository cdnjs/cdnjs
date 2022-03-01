/* global Pace */

Pace.options.restartOnPushState = false;

document.addEventListener('pjax:send', () => {
  Pace.restart();
});
