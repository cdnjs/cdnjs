import * as React from 'react';
import { isFunction } from '@vkontakte/vkjs';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
import { warnOnce } from '../lib/warnOnce';
export function useEnsuredControl({ onChange: onChangeProp, disabled, ...props }) {
    const [value, onChangeValue] = useCustomEnsuredControl(props);
    const onChange = React.useCallback((e)=>{
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
const warn = warnOnce('useCustomEnsuredControl');
export function useCustomEnsuredControl({ value, defaultValue, disabled, onChange: onChangeProp }) {
    const isControlled = value !== undefined;
    const [localValue, setLocalValue] = React.useState(defaultValue);
    const preservedControlledValueRef = React.useRef();
    useIsomorphicLayoutEffect(()=>{
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
   */ const currentFallbackValueRef = React.useRef(value);
    currentFallbackValueRef.current = value;
    const onChange = React.useCallback((nextValue)=>{
        if (disabled) {
            return;
        }
        if (isFunction(nextValue)) {
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