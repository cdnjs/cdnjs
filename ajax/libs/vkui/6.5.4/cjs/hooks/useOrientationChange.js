"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useOrientationChange", {
    enumerable: true,
    get: function() {
        return useOrientationChange;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _dom = require("../lib/dom");
const _useGlobalEventListener = require("./useGlobalEventListener");
/**
 * Возвращает текущую ориентация экрана на человеческом языке.
 * Учитывает особенности API на разных платформах.
 */ function getOrientation(window) {
    var // eslint-disable-next-line compat/compat
    _window_screen_orientation, _window_screen;
    if (!window) {
        return 'portrait';
    }
    var _window_screen_orientation_angle;
    const angle = Math.abs((_window_screen_orientation_angle = (_window_screen = window.screen) === null || _window_screen === void 0 ? void 0 : (_window_screen_orientation = _window_screen.orientation) === null || _window_screen_orientation === void 0 ? void 0 : _window_screen_orientation.angle) !== null && _window_screen_orientation_angle !== void 0 ? _window_screen_orientation_angle : Number(window.orientation));
    return angle === 90 ? 'landscape' : 'portrait';
}
function useOrientationChange() {
    const { window } = (0, _dom.useDOM)();
    const [orientation, setOrientation] = _react.useState(()=>getOrientation(window));
    (0, _useGlobalEventListener.useGlobalEventListener)(window, 'orientationchange', ()=>setOrientation(getOrientation(window)));
    return orientation;
}

//# sourceMappingURL=useOrientationChange.js.map