import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
const stylesWeight = {
    '1': "Typography__weight1--Zhbke",
    '2': "Typography__weight2--xeSn-",
    '3': "Typography__weight3--C4GjY"
};
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
        baseClassName: classNames("Typography__host--ylaVq", normalize && "Typography__normalize--nY0T-", inline && "Typography__inline--oEGFC", weight && stylesWeight[weight], weight && useAccentWeight && "Typography__accent--OaApy")
    }, restProps));
};

//# sourceMappingURL=Typography.js.map