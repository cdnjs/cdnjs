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

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _Tappable = require("../Tappable/Tappable");

var _utils = require("../../lib/utils");

var _Paragraph = require("../Typography/Paragraph/Paragraph");

var _Subhead = require("../Typography/Subhead/Subhead");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _excluded = ["children", "text", "caption", "before", "after", "bottom", "actions", "multiline", "sizeY"];

var RichCellComponent = function RichCellComponent(_ref) {
  var children = _ref.children,
      text = _ref.text,
      caption = _ref.caption,
      before = _ref.before,
      after = _ref.after,
      bottom = _ref.bottom,
      actions = _ref.actions,
      multiline = _ref.multiline,
      sizeY = _ref.sizeY,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("RichCell", platform), {
      "RichCell--mult": multiline
    }, "RichCell--sizeY-".concat(sizeY))
  }), before, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__in"
  }, after, (0, _jsxRuntime.createScopedElement)(_Paragraph.Paragraph, {
    weight: "2",
    vkuiClass: "RichCell__content"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__children"
  }, children), (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__after"
  }, after)), (0, _utils.hasReactNode)(text) && (0, _jsxRuntime.createScopedElement)(_Paragraph.Paragraph, {
    vkuiClass: "RichCell__text"
  }, text), (0, _utils.hasReactNode)(caption) && (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, {
    Component: "span",
    vkuiClass: "RichCell__caption"
  }, caption), (0, _utils.hasReactNode)(bottom) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__bottom"
  }, bottom), (0, _utils.hasReactNode)(actions) && (0, _jsxRuntime.createScopedElement)("div", {
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