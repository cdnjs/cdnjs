"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Tappable = require("../Tappable/Tappable");
var _excluded = ["hasVisited", "children", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Link
 */
var Link = function Link(_ref) {
  var hasVisited = _ref.hasVisited,
    children = _ref.children,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({
    Component: restProps.href ? 'a' : 'button'
  }, restProps, {
    className: (0, _vkjs.classNames)("vkuiLink", hasVisited && "vkuiLink--has-visited", className),
    hasHover: false,
    activeMode: "opacity",
    focusVisibleMode: "vkuiLink--focus-visible"
  }), children);
};
exports.Link = Link;
//# sourceMappingURL=Link.js.map