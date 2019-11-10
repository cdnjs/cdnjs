(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.noframe = factory());
}(this, (function () { 'use strict';

function noframe(target, container) {
  var frames = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in frames)) frames = [frames];
  for (var i = 0; i < frames.length; i += 1) {
    var frame = frames[i];
    var isContainerElement = typeof container !== 'undefined' && document.querySelector(container);
    var parent = isContainerElement ? document.querySelector(container) : frame.parentElement;
    var h = frame.offsetHeight;
    var w = frame.offsetWidth;
    var styles = frame.style;
    var maxW = w + 'px';
    if (isContainerElement) {
      maxW = window.getComputedStyle(parent, null).getPropertyValue('max-width');
      styles.width = '100%';
      styles.maxHeight = 'calc(' + maxW + ' * ' + h + ' / ' + w + ')';
    } else {
      var maxH = void 0;
      styles.display = 'block';
      styles.marginLeft = 'auto';
      styles.marginRight = 'auto';
      var fullW = maxW;
      if (w > parent.offsetWidth) {
        fullW = parent.offsetWidth;
        maxH = fullW * h / w;
      } else maxH = w * (h / w);
      styles.maxHeight = maxH + 'px';
      styles.width = fullW;
    }
    var cssHeight = 100 * h / w;
    styles.height = cssHeight + 'vw';
    styles.maxWidth = '100%';
  }
}

return noframe;

})));
