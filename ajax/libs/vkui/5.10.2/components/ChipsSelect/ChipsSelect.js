import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _type_of } from "@swc/helpers/_/_type_of";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useChipsSelect } from "../../hooks/useChipsSelect";
import { useExternRef } from "../../hooks/useExternRef";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { useDOM } from "../../lib/dom";
import { defaultFilterFn } from "../../lib/select";
import { ChipsInputBase, chipsInputDefaultProps } from "../ChipsInputBase/ChipsInputBase";
import { CustomSelectDropdown } from "../CustomSelectDropdown/CustomSelectDropdown";
import { CustomSelectOption } from "../CustomSelectOption/CustomSelectOption";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon";
import { FormField } from "../FormField/FormField";
import { IconButton } from "../IconButton/IconButton";
import { Footnote } from "../Typography/Footnote/Footnote";
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
var chipsSelectDefaultProps = _object_spread_props(_object_spread({}, chipsInputDefaultProps), {
    emptyText: "Ничего не найдено",
    creatableText: "Создать значение",
    onChangeStart: noop,
    creatable: false,
    fetching: false,
    showSelected: true,
    closeAfterSelect: true,
    options: [],
    filterFn: defaultFilterFn,
    renderOption: function renderOption(props) {
        return /*#__PURE__*/ React.createElement(CustomSelectOption, props);
    }
});
/**
 * @see https://vkcom.github.io/VKUI/#/ChipsSelect
 */ export var ChipsSelect = function(props) {
    var propsWithDefault = _object_spread({}, chipsSelectDefaultProps, props);
    var style = propsWithDefault.style, onFocus = propsWithDefault.onFocus, onBlur = propsWithDefault.onBlur, onKeyDown = propsWithDefault.onKeyDown, className = propsWithDefault.className, fetching = propsWithDefault.fetching, renderOption = propsWithDefault.renderOption, emptyText = propsWithDefault.emptyText, getRef = propsWithDefault.getRef, getRootRef = propsWithDefault.getRootRef, disabled = propsWithDefault.disabled, placeholder = propsWithDefault.placeholder, tabIndex = propsWithDefault.tabIndex, getOptionValue = propsWithDefault.getOptionValue, getOptionLabel = propsWithDefault.getOptionLabel, showSelected = propsWithDefault.showSelected, getNewOptionData = propsWithDefault.getNewOptionData, renderChip = propsWithDefault.renderChip, popupDirection = propsWithDefault.popupDirection, creatable = propsWithDefault.creatable, filterFn = propsWithDefault.filterFn, inputValue = propsWithDefault.inputValue, creatableText = propsWithDefault.creatableText, closeAfterSelect = propsWithDefault.closeAfterSelect, onChangeStart = propsWithDefault.onChangeStart, before = propsWithDefault.before, icon = propsWithDefault.icon, options = propsWithDefault.options, fixDropdownWidth = propsWithDefault.fixDropdownWidth, forceDropdownPortal = propsWithDefault.forceDropdownPortal, _propsWithDefault_noMaxHeight = propsWithDefault.noMaxHeight, noMaxHeight = _propsWithDefault_noMaxHeight === void 0 ? false : _propsWithDefault_noMaxHeight, restProps = _object_without_properties(propsWithDefault, [
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
    var document = useDOM().document;
    var _React_useState = _sliced_to_array(React.useState(undefined), 2), popperPlacement = _React_useState[0], setPopperPlacement = _React_useState[1];
    var scrollBoxRef = React.useRef(null);
    var rootRef = useExternRef(getRootRef);
    var _useChipsSelect = useChipsSelect(propsWithDefault), fieldValue = _useChipsSelect.fieldValue, _useChipsSelect_selectedOptions = _useChipsSelect.selectedOptions, selectedOptions = _useChipsSelect_selectedOptions === void 0 ? [] : _useChipsSelect_selectedOptions, opened = _useChipsSelect.opened, setOpened = _useChipsSelect.setOpened, addOptionFromInput = _useChipsSelect.addOptionFromInput, filteredOptions = _useChipsSelect.filteredOptions, addOption = _useChipsSelect.addOption, handleInputChange = _useChipsSelect.handleInputChange, clearInput = _useChipsSelect.clearInput, focusedOption = _useChipsSelect.focusedOption, setFocusedOption = _useChipsSelect.setFocusedOption, focusedOptionIndex = _useChipsSelect.focusedOptionIndex, setFocusedOptionIndex = _useChipsSelect.setFocusedOptionIndex;
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
    var chipsSelectOptions = React.useRef([]).current;
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
    React.useEffect(function() {
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
    useGlobalEventListener(document, "click", handleClickOutside);
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
        return renderChip(_object_spread_props(_object_spread({}, renderChipProps), {
            onRemove: onRemoveWrapper
        }));
    };
    var isPopperDirectionTop = popperPlacement === null || popperPlacement === void 0 ? void 0 : popperPlacement.includes("top");
    var onPlacementChange = React.useCallback(function(placement) {
        setPopperPlacement(placement);
    }, [
        setPopperPlacement
    ]);
    var onDropdownMouseLeave = React.useCallback(function() {
        setFocusedOptionIndex(null);
    }, [
        setFocusedOptionIndex
    ]);
    var toggleOpened = function() {
        setOpened(function(prevOpened) {
            return !prevOpened;
        });
    };
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(FormField, {
        getRootRef: rootRef,
        style: style,
        className: classNames("vkuiChipsSelect", opened && (isPopperDirectionTop ? "vkuiChipsSelect--pop-up" : "vkuiChipsSelect--pop-down"), className),
        disabled: disabled,
        role: "application",
        "aria-disabled": disabled,
        "aria-readonly": restProps.readOnly,
        after: /*#__PURE__*/ React.createElement(IconButton, {
            className: "vkuiChipsSelect__dropdown",
            activeMode: "",
            hoverMode: "",
            // TODO [>=6]: add label customization
            "aria-label": opened ? "Скрыть" : "Развернуть",
            onClick: toggleOpened
        }, icon !== null && icon !== void 0 ? icon : /*#__PURE__*/ React.createElement(DropdownIcon, {
            className: "vkuiChipsSelect__icon",
            opened: opened
        })),
        before: before
    }, /*#__PURE__*/ React.createElement(ChipsInputBase, _object_spread_props(_object_spread({}, restProps), {
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
    }))), opened && /*#__PURE__*/ React.createElement(CustomSelectDropdown, {
        targetRef: rootRef,
        placement: popupDirection,
        scrollBoxRef: scrollBoxRef,
        onPlacementChange: onPlacementChange,
        onMouseLeave: onDropdownMouseLeave,
        fetching: fetching,
        sameWidth: fixDropdownWidth,
        forcePortal: forceDropdownPortal,
        noMaxHeight: noMaxHeight
    }, showCreatable && /*#__PURE__*/ React.createElement(CustomSelectOption, {
        hovered: focusedOptionIndex === 0,
        onMouseDown: addOptionFromInput,
        onMouseEnter: function() {
            return setFocusedOptionIndex(0);
        }
    }, creatableText), !(filteredOptions === null || filteredOptions === void 0 ? void 0 : filteredOptions.length) && !showCreatable && emptyText ? /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiChipsSelect__empty"
    }, emptyText) : filteredOptions.map(function(option, index) {
        var label = getOptionLabel(option);
        var hovered = focusedOption && getOptionValue(option) === getOptionValue(focusedOption);
        var selected = selectedOptions.find(function(selectedOption) {
            return getOptionValue(selectedOption) === getOptionValue(option);
        });
        var value = getOptionValue(option);
        return /*#__PURE__*/ React.createElement(React.Fragment, {
            key: "".concat(typeof value === "undefined" ? "undefined" : _type_of(value), "-").concat(value)
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