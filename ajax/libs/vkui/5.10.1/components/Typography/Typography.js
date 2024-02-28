import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent";
var stylesWeight = {
    "1": "vkuiTypography--weight-1",
    "2": "vkuiTypography--weight-2",
    "3": "vkuiTypography--weight-3"
};
export var Typography = function(_param) /*#__PURE__*/ {
    var weight = _param.weight, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, normalize = _param.normalize, restProps = _object_without_properties(_param, [
        "weight",
        "Component",
        "normalize"
    ]);
    return React.createElement(RootComponent, _object_spread({
        Component: Component,
        baseClassName: classNames("vkuiTypography", normalize && "vkuiTypography--normalize", weight && stylesWeight[weight])
    }, restProps));
};

//# sourceMappingURL=Typography.js.map