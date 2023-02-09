"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormField = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _excluded = ["Component", "status", "children", "getRootRef", "before", "after", "disabled", "mode", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/FormField
 */
var FormField = function FormField(_ref) {
  var _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'div' : _ref$Component,
    _ref$status = _ref.status,
    status = _ref$status === void 0 ? 'default' : _ref$status,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    before = _ref.before,
    after = _ref.after,
    disabled = _ref.disabled,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'default' : _ref$mode,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    hover = _React$useState2[0],
    setHover = _React$useState2[1];
  var handleMouseEnter = function handleMouseEnter(e) {
    e.stopPropagation();
    setHover(true);
  };
  var handleMouseLeave = function handleMouseLeave(e) {
    e.stopPropagation();
    setHover(false);
  };
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    role: "presentation"
  }, restProps, {
    ref: getRootRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: (0, _vkjs.classNames)("vkuiFormField", styles["FormField--mode-".concat(mode)], styles["FormField--status-".concat(status)], (0, _getSizeYClassName.getSizeYClassName)("vkuiFormField", sizeY), disabled && "vkuiFormField--disabled", !disabled && hover && "vkuiFormField--hover", className)
  }), before && /*#__PURE__*/React.createElement("div", {
    role: "presentation",
    className: "vkuiFormField__before"
  }, before), children, after && /*#__PURE__*/React.createElement("div", {
    role: "presentation",
    className: "vkuiFormField__after"
  }, after), /*#__PURE__*/React.createElement("div", {
    role: "presentation",
    className: "vkuiFormField__border"
  }));
};
exports.FormField = FormField;
var styles = {
  "FormField--mode-default": "vkuiFormField--mode-default",
  "FormField--mode-plain": "vkuiFormField--mode-plain",
  "FormField--status-error": "vkuiFormField--status-error",
  "FormField--status-valid": "vkuiFormField--status-valid",
  "FormField--status-default": "vkuiFormField--status-default"
};
//# sourceMappingURL=FormField.js.map