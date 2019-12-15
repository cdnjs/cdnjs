(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.noframe = factory());
}(this, (function () { 'use strict';

function noframer(target, container) {
  var frame = target;
  var height = frame.offsetHeight;
  var width = frame.offsetWidth;
  var frameStyle = frame.style;
  if (typeof container !== 'undefined') {
    var parent = document.querySelector(container);
    var maxwidth = window.getComputedStyle(parent, null).getPropertyValue('max-width');
    frameStyle.width = '100%';
    frameStyle.maxHeight = 'calc(' + maxwidth + ' * ' + height + '/' + width + ')';
  } else {
    var _maxwidth = width + 'px';
    frameStyle.display = 'block';
    frameStyle.marginLeft = 'auto';
    frameStyle.marginRight = 'auto';
    var fullwidth = _maxwidth + 'px';
    var frameParent = frame.parentElement;
    if (width > frameParent.offsetWidth) {
      fullwidth = frameParent.offsetWidth;
      frameStyle.maxHeight = 'calc(' + fullwidth + 'px * ' + height + '/' + width + ')';
    } else {
      frameStyle.maxHeight = 'calc(' + _maxwidth + ' * ' + height + '/' + width + ')';
    }
    frameStyle.width = fullwidth + 'px';
  }
  frameStyle.height = 'calc(100vw * ' + height + '/' + width + ')';
  frameStyle.maxWidth = '100vw';
}

function noframe(target, container) {
  var frames = document.querySelectorAll(target);
  if (!('length' in frames)) frames = [frames];
  for (var i = 0; i < frames.length; i += 1) {
    var frame = frames[i];
    noframer(frame, container);
  }
}

return noframe;

})));
