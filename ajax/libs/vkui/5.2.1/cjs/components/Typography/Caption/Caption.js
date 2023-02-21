"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Caption = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["className", "children", "weight", "level", "caps", "Component"];
/**
 * @see https://vkcom.github.io/VKUI/#/Caption
 */
var Caption = function Caption(_ref) {
  var className = _ref.className,
    children = _ref.children,
    weight = _ref.weight,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? '1' : _ref$level,
    caps = _ref.caps,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'span' : _ref$Component,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)(className, "vkuiCaption", styles["Caption--level-".concat(level)], caps && "vkuiCaption--caps", weight && styles["Caption--weight-".concat(weight)])
  }), children);
};
exports.Caption = Caption;
var styles = {
  "Caption--level-1": "vkuiCaption--level-1",
  "Caption--level-2": "vkuiCaption--level-2",
  "Caption--level-3": "vkuiCaption--level-3",
  "Caption--weight-1": "vkuiCaption--weight-1",
  "Caption--weight-2": "vkuiCaption--weight-2",
  "Caption--weight-3": "vkuiCaption--weight-3"
};
//# sourceMappingURL=Caption.js.map