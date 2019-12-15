(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.reframe = factory());
}(this, (function () { 'use strict';

function reframer(target, cName) {
  var frame = target;
  var classname = cName || 'js-reframe';
  var hasClass = frame.className.split(' ').indexOf(classname) !== -1;
  if (hasClass) return;
  var height = frame.offsetHeight;
  var width = frame.offsetWidth;
  var padding = height / width * 100;
  var div = document.createElement('div');
  div.className = classname;
  var divStyle = div.style;
  divStyle.position = 'relative';
  divStyle.width = '100%';
  divStyle.paddingTop = padding + '%';
  var frameStyle = frame.style;
  frameStyle.position = 'absolute';
  frameStyle.width = '100%';
  frameStyle.height = '100%';
  frameStyle.left = '0';
  frameStyle.top = '0';
  frame.parentNode.insertBefore(div, frame);
  frame.parentNode.removeChild(frame);
  div.appendChild(frame);
}

function reframe(target, cName) {
  var frames = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in frames)) frames = [frames];
  for (var i = 0; i < frames.length; i += 1) {
    var frame = frames[i];
    reframer(frame, cName);
  }
}
if (typeof window !== 'undefined') {
  var plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.reframe = function reframePlugin(cName) {
      reframe(this, cName);
    };
  }
}

return reframe;

})));
