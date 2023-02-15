"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radio = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _Tappable = require("../Tappable/Tappable");
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../lib/platform");
var _usePlatform = require("../../hooks/usePlatform");
var _VisuallyHiddenInput = require("../VisuallyHiddenInput/VisuallyHiddenInput");
var _Footnote = require("../Typography/Footnote/Footnote");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _excluded = ["children", "description", "style", "className", "getRootRef"];
var RadioIcon = function RadioIcon(props) {
  return /*#__PURE__*/React.createElement("svg", (0, _extends2.default)({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    "aria-hidden": true
  }, props), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "11",
    stroke: "currentColor",
    strokeWidth: "2",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "7.5",
    className: "vkuiRadio__pin",
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
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, {
    Component: "label",
    style: style,
    className: (0, _vkjs.classNames)("vkuiRadio", (0, _getSizeYClassName.getSizeYClassName)("vkuiRadio", sizeY), className),
    activeEffectDelay: platform === _platform.Platform.IOS ? 100 : _Tappable.ACTIVE_EFFECT_DELAY,
    disabled: restProps.disabled,
    getRootRef: getRootRef
  }, /*#__PURE__*/React.createElement(_VisuallyHiddenInput.VisuallyHiddenInput, (0, _extends2.default)({}, restProps, {
    className: "vkuiRadio__input",
    type: "radio"
  })), /*#__PURE__*/React.createElement("div", {
    className: "vkuiRadio__container"
  }, /*#__PURE__*/React.createElement(RadioIcon, {
    className: "vkuiRadio__icon"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiRadio__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiRadio__children"
  }, children), (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiRadio__description"
  }, description))));
};
exports.Radio = Radio;
//# sourceMappingURL=Radio.js.map