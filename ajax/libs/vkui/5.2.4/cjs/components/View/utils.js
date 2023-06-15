"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swipeBackExcluded = swipeBackExcluded;
var swipeBackExcludedSelector = 'input, textarea, [data-vkui-swipe-back=false]';
function swipeBackExcluded(e) {
  var _target$closest;
  var target = e.originalEvent.target;
  // eslint-disable-next-line no-restricted-properties
  return Boolean(target === null || target === void 0 ? void 0 : (_target$closest = target.closest) === null || _target$closest === void 0 ? void 0 : _target$closest.call(target, swipeBackExcludedSelector));
}
//# sourceMappingURL=utils.js.map