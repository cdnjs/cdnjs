import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Caption } from "../Typography/Caption/Caption.js";
import { Headline } from "../Typography/Headline/Headline.js";
const modeClassNames = {
    secondary: "vkuiCounter__modeSecondary",
    primary: "vkuiCounter__modePrimary",
    prominent: "vkuiCounter__modeProminent",
    contrast: "vkuiCounter__modeContrast",
    inherit: "vkuiCounter__modeInherit"
};
const sizeClassNames = {
    s: "vkuiCounter__sizeS",
    m: "vkuiCounter__sizeM"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Counter
 */ export const Counter = (_param)=>{
    var { mode = 'inherit', size = 'm', children, className } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "size",
        "children",
        "className"
    ]);
    if (React.Children.count(children) === 0) {
        return null;
    }
    const CounterTypography = size === 's' ? Caption : Headline;
    const counterLevel = size === 's' ? '1' : '2';
    return /*#__PURE__*/ _jsx(CounterTypography, _object_spread_props(_object_spread({}, restProps), {
        Component: "span",
        className: classNames('vkuiInternalCounter', "vkuiCounter__host", modeClassNames[mode], sizeClassNames[size], className),
        level: counterLevel,
        children: children
    }));
};

//# sourceMappingURL=Counter.js.map