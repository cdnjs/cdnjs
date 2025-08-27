'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Done } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Paragraph } from "../Typography/Paragraph/Paragraph.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./CustomSelectOption.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    regular: styles.sizeYRegular
};
/**
 * @see https://vkui.io/components/custom-select#custom-select-option
 */ export const CustomSelectOption = ({ children, hierarchy = 0, hovered: hoveredProp, selected, before, after, description, disabled, style: styleProp, className, onClick, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const style = React.useMemo(()=>hierarchy > 0 ? {
            '--vkui_internal--custom_select_option_hierarchy_level': hierarchy
        } : undefined, [
        hierarchy
    ]);
    const hovered = hoveredProp && !disabled ? true : false;
    return /*#__PURE__*/ _jsxs(Paragraph, {
        ...restProps,
        onClick: disabled ? undefined : onClick,
        Component: "div",
        role: "option",
        "aria-disabled": disabled,
        "aria-selected": selected,
        "data-hovered": hovered,
        className: classNames(styles.host, sizeY !== 'compact' && sizeYClassNames[sizeY], hovered && styles.hover, disabled && styles.disabled, hierarchy > 0 && styles.hierarchy, className),
        style: mergeStyle(style, styleProp),
        children: [
            hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                className: styles.before,
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles.main,
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: styles.children,
                        children: children
                    }),
                    hasReactNode(description) && /*#__PURE__*/ _jsxs(Footnote, {
                        className: styles.description,
                        children: [
                            /*#__PURE__*/ _jsx(VisuallyHidden, {
                                children: " "
                            }),
                            description
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles.after,
                children: [
                    hasReactNode(after) && /*#__PURE__*/ _jsx("div", {
                        children: after
                    }),
                    selected && /*#__PURE__*/ _jsx(Icon16Done, {
                        className: styles.selectedIcon
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=CustomSelectOption.js.map