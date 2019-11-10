(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.reframe = factory());
}(this, (function () { 'use strict';

function reframe(target, cName) {
  var frames = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in frames)) {
    frames = [frames];
  }
  var classname = cName || 'js-reframe';
  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];
    var hasClass = frame.className.split(' ').indexOf(classname);
    if (hasClass >= 0) return;
    var div = document.createElement('div');
    var height = frame.offsetHeight;
    var width = frame.offsetWidth;
    var padding = height / width * 100;
    div.style.paddingTop = padding + '%';
    div.style.position = 'relative';
    div.style.width = frame.style.width = frame.style.height = '100%';
    div.className += classname;
    frame.parentNode.insertBefore(div, frame);
    frame.parentNode.removeChild(frame);
    frame.style.left = frame.style.top = '0';
    frame.style.position = 'absolute';
    div.appendChild(frame);
  }
}

var plugin = window.$ || window.jQuery || window.zepto;
if (plugin) {
  plugin.fn.extend({
    reframe: function reframeFunc(cName) {
      return reframe(this, cName);
    }
  });
}

return reframe;

})));