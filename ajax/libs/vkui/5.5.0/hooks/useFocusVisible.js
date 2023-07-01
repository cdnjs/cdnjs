import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { useCallback, useContext, useState } from "react";
import { AppRootContext } from "../components/AppRoot/AppRootContext";
export function useFocusVisible() {
    var withKeyboardInputCheck = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    var _useState = _sliced_to_array(useState(false), 2), isFocused = _useState[0], setIsFocused = _useState[1];
    var keyboardInput = useContext(AppRootContext).keyboardInput;
    var onFocus = useCallback(function(event) {
        event.stopPropagation();
        setIsFocused(true);
    }, [
        setIsFocused
    ]);
    var onBlur = useCallback(function(event) {
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