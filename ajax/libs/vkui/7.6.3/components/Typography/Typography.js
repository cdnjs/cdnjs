import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
const stylesWeight = {
    '1': "vkuiTypography__weight1",
    '2': "vkuiTypography__weight2",
    '3': "vkuiTypography__weight3"
};
export function weightClassNames(weight, useAccentWeight = false) {
    if (!weight) {
        return '';
    }
    return classNames(stylesWeight[weight], useAccentWeight && "vkuiTypography__accent");
}
export const Typography = (_param)=>{
    var { weight, useAccentWeight, Component = 'span', normalize, inline } = _param, restProps = _object_without_properties(_param, [
        "weight",
        "useAccentWeight",
        "Component",
        "normalize",
        "inline"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({
        Component: Component,
        baseClassName: classNames("vkuiTypography__host", normalize && "vkuiTypography__normalize", inline && "vkuiTypography__inline", weightClassNames(weight, useAccentWeight))
    }, restProps));
};

//# sourceMappingURL=Typography.js.map