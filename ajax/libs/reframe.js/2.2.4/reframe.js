(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.reframe = factory());
}(this, (function () { 'use strict';

  function reframe(target, cName) {
    var frames = typeof target === 'string' ? document.querySelectorAll(target) : target;
    var c = cName || 'js-reframe';
    if (!('length' in frames)) frames = [frames];
    for (var i = 0; i < frames.length; i += 1) {
      var frame = frames[i];
      var hasClass = frame.className.split(' ').indexOf(c) !== -1;
      if (hasClass) continue;
      var hAttr = frame.getAttribute('height');
      var wAttr = frame.getAttribute('width');
      if (wAttr.indexOf('%') > -1 || frame.style.width.indexOf('%') > -1) continue;
      var h = hAttr || frame.offsetHeight;
      var w = wAttr || frame.offsetWidth;
      var padding = h / w * 100;
      var div = document.createElement('div');
      div.className = c;
      var divStyles = div.style;
      divStyles.position = 'relative';
      divStyles.width = '100%';
      divStyles.paddingTop = padding + "%";
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
  }

  return reframe;

})));
