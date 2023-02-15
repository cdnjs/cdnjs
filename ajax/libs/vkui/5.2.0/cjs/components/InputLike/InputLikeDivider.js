"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputLikeDivider = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["children", "className"];
var InputLikeDivider = function InputLikeDivider(_ref) {
  var children = _ref.children,
    className = _ref.className,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiInputLikeDivider", className)
  }, props), children);
};
exports.InputLikeDivider = InputLikeDivider;
//# sourceMappingURL=InputLikeDivider.js.map