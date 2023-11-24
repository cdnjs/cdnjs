import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { RootComponent } from "../RootComponent/RootComponent";
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */ export var Spacing = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? 8 : _param_size, styleProp = _param.style, restProps = _object_without_properties(_param, [
        "size",
        "style"
    ]);
    var style = _object_spread({
        height: size,
        padding: "".concat(size / 2, "px 0")
    }, styleProp);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: "vkuiSpacing",
        style: style
    }));
};

//# sourceMappingURL=Spacing.js.map