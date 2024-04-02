import * as React from 'react';
export const useBooleanState = (defaultValue = false)=>{
    const [value, setValue] = React.useState(defaultValue);
    const setTrue = React.useCallback(()=>{
        setValue(true);
    }, []);
    const setFalse = React.useCallback(()=>{
        setValue(false);
    }, []);
    const toggle = React.useCallback(()=>{
        setValue(!value);
    }, [
        value
    ]);
    return {
        value,
        setTrue,
        setFalse,
        toggle
    };
};

//# sourceMappingURL=useBooleanState.js.map