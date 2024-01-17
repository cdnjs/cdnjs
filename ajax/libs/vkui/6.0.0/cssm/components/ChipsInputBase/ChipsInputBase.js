import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { isHTMLElement } from '@vkontakte/vkui-floating-ui/utils/dom';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { getHorizontalFocusGoTo, Keys } from '../../lib/accessibility';
import { contains as checkTargetIsInputEl } from '../../lib/dom';
import { FormField } from '../FormField/FormField';
import { Text } from '../Typography/Text/Text';
import { DEFAULT_INPUT_VALUE, DEFAULT_VALUE, renderChipDefault } from './constants';
import { getChipOptionIndexByHTMLElement, getChipOptionIndexByValueProp, getChipOptionValueByHTMLElement, getNextChipOptionIndexByNavigateToProp, isInputValueEmpty } from './helpers';
import styles from './ChipsInputBase.module.css';
const sizeYClassNames = {
    none: styles['ChipsInputBase--sizeY-none'],
    compact: styles['ChipsInputBase--sizeY-compact']
};
export const ChipsInputBase = ({ // FormFieldProps
getRootRef, style, className, before, after, status, mode, // option
value = DEFAULT_VALUE, onAddChipOption, onRemoveChipOption: onRemoveChipOptionProp, renderChip = renderChipDefault, // input
getRef, id: idProp, inputValue = DEFAULT_INPUT_VALUE, placeholder, disabled, readOnly, addOnBlur, onBlur, onInputChange, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const idGenerated = React.useId();
    const inputRef = useExternRef(getRef);
    const listboxRef = React.useRef(null);
    const valueLength = value.length;
    const withPlaceholder = valueLength === 0;
    const isDisabled = disabled || readOnly;
    const [chipFocusedIndex, setChipFocusedIndex] = React.useState(0);
    const resetChipOptionFocusToInputEl = (inputEl)=>{
        setChipFocusedIndex(0);
        inputEl.focus();
    };
    const moveFocusToChipOption = (currentIndex, navigateTo, listboxEl)=>{
        const index = getNextChipOptionIndexByNavigateToProp(currentIndex, navigateTo, valueLength);
        // eslint-disable-next-line no-restricted-properties
        const foundEl = listboxEl.querySelector(`[data-index="${index}"]`);
        if (foundEl) {
            setChipFocusedIndex(index);
            foundEl.focus();
        } else {
            setChipFocusedIndex(0);
        }
    };
    const removeChipOption = (o, index)=>{
        if (!inputRef.current || !listboxRef.current) {
            return;
        }
        if (valueLength > 1) {
            if (index === valueLength - 1) {
                moveFocusToChipOption(index, 'prev', listboxRef.current);
            } else {
                moveFocusToChipOption(index, 'next', listboxRef.current);
            }
        } else {
            resetChipOptionFocusToInputEl(inputRef.current);
        }
        onRemoveChipOptionProp(o);
    };
    const handleListboxKeyDown = (event)=>{
        const targetEl = event.target;
        if (event.defaultPrevented || !inputRef.current || !listboxRef.current || !isHTMLElement(targetEl)) {
            return;
        }
        switch(event.key){
            case Keys.ENTER:
                {
                    if (checkTargetIsInputEl(targetEl, inputRef.current) && !isInputValueEmpty(inputRef.current.value)) {
                        event.preventDefault();
                        onAddChipOption(inputRef.current.value);
                    }
                    break;
                }
            case Keys.DELETE:
            case Keys.BACKSPACE:
                {
                    if (valueLength > 0) {
                        if (!checkTargetIsInputEl(targetEl, inputRef.current)) {
                            event.preventDefault();
                            removeChipOption(getChipOptionValueByHTMLElement(targetEl), getChipOptionIndexByHTMLElement(targetEl));
                        } else if (event.key === Keys.BACKSPACE && isInputValueEmpty(inputRef.current.value)) {
                            event.preventDefault();
                            moveFocusToChipOption(getChipOptionIndexByHTMLElement(targetEl), 'last', listboxRef.current);
                        }
                    }
                    break;
                }
            case Keys.ARROW_UP:
            case Keys.ARROW_LEFT:
            case Keys.ARROW_DOWN:
            case Keys.ARROW_RIGHT:
                {
                    if (valueLength !== 0 && !checkTargetIsInputEl(targetEl, inputRef.current)) {
                        event.preventDefault();
                        moveFocusToChipOption(getChipOptionIndexByHTMLElement(targetEl), getHorizontalFocusGoTo(event.key), listboxRef.current);
                    }
                    break;
                }
        }
    };
    const handleInputBlur = (event)=>{
        if (onBlur) {
            onBlur(event);
        }
        if (addOnBlur && !event.defaultPrevented && inputRef.current) {
            onAddChipOption(inputRef.current.value);
        }
    };
    const handleChipRemove = (event, v)=>{
        event.preventDefault();
        event.stopPropagation();
        removeChipOption(v, getChipOptionIndexByValueProp(v, value));
    };
    return /*#__PURE__*/ React.createElement(FormField, {
        Component: "div",
        getRootRef: getRootRef,
        style: style,
        disabled: disabled,
        before: before,
        after: after,
        status: status,
        mode: mode,
        className: className
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['ChipsInputBase'], sizeY !== 'regular' && sizeYClassNames[sizeY], withPlaceholder && styles['ChipsInputBase--hasPlaceholder']),
        // для a11y
        ref: listboxRef,
        role: "listbox",
        "aria-orientation": "horizontal",
        "aria-disabled": disabled,
        "aria-readonly": readOnly,
        onKeyDown: isDisabled ? undefined : handleListboxKeyDown
    }, value.map((option, index)=>/*#__PURE__*/ React.createElement(React.Fragment, {
            key: `${typeof option.value}-${option.label}`
        }, renderChip({
            'Component': 'div',
            'value': option.value,
            'label': option.label,
            'disabled': disabled,
            'className': styles['ChipsInputBase__chip'],
            'onRemove': handleChipRemove,
            // чтобы можно было легче найти этот чип в DOM
            'data-index': index,
            'data-value': option.value,
            // для a11y
            'tabIndex': chipFocusedIndex === index ? 0 : -1,
            'role': 'option',
            'aria-selected': true,
            'aria-posinset': index + 1,
            'aria-setsize': valueLength
        }, option))), /*#__PURE__*/ React.createElement(Text, {
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: false,
        ...restProps,
        Component: "input",
        type: "text",
        id: idProp || `chips-input-base-generated-id-${idGenerated}`,
        getRootRef: inputRef,
        className: styles['ChipsInputBase__el'],
        disabled: disabled,
        readOnly: readOnly,
        placeholder: withPlaceholder ? placeholder : undefined,
        value: inputValue,
        onChange: onInputChange,
        onBlur: handleInputBlur
    })));
};

//# sourceMappingURL=ChipsInputBase.js.map