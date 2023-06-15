"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tooltipContainerAttr = exports.TooltipContainer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _excluded = ["fixed"];
var tooltipContainerAttr = 'data-tooltip-container';
exports.tooltipContainerAttr = tooltipContainerAttr;
var TooltipContainer = /*#__PURE__*/React.forwardRef(function TooltipContainer(_ref, ref) {
  var _ref$fixed = _ref.fixed,
    fixed = _ref$fixed === void 0 ? false : _ref$fixed,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  props[tooltipContainerAttr] = fixed ? 'fixed' : 'true';
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, props, {
    ref: ref
  }));
});
exports.TooltipContainer = TooltipContainer;
//# sourceMappingURL=TooltipContainer.js.map