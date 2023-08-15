import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @see https://vkcom.github.io/VKUI/#/RadioGroup
 */ export var RadioGroup = function(_param) /*#__PURE__*/ {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "vertical" : _param_mode, children = _param.children, className = _param.className, restProps = _object_without_properties(_param, [
        "mode",
        "children",
        "className"
    ]);
    return React.createElement("div", _object_spread({
        className: classNames("vkuiRadioGroup", "vkuiInternalRadioGroup", mode === "horizontal" && "vkuiRadioGroup--mode-horizontal", className)
    }, restProps), children);
};

//# sourceMappingURL=RadioGroup.js.map