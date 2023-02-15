"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clamp = void 0;
exports.precisionRound = precisionRound;
exports.rescale = rescale;
var clamp = function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
};
exports.clamp = clamp;
function precisionRound(number) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
function precision(number) {
  return ("".concat(number).split('.')[1] || '').length;
}
function decimatedClamp(val, min, max, step) {
  if (step == null || step <= 0) {
    return clamp(val, min, max);
  }
  var prec = precision(step);
  // Round value to nearest min + k1 * step
  var decimatedOffset = precisionRound(Math.round((val - min) / step) * step, prec);
  // Round range length _down_ to nearest min + k2 * step
  var decimatedRange = precisionRound(Math.floor((max - min) / step) * step, prec);
  return min + clamp(decimatedOffset, 0, decimatedRange);
}
function rescale(value, from, to) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var scaled = (value - from[0]) / (from[1] - from[0]) * (to[1] - to[0]) + to[0];
  return decimatedClamp(scaled, to[0], to[1], options.step);
}
//# sourceMappingURL=math.js.map