/**
  reframe.js - Reframe.js: responsive iframes for embedded content
  @version v4.0.1
  @link https://github.com/yowainwright/reframe.ts#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (http://jeffry.in)
  @license MIT
**/
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  /* noframe.js () 🖼
    -------------
    takes 2 arguments:
    => target: targeted <element>
    => container: optional targeted <parent> of targeted <element>
    -------------
    defines the height/width ratio of the targeted <element>
    based on the targeted <parent> width
  */
  function noframe(target, container) {
      var frames = typeof target === 'string' ? document.querySelectorAll(target) : target;
      if (!('length' in frames))
          frames = [frames];
      for (var i = 0; i < frames.length; i += 1) {
          var frame = frames[i];
          var isContainerElement = typeof container !== 'undefined' && document.querySelector(container);
          var parent_1 = isContainerElement ? document.querySelector(container) : frame.parentElement;
          var h = frame.offsetHeight;
          var w = frame.offsetWidth;
          var styles = frame.style;
          // => If a targeted <container> element is defined
          if (isContainerElement) {
              // gets/sets the height/width ratio
              var maxW = window.getComputedStyle(parent_1, null).getPropertyValue('max-width');
              styles.width = '100%';
              // calc is needed here b/c the maxW measurement type is unknown
              styles.maxHeight = "calc(".concat(maxW, " * ").concat(h, " / ").concat(w, ")");
          }
          else {
              // gets/sets the height/width ratio
              // => if a targeted <element> closest parent <element> is NOT defined
              styles.display = 'block';
              styles.marginLeft = 'auto';
              styles.marginRight = 'auto';
              var fullW = w > parent_1.offsetWidth ? parent_1.offsetWidth : w;
              var maxH = w > parent_1.offsetWidth ? (fullW * h) / w : w * (h / w);
              // if targeted <element> width is > than it's parent <element>
              // => set the targeted <element> maxheight/fullwidth to it's parent <element>
              styles.maxHeight = "".concat(maxH, "px");
              styles.width = "".concat(fullW, "px");
          }
          // set a calculated height of the targeted <element>
          var cssHeight = (100 * h) / w; // eslint-disable-line no-mixed-operators
          styles.height = "".concat(cssHeight, "vw");
          styles.maxWidth = '100%';
      }
  }

  if (typeof window !== 'undefined') {
      var plugin = window.$ || window.jQuery || window.Zepto;
      if (plugin) {
          plugin.fn.noframe = function noframePlugin(cName) {
              noframe(this, cName);
          };
      }
  }

}));
