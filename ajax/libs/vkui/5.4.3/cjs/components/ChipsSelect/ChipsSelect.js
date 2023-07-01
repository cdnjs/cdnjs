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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _typeOf = require("@swc/helpers/lib/_type_of.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useChipsSelect = require("../../hooks/useChipsSelect");
var _useExternRef = require("../../hooks/useExternRef");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _dom = require("../../lib/dom");
var _select = require("../../lib/select");
var _chipsInputBase = require("../ChipsInputBase/ChipsInputBase");
var _customSelectDropdown = require("../CustomSelectDropdown/CustomSelectDropdown");
var _customSelectOption = require("../CustomSelectOption/CustomSelectOption");
var _dropdownIcon = require("../DropdownIcon/DropdownIcon");
var _formField = require("../FormField/FormField");
var _iconButton = require("../IconButton/IconButton");
var _footnote = require("../Typography/Footnote/Footnote");
var FOCUS_ACTION_NEXT = "next";
var FOCUS_ACTION_PREV = "prev";
var chipsSelectDefaultProps = _objectSpreadProps(_objectSpread({}, _chipsInputBase.chipsInputDefaultProps), {
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
        return /*#__PURE__*/ _react.createElement(_customSelectOption.CustomSelectOption, props);
    }
});
var ChipsSelect = function(props) {
    var propsWithDefault = _objectSpread({}, chipsSelectDefaultProps, props);
    var style = propsWithDefault.style, onFocus = propsWithDefault.onFocus, onKeyDown = propsWithDefault.onKeyDown, className = propsWithDefault.className, fetching = propsWithDefault.fetching, renderOption = propsWithDefault.renderOption, emptyText = propsWithDefault.emptyText, getRef = propsWithDefault.getRef, getRootRef = propsWithDefault.getRootRef, disabled = propsWithDefault.disabled, placeholder = propsWithDefault.placeholder, tabIndex = propsWithDefault.tabIndex, getOptionValue = propsWithDefault.getOptionValue, getOptionLabel = propsWithDefault.getOptionLabel, showSelected = propsWithDefault.showSelected, getNewOptionData = propsWithDefault.getNewOptionData, renderChip = propsWithDefault.renderChip, popupDirection = propsWithDefault.popupDirection, creatable = propsWithDefault.creatable, filterFn = propsWithDefault.filterFn, inputValue = propsWithDefault.inputValue, creatableText = propsWithDefault.creatableText, closeAfterSelect = propsWithDefault.closeAfterSelect, onChangeStart = propsWithDefault.onChangeStart, before = propsWithDefault.before, icon = propsWithDefault.icon, options = propsWithDefault.options, fixDropdownWidth = propsWithDefault.fixDropdownWidth, forceDropdownPortal = propsWithDefault.forceDropdownPortal, restProps = _objectWithoutProperties(propsWithDefault, [
        "style",
        "onFocus",
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
        "forceDropdownPortal"
    ]);
    var document = (0, _dom.useDOM)().document;
    var _React_useState = _slicedToArray(_react.useState(undefined), 2), popperPlacement = _React_useState[0], setPopperPlacement = _React_useState[1];
    var scrollBoxRef = _react.useRef(null);
    var rootRef = (0, _useExternRef.useExternRef)(getRef);
    var _useChipsSelect1 = (0, _useChipsSelect.useChipsSelect)(propsWithDefault), fieldValue = _useChipsSelect1.fieldValue, _useChipsSelect_selectedOptions = _useChipsSelect1.selectedOptions, selectedOptions = _useChipsSelect_selectedOptions === void 0 ? [] : _useChipsSelect_selectedOptions, opened = _useChipsSelect1.opened, setOpened = _useChipsSelect1.setOpened, addOptionFromInput = _useChipsSelect1.addOptionFromInput, filteredOptions = _useChipsSelect1.filteredOptions, addOption = _useChipsSelect1.addOption, handleInputChange = _useChipsSelect1.handleInputChange, clearInput = _useChipsSelect1.clearInput, focusedOption = _useChipsSelect1.focusedOption, setFocusedOption = _useChipsSelect1.setFocusedOption, focusedOptionIndex = _useChipsSelect1.focusedOptionIndex, setFocusedOptionIndex = _useChipsSelect1.setFocusedOptionIndex;
    var showCreatable = Boolean(creatable && creatableText && !filteredOptions.length && fieldValue);
    var handleFocus = function(e) {
        setOpened(true);
        setFocusedOptionIndex(null);
        onFocus(e);
    };
    var handleClickOutside = function(e) {
        var _rootRef_current;
        if (e.target !== rootRef.current && !((_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.contains(e.target))) {
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
        scrollToElement(index);
        setFocusedOptionIndex(index);
    };
    var focusOption = function(nextIndex, type) {
        var index = nextIndex === null ? -1 : nextIndex;
        if (type === FOCUS_ACTION_NEXT) {
            index = index + 1;
        } else if (type === FOCUS_ACTION_PREV) {
            index = index - 1;
        }
        focusOptionByIndex(index, focusedOptionIndex);
    };
    var handleKeyDown = function(e) {
        onKeyDown(e);
        if (e.key === "ArrowUp" && !e.defaultPrevented) {
            e.preventDefault();
            if (!opened) {
                setOpened(true);
                setFocusedOptionIndex(0);
            } else {
                focusOption(focusedOptionIndex, FOCUS_ACTION_PREV);
            }
        }
        if (e.key === "ArrowDown" && !e.defaultPrevented) {
            e.preventDefault();
            if (!opened) {
                setOpened(true);
                setFocusedOptionIndex(0);
            } else {
                focusOption(focusedOptionIndex, FOCUS_ACTION_NEXT);
            }
        }
        if (e.key === "Enter" && !e.defaultPrevented && opened && focusedOptionIndex != null) {
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
        return renderChip(_objectSpreadProps(_objectSpread({}, renderChipProps), {
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
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_formField.FormField, {
        getRootRef: rootRef,
        style: style,
        className: (0, _vkjs.classNames)("vkuiChipsSelect", opened && (isPopperDirectionTop ? "vkuiChipsSelect--pop-up" : "vkuiChipsSelect--pop-down"), className),
        disabled: disabled,
        role: "application",
        "aria-disabled": disabled,
        "aria-readonly": restProps.readOnly,
        after: /*#__PURE__*/ _react.createElement(_iconButton.IconButton, {
            className: "vkuiChipsSelect__dropdown",
            activeMode: "",
            hoverMode: "",
            // TODO: add label customization
            "aria-label": opened ? "Скрыть" : "Развернуть",
            onClick: toggleOpened
        }, icon !== null && icon !== void 0 ? icon : /*#__PURE__*/ _react.createElement(_dropdownIcon.DropdownIcon, {
            className: "vkuiChipsSelect__icon",
            opened: opened
        })),
        before: before
    }, /*#__PURE__*/ _react.createElement(_chipsInputBase.ChipsInputBase, _objectSpreadProps(_objectSpread({}, restProps), {
        tabIndex: tabIndex,
        value: selectedOptions,
        inputValue: fieldValue,
        getNewOptionData: getNewOptionData,
        getOptionLabel: getOptionLabel,
        getOptionValue: getOptionValue,
        renderChip: renderChipWrapper,
        onFocus: handleFocus,
        onKeyDown: handleKeyDown,
        placeholder: placeholder,
        getRef: getRef,
        disabled: disabled,
        onInputChange: handleInputChange
    }))), opened && /*#__PURE__*/ _react.createElement(_customSelectDropdown.CustomSelectDropdown, {
        targetRef: rootRef,
        placement: popupDirection,
        scrollBoxRef: scrollBoxRef,
        onPlacementChange: onPlacementChange,
        onMouseLeave: onDropdownMouseLeave,
        fetching: fetching,
        sameWidth: fixDropdownWidth,
        forcePortal: forceDropdownPortal
    }, showCreatable && /*#__PURE__*/ _react.createElement(_customSelectOption.CustomSelectOption, {
        hovered: focusedOptionIndex === 0,
        onMouseDown: addOptionFromInput,
        onMouseEnter: function() {
            return setFocusedOptionIndex(0);
        }
    }, creatableText), !(filteredOptions === null || filteredOptions === void 0 ? void 0 : filteredOptions.length) && !showCreatable && emptyText ? /*#__PURE__*/ _react.createElement(_footnote.Footnote, {
        className: "vkuiChipsSelect__empty"
    }, emptyText) : filteredOptions.map(function(option, index) {
        var label = getOptionLabel(option);
        var hovered = focusedOption && getOptionValue(option) === getOptionValue(focusedOption);
        var selected = selectedOptions.find(function(selectedOption) {
            return getOptionValue(selectedOption) === getOptionValue(option);
        });
        var value = getOptionValue(option);
        return /*#__PURE__*/ _react.createElement(_react.Fragment, {
            key: "".concat(typeof value === "undefined" ? "undefined" : _typeOf(value), "-").concat(value)
        }, renderOption({
            option: option,
            hovered: Boolean(hovered),
            children: label,
            selected: !!selected,
            getRootRef: function(e) {
                if (e) {
                    return chipsSelectOptions[index] = e;
                }
                return undefined;
            },
            onMouseDown: function(e) {
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