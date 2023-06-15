"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paragraph = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _warnOnce = require("../../../lib/warnOnce");
var _excluded = ["className", "Component", "getRootRef", "weight", "children"];
var warn = (0, _warnOnce.warnOnce)('Paragraph');

/**
 * @see https://vkcom.github.io/VKUI/#/Paragraph
 */
var Paragraph = function Paragraph(_ref) {
  var className = _ref.className,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'span' : _ref$Component,
    getRootRef = _ref.getRootRef,
    weight = _ref.weight,
    children = _ref.children,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  if (process.env.NODE_ENV === 'development' && typeof Component !== 'string' && getRootRef) {
    warn('getRootRef может использоваться только с элементами DOM', 'error');
  }
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    className: (0, _vkjs.classNames)(className, "vkuiParagraph", weight && styles["Paragraph--weight-".concat(weight)])
  }), children);
};
exports.Paragraph = Paragraph;
var styles = {
  "Paragraph--weight-1": "vkuiParagraph--weight-1",
  "Paragraph--weight-2": "vkuiParagraph--weight-2",
  "Paragraph--weight-3": "vkuiParagraph--weight-3"
};
//# sourceMappingURL=Paragraph.js.map