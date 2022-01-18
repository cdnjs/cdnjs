"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spacing = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _excluded = ["size", "separator", "style"];

var Spacing = function Spacing(_ref) {
  var size = _ref.size,
      separator = _ref.separator,
      style = _ref.style,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platfrom = (0, _usePlatform.usePlatform)();
  var styles = (0, _objectSpread2.default)({
    height: size
  }, style);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    "aria-hidden": "true",
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Spacing', platfrom), {
      'Spacing--separator': !!separator,
      'Spacing--separator-center': separator === true || separator === 'center',
      'Spacing--separator-top': separator === 'top',
      'Spacing--separator-bottom': separator === 'bottom'
    }),
    style: styles
  }));
};

exports.Spacing = Spacing;
Spacing.defaultProps = {
  size: 8
};
//# sourceMappingURL=Spacing.js.map