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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _type_of = require("@swc/helpers/_/_type_of");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useChipsSelect = require("../../hooks/useChipsSelect");
var _useExternRef = require("../../hooks/useExternRef");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _dom = require("../../lib/dom");
var _select = require("../../lib/select");
var _ChipsInputBase = require("../ChipsInputBase/ChipsInputBase");
var _CustomSelectDropdown = require("../CustomSelectDropdown/CustomSelectDropdown");
var _CustomSelectOption = require("../CustomSelectOption/CustomSelectOption");
var _DropdownIcon = require("../DropdownIcon/DropdownIcon");
var _FormField = require("../FormField/FormField");
var _IconButton = require("../IconButton/IconButton");
var _Footnote = require("../Typography/Footnote/Footnote");
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
var FOCUS_ACTION_NEXT = "next";
var FOCUS_ACTION_PREV = "prev";
var chipsSelectDefaultProps = _object_spread_props._(_object_spread._({}, _ChipsInputBase.chipsInputDefaultProps), {
    emptyText: "Ничего не найдено",
    creatableText: "Создать значение",
    onChangeStart: _vkjs.noop,
    creatable: false,
    fetching: false,
    showSelected: true,
    closeAfterSelect: true,
    options: [],
    filterFn: _select.defaultFilterFn,
    renderOption: function renderOption(props) {
        return /*#__PURE__*/ _react.createElement(_CustomSelectOption.CustomSelectOption, props);
    }
});
var ChipsSelect = function(props) {
    var propsWithDefault = _object_spread._({}, chipsSelectDefaultProps, props);
    var style = propsWithDefault.style, onFocus = propsWithDefault.onFocus, onBlur = propsWithDefault.onBlur, onKeyDown = propsWithDefault.onKeyDown, className = propsWithDefault.className, fetching = propsWithDefault.fetching, renderOption = propsWithDefault.renderOption, emptyText = propsWithDefault.emptyText, getRef = propsWithDefault.getRef, getRootRef = propsWithDefault.getRootRef, disabled = propsWithDefault.disabled, placeholder = propsWithDefault.placeholder, tabIndex = propsWithDefault.tabIndex, getOptionValue = propsWithDefault.getOptionValue, getOptionLabel = propsWithDefault.getOptionLabel, showSelected = propsWithDefault.showSelected, getNewOptionData = propsWithDefault.getNewOptionData, renderChip = propsWithDefault.renderChip, popupDirection = propsWithDefault.popupDirection, creatable = propsWithDefault.creatable, filterFn = propsWithDefault.filterFn, inputValue = propsWithDefault.inputValue, creatableText = propsWithDefault.creatableText, closeAfterSelect = propsWithDefault.closeAfterSelect, onChangeStart = propsWithDefault.onChangeStart, before = propsWithDefault.before, icon = propsWithDefault.icon, options = propsWithDefault.options, fixDropdownWidth = propsWithDefault.fixDropdownWidth, forceDropdownPortal = propsWithDefault.forceDropdownPortal, _propsWithDefault_noMaxHeight = propsWithDefault.noMaxHeight, noMaxHeight = _propsWithDefault_noMaxHeight === void 0 ? false : _propsWithDefault_noMaxHeight, restProps = _object_without_properties._(propsWithDefault, [
        "style",
        "onFocus",
        "onBlur",
        "onKeyDown",
        "className",
        "fetching",
        "renderOption",
        "emptyText",
        "getRef",
        "getRootRef",
        "disabled",
        "placeholder",
        "tabIndex",
        "getOptionValue",
        "getOptionLabel",
        "showSelected",
        "getNewOptionData",
        "renderChip",
        "popupDirection",
        "creatable",
        "filterFn",
        "inputValue",
        "creatableText",
        "closeAfterSelect",
        "onChangeStart",
        "before",
        "icon",
        "options",
        "fixDropdownWidth",
        "forceDropdownPortal",
        "noMaxHeight"
    ]);
    var document = (0, _dom.useDOM)().document;
    var _React_useState = _sliced_to_array._(_react.useState(undefined), 2), popperPlacement = _React_useState[0], setPopperPlacement = _React_useState[1];
    var scrollBoxRef = _react.useRef(null);
    var rootRef = (0, _useExternRef.useExternRef)(getRootRef);
    var _useChipsSelect1 = (0, _useChipsSelect.useChipsSelect)(propsWithDefault), fieldValue = _useChipsSelect1.fieldValue, _useChipsSelect_selectedOptions = _useChipsSelect1.selectedOptions, selectedOptions = _useChipsSelect_selectedOptions === void 0 ? [] : _useChipsSelect_selectedOptions, opened = _useChipsSelect1.opened, setOpened = _useChipsSelect1.setOpened, addOptionFromInput = _useChipsSelect1.addOptionFromInput, filteredOptions = _useChipsSelect1.filteredOptions, addOption = _useChipsSelect1.addOption, handleInputChange = _useChipsSelect1.handleInputChange, clearInput = _useChipsSelect1.clearInput, focusedOption = _useChipsSelect1.focusedOption, setFocusedOption = _useChipsSelect1.setFocusedOption, focusedOptionIndex = _useChipsSelect1.focusedOptionIndex, setFocusedOptionIndex = _useChipsSelect1.setFocusedOptionIndex;
    var showCreatable = Boolean(creatable && creatableText && !filteredOptions.length && fieldValue);
    var handleFocus = function(e) {
        setOpened(true);
        setFocusedOptionIndex(null);
        onFocus(e);
    };
    var handleBlur = function(e) {
        onBlur(e);
        // Не добавляем значение, если его нужно выбрать строго из списка
        if (!e.defaultPrevented && !creatable) {
            e.preventDefault();
        }
    };
    var handleClickOutside = function(e) {
        var _rootRef_current, _scrollBoxRef_current;
        var isClickOutsideFormField = !((_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.contains(e.target));
        var isClickOutsideDropdown = !((_scrollBoxRef_current = scrollBoxRef.current) === null || _scrollBoxRef_current === void 0 ? void 0 : _scrollBoxRef_current.contains(e.target));
        if (isClickOutsideFormField && isClickOutsideDropdown) {
            setOpened(false);
        }
    };
    var chipsSelectOptions = _react.useRef([]).current;
    var scrollToElement = function(index) {
        var center = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var dropdown = scrollBoxRef.current;
        var item = chipsSelectOptions[index];
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
    };
    var focusOptionByIndex = function(index, oldIndex) {
        var length = filteredOptions.length;
        if (index < 0) {
            index = length - 1;
        } else if (index >= length) {
            index = 0;
        }
        if (index === oldIndex) {
            return;
        }
        var option = filteredOptions[index];
        if (option === null || option === void 0 ? void 0 : option.disabled) {
            return;
        }
        scrollToElement(index);
        setFocusedOptionIndex(index);
    };
    var focusOption = function(nextIndex, type) {
        var index = nextIndex === null ? -1 : nextIndex;
        if (type === FOCUS_ACTION_NEXT) {
            var _$nextIndex = findIndexAfter(filteredOptions, index);
            index = _$nextIndex === -1 ? findIndexAfter(filteredOptions) : _$nextIndex; // Следующий за index или первый валидный до index
        } else if (type === FOCUS_ACTION_PREV) {
            var beforeIndex = findIndexBefore(filteredOptions, index);
            index = beforeIndex === -1 ? findIndexBefore(filteredOptions) : beforeIndex; // Предшествующий index или последний валидный после index
        }
        focusOptionByIndex(index, focusedOptionIndex);
    };
    var handleKeyDown = function(e) {
        onKeyDown(e);
        if (e.key === "ArrowUp" && !e.defaultPrevented) {
            e.preventDefault();
            if (!opened) {
                setOpened(true);
                focusOption(null, FOCUS_ACTION_NEXT);
            } else {
                focusOption(focusedOptionIndex, FOCUS_ACTION_PREV);
            }
        }
        if (e.key === "ArrowDown" && !e.defaultPrevented) {
            e.preventDefault();
            if (!opened) {
                setOpened(true);
                focusOption(null, FOCUS_ACTION_NEXT);
            } else {
                focusOption(focusedOptionIndex, FOCUS_ACTION_NEXT);
            }
        }
        if (e.key === "Enter" && !e.defaultPrevented && opened) {
            if (focusedOptionIndex != null) {
                var option = filteredOptions[focusedOptionIndex];
                if (option) {
                    onChangeStart(e, option);
                    if (!e.defaultPrevented) {
                        addOption(option);
                        setFocusedOptionIndex(null);
                        clearInput();
                        closeAfterSelect && setOpened(false);
                        e.preventDefault();
                    }
                } else if (!creatable) {
                    e.preventDefault();
                }
            } else if (!creatable) {
                e.preventDefault();
            }
        }
        if ([
            "Escape",
            "Tab"
        ].includes(e.key) && !e.defaultPrevented && opened) {
            setOpened(false);
        }
    };
    _react.useEffect(function() {
        if (focusedOptionIndex != null && filteredOptions[focusedOptionIndex]) {
            setFocusedOption(filteredOptions[focusedOptionIndex]);
        } else if (focusedOptionIndex === null || focusedOptionIndex === 0) {
            setFocusedOption(null);
        }
    }, [
        focusedOptionIndex,
        filteredOptions,
        setFocusedOption
    ]);
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "click", handleClickOutside);
    var renderChipWrapper = function(renderChipProps) {
        if (renderChipProps === undefined) {
            return null;
        }
        var onRemoveWrapper = function(e, value) {
            var _renderChipProps_onRemove;
            e === null || e === void 0 ? void 0 : e.preventDefault();
            e === null || e === void 0 ? void 0 : e.stopPropagation();
            (_renderChipProps_onRemove = renderChipProps.onRemove) === null || _renderChipProps_onRemove === void 0 ? void 0 : _renderChipProps_onRemove.call(renderChipProps, e, value);
        };
        return renderChip(_object_spread_props._(_object_spread._({}, renderChipProps), {
            onRemove: onRemoveWrapper
        }));
    };
    var isPopperDirectionTop = popperPlacement === null || popperPlacement === void 0 ? void 0 : popperPlacement.includes("top");
    var onPlacementChange = _react.useCallback(function(placement) {
        setPopperPlacement(placement);
    }, [
        setPopperPlacement
    ]);
    var onDropdownMouseLeave = _react.useCallback(function() {
        setFocusedOptionIndex(null);
    }, [
        setFocusedOptionIndex
    ]);
    var toggleOpened = function() {
        setOpened(function(prevOpened) {
            return !prevOpened;
        });
    };
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_FormField.FormField, {
        getRootRef: rootRef,
        style: style,
        className: (0, _vkjs.classNames)("vkuiChipsSelect", opened && (isPopperDirectionTop ? "vkuiChipsSelect--pop-up" : "vkuiChipsSelect--pop-down"), className),
        disabled: disabled,
        role: "application",
        "aria-disabled": disabled,
        "aria-readonly": restProps.readOnly,
        after: /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
            className: "vkuiChipsSelect__dropdown",
            activeMode: "",
            hoverMode: "",
            // TODO [>=6]: add label customization
            "aria-label": opened ? "Скрыть" : "Развернуть",
            onClick: toggleOpened
        }, icon !== null && icon !== void 0 ? icon : /*#__PURE__*/ _react.createElement(_DropdownIcon.DropdownIcon, {
            className: "vkuiChipsSelect__icon",
            opened: opened
        })),
        before: before
    }, /*#__PURE__*/ _react.createElement(_ChipsInputBase.ChipsInputBase, _object_spread_props._(_object_spread._({}, restProps), {
        tabIndex: tabIndex,
        value: selectedOptions,
        inputValue: fieldValue,
        getNewOptionData: getNewOptionData,
        getOptionLabel: getOptionLabel,
        getOptionValue: getOptionValue,
        renderChip: renderChipWrapper,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
        placeholder: placeholder,
        getRef: getRef,
        disabled: disabled,
        onInputChange: handleInputChange
    }))), opened && /*#__PURE__*/ _react.createElement(_CustomSelectDropdown.CustomSelectDropdown, {
        targetRef: rootRef,
        placement: popupDirection,
        scrollBoxRef: scrollBoxRef,
        onPlacementChange: onPlacementChange,
        onMouseLeave: onDropdownMouseLeave,
        fetching: fetching,
        sameWidth: fixDropdownWidth,
        forcePortal: forceDropdownPortal,
        noMaxHeight: noMaxHeight
    }, showCreatable && /*#__PURE__*/ _react.createElement(_CustomSelectOption.CustomSelectOption, {
        hovered: focusedOptionIndex === 0,
        onMouseDown: addOptionFromInput,
        onMouseEnter: function() {
            return setFocusedOptionIndex(0);
        }
    }, creatableText), !(filteredOptions === null || filteredOptions === void 0 ? void 0 : filteredOptions.length) && !showCreatable && emptyText ? /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiChipsSelect__empty"
    }, emptyText) : filteredOptions.map(function(option, index) {
        var label = getOptionLabel(option);
        var hovered = focusedOption && getOptionValue(option) === getOptionValue(focusedOption);
        var selected = selectedOptions.find(function(selectedOption) {
            return getOptionValue(selectedOption) === getOptionValue(option);
        });
        var value = getOptionValue(option);
        return /*#__PURE__*/ _react.createElement(_react.Fragment, {
            key: "".concat(typeof value === "undefined" ? "undefined" : _type_of._(value), "-").concat(value)
        }, renderOption({
            option: option,
            hovered: Boolean(hovered),
            children: label,
            disabled: option.disabled,
            selected: !!selected,
            getRootRef: function(e) {
                if (e) {
                    return chipsSelectOptions[index] = e;
                }
                return undefined;
            },
            onMouseDown: function(e) {
                if (option.disabled) {
                    return;
                }
                onChangeStart === null || onChangeStart === void 0 ? void 0 : onChangeStart(e, option);
                if (!e.defaultPrevented) {
                    closeAfterSelect && setOpened(false);
                    addOption(option);
                    clearInput();
                }
            },
            onMouseEnter: function() {
                return setFocusedOptionIndex(index);
            }
        }));
    })));
};

//# sourceMappingURL=ChipsSelect.js.map