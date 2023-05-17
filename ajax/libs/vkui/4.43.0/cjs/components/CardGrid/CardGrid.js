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
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _excluded = ["children", "size", "spaced", "sizeX"];
var CardGridComponent = function CardGridComponent(_ref) {
  var children = _ref.children,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "s" : _ref$size,
    _ref$spaced = _ref.spaced,
    spaced = _ref$spaced === void 0 ? false : _ref$spaced,
    sizeX = _ref.sizeX,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("CardGrid", spaced && "CardGrid--spaced", "CardGrid--".concat(size), "CardGrid--sizeX-".concat(sizeX) // TODO: v5 новая адаптивность
    )
  }), children);
};

/**
 * @see https://vkcom.github.io/VKUI/#/CardGrid
 */
var CardGrid = (0, _withAdaptivity.withAdaptivity)(CardGridComponent, {
  sizeX: true
});
exports.CardGrid = CardGrid;
CardGrid.displayName = "CardGrid"; // TODO: v5 remove
//# sourceMappingURL=CardGrid.js.map