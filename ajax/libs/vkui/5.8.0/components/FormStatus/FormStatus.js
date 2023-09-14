import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Banner } from "../Banner/Banner";
/**
 * @see https://vkcom.github.io/VKUI/#/FormStatus
 */ export var FormStatus = function(_param) {
    var mode = _param.mode, children = _param.children, className = _param.className, restProps = _object_without_properties(_param, [
        "mode",
        "children",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(Banner, _object_spread_props(_object_spread({}, restProps), {
        subheader: children,
        className: classNames("vkuiInternalFormStatus", mode === "error" && classNames("vkuiFormStatus--mode-error", "vkuiInternalFormStatus--mode-error"), className)
    }));
};

//# sourceMappingURL=FormStatus.js.map