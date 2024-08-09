import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { warnOnce } from "../../lib/warnOnce";
import { RootComponent } from "../RootComponent/RootComponent";
var stylesMode = {
    tint: "vkuiGradient--mode-tint",
    black: "vkuiGradient--mode-black",
    white: "vkuiGradient--mode-white"
};
var warn = warnOnce("UsersStack");
/**
 * @see https://vkcom.github.io/VKUI/#/Gradient
 */ export var Gradient = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "tint" : _param_mode, _param_to = _param.to, to = _param_to === void 0 ? "top" : _param_to, restProps = _object_without_properties(_param, [
        "mode",
        "to"
    ]);
    if (process.env.NODE_ENV === "development" && (mode === "black" || mode === "white")) {
        // TODO [>=6]: Удалить
        warn('Значения "black" и "white" свойства "mode" будут удалены в v6. Используйте "tint" или "default"');
    }
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({
        role: "presentation"
    }, restProps), {
        baseClassName: classNames("vkuiGradient", mode !== "default" && stylesMode[mode], to === "bottom" && "vkuiGradient--to-bottom")
    }));
};

//# sourceMappingURL=Gradient.js.map