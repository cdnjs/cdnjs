import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';
import { useFocusWithin } from '../../hooks/useFocusWithin';
const sizeYClassNames = {
    none: "vkuiFormField--sizeY-none",
    ['compact']: "vkuiFormField--sizeY-compact"
};
const stylesStatus = {
    error: "vkuiFormField--status-error",
    valid: "vkuiFormField--status-valid"
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormField
 */ export const FormField = (_param)=>{
    var { Component = 'span', status = 'default', children, getRootRef, before, after, disabled, mode = 'default', className } = _param, restProps = _object_without_properties(_param, [
        "Component",
        "status",
        "children",
        "getRootRef",
        "before",
        "after",
        "disabled",
        "mode",
        "className"
    ]);
    const elRef = useExternRef(getRootRef);
    const { sizeY = 'none' } = useAdaptivity();
    const [hover, setHover] = React.useState(false);
    const focusWithin = useFocusWithin(elRef);
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible: focusWithin,
        mode: "vkuiFormField--focus-visible"
    });
    const handleMouseEnter = (e)=>{
        e.stopPropagation();
        setHover(true);
    };
    const handleMouseLeave = (e)=>{
        e.stopPropagation();
        setHover(false);
    };
    return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, restProps), {
        ref: elRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        className: classNames("vkuiFormField", mode === 'default' && "vkuiFormField--mode-default", status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], disabled && "vkuiFormField--disabled", !disabled && hover && "vkuiFormField--hover", focusVisibleClassNames, className)
    }), before && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiFormField__before"
    }, before), children, after && /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiFormField__after", 'vkuiInternalFormField__after')
    }, after), /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: "vkuiFormField__border"
    }));
};

//# sourceMappingURL=FormField.js.map