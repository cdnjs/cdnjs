'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useFocusVisible } from "../../hooks/useFocusVisible.js";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
const sizeYClassNames = {
    none: "Switch__sizeYNone--uECbN",
    compact: "Switch__sizeYCompact--U5jIM"
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
        className: classNames("Switch__host--HbXpi", sizeY !== 'regular' && sizeYClassNames[sizeY], platform === 'ios' ? "Switch__ios--sk-5h" : "Switch__default--5Spsl", disabled && "Switch__disabled--2aZ0V", focusVisibleClassNames, className),
        style: style,
        ref: getRootRef,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, _object_spread_props(_object_spread({}, inputProps), {
                className: "Switch__inputNative--t-Mdj",
                onBlur: handleBlur,
                onFocus: handleFocus
            })),
            /*#__PURE__*/ _jsxs("span", {
                "aria-hidden": true,
                className: "Switch__inputFake--DM3hD",
                children: [
                    /*#__PURE__*/ _jsx("span", {
                        className: "Switch__track--7ObdZ"
                    }),
                    /*#__PURE__*/ _jsx("span", {
                        "aria-hidden": true,
                        className: classNames("Switch__handle--PPVe6", platform !== 'ios' && !disabled && "Switch__handleWithRipple--d-A5A")
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=Switch.js.map