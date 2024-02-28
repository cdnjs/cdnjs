import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent";
var stylesMode = {
    new: "vkuiBadge--mode-new",
    prominent: "vkuiBadge--mode-prominent"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Badge
 */ export var Badge = function(_param) /*#__PURE__*/ {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "new" : _param_mode, restProps = _object_without_properties(_param, [
        "mode"
    ]);
    return React.createElement(RootComponent, _object_spread({
        Component: "span",
        baseClassName: classNames("vkuiBadge", stylesMode[mode])
    }, restProps));
};

//# sourceMappingURL=Badge.js.map