import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @see https://vkcom.github.io/VKUI/#/Div
 */ export var Div = function(_param) {
    var children = _param.children, getRootRef = _param.getRootRef, className = _param.className, restProps = _object_without_properties(_param, [
        "children",
        "getRootRef",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({}, restProps), {
        ref: getRootRef,
        className: classNames("vkuiDiv", className)
    }), children);
};

//# sourceMappingURL=Div.js.map