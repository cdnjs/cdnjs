"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classNames = require("../../lib/classNames");
var _Tappable = require("../Tappable/Tappable");
var _excluded = ["hasVisited", "children"];
/**
 * @see https://vkcom.github.io/VKUI/#/Link
 */
var Link = function Link(_ref) {
  var hasVisited = _ref.hasVisited,
    children = _ref.children,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({
    Component: restProps.href ? "a" : "button"
  }, restProps, {
    vkuiClass: (0, _classNames.classNames)("Link", hasVisited && "Link--has-visited"),
    hasHover: false,
    activeMode: "opacity",
    focusVisibleMode: "Link--focus-visible"
  }), children);
};
exports.Link = Link;
//# sourceMappingURL=Link.js.map