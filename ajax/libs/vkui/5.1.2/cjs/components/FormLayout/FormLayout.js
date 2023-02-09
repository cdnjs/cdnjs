"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormLayout = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["children", "Component", "getRef", "onSubmit", "className"];
var preventDefault = function preventDefault(e) {
  return e.preventDefault();
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayout
 */
var FormLayout = function FormLayout(_ref) {
  var children = _ref.children,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'form' : _ref$Component,
    getRef = _ref.getRef,
    _ref$onSubmit = _ref.onSubmit,
    onSubmit = _ref$onSubmit === void 0 ? preventDefault : _ref$onSubmit,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiFormLayout", className),
    onSubmit: onSubmit,
    ref: getRef
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiFormLayout__container"
  }, children), Component === 'form' && /*#__PURE__*/React.createElement("input", {
    type: "submit",
    className: "vkuiFormLayout__submit",
    value: ""
  }));
};
exports.FormLayout = FormLayout;
//# sourceMappingURL=FormLayout.js.map