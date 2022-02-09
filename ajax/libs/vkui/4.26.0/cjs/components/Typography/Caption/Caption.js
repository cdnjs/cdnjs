"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _usePlatform = require("../../../hooks/usePlatform");

var _classNames = require("../../../lib/classNames");

var _getClassName = require("../../../helpers/getClassName");

var _excluded = ["children", "weight", "level", "caps", "Component"];

var Caption = function Caption(_ref) {
  var children = _ref.children,
      _ref$weight = _ref.weight,
      weight = _ref$weight === void 0 ? "regular" : _ref$weight,
      _ref$level = _ref.level,
      level = _ref$level === void 0 ? "1" : _ref$level,
      caps = _ref.caps,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "span" : _ref$Component,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Caption", platform), "Caption--w-".concat(weight), "Caption--l-".concat(level), {
      "Caption--caps": caps
    })
  }), children);
}; // eslint-disable-next-line import/no-default-export


var _default = Caption;
exports.default = _default;
//# sourceMappingURL=Caption.js.map