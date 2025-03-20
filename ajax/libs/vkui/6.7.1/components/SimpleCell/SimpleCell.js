import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    compact: "vkuiSimpleCell--sizeY-compact"
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
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiSimpleCell", restProps.disabled && "vkuiSimpleCell--disabled", sizeY !== 'regular' && sizeYClassNames[sizeY], multiline && "vkuiSimpleCell--mult", className),
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames("vkuiSimpleCell__before", platform === 'ios' && "vkuiSimpleCell__before--ios"),
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiSimpleCell__middle",
                children: [
                    subhead && /*#__PURE__*/ _jsx(Subhead, {
                        Component: "span",
                        className: classNames("vkuiSimpleCell__text", "vkuiSimpleCell__subhead"),
                        children: subhead
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "vkuiSimpleCell__content",
                        children: [
                            badgeBeforeTitle && /*#__PURE__*/ _jsx("span", {
                                className: "vkuiSimpleCell__badge",
                                children: badgeBeforeTitle
                            }),
                            /*#__PURE__*/ _jsx(Headline, {
                                Component: "span",
                                className: "vkuiSimpleCell__children",
                                weight: "3",
                                children: children
                            }),
                            hasReactNode(badgeAfterTitle) && /*#__PURE__*/ _jsx("span", {
                                className: "vkuiSimpleCell__badge",
                                children: badgeAfterTitle
                            })
                        ]
                    }),
                    subtitle && /*#__PURE__*/ _jsxs("div", {
                        className: "vkuiSimpleCell__content",
                        children: [
                            badgeBeforeSubtitle && /*#__PURE__*/ _jsx("span", {
                                className: "vkuiSimpleCell__badge",
                                children: badgeBeforeSubtitle
                            }),
                            /*#__PURE__*/ _jsx(Footnote, {
                                normalize: false,
                                className: classNames("vkuiSimpleCell__text", "vkuiSimpleCell__subtitle"),
                                children: subtitle
                            }),
                            badgeAfterSubtitle && /*#__PURE__*/ _jsx("span", {
                                className: "vkuiSimpleCell__badge",
                                children: badgeAfterSubtitle
                            })
                        ]
                    }),
                    extraSubtitle && /*#__PURE__*/ _jsx(Footnote, {
                        className: classNames("vkuiSimpleCell__text", "vkuiSimpleCell__extraSubtitle"),
                        children: extraSubtitle
                    })
                ]
            }),
            hasReactNode(indicator) && /*#__PURE__*/ _jsx(Headline, {
                Component: "span",
                weight: "3",
                className: "vkuiSimpleCell__indicator",
                children: indicator
            }),
            hasAfter && /*#__PURE__*/ _jsxs("div", {
                className: classNames("vkuiSimpleCell__after", 'vkuiInternalSimpleCell__after'),
                children: [
                    after,
                    hasChevron && /*#__PURE__*/ _jsx(Chevron, {
                        size: chevronSize,
                        className: "vkuiSimpleCell__chevronIcon"
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=SimpleCell.js.map