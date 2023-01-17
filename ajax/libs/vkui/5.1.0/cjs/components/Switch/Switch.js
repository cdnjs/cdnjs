"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _vkjs = require("@vkontakte/vkjs");
var _callMultiple = require("../../lib/callMultiple");
var _usePlatform = require("../../hooks/usePlatform");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _VisuallyHiddenInput = require("../VisuallyHiddenInput/VisuallyHiddenInput");
var _useFocusVisible2 = require("../../hooks/useFocusVisible");
var _FocusVisible = require("../FocusVisible/FocusVisible");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _excluded = ["style", "className", "getRootRef"];
/**
 * @see https://vkcom.github.io/VKUI/#/Switch
 */
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
  return /*#__PURE__*/React.createElement("label", {
    className: (0, _vkjs.classNames)("vkuiSwitch", (0, _getPlatformClassName.getPlatformClassName)("vkuiSwitch", platform), (0, _getSizeYClassName.getSizeYClassName)("vkuiSwitch", sizeY), restProps.disabled && "vkuiSwitch--disabled", focusVisible && "vkuiSwitch--focus-visible", className),
    style: style,
    ref: getRootRef,
    role: "presentation"
  }, /*#__PURE__*/React.createElement(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    type: "checkbox",
    className: "vkuiSwitch__self",
    onBlur: (0, _callMultiple.callMultiple)(onBlur, restProps.onBlur),
    onFocus: (0, _callMultiple.callMultiple)(onFocus, restProps.onFocus)
  })), /*#__PURE__*/React.createElement("span", {
    role: "presentation",
    className: "vkuiSwitch__pseudo"
  }), /*#__PURE__*/React.createElement(_FocusVisible.FocusVisible, {
    mode: "outside"
  }));
};
exports.Switch = Switch;
//# sourceMappingURL=Switch.js.map