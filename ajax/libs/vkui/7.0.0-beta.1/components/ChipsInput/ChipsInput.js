'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { useExternRef } from "../../hooks/useExternRef.js";
import { ChipsInputBase } from "../ChipsInputBase/ChipsInputBase.js";
import { useChipsInput } from "./useChipsInput.js";
/**
 * @see https://vkcom.github.io/VKUI/#/ChipsInput
 */ export const ChipsInput = (_param)=>{
    var { // option
    value: valueProp, defaultValue, onChange, // input
    getRef, inputValue: inputValueProp, defaultInputValue: inputDefaultValueProp, onInputChange: onInputChangeProp, getOptionValue, getOptionLabel, getNewOptionData, // other
    disabled, allowClearButton } = _param, restProps = _object_without_properties(_param, [
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
        "disabled",
        "allowClearButton"
    ]);
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
    return /*#__PURE__*/ _jsx(ChipsInputBase, _object_spread_props(_object_spread({}, restProps), {
        disabled: disabled,
        value: value,
        clearButtonShown: allowClearButton && (!!value.length || !!inputValue.length),
        onAddChipOption: addOptionFromInput,
        onRemoveChipOption: removeOption,
        onClear: clearOptions,
        getRef: inputRef,
        inputValue: inputValue,
        onInputChange: onInputChange
    }));
};

//# sourceMappingURL=ChipsInput.js.map