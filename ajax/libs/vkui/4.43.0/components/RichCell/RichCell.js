import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["subhead", "children", "text", "caption", "before", "after", "afterCaption", "bottom", "actions", "multiline", "sizeY"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { Tappable } from "../Tappable/Tappable";
import { Subhead } from "../Typography/Subhead/Subhead";
import { withAdaptivity } from "../../hoc/withAdaptivity";
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  return createScopedElement(Tappable, _extends({}, restProps, {
    vkuiClass: classNames("RichCell", !multiline && "RichCell--text-ellipsis", "RichCell--sizeY-".concat(sizeY))
  }), before && createScopedElement("div", {
    vkuiClass: "RichCell__before"
  }, before), createScopedElement("div", {
    vkuiClass: "RichCell__in"
  }, createScopedElement("div", {
    vkuiClass: "RichCell__content"
  }, createScopedElement("div", {
    vkuiClass: "RichCell__content-before"
  }, subhead && createScopedElement(Subhead, {
    Component: "div",
    vkuiClass: "RichCell__subhead"
  }, subhead), createScopedElement("div", {
    vkuiClass: "RichCell__children"
  }, children), text && createScopedElement("div", {
    vkuiClass: "RichCell__text"
  }, text), caption && createScopedElement(Subhead, {
    Component: "div",
    vkuiClass: "RichCell__caption"
  }, caption)), (after || afterCaption) && createScopedElement("div", {
    vkuiClass: "RichCell__content-after"
  }, after && createScopedElement("div", {
    vkuiClass: "RichCell__after-children"
  }, after), afterCaption && createScopedElement("div", {
    vkuiClass: "RichCell__after-caption"
  }, afterCaption))), bottom && createScopedElement("div", {
    vkuiClass: "RichCell__bottom"
  }, bottom), actions && createScopedElement("div", {
    vkuiClass: "RichCell__actions"
  }, actions)));
};

/**
 * @see https://vkcom.github.io/VKUI/#/RichCell
 */
export var RichCell = withAdaptivity(RichCellComponent, {
  sizeY: true
});
RichCell.displayName = "RichCell";
//# sourceMappingURL=RichCell.js.map