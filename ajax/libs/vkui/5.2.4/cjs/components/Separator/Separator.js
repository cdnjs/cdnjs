"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Separator = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["wide", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */
var Separator = function Separator(_ref) {
  var wide = _ref.wide,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    "aria-hidden": true,
    className: (0, _vkjs.classNames)("vkuiSeparator", !wide && "vkuiSeparator--padded", className),
    role: "separator"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiSeparator__in"
  }));
};
exports.Separator = Separator;
//# sourceMappingURL=Separator.js.map