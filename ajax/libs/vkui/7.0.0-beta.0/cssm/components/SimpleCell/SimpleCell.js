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
import styles from "./SimpleCell.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */ export const SimpleCell = ({ badgeBeforeTitle, badgeAfterTitle, badgeBeforeSubtitle, badgeAfterSubtitle, before, indicator, children, after, expandable, multiline, subhead, subtitle, extraSubtitle, className, chevronSize = 'm', ...restProps })=>{
    const platform = usePlatform();
    const hasChevron = expandable === 'always' || expandable === 'auto' && platform === 'ios';
    const hasAfter = hasReactNode(after) || hasChevron;
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsxs(Tappable, {
        ...restProps,
        className: classNames(styles.host, restProps.disabled && styles.disabled, sizeY !== 'regular' && sizeYClassNames[sizeY], multiline && styles.mult, className),
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles.before, platform === 'ios' && styles.beforeIos),
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles.middle,
                children: [
                    subhead && /*#__PURE__*/ _jsx(Subhead, {
                        Component: "span",
                        className: classNames(styles.text, styles.subhead),
                        children: subhead
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles.content,
                        children: [
                            badgeBeforeTitle && /*#__PURE__*/ _jsx("span", {
                                className: styles.badge,
                                children: badgeBeforeTitle
                            }),
                            /*#__PURE__*/ _jsx(Headline, {
                                Component: "span",
                                className: styles.children,
                                weight: "3",
                                children: children
                            }),
                            hasReactNode(badgeAfterTitle) && /*#__PURE__*/ _jsx("span", {
                                className: styles.badge,
                                children: badgeAfterTitle
                            })
                        ]
                    }),
                    subtitle && /*#__PURE__*/ _jsxs("div", {
                        className: styles.content,
                        children: [
                            badgeBeforeSubtitle && /*#__PURE__*/ _jsx("span", {
                                className: styles.badge,
                                children: badgeBeforeSubtitle
                            }),
                            /*#__PURE__*/ _jsx(Footnote, {
                                normalize: false,
                                className: classNames(styles.text, styles.subtitle),
                                children: subtitle
                            }),
                            badgeAfterSubtitle && /*#__PURE__*/ _jsx("span", {
                                className: styles.badge,
                                children: badgeAfterSubtitle
                            })
                        ]
                    }),
                    extraSubtitle && /*#__PURE__*/ _jsx(Footnote, {
                        className: classNames(styles.text, styles.extraSubtitle),
                        children: extraSubtitle
                    })
                ]
            }),
            hasReactNode(indicator) && /*#__PURE__*/ _jsx(Headline, {
                Component: "span",
                weight: "3",
                className: styles.indicator,
                children: indicator
            }),
            hasAfter && /*#__PURE__*/ _jsxs("div", {
                className: classNames(styles.after, 'vkuiInternalSimpleCell__after'),
                children: [
                    after,
                    hasChevron && /*#__PURE__*/ _jsx(Chevron, {
                        size: chevronSize,
                        className: styles.chevronIcon
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=SimpleCell.js.map