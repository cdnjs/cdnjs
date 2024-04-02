"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    transformValue: function() {
        return transformValue;
    },
    useChipsInput: function() {
        return useChipsInput;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useEnsuredControl = require("../../hooks/useEnsuredControl");
const _react1 = require("../../lib/react");
const _constants = require("../ChipsInputBase/constants");
const _helpers = require("../ChipsInputBase/helpers");
const transformValue = (value, getOptionValue, getOptionLabel)=>value.map((option)=>_object_spread_props._(_object_spread._({}, option), {
            label: getOptionLabel(option),
            value: getOptionValue(option)
        }));
const useChipsInput = ({ // option
value: valueProp, defaultValue = _constants.DEFAULT_VALUE, onChange, getOptionLabel = _constants.getOptionLabelDefault, getOptionValue = _constants.getOptionValueDefault, getNewOptionData = _constants.getNewOptionDataDefault, // input
inputValue: inputValueProp, defaultInputValue = _constants.DEFAULT_INPUT_VALUE, onInputChange, // other
disabled })=>{
    const [value, setValue] = (0, _useEnsuredControl.useCustomEnsuredControl)({
        disabled,
        value: valueProp ? transformValue(valueProp, getOptionValue, getOptionLabel) : undefined,
        defaultValue: transformValue(defaultValue, getOptionValue, getOptionLabel),
        onChange
    });
    const inputRef = _react.useRef(null);
    const [inputValue, setInputChange] = (0, _useEnsuredControl.useEnsuredControl)({
        disabled,
        value: inputValueProp,
        defaultValue: defaultInputValue,
        onChange: onInputChange
    });
    const toggleOption = _react.useCallback((nextValueProp, isNewValue)=>{
        setValue((prevValue)=>{
            const isLikeObjectOption = (0, _helpers.isValueLikeChipOptionObject)(nextValueProp);
            const resolvedOption = isLikeObjectOption ? getNewOptionData(nextValueProp.value, nextValueProp.label) : getNewOptionData(nextValueProp, typeof nextValueProp === 'string' ? nextValueProp : '');
            const nextValue = prevValue.filter((option)=>resolvedOption.value !== option.value);
            if (isNewValue === true) {
                nextValue.push(isLikeObjectOption ? _object_spread._({}, nextValueProp, resolvedOption) : resolvedOption);
            }
            return nextValue;
        });
    }, [
        setValue,
        getNewOptionData
    ]);
    const clearInput = _react.useCallback(()=>{
        /* istanbul ignore if */ if (!inputRef.current) {
            return;
        }
        (0, _react1.simulateReactInput)(inputRef.current, '');
    }, [
        inputRef
    ]);
    const addOption = _react.useCallback((newValue)=>toggleOption(newValue, true), [
        toggleOption
    ]);
    const removeOption = _react.useCallback((newValue)=>toggleOption(newValue, false), [
        toggleOption
    ]);
    const addOptionFromInput = _react.useCallback((inputValue)=>{
        const label = inputValue.trim();
        if (label) {
            addOption(label);
            clearInput();
        }
    }, [
        addOption,
        clearInput
    ]);
    return {
        value,
        addOption,
        addOptionFromInput,
        removeOption,
        inputRef,
        inputValue,
        onInputChange: setInputChange,
        clearInput
    };
};

//# sourceMappingURL=useChipsInput.js.map