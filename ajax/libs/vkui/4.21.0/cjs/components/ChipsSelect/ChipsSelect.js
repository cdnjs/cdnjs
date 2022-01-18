"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _icons = require("@vkontakte/icons");

var _classNames3 = require("../../lib/classNames");

var _Spinner = _interopRequireDefault(require("../Spinner/Spinner"));

var _CustomScrollView = _interopRequireDefault(require("../CustomScrollView/CustomScrollView"));

var _ChipsInput = _interopRequireWildcard(require("../ChipsInput/ChipsInput"));

var _CustomSelectOption = _interopRequireDefault(require("../CustomSelectOption/CustomSelectOption"));

var _useChipsSelect2 = require("./useChipsSelect");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _utils = require("../../lib/utils");

var _dom = require("../../lib/dom");

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _prefixClass = require("../../lib/prefixClass");

var _useExternRef = require("../../hooks/useExternRef");

var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");

var _select = require("../../lib/select");

var _excluded = ["style", "onFocus", "onKeyDown", "className", "fetching", "renderOption", "emptyText", "getRef", "getRootRef", "disabled", "placeholder", "tabIndex", "getOptionValue", "getOptionLabel", "showSelected", "getNewOptionData", "renderChip", "popupDirection", "creatable", "filterFn", "inputValue", "creatableText", "sizeY", "closeAfterSelect", "onChangeStart", "after", "options"],
    _excluded2 = ["option"];
var FOCUS_ACTION_NEXT = 'next';
var FOCUS_ACTION_PREV = 'prev';

var ChipsSelect = function ChipsSelect(props) {
  var _classNames;

  var style = props.style,
      onFocus = props.onFocus,
      onKeyDown = props.onKeyDown,
      className = props.className,
      fetching = props.fetching,
      renderOption = props.renderOption,
      emptyText = props.emptyText,
      getRef = props.getRef,
      getRootRef = props.getRootRef,
      disabled = props.disabled,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      getOptionValue = props.getOptionValue,
      getOptionLabel = props.getOptionLabel,
      showSelected = props.showSelected,
      getNewOptionData = props.getNewOptionData,
      renderChip = props.renderChip,
      popupDirection = props.popupDirection,
      creatable = props.creatable,
      filterFn = props.filterFn,
      inputValue = props.inputValue,
      creatableText = props.creatableText,
      sizeY = props.sizeY,
      closeAfterSelect = props.closeAfterSelect,
      onChangeStart = props.onChangeStart,
      after = props.after,
      options = props.options,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);

  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  var scrollBoxRef = React.useRef(null);
  var rootRef = (0, _useExternRef.useExternRef)(getRef);

  var _useChipsSelect = (0, _useChipsSelect2.useChipsSelect)(props),
      fieldValue = _useChipsSelect.fieldValue,
      selectedOptions = _useChipsSelect.selectedOptions,
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
    var rootNode = rootRef.current;

    if (rootNode && e.target !== rootNode && !rootNode.contains(e.target)) {
      setOpened(false);
    }
  };

  var chipsSelectOptions = React.useRef([]).current;

  var scrollToElement = function scrollToElement(index) {
    var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var dropdown = scrollBoxRef.current;
    var item = chipsSelectOptions[index];

    if (!item) {
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

    focusOptionByIndex(index, focusedOptionIndex);
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

    if (e.key === 'Enter' && !e.defaultPrevented && opened) {
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
    if (filteredOptions[focusedOptionIndex]) {
      setFocusedOption(filteredOptions[focusedOptionIndex]);
    } else if (focusedOptionIndex === null || focusedOptionIndex === 0) {
      setFocusedOption(null);
    }
  }, [focusedOptionIndex, filteredOptions]);
  React.useEffect(function () {
    var index = focusedOption ? filteredOptions.findIndex(function (_ref) {
      var value = _ref.value;
      return value === focusedOption.value;
    }) : -1;

    if (index === -1 && !!filteredOptions.length && !showCreatable && closeAfterSelect) {
      setFocusedOption(filteredOptions[0]);
    }
  }, [filteredOptions, focusedOption, showCreatable, closeAfterSelect]);
  (0, _useGlobalEventListener.useGlobalEventListener)(document, 'click', handleClickOutside);

  var renderChipWrapper = function renderChipWrapper(renderChipProps) {
    var onRemove = renderChipProps.onRemove;

    var onRemoveWrapper = function onRemoveWrapper(e, value) {
      e.preventDefault();
      e.stopPropagation();
      onRemove(e, value);
    };

    return renderChip((0, _objectSpread2.default)((0, _objectSpread2.default)({}, renderChipProps), {}, {
      onRemove: onRemoveWrapper
    }));
  };

  return (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames3.classNames)('ChipsSelect', "ChipsSelect--sizeY-".concat(sizeY)),
    ref: rootRef,
    style: style,
    className: className
  }, (0, _jsxRuntime.createScopedElement)(_ChipsInput.default, (0, _extends2.default)({}, restProps, {
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
    vkuiClass: (0, _classNames3.classNames)((_classNames = {}, (0, _defineProperty2.default)(_classNames, 'ChipsSelect__open', opened), (0, _defineProperty2.default)(_classNames, 'ChipsSelect__open--popupDirectionTop', popupDirection === 'top'), _classNames)),
    getRef: getRef,
    disabled: disabled,
    onInputChange: handleInputChange,
    after: (0, _jsxRuntime.createScopedElement)(_icons.Icon20Dropdown, null)
  })), opened && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames3.classNames)('ChipsSelect__options', (0, _defineProperty2.default)({}, 'ChipsSelect__options--popupDirectionTop', popupDirection === 'top')),
    onMouseLeave: function onMouseLeave() {
      return setFocusedOptionIndex(null);
    }
  }, (0, _jsxRuntime.createScopedElement)(_CustomScrollView.default, {
    boxRef: scrollBoxRef
  }, fetching ? (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ChipsSelect__fetching"
  }, (0, _jsxRuntime.createScopedElement)(_Spinner.default, {
    size: "small"
  })) : (0, _jsxRuntime.createScopedElement)(React.Fragment, null, showCreatable && (0, _jsxRuntime.createScopedElement)(_CustomSelectOption.default, {
    hovered: focusedOptionIndex === 0,
    onMouseDown: addOptionFromInput,
    onMouseEnter: function onMouseEnter() {
      return setFocusedOptionIndex(0);
    }
  }, creatableText), !(filteredOptions !== null && filteredOptions !== void 0 && filteredOptions.length) && !showCreatable && emptyText ? (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    level: "1",
    weight: "regular",
    vkuiClass: "ChipsSelect__empty"
  }, emptyText) : filteredOptions.map(function (option, index) {
    var label = getOptionLabel(option);
    var hovered = focusedOption && getOptionValue(option) === getOptionValue(focusedOption);
    var selected = selectedOptions.find(function (selectedOption) {
      return getOptionValue(selectedOption) === getOptionValue(option);
    });
    var value = getOptionValue(option);
    return (0, _jsxRuntime.createScopedElement)(React.Fragment, {
      key: "".concat((0, _typeof2.default)(value), "-").concat(value)
    }, renderOption({
      className: (0, _prefixClass.prefixClass)('ChipsSelect__option'),
      option: option,
      hovered: hovered,
      children: label,
      selected: !!selected,
      getRootRef: function getRootRef(e) {
        return chipsSelectOptions[index] = e;
      },
      onMouseDown: function onMouseDown(e) {
        onChangeStart(e, option);

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
  })))));
};

var chipsSelectDefaultProps = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _ChipsInput.chipsInputDefaultProps), {}, {
  emptyText: 'Ничего не найдено',
  creatableText: 'Создать значение',
  onChangeStart: _utils.noop,
  creatable: false,
  fetching: false,
  showSelected: true,
  closeAfterSelect: true,
  options: [],
  filterFn: _select.defaultFilterFn,
  renderOption: function renderOption(_ref2) {
    var option = _ref2.option,
        restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
    return (0, _jsxRuntime.createScopedElement)(_CustomSelectOption.default, restProps);
  }
});
ChipsSelect.defaultProps = chipsSelectDefaultProps;

var _default = (0, _withAdaptivity.withAdaptivity)(ChipsSelect, {
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=ChipsSelect.js.map