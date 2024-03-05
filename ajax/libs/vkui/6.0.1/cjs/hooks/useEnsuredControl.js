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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
function useEnsuredControl(_param) {
    var { onChange: onChangeProp, disabled } = _param, props = _object_without_properties._(_param, [
        "onChange",
        "disabled"
    ]);
    const [value, onChangeValue] = useCustomEnsuredControl(props);
    const onChange = _react.useCallback((e)=>{
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
function useCustomEnsuredControl({ value, defaultValue, disabled, onChange: onChangeProp }) {
    const isControlled = value !== undefined;
    const [localValue, setLocalValue] = _react.useState(defaultValue);
    const preservedControlledValueRef = _react.useRef();
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        preservedControlledValueRef.current = value;
    });
    const onChange = _react.useCallback((nextValue)=>{
        if (disabled) {
            return;
        }
        if ((0, _vkjs.isFunction)(nextValue)) {
            if (!isControlled) {
                setLocalValue((prevValue)=>{
                    const resolvedValue = nextValue(prevValue);
                    if (onChangeProp) {
                        onChangeProp(resolvedValue);
                    }
                    return resolvedValue;
                });
            } else if (onChangeProp) {
                const resolvedValue = nextValue(preservedControlledValueRef.current);
                onChangeProp(resolvedValue);
            }
        } else {
            if (onChangeProp) {
                onChangeProp(nextValue);
            }
            if (!isControlled) {
                setLocalValue(nextValue);
            }
        }
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