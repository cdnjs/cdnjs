"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChipsInput", {
    enumerable: true,
    get: function() {
        return ChipsInput;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _useExternRef = require("../../hooks/useExternRef");
const _ChipsInputBase = require("../ChipsInputBase/ChipsInputBase");
const _constants = require("../ChipsInputBase/constants");
const _useChipsInput = require("./useChipsInput");
const ChipsInput = (_param)=>{
    var { // option
    value: valueProp, defaultValue, onChange, // input
    getRef, inputValue: inputValueProp, defaultInputValue: inputDefaultValueProp, onInputChange: onInputChangeProp, getOptionValue = _constants.getOptionValueDefault, getOptionLabel = _constants.getOptionLabelDefault, getNewOptionData = _constants.getNewOptionDataDefault, // other
    disabled } = _param, restProps = _object_without_properties._(_param, [
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
    inputRef: inputRefHook, inputValue, onInputChange } = (0, _useChipsInput.useChipsInput)({
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
    const inputRef = (0, _useExternRef.useExternRef)(getRef, inputRefHook);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_ChipsInputBase.ChipsInputBase, _object_spread_props._(_object_spread._({}, restProps), {
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