import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { useContext, useState, useCallback } from 'react';
import { AppRootContext } from '../components/AppRoot/AppRootContext';
export function useFocusVisible() {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isFocused = _useState2[0],
    setIsFocused = _useState2[1];
  var _useContext = useContext(AppRootContext),
    keyboardInput = _useContext.keyboardInput;
  var onFocus = useCallback(function (event) {
    event.stopPropagation();
    setIsFocused(true);
  }, [setIsFocused]);
  var onBlur = useCallback(function (event) {
    event.stopPropagation();
    setIsFocused(false);
  }, [setIsFocused]);
  var focusVisible = keyboardInput && isFocused;
  return {
    focusVisible: focusVisible,
    onFocus: onFocus,
    onBlur: onBlur
  };
}
//# sourceMappingURL=useFocusVisible.js.map