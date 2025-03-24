import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Caption } from "../Typography/Caption/Caption.js";
import { Headline } from "../Typography/Headline/Headline.js";
const modeClassNames = {
    secondary: "Counter__modeSecondary--JQU8u",
    primary: "Counter__modePrimary--oPq0j",
    prominent: "Counter__modeProminent--zvjU0",
    contrast: "Counter__modeContrast--gi8vi",
    inherit: "Counter__modeInherit--TknRH"
};
const sizeClassNames = {
    s: "Counter__sizeS--jzAJf",
    m: "Counter__sizeM--yiy1y"
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
        className: classNames('vkuiInternalCounter', "Counter__host--ShKfO", modeClassNames[mode], sizeClassNames[size], className),
        level: counterLevel,
        children: children
    }));
};

//# sourceMappingURL=Counter.js.map