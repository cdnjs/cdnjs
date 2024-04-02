import * as React from 'react';
import { isFunction } from '@vkontakte/vkjs';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
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
export function useCustomEnsuredControl({ value, defaultValue, disabled, onChange: onChangeProp }) {
    const isControlled = value !== undefined;
    const [localValue, setLocalValue] = React.useState(defaultValue);
    const preservedControlledValueRef = React.useRef();
    useIsomorphicLayoutEffect(()=>{
        preservedControlledValueRef.current = value;
    });
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