'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { RootComponent } from "../../RootComponent/RootComponent.js";
import { Footnote } from "../../Typography/Footnote/Footnote.js";
import { Text } from "../../Typography/Text/Text.js";
import { useSelectionControlContext } from "../SelectionControlContext.js";
import styles from "./SelectionControlLabel.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
export function SelectionControlLabel({ children, titleAfter, description, ...restProps }) {
    const { noPadding } = useSelectionControlContext();
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsxs(RootComponent, {
        baseClassName: classNames(styles.host, sizeY !== 'regular' && sizeYClassNames[sizeY], !noPadding && styles.withPadding),
        ...restProps,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: styles.titleLayout,
                children: [
                    /*#__PURE__*/ _jsx(Text, {
                        className: styles.title,
                        children: children
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: styles.titleAfter,
                        children: titleAfter
                    })
                ]
            }),
            hasReactNode(description) && /*#__PURE__*/ _jsx(Footnote, {
                className: styles.description,
                children: description
            })
        ]
    });
}

//# sourceMappingURL=SelectionControlLabel.js.map