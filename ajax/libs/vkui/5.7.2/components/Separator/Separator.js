import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */ export var Separator = function(_param) /*#__PURE__*/ {
    var wide = _param.wide, className = _param.className, restProps = _object_without_properties(_param, [
        "wide",
        "className"
    ]);
    return React.createElement("div", _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiSeparator", !wide && "vkuiSeparator--padded", className)
    }), /*#__PURE__*/ React.createElement("hr", {
        className: "vkuiSeparator__in"
    }));
};

//# sourceMappingURL=Separator.js.map