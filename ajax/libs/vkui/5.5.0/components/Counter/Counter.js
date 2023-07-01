import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Caption } from "../Typography/Caption/Caption";
import { Headline } from "../Typography/Headline/Headline";
var modeClassNames = {
    secondary: "vkuiCounter--mode-secondary",
    primary: "vkuiCounter--mode-primary",
    prominent: "vkuiCounter--mode-prominent",
    contrast: "vkuiCounter--mode-contrast",
    inherit: "vkuiCounter--mode-inherit"
};
var sizeClassNames = {
    s: "vkuiCounter--size-s",
    m: "vkuiCounter--size-m"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Counter
 */ export var Counter = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "inherit" : _param_mode, _param_size = _param.size, size = _param_size === void 0 ? "m" : _param_size, children = _param.children, className = _param.className, restProps = _object_without_properties(_param, [
        "mode",
        "size",
        "children",
        "className"
    ]);
    if (React.Children.count(children) === 0) {
        return null;
    }
    var CounterTypography = size === "s" ? Caption : Headline;
    var counterLevel = size === "s" ? "1" : "2";
    return /*#__PURE__*/ React.createElement(CounterTypography, _object_spread_props(_object_spread({}, restProps), {
        Component: "span",
        className: classNames("vkuiInternalCounter", "vkuiCounter", modeClassNames[mode], sizeClassNames[size], className),
        level: counterLevel
    }), children);
};

//# sourceMappingURL=Counter.js.map