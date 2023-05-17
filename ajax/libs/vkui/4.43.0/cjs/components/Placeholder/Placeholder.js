"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Placeholder = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classNames = require("../../lib/classNames");
var _utils = require("../../lib/utils");
var _Title = require("../Typography/Title/Title");
var _Headline = require("../Typography/Headline/Headline");
var _excluded = ["icon", "header", "action", "children", "stretched", "getRootRef"];
/**
 * @see https://vkcom.github.io/VKUI/#/Placeholder
 */
var Placeholder = function Placeholder(_ref) {
  var icon = _ref.icon,
    header = _ref.header,
    action = _ref.action,
    children = _ref.children,
    stretched = _ref.stretched,
    getRootRef = _ref.getRootRef,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)("Placeholder", stretched && "Placeholder--stretched")
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Placeholder__in"
  }, (0, _utils.hasReactNode)(icon) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Placeholder__icon"
  }, icon), (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(_Title.Title, {
    level: "2",
    weight: "2",
    vkuiClass: "Placeholder__header"
  }, header), (0, _utils.hasReactNode)(children) && (0, _jsxRuntime.createScopedElement)(_Headline.Headline, {
    weight: "3",
    vkuiClass: "Placeholder__text"
  }, children), (0, _utils.hasReactNode)(action) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Placeholder__action"
  }, action)));
};
exports.Placeholder = Placeholder;
//# sourceMappingURL=Placeholder.js.map