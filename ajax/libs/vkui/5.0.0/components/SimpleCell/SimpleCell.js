import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["badgeBeforeTitle", "badgeAfterTitle", "badgeBeforeSubtitle", "badgeAfterSubtitle", "before", "indicator", "children", "after", "expandable", "multiline", "subhead", "subtitle", "extraSubtitle"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { Tappable } from "../Tappable/Tappable";
import { Icon24Chevron } from "@vkontakte/icons";
import { Platform } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { Headline } from "../Typography/Headline/Headline";
import { Subhead } from "../Typography/Subhead/Subhead";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";

/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */
export var SimpleCell = function SimpleCell(_ref) {
  var badgeBeforeTitle = _ref.badgeBeforeTitle,
      badgeAfterTitle = _ref.badgeAfterTitle,
      badgeBeforeSubtitle = _ref.badgeBeforeSubtitle,
      badgeAfterSubtitle = _ref.badgeAfterSubtitle,
      before = _ref.before,
      indicator = _ref.indicator,
      children = _ref.children,
      after = _ref.after,
      expandable = _ref.expandable,
      multiline = _ref.multiline,
      subhead = _ref.subhead,
      subtitle = _ref.subtitle,
      extraSubtitle = _ref.extraSubtitle,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var hasAfter = hasReactNode(after) || expandable && platform === Platform.IOS;

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  return createScopedElement(Tappable, _extends({}, restProps, {
    vkuiClass: classNames(getClassName("SimpleCell", platform), getSizeYClassName("SimpleCell", sizeY), expandable && "SimpleCell--exp", multiline && "SimpleCell--mult")
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
  }, badgeBeforeSubtitle), createScopedElement("span", {
    vkuiClass: "SimpleCell__typography SimpleCell__text SimpleCell__subtitle"
  }, subtitle), badgeAfterSubtitle && createScopedElement("span", {
    vkuiClass: "SimpleCell__badge"
  }, badgeAfterSubtitle)), extraSubtitle && createScopedElement("span", {
    vkuiClass: "SimpleCell__typography SimpleCell__text SimpleCell__extraSubtitle"
  }, extraSubtitle)), hasReactNode(indicator) && createScopedElement(Headline, {
    Component: "span",
    weight: "3",
    vkuiClass: "SimpleCell__indicator"
  }, indicator), hasAfter && createScopedElement("div", {
    vkuiClass: "SimpleCell__after"
  }, after, expandable && platform === Platform.IOS && createScopedElement(Icon24Chevron, null)));
};
//# sourceMappingURL=SimpleCell.js.map