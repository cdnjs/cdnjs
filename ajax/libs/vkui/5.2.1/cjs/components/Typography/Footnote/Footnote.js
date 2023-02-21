"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footnote = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["className", "children", "weight", "caps", "Component"];
/**
 * @see https://vkcom.github.io/VKUI/#/Footnote
 */
var Footnote = function Footnote(_ref) {
  var className = _ref.className,
    children = _ref.children,
    weight = _ref.weight,
    caps = _ref.caps,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'span' : _ref$Component,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)(className, "vkuiFootnote", caps && "vkuiFootnote--caps", weight && styles["Footnote--weight-".concat(weight)])
  }), children);
};
exports.Footnote = Footnote;
var styles = {
  "Footnote--weight-1": "vkuiFootnote--weight-1",
  "Footnote--weight-2": "vkuiFootnote--weight-2",
  "Footnote--weight-3": "vkuiFootnote--weight-3"
};
//# sourceMappingURL=Footnote.js.map