import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["badgeBeforeTitle", "badgeAfterTitle", "badgeBeforeSubtitle", "badgeAfterSubtitle", "before", "indicator", "children", "after", "expandable", "multiline", "subhead", "subtitle", "extraSubtitle", "className"];
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { getPlatformClassName } from '../../helpers/getPlatformClassName';
import { Tappable } from '../Tappable/Tappable';
import { Icon24Chevron } from '@vkontakte/icons';
import { Platform } from '../../lib/platform';
import { usePlatform } from '../../hooks/usePlatform';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { Headline } from '../Typography/Headline/Headline';
import { Subhead } from '../Typography/Subhead/Subhead';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import "./SimpleCell.module.css";
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
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var hasAfter = hasReactNode(after) || expandable && platform === Platform.IOS;
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(Tappable, _extends({}, restProps, {
    className: classNames("vkuiSimpleCell", getPlatformClassName("vkuiSimpleCell", platform), getSizeYClassName("vkuiSimpleCell", sizeY), expandable && "vkuiSimpleCell--exp", multiline && "vkuiSimpleCell--mult", className)
  }), before, /*#__PURE__*/React.createElement("div", {
    className: "vkuiSimpleCell__main"
  }, subhead && /*#__PURE__*/React.createElement(Subhead, {
    Component: "span",
    className: classNames("vkuiSimpleCell__text", "vkuiSimpleCell__subhead")
  }, subhead), /*#__PURE__*/React.createElement("div", {
    className: "vkuiSimpleCell__content"
  }, badgeBeforeTitle && /*#__PURE__*/React.createElement("span", {
    className: "vkuiSimpleCell__badge"
  }, badgeBeforeTitle), /*#__PURE__*/React.createElement(Headline, {
    Component: "span",
    className: "vkuiSimpleCell__children",
    weight: "3"
  }, children), hasReactNode(badgeAfterTitle) && /*#__PURE__*/React.createElement("span", {
    className: "vkuiSimpleCell__badge"
  }, badgeAfterTitle)), subtitle && /*#__PURE__*/React.createElement("div", {
    className: "vkuiSimpleCell__content"
  }, badgeBeforeSubtitle && /*#__PURE__*/React.createElement("span", {
    className: "vkuiSimpleCell__badge"
  }, badgeBeforeSubtitle), /*#__PURE__*/React.createElement("span", {
    className: classNames("vkuiSimpleCell__typography", "vkuiSimpleCell__text", "vkuiSimpleCell__subtitle")
  }, subtitle), badgeAfterSubtitle && /*#__PURE__*/React.createElement("span", {
    className: "vkuiSimpleCell__badge"
  }, badgeAfterSubtitle)), extraSubtitle && /*#__PURE__*/React.createElement("span", {
    className: classNames("vkuiSimpleCell__typography", "vkuiSimpleCell__text", "vkuiSimpleCell__extraSubtitle")
  }, extraSubtitle)), hasReactNode(indicator) && /*#__PURE__*/React.createElement(Headline, {
    Component: "span",
    weight: "3",
    className: "vkuiSimpleCell__indicator"
  }, indicator), hasAfter && /*#__PURE__*/React.createElement("div", {
    className: "vkuiSimpleCell__after"
  }, after, expandable && platform === Platform.IOS && /*#__PURE__*/React.createElement(Icon24Chevron, null)));
};
//# sourceMappingURL=SimpleCell.js.map