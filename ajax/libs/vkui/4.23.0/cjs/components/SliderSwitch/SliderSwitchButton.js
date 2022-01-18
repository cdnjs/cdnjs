"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _getClassName = require("../../helpers/getClassName");

var _classNames2 = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _excluded = ["active", "hovered", "children", "getRootRef"];

var SliderSwitchButton = function SliderSwitchButton(props) {
  var _classNames;

  var active = props.active,
      hovered = props.hovered,
      children = props.children,
      getRootRef = props.getRootRef,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      focus = _React$useState2[0],
      setFocus = _React$useState2[1];

  var toggleFocus = function toggleFocus() {
    setFocus(!focus);
  };

  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames2.classNames)((0, _getClassName.getClassName)('SliderSwitch__button', platform), (_classNames = {}, (0, _defineProperty2.default)(_classNames, 'SliderSwitch__button--active', active), (0, _defineProperty2.default)(_classNames, 'SliderSwitch__button--hover', !active && hovered), (0, _defineProperty2.default)(_classNames, 'SliderSwitch__button--activeHover', active && hovered), (0, _defineProperty2.default)(_classNames, 'SliderSwitch__button--focus', focus && !hovered), _classNames)),
    Component: "button",
    type: "button",
    getRootRef: getRootRef,
    "aria-pressed": active,
    onFocus: toggleFocus,
    onBlur: toggleFocus,
    tabIndex: 0,
    hasActive: false,
    hoverMode: "opacity"
  }), (0, _jsxRuntime.createScopedElement)(_Text.default, {
    weight: "medium"
  }, children));
};

var _default = SliderSwitchButton;
exports.default = _default;
//# sourceMappingURL=SliderSwitchButton.js.map