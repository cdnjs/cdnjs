"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useFocusVisible", {
    enumerable: true,
    get: function() {
        return useFocusVisible;
    }
});
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = require("react");
var _appRootContext = require("../components/AppRoot/AppRootContext");
function useFocusVisible() {
    var _useState = _slicedToArray((0, _react.useState)(false), 2), isFocused = _useState[0], setIsFocused = _useState[1];
    var keyboardInput = (0, _react.useContext)(_appRootContext.AppRootContext).keyboardInput;
    var onFocus = (0, _react.useCallback)(function(event) {
        event.stopPropagation();
        setIsFocused(true);
    }, [
        setIsFocused
    ]);
    var onBlur = (0, _react.useCallback)(function(event) {
        event.stopPropagation();
        setIsFocused(false);
    }, [
        setIsFocused
    ]);
    var focusVisible = keyboardInput && isFocused;
    return {
        focusVisible: focusVisible,
        onFocus: onFocus,
        onBlur: onBlur
    };
}

//# sourceMappingURL=useFocusVisible.js.map