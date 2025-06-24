'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { Chevron } from "./Chevron/Chevron.js";
const sizeYClassNames = {
    none: "vkuiSimpleCell__sizeYNone",
    compact: "vkuiSimpleCell__sizeYCompact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */ export const SimpleCell = (_param)=>{
    var { badgeBeforeTitle, badgeAfterTitle, badgeBeforeSubtitle, badgeAfterSubtitle, before, indicator, children, after, chevron, multiline, overTitle, subtitle, extraSubtitle, chevronSize = 'm' } = _param, restProps = _object_without_properties(_param, [
        "badgeBeforeTitle",
        "badgeAfterTitle",
        "badgeBeforeSubtitle",
        "badgeAfterSubtitle",
        "before",
        "indicator",
        "children",
        "after",
        "chevron",
        "multiline",
        "overTitle",
        "subtitle",
        "extraSubtitle",
        "chevronSize"
    ]);
    const platform = usePlatform();
    const hasChevron = chevron === 'always' || chevron === 'auto' && platform === 'ios';
    const hasAfter = hasReactNode(after) || hasChevron;
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiSimpleCell__host", restProps.disabled && "vkuiSimpleCell__disabled", sizeY !== 'regular' && sizeYClassNames[sizeY], multiline && "vkuiSimpleCell__mult"),
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames("vkuiSimpleCell__before", platform === 'ios' && "vkuiSimpleCell__beforeIos"),
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiSimpleCell__middle",
                children: [
                    overTitle && /*#__PURE__*/ _jsx(Subhead, {
                        Component: "span",
                        className: classNames("vkuiSimpleCell__text", "vkuiSimpleCell__overTitle"),
                        children: overTitle
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