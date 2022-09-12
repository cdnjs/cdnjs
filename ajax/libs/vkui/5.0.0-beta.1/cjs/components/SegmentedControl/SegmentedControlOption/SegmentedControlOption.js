"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SegmentedControlOption = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _useAdaptivity2 = require("../../../hooks/useAdaptivity");

var _useFocusVisible2 = require("../../../hooks/useFocusVisible");

var _callMultiple = require("../../../lib/callMultiple");

var _classNames = require("../../../lib/classNames");

var _FocusVisible = require("../../FocusVisible/FocusVisible");

var _VisuallyHiddenInput = require("../../VisuallyHiddenInput/VisuallyHiddenInput");

var _getSizeYClassName = require("../../../helpers/getSizeYClassName");

var _excluded = ["className", "style", "children"];

/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */
var SegmentedControlOption = function SegmentedControlOption(_ref) {
  var className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useFocusVisible = (0, _useFocusVisible2.useFocusVisible)(),
      focusVisible = _useFocusVisible.focusVisible,
      onBlur = _useFocusVisible.onBlur,
      onFocus = _useFocusVisible.onFocus;

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  return (0, _jsxRuntime.createScopedElement)("label", {
    className: className,
    style: style,
    vkuiClass: (0, _classNames.classNames)("SegmentedControlOption", restProps.checked && "SegmentedControlOption--checked", focusVisible && "SegmentedControlOption--focus-visible")
  }, (0, _jsxRuntime.createScopedElement)(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    type: "radio",
    onBlur: (0, _callMultiple.callMultiple)(onBlur, restProps.onBlur),
    onFocus: (0, _callMultiple.callMultiple)(onFocus, restProps.onFocus)
  })), (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: (0, _classNames.classNames)("SegmentedControlOption__content", (0, _getSizeYClassName.getSizeYClassName)("SegmentedControlOption__content", sizeY))
  }, children), (0, _jsxRuntime.createScopedElement)(_FocusVisible.FocusVisible, {
    mode: "inside"
  }));
};

exports.SegmentedControlOption = SegmentedControlOption;
//# sourceMappingURL=SegmentedControlOption.js.map