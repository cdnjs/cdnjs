"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichCell = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classNames = require("../../lib/classNames");
var _Tappable = require("../Tappable/Tappable");
var _Subhead = require("../Typography/Subhead/Subhead");
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _excluded = ["subhead", "children", "text", "caption", "before", "after", "afterCaption", "bottom", "actions", "multiline", "sizeY"];
var RichCellComponent = function RichCellComponent(_ref) {
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
    sizeY = _ref.sizeY,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("RichCell", !multiline && "RichCell--text-ellipsis", "RichCell--sizeY-".concat(sizeY))
  }), before && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__before"
  }, before), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__in"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__content"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__content-before"
  }, subhead && (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, {
    Component: "div",
    vkuiClass: "RichCell__subhead"
  }, subhead), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__children"
  }, children), text && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__text"
  }, text), caption && (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, {
    Component: "div",
    vkuiClass: "RichCell__caption"
  }, caption)), (after || afterCaption) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__content-after"
  }, after && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__after-children"
  }, after), afterCaption && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__after-caption"
  }, afterCaption))), bottom && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__bottom"
  }, bottom), actions && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__actions"
  }, actions)));
};

/**
 * @see https://vkcom.github.io/VKUI/#/RichCell
 */
var RichCell = (0, _withAdaptivity.withAdaptivity)(RichCellComponent, {
  sizeY: true
});
exports.RichCell = RichCell;
RichCell.displayName = "RichCell";
//# sourceMappingURL=RichCell.js.map