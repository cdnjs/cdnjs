import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
export function useEnsuredControl(_param) {
    var onChangeProp = _param.onChange, disabled = _param.disabled, props = _object_without_properties(_param, [
        "onChange",
        "disabled"
    ]);
    var _useCustomEnsuredControl = _sliced_to_array(useCustomEnsuredControl(props), 2), value = _useCustomEnsuredControl[0], onChangeValue = _useCustomEnsuredControl[1];
    var onChange = React.useCallback(function(e) {
        if (disabled) {
            return;
        }
        onChangeValue(e.target.value);
        onChangeProp && onChangeProp(e);
    }, [
        onChangeValue,
        onChangeProp,
        disabled
    ]);
    return [
        value,
        onChange
    ];
}
export function useCustomEnsuredControl(param) {
    var disabled = param.disabled, onChangeProp = param.onChange, defaultValue = param.defaultValue, value = param.value;
    var isControlled = value !== undefined;
    var _React_useState = _sliced_to_array(React.useState(defaultValue), 2), localValue = _React_useState[0], setLocalValue = _React_useState[1];
    var onChange = React.useCallback(function(v) {
        if (disabled) {
            return;
        }
        !isControlled && setLocalValue(v);
        onChangeProp && onChangeProp(v);
    }, [
        disabled,
        isControlled,
        onChangeProp
    ]);
    return [
        isControlled ? value : localValue,
        onChange
    ];
}

//# sourceMappingURL=useEnsuredControl.js.map