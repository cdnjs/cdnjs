import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';
import { useFocusWithin } from '../../hooks/useFocusWithin';
const sizeYClassNames = {
    none: "vkuiFormField--sizeY-none",
    compact: "vkuiFormField--sizeY-compact"
};
const stylesStatus = {
    error: "vkuiFormField--status-error",
    valid: "vkuiFormField--status-valid"
};
const iconAlignClassNames = {
    center: undefined,
    start: "vkuiFormField__icon--align-start",
    end: "vkuiFormField__icon--align-end"
};
const renderIcon = (icon, align, className)=>{
    return /*#__PURE__*/ _jsx("div", {
        className: "vkuiFormField__iconWrapper",
        children: /*#__PURE__*/ _jsx("span", {
            className: classNames(iconAlignClassNames[align], className),
            children: icon
        })
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormField
 */ export const FormField = (_param)=>{
    var { Component = 'span', status = 'default', children, getRootRef, before, after, beforeAlign = 'center', afterAlign = 'center', disabled, mode = 'default', className, maxHeight, style } = _param, restProps = _object_without_properties(_param, [
        "Component",
        "status",
        "children",
        "getRootRef",
        "before",
        "after",
        "beforeAlign",
        "afterAlign",
        "disabled",
        "mode",
        "className",
        "maxHeight",
        "style"
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
    return /*#__PURE__*/ _jsxs(Component, _object_spread_props(_object_spread({}, restProps), {
        ref: elRef,
        style: maxHeight !== undefined ? _object_spread_props(_object_spread({}, style), {
            maxHeight
        }) : style,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        className: classNames("vkuiFormField", mode === 'default' && "vkuiFormField--mode-default", status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], disabled && "vkuiFormField--disabled", !disabled && hover && "vkuiFormField--hover", focusVisibleClassNames, className),
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiFormField_scrollContainer",
                children: [
                    before && renderIcon(before, beforeAlign, "vkuiFormField__before"),
                    /*#__PURE__*/ _jsx("div", {
                        className: "vkuiFormField__content",
                        children: children
                    }),
                    after && renderIcon(after, afterAlign, classNames("vkuiFormField__after", 'vkuiInternalFormField__after'))
                ]
            }),
            /*#__PURE__*/ _jsx("span", {
                "aria-hidden": true,
                className: "vkuiFormField__border"
            })
        ]
    }));
};

//# sourceMappingURL=FormField.js.map