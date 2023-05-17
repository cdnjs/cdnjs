"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.easeInOutSine = easeInOutSine;
/**
 * ease function
 * @param x absolute progress of the animation in bounds 0 (beginning) and 1 (end)
 */
function easeInOutSine(x) {
  return 0.5 * (1 - Math.cos(Math.PI * x));
}
//# sourceMappingURL=fx.js.map