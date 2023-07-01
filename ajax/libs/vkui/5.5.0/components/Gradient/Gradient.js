import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @see https://vkcom.github.io/VKUI/#/Gradient
 */ export var Gradient = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "tint" : _param_mode, children = _param.children, _param_to = _param.to, to = _param_to === void 0 ? "top" : _param_to, className = _param.className, restProps = _object_without_properties(_param, [
        "mode",
        "children",
        "to",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({
        role: "presentation"
    }, restProps), {
        className: classNames({
            tint: "vkuiGradient--mode-tint",
            black: "vkuiGradient--mode-black",
            white: "vkuiGradient--mode-white"
        }[mode], {
            top: "vkuiGradient--to-top",
            bottom: "vkuiGradient--to-bottom"
        }[to], className)
    }), children);
};

//# sourceMappingURL=Gradient.js.map