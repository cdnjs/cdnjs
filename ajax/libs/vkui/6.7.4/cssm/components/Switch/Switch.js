import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useFocusVisible } from '../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';
import { usePlatform } from '../../hooks/usePlatform';
import { callMultiple } from '../../lib/callMultiple';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './Switch.module.css';
const sizeYClassNames = {
    none: styles['Switch--sizeY-none'],
    compact: styles['Switch--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Switch
 */ export const Switch = ({ style, className, getRootRef, getRef, checked: checkedProp, disabled, onBlur: onBlurProp, onFocus: onFocusProp, onClick, ...restProps })=>{
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
        className: classNames(styles['Switch'], sizeY !== 'regular' && sizeYClassNames[sizeY], platform === 'ios' ? styles['Switch--ios'] : styles['Switch--default'], disabled && styles['Switch--disabled'], focusVisibleClassNames, className),
        style: style,
        ref: getRootRef,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                ...inputProps,
                className: styles['Switch__inputNative'],
                onBlur: handleBlur,
                onFocus: handleFocus
            }),
            /*#__PURE__*/ _jsxs("span", {
                "aria-hidden": true,
                className: styles['Switch__inputFake'],
                children: [
                    /*#__PURE__*/ _jsx("span", {
                        className: styles['Switch__track']
                    }),
                    /*#__PURE__*/ _jsx("span", {
                        "aria-hidden": true,
                        className: classNames(styles['Switch__handle'], platform !== 'ios' && !disabled && styles['Switch__handle--withRipple'])
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=Switch.js.map