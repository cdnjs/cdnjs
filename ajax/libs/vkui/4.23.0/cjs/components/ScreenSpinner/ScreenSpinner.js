"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Spinner = _interopRequireDefault(require("../Spinner/Spinner"));

var _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["style", "className"];

var ScreenSpinner = function ScreenSpinner(props) {
  var style = props.style,
      className = props.className,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_PopoutWrapper.PopoutWrapper, {
    hasMask: false,
    vkuiClass: (0, _getClassName.getClassName)('ScreenSpinner', platform),
    className: className,
    style: style
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ScreenSpinner__container"
  }, (0, _jsxRuntime.createScopedElement)(_Spinner.default, (0, _extends2.default)({
    vkuiClass: "ScreenSpinner__spinner"
  }, restProps))));
};

ScreenSpinner.defaultProps = {
  'size': 'large',
  'aria-label': 'Пожалуйста, подождите...'
};
var _default = ScreenSpinner;
exports.default = _default;
//# sourceMappingURL=ScreenSpinner.js.map