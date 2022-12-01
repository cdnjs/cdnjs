"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon12OnlineMobile = exports.Icon12Circle = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _excluded = ["width", "height"],
  _excluded2 = ["width", "height"];
var Icon12Circle = function Icon12Circle(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 12 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 12 : _ref$height,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(_icons.Icon12Circle, (0, _extends2.default)({}, restProps, {
    width: width >= 24 ? 15 : 12,
    height: height >= 24 ? 15 : 12
  }));
};
exports.Icon12Circle = Icon12Circle;
var Icon12OnlineMobile = function Icon12OnlineMobile(_ref2) {
  var _ref2$width = _ref2.width,
    width = _ref2$width === void 0 ? 8 : _ref2$width,
    _ref2$height = _ref2.height,
    height = _ref2$height === void 0 ? 12 : _ref2$height,
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  return /*#__PURE__*/React.createElement(_icons.Icon12OnlineMobile, (0, _extends2.default)({}, restProps, {
    width: width >= 24 ? 9 : 8,
    height: height >= 24 ? 15 : 12
  }));
};
exports.Icon12OnlineMobile = Icon12OnlineMobile;
//# sourceMappingURL=icons.js.map