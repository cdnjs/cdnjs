import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { RootComponent } from '../RootComponent/RootComponent';
export const ALLOWED_SIZES = [
    '3xs',
    '2xs',
    'xs',
    's',
    'm',
    'l',
    'xl',
    '2xl',
    '3xl',
    '4xl'
];
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */ export const Spacing = (_param)=>{
    var { size = 'm', style: styleProp } = _param, restProps = _object_without_properties(_param, [
        "size",
        "style"
    ]);
    const style = _object_spread({}, getSizeStyle(size), styleProp);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: "vkuiSpacing",
        style: style
    }));
};
function getSizeStyle(size) {
    const sizeValue = getSizeValue(size);
    return {
        height: sizeValue,
        padding: `calc(${sizeValue} / 2px) 0`
    };
}
function getSizeValue(size) {
    return typeof size === 'string' ? `var(--vkui--spacing_size_${size})` : size;
}

//# sourceMappingURL=Spacing.js.map