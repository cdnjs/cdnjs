'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Headline } from "../Typography/Headline/Headline.js";
const modeClassNames = {
    primary: "vkuiCounter__modePrimary",
    contrast: "vkuiCounter__modeContrast",
    tertiary: "vkuiCounter__modeTertiary",
    inherit: "vkuiCounter__modeInherit"
};
const appearanceClassNames = {
    'custom': "vkuiCounter__appearanceCustom",
    'accent': "vkuiCounter__appearanceAccent",
    'neutral': "vkuiCounter__appearanceNeutral",
    'accent-green': "vkuiCounter__appearanceAccentGreen",
    'accent-red': "vkuiCounter__appearanceAccentRed"
};
const sizeClassNames = {
    s: "vkuiCounter__sizeS",
    m: "vkuiCounter__sizeM"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Counter
 */ export const Counter = (_param)=>{
    var { mode = 'inherit', appearance: appearanceProp, color, size = 'm', children, className, style: styleProp } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "appearance",
        "color",
        "size",
        "children",
        "className",
        "style"
    ]);
    const appearance = React.useMemo(()=>{
        if (mode === 'inherit') {
            return undefined;
        }
        if (appearanceProp) {
            return appearanceProp;
        }
        return 'accent';
    }, [
        appearanceProp,
        mode
    ]);
    const style = React.useMemo(()=>{
        if (mode === 'inherit' || appearance !== 'custom' || !color) {
            return undefined;
        }
        switch(mode){
            case 'primary':
                return {
                    '--vkui_internal--counter_background': color
                };
            case 'contrast':
            case 'tertiary':
                return {
                    '--vkui_internal--counter_foreground': color
                };
        }
    }, [
        appearance,
        color,
        mode
    ]);
    if (React.Children.count(children) === 0) {
        return null;
    }
    const CounterTypography = size === 's' ? Caption : Headline;
    const counterLevel = size === 's' ? '1' : '2';
    return /*#__PURE__*/ _jsx(CounterTypography, _object_spread_props(_object_spread({}, restProps), {
        style: mergeStyle(style, styleProp),
        Component: "span",
        className: classNames('vkuiInternalCounter', "vkuiCounter__host", modeClassNames[mode], !!appearance && appearanceClassNames[appearance], sizeClassNames[size], className),
        level: counterLevel,
        children: children
    }));
};

//# sourceMappingURL=Counter.js.map