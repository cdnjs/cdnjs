import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { isHTMLElement } from '@vkontakte/vkui-floating-ui/utils/dom';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { getHorizontalFocusGoTo, Keys } from '../../lib/accessibility';
import { contains as checkTargetIsInputEl, contains, getActiveElementByAnotherElement } from '../../lib/dom';
import { FormField } from '../FormField/FormField';
import { FormFieldClearButton } from '../FormFieldClearButton/FormFieldClearButton';
import { Text } from '../Typography/Text/Text';
import { DEFAULT_INPUT_VALUE, DEFAULT_VALUE, renderChipDefault } from './constants';
import { getChipOptionIndexByHTMLElement, getChipOptionIndexByValueProp, getChipOptionValueByHTMLElement, getNextChipOptionIndexByNavigateToProp, isInputValueEmpty } from './helpers';
import styles from './ChipsInputBase.module.css';
const sizeYClassNames = {
    none: styles['ChipsInputBase--sizeY-none'],
    compact: styles['ChipsInputBase--sizeY-compact']
};
export const ChipsInputBase = ({ // FormFieldProps
getRootRef, style, className, before, after, status, mode, maxHeight, // option
value = DEFAULT_VALUE, onAddChipOption, onRemoveChipOption: onRemoveChipOptionProp, renderChip = renderChipDefault, // input
getRef, id: idProp, inputValue = DEFAULT_INPUT_VALUE, placeholder, disabled, readOnly, addOnBlur, onBlur, onInputChange, // clear
ClearButton = FormFieldClearButton, clearButtonShown, clearButtonTestId, onClear, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const idGenerated = React.useId();
    const inputRef = useExternRef(getRef);
    const listboxRef = React.useRef(null);
    const valueLength = value.length;
    const withPlaceholder = valueLength === 0;
    const [lastFocusedChipOptionIndex, setLastFocusedChipOptionIndex] = React.useState(0);
    const resetChipOptionFocusToInputEl = (inputEl)=>{
        setLastFocusedChipOptionIndex(0);
        inputEl.focus();
    };
    const moveFocusToChipOption = (currentIndex, navigateTo, listboxEl)=>{
        const index = getNextChipOptionIndexByNavigateToProp(currentIndex, navigateTo, valueLength);
        // eslint-disable-next-line no-restricted-properties
        const foundEl = listboxEl.querySelector(`[data-index="${index}"]`);
        if (foundEl) {
            setLastFocusedChipOptionIndex(index);
            foundEl.focus();
        }
    };
    const removeChipOption = (o, index)=>{
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (!inputRef.current || !listboxRef.current) {
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
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (event.defaultPrevented || !listboxRef.current || !isHTMLElement(targetEl)) {
            return;
        }
        switch(event.key){
            case Keys.ENTER:
                {
                    if (!readOnly && checkTargetIsInputEl(targetEl, inputRef.current) && inputRef.current && !isInputValueEmpty(inputRef.current)) {
                        event.preventDefault();
                        onAddChipOption(inputRef.current.value);
                    }
                    break;
                }
            case Keys.DELETE:
            case Keys.BACKSPACE:
                {
                    if (!readOnly && valueLength > 0) {
                        if (!checkTargetIsInputEl(targetEl, inputRef.current)) {
                            event.preventDefault();
                            removeChipOption(getChipOptionValueByHTMLElement(targetEl), getChipOptionIndexByHTMLElement(targetEl));
                        } else if (event.key === Keys.BACKSPACE && isInputValueEmpty(inputRef.current)) {
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
    const handleRootClick = (event)=>{
        if (event.defaultPrevented || contains(event.currentTarget, getActiveElementByAnotherElement(event.currentTarget))) {
            return;
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const clearButton = React.useMemo(()=>{
        if (clearButtonShown) {
            return /*#__PURE__*/ _jsx(ClearButton, {
                onClick: onClear,
                disabled: disabled,
                "data-testid": clearButtonTestId
            });
        }
        return undefined;
    }, [
        ClearButton,
        clearButtonShown,
        clearButtonTestId,
        disabled,
        onClear
    ]);
    const afterItems = React.useMemo(()=>{
        if (clearButton || after) {
            return /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    clearButton,
                    after
                ]
            });
        }
        return undefined;
    }, [
        after,
        clearButton
    ]);
    return /*#__PURE__*/ _jsx(FormField, {
        Component: "div",
        getRootRef: getRootRef,
        style: style,
        disabled: disabled,
        before: before,
        after: afterItems,
        status: status,
        mode: mode,
        className: className,
        maxHeight: maxHeight,
        onClick: disabled ? undefined : handleRootClick,
        children: /*#__PURE__*/ _jsxs("div", {
            className: classNames(styles['ChipsInputBase'], sizeY !== 'regular' && sizeYClassNames[sizeY], withPlaceholder && styles['ChipsInputBase--hasPlaceholder']),
            // для a11y
            ref: listboxRef,
            role: "listbox",
            "aria-orientation": "horizontal",
            "aria-disabled": disabled,
            "aria-readonly": readOnly,
            onKeyDown: disabled ? undefined : handleListboxKeyDown,
            children: [
                value.map((option, index)=>/*#__PURE__*/ _jsx(React.Fragment, {
                        children: renderChip({
                            'Component': 'div',
                            'value': option.value,
                            'label': option.label,
                            'disabled': option.disabled || disabled,
                            'readOnly': option.readOnly || readOnly,
                            'className': styles['ChipsInputBase__chip'],
                            'onRemove': handleChipRemove,
                            // чтобы можно было легче найти этот чип в DOM
                            'data-index': index,
                            'data-value': option.value,
                            // для a11y
                            'tabIndex': lastFocusedChipOptionIndex === index ? 0 : -1,
                            'role': 'option',
                            'aria-selected': true,
                            'aria-posinset': index + 1,
                            'aria-setsize': valueLength
                        }, option)
                    }, `${typeof option.value}-${option.value}`)),
                /*#__PURE__*/ _jsx(Text, {
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
                })
            ]
        })
    });
};

//# sourceMappingURL=ChipsInputBase.js.map