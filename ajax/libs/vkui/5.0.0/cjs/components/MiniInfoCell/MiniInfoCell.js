"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniInfoCell = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _Paragraph = require("../Typography/Paragraph/Paragraph");

var _Tappable = require("../Tappable/Tappable");

var _utils = require("../../lib/utils");

var _icons = require("@vkontakte/icons");

var _excluded = ["before", "after", "children", "mode", "textWrap", "expandable"];

/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */
var MiniInfoCell = function MiniInfoCell(_ref) {
  var before = _ref.before,
      after = _ref.after,
      children = _ref.children,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "base" : _ref$mode,
      _ref$textWrap = _ref.textWrap,
      textWrap = _ref$textWrap === void 0 ? "nowrap" : _ref$textWrap,
      _ref$expandable = _ref.expandable,
      expandable = _ref$expandable === void 0 ? false : _ref$expandable,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var isClickable = !!restProps.onClick;
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({
    Component: "div",
    disabled: !isClickable,
    role: isClickable ? "button" : undefined
  }, restProps, {
    vkuiClass: (0, _classNames.classNames)("MiniInfoCell", "MiniInfoCell--textWrap-".concat(textWrap), mode !== "base" && "MiniInfoCell--mode-".concat(mode))
  }), (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "MiniInfoCell__before"
  }, before), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "MiniInfoCell__middle"
  }, (0, _jsxRuntime.createScopedElement)(_Paragraph.Paragraph, {
    vkuiClass: "MiniInfoCell__content",
    weight: mode === "more" ? "2" : undefined
  }, children), expandable && (0, _jsxRuntime.createScopedElement)(_icons.Icon16Chevron, null)), (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "MiniInfoCell__after"
  }, after));
};

exports.MiniInfoCell = MiniInfoCell;
//# sourceMappingURL=MiniInfoCell.js.map