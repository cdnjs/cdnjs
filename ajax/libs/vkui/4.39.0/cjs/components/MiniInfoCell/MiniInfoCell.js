"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniInfoCell = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _classNames = require("../../lib/classNames");
var _Paragraph = require("../Typography/Paragraph/Paragraph");
var _Tappable = require("../Tappable/Tappable");
var _utils = require("../../lib/utils");
var _excluded = ["before", "after", "mode", "textWrap", "textLevel", "children"];
/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */
var MiniInfoCell = function MiniInfoCell(_ref) {
  var before = _ref.before,
    after = _ref.after,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "base" : _ref$mode,
    _ref$textWrap = _ref.textWrap,
    textWrap = _ref$textWrap === void 0 ? "nowrap" : _ref$textWrap,
    _ref$textLevel = _ref.textLevel,
    textLevel = _ref$textLevel === void 0 ? "secondary" : _ref$textLevel,
    children = _ref.children,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var cellClasses = (0, _classNames.classNames)("MiniInfoCell", mode !== "base" && "MiniInfoCell--md-".concat(mode), textWrap !== "nowrap" && "MiniInfoCell--wr-".concat(textWrap), "MiniInfoCell--lvl-".concat(textLevel));
  var cellContent = (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "MiniInfoCell__icon"
  }, before), (0, _jsxRuntime.createScopedElement)(_Paragraph.Paragraph, {
    vkuiClass: "MiniInfoCell__content",
    weight: mode === "more" ? "2" : undefined
  }, children), (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "MiniInfoCell__after"
  }, after));
  return restProps.onClick ? (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({
    Component: "div",
    role: "button"
  }, restProps, {
    vkuiClass: cellClasses
  }), cellContent) : (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: cellClasses
  }), cellContent);
};
exports.MiniInfoCell = MiniInfoCell;
//# sourceMappingURL=MiniInfoCell.js.map