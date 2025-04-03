import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
export const InputLikeDivider = (_param)=>{
    var { children, className } = _param, props = _object_without_properties(_param, [
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _jsx("span", _object_spread_props(_object_spread({
        className: classNames("vkuiInputLike__divider", className)
    }, props), {
        children: children
    }));
};

//# sourceMappingURL=InputLikeDivider.js.map