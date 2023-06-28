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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var useBooleanState = function() {
    var defaultValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var _React_useState = _slicedToArray(_react.useState(defaultValue), 2), value = _React_useState[0], setValue = _React_useState[1];
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