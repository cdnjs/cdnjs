import _define_property from "@swc/helpers/src/_define_property.mjs";
import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { SizeType } from "../../lib/adaptivity";
var sizeXClassNames = _define_property({
    none: "vkuiCardGrid--sizeX-none"
}, SizeType.COMPACT, "vkuiCardGrid--sizeX-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/CardGrid
 */ export var CardGrid = function(_param) {
    var children = _param.children, _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, _param_spaced = _param.spaced, spaced = _param_spaced === void 0 ? false : _param_spaced, className = _param.className, restProps = _object_without_properties(_param, [
        "children",
        "size",
        "spaced",
        "className"
    ]);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeX = _useAdaptivity.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiCardGrid", spaced && "vkuiCardGrid--spaced", {
            s: "vkuiCardGrid--size-s",
            m: "vkuiCardGrid--size-m",
            l: "vkuiCardGrid--size-l"
        }[size], sizeX !== SizeType.REGULAR && sizeXClassNames[sizeX], className)
    }), children);
};

//# sourceMappingURL=CardGrid.js.map