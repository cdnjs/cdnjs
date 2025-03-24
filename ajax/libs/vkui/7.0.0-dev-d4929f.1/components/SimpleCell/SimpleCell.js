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
    none: "SimpleCell__sizeYNone--9xuTl",
    compact: "SimpleCell__sizeYCompact--Wehhb"
};
/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */ export const SimpleCell = (_param)=>{
    var { badgeBeforeTitle, badgeAfterTitle, badgeBeforeSubtitle, badgeAfterSubtitle, before, indicator, children, after, chevron, multiline, overTitle, subtitle, extraSubtitle, className, chevronSize = 'm' } = _param, restProps = _object_without_properties(_param, [
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
        "className",
        "chevronSize"
    ]);
    const platform = usePlatform();
    const hasChevron = chevron === 'always' || chevron === 'auto' && platform === 'ios';
    const hasAfter = hasReactNode(after) || hasChevron;
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("SimpleCell__host--fJ9Bk", restProps.disabled && "SimpleCell__disabled--vpHbx", sizeY !== 'regular' && sizeYClassNames[sizeY], multiline && "SimpleCell__mult--0ubv6", className),
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames("SimpleCell__before--2qiox", platform === 'ios' && "SimpleCell__beforeIos--gTWfw"),
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "SimpleCell__middle--Wg7C5",
                children: [
                    overTitle && /*#__PURE__*/ _jsx(Subhead, {
                        Component: "span",
                        className: classNames("SimpleCell__text--LFIx3", "SimpleCell__overTitle--YhCBZ"),
                        children: overTitle
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "SimpleCell__content--dbfoM",
                        children: [
                            badgeBeforeTitle && /*#__PURE__*/ _jsx("span", {
                                className: "SimpleCell__badge--0mHe4",
                                children: badgeBeforeTitle
                            }),
                            /*#__PURE__*/ _jsx(Headline, {
                                Component: "span",
                                className: "SimpleCell__children--ZTyfK",
                                weight: "3",
                                children: children
                            }),
                            hasReactNode(badgeAfterTitle) && /*#__PURE__*/ _jsx("span", {
                                className: "SimpleCell__badge--0mHe4",
                                children: badgeAfterTitle
                            })
                        ]
                    }),
                    subtitle && /*#__PURE__*/ _jsxs("div", {
                        className: "SimpleCell__content--dbfoM",
                        children: [
                            badgeBeforeSubtitle && /*#__PURE__*/ _jsx("span", {
                                className: "SimpleCell__badge--0mHe4",
                                children: badgeBeforeSubtitle
                            }),
                            /*#__PURE__*/ _jsx(Footnote, {
                                normalize: false,
                                className: classNames("SimpleCell__text--LFIx3", "SimpleCell__subtitle--olycO"),
                                children: subtitle
                            }),
                            badgeAfterSubtitle && /*#__PURE__*/ _jsx("span", {
                                className: "SimpleCell__badge--0mHe4",
                                children: badgeAfterSubtitle
                            })
                        ]
                    }),
                    extraSubtitle && /*#__PURE__*/ _jsx(Footnote, {
                        className: classNames("SimpleCell__text--LFIx3", "SimpleCell__extraSubtitle--MU3E0"),
                        children: extraSubtitle
                    })
                ]
            }),
            hasReactNode(indicator) && /*#__PURE__*/ _jsx(Headline, {
                Component: "span",
                weight: "3",
                className: "SimpleCell__indicator--ZfCmz",
                children: indicator
            }),
            hasAfter && /*#__PURE__*/ _jsxs("div", {
                className: classNames("SimpleCell__after--GZs21", 'vkuiInternalSimpleCell__after'),
                children: [
                    after,
                    hasChevron && /*#__PURE__*/ _jsx(Chevron, {
                        size: chevronSize,
                        className: "SimpleCell__chevronIcon--9tr7O"
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=SimpleCell.js.map