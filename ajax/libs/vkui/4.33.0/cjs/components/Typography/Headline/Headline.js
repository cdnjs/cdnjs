"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Headline = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _usePlatform = require("../../../hooks/usePlatform");

var _useAdaptivity2 = require("../../../hooks/useAdaptivity");

var _classNames = require("../../../lib/classNames");

var _getClassName = require("../../../helpers/getClassName");

var _excluded = ["children", "weight", "level", "Component"];

/**
 * @see https://vkcom.github.io/VKUI/#/Headline
 */
var Headline = function Headline(_ref) {
  var children = _ref.children,
      _ref$weight = _ref.weight,
      weight = _ref$weight === void 0 ? "3" : _ref$weight,
      _ref$level = _ref.level,
      level = _ref$level === void 0 ? "1" : _ref$level,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "h3" : _ref$Component,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Headline", platform), // TODO: v5 remove
    "Headline--sizeY-".concat(sizeY), // TODO: новая адаптивность
    "Headline--l-".concat(level), "Headline--w-".concat(weight))
  }), children);
};

exports.Headline = Headline;
//# sourceMappingURL=Headline.js.map