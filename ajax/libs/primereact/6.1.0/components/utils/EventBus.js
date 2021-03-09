"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var eventTarget = document.body.appendChild(document.createComment(''));
  var eventListener, eventKey;
  return {
    on: function on(type, listener, key) {
      eventKey = key;

      eventListener = function eventListener(e) {
        listener(e.detail);
      };

      eventTarget.addEventListener(type, eventListener);
    },
    once: function once(type, listener, key) {
      eventKey = key;

      eventListener = function eventListener(e) {
        listener(e.detail);
      };

      eventTarget.addEventListener(type, eventListener, {
        once: true
      });
    },
    off: function off(type, key) {
      if (eventListener && eventKey === key) {
        eventTarget.removeEventListener(type, eventListener);
      }
    },
    emit: function emit(type, detail) {
      eventTarget.dispatchEvent(new CustomEvent(type, {
        detail: detail
      }));
    }
  };
}