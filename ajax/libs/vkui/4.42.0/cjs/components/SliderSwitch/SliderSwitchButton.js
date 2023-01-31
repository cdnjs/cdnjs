"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderSwitchButton = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Tappable = require("../Tappable/Tappable");
var _getClassName = require("../../helpers/getClassName");
var _classNames = require("../../lib/classNames");
var _usePlatform = require("../../hooks/usePlatform");
var _Text = require("../Typography/Text/Text");
var _excluded = ["active", "hovered", "children", "getRootRef"];
/**
 * @deprecated Этот компонент устарел и будет удален в 5.0.0.
 */
var SliderSwitchButton = function SliderSwitchButton(_ref) {
  var active = _ref.active,
    hovered = _ref.hovered,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    focus = _React$useState2[0],
    setFocus = _React$useState2[1];
  var toggleFocus = function toggleFocus() {
    setFocus(!focus);
  };
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("SliderSwitch__button", platform), active && "SliderSwitch__button--active", !active && hovered && "SliderSwitch__button--hover", active && hovered && "SliderSwitch__button--activeHover", focus && !hovered && "SliderSwitch__button--focus"),
    Component: "button",
    type: "button",
    getRootRef: getRootRef,
    "aria-pressed": active,
    onFocus: toggleFocus,
    onBlur: toggleFocus,
    tabIndex: 0,
    hasActive: false,
    hoverMode: "opacity"
  }), (0, _jsxRuntime.createScopedElement)(_Text.Text, {
    weight: "2"
  }, children));
};
exports.SliderSwitchButton = SliderSwitchButton;
//# sourceMappingURL=SliderSwitchButton.js.map