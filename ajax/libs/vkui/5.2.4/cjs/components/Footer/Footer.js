"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Footnote = require("../Typography/Footnote/Footnote");
var _excluded = ["children", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Footer
 */
var Footer = function Footer(_ref) {
  var children = _ref.children,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(_Footnote.Footnote, (0, _extends2.default)({
    Component: "footer"
  }, restProps, {
    className: (0, _vkjs.classNames)("vkuiFooter", className)
  }), children);
};
exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map