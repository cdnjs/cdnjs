import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Slider } from "../Slider/Slider";
/**
 * @see https://vkcom.github.io/VKUI/#/RangeSlider
 *
 * @deprecated 5.5.0
 *
 * Компонент устарел и будет удален в v6. Используйте [`Slider`](#/Slider).
 */ export var RangeSlider = function(_param) {
    var _param_step = _param.step, step = _param_step === void 0 ? 0 : _param_step, _param_min = _param.min, min = _param_min === void 0 ? 0 : _param_min, _param_max = _param.max, max = _param_max === void 0 ? 100 : _param_max, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? [
        min,
        max
    ] : _param_defaultValue, restProps = _object_without_properties(_param, [
        "step",
        "min",
        "max",
        "defaultValue"
    ]);
    return /*#__PURE__*/ React.createElement(Slider, _object_spread_props(_object_spread({
        step: step,
        min: min,
        max: max,
        defaultValue: defaultValue
    }, restProps), {
        multiple: true
    }));
};

//# sourceMappingURL=RangeSlider.js.map