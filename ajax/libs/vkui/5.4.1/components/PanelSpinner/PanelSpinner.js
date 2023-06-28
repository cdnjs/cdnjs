import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
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