import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from 'react';
import { useDOM } from '../lib/dom';
import { useGlobalEventListener } from './useGlobalEventListener';
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
export function useOrientationChange() {
  var _useDOM = useDOM(),
    window = _useDOM.window;
  var _React$useState = React.useState(function () {
      return getOrientation(window);
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    orientation = _React$useState2[0],
    setOrientation = _React$useState2[1];
  useGlobalEventListener(window, 'orientationchange', function () {
    return setOrientation(getOrientation(window));
  });
  return orientation;
}
//# sourceMappingURL=useOrientationChange.js.map