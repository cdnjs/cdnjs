"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _useFocusVisible2 = require("../../hooks/useFocusVisible");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _callMultiple = require("../../lib/callMultiple");
var _FocusVisible = require("../FocusVisible/FocusVisible");
var _VisuallyHiddenInput = require("../VisuallyHiddenInput/VisuallyHiddenInput");
var _excluded = ["style", "className", "getRootRef"];
var sizeYClassNames = (0, _defineProperty2.default)({
  none: "vkuiSwitch--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSwitch--sizeY-compact");
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
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  var _useFocusVisible = (0, _useFocusVisible2.useFocusVisible)(),
    focusVisible = _useFocusVisible.focusVisible,
    onBlur = _useFocusVisible.onBlur,
    onFocus = _useFocusVisible.onFocus;
  return /*#__PURE__*/React.createElement("label", {
    className: (0, _vkjs.classNames)("vkuiSwitch", (0, _getPlatformClassName.getPlatformClassName)("vkuiSwitch", platform), sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], restProps.disabled && "vkuiSwitch--disabled", focusVisible && "vkuiSwitch--focus-visible", className),
    style: style,
    ref: getRootRef
  }, /*#__PURE__*/React.createElement(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    type: "checkbox",
    className: "vkuiSwitch__self",
    onBlur: (0, _callMultiple.callMultiple)(onBlur, restProps.onBlur),
    onFocus: (0, _callMultiple.callMultiple)(onFocus, restProps.onFocus)
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    className: "vkuiSwitch__pseudo"
  }), /*#__PURE__*/React.createElement(_FocusVisible.FocusVisible, {
    mode: "outside"
  }));
};
exports.Switch = Switch;
//# sourceMappingURL=Switch.js.map