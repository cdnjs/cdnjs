"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footnote = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../../lib/classNames");

var _excluded = ["children", "weight", "caps", "Component"];

/**
 * @see https://vkcom.github.io/VKUI/#/Footnote
 */
var Footnote = function Footnote(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      caps = _ref.caps,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "span" : _ref$Component,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("Footnote", caps && "Footnote--caps", weight && "Footnote--w-".concat(weight))
  }), children);
};

exports.Footnote = Footnote;
//# sourceMappingURL=Footnote.js.map