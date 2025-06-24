'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { useFocusVisible } from "../../hooks/useFocusVisible.js";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./Switch.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
/**
 * @see https://vkcom.github.io/VKUI/#/Switch
 */ export const Switch = ({ style, className, getRootRef, getRef, checked: checkedProp, disabled, onBlur: onBlurProp, onFocus: onFocusProp, onClick, ...restProps })=>{
    const direction = useConfigDirection();
    const isRtl = direction === 'rtl';
    const platform = usePlatform();
    const { sizeY = 'none' } = useAdaptivity();
    const { focusVisible, onBlur, onFocus } = useFocusVisible();
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: 'outside'
    });
    const handleBlur = callMultiple(onBlur, onBlurProp);
    const handleFocus = callMultiple(onFocus, onFocusProp);
    const [localUncontrolledChecked, setLocalUncontrolledChecked] = React.useState(Boolean(restProps.defaultChecked));
    const isControlled = checkedProp !== undefined;
    const syncUncontrolledCheckedStateOnClick = React.useCallback((e)=>{
        if (isControlled) {
            return;
        }
        const switchTarget = e.target;
        setLocalUncontrolledChecked(switchTarget.checked);
    }, [
        isControlled
    ]);
    const inputProps = {
        ...restProps,
        Component: 'input',
        getRootRef: getRef,
        type: 'checkbox',
        role: 'switch',
        disabled: disabled,
        onBlur: onBlurProp,
        onFocus: onFocusProp,
        onClick: callMultiple(syncUncontrolledCheckedStateOnClick, onClick)
    };
    if (isControlled) {
        inputProps.checked = checkedProp;
        inputProps['aria-checked'] = checkedProp ? 'true' : 'false';
    } else {
        inputProps['aria-checked'] = localUncontrolledChecked ? 'true' : 'false';
    }
    return /*#__PURE__*/ _jsxs("label", {
        className: classNames(styles.host, sizeY !== 'regular' && sizeYClassNames[sizeY], platform === 'ios' ? styles.ios : styles.default, disabled && styles.disabled, isRtl && styles.rtl, focusVisibleClassNames, className),
        style: style,
        ref: getRootRef,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                ...inputProps,
                className: styles.inputNative,
                onBlur: handleBlur,
                onFocus: handleFocus
            }),
            /*#__PURE__*/ _jsxs("span", {
                "aria-hidden": true,
                className: styles.inputFake,
                children: [
                    /*#__PURE__*/ _jsx("span", {
                        className: styles.track
                    }),
                    /*#__PURE__*/ _jsx("span", {
                        "aria-hidden": true,
                        className: classNames(styles.handle, platform !== 'ios' && !disabled && styles.handleWithRipple)
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=Switch.js.map