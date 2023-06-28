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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _dom = require("../lib/dom");
var _useGlobalEventListener = require("./useGlobalEventListener");
/**
 * Возвращает текущую ориентация экрана на человеческом языке.
 * Учитывает особенности API на разных платформах.
 */ function getOrientation(window) {
    var // eslint-disable-next-line compat/compat
    _window_screen, _window_screen_orientation;
    if (!window) {
        return "portrait";
    }
    var _window_screen_orientation_angle;
    var angle = Math.abs((_window_screen_orientation_angle = (_window_screen = window.screen) === null || _window_screen === void 0 ? void 0 : (_window_screen_orientation = _window_screen.orientation) === null || _window_screen_orientation === void 0 ? void 0 : _window_screen_orientation.angle) !== null && _window_screen_orientation_angle !== void 0 ? _window_screen_orientation_angle : Number(window.orientation));
    return angle === 90 ? "landscape" : "portrait";
}
function useOrientationChange() {
    var window = (0, _dom.useDOM)().window;
    var _React_useState = _slicedToArray(_react.useState(function() {
        return getOrientation(window);
    }), 2), orientation = _React_useState[0], setOrientation = _React_useState[1];
    (0, _useGlobalEventListener.useGlobalEventListener)(window, "orientationchange", function() {
        return setOrientation(getOrientation(window));
    });
    return orientation;
}

//# sourceMappingURL=useOrientationChange.js.map