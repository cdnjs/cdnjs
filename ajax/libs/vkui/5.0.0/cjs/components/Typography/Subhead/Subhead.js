"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subhead = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../../lib/classNames");

var _useAdaptivity2 = require("../../../hooks/useAdaptivity");

var _getSizeYClassName = require("../../../helpers/getSizeYClassName");

var _excluded = ["children", "weight", "Component"];

/**
 * @see https://vkcom.github.io/VKUI/#/Subhead
 */
var Subhead = function Subhead(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "h5" : _ref$Component,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("Subhead", (0, _getSizeYClassName.getSizeYClassName)("Subhead", sizeY), weight && "Subhead--weight-".concat(weight))
  }), children);
};

exports.Subhead = Subhead;
//# sourceMappingURL=Subhead.js.map