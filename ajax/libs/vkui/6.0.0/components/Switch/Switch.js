import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
    ['compact']: "vkuiSwitch--sizeY-compact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Switch
 */ export const Switch = (_param)=>{
    var { style, className, getRootRef, getRef, checked: checkedProp } = _param, restProps = _object_without_properties(_param, [
        "style",
        "className",
        "getRootRef",
        "getRef",
        "checked"
    ]);
    const platform = usePlatform();
    const { sizeY = 'none' } = useAdaptivity();
    const { focusVisible, onBlur, onFocus } = useFocusVisible();
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: 'outside'
    });
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
    const ariaCheckedState = isControlled ? checkedProp : localUncontrolledChecked;
    return /*#__PURE__*/ React.createElement("label", {
        className: classNames("vkuiSwitch", platform === 'ios' && "vkuiSwitch--ios", sizeY !== 'regular' && sizeYClassNames[sizeY], restProps.disabled && "vkuiSwitch--disabled", focusVisibleClassNames, className),
        style: style,
        ref: getRootRef,
        onBlur: callMultiple(onBlur, restProps.onBlur),
        onFocus: callMultiple(onFocus, restProps.onFocus)
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, _object_spread_props(_object_spread({}, restProps, isControlled && {
        checked: checkedProp
    }), {
        Component: "input",
        getRootRef: getRef,
        onClick: callMultiple(syncUncontrolledCheckedStateOnClick, restProps.onClick),
        type: "checkbox",
        role: "switch",
        "aria-checked": ariaCheckedState ? 'true' : 'false',
        className: "vkuiSwitch__self"
    })), /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: "vkuiSwitch__pseudo"
    }));
};

//# sourceMappingURL=Switch.js.map