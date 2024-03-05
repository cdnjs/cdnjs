"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useChipsSelect", {
    enumerable: true,
    get: function() {
        return useChipsSelect;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _select = require("../../lib/select");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _useChipsInput = require("../ChipsInput/useChipsInput");
const _constants = require("../ChipsInputBase/constants");
const _constants1 = require("./constants");
const useChipsSelect = ({ // common
disabled, // option
value: valueProp, defaultValue, onChange, getOptionLabel = _constants.getOptionLabelDefault, getOptionValue = _constants.getOptionValueDefault, getNewOptionData = _constants.getNewOptionDataDefault, // input
inputValue: inputValueProp, defaultInputValue = _constants.DEFAULT_INPUT_VALUE, onInputChange: onInputChangeProp, // dropdown
creatable = false, emptyText = _constants1.DEFAULT_EMPTY_TEXT, filterFn = _select.defaultFilterFn, selectedBehavior = _constants1.DEFAULT_SELECTED_BEHAVIOR, options: optionsProp = _constants.DEFAULT_VALUE })=>{
    const _useChipsInput1 = (0, _useChipsInput.useChipsInput)({
        // option
        value: valueProp,
        defaultValue,
        onChange,
        getOptionValue,
        getOptionLabel,
        getNewOptionData,
        // input
        inputValue: inputValueProp,
        defaultInputValue,
        onInputChange: onInputChangeProp,
        // other
        disabled
    }), { value, inputValue, onInputChange } = _useChipsInput1, restChipsInputProps = _object_without_properties._(_useChipsInput1, [
        "value",
        "inputValue",
        "onInputChange"
    ]);
    // dropdown
    const [opened, setOpened] = _react.useState(false);
    const [options, setOptions] = _react.useState(()=>opened ? transformOptions({
            value,
            getOptionValue,
            getOptionLabel,
            inputValue,
            emptyText,
            creatable,
            filterFn,
            options: optionsProp,
            selectedBehavior
        }) : []);
    const [focusedOptionIndex, setFocusedOptionIndex] = _react.useState(0);
    const [focusedOption, setFocusedOption] = _react.useState(null);
    const handleInputChange = _react.useCallback((event)=>{
        onInputChange(event);
        if (!opened) {
            setOpened(true);
            setFocusedOptionIndex(0);
        }
    }, [
        onInputChange,
        opened
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function handleDropdownOpen() {
        if (!opened) {
            return;
        }
        setOptions((prevOptions)=>{
            const nextOptions = transformOptions({
                value,
                getOptionValue,
                getOptionLabel,
                inputValue,
                emptyText,
                creatable,
                filterFn,
                options: optionsProp,
                selectedBehavior
            });
            if ((0, _vkjs.isEqual)(prevOptions, nextOptions)) {
                return prevOptions;
            }
            return nextOptions;
        });
    }, [
        opened,
        value,
        getOptionLabel,
        getOptionValue,
        inputValue,
        optionsProp,
        creatable,
        selectedBehavior,
        filterFn
    ]);
    return _object_spread_props._(_object_spread._({}, restChipsInputProps), {
        // options
        value,
        // input
        inputValue,
        onInputChange: handleInputChange,
        // dropdown states
        options,
        opened,
        setOpened,
        focusedOption,
        focusedOptionIndex,
        setFocusedOption,
        setFocusedOptionIndex
    });
};
function transformOptions({ value, getOptionValue = _constants.getOptionValueDefault, getOptionLabel = _constants.getOptionLabelDefault, inputValue = _constants.DEFAULT_INPUT_VALUE, emptyText = _constants1.DEFAULT_EMPTY_TEXT, creatable = false, filterFn = _select.defaultFilterFn, options: optionsProp = _constants.DEFAULT_VALUE, selectedBehavior = _constants1.DEFAULT_SELECTED_BEHAVIOR }) {
    const filteredOptionsProp = filterFn ? optionsProp.filter((option)=>filterFn(inputValue, option, getOptionLabel)) : optionsProp;
    if (filteredOptionsProp.length === 0) {
        if (inputValue !== _constants.DEFAULT_INPUT_VALUE && typeof creatable === 'string') {
            return [
                {
                    actionText: creatable
                }
            ];
        }
        return [
            {
                placeholder: emptyText
            }
        ];
    }
    const parsedOptions = (0, _useChipsInput.transformValue)(filteredOptionsProp, getOptionValue, getOptionLabel);
    if (selectedBehavior === 'hide') {
        const selected = value.map((item)=>item.value);
        return parsedOptions.filter((item)=>(0, _constants1.isNotServicePreset)(item) ? !selected.includes(item.value) : false);
    }
    return parsedOptions;
}

//# sourceMappingURL=useChipsSelect.js.map