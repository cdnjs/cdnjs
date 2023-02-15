"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichCell = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Tappable = require("../Tappable/Tappable");
var _Subhead = require("../Typography/Subhead/Subhead");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _excluded = ["subhead", "children", "text", "caption", "before", "after", "afterCaption", "bottom", "actions", "multiline", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/RichCell
 */
var RichCell = function RichCell(_ref) {
  var subhead = _ref.subhead,
    children = _ref.children,
    text = _ref.text,
    caption = _ref.caption,
    before = _ref.before,
    after = _ref.after,
    afterCaption = _ref.afterCaption,
    bottom = _ref.bottom,
    actions = _ref.actions,
    multiline = _ref.multiline,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiRichCell", !multiline && "vkuiRichCell--text-ellipsis", (0, _getSizeYClassName.getSizeYClassName)("vkuiRichCell", sizeY), className)
  }), before && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__content-before"
  }, subhead && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
    Component: "div",
    className: "vkuiRichCell__subhead"
  }, subhead), /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__children"
  }, children), text && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__text"
  }, text), caption && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
    Component: "div",
    className: "vkuiRichCell__caption"
  }, caption)), (after || afterCaption) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__content-after"
  }, after && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__after-children"
  }, after), afterCaption && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__after-caption"
  }, afterCaption))), bottom && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__bottom"
  }, bottom), actions && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__actions"
  }, actions)));
};
exports.RichCell = RichCell;
//# sourceMappingURL=RichCell.js.map