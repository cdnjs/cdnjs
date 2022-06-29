"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenSpinner = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Spinner = require("../Spinner/Spinner");

var _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _ScrollContext = require("../AppRoot/ScrollContext");

var _excluded = ["style", "className", "size", "aria-label"];

/**
 * @see https://vkcom.github.io/VKUI/#/ScreenSpinner
 */
var ScreenSpinner = function ScreenSpinner(_ref) {
  var style = _ref.style,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "large" : _ref$size,
      _ref$ariaLabel = _ref["aria-label"],
      ariaLabel = _ref$ariaLabel === void 0 ? "Пожалуйста, подождите..." : _ref$ariaLabel,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  (0, _ScrollContext.useScrollLock)();
  return (0, _jsxRuntime.createScopedElement)(_PopoutWrapper.PopoutWrapper, {
    hasMask: false,
    vkuiClass: (0, _getClassName.getClassName)("ScreenSpinner", platform),
    className: className,
    style: style
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ScreenSpinner__container"
  }, (0, _jsxRuntime.createScopedElement)(_Spinner.Spinner, (0, _extends2.default)({
    vkuiClass: "ScreenSpinner__spinner",
    size: size,
    "aria-label": ariaLabel
  }, restProps))));
};

exports.ScreenSpinner = ScreenSpinner;
//# sourceMappingURL=ScreenSpinner.js.map