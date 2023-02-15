"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenSpinner = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Spinner = require("../Spinner/Spinner");
var _icons = require("@vkontakte/icons");
var _Icon48DoneOutline = require("./Icon48DoneOutline");
var _Icon48CancelCircle = require("./Icon48CancelCircle");
var _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["style", "className", "state", "size", "aria-label", "onClick"];
/**
 * @see https://vkcom.github.io/VKUI/#/ScreenSpinner
 */
var ScreenSpinner = function ScreenSpinner(_ref) {
  var style = _ref.style,
    className = _ref.className,
    _ref$state = _ref.state,
    state = _ref$state === void 0 ? 'loading' : _ref$state,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'large' : _ref$size,
    _ref$ariaLabel = _ref['aria-label'],
    ariaLabel = _ref$ariaLabel === void 0 ? 'Пожалуйста, подождите...' : _ref$ariaLabel,
    onClick = _ref.onClick,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var hideSpinner = state === 'done' || state === 'error';
  var Icon = {
    loading: function loading() {
      return null;
    },
    cancelable: _icons.Icon24Cancel,
    done: _Icon48DoneOutline.Icon48DoneOutline,
    error: _Icon48CancelCircle.Icon48CancelCircle
  }[state];
  (0, _ScrollContext.useScrollLock)();
  return /*#__PURE__*/React.createElement(_PopoutWrapper.PopoutWrapper, {
    hasMask: false,
    className: (0, _vkjs.classNames)("vkuiScreenSpinner", hideSpinner && "vkuiScreenSpinner--hideSpinner", styles["ScreenSpinner--state-".concat(state)], className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiScreenSpinner__container",
    onClick: onClick
  }, /*#__PURE__*/React.createElement(_Spinner.Spinner, (0, _extends2.default)({
    className: "vkuiScreenSpinner__spinner",
    size: size,
    "aria-label": ariaLabel
  }, restProps)), /*#__PURE__*/React.createElement("div", {
    className: "vkuiScreenSpinner__icon"
  }, /*#__PURE__*/React.createElement(Icon, null))));
};
exports.ScreenSpinner = ScreenSpinner;
var styles = {
  "ScreenSpinner--state-cancelable": "vkuiScreenSpinner--state-cancelable",
  "ScreenSpinner--state-done": "vkuiScreenSpinner--state-done",
  "ScreenSpinner--state-loading": "vkuiScreenSpinner--state-loading",
  "ScreenSpinner--state-error": "vkuiScreenSpinner--state-error"
};
//# sourceMappingURL=ScreenSpinner.js.map