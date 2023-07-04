import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @see https://vkcom.github.io/VKUI/#/Card
 */ export var Card = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "tint" : _param_mode, children = _param.children, getRootRef = _param.getRootRef, className = _param.className, restProps = _object_without_properties(_param, [
        "mode",
        "children",
        "getRootRef",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({}, restProps), {
        ref: getRootRef,
        className: classNames("vkuiCard", mode === "outline" && "vkuiCard--mode-outline", mode === "shadow" && "vkuiCard--mode-shadow", className)
    }), children);
};

//# sourceMappingURL=Card.js.map