import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
var _excluded = ["badge", "badgeBeforeTitle", "badgeAfterTitle", "badgeBeforeSubtitle", "badgeAfterSubtitle", "before", "indicator", "children", "after", "description", "expandable", "multiline", "sizeY", "subhead", "subtitle", "extraSubtitle"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { Tappable } from "../Tappable/Tappable";
import { Icon24Chevron } from "@vkontakte/icons";
import { IOS } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Headline } from "../Typography/Headline/Headline";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Caption } from "../Typography/Caption/Caption";
var SubtitleTypography = function SubtitleTypography(props) {
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  if (sizeY === SizeType.COMPACT) {
    return createScopedElement(Caption, _extends({
      level: "2"
    }, props));
  }
  return createScopedElement(Footnote, props);
};
var SimpleCellComponent = function SimpleCellComponent(_ref) {
  var badge = _ref.badge,
    badgeBeforeTitle = _ref.badgeBeforeTitle,
    _ref$badgeAfterTitle = _ref.badgeAfterTitle,
    badgeAfterTitle = _ref$badgeAfterTitle === void 0 ? badge : _ref$badgeAfterTitle,
    badgeBeforeSubtitle = _ref.badgeBeforeSubtitle,
    badgeAfterSubtitle = _ref.badgeAfterSubtitle,
    before = _ref.before,
    indicator = _ref.indicator,
    children = _ref.children,
    after = _ref.after,
    description = _ref.description,
    expandable = _ref.expandable,
    multiline = _ref.multiline,
    sizeY = _ref.sizeY,
    subhead = _ref.subhead,
    _ref$subtitle = _ref.subtitle,
    subtitle = _ref$subtitle === void 0 ? description : _ref$subtitle,
    extraSubtitle = _ref.extraSubtitle,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var hasAfter = hasReactNode(after) || expandable && platform === IOS;
  return createScopedElement(Tappable, _extends({}, restProps, {
    vkuiClass: classNames(getClassName("SimpleCell", platform), expandable && "SimpleCell--exp", multiline && "SimpleCell--mult", "SimpleCell--sizeY-".concat(sizeY))
  }), before, createScopedElement("div", {
    vkuiClass: "SimpleCell__main"
  }, subhead && createScopedElement(Subhead, {
    Component: "span",
    vkuiClass: "SimpleCell__text SimpleCell__subhead"
  }, subhead), createScopedElement("div", {
    vkuiClass: "SimpleCell__content"
  }, badgeBeforeTitle && createScopedElement("span", {
    vkuiClass: "SimpleCell__badge"
  }, badgeBeforeTitle), createScopedElement(Headline, {
    Component: "span",
    vkuiClass: "SimpleCell__children",
    weight: "3"
  }, children), hasReactNode(badgeAfterTitle) && createScopedElement("span", {
    vkuiClass: "SimpleCell__badge"
  }, badgeAfterTitle)), subtitle && createScopedElement("div", {
    vkuiClass: "SimpleCell__content"
  }, badgeBeforeSubtitle && createScopedElement("span", {
    vkuiClass: "SimpleCell__badge"
  }, badgeBeforeSubtitle), createScopedElement(SubtitleTypography, {
    vkuiClass: "SimpleCell__text SimpleCell__subtitle"
  }, subtitle), badgeAfterSubtitle && createScopedElement("span", {
    vkuiClass: "SimpleCell__badge"
  }, badgeAfterSubtitle)), extraSubtitle && createScopedElement(SubtitleTypography, {
    vkuiClass: "SimpleCell__text SimpleCell__extraSubtitle"
  }, extraSubtitle)), hasReactNode(indicator) && createScopedElement(Headline, {
    Component: "span",
    weight: "3",
    vkuiClass: "SimpleCell__indicator"
  }, indicator), hasAfter && createScopedElement("div", {
    vkuiClass: "SimpleCell__after"
  }, after, expandable && platform === IOS && createScopedElement(Icon24Chevron, null)));
};

/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */
export var SimpleCell = withAdaptivity(SimpleCellComponent, {
  sizeY: true
});
SimpleCell.displayName = "SimpleCell";
//# sourceMappingURL=SimpleCell.js.map