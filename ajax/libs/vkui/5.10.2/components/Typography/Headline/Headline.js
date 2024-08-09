import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity";
import { SizeType } from "../../../lib/adaptivity";
import { Typography } from "../Typography";
var stylesLevel = {
    "1": "vkuiHeadline--level-1",
    "2": "vkuiHeadline--level-2"
};
var sizeYClassNames = _define_property({
    none: "vkuiHeadline--sizeY-none"
}, SizeType.COMPACT, "vkuiHeadline--sizeY-compact");
/**
 * Используется для подзаголовков.
 *
 * @see https://vkcom.github.io/VKUI/#/Headline
 */ export var Headline = function(_param) {
    var className = _param.className, _param_weight = _param.weight, weight = _param_weight === void 0 ? "3" : _param_weight, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, _param_Component = _param.Component, Component = _param_Component === void 0 ? "h4" : _param_Component, _param_normalize = _param.normalize, normalize = _param_normalize === void 0 ? true : _param_normalize, restProps = _object_without_properties(_param, [
        "className",
        "weight",
        "level",
        "Component",
        "normalize"
    ]);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ React.createElement(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        weight: weight,
        className: classNames(className, sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=Headline.js.map