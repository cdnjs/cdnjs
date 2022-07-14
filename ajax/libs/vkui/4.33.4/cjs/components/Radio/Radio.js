"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radio = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("../../lib/jsxRuntime");

var _Tappable = require("../Tappable/Tappable");

var _classNames = require("../../lib/classNames");

var _platform = require("../../lib/platform");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _utils = require("../../lib/utils");

var _VisuallyHiddenInput = require("../VisuallyHiddenInput/VisuallyHiddenInput");

var _Caption = require("../Typography/Caption/Caption");

var _Headline = require("../Typography/Headline/Headline");

var _Text = require("../Typography/Text/Text");

var _excluded = ["children", "description", "style", "className", "getRootRef", "sizeY"];

var RadioIcon = function RadioIcon(props) {
  return (0, _jsxRuntime.createScopedElement)("svg", (0, _extends2.default)({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    "aria-hidden": true
  }, props), (0, _jsxRuntime.createScopedElement)("circle", {
    cx: "12",
    cy: "12",
    r: "11",
    stroke: "currentColor",
    strokeWidth: "2",
    fill: "none"
  }), (0, _jsxRuntime.createScopedElement)("circle", {
    cx: "12",
    cy: "12",
    r: "7.5",
    vkuiClass: "Radio__pin",
    fill: "currentColor"
  }));
};

var RadioComponent = function RadioComponent(props) {
  var children = props.children,
      description = props.description,
      style = props.style,
      className = props.className,
      getRootRef = props.getRootRef,
      sizeY = props.sizeY,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var RadioTypography = platform === _platform.VKCOM || sizeY === _withAdaptivity.SizeType.COMPACT ? _Text.Text : _Headline.Headline;
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, {
    Component: "label",
    style: style,
    className: className,
    vkuiClass: (0, _classNames.classNames)("Radio", "Radio--sizeY-".concat(sizeY)),
    activeEffectDelay: platform === _platform.IOS ? 100 : _Tappable.ACTIVE_EFFECT_DELAY,
    disabled: restProps.disabled,
    getRootRef: getRootRef
  }, (0, _jsxRuntime.createScopedElement)(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    vkuiClass: "Radio__input",
    type: "radio"
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Radio__container"
  }, (0, _jsxRuntime.createScopedElement)(RadioIcon, {
    vkuiClass: "Radio__icon"
  }), (0, _jsxRuntime.createScopedElement)(RadioTypography, {
    vkuiClass: "Radio__content",
    Component: "div"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Radio__children"
  }, children), (0, _utils.hasReactNode)(description) && (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
    vkuiClass: "Radio__description"
  }, description))));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Radio
 */


var Radio = (0, _withAdaptivity.withAdaptivity)(RadioComponent, {
  sizeY: true
});
exports.Radio = Radio;
//# sourceMappingURL=Radio.js.map