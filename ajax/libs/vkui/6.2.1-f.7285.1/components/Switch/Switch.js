import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useFocusVisible } from '../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';
import { usePlatform } from '../../hooks/usePlatform';
import { callMultiple } from '../../lib/callMultiple';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
const sizeYClassNames = {
    none: "vkuiSwitch--sizeY-none",
    compact: "vkuiSwitch--sizeY-compact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Switch
 */ export const Switch = (_param)=>{
    var { style, className, getRootRef, getRef, checked: checkedProp, disabled, onBlur: onBlurProp, onFocus: onFocusProp, onClick } = _param, restProps = _object_without_properties(_param, [
        "style",
        "className",
        "getRootRef",
        "getRef",
        "checked",
        "disabled",
        "onBlur",
        "onFocus",
        "onClick"
    ]);
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
    const inputProps = _object_spread_props(_object_spread({}, restProps), {
        Component: 'input',
        getRootRef: getRef,
        type: 'checkbox',
        role: 'switch',
        disabled: disabled,
        onBlur: onBlurProp,
        onFocus: onFocusProp,
        onClick: callMultiple(syncUncontrolledCheckedStateOnClick, onClick)
    });
    if (isControlled) {
        inputProps.checked = checkedProp;
        inputProps['aria-checked'] = checkedProp ? 'true' : 'false';
    } else {
        inputProps['aria-checked'] = localUncontrolledChecked ? 'true' : 'false';
    }
    return /*#__PURE__*/ _jsxs("label", {
        className: classNames("vkuiSwitch", sizeY !== 'regular' && sizeYClassNames[sizeY], platform === 'ios' ? "vkuiSwitch--ios" : "vkuiSwitch--default", disabled && "vkuiSwitch--disabled", focusVisibleClassNames, className),
        style: style,
        ref: getRootRef,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, _object_spread_props(_object_spread({}, inputProps), {
                className: "vkuiSwitch__inputNative",
                onBlur: handleBlur,
                onFocus: handleFocus
            })),
            /*#__PURE__*/ _jsxs("span", {
                "aria-hidden": true,
                className: "vkuiSwitch__inputFake",
                children: [
                    /*#__PURE__*/ _jsx("span", {
                        className: "vkuiSwitch__track"
                    }),
                    /*#__PURE__*/ _jsx("span", {
                        "aria-hidden": true,
                        className: classNames("vkuiSwitch__handle", platform !== 'ios' && !disabled && "vkuiSwitch__handle--withRipple")
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=Switch.js.map