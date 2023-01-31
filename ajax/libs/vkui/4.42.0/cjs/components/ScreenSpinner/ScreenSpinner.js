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
var _icons = require("@vkontakte/icons");
var _Icon48DoneOutline = require("./Icon48DoneOutline");
var _Icon48CancelCircle = require("./Icon48CancelCircle");
var _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _classNames = require("../../lib/classNames");
var _excluded = ["style", "className", "state", "size", "aria-label", "onClick"];
/**
 * @see https://vkcom.github.io/VKUI/#/ScreenSpinner
 */
var ScreenSpinner = function ScreenSpinner(_ref) {
  var style = _ref.style,
    className = _ref.className,
    _ref$state = _ref.state,
    state = _ref$state === void 0 ? "loading" : _ref$state,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "large" : _ref$size,
    _ref$ariaLabel = _ref["aria-label"],
    ariaLabel = _ref$ariaLabel === void 0 ? "Пожалуйста, подождите..." : _ref$ariaLabel,
    onClick = _ref.onClick,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var hideSpinner = state === "done" || state === "error";
  var Icon = {
    loading: function loading() {
      return null;
    },
    cancelable: _icons.Icon24Cancel,
    done: _Icon48DoneOutline.Icon48DoneOutline,
    error: _Icon48CancelCircle.Icon48CancelCircle
  }[state];
  (0, _ScrollContext.useScrollLock)();
  return (0, _jsxRuntime.createScopedElement)(_PopoutWrapper.PopoutWrapper, {
    hasMask: false,
    vkuiClass: (0, _classNames.classNames)("ScreenSpinner", hideSpinner && "ScreenSpinner--hideSpinner", "ScreenSpinner--state-".concat(state)),
    className: className,
    style: style
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ScreenSpinner__container",
    onClick: onClick
  }, (0, _jsxRuntime.createScopedElement)(_Spinner.Spinner, (0, _extends2.default)({
    vkuiClass: "ScreenSpinner__spinner",
    size: size,
    "aria-label": ariaLabel
  }, restProps)), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ScreenSpinner__icon"
  }, (0, _jsxRuntime.createScopedElement)(Icon, {
    "aria-hidden": true
  }))));
};
exports.ScreenSpinner = ScreenSpinner;
//# sourceMappingURL=ScreenSpinner.js.map