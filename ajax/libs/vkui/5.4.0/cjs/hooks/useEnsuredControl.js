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
    useEnsuredControl: function() {
        return useEnsuredControl;
    },
    useCustomEnsuredControl: function() {
        return useCustomEnsuredControl;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
function useEnsuredControl(_param) {
    var onChangeProp = _param.onChange, disabled = _param.disabled, props = _objectWithoutProperties(_param, [
        "onChange",
        "disabled"
    ]);
    var _useCustomEnsuredControl = _slicedToArray(useCustomEnsuredControl(props), 2), value = _useCustomEnsuredControl[0], onChangeValue = _useCustomEnsuredControl[1];
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
    var _React_useState = _slicedToArray(_react.useState(defaultValue), 2), localValue = _React_useState[0], setLocalValue = _React_useState[1];
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