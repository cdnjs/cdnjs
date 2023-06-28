import _define_property from "@swc/helpers/src/_define_property.mjs";
import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity";
import { SizeType } from "../../../lib/adaptivity";
var sizeYClassNames = _define_property({
    none: "vkuiHeadline--sizeY-none"
}, SizeType.COMPACT, "vkuiHeadline--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/Headline
 */ export var Headline = function(_param) {
    var className = _param.className, children = _param.children, _param_weight = _param.weight, weight = _param_weight === void 0 ? "3" : _param_weight, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, _param_Component = _param.Component, Component = _param_Component === void 0 ? "h4" : _param_Component, getRootRef = _param.getRootRef, restProps = _object_without_properties(_param, [
        "className",
        "children",
        "weight",
        "level",
        "Component",
        "getRootRef"
    ]);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, restProps), {
        ref: getRootRef,
        className: classNames(className, "vkuiHeadline", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], {
            "1": "vkuiHeadline--level-1",
            "2": "vkuiHeadline--level-2"
        }[level], {
            "1": "vkuiHeadline--weight-1",
            "2": "vkuiHeadline--weight-2",
            "3": "vkuiHeadline--weight-3"
        }[weight])
    }), children);
};

//# sourceMappingURL=Headline.js.map