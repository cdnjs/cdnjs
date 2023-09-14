import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useChipsInput } from '../../hooks/useChipsInput';
import { useExternRef } from '../../hooks/useExternRef';
import { SizeType } from '../../lib/adaptivity';
import { Chip } from '../Chip/Chip';
import { Text } from '../Typography/Text/Text';
import styles from './ChipsInputBase.module.css';
export const chipsInputDefaultProps = {
    onChange: noop,
    onInputChange: noop,
    onKeyDown: noop,
    onBlur: noop,
    onFocus: noop,
    value: [],
    inputValue: '',
    inputAriaLabel: 'Введите ваше значение...',
    getOptionValue: (option)=>option.value,
    getOptionLabel: (option)=>option.label,
    getNewOptionData: (_, label)=>({
            value: label,
            label
        }),
    renderChip (props) {
        if (!props) {
            return null;
        }
        const { disabled, value, label, ...rest } = props;
        return /*#__PURE__*/ React.createElement(Chip, {
            value: value,
            removable: !disabled,
            ...rest
        }, label);
    },
    addOnBlur: false
};
export const ChipsInputBase = (props)=>{
    const propsWithDefault = {
        ...chipsInputDefaultProps,
        ...props
    };
    const { style, className, getRootRef, value, onChange, onInputChange, onKeyDown, onBlur, onFocus, children, inputValue, getRef, placeholder, getOptionValue, getOptionLabel, getNewOptionData, renderChip, inputAriaLabel, addOnBlur, ...restProps } = propsWithDefault;
    const { sizeY } = useAdaptivity();
    const [focused, setFocused] = React.useState(false);
    const { fieldValue, addOptionFromInput, removeOption, selectedOptions, handleInputChange } = useChipsInput(propsWithDefault);
    const inputRef = useExternRef(getRef);
    const isDisabled = restProps.disabled || restProps.readOnly;
    const handleKeyDown = (e)=>{
        if (isDisabled) {
            e.preventDefault();
            return;
        }
        onKeyDown(e);
        if (e.key === 'Backspace' && !e.defaultPrevented && !fieldValue && selectedOptions.length) {
            removeOption(getOptionValue(selectedOptions[selectedOptions.length - 1]));
            e.preventDefault();
        }
        if (e.key === 'Enter' && !e.defaultPrevented && fieldValue) {
            addOptionFromInput();
            e.preventDefault();
        }
    };
    const handleBlur = (e)=>{
        if (focused) {
            setFocused(false);
        }
        onBlur(e);
        if (addOnBlur && !e.defaultPrevented) {
            addOptionFromInput();
        }
    };
    const handleFocus = (e)=>{
        if (!focused) {
            setFocused(true);
        }
        onFocus(e);
    };
    const handleChipRemove = (_, value)=>{
        if (value !== undefined) {
            removeOption(value);
        }
    };
    const handleClick = (e)=>{
        if (isDisabled) {
            e.preventDefault();
            return;
        }
        if (inputRef?.current !== null && !focused) {
            inputRef.current.focus();
        }
    };
    return /*#__PURE__*/ React.createElement("div", {
        onClick: handleClick,
        role: "presentation",
        style: style,
        className: classNames(styles['ChipsInputBase'], sizeY === SizeType.COMPACT && styles['ChipsInputBase--sizeY-compact'], !selectedOptions.length && styles['ChipsInputBase--hasPlaceholder'], className),
        ref: getRootRef
    }, selectedOptions.map((option)=>{
        const value = getOptionValue(option);
        const label = getOptionLabel(option);
        return /*#__PURE__*/ React.createElement(React.Fragment, {
            key: `${typeof value}-${value}`
        }, renderChip({
            option,
            value,
            label,
            onRemove: handleChipRemove,
            disabled: Boolean(restProps.disabled),
            className: styles['ChipsInputBase__chip']
        }));
    }), /*#__PURE__*/ React.createElement("label", {
        className: styles['ChipsInputBase__label'],
        "aria-label": inputAriaLabel
    }, /*#__PURE__*/ React.createElement(Text, {
        Component: "input",
        type: "text",
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: false,
        "aria-autocomplete": "list",
        className: styles['ChipsInputBase__el'],
        ...restProps,
        getRootRef: inputRef,
        value: fieldValue,
        onChange: handleInputChange,
        onKeyDown: handleKeyDown,
        onFocus: handleFocus,
        onBlur: handleBlur,
        placeholder: selectedOptions.length ? undefined : placeholder
    })));
};

//# sourceMappingURL=ChipsInputBase.js.map