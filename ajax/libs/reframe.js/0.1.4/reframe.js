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
  this.frame = document.querySelector(el);
  if (!this.frame) return false;
  var frameHeight = this.frame.offsetHeight;
  var frameWidth = this.frame.offsetWidth;
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
  this.frame.removeAttribute('height');
  this.frame.removeAttribute('width');
  this.frame.removeAttribute('style');
  if (!divAdded) {
    this.frame.parentNode.insertBefore(wrapper, this.frame);
    divAdded = true;
  }
  this.frame.parentNode.removeChild(this.frame);
  wrapper.appendChild(this.frame);

  return this;
}

function reframe (el) {
  return new Reframe(el);
}

return reframe;

})));