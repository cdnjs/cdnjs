"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    useCustomEnsuredControl: function() {
        return useCustomEnsuredControl;
    },
    useEnsuredControl: function() {
        return useEnsuredControl;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function useEnsuredControl(_param) {
    var onChangeProp = _param.onChange, disabled = _param.disabled, props = _object_without_properties._(_param, [
        "onChange",
        "disabled"
    ]);
    var _useCustomEnsuredControl = _sliced_to_array._(useCustomEnsuredControl(props), 2), value = _useCustomEnsuredControl[0], onChangeValue = _useCustomEnsuredControl[1];
    var onChange = _react.useCallback(function(e) {
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
function useCustomEnsuredControl(param) {
    var disabled = param.disabled, onChangeProp = param.onChange, defaultValue = param.defaultValue, value = param.value;
    var isControlled = value !== undefined;
    var _React_useState = _sliced_to_array._(_react.useState(defaultValue), 2), localValue = _React_useState[0], setLocalValue = _React_useState[1];
    var onChange = _react.useCallback(function(v) {
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