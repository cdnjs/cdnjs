"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChipsSelect = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var React = _interopRequireWildcard(require("react"));
var _DropdownIcon = require("../DropdownIcon/DropdownIcon");
var _vkjs = require("@vkontakte/vkjs");
var _ChipsInputBase = require("../ChipsInputBase/ChipsInputBase");
var _CustomSelectOption = require("../CustomSelectOption/CustomSelectOption");
var _useChipsSelect2 = require("../../hooks/useChipsSelect");
var _dom = require("../../lib/dom");
var _Footnote = require("../Typography/Footnote/Footnote");
var _useExternRef = require("../../hooks/useExternRef");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _select = require("../../lib/select");
var _CustomSelectDropdown = require("../CustomSelectDropdown/CustomSelectDropdown");
var _FormField = require("../FormField/FormField");
var _IconButton = require("../IconButton/IconButton");
var _excluded = ["style", "onFocus", "onKeyDown", "className", "fetching", "renderOption", "emptyText", "getRef", "getRootRef", "disabled", "placeholder", "tabIndex", "getOptionValue", "getOptionLabel", "showSelected", "getNewOptionData", "renderChip", "popupDirection", "creatable", "filterFn", "inputValue", "creatableText", "closeAfterSelect", "onChangeStart", "before", "options", "fixDropdownWidth", "forceDropdownPortal"];
var FOCUS_ACTION_NEXT = 'next';
var FOCUS_ACTION_PREV = 'prev';
var chipsSelectDefaultProps = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _ChipsInputBase.chipsInputDefaultProps), {}, {
  emptyText: 'Ничего не найдено',
  creatableText: 'Создать значение',
  onChangeStart: _vkjs.noop,
  creatable: false,
  fetching: false,
  showSelected: true,
  closeAfterSelect: true,
  options: [],
  filterFn: _select.defaultFilterFn,
  renderOption: function renderOption(props) {
    return /*#__PURE__*/React.createElement(_CustomSelectOption.CustomSelectOption, props);
  }
});

/**
 * @see https://vkcom.github.io/VKUI/#/ChipsSelect
 */
var ChipsSelect = function ChipsSelect(props) {
  var propsWithDefault = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, chipsSelectDefaultProps), props);
  var style = propsWithDefault.style,
    onFocus = propsWithDefault.onFocus,
    onKeyDown = propsWithDefault.onKeyDown,
    className = propsWithDefault.className,
    fetching = propsWithDefault.fetching,
    renderOption = propsWithDefault.renderOption,
    emptyText = propsWithDefault.emptyText,
    getRef = propsWithDefault.getRef,
    getRootRef = propsWithDefault.getRootRef,
    disabled = propsWithDefault.disabled,
    placeholder = propsWithDefault.placeholder,
    tabIndex = propsWithDefault.tabIndex,
    getOptionValue = propsWithDefault.getOptionValue,
    getOptionLabel = propsWithDefault.getOptionLabel,
    showSelected = propsWithDefault.showSelected,
    getNewOptionData = propsWithDefault.getNewOptionData,
    renderChip = propsWithDefault.renderChip,
    popupDirection = propsWithDefault.popupDirection,
    creatable = propsWithDefault.creatable,
    filterFn = propsWithDefault.filterFn,
    inputValue = propsWithDefault.inputValue,
    creatableText = propsWithDefault.creatableText,
    closeAfterSelect = propsWithDefault.closeAfterSelect,
    onChangeStart = propsWithDefault.onChangeStart,
    before = propsWithDefault.before,
    options = propsWithDefault.options,
    fixDropdownWidth = propsWithDefault.fixDropdownWidth,
    forceDropdownPortal = propsWithDefault.forceDropdownPortal,
    restProps = (0, _objectWithoutProperties2.default)(propsWithDefault, _excluded);
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  var _React$useState = React.useState(undefined),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    popperPlacement = _React$useState2[0],
    setPopperPlacement = _React$useState2[1];
  var scrollBoxRef = React.useRef(null);
  var rootRef = (0, _useExternRef.useExternRef)(getRef);
  var _useChipsSelect = (0, _useChipsSelect2.useChipsSelect)(propsWithDefault),
    fieldValue = _useChipsSelect.fieldValue,
    _useChipsSelect$selec = _useChipsSelect.selectedOptions,
    selectedOptions = _useChipsSelect$selec === void 0 ? [] : _useChipsSelect$selec,
    opened = _useChipsSelect.opened,
    setOpened = _useChipsSelect.setOpened,
    addOptionFromInput = _useChipsSelect.addOptionFromInput,
    filteredOptions = _useChipsSelect.filteredOptions,
    addOption = _useChipsSelect.addOption,
    handleInputChange = _useChipsSelect.handleInputChange,
    clearInput = _useChipsSelect.clearInput,
    focusedOption = _useChipsSelect.focusedOption,
    setFocusedOption = _useChipsSelect.setFocusedOption,
    focusedOptionIndex = _useChipsSelect.focusedOptionIndex,
    setFocusedOptionIndex = _useChipsSelect.setFocusedOptionIndex;
  var showCreatable = Boolean(creatable && creatableText && !filteredOptions.length && fieldValue);
  var handleFocus = function handleFocus(e) {
    setOpened(true);
    setFocusedOptionIndex(0);
    onFocus(e);
  };
  var handleClickOutside = function handleClickOutside(e) {
    var _rootRef$current;
    if (e.target !== rootRef.current && !((_rootRef$current = rootRef.current) !== null && _rootRef$current !== void 0 && _rootRef$current.contains(e.target))) {
      setOpened(false);
    }
  };
  var chipsSelectOptions = React.useRef([]).current;
  var scrollToElement = function scrollToElement(index) {
    var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
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
  var focusOptionByIndex = function focusOptionByIndex(index, oldIndex) {
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
  var focusOption = function focusOption(nextIndex, type) {
    var index = typeof nextIndex !== 'number' ? -1 : nextIndex;
    if (type === FOCUS_ACTION_NEXT) {
      index = index + 1;
    } else if (type === FOCUS_ACTION_PREV) {
      index = index - 1;
    }
    if (focusedOptionIndex != null) {
      focusOptionByIndex(index, focusedOptionIndex);
    }
  };
  var handleKeyDown = function handleKeyDown(e) {
    onKeyDown(e);
    if (e.key === 'ArrowUp' && !e.defaultPrevented) {
      e.preventDefault();
      if (!opened) {
        setOpened(true);
        setFocusedOptionIndex(0);
      } else {
        focusOption(focusedOptionIndex, FOCUS_ACTION_PREV);
      }
    }
    if (e.key === 'ArrowDown' && !e.defaultPrevented) {
      e.preventDefault();
      if (!opened) {
        setOpened(true);
        setFocusedOptionIndex(0);
      } else {
        focusOption(focusedOptionIndex, FOCUS_ACTION_NEXT);
      }
    }
    if (e.key === 'Enter' && !e.defaultPrevented && opened && focusedOptionIndex != null) {
      var _option = filteredOptions[focusedOptionIndex];
      if (_option) {
        onChangeStart(e, _option);
        if (!e.defaultPrevented) {
          addOption(_option);
          setFocusedOptionIndex(null);
          clearInput();
          closeAfterSelect && setOpened(false);
          e.preventDefault();
        }
      } else if (!creatable) {
        e.preventDefault();
      }
    }
    if (['Escape', 'Tab'].includes(e.key) && !e.defaultPrevented && opened) {
      setOpened(false);
    }
  };
  React.useEffect(function () {
    if (focusedOptionIndex != null && filteredOptions[focusedOptionIndex]) {
      setFocusedOption(filteredOptions[focusedOptionIndex]);
    } else if (focusedOptionIndex === null || focusedOptionIndex === 0) {
      setFocusedOption(null);
    }
  }, [focusedOptionIndex, filteredOptions, setFocusedOption]);
  React.useEffect(function () {
    var index = focusedOption ? filteredOptions.findIndex(function (_ref) {
      var value = _ref.value;
      return value === focusedOption.value;
    }) : -1;
    if (index === -1 && !!filteredOptions.length && !showCreatable && closeAfterSelect) {
      setFocusedOption(filteredOptions[0]);
    }
  }, [filteredOptions, focusedOption, showCreatable, closeAfterSelect, setFocusedOption]);
  (0, _useGlobalEventListener.useGlobalEventListener)(document, 'click', handleClickOutside);
  var renderChipWrapper = function renderChipWrapper(renderChipProps) {
    if (renderChipProps === undefined) {
      return null;
    }
    var onRemoveWrapper = function onRemoveWrapper(e, value) {
      var _renderChipProps$onRe;
      e === null || e === void 0 ? void 0 : e.preventDefault();
      e === null || e === void 0 ? void 0 : e.stopPropagation();
      (_renderChipProps$onRe = renderChipProps.onRemove) === null || _renderChipProps$onRe === void 0 ? void 0 : _renderChipProps$onRe.call(renderChipProps, e, value);
    };
    return renderChip((0, _objectSpread2.default)((0, _objectSpread2.default)({}, renderChipProps), {}, {
      onRemove: onRemoveWrapper
    }));
  };
  var isPopperDirectionTop = popperPlacement === null || popperPlacement === void 0 ? void 0 : popperPlacement.includes('top');
  var onPlacementChange = React.useCallback(function (placement) {
    setPopperPlacement(placement);
  }, [setPopperPlacement]);
  var onDropdownMouseLeave = React.useCallback(function () {
    setFocusedOptionIndex(null);
  }, [setFocusedOptionIndex]);
  var observableRefs = React.useMemo(function () {
    return [scrollBoxRef, rootRef];
  }, [rootRef, scrollBoxRef]);
  var toggleOpened = function toggleOpened() {
    setOpened(function (prevOpened) {
      return !prevOpened;
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_FormField.FormField, {
    getRootRef: rootRef,
    style: style,
    className: (0, _vkjs.classNames)("vkuiChipsSelect", opened && (isPopperDirectionTop ? "vkuiChipsSelect--pop-up" : "vkuiChipsSelect--pop-down"), className),
    disabled: disabled,
    role: "application",
    "aria-disabled": disabled,
    "aria-readonly": restProps.readOnly,
    after: /*#__PURE__*/React.createElement(_IconButton.IconButton, {
      className: "vkuiChipsSelect__dropdown",
      activeMode: "",
      hoverMode: ""
      // TODO: add label customization
      ,
      "aria-label": opened ? 'Скрыть' : 'Развернуть',
      onClick: toggleOpened
    }, /*#__PURE__*/React.createElement(_DropdownIcon.DropdownIcon, {
      className: "vkuiChipsSelect__icon",
      opened: opened
    })),
    before: before
  }, /*#__PURE__*/React.createElement(_ChipsInputBase.ChipsInputBase, (0, _extends2.default)({}, restProps, {
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
  }))), opened && /*#__PURE__*/React.createElement(_CustomSelectDropdown.CustomSelectDropdown, {
    targetRef: rootRef,
    placement: popupDirection,
    scrollBoxRef: scrollBoxRef,
    observableRefs: observableRefs,
    onPlacementChange: onPlacementChange,
    onMouseLeave: onDropdownMouseLeave,
    fetching: fetching,
    className: "vkuiChipsSelect__options",
    sameWidth: fixDropdownWidth,
    forcePortal: forceDropdownPortal
  }, showCreatable && /*#__PURE__*/React.createElement(_CustomSelectOption.CustomSelectOption, {
    hovered: focusedOptionIndex === 0,
    onMouseDown: addOptionFromInput,
    onMouseEnter: function onMouseEnter() {
      return setFocusedOptionIndex(0);
    }
  }, creatableText), !(filteredOptions !== null && filteredOptions !== void 0 && filteredOptions.length) && !showCreatable && emptyText ? /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiChipsSelect__empty"
  }, emptyText) : filteredOptions.map(function (option, index) {
    var label = getOptionLabel(option);
    var hovered = focusedOption && getOptionValue(option) === getOptionValue(focusedOption);
    var selected = selectedOptions.find(function (selectedOption) {
      return getOptionValue(selectedOption) === getOptionValue(option);
    });
    var value = getOptionValue(option);
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: "".concat((0, _typeof2.default)(value), "-").concat(value)
    }, renderOption({
      className: "vkuiChipsSelect__option",
      option: option,
      hovered: Boolean(hovered),
      children: label,
      selected: !!selected,
      getRootRef: function getRootRef(e) {
        if (e) {
          return chipsSelectOptions[index] = e;
        }
        return undefined;
      },
      onMouseDown: function onMouseDown(e) {
        onChangeStart === null || onChangeStart === void 0 ? void 0 : onChangeStart(e, option);
        if (!e.defaultPrevented) {
          closeAfterSelect && setOpened(false);
          addOption(option);
          clearInput();
        }
      },
      onMouseEnter: function onMouseEnter() {
        return setFocusedOptionIndex(index);
      }
    }));
  })));
};
exports.ChipsSelect = ChipsSelect;
//# sourceMappingURL=ChipsSelect.js.map