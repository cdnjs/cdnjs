(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.reframe = factory());
}(this, (function () { 'use strict';

// Reframe.js
// - runs for 1 child element (does not assume multiple elements)
// - does not deal with src, so it will repaint
// - it JUST creates a fluid wrapper
function Reframe(el) {
  var frames = document.querySelectorAll(el);
  if (frames.length <= 0) return false;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = frames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var frame = _step.value;

      var frameHeight = frame.offsetHeight;
      var frameWidth = frame.offsetWidth;
      var wrapper = document.createElement('div');
      var divAdded = false;
      var padding = 100;
      if (frameHeight > frameWidth) {
        padding = frameWidth / frameHeight * 100;
      } else if (frameHeight < frameWidth) {
        padding = frameHeight / frameWidth * 100;
      }
      wrapper.style.paddingTop = '' + padding + '%';
      wrapper.className += 'js-reframe';
      frame.removeAttribute('height');
      frame.removeAttribute('width');
      frame.removeAttribute('style');
      if (!divAdded) {
        frame.parentNode.insertBefore(wrapper, frame);
        divAdded = true;
      }
      frame.parentNode.removeChild(frame);
      wrapper.appendChild(frame);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return this;
}

function reframe (el) {
  return new Reframe(el);
}

return reframe;

})));