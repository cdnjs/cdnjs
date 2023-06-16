import _sliced_to_array from "@swc/helpers/src/_sliced_to_array.mjs";
import { useCallback, useContext, useState } from "react";
import { AppRootContext } from "../components/AppRoot/AppRootContext";
export function useFocusVisible() {
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
    var focusVisible = keyboardInput && isFocused;
    return {
        focusVisible: focusVisible,
        onFocus: onFocus,
        onBlur: onBlur
    };
}

//# sourceMappingURL=useFocusVisible.js.map