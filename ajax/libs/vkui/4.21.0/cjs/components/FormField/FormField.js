"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormField = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _excluded = ["Component", "children", "getRootRef", "after", "disabled"];

var FormField = function FormField(_ref) {
  var _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'div' : _ref$Component,
      children = _ref.children,
      getRootRef = _ref.getRootRef,
      after = _ref.after,
      disabled = _ref.disabled,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

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

  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({
    role: "presentation"
  }, restProps, {
    ref: getRootRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('FormField', platform), "FormField--sizeY-".concat(sizeY), {
      'FormField--disabled': disabled
    })
  }), children, (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("div", {
    role: "presentation",
    vkuiClass: "FormField__after"
  }, after), (0, _jsxRuntime.createScopedElement)("div", {
    role: "presentation",
    vkuiClass: (0, _classNames.classNames)('FormField__border', {
      'FormField__border--hover': !disabled && hover
    })
  }));
};

exports.FormField = FormField;
//# sourceMappingURL=FormField.js.map