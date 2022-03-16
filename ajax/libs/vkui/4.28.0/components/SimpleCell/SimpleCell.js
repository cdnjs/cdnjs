import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
var _excluded = ["badge", "before", "indicator", "children", "after", "description", "expandable", "multiline", "sizeY"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import Tappable from "../Tappable/Tappable";
import { Icon24Chevron } from "@vkontakte/icons";
import { ANDROID, IOS } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import Title from "../Typography/Title/Title";
import Text from "../Typography/Text/Text";
import Subhead from "../Typography/Subhead/Subhead";
import Headline from "../Typography/Headline/Headline";

var SimpleCellTypography = function SimpleCellTypography(props) {
  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  var platform = usePlatform();

  if (sizeY === SizeType.COMPACT) {
    return createScopedElement(Text, _extends({
      Component: "span",
      weight: "regular"
    }, props));
  } else if (platform === ANDROID) {
    return createScopedElement(Headline, _extends({
      Component: "span",
      weight: "regular"
    }, props));
  } else {
    return createScopedElement(Title, _extends({
      Component: "span",
      level: "3",
      weight: "3"
    }, props));
  }
};

var SimpleCell = function SimpleCell(_ref) {
  var badge = _ref.badge,
      before = _ref.before,
      indicator = _ref.indicator,
      children = _ref.children,
      after = _ref.after,
      description = _ref.description,
      expandable = _ref.expandable,
      multiline = _ref.multiline,
      sizeY = _ref.sizeY,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var hasAfter = hasReactNode(after) || expandable && platform === IOS;
  return createScopedElement(Tappable, _extends({}, restProps, {
    vkuiClass: classNames(getClassName("SimpleCell", platform), {
      "SimpleCell--exp": expandable,
      "SimpleCell--mult": multiline
    }, "SimpleCell--sizeY-".concat(sizeY))
  }), before, createScopedElement("div", {
    vkuiClass: "SimpleCell__main"
  }, createScopedElement("div", {
    vkuiClass: "SimpleCell__content"
  }, createScopedElement(SimpleCellTypography, {
    vkuiClass: "SimpleCell__children"
  }, children), hasReactNode(badge) && createScopedElement("span", {
    vkuiClass: "SimpleCell__badge"
  }, badge)), description && createScopedElement(Subhead, {
    Component: "span",
    vkuiClass: "SimpleCell__description"
  }, description)), hasReactNode(indicator) && createScopedElement(SimpleCellTypography, {
    Component: "span",
    vkuiClass: "SimpleCell__indicator"
  }, indicator), hasAfter && createScopedElement("div", {
    vkuiClass: "SimpleCell__after"
  }, after, expandable && platform === IOS && createScopedElement(Icon24Chevron, null)));
}; // eslint-disable-next-line import/no-default-export


export default withAdaptivity(SimpleCell, {
  sizeY: true
});
//# sourceMappingURL=SimpleCell.js.map