"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomSelect", {
    enumerable: true,
    get: function() {
        return CustomSelect;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useExternRef = require("../../hooks/useExternRef");
const _dom = require("../../lib/dom");
const _select = require("../../lib/select");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _warnOnce = require("../../lib/warnOnce");
const _CustomSelectDropdown = require("../CustomSelectDropdown/CustomSelectDropdown");
const _DropdownIcon = require("../DropdownIcon/DropdownIcon");
const _Footnote = require("../Typography/Footnote/Footnote");
const _CustomSelectClearButton = require("./CustomSelectClearButton");
const _CustomSelectInput = require("./CustomSelectInput");
const _helpers = require("./helpers");
const sizeYClassNames = {
    none: "vkuiCustomSelect--sizeY-none",
    ['compact']: "vkuiCustomSelect--sizeY-compact"
};
const warn = (0, _warnOnce.warnOnce)('CustomSelect');
const checkOptionsValueType = (options)=>{
    if (new Set(options.map((item)=>typeof item.value)).size > 1) {
        warn('Некоторые значения ваших опций имеют разные типы. onChange всегда возвращает строковый тип.', 'error');
    }
};
const handleOptionDown = (e)=>{
    e.preventDefault();
};
const filter = (options, inputValue, filterFn)=>{
    return typeof filterFn === 'function' ? options.filter((option)=>filterFn(inputValue, option)) : options;
};
function CustomSelect(props) {
    const [opened, setOpened] = _react.useState(false);
    const { before, name, className, getRef, getRootRef, popupDirection = 'bottom', style, onChange, children, onInputChange: onInputChangeProp, renderDropdown, onOpen, onClose, fetching, forceDropdownPortal, selectType = 'default', autoHideScrollbar, autoHideScrollbarDelay, searchable = false, renderOption: renderOptionProp = _helpers.defaultRenderOptionFn, options: optionsProp, emptyText = 'Ничего не найдено', filterFn = _select.defaultFilterFn, icon: iconProp, ClearButton = _CustomSelectClearButton.CustomSelectClearButton, allowClearButton = false, dropdownOffsetDistance = 0, dropdownAutoWidth = false, noMaxHeight = false, ['aria-labelledby']: ariaLabelledBy, clearButtonTestId, nativeSelectTestId, defaultValue, required, getSelectInputRef, overscrollBehavior } = props, restProps = _object_without_properties._(props, [
        "before",
        "name",
        "className",
        "getRef",
        "getRootRef",
        "popupDirection",
        "style",
        "onChange",
        "children",
        "onInputChange",
        "renderDropdown",
        "onOpen",
        "onClose",
        "fetching",
        "forceDropdownPortal",
        "selectType",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "searchable",
        "renderOption",
        "options",
        "emptyText",
        "filterFn",
        "icon",
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
        "overscrollBehavior"
    ]);
    if (process.env.NODE_ENV === 'development') {
        checkOptionsValueType(optionsProp);
    }
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const containerRef = _react.useRef(null);
    const handleRootRef = (0, _useExternRef.useExternRef)(containerRef, getRootRef);
    const scrollBoxRef = _react.useRef(null);
    const selectElRef = (0, _useExternRef.useExternRef)(getRef);
    const optionsWrapperRef = _react.useRef(null);
    const selectInputRef = (0, _useExternRef.useExternRef)(getSelectInputRef);
    const [focusedOptionIndex, setFocusedOptionIndex] = _react.useState(-1);
    const [isControlledOutside, setIsControlledOutside] = _react.useState(props.value !== undefined);
    const [nativeSelectValue, setNativeSelectValue] = _react.useState(()=>{
        var _props_value, _ref;
        return (_ref = (_props_value = props.value) !== null && _props_value !== void 0 ? _props_value : defaultValue) !== null && _ref !== void 0 ? _ref : allowClearButton ? '' : undefined;
    });
    const [inputValue, setInputValue] = _react.useState(()=>(0, _helpers.calculateInputValueFromOptions)(optionsProp, nativeSelectValue));
    const [popperPlacement, setPopperPlacement] = _react.useState(popupDirection);
    const [options, setOptions] = _react.useState(optionsProp);
    var _props_value;
    const [selectedOptionIndex, setSelectedOptionIndex] = _react.useState((0, _helpers.findSelectedIndex)(optionsProp, (_props_value = props.value) !== null && _props_value !== void 0 ? _props_value : defaultValue, allowClearButton));
    _react.useEffect(()=>{
        setIsControlledOutside(props.value !== undefined);
        setNativeSelectValue((nativeSelectValue)=>{
            var _props_value;
            return (_props_value = props.value) !== null && _props_value !== void 0 ? _props_value : nativeSelectValue;
        });
    }, [
        props.value
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (options.some(({ value })=>nativeSelectValue === value) || allowClearButton && nativeSelectValue === '') {
            var _selectElRef_current;
            const event = new Event('change', {
                bubbles: true
            });
            (_selectElRef_current = selectElRef.current) === null || _selectElRef_current === void 0 ? void 0 : _selectElRef_current.dispatchEvent(event);
        }
    }, [
        nativeSelectValue
    ]);
    const selected = _react.useMemo(()=>{
        if (!options.length) {
            return null;
        }
        return selectedOptionIndex !== undefined ? options[selectedOptionIndex] : undefined;
    }, [
        options,
        selectedOptionIndex
    ]);
    const openedClassNames = _react.useMemo(()=>opened && dropdownOffsetDistance === 0 && (popperPlacement.includes('top') ? "vkuiCustomSelect--pop-up" : "vkuiCustomSelect--pop-down") || undefined, [
        dropdownOffsetDistance,
        opened,
        popperPlacement
    ]);
    const scrollToElement = _react.useCallback((index, center = false)=>{
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
    const focusOptionByIndex = _react.useCallback((index, scrollTo = true)=>{
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
        // Это оптимизация, прежде всего, под `onMouseMove`
        setFocusedOptionIndex((focusedOptionIndex)=>focusedOptionIndex !== index ? index : focusedOptionIndex);
    }, [
        options,
        scrollToElement
    ]);
    const isValidIndex = _react.useCallback((index)=>{
        var _options_length;
        return index >= 0 && index < ((_options_length = options.length) !== null && _options_length !== void 0 ? _options_length : 0);
    }, [
        options.length
    ]);
    const setScrollBoxRef = _react.useCallback((ref)=>{
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
    const [keyboardInput, setKeyboardInput] = _react.useState('');
    const resetKeyboardInput = _react.useCallback(()=>{
        setKeyboardInput('');
    }, []);
    const resetFocusedOption = _react.useCallback(()=>{
        setFocusedOptionIndex(-1);
    }, []);
    const onKeyboardInput = _react.useCallback((key)=>{
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
   */ const close = _react.useCallback(()=>{
        resetKeyboardInput();
        setOpened(false);
        resetFocusedOption();
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }, [
        onClose,
        resetKeyboardInput,
        resetFocusedOption
    ]);
    const selectOption = _react.useCallback((index)=>{
        const item = options[index];
        close();
        setNativeSelectValue(item === null || item === void 0 ? void 0 : item.value);
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
        nativeSelectValue
    ]);
    const selectFocused = _react.useCallback(()=>{
        if (focusedOptionIndex === undefined || !isValidIndex(focusedOptionIndex)) {
            return;
        }
        selectOption(focusedOptionIndex);
    }, [
        focusedOptionIndex,
        isValidIndex,
        selectOption
    ]);
    const open = _react.useCallback(()=>{
        setOpened(true);
        setFocusedOptionIndex(selectedOptionIndex);
        if (typeof onOpen === 'function') {
            onOpen();
        }
    }, [
        onOpen,
        selectedOptionIndex
    ]);
    const onBlur = _react.useCallback(()=>{
        var _selectElRef_current;
        close();
        const event = new Event('focusout', {
            bubbles: true
        });
        (_selectElRef_current = selectElRef.current) === null || _selectElRef_current === void 0 ? void 0 : _selectElRef_current.dispatchEvent(event);
        setInputValue((0, _helpers.calculateInputValueFromOptions)(optionsProp, nativeSelectValue));
    }, [
        close,
        selectElRef,
        optionsProp,
        nativeSelectValue
    ]);
    const onFocus = _react.useCallback(()=>{
        var _selectElRef_current, _selectInputRef_current;
        const event = new Event('focusin', {
            bubbles: true
        });
        (_selectElRef_current = selectElRef.current) === null || _selectElRef_current === void 0 ? void 0 : _selectElRef_current.dispatchEvent(event);
        (_selectInputRef_current = selectInputRef.current) === null || _selectInputRef_current === void 0 ? void 0 : _selectInputRef_current.select();
    }, [
        selectElRef,
        selectInputRef
    ]);
    const onClick = _react.useCallback(()=>{
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
    const handleKeyUp = _react.useMemo(()=>(0, _vkjs.debounce)(resetKeyboardInput, 1000), [
        resetKeyboardInput
    ]);
    const focusOption = _react.useCallback((type)=>{
        let index = focusedOptionIndex;
        if (type === 'next') {
            const nextIndex = (0, _helpers.findIndexAfter)(options, index);
            index = nextIndex === -1 ? (0, _helpers.findIndexAfter)(options) : nextIndex; // Следующий за index или первый валидный до index
        } else if (type === 'prev') {
            const beforeIndex = (0, _helpers.findIndexBefore)(options, index);
            index = beforeIndex === -1 ? (0, _helpers.findIndexBefore)(options) : beforeIndex; // Предшествующий index или последний валидный после index
        }
        focusOptionByIndex(index);
    }, [
        focusOptionByIndex,
        focusedOptionIndex,
        options
    ]);
    _react.useEffect(function filterOptions() {
        const options = searchable && inputValue !== undefined ? filter(optionsProp, inputValue, filterFn) : optionsProp;
        setOptions(options);
    }, [
        filterFn,
        inputValue,
        optionsProp,
        searchable
    ]);
    var _props_value1, _ref;
    const selectValue = (_ref = (_props_value1 = props.value) !== null && _props_value1 !== void 0 ? _props_value1 : nativeSelectValue) !== null && _ref !== void 0 ? _ref : defaultValue;
    _react.useEffect(function updateSelectedOptionIndexOnValueChange() {
        setSelectedOptionIndex((0, _helpers.findSelectedIndex)(options, selectValue, allowClearButton));
    }, [
        selectValue,
        allowClearButton,
        options
    ]);
    const prevSelectValueRef = _react.useRef(selectValue);
    _react.useEffect(function updateInputValueOnSelectValueChange() {
        if (prevSelectValueRef.current === selectValue) {
            return;
        }
        setInputValue((0, _helpers.calculateInputValueFromOptions)(optionsProp, selectValue));
    }, [
        selectValue,
        optionsProp
    ]);
    _react.useEffect(function updatePrevSelectValue() {
        prevSelectValueRef.current = selectValue;
    }, [
        selectValue
    ]);
    const onNativeSelectChange = (e)=>{
        const newSelectedOptionIndex = (0, _helpers.findSelectedIndex)(options, e.currentTarget.value, allowClearButton);
        if (selectedOptionIndex !== newSelectedOptionIndex) {
            if (!isControlledOutside) {
                setSelectedOptionIndex(newSelectedOptionIndex);
            }
            onChange === null || onChange === void 0 ? void 0 : onChange(e);
        }
    };
    const onInputChange = _react.useCallback((e)=>{
        onInputChangeProp && onInputChangeProp(e);
        const options = filter(optionsProp, e.target.value, filterFn);
        setOptions(options);
        setSelectedOptionIndex((0, _helpers.findSelectedIndex)(options, nativeSelectValue, allowClearButton));
        setInputValue(e.target.value);
    }, [
        filterFn,
        nativeSelectValue,
        onInputChangeProp,
        optionsProp,
        allowClearButton
    ]);
    const areOptionsShown = _react.useCallback(()=>{
        return scrollBoxRef.current !== null;
    }, []);
    const handleKeyDownSelect = _react.useCallback((event)=>{
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
    const handleOptionClick = _react.useCallback((e)=>{
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
    const prevMousePositionRef = _react.useRef({
        x: 0,
        y: 0
    });
    const focusOptionOnMouseMove = _react.useCallback((e, index)=>{
        const isMouseChangedPosition = Math.abs(prevMousePositionRef.current.x - e.clientX) >= 1 || Math.abs(prevMousePositionRef.current.y - e.clientY) >= 1;
        if (isMouseChangedPosition) {
            focusOptionByIndex(index, false);
        }
        prevMousePositionRef.current = {
            x: e.clientX,
            y: e.clientY
        };
    }, [
        focusOptionByIndex
    ]);
    const popupAriaId = _react.useId();
    const renderOption = _react.useCallback((option, index)=>{
        const hovered = index === focusedOptionIndex;
        const selected = index === selectedOptionIndex;
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Fragment, {
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
    const resolvedContent = _react.useMemo(()=>{
        const defaultDropdownContent = options.length > 0 ? /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
            ref: optionsWrapperRef,
            children: options.map(renderOption)
        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
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
    const focusOnInputTimerRef = _react.useRef();
    const focusOnInput = _react.useCallback(()=>{
        clearTimeout(focusOnInputTimerRef.current);
        focusOnInputTimerRef.current = setTimeout(()=>{
            selectInputRef.current && selectInputRef.current.focus();
        }, 0);
    }, [
        selectInputRef
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function clearFocusOnInputTimer() {
        return ()=>{
            clearTimeout(focusOnInputTimerRef.current);
        };
    }, []);
    const controlledValueSet = isControlledOutside && props.value !== '';
    const uncontrolledValueSet = !isControlledOutside && nativeSelectValue !== '';
    const clearButtonShown = allowClearButton && !opened && (controlledValueSet || uncontrolledValueSet);
    const clearButton = _react.useMemo(()=>{
        if (!clearButtonShown) {
            return null;
        }
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(ClearButton, {
            className: iconProp === undefined ? "vkuiCustomSelect--clear-icon" : undefined,
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
    const icon = _react.useMemo(()=>{
        if (iconProp !== undefined) {
            return iconProp;
        }
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_DropdownIcon.DropdownIcon, {
            className: clearButtonShown ? "vkuiCustomSelect__dropdown-icon" : undefined,
            opened: opened
        });
    }, [
        clearButtonShown,
        iconProp,
        opened
    ]);
    const afterIcons = (icon || clearButtonShown) && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
        children: [
            clearButton,
            icon
        ]
    });
    const { document } = (0, _dom.useDOM)();
    const passClickAndFocusToInputOnClick = _react.useCallback((e)=>{
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
        focusOnInput,
        selectInputRef
    ]);
    const preventInputBlurWhenClickInsideFocusedSelectArea = (e)=>{
        var _selectInputRef_current;
        // Так как инпут больше не оборачивается пустым лэйблом, то клик внутри обертки,
        // но вне инпута (например по иконке дропдауна), будет убирать фокус с инпута.
        // Чтобы в такой ситуации отключить blur инпута мы превентим mousedown событие обёртки
        const isInputFocused = document && document.activeElement === selectInputRef.current;
        const clickTarget = e.target;
        const inputClicked = (_selectInputRef_current = selectInputRef.current) === null || _selectInputRef_current === void 0 ? void 0 : _selectInputRef_current.contains(clickTarget);
        if (isInputFocused && !inputClicked) {
            e.preventDefault();
        }
    };
    const ariaActiveDescendantOptionIndex = focusedOptionIndex !== -1 ? focusedOptionIndex : undefined;
    const ariaActiveDescendantId = ariaActiveDescendantOptionIndex !== undefined ? options[ariaActiveDescendantOptionIndex] && options[ariaActiveDescendantOptionIndex].value : null;
    const selectInputAriaProps = {
        'role': 'combobox',
        'aria-controls': popupAriaId,
        'aria-expanded': opened,
        ['aria-activedescendant']: ariaActiveDescendantId && opened ? `${popupAriaId}-${ariaActiveDescendantId}` : undefined,
        'aria-labelledby': ariaLabelledBy,
        'aria-haspopup': 'listbox',
        'aria-autocomplete': 'none'
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
        className: (0, _vkjs.classNames)("vkuiCustomSelect", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        style: style,
        ref: handleRootRef,
        onClick: passClickAndFocusToInputOnClick,
        onMouseDown: preventInputBlurWhenClickInsideFocusedSelectArea,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_CustomSelectInput.CustomSelectInput, _object_spread_props._(_object_spread._({
                autoComplete: "off",
                autoCapitalize: "none",
                autoCorrect: "off",
                spellCheck: "false"
            }, restProps, selectInputAriaProps), {
                getRef: selectInputRef,
                onFocus: onFocus,
                onBlur: onBlur,
                className: openedClassNames,
                searchable: searchable,
                fetching: fetching,
                value: inputValue,
                onKeyUp: handleKeyUp,
                onKeyDown: handleKeyDownSelect,
                onChange: onInputChange,
                onClick: onClick,
                before: before,
                after: afterIcons,
                selectType: selectType,
                selectedOptionLabel: selected === null || selected === void 0 ? void 0 : selected.label
            })),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("select", {
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
                    allowClearButton && /*#__PURE__*/ (0, _jsxruntime.jsx)("option", {
                        value: ""
                    }, ""),
                    optionsProp.map((item)=>/*#__PURE__*/ (0, _jsxruntime.jsx)("option", {
                            value: item.value
                        }, `${item.value}`))
                ]
            }),
            opened && /*#__PURE__*/ (0, _jsxruntime.jsx)(_CustomSelectDropdown.CustomSelectDropdown, {
                targetRef: containerRef,
                placement: popperPlacement,
                scrollBoxRef: setScrollBoxRef,
                onPlacementChange: setPopperPlacement,
                onMouseLeave: resetFocusedOption,
                fetching: fetching,
                overscrollBehavior: overscrollBehavior,
                offsetDistance: dropdownOffsetDistance,
                autoWidth: dropdownAutoWidth,
                forcePortal: forceDropdownPortal,
                autoHideScrollbar: autoHideScrollbar,
                autoHideScrollbarDelay: autoHideScrollbarDelay,
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