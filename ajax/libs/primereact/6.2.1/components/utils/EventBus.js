"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var eventTarget, eventListener, eventKey;
  return {
    on: function on(type, listener, key) {
      eventTarget = eventTarget || document.body.appendChild(document.createComment(''));
      eventKey = key;

      eventListener = function eventListener(e) {
        listener(e.detail);
      };

      eventTarget.addEventListener(type, eventListener);
    },
    once: function once(type, listener, key) {
      eventTarget = eventTarget || document.body.appendChild(document.createComment(''));
      eventKey = key;

      eventListener = function eventListener(e) {
        listener(e.detail);
      };

      eventTarget.addEventListener(type, eventListener, {
        once: true
      });
    },
    off: function off(type, key) {
      if (eventTarget && eventListener && eventKey === key) {
        eventTarget.removeEventListener(type, eventListener);
      }
    },
    emit: function emit(type, detail) {
      if (eventTarget) {
        eventTarget.dispatchEvent(new CustomEvent(type, {
          detail: detail
        }));
      }
    }
  };
}