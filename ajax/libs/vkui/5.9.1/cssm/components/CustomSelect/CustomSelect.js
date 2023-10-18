import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { SizeType } from '../../lib/adaptivity';
import { defaultFilterFn, getFormFieldModeFromSelectType } from '../../lib/select';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { debounce, getTitleFromChildren } from '../../lib/utils';
import { warnOnce } from '../../lib/warnOnce';
import { CustomSelectDropdown } from '../CustomSelectDropdown/CustomSelectDropdown';
import { CustomSelectOption } from '../CustomSelectOption/CustomSelectOption';
import { DropdownIcon } from '../DropdownIcon/DropdownIcon';
import { Input } from '../Input/Input';
import { SelectMimicry } from '../SelectMimicry/SelectMimicry';
import { Footnote } from '../Typography/Footnote/Footnote';
import { CustomSelectClearButton } from './CustomSelectClearButton';
import styles from './CustomSelect.module.css';
const sizeYClassNames = {
    none: styles['CustomSelect--sizeY-none'],
    [SizeType.COMPACT]: styles['CustomSelect--sizeY-compact']
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
function findSelectedIndex(options, value, withClear) {
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
    const { before, name, className, getRef, getRootRef, popupDirection, style, onChange, children, onInputChange: onInputChangeProp, renderDropdown, onOpen, onClose, fetching, forceDropdownPortal, selectType = 'default', autoHideScrollbar, autoHideScrollbarDelay, searchable = false, renderOption: renderOptionProp = defaultRenderOptionFn, options: optionsProp = defaultOptions, emptyText = 'Ничего не найдено', filterFn = defaultFilterFn, icon: iconProp, ClearButton = CustomSelectClearButton, allowClearButton = false, dropdownOffsetDistance = 0, fixDropdownWidth = true, ...restProps } = props;
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
    const [nativeSelectValue, setNativeSelectValue] = React.useState(()=>props.value ?? props.defaultValue ?? (allowClearButton ? '' : undefined));
    const [keyboardInput, setKeyboardInput] = React.useState('');
    const [popperPlacement, setPopperPlacement] = React.useState(undefined);
    const [options, setOptions] = React.useState(optionsProp);
    const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(findSelectedIndex(optionsProp, props.value ?? props.defaultValue, allowClearButton));
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
    const resetKeyboardInput = React.useCallback(()=>{
        setKeyboardInput('');
    }, []);
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
    const isValidIndex = React.useCallback((index)=>{
        return index >= 0 && index < (options.length ?? 0);
    }, [
        options.length
    ]);
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
        // Это оптимизация, прежде всего, под `onMouseOver`
        setFocusedOptionIndex((focusedOptionIndex)=>focusedOptionIndex !== index ? index : focusedOptionIndex);
    }, [
        options,
        scrollToElement
    ]);
    const areOptionsShown = React.useCallback(()=>{
        return scrollBoxRef.current !== null;
    }, []);
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
    const onKeyboardInput = React.useCallback((key)=>{
        const fullInput = keyboardInput + key;
        const optionIndex = options.findIndex((option)=>{
            return getTitleFromChildren(option.label).toLowerCase().includes(fullInput);
        });
        if (optionIndex !== undefined && optionIndex > -1) {
            focusOptionByIndex(optionIndex);
        }
        setKeyboardInput(fullInput);
    }, [
        focusOptionByIndex,
        keyboardInput,
        options
    ]);
    /**
   * Note: сбрасывать `options` через `setOptions(optionsProp)` не нужно.
   *  Сброс происходит в одном из эффекте `updateOptionsAndSelectedOptionIndex()`.
   */ const close = React.useCallback(()=>{
        resetKeyboardInput();
        setInputValue('');
        setOpened(false);
        setFocusedOptionIndex(-1);
        onClose?.();
    }, [
        onClose,
        resetKeyboardInput
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
        const event = new Event('blur');
        selectElRef.current?.dispatchEvent(event);
    }, [
        close,
        selectElRef
    ]);
    const resetFocusedOption = React.useCallback(()=>{
        setFocusedOptionIndex(-1);
    }, []);
    const onFocus = React.useCallback(()=>{
        const event = new Event('focus');
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
        const value = props.value ?? nativeSelectValue ?? props.defaultValue;
        const options = searchable && inputValue !== undefined ? filter(optionsProp, inputValue, filterFn) : optionsProp;
        setOptions(options);
        setSelectedOptionIndex(findSelectedIndex(options, value, allowClearButton));
    }, [
        filterFn,
        inputValue,
        nativeSelectValue,
        optionsProp,
        props.defaultValue,
        props.value,
        searchable,
        allowClearButton
    ]);
    /**
   * Нужен для правильного поведения обработчика onClick на select. Фильтрует клики, которые были сделаны по
   * выпадающему списку.
   */ const onLabelClick = React.useCallback((e)=>{
        if (scrollBoxRef.current?.contains(e.target)) {
            e.preventDefault();
        }
    }, []);
    const onNativeSelectChange = (e)=>{
        const newSelectedOptionIndex = findSelectedIndex(options, e.currentTarget.value, allowClearButton);
        if (selectedOptionIndex !== newSelectedOptionIndex) {
            if (!isControlledOutside) {
                setSelectedOptionIndex(newSelectedOptionIndex);
            }
            onChange?.(e);
        }
    };
    const onInputKeyDown = React.useCallback((event)=>{
        [
            'ArrowUp',
            'ArrowDown',
            'Escape',
            'Enter'
        ].includes(event.key) && areOptionsShown() && event.preventDefault();
        switch(event.key){
            case 'ArrowUp':
                areOptionsShown() && focusOption('prev');
                break;
            case 'ArrowDown':
                areOptionsShown() && focusOption('next');
                break;
            case 'Escape':
                close();
                break;
            case 'Enter':
                areOptionsShown() && selectFocused();
                break;
        }
    }, [
        areOptionsShown,
        close,
        focusOption,
        selectFocused
    ]);
    const onInputChange = React.useCallback((e)=>{
        // TODO [>=6]: удалить `onInputChangeProp`.
        if (onInputChangeProp) {
            const options = onInputChangeProp(e, optionsProp);
            if (options) {
                if (process.env.NODE_ENV === 'development') {
                    warn('Этот метод фильтрации устарел. Возвращаемое значение onInputChange будет ' + 'проигнорировано в v6.0.0. Для фильтрации обновляйте props.options самостоятельно или используйте свойство filterFn.');
                }
                setOptions(options);
                setSelectedOptionIndex(findSelectedIndex(options, nativeSelectValue, allowClearButton));
            }
        } else {
            const options = filter(optionsProp, e.target.value, filterFn);
            setOptions(options);
            setSelectedOptionIndex(findSelectedIndex(options, nativeSelectValue, allowClearButton));
        }
        setInputValue(e.target.value);
    }, [
        filterFn,
        nativeSelectValue,
        onInputChangeProp,
        optionsProp,
        allowClearButton
    ]);
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
        selectFocused
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
    const handleOptionHover = React.useCallback((e)=>{
        focusOptionByIndex(Array.prototype.indexOf.call(e.currentTarget.parentNode?.children, e.currentTarget), false);
    }, [
        focusOptionByIndex
    ]);
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
            // Используем `onMouseOver` вместо `onMouseEnter`.
            // При параметре `searchable`, обновляется "ребёнок", из-за чего `onMouseEnter` не срабатывает в следующих кейсах:
            //  1. До загрузки выпадающего списка, курсор мышки находится над произвольным элементом этого списка.
            //     > Лечение: только увод курсора мыши и возвращении его обратно вызывает событие `onMouseEnter` на этот элемент.
            //  2. Если это тач-устройство.
            //     > Лечение: нужно нажать на какой-нибудь произвольный элемент списка, после чего `onMouseEnter` будет работать на соседние элементы,
            //     но не на тот, на который нажали в первый раз.
            // Более подробно по ссылке https://github.com/facebook/react/issues/13956#issuecomment-1082055744
            onMouseOver: handleOptionHover
        }));
    }, [
        focusedOptionIndex,
        handleOptionClick,
        handleOptionHover,
        renderOptionProp,
        selectedOptionIndex
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
    const controlledValueSet = isControlledOutside && props.value !== '';
    const uncontrolledValueSet = !isControlledOutside && nativeSelectValue !== '';
    const clearButtonShown = allowClearButton && !opened && (controlledValueSet || uncontrolledValueSet);
    const clearButton = React.useMemo(()=>{
        if (!clearButtonShown) {
            return null;
        }
        return /*#__PURE__*/ React.createElement(ClearButton, {
            className: iconProp === undefined ? styles['CustomSelect--clear-icon'] : undefined,
            onClick: ()=>setNativeSelectValue('')
        });
    }, [
        clearButtonShown,
        ClearButton,
        iconProp
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
    return /*#__PURE__*/ React.createElement("label", {
        className: classNames(styles['CustomSelect'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], className),
        style: style,
        ref: handleRootRef,
        onClick: onLabelClick
    }, opened && searchable ? /*#__PURE__*/ React.createElement(Input, {
        ...restProps,
        autoFocus: true,
        onBlur: onBlur,
        className: openedClassNames,
        value: inputValue,
        onKeyDown: onInputKeyDown,
        onChange: onInputChange,
        // TODO Ожидается, что клик поймает нативный select, но его перехватывает Input. К сожалению, это приводит к конфликтам типизации.
        // TODO Нужно перестать пытаться превратить CustomSelect в select. Тогда эта проблема уйдёт.
        // @ts-expect-error: TS2322 MouseEventHandler<HTMLSelectElement> !== MouseEventHandler<HTMLInputElement>
        onClick: props.onClick,
        before: before,
        after: afterIcons,
        mode: getFormFieldModeFromSelectType(selectType)
    }) : /*#__PURE__*/ React.createElement(SelectMimicry, {
        ...restProps,
        "aria-hidden": true,
        onClick: onClick,
        onKeyDown: handleKeyDownSelect,
        onKeyUp: handleKeyUp,
        onFocus: onFocus,
        onBlur: onBlur,
        className: openedClassNames,
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
        className: styles['CustomSelect__control']
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
        sameWidth: fixDropdownWidth,
        forcePortal: forceDropdownPortal,
        autoHideScrollbar: autoHideScrollbar,
        autoHideScrollbarDelay: autoHideScrollbarDelay
    }, resolvedContent));
}

//# sourceMappingURL=CustomSelect.js.map