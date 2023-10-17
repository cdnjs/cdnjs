"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useBooleanState", {
    enumerable: true,
    get: function() {
        return useBooleanState;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var useBooleanState = function() {
    var defaultValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _React_useState = _sliced_to_array._(_react.useState(defaultValue), 2), value = _React_useState[0], setValue = _React_useState[1];
    var setTrue = _react.useCallback(function() {
        setValue(true);
    }, []);
    var setFalse = _react.useCallback(function() {
        setValue(false);
    }, []);
    var toggle = _react.useCallback(function() {
        setValue(!value);
    }, [
        value
    ]);
    return {
        value: value,
        setTrue: setTrue,
        setFalse: setFalse,
        toggle: toggle
    };
};

//# sourceMappingURL=useBooleanState.js.map