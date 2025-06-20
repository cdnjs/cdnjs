'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, debounce } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useFocusWithin } from "../../hooks/useFocusWithin.js";
import { useStateWithPrev } from "../../hooks/useStateWithPrev.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { useDOM } from "../../lib/dom.js";
import { defaultFilterFn } from "../../lib/select.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { CustomSelectDropdown } from "../CustomSelectDropdown/CustomSelectDropdown.js";
import { CustomSelectOption } from "../CustomSelectOption/CustomSelectOption.js";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon.js";
import { NOT_SELECTED, remapFromNativeValueToSelectValue, remapFromSelectValueToNativeValue } from "../NativeSelect/NativeSelect.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import { CustomSelectClearButton } from "./CustomSelectClearButton.js";
import { CustomSelectInput } from "./CustomSelectInput/CustomSelectInput.js";
const sizeYClassNames = {
    none: "vkuiCustomSelect__sizeYNone",
    compact: "vkuiCustomSelect__sizeYCompact"
};
const findIndexAfter = (options = [], startIndex = -1)=>{
    if (startIndex >= options.length - 1) {
        return -1;
    }
    return options.findIndex((option, i)=>i > startIndex && !option.disabled);
};
const findIndexBefore = (options = [], endIndex = options.length)=>{
    let result = -1;
    if (endIndex <= 0) {
        return result;
    }
    for(let i = endIndex - 1; i >= 0; i--){
        let option = options[i];
        if (!option.disabled) {
            result = i;
            break;
        }
    }
    return result;
};
const warn = warnOnce('CustomSelect');
const checkOptionsValueType = (options)=>{
    if (new Set(options.map((item)=>typeof item.value)).size > 1) {
        warn('Некоторые значения ваших опций имеют разные типы. onChange всегда возвращает строковый тип.', 'error');
    }
};
const checkMixControlledAndUncontrolledState = (oldIsControlled, newIsControlled)=>{
    if (!oldIsControlled && newIsControlled) {
        warn(`Похоже, что компонент был переведен из состояния Uncontrolled в Controlled. Пожалуйста, не делайте так. Если вам нужно отобразить невыбранное состояние компонента, используйте value=null вместо undefined`, 'error');
    }
    if (oldIsControlled && !newIsControlled) {
        warn(`Похоже, что компонент был переведен из состояния Controlled в Uncontrolled. Пожалуйста, не делайте так. Если вам нужно отобразить невыбранное состояние компонента, используйте value=null вместо undefined`, 'error');
    }
};
function defaultRenderOptionFn(_param) {
    var { option } = _param, props = _object_without_properties(_param, [
        "option"
    ]);
    return /*#__PURE__*/ _jsx(CustomSelectOption, _object_spread({}, props));
}
const handleOptionDown = (e)=>{
    e.preventDefault();
};
function findSelectedIndex(options = [], value) {
    if (value === NOT_SELECTED.CUSTOM) {
        return -1;
    }
    var _options_findIndex;
    return (_options_findIndex = options.findIndex((item)=>{
        value = typeof item.value === 'number' ? Number(value) : value;
        return item.value === value;
    })) !== null && _options_findIndex !== void 0 ? _options_findIndex : -1;
}
const filter = (options, inputValue, filterFn)=>{
    return typeof filterFn === 'function' ? options.filter((option)=>filterFn(inputValue, option)) : options;
};
function isMousePositionChanged(event, prevPosition) {
    return Math.abs(prevPosition.x - event.clientX) >= 1 || Math.abs(prevPosition.y - event.clientY) >= 1;
}
/**
 * @see https://vkcom.github.io/VKUI/#/CustomSelect
 */ export function CustomSelect(props) {
    const [opened, setOpened] = React.useState(false);
    const { before, name, className, getRef, getRootRef, popupDirection = 'bottom', style, onChange, children, 'onInputChange': onInputChangeProp, renderDropdown, onOpen, onClose, fetching, forceDropdownPortal, selectType = 'default', searchable = false, 'renderOption': renderOptionProp = defaultRenderOptionFn, 'options': optionsProp, emptyText = 'Ничего не найдено', filterFn = defaultFilterFn, 'icon': iconProp, ClearButton = CustomSelectClearButton, allowClearButton = false, dropdownOffsetDistance = 0, dropdownAutoWidth = false, noMaxHeight = false, 'aria-labelledby': ariaLabelledBy, clearButtonTestId, nativeSelectTestId, defaultValue, required, getSelectInputRef, overscrollBehavior, onInputKeyDown } = props, restProps = _object_without_properties(props, [
        "before",
        "name",
        "className",
        "getRef",
        "getRootRef",
        "popupDirection",
        "style",
        "onChange",
        "children",
        'onInputChange',
        "renderDropdown",
        "onOpen",
        "onClose",
        "fetching",
        "forceDropdownPortal",
        "selectType",
        "searchable",
        'renderOption',
        'options',
        "emptyText",
        "filterFn",
        'icon',
        "ClearButton",
        "allowClearButton",
        "dropdownOffsetDistance",
        "dropdownAutoWidth",
        "noMaxHeight",
        'aria-labelledby',
        "clearButtonTestId",
        "nativeSelectTestId",
        "defaultValue",
        "required",
        "getSelectInputRef",
        "overscrollBehavior",
        "onInputKeyDown"
    ]);
    if (process.env.NODE_ENV === 'development') {
        checkOptionsValueType(optionsProp);
    }
    const { sizeY = 'none' } = useAdaptivity();
    const containerRef = React.useRef(null);
    const handleRootRef = useExternRef(containerRef, getRootRef);
    const scrollBoxRef = React.useRef(null);
    const selectElRef = useExternRef(getRef);
    const optionsWrapperRef = React.useRef(null);
    const scrollPerformedRef = React.useRef(false);
    const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(-1);
    const [isControlledOutside, setIsControlledOutside] = React.useState(props.value !== undefined);
    const [inputValue, setInputValue] = React.useState('');
    const [[nativeSelectValue, prevNativeSelectValue], setNativeSelectValue] = useStateWithPrev(()=>{
        if (props.value !== undefined) {
            return remapFromSelectValueToNativeValue(props.value);
        }
        if (defaultValue !== undefined) {
            return remapFromSelectValueToNativeValue(defaultValue);
        }
        return NOT_SELECTED.NATIVE;
    });
    const [popperPlacement, setPopperPlacement] = React.useState(popupDirection);
    const options = React.useMemo(()=>{
        return filter(optionsProp, inputValue, filterFn);
    }, [
        filterFn,
        inputValue,
        optionsProp
    ]);
    var _props_value, _ref;
    const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(findSelectedIndex(options, (_ref = (_props_value = props.value) !== null && _props_value !== void 0 ? _props_value : defaultValue) !== null && _ref !== void 0 ? _ref : null));
    React.useEffect(function updateOptionsIndexes() {
        const value = props.value !== undefined ? props.value : remapFromNativeValueToSelectValue(nativeSelectValue);
        const selectedIndex = findSelectedIndex(options, value);
        setSelectedOptionIndex(selectedIndex);
        setFocusedOptionIndex(selectedIndex);
    }, [
        props.value,
        nativeSelectValue,
        options,
        filterFn
    ]);
    React.useEffect(function syncIsControlledState() {
        setIsControlledOutside((oldIsControlled)=>{
            const newIsControlled = props.value !== undefined;
            checkMixControlledAndUncontrolledState(oldIsControlled, newIsControlled);
            return newIsControlled;
        });
    }, [
        props.value
    ]);
    React.useEffect(function syncNativeSelectValueWithPropValue() {
        if (props.value !== undefined) {
            setNativeSelectValue(remapFromSelectValueToNativeValue(props.value));
        }
    }, [
        props.value,
        setNativeSelectValue
    ]);
    useIsomorphicLayoutEffect(()=>{
        if (options.some(({ value })=>nativeSelectValue === value) || allowClearButton && nativeSelectValue === NOT_SELECTED.NATIVE) {
            var _selectElRef_current;
            const event = new Event('change', {
                bubbles: true
            });
            (_selectElRef_current = selectElRef.current) === null || _selectElRef_current === void 0 ? void 0 : _selectElRef_current.dispatchEvent(event);
        }
    }, [
        nativeSelectValue
    ]);
    const selected = React.useMemo(()=>{
        if (!options.length) {
            return null;
        }
        return selectedOptionIndex !== undefined ? options[selectedOptionIndex] : undefined;
    }, [
        options,
        selectedOptionIndex
    ]);
    const openedClassNames = React.useMemo(()=>opened && dropdownOffsetDistance === 0 && (popperPlacement.includes('top') ? "vkuiCustomSelect__popUp" : "vkuiCustomSelect__popDown") || undefined, [
        dropdownOffsetDistance,
        opened,
        popperPlacement
    ]);
    const scrollToElement = React.useCallback((index, center = false)=>{
        const dropdown = scrollBoxRef.current;
        const optionsWrapper = optionsWrapperRef.current;
        const item = dropdown && optionsWrapper ? optionsWrapper.children[index] : null;
        if (!item || !dropdown) {
            return;
        }
        const dropdownHeight = dropdown.offsetHeight;
        const scrollTop = dropdown.scrollTop;
        const itemTop = item.offsetTop;
        const itemHeight = item.offsetHeight;
        if (center) {
            dropdown.scrollTop = itemTop - dropdownHeight / 2 + itemHeight / 2;
        } else if (itemTop + itemHeight > dropdownHeight + scrollTop) {
            dropdown.scrollTop = itemTop - dropdownHeight + itemHeight;
        } else if (itemTop < scrollTop) {
            dropdown.scrollTop = itemTop;
        }
    }, []);
    const focusOptionByIndex = React.useCallback((index, scrollTo = true)=>{
        var _options_length;
        if (index === undefined || index < 0 || index > ((_options_length = options.length) !== null && _options_length !== void 0 ? _options_length : 0) - 1) {
            return;
        }
        const option = options[index];
        if (option === null || option === void 0 ? void 0 : option.disabled) {
            return;
        }
        if (scrollTo) {
            scrollToElement(index);
        }
        setFocusedOptionIndex(index);
    }, [
        options,
        scrollToElement
    ]);
    const isValidIndex = React.useCallback((index)=>{
        var _options_length;
        return index >= 0 && index < ((_options_length = options.length) !== null && _options_length !== void 0 ? _options_length : 0);
    }, [
        options.length
    ]);
    useIsomorphicLayoutEffect(()=>{
        if (!opened) {
            scrollPerformedRef.current = false;
            return;
        }
        if (scrollPerformedRef.current) {
            return;
        }
        const isIndexValid = selectedOptionIndex !== undefined && isValidIndex(selectedOptionIndex);
        if (scrollBoxRef.current && isIndexValid) {
            scrollPerformedRef.current = true;
            scrollToElement(selectedOptionIndex, true);
        }
    }, [
        opened,
        selectedOptionIndex,
        scrollToElement,
        isValidIndex
    ]);
    const [keyboardInput, setKeyboardInput] = React.useState('');
    const resetKeyboardInput = React.useCallback(()=>{
        setKeyboardInput('');
    }, []);
    const resetFocusedOption = React.useCallback(()=>{
        setFocusedOptionIndex(-1);
    }, []);
    const onKeyboardInput = React.useCallback((key)=>{
        if (!opened) {
            setOpened(true);
        }
        resetFocusedOption();
        const fullInput = keyboardInput + key;
        setKeyboardInput(fullInput);
    }, [
        keyboardInput,
        opened,
        resetFocusedOption
    ]);
    const close = React.useCallback(()=>{
        resetKeyboardInput();
        setInputValue('');
        setOpened(false);
        resetFocusedOption();
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }, [
        onClose,
        resetKeyboardInput,
        resetFocusedOption
    ]);
    const selectOption = React.useCallback((index)=>{
        const item = options[index];
        var _item_value;
        setNativeSelectValue((_item_value = item === null || item === void 0 ? void 0 : item.value) !== null && _item_value !== void 0 ? _item_value : NOT_SELECTED.NATIVE);
        close();
        const shouldTriggerOnChangeWhenControlledAndInnerValueIsOutOfSync = isControlledOutside && props.value !== nativeSelectValue && nativeSelectValue === (item === null || item === void 0 ? void 0 : item.value);
        if (shouldTriggerOnChangeWhenControlledAndInnerValueIsOutOfSync) {
            var _selectElRef_current;
            const event = new Event('change', {
                bubbles: true
            });
            (_selectElRef_current = selectElRef.current) === null || _selectElRef_current === void 0 ? void 0 : _selectElRef_current.dispatchEvent(event);
        }
    }, [
        close,
        options,
        selectElRef,
        isControlledOutside,
        props.value,
        nativeSelectValue,
        setNativeSelectValue
    ]);
    const selectFocused = React.useCallback(()=>{
        if (focusedOptionIndex === undefined || !isValidIndex(focusedOptionIndex)) {
            return;
        }
        selectOption(focusedOptionIndex);
    }, [
        focusedOptionIndex,
        isValidIndex,
        selectOption
    ]);
    const open = React.useCallback(()=>{
        setOpened(true);
        setFocusedOptionIndex(selectedOptionIndex);
        if (typeof onOpen === 'function') {
            onOpen();
        }
    }, [
        onOpen,
        selectedOptionIndex
    ]);
    const onBlur = React.useCallback(()=>{
        var _selectElRef_current;
        close();
        const event = new Event('focusout', {
            bubbles: true
        });
        (_selectElRef_current = selectElRef.current) === null || _selectElRef_current === void 0 ? void 0 : _selectElRef_current.dispatchEvent(event);
    }, [
        close,
        selectElRef
    ]);
    const onFocus = React.useCallback(()=>{
        var _selectElRef_current;
        const event = new Event('focusin', {
            bubbles: true
        });
        (_selectElRef_current = selectElRef.current) === null || _selectElRef_current === void 0 ? void 0 : _selectElRef_current.dispatchEvent(event);
    }, [
        selectElRef
    ]);
    const onClick = React.useCallback(()=>{
        if (opened) {
            close();
        } else {
            open();
        }
    }, [
        close,
        open,
        opened
    ]);
    const handleKeyUp = React.useMemo(()=>debounce(resetKeyboardInput, 1000), [
        resetKeyboardInput
    ]);
    const focusOption = React.useCallback((type)=>{
        let index = focusedOptionIndex;
        if (type === 'next') {
            const nextIndex = findIndexAfter(options, index);
            index = nextIndex === -1 ? findIndexAfter(options) : nextIndex; // Следующий за index или первый валидный до index
        } else if (type === 'prev') {
            const beforeIndex = findIndexBefore(options, index);
            index = beforeIndex === -1 ? findIndexBefore(options) : beforeIndex; // Предшествующий index или последний валидный после index
        }
        focusOptionByIndex(index);
    }, [
        focusOptionByIndex,
        focusedOptionIndex,
        options
    ]);
    const onNativeSelectChange = (e)=>{
        // для ситуаций, когда в опциях value это string а value/defaultValue это number
        // и наоборот, приводим значение nativeSelectValue из стейта к строке.
        // ведь nativeSelect всегда возвращает string в onChange, а пользователь
        // может использовать number для опций
        //
        // native select всегда возвращает string в качестве value в onChange
        // Когда селект контролируемый, то пользователь, в onChange может сохранить в свой стейт строку (например '3'), хотя
        // в качестве value опции может использовать число (3),
        // тогда строчное значение value ('3') из стейта пользователя
        // будет передано в CustomSelect, и после синхронизации nativeSelectValue (3) и props.value ('3') и после клика на уже выбранную опцию (3),
        // когда nativeSelectValue обновится на значение опции (число 3),
        // сравнение nativeSelectValue (3) и prevNativeSelectValue ('3') может не сработать лишь из-за того, что они в разных типах.
        const convertedNativeSelectValue = typeof nativeSelectValue === 'number' && (typeof props.value === 'string' || typeof prevNativeSelectValue === 'string') ? String(nativeSelectValue) : nativeSelectValue;
        const isCalledWithSameControlledOptionValue = isControlledOutside && props.value === remapFromNativeValueToSelectValue(convertedNativeSelectValue);
        const isNativeValueChanged = convertedNativeSelectValue !== prevNativeSelectValue && prevNativeSelectValue !== undefined;
        const isTriggeredByClearButton = allowClearButton && nativeSelectValue === NOT_SELECTED.NATIVE;
        const shouldCallOnChange = !isCalledWithSameControlledOptionValue && (isNativeValueChanged || isTriggeredByClearButton);
        if (!shouldCallOnChange) {
            return;
        }
        const remappedNativeValue = remapFromNativeValueToSelectValue(e.currentTarget.value);
        if (e.target.value === NOT_SELECTED.NATIVE) {
            e.target.value = '';
        }
        if (e.currentTarget.value === NOT_SELECTED.NATIVE) {
            e.currentTarget.value = '';
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(e, remappedNativeValue);
    };
    const onInputChange = React.useCallback((e)=>{
        onInputChangeProp && onInputChangeProp(e);
        setInputValue(e.target.value);
    }, [
        onInputChangeProp
    ]);
    const areOptionsShown = React.useCallback(()=>{
        return scrollBoxRef.current !== null;
    }, []);
    const handleKeyDownSelect = React.useCallback((event)=>{
        if (event.key.length === 1 && event.key !== ' ') {
            onKeyboardInput(event.key);
            return;
        }
        [
            'ArrowUp',
            'ArrowDown',
            'Escape',
            'Enter'
        ].includes(event.key) && areOptionsShown() && event.preventDefault();
        switch(event.key){
            case 'ArrowUp':
                if (opened) {
                    areOptionsShown() && focusOption('prev');
                } else {
                    open();
                }
                break;
            case 'ArrowDown':
                if (opened) {
                    areOptionsShown() && focusOption('next');
                } else {
                    open();
                }
                break;
            case 'Escape':
                close();
                break;
            case 'Backspace':
            case 'Delete':
                {
                    if (!opened) {
                        setOpened(true);
                    }
                    resetFocusedOption();
                    break;
                }
            case 'Enter':
            case 'Spacebar':
            case ' ':
                if (opened) {
                    areOptionsShown() && selectFocused();
                } else {
                    open();
                }
                break;
        }
    }, [
        areOptionsShown,
        close,
        focusOption,
        onKeyboardInput,
        open,
        opened,
        selectFocused,
        resetFocusedOption
    ]);
    const handleOptionClick = React.useCallback((e)=>{
        var _e_currentTarget_parentNode;
        const index = Array.prototype.indexOf.call((_e_currentTarget_parentNode = e.currentTarget.parentNode) === null || _e_currentTarget_parentNode === void 0 ? void 0 : _e_currentTarget_parentNode.children, e.currentTarget);
        const option = options[index];
        if (option && !option.disabled) {
            selectOption(index);
        }
    }, [
        options,
        selectOption
    ]);
    const lastMousePositionRef = React.useRef({
        x: 0,
        y: 0
    });
    const focusOptionOnMouseMove = React.useCallback((e, index)=>{
        if (isMousePositionChanged(e, lastMousePositionRef.current)) {
            focusOptionByIndex(index, false);
        }
    }, [
        focusOptionByIndex
    ]);
    const popupAriaId = React.useId();
    const renderOption = React.useCallback((option, index)=>{
        const hovered = index === focusedOptionIndex;
        const selected = index === selectedOptionIndex;
        return /*#__PURE__*/ _jsx(React.Fragment, {
            children: renderOptionProp({
                option,
                hovered,
                children: option.label,
                selected,
                disabled: option.disabled,
                onClick: handleOptionClick,
                onMouseDown: handleOptionDown,
                // Используем `onMouseMove` вместо `onMouseEnter/onMouseOver`.
                // Потому что если при навигации с клавиатуры курсор наведён на
                // список, то при первом автоматическом скролле списка вызывается событие MouseOver/MouseEnter
                // обработчик которого фокусирует опцию под курсором, хотя при навигация с клавиатуры пользователь мог уйти дальше по списку, это путает.
                // Причём координаты события меняются на пару пикселей по сравнению с прошлым вызовом,
                // а значит нельзя на них опираться, чтобы запретить обработку такого события.
                // C mousemove такой проблемы нет, что позволяет реализовать поведение при наведении с клавиатуры и при наведении мышью идентично `<select>`.
                onMouseMove: (e)=>focusOptionOnMouseMove(e, index),
                id: `${popupAriaId}-${option.value}`
            })
        }, `${typeof option.value}-${option.value}`);
    }, [
        focusedOptionIndex,
        handleOptionClick,
        focusOptionOnMouseMove,
        renderOptionProp,
        selectedOptionIndex,
        popupAriaId
    ]);
    const resolvedContent = React.useMemo(()=>{
        const defaultDropdownContent = options.length > 0 ? /*#__PURE__*/ _jsx("div", {
            ref: optionsWrapperRef,
            children: options.map(renderOption)
        }) : /*#__PURE__*/ _jsx(Footnote, {
            className: "vkuiCustomSelect__empty",
            children: emptyText
        });
        if (typeof renderDropdown === 'function') {
            return renderDropdown({
                defaultDropdownContent
            });
        } else {
            return defaultDropdownContent;
        }
    }, [
        emptyText,
        options,
        renderDropdown,
        renderOption
    ]);
    const selectInputRef = useExternRef(getSelectInputRef);
    const controlledValueSet = isControlledOutside && props.value !== NOT_SELECTED.CUSTOM;
    const uncontrolledValueSet = !isControlledOutside && nativeSelectValue !== NOT_SELECTED.NATIVE;
    const clearButtonShown = allowClearButton && !opened && (controlledValueSet || uncontrolledValueSet);
    const clearButton = React.useMemo(()=>{
        if (!clearButtonShown) {
            return null;
        }
        return /*#__PURE__*/ _jsx(ClearButton, {
            className: iconProp === undefined ? "vkuiCustomSelect__clearIcon" : undefined,
            onClick: function clearSelectState() {
                setNativeSelectValue(NOT_SELECTED.NATIVE);
                setInputValue('');
                selectInputRef.current && selectInputRef.current.focus();
            },
            disabled: restProps.disabled,
            "data-testid": clearButtonTestId
        });
    }, [
        clearButtonShown,
        ClearButton,
        iconProp,
        restProps.disabled,
        clearButtonTestId,
        setNativeSelectValue,
        selectInputRef
    ]);
    const icon = React.useMemo(()=>{
        if (iconProp !== undefined) {
            return iconProp;
        }
        return /*#__PURE__*/ _jsx(DropdownIcon, {
            className: clearButtonShown ? "vkuiCustomSelect__dropdownIcon" : undefined,
            opened: opened
        });
    }, [
        clearButtonShown,
        iconProp,
        opened
    ]);
    const afterIcons = (icon || clearButtonShown) && /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            clearButton,
            icon
        ]
    });
    const { document } = useDOM();
    const passClickAndFocusToInputOnClick = React.useCallback((e)=>{
        // Раньше внешней оберткой CustomSelect был <label>, что позволяло по клику в любую область CustomSelect,
        // даже где нету интерактивного элемента, фокусировать <input> и передавать на него событие клика.
        // Так как мы больше не оборачиваем CustomSelect в <label>, то для обертки CustomSelect мы симулируем работу <label>.
        // передаем фокус и клик по <input>, если пользователь кликнул в зоне обертки.
        // В <label> мы не больше не оборачиваем, потому что это заставляет скринридер
        // дважды произносить текст выбранной опции при фокусе, если CustomSelect связан с внешним <label>.
        // Воспроизводится в некоторых версиях Chrome, при навигации по странице с помощью стрелок.
        // Договорились со специалистом по доступности убрать <label>-обёртки из Select и CustomSelect
        if (!selectInputRef.current || !document) {
            return;
        }
        const clickTargetIsNotAnInput = e.target !== selectInputRef.current;
        if (clickTargetIsNotAnInput) {
            selectInputRef.current.click();
            const inputIsNotFocused = document.activeElement !== selectInputRef.current;
            if (inputIsNotFocused) {
                selectInputRef.current.focus();
            }
        }
    }, [
        document,
        selectInputRef
    ]);
    const preventInputBlurWhenClickInsideFocusedSelectArea = (e)=>{
        // Так как инпут больше не оборачивается пустым лэйблом, то клик внутри обертки,
        // но вне инпута (например по иконке дропдауна), будет убирать фокус с инпута.
        // Чтобы в такой ситуации отключить blur инпута мы превентим mousedown событие обёртки
        const isInputFocused = document && document.activeElement === selectInputRef.current;
        if (isInputFocused) {
            e.preventDefault();
        }
    };
    const ariaActiveDescendantOptionIndex = focusedOptionIndex !== -1 ? focusedOptionIndex : undefined;
    const ariaActiveDescendantId = ariaActiveDescendantOptionIndex !== undefined ? options[ariaActiveDescendantOptionIndex] && options[ariaActiveDescendantOptionIndex].value : null;
    const selectInputAriaProps = {
        'role': 'combobox',
        'aria-controls': popupAriaId,
        'aria-owns': popupAriaId,
        'aria-expanded': opened,
        'aria-activedescendant': ariaActiveDescendantId && opened ? `${popupAriaId}-${ariaActiveDescendantId}` : undefined,
        'aria-labelledby': ariaLabelledBy,
        'aria-haspopup': 'listbox',
        'aria-autocomplete': 'none'
    };
    const focusWithin = useFocusWithin(handleRootRef);
    const resetOptionFocusOnMouseLeave = React.useCallback((event)=>{
        // В Хроме eсли мышка пользователя находится над инпутом селекта,
        // и он с клавиатуры открывает опции, причём одна из опций
        // уже выбрана, то видно, как выбранная опция получает фокус,
        // но потом сразу же его теряет.
        // Связано это с тем, что в этот момент вызывается onMouseLeave, на который у нас
        // завязан сброс состония фокуса у опции. По хорошему фокус должен оставаться.
        // Нам не интересен вызов onMouseLeave если мышка при этом не двигалась.
        if (isMousePositionChanged(event, lastMousePositionRef.current)) {
            resetFocusedOption();
        }
    }, [
        resetFocusedOption
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames("vkuiCustomSelect__host", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        style: style,
        ref: handleRootRef,
        onClick: passClickAndFocusToInputOnClick,
        onMouseDown: preventInputBlurWhenClickInsideFocusedSelectArea,
        onMouseMove: function updateLastMousePosition(e) {
            lastMousePositionRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        },
        children: [
            focusWithin && selected && !opened && /*#__PURE__*/ _jsx(VisuallyHidden, {
                "aria-live": "polite",
                children: selected.label
            }),
            /*#__PURE__*/ _jsx(CustomSelectInput, _object_spread_props(_object_spread({
                autoComplete: "off",
                autoCapitalize: "none",
                autoCorrect: "off",
                spellCheck: "false"
            }, restProps, selectInputAriaProps), {
                getRef: selectInputRef,
                onFocus: onFocus,
                onBlur: onBlur,
                className: openedClassNames,
                readOnly: !searchable,
                fetching: fetching,
                value: inputValue,
                onKeyUp: handleKeyUp,
                onKeyDown: callMultiple(handleKeyDownSelect, onInputKeyDown),
                onChange: onInputChange,
                onClick: onClick,
                before: before,
                after: afterIcons,
                selectType: selectType,
                children: selected === null || selected === void 0 ? void 0 : selected.label
            })),
            /*#__PURE__*/ _jsxs("select", {
                ref: selectElRef,
                name: name,
                onChange: onNativeSelectChange,
                onBlur: props.onBlur,
                onFocus: props.onFocus,
                onClick: props.onClick,
                value: nativeSelectValue,
                "aria-hidden": true,
                className: "vkuiCustomSelect__control",
                "data-testid": nativeSelectTestId,
                required: required,
                children: [
                    (allowClearButton || nativeSelectValue === NOT_SELECTED.NATIVE) && /*#__PURE__*/ _jsx("option", {
                        value: NOT_SELECTED.NATIVE
                    }, NOT_SELECTED.NATIVE),
                    optionsProp.map((item)=>/*#__PURE__*/ _jsx("option", {
                            value: item.value
                        }, `${item.value}`))
                ]
            }),
            opened && /*#__PURE__*/ _jsx(CustomSelectDropdown, {
                targetRef: containerRef,
                placement: popperPlacement,
                scrollBoxRef: scrollBoxRef,
                onPlacementChange: setPopperPlacement,
                onMouseLeave: resetOptionFocusOnMouseLeave,
                fetching: fetching,
                overscrollBehavior: overscrollBehavior,
                offsetDistance: dropdownOffsetDistance,
                autoWidth: dropdownAutoWidth,
                forcePortal: forceDropdownPortal,
                noMaxHeight: noMaxHeight,
                role: "listbox",
                id: popupAriaId,
                "aria-labelledby": ariaLabelledBy,
                tabIndex: -1,
                children: resolvedContent
            })
        ]
    });
}

//# sourceMappingURL=CustomSelect.js.map