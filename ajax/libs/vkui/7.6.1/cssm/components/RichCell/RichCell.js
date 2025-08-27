'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { RichCellIcon } from "./RichCellIcon/RichCellIcon.js";
import styles from "./RichCell.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
const alignAfterClassNames = {
    start: styles.alignAfterStart,
    center: styles.alignAfterCenter,
    end: styles.alignAfterEnd
};
const alignBeforeClassNames = {
    start: styles.alignBeforeStart,
    center: styles.alignBeforeCenter,
    end: styles.alignBeforeEnd
};
const alignContentClassNames = {
    start: styles.contentAlignStart,
    center: styles.contentAlignCenter,
    end: styles.contentAlignEnd
};
/**
 * @see https://vkui.io/components/rich-cell
 */ export const RichCell = ({ overTitle, children, subtitle, extraSubtitle, before, after, afterCaption, bottom, actions, multiline, beforeAlign = 'start', contentAlign = 'start', afterAlign = 'start', ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const withAfter = after || afterCaption;
    const afterRender = ()=>{
        if (!withAfter) {
            return;
        }
        return /*#__PURE__*/ _jsxs("div", {
            className: styles.contentAfter,
            children: [
                after && /*#__PURE__*/ _jsx("div", {
                    className: styles.afterChildren,
                    children: after
                }),
                afterCaption && /*#__PURE__*/ _jsx("div", {
                    className: styles.afterCaption,
                    children: afterCaption
                })
            ]
        });
    };
    return /*#__PURE__*/ _jsxs(Tappable, {
        ...restProps,
        baseClassName: classNames(styles.host, !multiline && styles.textEllipsis, sizeY !== 'regular' && sizeYClassNames[sizeY], withAfter && styles.withAfter, withAfter && alignAfterClassNames[afterAlign], before && alignBeforeClassNames[beforeAlign], alignContentClassNames[contentAlign]),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: styles.before,
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles.in,
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles.content,
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: styles.contentBefore,
                                children: [
                                    overTitle && /*#__PURE__*/ _jsx(Subhead, {
                                        Component: "div",
                                        className: styles.overTitle,
                                        children: overTitle
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: styles.children,
                                        children: children
                                    }),
                                    subtitle && /*#__PURE__*/ _jsx("div", {
                                        className: styles.subtitle,
                                        children: subtitle
                                    }),
                                    extraSubtitle && /*#__PURE__*/ _jsx(Subhead, {
                                        Component: "div",
                                        className: styles.extraSubtitle,
                                        children: extraSubtitle
                                    })
                                ]
                            }),
                            afterAlign === 'start' && afterRender()
                        ]
                    }),
                    bottom && /*#__PURE__*/ _jsx("div", {
                        className: styles.bottom,
                        children: bottom
                    }),
                    actions && /*#__PURE__*/ _jsx("div", {
                        className: styles.actions,
                        children: actions
                    })
                ]
            }),
            afterAlign !== 'start' && afterRender()
        ]
    });
};
RichCell.Icon = RichCellIcon;

//# sourceMappingURL=RichCell.js.map