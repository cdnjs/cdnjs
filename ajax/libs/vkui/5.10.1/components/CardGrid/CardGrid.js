import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { SizeType } from "../../lib/adaptivity";
import { RootComponent } from "../RootComponent/RootComponent";
var sizeXClassNames = _define_property({
    none: "vkuiCardGrid--sizeX-none"
}, SizeType.COMPACT, "vkuiCardGrid--sizeX-compact");
var stylesSize = {
    s: "vkuiInternalCardGrid--size-s",
    m: "vkuiInternalCardGrid--size-m",
    l: "vkuiInternalCardGrid--size-l"
};
/**
 * @see https://vkcom.github.io/VKUI/#/CardGrid
 */ export var CardGrid = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, _param_spaced = _param.spaced, spaced = _param_spaced === void 0 ? false : _param_spaced, restProps = _object_without_properties(_param, [
        "size",
        "spaced"
    ]);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeX = _useAdaptivity.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiCardGrid", "vkuiInternalCardGrid", spaced && "vkuiCardGrid--spaced", stylesSize[size], sizeX !== SizeType.REGULAR && sizeXClassNames[sizeX])
    }));
};

//# sourceMappingURL=CardGrid.js.map