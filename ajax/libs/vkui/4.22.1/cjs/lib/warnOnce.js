"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnOnce = warnOnce;

function warnOnce(zone) {
  var didWarn = {};
  return function (message) {
    if (!didWarn[message]) {
      console.error("[VKUI/".concat(zone, "] ").concat(message));
      didWarn[message] = true;
    }
  };
}
//# sourceMappingURL=warnOnce.js.map