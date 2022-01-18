import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "text", "caption", "before", "after", "bottom", "actions", "multiline", "sizeY"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import Tappable from "../Tappable/Tappable";
import { hasReactNode } from "../../lib/utils";
import Text from "../Typography/Text/Text";
import Subhead from "../Typography/Subhead/Subhead";
import { withAdaptivity } from "../../hoc/withAdaptivity";

var RichCell = function RichCell(_ref) {
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
    vkuiClass: classNames(getClassName('RichCell', platform), {
      'RichCell--mult': multiline
    }, "RichCell--sizeY-".concat(sizeY))
  }), before, createScopedElement("div", {
    vkuiClass: "RichCell__in"
  }, after, createScopedElement(Text, {
    weight: "medium",
    vkuiClass: "RichCell__content"
  }, createScopedElement("div", {
    vkuiClass: "RichCell__children"
  }, children), hasReactNode(after) && createScopedElement("div", {
    vkuiClass: "RichCell__after"
  }, after)), hasReactNode(text) && createScopedElement(Text, {
    weight: "regular",
    vkuiClass: "RichCell__text"
  }, text), hasReactNode(caption) && createScopedElement(Subhead, {
    Component: "span",
    weight: "regular",
    vkuiClass: "RichCell__caption"
  }, caption), (hasReactNode(bottom) || hasReactNode(actions)) && createScopedElement("div", {
    vkuiClass: "RichCell__bottom"
  }, bottom, hasReactNode(actions) && createScopedElement("div", {
    vkuiClass: "RichCell__actions"
  }, actions))));
};

export default withAdaptivity(RichCell, {
  sizeY: true
});
//# sourceMappingURL=RichCell.js.map