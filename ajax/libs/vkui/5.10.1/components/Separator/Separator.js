import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent";
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */ export var Separator = function(_param) /*#__PURE__*/ {
    var wide = _param.wide, restProps = _object_without_properties(_param, [
        "wide"
    ]);
    return React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiSeparator", !wide && "vkuiSeparator--padded")
    }), /*#__PURE__*/ React.createElement("hr", {
        className: "vkuiSeparator__in"
    }));
};

//# sourceMappingURL=Separator.js.map