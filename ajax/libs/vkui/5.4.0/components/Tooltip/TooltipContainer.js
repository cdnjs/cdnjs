import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
export var tooltipContainerAttr = "data-tooltip-container";
export var TooltipContainer = /*#__PURE__*/ React.forwardRef(function TooltipContainer(_param, ref) {
    var _param_fixed = _param.fixed, fixed = _param_fixed === void 0 ? false : _param_fixed, props = _object_without_properties(_param, [
        "fixed"
    ]);
    props[tooltipContainerAttr] = fixed ? "fixed" : "true";
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({}, props), {
        ref: ref
    }));
});

//# sourceMappingURL=TooltipContainer.js.map