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
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _type_of = require("@swc/helpers/_/_type_of");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useExternRef = require("../../hooks/useExternRef");
var _useFocusWithin = require("../../hooks/useFocusWithin");
var _useId = require("../../hooks/useId");
var _adaptivity = require("../../lib/adaptivity");
var _dom = require("../../lib/dom");
var _select = require("../../lib/select");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _utils = require("../../lib/utils");
var _warnOnce = require("../../lib/warnOnce");
var _CustomSelectDropdown = require("../CustomSelectDropdown/CustomSelectDropdown");
var _CustomSelectOption = require("../CustomSelectOption/CustomSelectOption");
var _DropdownIcon = require("../DropdownIcon/DropdownIcon");
var _Footnote = require("../Typography/Footnote/Footnote");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
var _CustomSelectClearButton = require("./CustomSelectClearButton");
var _CustomSelectInput = require("./CustomSelectInput");
var sizeYClassNames = _define_property._({
    none: "vkuiCustomSelect--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiCustomSelect--sizeY-compact");
var findIndexAfter = function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], startIndex = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
    if (startIndex >= options.length - 1) {
        return -1;
    }
    return options.findIndex(function(option, i) {
        return i > startIndex && !option.disabled;
    });
};
var findIndexBefore = function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], endIndex = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : options.length;
    var result = -1;
    if (endIndex <= 0) {
        return result;
    }
    for(var i = endIndex - 1; i >= 0; i--){
        var option = options[i];
        if (!option.disabled) {
            result = i;
            break;
        }
    }
    return result;
};
var warn = (0, _warnOnce.warnOnce)("CustomSelect");
var checkOptionsValueType = function(options) {
    if (new Set(options.map(function(item) {
        return _type_of._(item.value);
    })).size > 1) {
        warn("Некоторые значения ваших опций имеют разные типы. onChange всегда возвращает строковый тип.", "error");
    }
};
function defaultRenderOptionFn(_param) {
    var option = _param.option, props = _object_without_properties._(_param, [
        "option"
    ]);
    return /*#__PURE__*/ _react.createElement(_CustomSelectOption.CustomSelectOption, props);
}
var handleOptionDown = function(e) {
    e.preventDefault();
};
function findSelectedIndex() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], value = arguments.length > 1 ? arguments[1] : void 0, withClear = arguments.length > 2 ? arguments[2] : void 0;
    if (withClear && value === "") {
        return -1;
    }
    var _options_findIndex;
    return (_options_findIndex = options.findIndex(function(item) {
        value = typeof item.value === "number" ? Number(value) : value;
        return item.value === value;
    })) !== null && _options_findIndex !== void 0 ? _options_findIndex : -1;
}
var filter = function(options, inputValue, filterFn) {
    return typeof filterFn === "function" ? options.filter(function(option) {
        return filterFn(inputValue, option);
    }) : options;
};
var defaultOptions = [];
function CustomSelect(props) {
    var _React_useState = _sliced_to_array._(_react.useState(false), 2), opened = _React_useState[0], setOpened = _React_useState[1];
    var before = props.before, name = props.name, className = props.className, getRef = props.getRef, getRootRef = props.getRootRef, popupDirection = props.popupDirection, style = props.style, onChange = props.onChange, children = props.children, onInputChangeProp = props.onInputChange, renderDropdown = props.renderDropdown, onOpen = props.onOpen, onClose = props.onClose, fetching = props.fetching, forceDropdownPortal = props.forceDropdownPortal, _props_selectType = props.selectType, selectType = _props_selectType === void 0 ? "default" : _props_selectType, autoHideScrollbar = props.autoHideScrollbar, autoHideScrollbarDelay = props.autoHideScrollbarDelay, _props_searchable = props.searchable, searchable = _props_searchable === void 0 ? false : _props_searchable, tmp = props.renderOption, renderOptionProp = tmp === void 0 ? defaultRenderOptionFn : tmp, tmp1 = props.options, optionsProp = tmp1 === void 0 ? defaultOptions : tmp1, _props_emptyText = props.emptyText, emptyText = _props_emptyText === void 0 ? "Ничего не найдено" : _props_emptyText, _props_filterFn = props.filterFn, filterFn = _props_filterFn === void 0 ? _select.defaultFilterFn : _props_filterFn, iconProp = props.icon, _props_ClearButton = props.ClearButton, ClearButton = _props_ClearButton === void 0 ? _CustomSelectClearButton.CustomSelectClearButton : _props_ClearButton, _props_allowClearButton = props.allowClearButton, allowClearButton = _props_allowClearButton === void 0 ? false : _props_allowClearButton, _props_dropdownOffsetDistance = props.dropdownOffsetDistance, dropdownOffsetDistance = _props_dropdownOffsetDistance === void 0 ? 0 : _props_dropdownOffsetDistance, _props_fixDropdownWidth = props.fixDropdownWidth, fixDropdownWidth = _props_fixDropdownWidth === void 0 ? true : _props_fixDropdownWidth, _props_noMaxHeight = props.noMaxHeight, noMaxHeight = _props_noMaxHeight === void 0 ? false : _props_noMaxHeight, ariaLabelledBy = props["aria-labelledby"], clearButtonTestId = props.clearButtonTestId, nativeSelectTestId = props.nativeSelectTestId, defaultValue = props.defaultValue, required = props.required, restProps = _object_without_properties._(props, [
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
        "fixDropdownWidth",
        "noMaxHeight",
        "aria-labelledby",
        "clearButtonTestId",
        "nativeSelectTestId",
        "defaultValue",
        "required"
    ]);
    if (process.env.NODE_ENV === "development") {
        checkOptionsValueType(optionsProp);
    }
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var containerRef = _react.useRef(null);
    var handleRootRef = (0, _useExternRef.useExternRef)(containerRef, getRootRef);
    var scrollBoxRef = _react.useRef(null);
    var selectElRef = (0, _useExternRef.useExternRef)(getRef);
    var _React_useState1 = _sliced_to_array._(_react.useState(-1), 2), focusedOptionIndex = _React_useState1[0], setFocusedOptionIndex = _React_useState1[1];
    var _React_useState2 = _sliced_to_array._(_react.useState(props.value !== undefined), 2), isControlledOutside = _React_useState2[0], setIsControlledOutside = _React_useState2[1];
    var _React_useState3 = _sliced_to_array._(_react.useState(""), 2), inputValue = _React_useState3[0], setInputValue = _React_useState3[1];
    var _React_useState4 = _sliced_to_array._(_react.useState(function() {
        var _props_value, _ref;
        return (_ref = (_props_value = props.value) !== null && _props_value !== void 0 ? _props_value : defaultValue) !== null && _ref !== void 0 ? _ref : allowClearButton ? "" : undefined;
    }), 2), nativeSelectValue = _React_useState4[0], setNativeSelectValue = _React_useState4[1];
    var _React_useState5 = _sliced_to_array._(_react.useState(undefined), 2), popperPlacement = _React_useState5[0], setPopperPlacement = _React_useState5[1];
    var _React_useState6 = _sliced_to_array._(_react.useState(optionsProp), 2), options = _React_useState6[0], setOptions = _React_useState6[1];
    var _props_value;
    var _React_useState7 = _sliced_to_array._(_react.useState(findSelectedIndex(optionsProp, (_props_value = props.value) !== null && _props_value !== void 0 ? _props_value : defaultValue, allowClearButton)), 2), selectedOptionIndex = _React_useState7[0], setSelectedOptionIndex = _React_useState7[1];
    _react.useEffect(function() {
        setIsControlledOutside(props.value !== undefined);
        setNativeSelectValue(function(nativeSelectValue) {
            var _props_value;
            return (_props_value = props.value) !== null && _props_value !== void 0 ? _props_value : nativeSelectValue;
        });
    }, [
        props.value
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (options.some(function(param) {
            var value = param.value;
            return nativeSelectValue === value;
        }) || allowClearButton && nativeSelectValue === "") {
            var _selectElRef_current;
            var event = new Event("change", {
                bubbles: true
            });
            (_selectElRef_current = selectElRef.current) === null || _selectElRef_current === void 0 ? void 0 : _selectElRef_current.dispatchEvent(event);
        }
    }, [
        nativeSelectValue
    ]);
    var selected = _react.useMemo(function() {
        if (!options.length) {
            return null;
        }
        return selectedOptionIndex !== undefined ? options[selectedOptionIndex] : undefined;
    }, [
        options,
        selectedOptionIndex
    ]);
    var openedClassNames = _react.useMemo(function() {
        return opened && dropdownOffsetDistance === 0 && ((popperPlacement === null || popperPlacement === void 0 ? void 0 : popperPlacement.includes("top")) ? "vkuiCustomSelect--pop-up" : "vkuiCustomSelect--pop-down") || undefined;
    }, [
        dropdownOffsetDistance,
        opened,
        popperPlacement
    ]);
    var scrollToElement = _react.useCallback(function(index) {
        var center = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var dropdown = scrollBoxRef.current;
        var item = dropdown ? dropdown.children[index] : null;
        if (!item || !dropdown) {
            return;
        }
        var dropdownHeight = dropdown.offsetHeight;
        var scrollTop = dropdown.scrollTop;
        var itemTop = item.offsetTop;
        var itemHeight = item.offsetHeight;
        if (center) {
            dropdown.scrollTop = itemTop - dropdownHeight / 2 + itemHeight / 2;
        } else if (itemTop + itemHeight > dropdownHeight + scrollTop) {
            dropdown.scrollTop = itemTop - dropdownHeight + itemHeight;
        } else if (itemTop < scrollTop) {
            dropdown.scrollTop = itemTop;
        }
    }, []);
    var focusOptionByIndex = _react.useCallback(function(index) {
        var scrollTo = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        var _options_length;
        if (index === undefined || index < 0 || index > ((_options_length = options.length) !== null && _options_length !== void 0 ? _options_length : 0) - 1) {
            return;
        }
        var option = options[index];
        if (option === null || option === void 0 ? void 0 : option.disabled) {
            return;
        }
        if (scrollTo) {
            scrollToElement(index);
        }
        // Это оптимизация, прежде всего, под `onMouseMove`
        setFocusedOptionIndex(function(focusedOptionIndex) {
            return focusedOptionIndex !== index ? index : focusedOptionIndex;
        });
    }, [
        options,
        scrollToElement
    ]);
    var isValidIndex = _react.useCallback(function(index) {
        var _options_length;
        return index >= 0 && index < ((_options_length = options.length) !== null && _options_length !== void 0 ? _options_length : 0);
    }, [
        options.length
    ]);
    var setScrollBoxRef = _react.useCallback(function(ref) {
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
    var _React_useState8 = _sliced_to_array._(_react.useState(""), 2), keyboardInput = _React_useState8[0], setKeyboardInput = _React_useState8[1];
    var resetKeyboardInput = _react.useCallback(function() {
        setKeyboardInput("");
    }, []);
    var resetFocusedOption = _react.useCallback(function() {
        setFocusedOptionIndex(-1);
    }, []);
    var onKeyboardInput = _react.useCallback(function(key) {
        if (!opened) {
            setOpened(true);
        }
        resetFocusedOption();
        var fullInput = keyboardInput + key;
        setKeyboardInput(fullInput);
    }, [
        keyboardInput,
        opened,
        resetFocusedOption
    ]);
    /**
   * Note: сбрасывать `options` через `setOptions(optionsProp)` не нужно.
   *  Сброс происходит в одном из эффекте `updateOptionsAndSelectedOptionIndex()`.
   */ var close = _react.useCallback(function() {
        resetKeyboardInput();
        setInputValue("");
        setOpened(false);
        resetFocusedOption();
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }, [
        onClose,
        resetKeyboardInput,
        resetFocusedOption
    ]);
    var selectOption = _react.useCallback(function(index) {
        var item = options[index];
        setNativeSelectValue(item === null || item === void 0 ? void 0 : item.value);
        close();
        var shouldTriggerOnChangeWhenControlledAndInnerValueIsOutOfSync = isControlledOutside && props.value !== nativeSelectValue && nativeSelectValue === (item === null || item === void 0 ? void 0 : item.value);
        if (shouldTriggerOnChangeWhenControlledAndInnerValueIsOutOfSync) {
            var _selectElRef_current;
            var event = new Event("change", {
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
    var selectFocused = _react.useCallback(function() {
        if (focusedOptionIndex === undefined || !isValidIndex(focusedOptionIndex)) {
            return;
        }
        selectOption(focusedOptionIndex);
    }, [
        focusedOptionIndex,
        isValidIndex,
        selectOption
    ]);
    var open = _react.useCallback(function() {
        setOpened(true);
        setFocusedOptionIndex(selectedOptionIndex);
        if (typeof onOpen === "function") {
            onOpen();
        }
    }, [
        onOpen,
        selectedOptionIndex
    ]);
    var onBlur = _react.useCallback(function() {
        var _selectElRef_current;
        close();
        var event = new Event("focusout", {
            bubbles: true
        });
        (_selectElRef_current = selectElRef.current) === null || _selectElRef_current === void 0 ? void 0 : _selectElRef_current.dispatchEvent(event);
    }, [
        close,
        selectElRef
    ]);
    var onFocus = _react.useCallback(function() {
        var _selectElRef_current;
        var event = new Event("focusin", {
            bubbles: true
        });
        (_selectElRef_current = selectElRef.current) === null || _selectElRef_current === void 0 ? void 0 : _selectElRef_current.dispatchEvent(event);
    }, [
        selectElRef
    ]);
    var onClick = _react.useCallback(function() {
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
    var handleKeyUp = _react.useMemo(function() {
        return (0, _utils.debounce)(resetKeyboardInput, 1000);
    }, [
        resetKeyboardInput
    ]);
    var focusOption = _react.useCallback(function(type) {
        var index = focusedOptionIndex;
        if (type === "next") {
            var nextIndex = findIndexAfter(options, index);
            index = nextIndex === -1 ? findIndexAfter(options) : nextIndex; // Следующий за index или первый валидный до index
        } else if (type === "prev") {
            var beforeIndex = findIndexBefore(options, index);
            index = beforeIndex === -1 ? findIndexBefore(options) : beforeIndex; // Предшествующий index или последний валидный после index
        }
        focusOptionByIndex(index);
    }, [
        focusOptionByIndex,
        focusedOptionIndex,
        options
    ]);
    _react.useEffect(function updateOptionsAndSelectedOptionIndex() {
        var _props_value, _ref;
        var value = (_ref = (_props_value = props.value) !== null && _props_value !== void 0 ? _props_value : nativeSelectValue) !== null && _ref !== void 0 ? _ref : defaultValue;
        var options = searchable && inputValue !== undefined ? filter(optionsProp, inputValue, filterFn) : optionsProp;
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
    var onNativeSelectChange = function(e) {
        var newSelectedOptionIndex = findSelectedIndex(options, e.currentTarget.value, allowClearButton);
        if (selectedOptionIndex !== newSelectedOptionIndex) {
            if (!isControlledOutside) {
                setSelectedOptionIndex(newSelectedOptionIndex);
            }
            onChange === null || onChange === void 0 ? void 0 : onChange(e);
        }
    };
    var onInputChange = _react.useCallback(function(e) {
        // TODO [>=6]: удалить `onInputChangeProp`.
        if (onInputChangeProp) {
            var options = onInputChangeProp(e, optionsProp);
            if (options) {
                if (process.env.NODE_ENV === "development") {
                    warn("Этот метод фильтрации устарел. Возвращаемое значение onInputChange будет " + "проигнорировано в v6.0.0. Для фильтрации обновляйте props.options самостоятельно или используйте свойство filterFn.");
                }
                setOptions(options);
                setSelectedOptionIndex(findSelectedIndex(options, nativeSelectValue, allowClearButton));
            }
        } else {
            var options1 = filter(optionsProp, e.target.value, filterFn);
            setOptions(options1);
            setSelectedOptionIndex(findSelectedIndex(options1, nativeSelectValue, allowClearButton));
        }
        setInputValue(e.target.value);
    }, [
        filterFn,
        nativeSelectValue,
        onInputChangeProp,
        optionsProp,
        allowClearButton
    ]);
    var areOptionsShown = _react.useCallback(function() {
        return scrollBoxRef.current !== null;
    }, []);
    var handleKeyDownSelect = _react.useCallback(function(event) {
        if (event.key.length === 1 && event.key !== " ") {
            onKeyboardInput(event.key);
            return;
        }
        [
            "ArrowUp",
            "ArrowDown",
            "Escape",
            "Enter"
        ].includes(event.key) && areOptionsShown() && event.preventDefault();
        switch(event.key){
            case "ArrowUp":
                if (opened) {
                    areOptionsShown() && focusOption("prev");
                } else {
                    open();
                }
                break;
            case "ArrowDown":
                if (opened) {
                    areOptionsShown() && focusOption("next");
                } else {
                    open();
                }
                break;
            case "Escape":
                close();
                break;
            case "Backspace":
            case "Delete":
                {
                    if (!opened) {
                        setOpened(true);
                    }
                    resetFocusedOption();
                    break;
                }
            case "Enter":
            case "Spacebar":
            case " ":
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
    var handleOptionClick = _react.useCallback(function(e) {
        var _e_currentTarget_parentNode;
        var index = Array.prototype.indexOf.call((_e_currentTarget_parentNode = e.currentTarget.parentNode) === null || _e_currentTarget_parentNode === void 0 ? void 0 : _e_currentTarget_parentNode.children, e.currentTarget);
        var option = options[index];
        if (option && !option.disabled) {
            selectOption(index);
        }
    }, [
        options,
        selectOption
    ]);
    var prevMousePositionRef = _react.useRef({
        x: 0,
        y: 0
    });
    var focusOptionOnMouseMove = _react.useCallback(function(e) {
        var isMouseChangedPosition = Math.abs(prevMousePositionRef.current.x - e.clientX) >= 1 || Math.abs(prevMousePositionRef.current.y - e.clientY) >= 1;
        if (isMouseChangedPosition) {
            var _e_currentTarget_parentNode;
            focusOptionByIndex(Array.prototype.indexOf.call((_e_currentTarget_parentNode = e.currentTarget.parentNode) === null || _e_currentTarget_parentNode === void 0 ? void 0 : _e_currentTarget_parentNode.children, e.currentTarget), false);
        }
        prevMousePositionRef.current = {
            x: e.clientX,
            y: e.clientY
        };
    }, [
        focusOptionByIndex
    ]);
    var popupAriaId = (0, _useId.useId)();
    var renderOption = _react.useCallback(function(option, index) {
        var hovered = index === focusedOptionIndex;
        var selected = index === selectedOptionIndex;
        return /*#__PURE__*/ _react.createElement(_react.Fragment, {
            key: "".concat(option.value)
        }, renderOptionProp({
            option: option,
            hovered: hovered,
            children: option.label,
            selected: selected,
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
            id: "".concat(popupAriaId, "-").concat(option.value)
        }));
    }, [
        focusedOptionIndex,
        handleOptionClick,
        focusOptionOnMouseMove,
        renderOptionProp,
        selectedOptionIndex,
        popupAriaId
    ]);
    var resolvedContent = _react.useMemo(function() {
        var defaultDropdownContent = (options === null || options === void 0 ? void 0 : options.length) > 0 ? options.map(renderOption) : /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
            className: "vkuiCustomSelect__empty"
        }, emptyText);
        if (typeof renderDropdown === "function") {
            return renderDropdown({
                defaultDropdownContent: defaultDropdownContent
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
    var selectInputRef = _react.useRef(null);
    var focusOnInputTimerRef = _react.useRef();
    var focusOnInput = _react.useCallback(function() {
        clearTimeout(focusOnInputTimerRef.current);
        focusOnInputTimerRef.current = setTimeout(function() {
            selectInputRef.current && selectInputRef.current.focus();
        }, 0);
    }, []);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function clearFocusOnInputTimer() {
        return function() {
            clearTimeout(focusOnInputTimerRef.current);
        };
    }, []);
    var controlledValueSet = isControlledOutside && props.value !== "";
    var uncontrolledValueSet = !isControlledOutside && nativeSelectValue !== "";
    var clearButtonShown = allowClearButton && !opened && (controlledValueSet || uncontrolledValueSet);
    var clearButton = _react.useMemo(function() {
        if (!clearButtonShown) {
            return null;
        }
        return /*#__PURE__*/ _react.createElement(ClearButton, {
            className: iconProp === undefined ? "vkuiCustomSelect--clear-icon" : undefined,
            onClick: function clearSelectState() {
                setNativeSelectValue("");
                setInputValue("");
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
    var icon = _react.useMemo(function() {
        if (iconProp !== undefined) {
            return iconProp;
        }
        return /*#__PURE__*/ _react.createElement(_DropdownIcon.DropdownIcon, {
            className: clearButtonShown ? "vkuiCustomSelect__dropdown-icon" : undefined,
            opened: opened
        });
    }, [
        clearButtonShown,
        iconProp,
        opened
    ]);
    var afterIcons = (icon || clearButtonShown) && /*#__PURE__*/ _react.createElement(_react.Fragment, null, clearButton, icon);
    var document = (0, _dom.useDOM)().document;
    var passClickAndFocusToInputOnClick = _react.useCallback(function(e) {
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
        var clickTargetIsNotAnInput = e.target !== selectInputRef.current;
        if (clickTargetIsNotAnInput) {
            selectInputRef.current.click();
            var inputIsNotFocused = document.activeElement !== selectInputRef.current;
            if (inputIsNotFocused) {
                focusOnInput();
            }
        }
    }, [
        document,
        focusOnInput
    ]);
    var preventInputBlurWhenClickInsideFocusedSelectArea = function(e) {
        // Так как инпут больше не оборачивается пустым лэйблом, то клик внутри обертки,
        // но вне инпута (например по иконке дропдауна), будет убирать фокус с инпута.
        // Чтобы в такой ситуации отключить blur инпута мы превентим mousedown событие обёртки
        var isInputFocused = document && document.activeElement === selectInputRef.current;
        if (isInputFocused) {
            e.preventDefault();
        }
    };
    var ariaActiveDescendantOptionIndex = focusedOptionIndex !== -1 ? focusedOptionIndex : undefined;
    var ariaActiveDescendantId = ariaActiveDescendantOptionIndex !== undefined ? options[ariaActiveDescendantOptionIndex] && options[ariaActiveDescendantOptionIndex].value : null;
    var _obj;
    var selectInputAriaProps = (_obj = {
        "role": "combobox",
        "aria-controls": popupAriaId,
        "aria-owns": popupAriaId,
        "aria-expanded": opened
    }, _define_property._(_obj, "aria-activedescendant", ariaActiveDescendantId && opened ? "".concat(popupAriaId, "-").concat(ariaActiveDescendantId) : undefined), _define_property._(_obj, "aria-labelledby", ariaLabelledBy), _define_property._(_obj, "aria-haspopup", "listbox"), _define_property._(_obj, "aria-autocomplete", "none"), _obj);
    var focusWithin = (0, _useFocusWithin.useFocusWithin)(handleRootRef);
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCustomSelect", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], className),
        style: style,
        ref: handleRootRef,
        onClick: passClickAndFocusToInputOnClick,
        onMouseDown: preventInputBlurWhenClickInsideFocusedSelectArea
    }, focusWithin && selected && !opened && /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, {
        "aria-live": "polite"
    }, selected.label), /*#__PURE__*/ _react.createElement(_CustomSelectInput.CustomSelectInput, _object_spread_props._(_object_spread._({
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
        onKeyDown: handleKeyDownSelect,
        onChange: onInputChange,
        onClick: onClick,
        before: before,
        after: afterIcons,
        selectType: selectType
    }), selected === null || selected === void 0 ? void 0 : selected.label), /*#__PURE__*/ _react.createElement("select", {
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
        required: required
    }, allowClearButton && /*#__PURE__*/ _react.createElement("option", {
        key: "",
        value: ""
    }), optionsProp.map(function(item) {
        return /*#__PURE__*/ _react.createElement("option", {
            key: "".concat(item.value),
            value: item.value
        });
    })), opened && /*#__PURE__*/ _react.createElement(_CustomSelectDropdown.CustomSelectDropdown, {
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
        autoHideScrollbarDelay: autoHideScrollbarDelay,
        noMaxHeight: noMaxHeight,
        role: "listbox",
        id: popupAriaId,
        "aria-labelledby": ariaLabelledBy,
        tabIndex: -1
    }, resolvedContent));
}

//# sourceMappingURL=CustomSelect.js.map