import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { useFocusWithin } from '../../hooks/useFocusWithin';
import { useDOM } from '../../lib/dom';
import { defaultFilterFn } from '../../lib/select';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { debounce } from '../../lib/utils';
import { warnOnce } from '../../lib/warnOnce';
import { CustomSelectDropdown } from '../CustomSelectDropdown/CustomSelectDropdown';
import { CustomSelectOption } from '../CustomSelectOption/CustomSelectOption';
import { DropdownIcon } from '../DropdownIcon/DropdownIcon';
import { Footnote } from '../Typography/Footnote/Footnote';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { CustomSelectClearButton } from './CustomSelectClearButton';
import { CustomSelectInput } from './CustomSelectInput';
import styles from './CustomSelect.module.css';
const sizeYClassNames = {
    none: styles['CustomSelect--sizeY-none'],
    ['compact']: styles['CustomSelect--sizeY-compact']
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
function defaultRenderOptionFn({ option, ...props }) {
    return /*#__PURE__*/ React.createElement(CustomSelectOption, props);
}
const handleOptionDown = (e)=>{
    e.preventDefault();
};
function findSelectedIndex(options = [], value, withClear) {
    if (withClear && value === '') {
        return -1;
    }
    return options.findIndex((item)=>{
        value = typeof item.value === 'number' ? Number(value) : value;
        return item.value === value;
    }) ?? -1;
}
const filter = (options, inputValue, filterFn)=>{
    return typeof filterFn === 'function' ? options.filter((option)=>filterFn(inputValue, option)) : options;
};
const defaultOptions = [];
/**
 * @see https://vkcom.github.io/VKUI/#/CustomSelect
 */ export function CustomSelect(props) {
    const [opened, setOpened] = React.useState(false);
    const { before, name, className, getRef, getRootRef, popupDirection, style, onChange, children, onInputChange: onInputChangeProp, renderDropdown, onOpen, onClose, fetching, forceDropdownPortal, selectType = 'default', autoHideScrollbar, autoHideScrollbarDelay, searchable = false, renderOption: renderOptionProp = defaultRenderOptionFn, options: optionsProp = defaultOptions, emptyText = 'Ничего не найдено', filterFn = defaultFilterFn, icon: iconProp, ClearButton = CustomSelectClearButton, allowClearButton = false, dropdownOffsetDistance = 0, dropdownAutoWidth = false, noMaxHeight = false, ['aria-labelledby']: ariaLabelledBy, clearButtonTestId, nativeSelectTestId, defaultValue, required, ...restProps } = props;
    if (process.env.NODE_ENV === 'development') {
        checkOptionsValueType(optionsProp);
    }
    const { sizeY = 'none' } = useAdaptivity();
    const containerRef = React.useRef(null);
    const handleRootRef = useExternRef(containerRef, getRootRef);
    const scrollBoxRef = React.useRef(null);
    const selectElRef = useExternRef(getRef);
    const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(-1);
    const [isControlledOutside, setIsControlledOutside] = React.useState(props.value !== undefined);
    const [inputValue, setInputValue] = React.useState('');
    const [nativeSelectValue, setNativeSelectValue] = React.useState(()=>props.value ?? defaultValue ?? (allowClearButton ? '' : undefined));
    const [popperPlacement, setPopperPlacement] = React.useState(undefined);
    const [options, setOptions] = React.useState(optionsProp);
    const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(findSelectedIndex(optionsProp, props.value ?? defaultValue, allowClearButton));
    React.useEffect(()=>{
        setIsControlledOutside(props.value !== undefined);
        setNativeSelectValue((nativeSelectValue)=>props.value ?? nativeSelectValue);
    }, [
        props.value
    ]);
    useIsomorphicLayoutEffect(()=>{
        if (options.some(({ value })=>nativeSelectValue === value) || allowClearButton && nativeSelectValue === '') {
            const event = new Event('change', {
                bubbles: true
            });
            selectElRef.current?.dispatchEvent(event);
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
    const openedClassNames = React.useMemo(()=>opened && dropdownOffsetDistance === 0 && (popperPlacement?.includes('top') ? styles['CustomSelect--pop-up'] : styles['CustomSelect--pop-down']) || undefined, [
        dropdownOffsetDistance,
        opened,
        popperPlacement
    ]);
    const scrollToElement = React.useCallback((index, center = false)=>{
        const dropdown = scrollBoxRef.current;
        const item = dropdown ? dropdown.children[index] : null;
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
        if (index === undefined || index < 0 || index > (options.length ?? 0) - 1) {
            return;
        }
        const option = options[index];
        if (option?.disabled) {
            return;
        }
        if (scrollTo) {
            scrollToElement(index);
        }
        // Это оптимизация, прежде всего, под `onMouseMove`
        setFocusedOptionIndex((focusedOptionIndex)=>focusedOptionIndex !== index ? index : focusedOptionIndex);
    }, [
        options,
        scrollToElement
    ]);
    const isValidIndex = React.useCallback((index)=>{
        return index >= 0 && index < (options.length ?? 0);
    }, [
        options.length
    ]);
    const setScrollBoxRef = React.useCallback((ref)=>{
        scrollBoxRef.current = ref;
        if (ref && selectedOptionIndex !== undefined && isValidIndex(selectedOptionIndex)) {
            {
                scrollToElement(selectedOptionIndex, true);
            }
        }
    }, [
        isValidIndex,
        scrollToElement,
        selectedOptionIndex
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
    /**
   * Note: сбрасывать `options` через `setOptions(optionsProp)` не нужно.
   *  Сброс происходит в одном из эффекте `updateOptionsAndSelectedOptionIndex()`.
   */ const close = React.useCallback(()=>{
        resetKeyboardInput();
        setInputValue('');
        setOpened(false);
        resetFocusedOption();
        onClose?.();
    }, [
        onClose,
        resetKeyboardInput,
        resetFocusedOption
    ]);
    const selectOption = React.useCallback((index)=>{
        const item = options[index];
        setNativeSelectValue(item?.value);
        close();
        const shouldTriggerOnChangeWhenControlledAndInnerValueIsOutOfSync = isControlledOutside && props.value !== nativeSelectValue && nativeSelectValue === item?.value;
        if (shouldTriggerOnChangeWhenControlledAndInnerValueIsOutOfSync) {
            const event = new Event('change', {
                bubbles: true
            });
            selectElRef.current?.dispatchEvent(event);
        }
    }, [
        close,
        options,
        selectElRef,
        isControlledOutside,
        props.value,
        nativeSelectValue
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
        close();
        const event = new Event('focusout', {
            bubbles: true
        });
        selectElRef.current?.dispatchEvent(event);
    }, [
        close,
        selectElRef
    ]);
    const onFocus = React.useCallback(()=>{
        const event = new Event('focusin', {
            bubbles: true
        });
        selectElRef.current?.dispatchEvent(event);
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
    React.useEffect(function updateOptionsAndSelectedOptionIndex() {
        const value = props.value ?? nativeSelectValue ?? defaultValue;
        const options = searchable && inputValue !== undefined ? filter(optionsProp, inputValue, filterFn) : optionsProp;
        setOptions(options);
        setSelectedOptionIndex(findSelectedIndex(options, value, allowClearButton));
    }, [
        filterFn,
        inputValue,
        nativeSelectValue,
        optionsProp,
        defaultValue,
        props.value,
        searchable,
        allowClearButton
    ]);
    const onNativeSelectChange = (e)=>{
        const newSelectedOptionIndex = findSelectedIndex(options, e.currentTarget.value, allowClearButton);
        if (selectedOptionIndex !== newSelectedOptionIndex) {
            if (!isControlledOutside) {
                setSelectedOptionIndex(newSelectedOptionIndex);
            }
            onChange?.(e);
        }
    };
    const onInputChange = React.useCallback((e)=>{
        onInputChangeProp && onInputChangeProp(e);
        const options = filter(optionsProp, e.target.value, filterFn);
        setOptions(options);
        setSelectedOptionIndex(findSelectedIndex(options, nativeSelectValue, allowClearButton));
        setInputValue(e.target.value);
    }, [
        filterFn,
        nativeSelectValue,
        onInputChangeProp,
        optionsProp,
        allowClearButton
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
        const index = Array.prototype.indexOf.call(e.currentTarget.parentNode?.children, e.currentTarget);
        const option = options[index];
        if (option && !option.disabled) {
            selectOption(index);
        }
    }, [
        options,
        selectOption
    ]);
    const prevMousePositionRef = React.useRef({
        x: 0,
        y: 0
    });
    const focusOptionOnMouseMove = React.useCallback((e)=>{
        const isMouseChangedPosition = Math.abs(prevMousePositionRef.current.x - e.clientX) >= 1 || Math.abs(prevMousePositionRef.current.y - e.clientY) >= 1;
        if (isMouseChangedPosition) {
            focusOptionByIndex(Array.prototype.indexOf.call(e.currentTarget.parentNode?.children, e.currentTarget), false);
        }
        prevMousePositionRef.current = {
            x: e.clientX,
            y: e.clientY
        };
    }, [
        focusOptionByIndex
    ]);
    const popupAriaId = React.useId();
    const renderOption = React.useCallback((option, index)=>{
        const hovered = index === focusedOptionIndex;
        const selected = index === selectedOptionIndex;
        return /*#__PURE__*/ React.createElement(React.Fragment, {
            key: `${option.value}`
        }, renderOptionProp({
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
            onMouseMove: focusOptionOnMouseMove,
            id: `${popupAriaId}-${option.value}`
        }));
    }, [
        focusedOptionIndex,
        handleOptionClick,
        focusOptionOnMouseMove,
        renderOptionProp,
        selectedOptionIndex,
        popupAriaId
    ]);
    const resolvedContent = React.useMemo(()=>{
        const defaultDropdownContent = options?.length > 0 ? options.map(renderOption) : /*#__PURE__*/ React.createElement(Footnote, {
            className: styles['CustomSelect__empty']
        }, emptyText);
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
    const selectInputRef = React.useRef(null);
    const focusOnInputTimerRef = React.useRef();
    const focusOnInput = React.useCallback(()=>{
        clearTimeout(focusOnInputTimerRef.current);
        focusOnInputTimerRef.current = setTimeout(()=>{
            selectInputRef.current && selectInputRef.current.focus();
        }, 0);
    }, []);
    useIsomorphicLayoutEffect(function clearFocusOnInputTimer() {
        return ()=>{
            clearTimeout(focusOnInputTimerRef.current);
        };
    }, []);
    const controlledValueSet = isControlledOutside && props.value !== '';
    const uncontrolledValueSet = !isControlledOutside && nativeSelectValue !== '';
    const clearButtonShown = allowClearButton && !opened && (controlledValueSet || uncontrolledValueSet);
    const clearButton = React.useMemo(()=>{
        if (!clearButtonShown) {
            return null;
        }
        return /*#__PURE__*/ React.createElement(ClearButton, {
            className: iconProp === undefined ? styles['CustomSelect--clear-icon'] : undefined,
            onClick: function clearSelectState() {
                setNativeSelectValue('');
                setInputValue('');
                focusOnInput();
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
        focusOnInput
    ]);
    const icon = React.useMemo(()=>{
        if (iconProp !== undefined) {
            return iconProp;
        }
        return /*#__PURE__*/ React.createElement(DropdownIcon, {
            className: clearButtonShown ? styles['CustomSelect__dropdown-icon'] : undefined,
            opened: opened
        });
    }, [
        clearButtonShown,
        iconProp,
        opened
    ]);
    const afterIcons = (icon || clearButtonShown) && /*#__PURE__*/ React.createElement(React.Fragment, null, clearButton, icon);
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
                focusOnInput();
            }
        }
    }, [
        document,
        focusOnInput
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
        ['aria-activedescendant']: ariaActiveDescendantId && opened ? `${popupAriaId}-${ariaActiveDescendantId}` : undefined,
        'aria-labelledby': ariaLabelledBy,
        'aria-haspopup': 'listbox',
        'aria-autocomplete': 'none'
    };
    const focusWithin = useFocusWithin(handleRootRef);
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['CustomSelect'], sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        style: style,
        ref: handleRootRef,
        onClick: passClickAndFocusToInputOnClick,
        onMouseDown: preventInputBlurWhenClickInsideFocusedSelectArea
    }, focusWithin && selected && !opened && /*#__PURE__*/ React.createElement(VisuallyHidden, {
        "aria-live": "polite"
    }, selected.label), /*#__PURE__*/ React.createElement(CustomSelectInput, {
        autoComplete: "off",
        autoCapitalize: "none",
        autoCorrect: "off",
        spellCheck: "false",
        ...restProps,
        ...selectInputAriaProps,
        getRef: selectInputRef,
        onFocus: onFocus,
        onBlur: onBlur,
        className: openedClassNames,
        readOnly: !searchable,
        fetching: fetching,
        value: inputValue,
        onKeyUp: handleKeyUp,
        onKeyDown: handleKeyDownSelect,
        onChange: onInputChange,
        onClick: onClick,
        before: before,
        after: afterIcons,
        selectType: selectType
    }, selected?.label), /*#__PURE__*/ React.createElement("select", {
        ref: selectElRef,
        name: name,
        onChange: onNativeSelectChange,
        onBlur: props.onBlur,
        onFocus: props.onFocus,
        onClick: props.onClick,
        value: nativeSelectValue,
        "aria-hidden": true,
        className: styles['CustomSelect__control'],
        "data-testid": nativeSelectTestId,
        required: required
    }, allowClearButton && /*#__PURE__*/ React.createElement("option", {
        key: "",
        value: ""
    }), optionsProp.map((item)=>/*#__PURE__*/ React.createElement("option", {
            key: `${item.value}`,
            value: item.value
        }))), opened && /*#__PURE__*/ React.createElement(CustomSelectDropdown, {
        targetRef: containerRef,
        placement: popupDirection,
        scrollBoxRef: setScrollBoxRef,
        onPlacementChange: setPopperPlacement,
        onMouseLeave: resetFocusedOption,
        fetching: fetching,
        offsetDistance: dropdownOffsetDistance,
        autoWidth: dropdownAutoWidth,
        forcePortal: forceDropdownPortal,
        autoHideScrollbar: autoHideScrollbar,
        autoHideScrollbarDelay: autoHideScrollbarDelay,
        noMaxHeight: noMaxHeight,
        role: "listbox",
        id: popupAriaId,
        "aria-labelledby": ariaLabelledBy,
        tabIndex: -1
    }, resolvedContent));
}

//# sourceMappingURL=CustomSelect.js.map