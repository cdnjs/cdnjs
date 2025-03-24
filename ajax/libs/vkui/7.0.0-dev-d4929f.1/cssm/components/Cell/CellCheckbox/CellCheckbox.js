'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon20CheckBoxOff, Icon20CheckBoxOn, Icon20CheckCircleOff, Icon20CheckCircleOn, Icon24CheckBoxOff, Icon24CheckBoxOn, Icon24CheckCircleOff, Icon24CheckCircleOn } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../../hooks/usePlatform.js";
import { AdaptiveIconRenderer } from "../../AdaptiveIconRenderer/AdaptiveIconRenderer.js";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden.js";
import styles from "./CellCheckbox.module.css";
const CheckBoxOn = ()=>/*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
        IconCompact: Icon20CheckBoxOn,
        IconRegular: Icon24CheckBoxOn
    });
const CheckBoxOff = ()=>/*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
        IconCompact: Icon20CheckBoxOff,
        IconRegular: Icon24CheckBoxOff
    });
const CheckCircleOn = ()=>/*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
        IconCompact: Icon20CheckCircleOn,
        IconRegular: Icon24CheckCircleOn
    });
const CheckCircleOff = ()=>/*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
        IconCompact: Icon20CheckCircleOff,
        IconRegular: Icon24CheckCircleOff
    });
function useTypeIcon(type) {
    const platform = usePlatform();
    if (type !== 'auto') {
        return type;
    }
    if (platform === 'ios' || platform === 'vkcom') {
        return 'circle';
    }
    return 'square';
}
export const CellCheckbox = ({ getRootRef, getRef, className, style, type = 'auto', ...restProps })=>{
    const typeIcon = useTypeIcon(type);
    const IconOff = typeIcon === 'circle' ? CheckCircleOff : CheckBoxOff;
    const IconOn = typeIcon === 'circle' ? CheckCircleOn : CheckBoxOn;
    return /*#__PURE__*/ _jsxs("span", {
        className: classNames(styles.host, className),
        style: style,
        ref: getRootRef,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                ...restProps,
                Component: "input",
                type: "checkbox",
                className: styles.input,
                getRootRef: getRef
            }),
            /*#__PURE__*/ _jsx("span", {
                className: classNames(styles.icon, styles.iconOff),
                "aria-hidden": true,
                children: /*#__PURE__*/ _jsx(IconOff, {})
            }),
            /*#__PURE__*/ _jsx("span", {
                className: classNames(styles.icon, styles.iconOn),
                "aria-hidden": true,
                children: /*#__PURE__*/ _jsx(IconOn, {})
            })
        ]
    });
};

//# sourceMappingURL=CellCheckbox.js.map