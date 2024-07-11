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
const _react = require("react");
const _AppRootContext = require("../components/AppRoot/AppRootContext");
function useFocusVisible(withKeyboardInputCheck = true) {
    const [isFocused, setIsFocused] = (0, _react.useState)(false);
    const { keyboardInput } = (0, _react.useContext)(_AppRootContext.AppRootContext);
    const onFocus = (0, _react.useCallback)((event)=>{
        event.stopPropagation();
        setIsFocused(true);
    }, [
        setIsFocused
    ]);
    const onBlur = (0, _react.useCallback)((event)=>{
        event.stopPropagation();
        setIsFocused(false);
    }, [
        setIsFocused
    ]);
    const focusVisible = withKeyboardInputCheck ? keyboardInput && isFocused : isFocused;
    return {
        focusVisible,
        onFocus,
        onBlur
    };
}

//# sourceMappingURL=useFocusVisible.js.map