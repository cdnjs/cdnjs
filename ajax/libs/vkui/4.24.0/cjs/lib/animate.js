"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = animate;

var _vkjs = require("@vkontakte/vkjs");

function animate(_ref) {
  var duration = _ref.duration,
      timing = _ref.timing,
      draw = _ref.draw;

  if (!_vkjs.canUseDOM) {
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