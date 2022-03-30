"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _callMultiple = require("../../lib/callMultiple");

var _usePlatform = require("../../hooks/usePlatform");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _VisuallyHiddenInput = require("../VisuallyHiddenInput/VisuallyHiddenInput");

var _useFocusVisible2 = require("../../hooks/useFocusVisible");

var _FocusVisible = require("../FocusVisible/FocusVisible");

var _excluded = ["style", "className", "getRootRef"];

var Switch = function Switch(_ref) {
  var style = _ref.style,
      className = _ref.className,
      getRootRef = _ref.getRootRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  var _useFocusVisible = (0, _useFocusVisible2.useFocusVisible)(),
      focusVisible = _useFocusVisible.focusVisible,
      onBlur = _useFocusVisible.onBlur,
      onFocus = _useFocusVisible.onFocus;

  return (0, _jsxRuntime.createScopedElement)("label", {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Switch", platform), "Switch--sizeY-".concat(sizeY), {
      "Switch--disabled": restProps.disabled,
      "Switch--focus-visible": focusVisible
    }),
    className: className,
    style: style,
    ref: getRootRef,
    role: "presentation"
  }, (0, _jsxRuntime.createScopedElement)(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    type: "checkbox",
    vkuiClass: "Switch__self",
    onBlur: (0, _callMultiple.callMultiple)(onBlur, restProps.onBlur),
    onFocus: (0, _callMultiple.callMultiple)(onFocus, restProps.onFocus)
  })), (0, _jsxRuntime.createScopedElement)("span", {
    role: "presentation",
    vkuiClass: "Switch__pseudo"
  }), (0, _jsxRuntime.createScopedElement)(_FocusVisible.FocusVisible, {
    mode: "outside"
  }));
};

exports.Switch = Switch;
//# sourceMappingURL=Switch.js.map