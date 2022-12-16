"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFocusVisible = useFocusVisible;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _AppRootContext = require("../components/AppRoot/AppRootContext");
function useFocusVisible() {
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isFocused = _useState2[0],
    setIsFocused = _useState2[1];
  var _useContext = (0, _react.useContext)(_AppRootContext.AppRootContext),
    keyboardInput = _useContext.keyboardInput;
  var onFocus = (0, _react.useCallback)(function (event) {
    event.stopPropagation();
    setIsFocused(true);
  }, [setIsFocused]);
  var onBlur = (0, _react.useCallback)(function (event) {
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