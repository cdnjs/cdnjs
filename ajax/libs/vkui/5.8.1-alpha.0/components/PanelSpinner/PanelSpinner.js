import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Spinner } from "../Spinner/Spinner";
/**
 * @see https://vkcom.github.io/VKUI/#/PanelSpinner
 */ export var PanelSpinner = /*#__PURE__*/ React.memo(function(_param) /*#__PURE__*/ {
    var _param_height = _param.height, height = _param_height === void 0 ? 96 : _param_height, style = _param.style, restProps = _object_without_properties(_param, [
        "height",
        "style"
    ]);
    return React.createElement(Spinner, _object_spread_props(_object_spread({
        size: "regular"
    }, restProps), {
        style: _object_spread({
            height: height
        }, style)
    }));
});
PanelSpinner.displayName = "PanelSpinner";

//# sourceMappingURL=PanelSpinner.js.map