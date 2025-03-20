import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
export const CUSTOM_CSS_TOKEN_FOR_USER_GAP = '--vkui_internal--Spacing_gap';
export const sizesClassNames = {
    '3xs': "vkuiSpacing--3xs",
    '2xs': "vkuiSpacing--2xs",
    'xs': "vkuiSpacing--xs",
    's': "vkuiSpacing--s",
    'm': "vkuiSpacing--m",
    'l': "vkuiSpacing--l",
    'xl': "vkuiSpacing--xl",
    '2xl': "vkuiSpacing--2xl",
    '3xl': "vkuiSpacing--3xl",
    '4xl': "vkuiSpacing--4xl"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */ export const Spacing = (_param)=>{
    var { size = 'm', style } = _param, restProps = _object_without_properties(_param, [
        "size",
        "style"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        style: _object_spread({}, typeof size === 'number' && {
            [CUSTOM_CSS_TOKEN_FOR_USER_GAP]: `${size}px`
        }, style),
        baseClassName: classNames("vkuiSpacing", typeof size === 'string' && sizesClassNames[size])
    }));
};

//# sourceMappingURL=Spacing.js.map