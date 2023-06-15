"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["mode", "children", "getRootRef", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Card
 */
var Card = function Card(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'tint' : _ref$mode,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    className: (0, _vkjs.classNames)("vkuiCard", styles["Card--mode-".concat(mode)], className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCard__in"
  }, children));
};
exports.Card = Card;
var styles = {
  "Card--mode-shadow": "vkuiCard--mode-shadow",
  "Card--mode-outline": "vkuiCard--mode-outline",
  "Card--mode-tint": "vkuiCard--mode-tint"
};
//# sourceMappingURL=Card.js.map