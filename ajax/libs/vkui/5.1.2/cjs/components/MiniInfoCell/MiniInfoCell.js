"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniInfoCell = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Paragraph = require("../Typography/Paragraph/Paragraph");
var _Tappable = require("../Tappable/Tappable");
var _icons = require("@vkontakte/icons");
var _excluded = ["before", "after", "children", "mode", "textWrap", "expandable", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */
var MiniInfoCell = function MiniInfoCell(_ref) {
  var before = _ref.before,
    after = _ref.after,
    children = _ref.children,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'base' : _ref$mode,
    _ref$textWrap = _ref.textWrap,
    textWrap = _ref$textWrap === void 0 ? 'nowrap' : _ref$textWrap,
    _ref$expandable = _ref.expandable,
    expandable = _ref$expandable === void 0 ? false : _ref$expandable,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var cellClasses = (0, _vkjs.classNames)("vkuiMiniInfoCell", styles["MiniInfoCell--textWrap-".concat(textWrap)], mode !== 'base' && styles["MiniInfoCell--mode-".concat(mode)], className);
  var cellContent = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "vkuiMiniInfoCell__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiMiniInfoCell__middle"
  }, /*#__PURE__*/React.createElement(_Paragraph.Paragraph, {
    className: "vkuiMiniInfoCell__content",
    weight: mode === 'more' ? '2' : undefined
  }, children), expandable && /*#__PURE__*/React.createElement(_icons.Icon16Chevron, null)), (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/React.createElement("span", {
    className: "vkuiMiniInfoCell__after"
  }, after));
  return restProps.onClick ? /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({
    Component: "div",
    role: "button"
  }, restProps, {
    className: cellClasses
  }), cellContent) : /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: cellClasses
  }), cellContent);
};
exports.MiniInfoCell = MiniInfoCell;
var styles = {
  "MiniInfoCell--textWrap-short": "vkuiMiniInfoCell--textWrap-short",
  "MiniInfoCell--textWrap-full": "vkuiMiniInfoCell--textWrap-full",
  "MiniInfoCell--textWrap-nowrap": "vkuiMiniInfoCell--textWrap-nowrap",
  "MiniInfoCell--mode-accent": "vkuiMiniInfoCell--mode-accent",
  "MiniInfoCell--mode-add": "vkuiMiniInfoCell--mode-add",
  "MiniInfoCell--mode-more": "vkuiMiniInfoCell--mode-more"
};
//# sourceMappingURL=MiniInfoCell.js.map