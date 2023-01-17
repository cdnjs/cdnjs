"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spacing = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["size", "style", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */
var Spacing = function Spacing(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 8 : _ref$size,
    styleProp = _ref.style,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var style = (0, _objectSpread2.default)({
    height: size
  }, styleProp);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    "aria-hidden": true,
    className: (0, _vkjs.classNames)(className, "vkuiSpacing"),
    style: style
  }));
};
exports.Spacing = Spacing;
//# sourceMappingURL=Spacing.js.map