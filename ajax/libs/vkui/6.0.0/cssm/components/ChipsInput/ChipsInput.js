import * as React from 'react';
import { useExternRef } from '../../hooks/useExternRef';
import { ChipsInputBase } from '../ChipsInputBase/ChipsInputBase';
import { getNewOptionDataDefault, getOptionLabelDefault, getOptionValueDefault } from '../ChipsInputBase/constants';
import { useChipsInput } from './useChipsInput';
/**
 * @see https://vkcom.github.io/VKUI/#/ChipsInput
 */ export const ChipsInput = ({ // option
value: valueProp, defaultValue, onChange, // input
getRef, inputValue: inputValueProp, defaultInputValue: inputDefaultValueProp, onInputChange: onInputChangeProp, getOptionValue = getOptionValueDefault, getOptionLabel = getOptionLabelDefault, getNewOptionData = getNewOptionDataDefault, // other
disabled, ...restProps })=>{
    const { value, addOptionFromInput, removeOption, // input
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
    return /*#__PURE__*/ React.createElement(ChipsInputBase, {
        ...restProps,
        disabled: disabled,
        value: value,
        onAddChipOption: addOptionFromInput,
        onRemoveChipOption: removeOption,
        getRef: inputRef,
        inputValue: inputValue,
        onInputChange: onInputChange
    });
};

//# sourceMappingURL=ChipsInput.js.map