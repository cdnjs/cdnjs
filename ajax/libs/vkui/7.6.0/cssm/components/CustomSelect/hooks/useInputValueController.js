import * as React from "react";
import { useIsomorphicLayoutEffect } from "../../../lib/useIsomorphicLayoutEffect.js";
import { calculateInputValueFromOptions } from "../helpers.js";
/* eslint-enable jsdoc/require-jsdoc */ export function useInputValueController({ options, accessible, selectedValue, onInputChange: onInputChangeProp }) {
    const [inputValue, setInputValue] = React.useState('');
    const optionsRef = React.useRef(options);
    useIsomorphicLayoutEffect(()=>{
        optionsRef.current = options;
    }, [
        options
    ]);
    const resetInputValueBySelectedOption = React.useCallback(()=>{
        setInputValue(calculateInputValueFromOptions(optionsRef.current, selectedValue));
    }, [
        selectedValue
    ]);
    useIsomorphicLayoutEffect(()=>{
        if (accessible) {
            resetInputValueBySelectedOption();
        }
    }, [
        accessible,
        resetInputValueBySelectedOption
    ]);
    const resetInputValue = React.useCallback(()=>{
        setInputValue('');
    }, []);
    const onInputChange = React.useCallback((e)=>{
        onInputChangeProp && onInputChangeProp(e);
        setInputValue(e.target.value);
    }, [
        onInputChangeProp,
        setInputValue
    ]);
    return {
        inputValue,
        resetInputValue,
        resetInputValueBySelectedOption,
        onInputChange
    };
}

//# sourceMappingURL=useInputValueController.js.map