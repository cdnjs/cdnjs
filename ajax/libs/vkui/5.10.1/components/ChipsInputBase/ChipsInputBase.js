import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _type_of } from "@swc/helpers/_/_type_of";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useChipsInput } from "../../hooks/useChipsInput";
import { useExternRef } from "../../hooks/useExternRef";
import { SizeType } from "../../lib/adaptivity";
import { Chip } from "../Chip/Chip";
import { Text } from "../Typography/Text/Text";
export var chipsInputDefaultProps = {
    onChange: noop,
    onInputChange: noop,
    onKeyDown: noop,
    onBlur: noop,
    onFocus: noop,
    value: [],
    inputValue: "",
    inputAriaLabel: "Введите ваше значение...",
    getOptionValue: function(option) {
        return option.value;
    },
    getOptionLabel: function(option) {
        return option.label;
    },
    getNewOptionData: function(_, label) {
        return {
            value: label,
            label: label
        };
    },
    renderChip: function renderChip(props) {
        if (!props) {
            return null;
        }
        var disabled = props.disabled, value = props.value, label = props.label, rest = _object_without_properties(props, [
            "disabled",
            "value",
            "label"
        ]);
        return /*#__PURE__*/ React.createElement(Chip, _object_spread({
            value: value,
            removable: !disabled
        }, rest), label);
    },
    addOnBlur: false
};
export var ChipsInputBase = function(props) {
    var propsWithDefault = _object_spread({}, chipsInputDefaultProps, props);
    var style = propsWithDefault.style, className = propsWithDefault.className, getRootRef = propsWithDefault.getRootRef, value = propsWithDefault.value, onChange = propsWithDefault.onChange, onInputChange = propsWithDefault.onInputChange, onKeyDown = propsWithDefault.onKeyDown, onBlur = propsWithDefault.onBlur, onFocus = propsWithDefault.onFocus, children = propsWithDefault.children, inputValue = propsWithDefault.inputValue, getRef = propsWithDefault.getRef, placeholder = propsWithDefault.placeholder, getOptionValue = propsWithDefault.getOptionValue, getOptionLabel = propsWithDefault.getOptionLabel, getNewOptionData = propsWithDefault.getNewOptionData, renderChip = propsWithDefault.renderChip, inputAriaLabel = propsWithDefault.inputAriaLabel, addOnBlur = propsWithDefault.addOnBlur, restProps = _object_without_properties(propsWithDefault, [
        "style",
        "className",
        "getRootRef",
        "value",
        "onChange",
        "onInputChange",
        "onKeyDown",
        "onBlur",
        "onFocus",
        "children",
        "inputValue",
        "getRef",
        "placeholder",
        "getOptionValue",
        "getOptionLabel",
        "getNewOptionData",
        "renderChip",
        "inputAriaLabel",
        "addOnBlur"
    ]);
    var sizeY = useAdaptivity().sizeY;
    var _React_useState = _sliced_to_array(React.useState(false), 2), focused = _React_useState[0], setFocused = _React_useState[1];
    var _useChipsInput = useChipsInput(propsWithDefault), fieldValue = _useChipsInput.fieldValue, addOptionFromInput = _useChipsInput.addOptionFromInput, removeOption = _useChipsInput.removeOption, selectedOptions = _useChipsInput.selectedOptions, handleInputChange = _useChipsInput.handleInputChange;
    var inputRef = useExternRef(getRef);
    var isDisabled = restProps.disabled || restProps.readOnly;
    var handleKeyDown = function(e) {
        if (isDisabled) {
            e.preventDefault();
            return;
        }
        onKeyDown(e);
        if (e.key === "Backspace" && !e.defaultPrevented && !fieldValue && selectedOptions.length) {
            removeOption(getOptionValue(selectedOptions[selectedOptions.length - 1]));
            e.preventDefault();
        }
        if (e.key === "Enter" && !e.defaultPrevented && fieldValue) {
            addOptionFromInput();
            e.preventDefault();
        }
    };
    var handleBlur = function(e) {
        if (focused) {
            setFocused(false);
        }
        onBlur(e);
        if (addOnBlur && !e.defaultPrevented) {
            addOptionFromInput();
        }
    };
    var handleFocus = function(e) {
        if (!focused) {
            setFocused(true);
        }
        onFocus(e);
    };
    var handleChipRemove = function(_, value) {
        if (value !== undefined) {
            removeOption(value);
        }
    };
    var handleClick = function(e) {
        if (isDisabled) {
            e.preventDefault();
            return;
        }
        if ((inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) !== null && !focused) {
            inputRef.current.focus();
        }
    };
    return /*#__PURE__*/ React.createElement("div", {
        onClick: handleClick,
        role: "presentation",
        style: style,
        className: classNames("vkuiChipsInputBase", sizeY === SizeType.COMPACT && "vkuiChipsInputBase--sizeY-compact", !selectedOptions.length && "vkuiChipsInputBase--hasPlaceholder", className),
        ref: getRootRef
    }, selectedOptions.map(function(option) {
        var value = getOptionValue(option);
        var label = getOptionLabel(option);
        return /*#__PURE__*/ React.createElement(React.Fragment, {
            key: "".concat(typeof value === "undefined" ? "undefined" : _type_of(value), "-").concat(value)
        }, renderChip({
            option: option,
            value: value,
            label: label,
            onRemove: handleChipRemove,
            disabled: Boolean(restProps.disabled),
            className: "vkuiChipsInputBase__chip"
        }));
    }), /*#__PURE__*/ React.createElement("label", {
        className: "vkuiChipsInputBase__label",
        "aria-label": inputAriaLabel
    }, /*#__PURE__*/ React.createElement(Text, _object_spread_props(_object_spread({
        Component: "input",
        type: "text",
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: false,
        "aria-autocomplete": "list",
        className: "vkuiChipsInputBase__el"
    }, restProps), {
        getRootRef: inputRef,
        value: fieldValue,
        onChange: handleInputChange,
        onKeyDown: handleKeyDown,
        onFocus: handleFocus,
        onBlur: handleBlur,
        placeholder: selectedOptions.length ? undefined : placeholder
    }))));
};

//# sourceMappingURL=ChipsInputBase.js.map