'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { isHTMLElement } from "@vkontakte/vkui-floating-ui/utils/dom";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { getHorizontalFocusGoTo, Keys } from "../../lib/accessibility.js";
import { contains as checkTargetIsInputEl, contains, getActiveElementByAnotherElement } from "../../lib/dom.js";
import { FormField } from "../FormField/FormField.js";
import { FormFieldClearButton } from "../FormFieldClearButton/FormFieldClearButton.js";
import { Text } from "../Typography/Text/Text.js";
import { DEFAULT_INPUT_VALUE, DEFAULT_VALUE, renderChipDefault } from "./constants.js";
import { getChipOptionIndexByHTMLElement, getChipOptionIndexByValueProp, getChipOptionValueByHTMLElement, getNextChipOptionIndexByNavigateToProp, isInputValueEmpty } from "./helpers.js";
const sizeYClassNames = {
    none: "vkuiChipsInputBase__sizeYNone",
    compact: "vkuiChipsInputBase__sizeYCompact"
};
export const ChipsInputBase = (_param)=>{
    var { // FormFieldProps
    getRootRef, style, className, before, after, status, mode, maxHeight, // option
    value = DEFAULT_VALUE, onAddChipOption, 'onRemoveChipOption': onRemoveChipOptionProp, renderChip = renderChipDefault, // input
    getRef, 'id': idProp, inputValue = DEFAULT_INPUT_VALUE, placeholder, disabled, readOnly, addOnBlur, onBlur, onInputChange, // clear
    ClearButton = FormFieldClearButton, clearButtonShown, clearButtonTestId, onClear, // a11y
    chipsListLabel = 'Выбранные элементы', 'aria-label': ariaLabel = '' } = _param, restProps = _object_without_properties(_param, [
        "getRootRef",
        "style",
        "className",
        "before",
        "after",
        "status",
        "mode",
        "maxHeight",
        "value",
        "onAddChipOption",
        'onRemoveChipOption',
        "renderChip",
        "getRef",
        'id',
        "inputValue",
        "placeholder",
        "disabled",
        "readOnly",
        "addOnBlur",
        "onBlur",
        "onInputChange",
        "ClearButton",
        "clearButtonShown",
        "clearButtonTestId",
        "onClear",
        "chipsListLabel",
        'aria-label'
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const idGenerated = React.useId();
    const inputRef = useExternRef(getRef);
    const containerRef = React.useRef(null);
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
            case Keys.HOME:
            case Keys.END:
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
        const activeElement = getActiveElementByAnotherElement(event.currentTarget);
        if (event.defaultPrevented || contains(event.currentTarget, activeElement)) {
            return;
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleClear = React.useCallback(()=>{
        if (inputRef.current) {
            resetChipOptionFocusToInputEl(inputRef.current);
        }
        onClear();
    }, [
        inputRef,
        onClear
    ]);
    const clearButton = React.useMemo(()=>{
        if (clearButtonShown) {
            return /*#__PURE__*/ _jsx(ClearButton, {
                onClick: handleClear,
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
        handleClear
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
    const inputId = idProp || `chips-input-base-generated-id-${idGenerated}`;
    const handleRootMouseDown = (e)=>{
        // Если клик был в один из чипов, то preventDefault делать не нужно, так как не будет срабатывать выделение текста
        if (isHTMLElement(e.target) && contains(listboxRef.current, e.target) && listboxRef.current !== e.target) {
            return;
        }
        const activeElement = getActiveElementByAnotherElement(e.currentTarget);
        // Когда выделен текст чипа не нужно делать preventDefault, чтобы сбросить выделение
        if (contains(listboxRef.current, activeElement)) {
            return;
        }
        // Когда клик в сам инпут, не нужно делать preventDefault, так как не будет работать выделение текста
        if (e.target === inputRef.current) {
            return;
        }
        // Делаем preventDefault, чтобы при клике в поле, вне инпута, высота поля не скакала от того,
        // что фокус сначала пропадает из инпута, а потом возвращается
        e.preventDefault();
    };
    return /*#__PURE__*/ _jsx(FormField, {
        Component: "div",
        getRootRef: getRootRef,
        // role="group" добавлена, чтобы этот блок можно было найти с помощью стрелочек при использовании NVDA
        // Если убрать, то aria-label не будет читаться
        role: "group",
        "aria-label": ariaLabel,
        style: style,
        disabled: disabled,
        before: before,
        after: afterItems,
        status: status,
        mode: mode,
        className: className,
        maxHeight: maxHeight,
        onClick: disabled ? undefined : handleRootClick,
        onMouseDown: handleRootMouseDown,
        children: /*#__PURE__*/ _jsxs("div", {
            className: classNames("vkuiChipsInputBase__host", sizeY !== 'regular' && sizeYClassNames[sizeY], withPlaceholder && "vkuiChipsInputBase__hasPlaceholder", inputValue && "vkuiChipsInputBase__hasInputValue"),
            ref: containerRef,
            onKeyDown: disabled ? undefined : handleListboxKeyDown,
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "vkuiChipsInputBase__listBox",
                    // для a11y
                    ref: listboxRef,
                    role: "listbox",
                    "aria-orientation": "horizontal",
                    "aria-disabled": disabled,
                    "aria-readonly": readOnly,
                    "aria-label": chipsListLabel,
                    children: value.map((option, index)=>/*#__PURE__*/ _jsx(React.Fragment, {
                            children: renderChip({
                                'Component': 'div',
                                'value': option.value,
                                'label': option.label,
                                'disabled': option.disabled || disabled,
                                'readOnly': option.readOnly || readOnly,
                                'className': "vkuiChipsInputBase__chip",
                                'onRemove': handleChipRemove,
                                // чтобы можно было легче найти этот чип в DOM
                                'data-index': index,
                                'data-value': option.value,
                                'data-value-type': typeof option.value,
                                // для a11y
                                'tabIndex': lastFocusedChipOptionIndex === index ? 0 : -1,
                                'role': 'option',
                                'aria-selected': true,
                                'aria-posinset': index + 1,
                                'aria-setsize': valueLength,
                                'aria-description': 'Для удаления используйте Backspace или Delete'
                            }, option)
                        }, `${typeof option.value}-${option.value}`))
                }),
                /*#__PURE__*/ _jsx(Text, _object_spread_props(_object_spread({
                    autoCapitalize: "none",
                    autoComplete: "off",
                    autoCorrect: "off",
                    spellCheck: false
                }, restProps), {
                    "aria-label": ariaLabel,
                    Component: "input",
                    type: "text",
                    id: inputId,
                    getRootRef: inputRef,
                    className: "vkuiChipsInputBase__el",
                    disabled: disabled,
                    readOnly: readOnly,
                    placeholder: withPlaceholder ? placeholder : undefined,
                    value: inputValue,
                    onChange: onInputChange,
                    onBlur: handleInputBlur
                }))
            ]
        })
    });
};

//# sourceMappingURL=ChipsInputBase.js.map