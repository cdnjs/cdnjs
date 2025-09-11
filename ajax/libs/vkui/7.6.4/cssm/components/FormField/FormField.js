'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName.js";
import { useFocusWithin } from "../../hooks/useFocusWithin.js";
import styles from "./FormField.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
const stylesStatus = {
    error: styles.statusError,
    valid: styles.statusValid
};
const iconAlignClassNames = {
    center: undefined,
    start: styles.iconAlignStart,
    end: styles.iconAlignEnd
};
const renderIcon = (icon, align, className)=>{
    return /*#__PURE__*/ _jsx("div", {
        className: styles.iconWrapper,
        children: /*#__PURE__*/ _jsx("span", {
            className: classNames(iconAlignClassNames[align], className),
            children: icon
        })
    });
};
/**
 * @see https://vkui.io/components/form-field
 */ export const FormField = ({ Component = 'span', status = 'default', children, getRootRef, before, after, beforeAlign = 'center', afterAlign = 'center', disabled, mode = 'default', className, maxHeight, style, ...restProps })=>{
    const elRef = useExternRef(getRootRef);
    const { sizeY = 'none' } = useAdaptivity();
    const [hover, setHover] = React.useState(false);
    const focusWithin = useFocusWithin(elRef);
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible: focusWithin,
        mode: styles.focusVisible
    });
    const handleMouseEnter = (e)=>{
        e.stopPropagation();
        setHover(true);
    };
    const handleMouseLeave = (e)=>{
        e.stopPropagation();
        setHover(false);
    };
    return /*#__PURE__*/ _jsxs(Component, {
        ...restProps,
        ref: elRef,
        style: {
            maxHeight,
            ...style
        },
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        className: classNames(styles.host, mode === 'default' && styles.modeDefault, status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], disabled && styles.disabled, !disabled && hover && styles.hover, focusVisibleClassNames, className),
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: styles.scrollContainer,
                children: [
                    before && renderIcon(before, beforeAlign, styles.before),
                    /*#__PURE__*/ _jsx("div", {
                        className: styles.content,
                        children: children
                    }),
                    after && renderIcon(after, afterAlign, classNames(styles.after, 'vkuiInternalFormField__after'))
                ]
            }),
            /*#__PURE__*/ _jsx("span", {
                "aria-hidden": true,
                className: styles.border
            })
        ]
    });
};

//# sourceMappingURL=FormField.js.map