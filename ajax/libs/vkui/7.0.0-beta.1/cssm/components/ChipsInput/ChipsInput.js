'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useExternRef } from "../../hooks/useExternRef.js";
import { ChipsInputBase } from "../ChipsInputBase/ChipsInputBase.js";
import { useChipsInput } from "./useChipsInput.js";
/**
 * @see https://vkcom.github.io/VKUI/#/ChipsInput
 */ export const ChipsInput = ({ // option
value: valueProp, defaultValue, onChange, // input
getRef, inputValue: inputValueProp, defaultInputValue: inputDefaultValueProp, onInputChange: onInputChangeProp, getOptionValue, getOptionLabel, getNewOptionData, // other
disabled, allowClearButton, ...restProps })=>{
    const { value, addOptionFromInput, removeOption, clearOptions, // input
    inputRef: inputRefHook, inputValue, onInputChange } = useChipsInput({
        // option
        value: valueProp,
        defaultValue,
        onChange,
        getOptionLabel,
        getOptionValue,
        getNewOptionData,
        // input
        inputValue: inputValueProp,
        defaultInputValue: inputDefaultValueProp,
        onInputChange: onInputChangeProp,
        // other
        disabled
    });
    const inputRef = useExternRef(getRef, inputRefHook);
    return /*#__PURE__*/ _jsx(ChipsInputBase, {
        ...restProps,
        disabled: disabled,
        value: value,
        clearButtonShown: allowClearButton && (!!value.length || !!inputValue.length),
        onAddChipOption: addOptionFromInput,
        onRemoveChipOption: removeOption,
        onClear: clearOptions,
        getRef: inputRef,
        inputValue: inputValue,
        onInputChange: onInputChange
    });
};

//# sourceMappingURL=ChipsInput.js.map