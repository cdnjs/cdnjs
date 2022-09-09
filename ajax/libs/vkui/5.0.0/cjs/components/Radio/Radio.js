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

var _utils = require("../../lib/utils");

var _VisuallyHiddenInput = require("../VisuallyHiddenInput/VisuallyHiddenInput");

var _Footnote = require("../Typography/Footnote/Footnote");

var _getSizeYClassName = require("../../helpers/getSizeYClassName");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _excluded = ["children", "description", "style", "className", "getRootRef"];

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

/**
 * @see https://vkcom.github.io/VKUI/#/Radio
 */
var Radio = function Radio(_ref) {
  var children = _ref.children,
      description = _ref.description,
      style = _ref.style,
      className = _ref.className,
      getRootRef = _ref.getRootRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, {
    Component: "label",
    style: style,
    className: className,
    vkuiClass: (0, _classNames.classNames)("Radio", (0, _getSizeYClassName.getSizeYClassName)("Radio", sizeY)),
    activeEffectDelay: platform === _platform.Platform.IOS ? 100 : _Tappable.ACTIVE_EFFECT_DELAY,
    disabled: restProps.disabled,
    getRootRef: getRootRef
  }, (0, _jsxRuntime.createScopedElement)(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    vkuiClass: "Radio__input",
    type: "radio"
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Radio__container"
  }, (0, _jsxRuntime.createScopedElement)(RadioIcon, {
    vkuiClass: "Radio__icon"
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Radio__content"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Radio__children"
  }, children), (0, _utils.hasReactNode)(description) && (0, _jsxRuntime.createScopedElement)(_Footnote.Footnote, {
    vkuiClass: "Radio__description"
  }, description))));
};

exports.Radio = Radio;
//# sourceMappingURL=Radio.js.map