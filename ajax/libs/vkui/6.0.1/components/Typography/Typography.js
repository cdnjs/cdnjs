import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
const stylesWeight = {
    '1': "vkuiTypography--weight-1",
    '2': "vkuiTypography--weight-2",
    '3': "vkuiTypography--weight-3"
};
export const Typography = (_param)=>{
    var { weight, Component = 'span', normalize } = _param, restProps = _object_without_properties(_param, [
        "weight",
        "Component",
        "normalize"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        Component: Component,
        baseClassName: classNames("vkuiTypography", normalize && "vkuiTypography--normalize", weight && stylesWeight[weight])
    }, restProps));
};

//# sourceMappingURL=Typography.js.map