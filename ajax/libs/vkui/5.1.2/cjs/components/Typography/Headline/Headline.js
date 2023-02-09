"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Headline = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _useAdaptivity2 = require("../../../hooks/useAdaptivity");
var _vkjs = require("@vkontakte/vkjs");
var _warnOnce = require("../../../lib/warnOnce");
var _getSizeYClassName = require("../../../helpers/getSizeYClassName");
var _excluded = ["className", "children", "weight", "level", "Component", "getRootRef"];
var warn = (0, _warnOnce.warnOnce)('Headline');

/**
 * @see https://vkcom.github.io/VKUI/#/Headline
 */
var Headline = function Headline(_ref) {
  var className = _ref.className,
    children = _ref.children,
    _ref$weight = _ref.weight,
    weight = _ref$weight === void 0 ? '3' : _ref$weight,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? '1' : _ref$level,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'h4' : _ref$Component,
    getRootRef = _ref.getRootRef,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  if (process.env.NODE_ENV === 'development' && typeof Component !== 'string' && getRootRef) {
    warn('getRootRef может использоваться только с элементами DOM', 'error');
  }
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    className: (0, _vkjs.classNames)(className, "vkuiHeadline", (0, _getSizeYClassName.getSizeYClassName)("vkuiHeadline", sizeY), styles["Headline--level-".concat(level)], styles["Headline--weight-".concat(weight)])
  }), children);
};
exports.Headline = Headline;
var styles = {
  "Headline--level-1": "vkuiHeadline--level-1",
  "Headline--level-2": "vkuiHeadline--level-2",
  "Headline--weight-1": "vkuiHeadline--weight-1",
  "Headline--weight-2": "vkuiHeadline--weight-2",
  "Headline--weight-3": "vkuiHeadline--weight-3"
};
//# sourceMappingURL=Headline.js.map