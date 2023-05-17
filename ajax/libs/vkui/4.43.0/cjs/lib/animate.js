"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animate = animate;
var _dom = require("./dom");
function animate(_ref) {
  var duration = _ref.duration,
    timing = _ref.timing,
    draw = _ref.draw;
  if (!_dom.canUseDOM) {
    return;
  }
  var start = performance.now();
  requestAnimationFrame(function animate(time) {
    var timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    var progress = timing(timeFraction);
    draw(progress);
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
//# sourceMappingURL=animate.js.map