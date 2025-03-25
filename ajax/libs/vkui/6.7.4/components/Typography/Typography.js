import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
const stylesWeight = {
    '1': "vkuiTypography--weight-1",
    '2': "vkuiTypography--weight-2",
    '3': "vkuiTypography--weight-3"
};
export const Typography = (_param)=>{
    var { weight, // TODO [>=7]: сделать по умолчанию false (нужен будет кодмод)
    useAccentWeight = true, Component = 'span', normalize, inline } = _param, restProps = _object_without_properties(_param, [
        "weight",
        "useAccentWeight",
        "Component",
        "normalize",
        "inline"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({
        Component: Component,
        baseClassName: classNames("vkuiTypography", normalize && "vkuiTypography--normalize", inline && "vkuiTypography--inline", weight && stylesWeight[weight], weight && useAccentWeight && "vkuiTypography--accent")
    }, restProps));
};

//# sourceMappingURL=Typography.js.map