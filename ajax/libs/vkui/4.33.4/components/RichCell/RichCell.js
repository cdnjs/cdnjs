import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "text", "caption", "before", "after", "bottom", "actions", "multiline", "sizeY"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import { Tappable } from "../Tappable/Tappable";
import { hasReactNode } from "../../lib/utils";
import { Paragraph } from "../Typography/Paragraph/Paragraph";
import { Subhead } from "../Typography/Subhead/Subhead";
import { withAdaptivity } from "../../hoc/withAdaptivity";

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
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(Tappable, _extends({}, restProps, {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: classNames(getClassName("RichCell", platform), {
      "RichCell--mult": multiline
    }, "RichCell--sizeY-".concat(sizeY))
  }), before, createScopedElement("div", {
    vkuiClass: "RichCell__in"
  }, after, createScopedElement(Paragraph, {
    weight: "2",
    vkuiClass: "RichCell__content"
  }, createScopedElement("div", {
    vkuiClass: "RichCell__children"
  }, children), hasReactNode(after) && createScopedElement("div", {
    vkuiClass: "RichCell__after"
  }, after)), hasReactNode(text) && createScopedElement(Paragraph, {
    vkuiClass: "RichCell__text"
  }, text), hasReactNode(caption) && createScopedElement(Subhead, {
    Component: "span",
    vkuiClass: "RichCell__caption"
  }, caption), hasReactNode(bottom) && createScopedElement("div", {
    vkuiClass: "RichCell__bottom"
  }, bottom), hasReactNode(actions) && createScopedElement("div", {
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