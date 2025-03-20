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
    var { size = 'm', style, className } = _param, restProps = _object_without_properties(_param, [
        "size",
        "style",
        "className"
    ]);
    if (typeof size === 'string') {
        className = className ? classNames(sizesClassNames[size], className) : sizesClassNames[size];
    } else {
        if (style) {
            // @ts-expect-error: TS7053 В React.CSSProperties не учитывается Custom Properties
            style[CUSTOM_CSS_TOKEN_FOR_USER_GAP] = size;
        } else {
            // @ts-expect-error: TS2353 В React.CSSProperties не учитывается Custom Properties
            style = {
                [CUSTOM_CSS_TOKEN_FOR_USER_GAP]: size
            };
        }
    }
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        style: style,
        className: className,
        baseClassName: "vkuiSpacing"
    }));
};

//# sourceMappingURL=Spacing.js.map