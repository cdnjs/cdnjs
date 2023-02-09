"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopperArrow = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["className"];
var PopperArrow = function PopperArrow(_ref) {
  var style = _ref.style,
    attributes = _ref.attributes,
    arrowClassName = _ref.arrowClassName;
  var _ref2 = attributes !== null && attributes !== void 0 ? attributes : {},
    arrowWrapperClassName = _ref2.className,
    restAttributes = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    style: style
  }, restAttributes, {
    className: (0, _vkjs.classNames)("vkuiPopperArrow", arrowWrapperClassName),
    "data-popper-arrow": true
  }), /*#__PURE__*/React.createElement("svg", {
    className: (0, _vkjs.classNames)("vkuiPopperArrow__in", arrowClassName),
    width: "20",
    height: "8",
    viewBox: "0 0 20 8",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10 0C13 0 15.9999 8 20 8H0C3.9749 8 7 0 10 0Z",
    fill: "currentColor"
  })));
};
exports.PopperArrow = PopperArrow;
//# sourceMappingURL=PopperArrow.js.map