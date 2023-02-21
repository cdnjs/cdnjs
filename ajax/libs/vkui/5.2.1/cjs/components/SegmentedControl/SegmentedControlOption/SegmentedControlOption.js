"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SegmentedControlOption = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity2 = require("../../../hooks/useAdaptivity");
var _useFocusVisible2 = require("../../../hooks/useFocusVisible");
var _adaptivity = require("../../../lib/adaptivity");
var _callMultiple = require("../../../lib/callMultiple");
var _FocusVisible = require("../../FocusVisible/FocusVisible");
var _VisuallyHiddenInput = require("../../VisuallyHiddenInput/VisuallyHiddenInput");
var _excluded = ["className", "style", "children"];
var sizeYClassNames = (0, _defineProperty2.default)({
  none: "vkuiSegmentedControlOption__content--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSegmentedControlOption__content--sizeY-compact");

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
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  return /*#__PURE__*/React.createElement("label", {
    className: (0, _vkjs.classNames)("vkuiSegmentedControlOption", restProps.checked && "vkuiSegmentedControlOption--checked", focusVisible && "vkuiSegmentedControlOption--focus-visible", className),
    style: style
  }, /*#__PURE__*/React.createElement(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    type: "radio",
    onBlur: (0, _callMultiple.callMultiple)(onBlur, restProps.onBlur),
    onFocus: (0, _callMultiple.callMultiple)(onFocus, restProps.onFocus)
  })), /*#__PURE__*/React.createElement("span", {
    className: (0, _vkjs.classNames)("vkuiSegmentedControlOption__content", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY])
  }, children), /*#__PURE__*/React.createElement(_FocusVisible.FocusVisible, {
    mode: "inside"
  }));
};
exports.SegmentedControlOption = SegmentedControlOption;
//# sourceMappingURL=SegmentedControlOption.js.map