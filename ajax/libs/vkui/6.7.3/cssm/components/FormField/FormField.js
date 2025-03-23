import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';
import { useFocusWithin } from '../../hooks/useFocusWithin';
import styles from './FormField.module.css';
const sizeYClassNames = {
    none: styles['FormField--sizeY-none'],
    compact: styles['FormField--sizeY-compact']
};
const stylesStatus = {
    error: styles['FormField--status-error'],
    valid: styles['FormField--status-valid']
};
const iconAlignClassNames = {
    center: undefined,
    start: styles['FormField__icon--align-start'],
    end: styles['FormField__icon--align-end']
};
const renderIcon = (icon, align, className)=>{
    return /*#__PURE__*/ _jsx("div", {
        className: styles['FormField__iconWrapper'],
        children: /*#__PURE__*/ _jsx("span", {
            className: classNames(iconAlignClassNames[align], className),
            children: icon
        })
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormField
 */ export const FormField = ({ Component = 'span', status = 'default', children, getRootRef, before, after, beforeAlign = 'center', afterAlign = 'center', disabled, mode = 'default', className, maxHeight, style, ...restProps })=>{
    const elRef = useExternRef(getRootRef);
    const { sizeY = 'none' } = useAdaptivity();
    const [hover, setHover] = React.useState(false);
    const focusWithin = useFocusWithin(elRef);
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible: focusWithin,
        mode: styles['FormField--focus-visible']
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
        style: maxHeight !== undefined ? {
            ...style,
            maxHeight
        } : style,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        className: classNames(styles['FormField'], mode === 'default' && styles['FormField--mode-default'], status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], disabled && styles['FormField--disabled'], !disabled && hover && styles['FormField--hover'], focusVisibleClassNames, className),
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: styles['FormField_scrollContainer'],
                children: [
                    before && renderIcon(before, beforeAlign, styles['FormField__before']),
                    /*#__PURE__*/ _jsx("div", {
                        className: styles['FormField__content'],
                        children: children
                    }),
                    after && renderIcon(after, afterAlign, classNames(styles['FormField__after'], 'vkuiInternalFormField__after'))
                ]
            }),
            /*#__PURE__*/ _jsx("span", {
                "aria-hidden": true,
                className: styles['FormField__border']
            })
        ]
    });
};

//# sourceMappingURL=FormField.js.map