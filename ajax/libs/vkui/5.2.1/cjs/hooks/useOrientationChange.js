"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOrientationChange = useOrientationChange;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _dom = require("../lib/dom");
var _useGlobalEventListener = require("./useGlobalEventListener");
/**
 * Возвращает текущую ориентация экрана на человеческом языке.
 * Учитывает особенности API на разных платформах.
 */
function getOrientation(window) {
  var _window$screen$orient, _window$screen, _window$screen$orient2;
  if (!window) {
    return 'portrait';
  }
  var angle = Math.abs( // eslint-disable-next-line compat/compat
  (_window$screen$orient = (_window$screen = window.screen) === null || _window$screen === void 0 ? void 0 : (_window$screen$orient2 = _window$screen.orientation) === null || _window$screen$orient2 === void 0 ? void 0 : _window$screen$orient2.angle) !== null && _window$screen$orient !== void 0 ? _window$screen$orient : Number(window.orientation));
  return angle === 90 ? 'landscape' : 'portrait';
}

/**
 * Возвращает текущую ориентация экрана на человеческом языке.
 * Обновляется при изменении ориентации.
 */
function useOrientationChange() {
  var _useDOM = (0, _dom.useDOM)(),
    window = _useDOM.window;
  var _React$useState = React.useState(function () {
      return getOrientation(window);
    }),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    orientation = _React$useState2[0],
    setOrientation = _React$useState2[1];
  (0, _useGlobalEventListener.useGlobalEventListener)(window, 'orientationchange', function () {
    return setOrientation(getOrientation(window));
  });
  return orientation;
}
//# sourceMappingURL=useOrientationChange.js.map