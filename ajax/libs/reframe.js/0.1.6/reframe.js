(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.reframe = factory());
}(this, (function () { 'use strict';

// Reframe.js
// - runs for all selector unless otherwise specified
// - does not deal with src, so it will repaint
// - it JUST creates a fluid wrapper
function Reframe(selector) {
  var frames = document.querySelectorAll(selector);
  if (frames.length <= 0) return false;
  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];
    var height = frame.offsetHeight;
    var width = frame.offsetWidth;
    var div = document.createElement('div');
    var padding = 100;
    if (height !== width) {
      padding = height / width * 100;
    }
    div.style.paddingTop = padding + '%';
    frame.removeAttribute('height');
    frame.removeAttribute('width');
    frame.removeAttribute('style');
    if (!div.classList.contains('js-reframe')) {
      div.className += 'js-reframe';
      frame.parentNode.insertBefore(div, frame);
    }
    frame.parentNode.removeChild(frame);
    div.appendChild(frame);
  }
  return this;
}

function reframe (selector) {
  return new Reframe(selector);
}

return reframe;

})));
