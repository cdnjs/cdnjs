"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardGrid = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _excluded = ["children", "size", "spaced", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/CardGrid
 */
var CardGrid = function CardGrid(_ref) {
  var children = _ref.children,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 's' : _ref$size,
    _ref$spaced = _ref.spaced,
    spaced = _ref$spaced === void 0 ? false : _ref$spaced,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeX = _useAdaptivity.sizeX;
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiCardGrid", spaced && "vkuiCardGrid--spaced", styles["CardGrid--size-".concat(size)], (0, _getSizeXClassName.getSizeXClassName)("vkuiCardGrid", sizeX), className)
  }), children);
};
exports.CardGrid = CardGrid;
var styles = {
  "CardGrid--size-l": "vkuiCardGrid--size-l",
  "CardGrid--size-m": "vkuiCardGrid--size-m",
  "CardGrid--size-s": "vkuiCardGrid--size-s"
};
//# sourceMappingURL=CardGrid.js.map