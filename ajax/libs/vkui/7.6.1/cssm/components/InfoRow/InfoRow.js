import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { Headline } from "../Typography/Headline/Headline.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./InfoRow.module.css";
/**
 * @see https://vkui.io/components/info-row
 */ export const InfoRow = ({ header, children, className, ...restProps })=>/*#__PURE__*/ _jsxs(Headline, {
        ...restProps,
        Component: "span",
        className: classNames(styles.host, className),
        weight: "3",
        children: [
            hasReactNode(header) && /*#__PURE__*/ _jsxs(Subhead, {
                Component: "strong",
                className: styles.header,
                children: [
                    header,
                    /*#__PURE__*/ _jsx(VisuallyHidden, {
                        children: " "
                    })
                ]
            }),
            children
        ]
    });

//# sourceMappingURL=InfoRow.js.map