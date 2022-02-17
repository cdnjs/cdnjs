"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SegmentedControlOption = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _useFocusVisible2 = require("../../../hooks/useFocusVisible");

var _callMultiple = require("../../../lib/callMultiple");

var _classNames = require("../../../lib/classNames");

var _FocusVisible = require("../../FocusVisible/FocusVisible");

var _Text = _interopRequireDefault(require("../../Typography/Text/Text"));

var _VisuallyHiddenInput = require("../../VisuallyHiddenInput/VisuallyHiddenInput");

var _excluded = ["className", "style", "children"];

var SegmentedControlOption = function SegmentedControlOption(_ref) {
  var className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useFocusVisible = (0, _useFocusVisible2.useFocusVisible)(),
      focusVisible = _useFocusVisible.focusVisible,
      onBlur = _useFocusVisible.onBlur,
      onFocus = _useFocusVisible.onFocus;

  return (0, _jsxRuntime.createScopedElement)("label", {
    className: className,
    style: style,
    vkuiClass: (0, _classNames.classNames)("SegmentedControlOption", {
      "SegmentedControlOption--checked": restProps.checked,
      "SegmentedControlOption--focus-visible": focusVisible
    })
  }, (0, _jsxRuntime.createScopedElement)(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    type: "radio",
    onBlur: (0, _callMultiple.callMultiple)(onBlur, restProps.onBlur),
    onFocus: (0, _callMultiple.callMultiple)(onFocus, restProps.onFocus)
  })), (0, _jsxRuntime.createScopedElement)(_Text.default, {
    vkuiClass: "SegmentedControlOption__content",
    weight: "medium"
  }, children), (0, _jsxRuntime.createScopedElement)(_FocusVisible.FocusVisible, {
    mode: "inside"
  }));
};

exports.SegmentedControlOption = SegmentedControlOption;
//# sourceMappingURL=SegmentedControlOption.js.map