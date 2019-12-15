(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.noframe = factory());
}(this, (function () { 'use strict';

function noframe(target, container) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) {
    els = [els];
  }
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    var height = el.offsetHeight;
    var width = el.offsetWidth;
    if (typeof container !== 'undefined') {
      var parent = document.querySelector(container);
      var maxwidth = window.getComputedStyle(parent, null).getPropertyValue('max-width');
      el.style.width = '100%';
      el.style.maxHeight = 'calc(' + maxwidth + ' * ' + height + '/' + width + ')';
    } else {
      var _maxwidth = width + 'px';
      el.style.display = 'block';
      el.style.marginLeft = el.style.marginRight = 'auto';
      var fullwidth = _maxwidth + 'px';
      if (width > el.parentElement.offsetWidth) {
        fullwidth = el.parentElement.offsetWidth;
        el.style.maxHeight = 'calc(' + fullwidth + 'px * ' + height + '/' + width + ')';
      } else {
        el.style.maxHeight = 'calc(' + _maxwidth + ' * ' + height + '/' + width + ')';
      }
      el.style.width = fullwidth + 'px';
    }
    el.style.height = 'calc(100vw * ' + height + '/' + width + ')';
    el.style.maxWidth = '100vw';
  }
}
if (typeof window !== 'undefined') {
  var plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.noframe = function noframePlugin(cName) {
      noframe(this, cName);
      return this;
    };
  }
}

return noframe;

})));
