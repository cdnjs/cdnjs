import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import _sliced_to_array from "@swc/helpers/src/_sliced_to_array.mjs";
import * as React from "react";
import { clamp } from "../../helpers/math";
import { UniversalSlider } from "./UniversalSlider";
/**
 * @see https://vkcom.github.io/VKUI/#/RangeSlider
 */ export var RangeSlider = function(_param) {
    var onChange = _param.onChange, _param_min = _param.min, min = _param_min === void 0 ? 0 : _param_min, _param_max = _param.max, max = _param_max === void 0 ? 100 : _param_max, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? [
        min,
        max
    ] : _param_defaultValue, _param_step = _param.step, step = _param_step === void 0 ? 0 : _param_step, props = _object_without_properties(_param, [
        "onChange",
        "min",
        "max",
        "defaultValue",
        "step"
    ]);
    var isControlled = props.value !== undefined;
    var _React_useState = _sliced_to_array(React.useState(defaultValue), 2), localValue = _React_useState[0], setValue = _React_useState[1];
    var _ref = _sliced_to_array(props.value || localValue, 2), start = _ref[0], end = _ref[1];
    var value = React.useMemo(function() {
        return [
            clamp(start, min, max),
            clamp(end, min, max)
        ];
    }, [
        end,
        max,
        min,
        start
    ]);
    var handleChange = React.useCallback(function(nextValue, event) {
        if (props.disabled || value[0] === nextValue[0] && value[1] === nextValue[1]) {
            return;
        }
        !isControlled && setValue(nextValue);
        onChange && onChange(nextValue, event);
    }, [
        props.disabled,
        value,
        isControlled,
        onChange
    ]);
    return /*#__PURE__*/ React.createElement(UniversalSlider, _object_spread_props(_object_spread({}, props), {
        value: value,
        onChange: handleChange,
        min: min,
        max: max,
        step: step
    }));
};

//# sourceMappingURL=RangeSlider.js.map