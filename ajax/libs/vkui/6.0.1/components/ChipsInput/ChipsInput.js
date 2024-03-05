import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { useExternRef } from '../../hooks/useExternRef';
import { ChipsInputBase } from '../ChipsInputBase/ChipsInputBase';
import { getNewOptionDataDefault, getOptionLabelDefault, getOptionValueDefault } from '../ChipsInputBase/constants';
import { useChipsInput } from './useChipsInput';
/**
 * @see https://vkcom.github.io/VKUI/#/ChipsInput
 */ export const ChipsInput = (_param)=>{
    var { // option
    value: valueProp, defaultValue, onChange, // input
    getRef, inputValue: inputValueProp, defaultInputValue: inputDefaultValueProp, onInputChange: onInputChangeProp, getOptionValue = getOptionValueDefault, getOptionLabel = getOptionLabelDefault, getNewOptionData = getNewOptionDataDefault, // other
    disabled } = _param, restProps = _object_without_properties(_param, [
        "value",
        "defaultValue",
        "onChange",
        "getRef",
        "inputValue",
        "defaultInputValue",
        "onInputChange",
        "getOptionValue",
        "getOptionLabel",
        "getNewOptionData",
        "disabled"
    ]);
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
    return /*#__PURE__*/ React.createElement(ChipsInputBase, _object_spread_props(_object_spread({}, restProps), {
        disabled: disabled,
        value: value,
        onAddChipOption: addOptionFromInput,
        onRemoveChipOption: removeOption,
        getRef: inputRef,
        inputValue: inputValue,
        onInputChange: onInputChange
    }));
};

//# sourceMappingURL=ChipsInput.js.map