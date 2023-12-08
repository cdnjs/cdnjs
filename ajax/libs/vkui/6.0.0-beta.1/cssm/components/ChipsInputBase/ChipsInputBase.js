import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { isHTMLElement } from '@vkontakte/vkui-floating-ui/utils/dom';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { getHorizontalFocusGoTo, Keys } from '../../lib/accessibility';
import { getHTMLElementByChildren, getHTMLElementSiblingByDirection } from '../../lib/dom';
import { FormField } from '../FormField/FormField';
import { Text } from '../Typography/Text/Text';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { DEFAULT_INPUT_LABEL, DEFAULT_INPUT_VALUE, DEFAULT_VALUE, renderChipDefault } from './constants';
import styles from './ChipsInputBase.module.css';
const getValueOptionByIndex = (value, index)=>{
    const foundOption = value[index];
    return foundOption ? foundOption : null;
};
const getValueOptionByHTMLElement = (value, el)=>{
    const ariaLabel = el.getAttribute('aria-label');
    const foundOption = value.find((v)=>v.label === ariaLabel);
    return foundOption ? foundOption : null;
};
const sizeYClassNames = {
    none: styles['ChipsInputBase--sizeY-none'],
    compact: styles['ChipsInputBase--sizeY-compact']
};
export const ChipsInputBase = ({ // FormFieldProps
getRootRef, style, className, before, after, status, mode, // option
value = DEFAULT_VALUE, onAddChipOption, onRemoveChipOption, renderChip = renderChipDefault, // input
getRef, id: idProp, inputValue, inputLabel = DEFAULT_INPUT_LABEL, placeholder, disabled, readOnly, addOnBlur, onBlur, onFocus, onInputChange, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const idGenerated = React.useId();
    const inputId = idProp || `chips-input-base-generated-id-${idGenerated}`;
    const inputRef = useExternRef(getRef);
    const listboxRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const valueLength = value.length;
    const withPlaceholder = valueLength === 0;
    const isDisabled = disabled || readOnly;
    const handleKeyDown = (event)=>{
        const targetEl = event.target;
        if (event.defaultPrevented || !inputRef.current || !isHTMLElement(targetEl)) {
            return;
        }
        const lastOptionIndex = valueLength - 1;
        const nextInputValue = inputRef.current.value;
        const isInputEl = targetEl === inputRef.current;
        const isInputValueEmpty = nextInputValue === DEFAULT_INPUT_VALUE;
        switch(event.key){
            case Keys.ENTER:
                {
                    if (isInputEl && !isInputValueEmpty) {
                        event.preventDefault();
                        onAddChipOption(nextInputValue);
                    }
                    break;
                }
            case Keys.BACKSPACE:
                {
                    if (valueLength) {
                        const option = isInputEl && isInputValueEmpty ? getValueOptionByIndex(value, lastOptionIndex) : getValueOptionByHTMLElement(value, targetEl);
                        if (option) {
                            event.preventDefault();
                            inputRef.current.focus();
                            onRemoveChipOption(option);
                        }
                    }
                    break;
                }
            case Keys.ARROW_UP:
            case Keys.ARROW_LEFT:
            case Keys.ARROW_DOWN:
            case Keys.ARROW_RIGHT:
                {
                    event.preventDefault();
                    if (valueLength && isInputValueEmpty && listboxRef.current) {
                        const foundEl = isInputEl && (event.key === Keys.ARROW_UP || event.key === Keys.ARROW_LEFT) ? getHTMLElementByChildren(listboxRef.current.children, lastOptionIndex) : getHTMLElementSiblingByDirection(targetEl, getHorizontalFocusGoTo(event.key));
                        if (foundEl) {
                            foundEl.focus();
                        }
                    }
                }
        }
    };
    const handleBlur = (event)=>{
        if (focused) {
            setFocused(false);
        }
        if (onBlur) {
            onBlur(event);
        }
        if (addOnBlur && !event.defaultPrevented && inputRef.current) {
            onAddChipOption(inputRef.current.value);
        }
    };
    const handleFocus = (event)=>{
        if (!focused) {
            setFocused(true);
        }
        if (onFocus) {
            onFocus(event);
        }
    };
    const handleChipRemove = (event, value)=>{
        event.preventDefault();
        event.stopPropagation();
        onRemoveChipOption(value);
    };
    const handleClick = ()=>{
        if (!focused && inputRef.current) {
            inputRef.current.focus();
        }
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
        onClick: isDisabled ? undefined : handleClick,
        // для a11y
        ref: listboxRef,
        role: "listbox",
        "aria-orientation": "horizontal",
        "aria-disabled": disabled,
        "aria-readonly": readOnly,
        onKeyDown: isDisabled ? undefined : handleKeyDown
    }, value.map((option, index)=>/*#__PURE__*/ React.createElement(React.Fragment, {
            key: `${typeof option.value}-${option.label}`
        }, renderChip({
            'Component': 'div',
            'value': option.value,
            'label': option.label,
            'disabled': disabled,
            'className': styles['ChipsInputBase__chip'],
            'onRemove': handleChipRemove,
            // для a11y
            'role': 'option',
            'aria-selected': true,
            'aria-posinset': index + 1,
            'aria-setsize': valueLength
        }, option))), /*#__PURE__*/ React.createElement("div", {
        role: "option",
        className: styles['ChipsInputBase__label']
    }, inputLabel && /*#__PURE__*/ React.createElement(VisuallyHidden, null, inputLabel), /*#__PURE__*/ React.createElement(Text, {
        "aria-autocomplete": "list",
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: false,
        ...restProps,
        Component: "input",
        type: "text",
        id: inputId,
        getRootRef: inputRef,
        className: styles['ChipsInputBase__el'],
        disabled: disabled,
        readOnly: readOnly,
        placeholder: withPlaceholder ? placeholder : undefined,
        value: inputValue,
        onChange: onInputChange,
        onFocus: handleFocus,
        onBlur: handleBlur
    }))));
};

//# sourceMappingURL=ChipsInputBase.js.map