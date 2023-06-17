import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import _sliced_to_array from "@swc/helpers/src/_sliced_to_array.mjs";
import * as React from "react";
import { clamp } from "../../helpers/math";
import { UniversalSlider } from "../RangeSlider/UniversalSlider";
/**
 * @see https://vkcom.github.io/VKUI/#/Slider
 */ export var Slider = function(_param) {
    var onChange = _param.onChange, _param_min = _param.min, min = _param_min === void 0 ? 0 : _param_min, _param_max = _param.max, max = _param_max === void 0 ? 100 : _param_max, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? min : _param_defaultValue, value = _param.value, props = _object_without_properties(_param, [
        "onChange",
        "min",
        "max",
        "defaultValue",
        "value"
    ]);
    var isControlled = value !== undefined;
    var _React_useState = _sliced_to_array(React.useState(defaultValue), 2), localValue = _React_useState[0], setValue = _React_useState[1];
    var _value = clamp(isControlled ? value : localValue, min, max);
    var handleChange = React.useCallback(function(nextValue, event) {
        if (props.disabled || _value === nextValue[1]) {
            return;
        }
        !isControlled && setValue(nextValue[1]);
        onChange && onChange(nextValue[1], event);
    }, [
        props.disabled,
        _value,
        isControlled,
        onChange
    ]);
    var rangeValue = React.useMemo(function() {
        return [
            null,
            _value
        ];
    }, [
        _value
    ]);
    return /*#__PURE__*/ React.createElement(UniversalSlider, _object_spread_props(_object_spread({}, props), {
        value: rangeValue,
        onChange: handleChange,
        min: min,
        max: max
    }));
};

//# sourceMappingURL=Slider.js.map