'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../../hooks/useAdaptivity.js";
import { RootComponent } from "../../../RootComponent/RootComponent.js";
import { Paragraph } from "../../../Typography/Paragraph/Paragraph.js";
import { Subhead } from "../../../Typography/Subhead/Subhead.js";
import styles from "./Basic.module.css";
const stylesLayout = {
    none: styles.layoutNone,
    vertical: styles.layoutVertical,
    horizontal: styles.layoutHorizontal
};
const sizeYClassNames = {
    none: styles.sizeYNone,
    regular: styles.sizeYRegular
};
export function Basic({ layout: layoutProps, action, after, before, mode, subtitle, children, ...restProps }) {
    const { sizeY = 'none' } = useAdaptivity();
    const layout = after || subtitle ? 'vertical' : 'none';
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.body, stylesLayout[layoutProps || layout], sizeY !== 'compact' && sizeYClassNames[sizeY], mode === 'dark' && styles.modeDark),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: styles.before,
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles.content,
                children: [
                    /*#__PURE__*/ _jsx(Paragraph, {
                        className: styles.contentText,
                        children: children
                    }),
                    subtitle && !action && /*#__PURE__*/ _jsx(Subhead, {
                        className: styles.contentSubtitle,
                        children: subtitle
                    }),
                    action && !subtitle && /*#__PURE__*/ _jsx("div", {
                        className: styles.action,
                        children: action
                    })
                ]
            }),
            after && /*#__PURE__*/ _jsx("div", {
                className: styles.after,
                children: after
            })
        ]
    });
}

//# sourceMappingURL=Basic.js.map