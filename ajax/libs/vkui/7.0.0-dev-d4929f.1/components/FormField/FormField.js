'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName.js";
import { useFocusWithin } from "../../hooks/useFocusWithin.js";
const sizeYClassNames = {
    none: "FormField__sizeYNone--zS4Ih",
    compact: "FormField__sizeYCompact--aA-mz"
};
const stylesStatus = {
    error: "FormField__statusError--beIHJ",
    valid: "FormField__statusValid--BByVY"
};
const iconAlignClassNames = {
    center: undefined,
    start: "FormField__iconAlignStart--jRZLr",
    end: "FormField__iconAlignEnd--NJPYM"
};
const renderIcon = (icon, align, className)=>{
    return /*#__PURE__*/ _jsx("div", {
        className: "FormField__iconWrapper--kFv-q",
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
        mode: "FormField__focusVisible--QByb7"
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
        style: _object_spread({
            maxHeight
        }, style),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        className: classNames("FormField__host--URDG3", mode === 'default' && "FormField__modeDefault--qw-Fn", status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], disabled && "FormField__disabled--1oUOU", !disabled && hover && "FormField__hover--Mg48T", focusVisibleClassNames, className),
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: "FormField__scrollContainer--1jrJW",
                children: [
                    before && renderIcon(before, beforeAlign, "FormField__before--c4X8a"),
                    /*#__PURE__*/ _jsx("div", {
                        className: "FormField__content--NJCkH",
                        children: children
                    }),
                    after && renderIcon(after, afterAlign, classNames("FormField__after--OMb5-", 'vkuiInternalFormField__after'))
                ]
            }),
            /*#__PURE__*/ _jsx("span", {
                "aria-hidden": true,
                className: "FormField__border--X04PT"
            })
        ]
    }));
};

//# sourceMappingURL=FormField.js.map