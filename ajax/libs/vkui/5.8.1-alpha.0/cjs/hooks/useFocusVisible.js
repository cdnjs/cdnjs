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
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = require("react");
var _AppRootContext = require("../components/AppRoot/AppRootContext");
function useFocusVisible() {
    var withKeyboardInputCheck = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    var _useState = _sliced_to_array._((0, _react.useState)(false), 2), isFocused = _useState[0], setIsFocused = _useState[1];
    var keyboardInput = (0, _react.useContext)(_AppRootContext.AppRootContext).keyboardInput;
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
    var focusVisible = withKeyboardInputCheck ? keyboardInput && isFocused : isFocused;
    return {
        focusVisible: focusVisible,
        onFocus: onFocus,
        onBlur: onBlur
    };
}

//# sourceMappingURL=useFocusVisible.js.map