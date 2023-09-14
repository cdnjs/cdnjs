import * as React from 'react';
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
export function useCustomEnsuredControl({ disabled, onChange: onChangeProp, defaultValue, value }) {
    const isControlled = value !== undefined;
    const [localValue, setLocalValue] = React.useState(defaultValue);
    const onChange = React.useCallback((v)=>{
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