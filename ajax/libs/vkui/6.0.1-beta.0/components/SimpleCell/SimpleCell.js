import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Headline } from '../Typography/Headline/Headline';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Chevron } from './Chevron/Chevron';
const sizeYClassNames = {
    none: "vkuiSimpleCell--sizeY-none",
    ['compact']: "vkuiSimpleCell--sizeY-compact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */ export const SimpleCell = (_param)=>{
    var { badgeBeforeTitle, badgeAfterTitle, badgeBeforeSubtitle, badgeAfterSubtitle, before, indicator, children, after, expandable, multiline, subhead, subtitle, extraSubtitle, className, chevronSize = 'm' } = _param, restProps = _object_without_properties(_param, [
        "badgeBeforeTitle",
        "badgeAfterTitle",
        "badgeBeforeSubtitle",
        "badgeAfterSubtitle",
        "before",
        "indicator",
        "children",
        "after",
        "expandable",
        "multiline",
        "subhead",
        "subtitle",
        "extraSubtitle",
        "className",
        "chevronSize"
    ]);
    const platform = usePlatform();
    const hasChevron = expandable === 'always' || expandable === 'auto' && platform === 'ios';
    const hasAfter = hasReactNode(after) || hasChevron;
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiSimpleCell", sizeY !== 'regular' && sizeYClassNames[sizeY], multiline && "vkuiSimpleCell--mult", className)
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSimpleCell__before"
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSimpleCell__middle"
    }, subhead && /*#__PURE__*/ React.createElement(Subhead, {
        Component: "span",
        className: classNames("vkuiSimpleCell__text", "vkuiSimpleCell__subhead")
    }, subhead), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSimpleCell__content"
    }, badgeBeforeTitle && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiSimpleCell__badge"
    }, badgeBeforeTitle), /*#__PURE__*/ React.createElement(Headline, {
        Component: "span",
        className: "vkuiSimpleCell__children",
        weight: "3"
    }, children), hasReactNode(badgeAfterTitle) && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiSimpleCell__badge"
    }, badgeAfterTitle)), subtitle && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSimpleCell__content"
    }, badgeBeforeSubtitle && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiSimpleCell__badge"
    }, badgeBeforeSubtitle), /*#__PURE__*/ React.createElement(Footnote, {
        normalize: false,
        className: classNames("vkuiSimpleCell__text", "vkuiSimpleCell__subtitle")
    }, subtitle), badgeAfterSubtitle && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiSimpleCell__badge"
    }, badgeAfterSubtitle)), extraSubtitle && /*#__PURE__*/ React.createElement(Footnote, {
        className: classNames("vkuiSimpleCell__text", "vkuiSimpleCell__extraSubtitle")
    }, extraSubtitle)), hasReactNode(indicator) && /*#__PURE__*/ React.createElement(Headline, {
        Component: "span",
        weight: "3",
        className: "vkuiSimpleCell__indicator"
    }, indicator), hasAfter && /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiSimpleCell__after", 'vkuiInternalSimpleCell__after')
    }, after, hasChevron && /*#__PURE__*/ React.createElement(Chevron, {
        size: chevronSize,
        className: "vkuiSimpleCell__chevronIcon"
    })));
};

//# sourceMappingURL=SimpleCell.js.map