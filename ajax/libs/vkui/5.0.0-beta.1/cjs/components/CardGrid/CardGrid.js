"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardGrid = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _getSizeXClassName = require("../../helpers/getSizeXClassName");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _excluded = ["children", "size", "spaced"];

/**
 * @see https://vkcom.github.io/VKUI/#/CardGrid
 */
var CardGrid = function CardGrid(_ref) {
  var children = _ref.children,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "s" : _ref$size,
      _ref$spaced = _ref.spaced,
      spaced = _ref$spaced === void 0 ? false : _ref$spaced,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeX = _useAdaptivity.sizeX;

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("CardGrid", spaced && "CardGrid--spaced", "CardGrid--size-".concat(size), (0, _getSizeXClassName.getSizeXClassName)("CardGrid", sizeX))
  }), children);
};

exports.CardGrid = CardGrid;
//# sourceMappingURL=CardGrid.js.map