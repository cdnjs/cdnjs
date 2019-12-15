(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.reframe = factory());
}(this, (function () { 'use strict';

function reframe(target, cName) {
  var frames = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in frames)) frames = [frames];
  var classname = cName || 'js-reframe';

  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];
    var hasClass = frame.className.split(' ').indexOf(classname) !== -1;
    if (hasClass) return;

    var height = frame.offsetHeight;
    var width = frame.offsetWidth;
    var padding = height / width * 100;

    var div = document.createElement('div');
    div.className = classname;
    div.style.position = 'relative';
    div.style.width = '100%';
    div.style.paddingTop = padding + '%';

    frame.style.position = 'absolute';
    frame.style.width = frame.style.height = '100%';
    frame.style.left = frame.style.top = '0';

    frame.parentNode.insertBefore(div, frame);
    frame.parentNode.removeChild(frame);
    div.appendChild(frame);
  }
}

if (typeof window !== 'undefined') {
  var plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.reframe = function reframePlugin(cName) {
      reframe(this, cName);
      return;
    };
  }
}

return reframe;

})));
