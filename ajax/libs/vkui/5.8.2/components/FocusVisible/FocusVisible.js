import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent";
var stylesMode = {
    inside: "vkuiFocusVisible--mode-inside",
    outside: "vkuiFocusVisible--mode-outside",
    outline: "vkuiFocusVisible--mode-outline"
};
/**
 * @see https://vkcom.github.io/VKUI/#/FocusVisible
 */ export var FocusVisible = function(_param) /*#__PURE__*/ {
    var visible = _param.visible, mode = _param.mode, thin = _param.thin, restProps = _object_without_properties(_param, [
        "visible",
        "mode",
        "thin"
    ]);
    return React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        "aria-hidden": true,
        baseClassName: classNames("vkuiFocusVisible", visible && "vkuiFocusVisible--visible", thin && "vkuiFocusVisible--thin", stylesMode[mode])
    }));
};

//# sourceMappingURL=FocusVisible.js.map