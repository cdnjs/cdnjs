"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChipsSelect", {
    enumerable: true,
    get: function() {
        return ChipsSelect;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useExternRef = require("../../hooks/useExternRef");
const _useGlobalOnClickOutside = require("../../hooks/useGlobalOnClickOutside");
const _accessibility = require("../../lib/accessibility");
const _select = require("../../lib/select");
const _ChipsInputBase = require("../ChipsInputBase/ChipsInputBase");
const _constants = require("../ChipsInputBase/constants");
const _CustomSelectDropdown = require("../CustomSelectDropdown/CustomSelectDropdown");
const _CustomSelectOption = require("../CustomSelectOption/CustomSelectOption");
const _DropdownIcon = require("../DropdownIcon/DropdownIcon");
const _Footnote = require("../Typography/Footnote/Footnote");
const _constants1 = require("./constants");
const _useChipsSelect = require("./useChipsSelect");
const stylesDropdownVerticalPlacement = {
    top: "vkuiChipsSelect--pop-up",
    bottom: "vkuiChipsSelect--pop-down"
};
const findIndexAfter = (options = [], startIndex = -1)=>{
    if (startIndex >= options.length - 1) {
        return -1;
    }
    return options.findIndex((option, i)=>i > startIndex && (!(0, _constants1.isNotServicePreset)(option) || !option.disabled));
};
const findIndexBefore = (options = [], endIndex = options.length)=>{
    let result = -1;
    if (endIndex <= 0) {
        return result;
    }
    for(let i = endIndex - 1; i >= 0; i--){
        let option = options[i];
        if (!(0, _constants1.isNotServicePreset)(option) || !option.disabled) {
            result = i;
            break;
        }
    }
    return result;
};
const ChipsSelect = (_param)=>{
    var { // FormFieldProps
    id: labelledbyId, getRootRef, className, status = 'default', icon: dropdownIconProp, onChangeStart, // CustomSelectDropdownProps
    options: optionsProp, placement: placementProp = 'bottom', closeAfterSelect = true, selectedBehavior = _constants1.DEFAULT_SELECTED_BEHAVIOR, emptyText = _constants1.DEFAULT_EMPTY_TEXT, creatable = false, fetching = false, dropdownAutoWidth, forceDropdownPortal, noMaxHeight = false, filterFn = _select.defaultFilterFn, dropdownTestId, // ChipsInputProps
    getRef, value: valueProp, defaultValue, inputValue: inputValueProp, defaultInputValue, disabled, readOnly, getOptionValue = _constants.getOptionValueDefault, getOptionLabel = _constants.getOptionLabelDefault, getNewOptionData = _constants.getNewOptionDataDefault, renderChip = _constants.renderChipDefault, renderOption = _constants1.renderOptionDefault, onChange, onFocus: onFocusProp, onInputChange: onInputChangeProp, onBlur: onBlurProp, onKeyDown: onKeyDownProp } = _param, restProps = _object_without_properties._(_param, [
        "id",
        "getRootRef",
        "className",
        "status",
        "icon",
        "onChangeStart",
        "options",
        "placement",
        "closeAfterSelect",
        "selectedBehavior",
        "emptyText",
        "creatable",
        "fetching",
        "dropdownAutoWidth",
        "forceDropdownPortal",
        "noMaxHeight",
        "filterFn",
        "dropdownTestId",
        "getRef",
        "value",
        "defaultValue",
        "inputValue",
        "defaultInputValue",
        "disabled",
        "readOnly",
        "getOptionValue",
        "getOptionLabel",
        "getNewOptionData",
        "renderChip",
        "renderOption",
        "onChange",
        "onFocus",
        "onInputChange",
        "onBlur",
        "onKeyDown"
    ]);
    const { // Связано с ChipsInputProps
    // option
    value, addOptionFromInput, addOption, removeOption, // input
    inputRef: inputRefHook, inputValue, clearInput, onInputChange, // Связано с CustomSelectDropdownProps
    options, opened, setOpened, focusedOption, focusedOptionIndex, setFocusedOption, setFocusedOptionIndex } = (0, _useChipsSelect.useChipsSelect)({
        // option
        value: valueProp,
        defaultValue,
        onChange,
        getOptionValue,
        getOptionLabel,
        getNewOptionData,
        // input
        inputValue: inputValueProp,
        defaultInputValue,
        onInputChange: onInputChangeProp,
        // dropdown
        options: optionsProp,
        emptyText,
        creatable,
        filterFn,
        selectedBehavior,
        // other
        disabled
    });
    // Связано с ChipsInputProps
    const rootRef = (0, _useExternRef.useExternRef)(getRootRef);
    const inputRef = (0, _useExternRef.useExternRef)(getRef, inputRefHook);
    // Связано с CustomSelectDropdownProps
    const [dropdownVerticalPlacement, setDropdownVerticalPlacement] = _react.useState(placementProp);
    const dropdownId = _react.useId();
    const dropdownCurrentItemId = focusedOptionIndex !== null ? `${dropdownId}-${focusedOptionIndex}` : undefined;
    const dropdownScrollBoxRef = _react.useRef(null);
    const handleFocus = (event)=>{
        if (onFocusProp) {
            onFocusProp(event);
        }
        if (!readOnly) {
            setOpened(true);
            setFocusedOptionIndex(null);
        }
    };
    const handleBlur = (event)=>{
        if (onBlurProp) {
            onBlurProp(event);
        }
        // Не добавляем значение, если его нужно выбрать строго из списка
        if (!readOnly && !event.defaultPrevented && !creatable) {
            event.preventDefault();
        }
    };
    const chipsSelectOptions = _react.useRef([]).current;
    const scrollToElement = (index, center = false)=>{
        const dropdown = dropdownScrollBoxRef.current;
        const item = chipsSelectOptions[index];
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (!item || !dropdown) {
            return;
        }
        const dropdownHeight = dropdown.offsetHeight;
        const scrollTop = dropdown.scrollTop;
        const itemTop = item.offsetTop;
        const itemHeight = item.offsetHeight;
        /* istanbul ignore next: нет представления как воспроизвести */ if (center) {
            dropdown.scrollTop = itemTop - dropdownHeight / 2 + itemHeight / 2;
        } else if (itemTop + itemHeight > dropdownHeight + scrollTop) {
            dropdown.scrollTop = itemTop - dropdownHeight + itemHeight;
        } else if (itemTop < scrollTop) {
            dropdown.scrollTop = itemTop;
        }
    };
    const focusOptionByIndex = (index, oldIndex)=>{
        const length = options.length;
        if (index < 0) {
            index = length - 1;
        } else if (index >= length) {
            index = 0;
        }
        if (index === oldIndex) {
            /* istanbul ignore next: нет представления как воспроизвести */ return;
        }
        const option = options[index];
        if ((0, _constants1.isNotServicePreset)(option) && option.disabled) {
            return;
        }
        scrollToElement(index);
        setFocusedOptionIndex(index);
    };
    const focusOption = (nextIndex, type)=>{
        let index = nextIndex === null ? -1 : nextIndex;
        if (type === _constants1.FOCUS_ACTION_NEXT) {
            const nextIndex = findIndexAfter(options, index);
            index = nextIndex === -1 ? findIndexAfter(options) : nextIndex; // Следующий за index или первый валидный до index
        } else if (type === _constants1.FOCUS_ACTION_PREV) {
            const beforeIndex = findIndexBefore(options, index);
            index = beforeIndex === -1 ? findIndexBefore(options) : beforeIndex; // Предшествующий index или последний валидный после index
        }
        focusOptionByIndex(index, focusedOptionIndex);
    };
    const handleKeyDown = (event)=>{
        if (onKeyDownProp) {
            onKeyDownProp(event);
        }
        if (event.defaultPrevented || readOnly) {
            return;
        }
        switch(event.key){
            case _accessibility.Keys.ARROW_UP:
            case _accessibility.Keys.ARROW_DOWN:
                event.preventDefault();
                if (!opened) {
                    setOpened(true);
                    focusOption(null, _constants1.FOCUS_ACTION_NEXT);
                } else {
                    focusOption(focusedOptionIndex, event.key === _accessibility.Keys.ARROW_UP ? _constants1.FOCUS_ACTION_PREV : _constants1.FOCUS_ACTION_NEXT);
                }
                break;
            case _accessibility.Keys.ENTER:
                {
                    if (!opened) {
                        break;
                    }
                    if (focusedOptionIndex != null) {
                        const foundOption = options[focusedOptionIndex];
                        if (foundOption && (0, _constants1.isNotServicePreset)(foundOption)) {
                            event.preventDefault();
                            if (onChangeStart) {
                                onChangeStart(event, foundOption);
                            }
                            addOption(foundOption);
                            setFocusedOptionIndex(null);
                            clearInput();
                            if (closeAfterSelect) {
                                setOpened(false);
                            }
                            break;
                        }
                    }
                    if (!creatable) {
                        event.preventDefault();
                    }
                    break;
                }
            case _accessibility.Keys.ESCAPE:
            case _accessibility.Keys.TAB:
                if (opened) {
                    setOpened(false);
                }
        }
    };
    _react.useEffect(()=>{
        if (focusedOptionIndex === null) {
            setFocusedOption(null);
        } else {
            const foundFocusedOptionIndex = options[focusedOptionIndex];
            if (foundFocusedOptionIndex && (0, _constants1.isNotServicePreset)(foundFocusedOptionIndex)) {
                setFocusedOption(foundFocusedOptionIndex);
            }
        }
    }, [
        options,
        focusedOptionIndex,
        setFocusedOption
    ]);
    const onDropdownPlacementChange = _react.useCallback((placement)=>{
        /* istanbul ignore next:  */ if (placement.startsWith('top')) {
            setDropdownVerticalPlacement('top');
        } else if (placement.startsWith('bottom')) {
            setDropdownVerticalPlacement('bottom');
        }
    }, []);
    const onDropdownMouseLeave = _react.useCallback(()=>{
        setFocusedOptionIndex(null);
    }, [
        setFocusedOptionIndex
    ]);
    const handleClickOutside = _react.useCallback(()=>{
        setOpened(false);
    }, [
        setOpened
    ]);
    (0, _useGlobalOnClickOutside.useGlobalOnClickOutside)(handleClickOutside, opened ? rootRef : null, opened ? dropdownScrollBoxRef : null);
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_ChipsInputBase.ChipsInputBase, _object_spread_props._(_object_spread._({}, restProps), {
        disabled: disabled,
        readOnly: readOnly,
        // FormFieldProps
        id: labelledbyId,
        getRootRef: rootRef,
        className: (0, _vkjs.classNames)("vkuiChipsSelect", opened && dropdownVerticalPlacement && stylesDropdownVerticalPlacement[dropdownVerticalPlacement], className),
        status: status,
        after: dropdownIconProp || /*#__PURE__*/ _react.createElement(_DropdownIcon.DropdownIcon, {
            opened: opened
        }),
        // option
        value: value,
        onAddChipOption: addOptionFromInput,
        onRemoveChipOption: removeOption,
        renderChip: renderChip,
        // input
        getRef: inputRef,
        inputValue: inputValue,
        onInputChange: onInputChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
        // a11y
        role: "combobox",
        "aria-expanded": opened,
        "aria-autocomplete": "list",
        "aria-controls": opened ? dropdownId : undefined,
        "aria-activedescendant": opened ? dropdownCurrentItemId : undefined,
        "aria-haspopup": "listbox"
    })), opened && /*#__PURE__*/ _react.createElement(_CustomSelectDropdown.CustomSelectDropdown, {
        "data-testid": dropdownTestId,
        targetRef: rootRef,
        placement: placementProp,
        scrollBoxRef: dropdownScrollBoxRef,
        onPlacementChange: onDropdownPlacementChange,
        onMouseLeave: onDropdownMouseLeave,
        fetching: fetching,
        autoWidth: dropdownAutoWidth,
        forcePortal: forceDropdownPortal,
        noMaxHeight: noMaxHeight,
        // a11y
        id: dropdownId,
        role: "listbox",
        "aria-labelledby": labelledbyId
    }, options.map((option, index)=>{
        const dropdownItemId = `${dropdownId}-${index}`;
        if ((0, _constants1.isEmptyOptionPreset)(option)) {
            return /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
                key: "empty-text",
                className: "vkuiChipsSelect__empty"
            }, option.placeholder);
        }
        if ((0, _constants1.isCreateNewOptionPreset)(option)) {
            return /*#__PURE__*/ _react.createElement(_CustomSelectOption.CustomSelectOption, {
                key: "create-new-option",
                id: dropdownItemId,
                hovered: focusedOptionIndex === index,
                onMouseDown: ()=>addOptionFromInput(inputValue),
                onMouseEnter: ()=>setFocusedOptionIndex(index)
            }, option.actionText);
        }
        return /*#__PURE__*/ _react.createElement(_react.Fragment, {
            key: `${typeof option.value}-${option.label}`
        }, renderOption({
            id: dropdownItemId,
            disabled: option.disabled,
            hovered: focusedOption ? getOptionValue(option) === getOptionValue(focusedOption) : false,
            children: option.label,
            selected: !!value.find((selectedOption)=>getOptionValue(selectedOption) === getOptionValue(option)),
            getRootRef (node) {
                if (node) {
                    chipsSelectOptions[index] = node;
                }
            },
            onMouseDown (event) {
                if (option.disabled) {
                    return;
                }
                if (onChangeStart) {
                    onChangeStart(event, option);
                }
                if (!event.defaultPrevented) {
                    closeAfterSelect && setOpened(false);
                    addOption(option);
                    clearInput();
                }
            },
            onMouseEnter () {
                setFocusedOptionIndex(index);
            }
        }, option));
    })));
};

//# sourceMappingURL=ChipsSelect.js.map