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
const _warnOnce = require("../lib/warnOnce");
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
const warn = (0, _warnOnce.warnOnce)('useCustomEnsuredControl');
function useCustomEnsuredControl({ value, defaultValue, disabled, onChange: onChangeProp }) {
    const isControlled = value !== undefined;
    const [localValue, setLocalValue] = _react.useState(defaultValue);
    const preservedControlledValueRef = _react.useRef();
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        preservedControlledValueRef.current = value;
    });
    /*
   * Для ситуации, когда nextValue это пользовательская функция,
   * и в качестве аргумента мы должны передать prevValue.
   * Обычно в качестве prevValue используется preservedControlledValueRef, но оно может быть undefined, если
   * некотролируемое value вдруг стало контролируемым
   * (value = undefined ---> value = true)
   * Если в момент вызова onChange preservedControlledValueRef ещё не был
   * обновлён в useEffect, то мы не можем использовать preservedControlledValueRef как prevValue
   * В качестве запасного варианта мы храним текущее значение value в currentFallbackValueRef, чтобы
   * использовать его вместо preservedControlledValueRef.
   */ const currentFallbackValueRef = _react.useRef(value);
    currentFallbackValueRef.current = value;
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
                if (process.env.NODE_ENV === 'development') {
                    if (preservedControlledValueRef.current === undefined) {
                        warn(`Похоже, что при вызове onChange с аргументом nextValue в виде коллбэка, состояние компонента было переведено из неконтролируемого ("undefined") в контролируемое. Пожалуйста, старайтесь сохранять либо неконтролируемое состояние, либо контролируемое на всём промежутке жизненного цикла компонента, чтобы получать предсказуемое значение prevValue в коллбэке nextValue((prevValue: V) => V)`, 'error');
                    }
                }
                const prevValue = preservedControlledValueRef.current === undefined ? currentFallbackValueRef.current : preservedControlledValueRef.current;
                // В теории prevValue не может быть undefined,
                // но лучше не вызывать nextValue с таким значением
                if (prevValue !== undefined) {
                    const resolvedValue = nextValue(prevValue);
                    onChangeProp(resolvedValue);
                }
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