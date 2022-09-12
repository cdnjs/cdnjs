"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Title = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../../lib/classNames");

var _excluded = ["children", "weight", "level", "Component"];

/**
 * @see https://vkcom.github.io/VKUI/#/Title
 */
var Title = function Title(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      _ref$level = _ref.level,
      level = _ref$level === void 0 ? "1" : _ref$level,
      Component = _ref.Component,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  if (!Component) {
    Component = "h" + level;
  }

  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("Title", "Title--level-".concat(level), weight && "Title--weight-".concat(weight))
  }), children);
};

exports.Title = Title;
//# sourceMappingURL=Title.js.map