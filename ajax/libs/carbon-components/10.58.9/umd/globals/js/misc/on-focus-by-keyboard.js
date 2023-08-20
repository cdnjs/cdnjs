(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.onFocusByKeyboard = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = onFocusByKeyboard;
  /**
   * Differentiate between keyboard and mouse-triggered focusout/blur events
   * @param {Element} node  The element to attach event listeners to
   * @param {string} name The event name to listen to
   * @param {Function} callback The callback function to invoke
   * @returns {Handle} The handle to release the attached event handler
   */

  function onFocusByKeyboard(node, name, callback) {
    var hasFocusout = ('onfocusout' in window);
    var focusinEventName = hasFocusout ? 'focusin' : 'focus';
    var focusoutEventName = hasFocusout ? 'focusout' : 'blur';
    /**
     * Event types supported by this function
     * @type {object<string, string>}
     */

    var supportedEvents = {
      focus: focusinEventName,
      blur: focusoutEventName
    };
    var eventName = supportedEvents[name];

    if (!eventName) {
      throw new Error('Unsupported event!');
    }

    var clicked;

    var handleMousedown = function handleMousedown() {
      clicked = true;
      requestAnimationFrame(function () {
        clicked = false;
      });
    };

    var handleFocusin = function handleFocusin(evt) {
      if (!clicked) {
        callback(evt);
      }
    };

    node.ownerDocument.addEventListener('mousedown', handleMousedown);
    node.addEventListener(eventName, handleFocusin, !hasFocusout);
    return {
      release: function release() {
        if (handleFocusin) {
          node.removeEventListener(eventName, handleFocusin, !hasFocusout);
          handleFocusin = null;
        }

        if (handleMousedown) {
          node.ownerDocument.removeEventListener('mousedown', handleMousedown);
          handleMousedown = null;
        }

        return null;
      }
    };
  }
});