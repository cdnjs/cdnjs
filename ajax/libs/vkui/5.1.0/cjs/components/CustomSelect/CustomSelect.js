"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomSelect = CustomSelect;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var React = _interopRequireWildcard(require("react"));
var _SelectMimicry = require("../SelectMimicry/SelectMimicry");
var _utils = require("../../lib/utils");
var _vkjs = require("@vkontakte/vkjs");
var _CustomSelectOption = require("../CustomSelectOption/CustomSelectOption");
var _Input = require("../Input/Input");
var _DropdownIcon = require("../DropdownIcon/DropdownIcon");
var _Footnote = require("../Typography/Footnote/Footnote");
var _warnOnce = require("../../lib/warnOnce");
var _select = require("../../lib/select");
var _CustomSelectDropdown = require("../CustomSelectDropdown/CustomSelectDropdown");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _excluded = ["option"],
  _excluded2 = ["before", "name", "className", "getRef", "getRootRef", "popupDirection", "style", "onChange", "children", "onInputChange", "renderDropdown", "onOpen", "onClose", "fetching", "forceDropdownPortal", "selectType", "autoHideScrollbar", "autoHideScrollbarDelay", "searchable", "renderOption", "options", "emptyText", "filterFn", "icon", "dropdownOffsetDistance", "fixDropdownWidth"];
var findIndexAfter = function findIndexAfter() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  if (startIndex >= options.length - 1) {
    return -1;
  }
  return options.findIndex(function (option, i) {
    return i > startIndex && !option.disabled;
  });
};
var findIndexBefore = function findIndexBefore() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var endIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options.length;
  var result = -1;
  if (endIndex <= 0) {
    return result;
  }
  for (var i = endIndex - 1; i >= 0; i--) {
    var _option = options[i];
    if (!_option.disabled) {
      result = i;
      break;
    }
  }
  return result;
};
var warn = (0, _warnOnce.warnOnce)('CustomSelect');
var checkOptionsValueType = function checkOptionsValueType(options) {
  if (new Set(options.map(function (item) {
    return (0, _typeof2.default)(item.value);
  })).size > 1) {
    warn('Некоторые значения ваших опций имеют разные типы. onChange всегда возвращает строковый тип.', 'error');
  }
};
function defaultRenderOptionFn(_ref) {
  var option = _ref.option,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(_CustomSelectOption.CustomSelectOption, props);
}
var handleOptionDown = function handleOptionDown(e) {
  e.preventDefault();
};
function findSelectedIndex(options, value) {
  var _options$findIndex;
  return (_options$findIndex = options.findIndex(function (item) {
    value = typeof item.value === 'number' ? Number(value) : value;
    return item.value === value;
  })) !== null && _options$findIndex !== void 0 ? _options$findIndex : -1;
}
var filter = function filter(options, inputValue, filterFn) {
  return typeof filterFn === 'function' ? options.filter(function (option) {
    return filterFn(inputValue, option);
  }) : options;
};
var defaultOptions = [];
/**
 * @see https://vkcom.github.io/VKUI/#/CustomSelect
 */
function CustomSelect(props) {
  var _props$value, _props$value2;
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    opened = _React$useState2[0],
    setOpened = _React$useState2[1];
  var before = props.before,
    name = props.name,
    className = props.className,
    getRef = props.getRef,
    getRootRef = props.getRootRef,
    popupDirection = props.popupDirection,
    style = props.style,
    onChange = props.onChange,
    children = props.children,
    onInputChangeProp = props.onInputChange,
    renderDropdown = props.renderDropdown,
    onOpen = props.onOpen,
    onClose = props.onClose,
    fetching = props.fetching,
    forceDropdownPortal = props.forceDropdownPortal,
    _props$selectType = props.selectType,
    selectType = _props$selectType === void 0 ? 'default' : _props$selectType,
    autoHideScrollbar = props.autoHideScrollbar,
    autoHideScrollbarDelay = props.autoHideScrollbarDelay,
    _props$searchable = props.searchable,
    searchable = _props$searchable === void 0 ? false : _props$searchable,
    _props$renderOption = props.renderOption,
    renderOptionProp = _props$renderOption === void 0 ? defaultRenderOptionFn : _props$renderOption,
    _props$options = props.options,
    optionsProp = _props$options === void 0 ? defaultOptions : _props$options,
    _props$emptyText = props.emptyText,
    emptyText = _props$emptyText === void 0 ? 'Ничего не найдено' : _props$emptyText,
    _props$filterFn = props.filterFn,
    filterFn = _props$filterFn === void 0 ? _select.defaultFilterFn : _props$filterFn,
    _props$icon = props.icon,
    icon = _props$icon === void 0 ? /*#__PURE__*/React.createElement(_DropdownIcon.DropdownIcon, {
      opened: opened
    }) : _props$icon,
    _props$dropdownOffset = props.dropdownOffsetDistance,
    dropdownOffsetDistance = _props$dropdownOffset === void 0 ? 0 : _props$dropdownOffset,
    _props$fixDropdownWid = props.fixDropdownWidth,
    fixDropdownWidth = _props$fixDropdownWid === void 0 ? true : _props$fixDropdownWid,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded2);
  if (process.env.NODE_ENV === 'development') {
    checkOptionsValueType(optionsProp);
  }
  var containerRef = React.useRef(null);
  var scrollBoxRef = React.useRef(null);
  var selectElRef = React.useRef(null);
  var _React$useState3 = React.useState(-1),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    focusedOptionIndex = _React$useState4[0],
    setFocusedOptionIndex = _React$useState4[1];
  var _React$useState5 = React.useState(props.value !== undefined),
    _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
    isControlledOutside = _React$useState6[0],
    setIsControlledOutside = _React$useState6[1];
  var _React$useState7 = React.useState(''),
    _React$useState8 = (0, _slicedToArray2.default)(_React$useState7, 2),
    inputValue = _React$useState8[0],
    setInputValue = _React$useState8[1];
  var _React$useState9 = React.useState((_props$value = props.value) !== null && _props$value !== void 0 ? _props$value : props.defaultValue),
    _React$useState10 = (0, _slicedToArray2.default)(_React$useState9, 2),
    nativeSelectValue = _React$useState10[0],
    setNativeSelectValue = _React$useState10[1];
  var _React$useState11 = React.useState(''),
    _React$useState12 = (0, _slicedToArray2.default)(_React$useState11, 2),
    keyboardInput = _React$useState12[0],
    setKeyboardInput = _React$useState12[1];
  var _React$useState13 = React.useState(undefined),
    _React$useState14 = (0, _slicedToArray2.default)(_React$useState13, 2),
    popperPlacement = _React$useState14[0],
    setPopperPlacement = _React$useState14[1];
  var _React$useState15 = React.useState(optionsProp),
    _React$useState16 = (0, _slicedToArray2.default)(_React$useState15, 2),
    options = _React$useState16[0],
    setOptions = _React$useState16[1];
  var _React$useState17 = React.useState(findSelectedIndex(optionsProp, (_props$value2 = props.value) !== null && _props$value2 !== void 0 ? _props$value2 : props.defaultValue)),
    _React$useState18 = (0, _slicedToArray2.default)(_React$useState17, 2),
    selectedOptionIndex = _React$useState18[0],
    setSelectedOptionIndex = _React$useState18[1];
  React.useEffect(function () {
    setIsControlledOutside(props.value !== undefined);
    setNativeSelectValue(function (nativeSelectValue) {
      var _props$value3;
      return (_props$value3 = props.value) !== null && _props$value3 !== void 0 ? _props$value3 : nativeSelectValue;
    });
  }, [props.value]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (nativeSelectValue !== undefined) {
      var _selectElRef$current;
      var _event = new Event('change', {
        bubbles: true
      });
      (_selectElRef$current = selectElRef.current) === null || _selectElRef$current === void 0 ? void 0 : _selectElRef$current.dispatchEvent(_event);
    }
  }, [nativeSelectValue]);
  var selected = React.useMemo(function () {
    if (!options.length) {
      return null;
    }
    return selectedOptionIndex !== undefined ? options[selectedOptionIndex] : undefined;
  }, [options, selectedOptionIndex]);
  var openedClassNames = React.useMemo(function () {
    return (0, _vkjs.classNames)(opened && dropdownOffsetDistance === 0 && (popperPlacement !== null && popperPlacement !== void 0 && popperPlacement.includes('top') ? "vkuiCustomSelect--pop-up" : "vkuiCustomSelect--pop-down"));
  }, [dropdownOffsetDistance, opened, popperPlacement]);
  var resetKeyboardInput = React.useCallback(function () {
    setKeyboardInput('');
  }, []);
  var scrollToElement = React.useCallback(function (index) {
    var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
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
  var isValidIndex = React.useCallback(function (index) {
    var _options$length;
    return index >= 0 && index < ((_options$length = options.length) !== null && _options$length !== void 0 ? _options$length : 0);
  }, [options.length]);
  var focusOptionByIndex = React.useCallback(function (index) {
    var _options$length2;
    var scrollTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (index === undefined || index < 0 || index > ((_options$length2 = options.length) !== null && _options$length2 !== void 0 ? _options$length2 : 0) - 1) {
      return;
    }
    var option = options[index];
    if (option !== null && option !== void 0 && option.disabled) {
      return;
    }
    if (scrollTo) {
      scrollToElement(index);
    }

    // Это оптимизация, прежде всего, под `onMouseOver`
    setFocusedOptionIndex(function (focusedOptionIndex) {
      return focusedOptionIndex !== index ? index : focusedOptionIndex;
    });
  }, [options, scrollToElement]);
  var areOptionsShown = React.useCallback(function () {
    return scrollBoxRef.current !== null;
  }, []);
  var setScrollBoxRef = React.useCallback(function (ref) {
    scrollBoxRef.current = ref;
    if (ref && selectedOptionIndex !== undefined && isValidIndex(selectedOptionIndex)) {
      {
        scrollToElement(selectedOptionIndex, true);
      }
    }
  }, [isValidIndex, scrollToElement, selectedOptionIndex]);
  var onKeyboardInput = React.useCallback(function (key) {
    var fullInput = keyboardInput + key;
    var optionIndex = options.findIndex(function (option) {
      return (0, _utils.getTitleFromChildren)(option.label).toLowerCase().includes(fullInput);
    });
    if (optionIndex !== undefined && optionIndex > -1) {
      focusOptionByIndex(optionIndex);
    }
    setKeyboardInput(fullInput);
  }, [focusOptionByIndex, keyboardInput, options]);

  /**
   * Note: сбрасывать `options` через `setOptions(optionsProp)` не нужно.
   *  Сброс происходит в одном из эффекте `updateOptionsAndSelectedOptionIndex()`.
   */
  var close = React.useCallback(function () {
    resetKeyboardInput();
    setInputValue('');
    setOpened(false);
    setFocusedOptionIndex(-1);
    onClose === null || onClose === void 0 ? void 0 : onClose();
  }, [onClose, resetKeyboardInput]);
  var selectFocused = React.useCallback(function () {
    if (focusedOptionIndex !== undefined && isValidIndex(focusedOptionIndex)) {
      var item = options[focusedOptionIndex];
      setNativeSelectValue(item === null || item === void 0 ? void 0 : item.value);
      close();
    }
  }, [close, focusedOptionIndex, isValidIndex, options]);
  var open = React.useCallback(function () {
    setOpened(true);
    setFocusedOptionIndex(selectedOptionIndex);
    if (typeof onOpen === 'function') {
      onOpen();
    }
  }, [onOpen, selectedOptionIndex]);
  var onBlur = React.useCallback(function () {
    var _selectElRef$current2;
    close();
    var event = new Event('blur');
    (_selectElRef$current2 = selectElRef.current) === null || _selectElRef$current2 === void 0 ? void 0 : _selectElRef$current2.dispatchEvent(event);
  }, [close]);
  var resetFocusedOption = React.useCallback(function () {
    setFocusedOptionIndex(-1);
  }, []);
  var onFocus = React.useCallback(function () {
    var _selectElRef$current3;
    var event = new Event('focus');
    (_selectElRef$current3 = selectElRef.current) === null || _selectElRef$current3 === void 0 ? void 0 : _selectElRef$current3.dispatchEvent(event);
  }, []);
  var onClick = React.useCallback(function () {
    if (opened) {
      close();
    } else {
      open();
    }
  }, [close, open, opened]);
  var handleKeyUp = React.useMemo(function () {
    return (0, _utils.debounce)(resetKeyboardInput, 1000);
  }, [resetKeyboardInput]);
  var focusOption = React.useCallback(function (type) {
    var index = focusedOptionIndex;
    if (type === 'next') {
      var nextIndex = findIndexAfter(options, index);
      index = nextIndex === -1 ? findIndexAfter(options) : nextIndex; // Следующий за index или первый валидный до index
    } else if (type === 'prev') {
      var beforeIndex = findIndexBefore(options, index);
      index = beforeIndex === -1 ? findIndexBefore(options) : beforeIndex; // Предшествующий index или последний валидный после index
    }

    focusOptionByIndex(index);
  }, [focusOptionByIndex, focusedOptionIndex, options]);
  React.useEffect(function updateOptionsAndSelectedOptionIndex() {
    var _ref2, _props$value4;
    var value = (_ref2 = (_props$value4 = props.value) !== null && _props$value4 !== void 0 ? _props$value4 : nativeSelectValue) !== null && _ref2 !== void 0 ? _ref2 : props.defaultValue;
    var options = searchable && inputValue !== undefined ? filter(optionsProp, inputValue, filterFn) : optionsProp;
    setOptions(options);
    setSelectedOptionIndex(findSelectedIndex(options, value));
  }, [filterFn, inputValue, nativeSelectValue, optionsProp, props.defaultValue, props.value, searchable]);

  /**
   * Нужен для правильного поведения обработчика onClick на select. Фильтрует клики, которые были сделаны по
   * выпадающему списку.
   */
  var onLabelClick = React.useCallback(function (e) {
    var _scrollBoxRef$current;
    if ((_scrollBoxRef$current = scrollBoxRef.current) !== null && _scrollBoxRef$current !== void 0 && _scrollBoxRef$current.contains(e.target)) {
      e.preventDefault();
    }
  }, []);
  var onNativeSelectChange = function onNativeSelectChange(e) {
    var newSelectedOptionIndex = findSelectedIndex(options, e.currentTarget.value);
    if (selectedOptionIndex !== newSelectedOptionIndex) {
      if (!isControlledOutside) {
        setSelectedOptionIndex(newSelectedOptionIndex);
      }
      onChange === null || onChange === void 0 ? void 0 : onChange(e);
    }
  };
  var onInputKeyDown = React.useCallback(function (event) {
    ['ArrowUp', 'ArrowDown', 'Escape', 'Enter'].includes(event.key) && areOptionsShown() && event.preventDefault();
    switch (event.key) {
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
  }, [areOptionsShown, close, focusOption, selectFocused]);
  var onInputChange = React.useCallback(function (e) {
    // TODO v6 удалить `onInputChangeProp`.
    if (onInputChangeProp) {
      var _options = onInputChangeProp(e, optionsProp);
      if (_options) {
        if (process.env.NODE_ENV === 'development') {
          warn('Этот метод фильтрации устарел. Возвращаемое значение onInputChange будет ' + 'проигнорировано в v6.0.0. Для фильтрации обновляйте props.options самостоятельно или используйте свойство filterFn.');
        }
        setOptions(_options);
        setSelectedOptionIndex(findSelectedIndex(_options, nativeSelectValue));
      }
    } else {
      var _options2 = filter(optionsProp, e.target.value, filterFn);
      setOptions(_options2);
      setSelectedOptionIndex(findSelectedIndex(_options2, nativeSelectValue));
    }
    setInputValue(e.target.value);
  }, [filterFn, nativeSelectValue, onInputChangeProp, optionsProp]);
  var handleKeyDownSelect = React.useCallback(function (event) {
    if (event.key.length === 1 && event.key !== ' ') {
      onKeyboardInput(event.key);
      return;
    }
    ['ArrowUp', 'ArrowDown', 'Escape', 'Enter'].includes(event.key) && areOptionsShown() && event.preventDefault();
    switch (event.key) {
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
  }, [areOptionsShown, close, focusOption, onKeyboardInput, open, opened, selectFocused]);
  var handleOptionClick = React.useCallback(function (e) {
    var _e$currentTarget$pare;
    var index = Array.prototype.indexOf.call((_e$currentTarget$pare = e.currentTarget.parentNode) === null || _e$currentTarget$pare === void 0 ? void 0 : _e$currentTarget$pare.children, e.currentTarget);
    var option = options[index];
    if (option && !option.disabled) {
      selectFocused();
    }
  }, [options, selectFocused]);
  var handleOptionHover = React.useCallback(function (e) {
    var _e$currentTarget$pare2;
    focusOptionByIndex(Array.prototype.indexOf.call((_e$currentTarget$pare2 = e.currentTarget.parentNode) === null || _e$currentTarget$pare2 === void 0 ? void 0 : _e$currentTarget$pare2.children, e.currentTarget), false);
  }, [focusOptionByIndex]);
  var renderOption = React.useCallback(function (option, index) {
    var hovered = index === focusedOptionIndex;
    var selected = index === selectedOptionIndex;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: "".concat(option.value)
    }, renderOptionProp({
      option: option,
      hovered: hovered,
      children: option.label,
      selected: selected,
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
  }, [focusedOptionIndex, handleOptionClick, handleOptionHover, renderOptionProp, selectedOptionIndex]);
  var resolvedContent = React.useMemo(function () {
    var defaultDropdownContent = (options === null || options === void 0 ? void 0 : options.length) > 0 ? options.map(renderOption) : /*#__PURE__*/React.createElement(_Footnote.Footnote, {
      className: "vkuiCustomSelect__empty"
    }, emptyText);
    if (typeof renderDropdown === 'function') {
      return renderDropdown({
        defaultDropdownContent: defaultDropdownContent
      });
    } else {
      return defaultDropdownContent;
    }
  }, [emptyText, options, renderDropdown, renderOption]);
  return /*#__PURE__*/React.createElement("label", {
    className: (0, _vkjs.classNames)("vkuiCustomSelect", className),
    style: style,
    ref: (0, _utils.multiRef)(containerRef, getRootRef),
    onClick: onLabelClick
  }, opened && searchable ? /*#__PURE__*/React.createElement(_Input.Input, (0, _extends2.default)({}, restProps, {
    autoFocus: true,
    onBlur: onBlur,
    className: openedClassNames,
    value: inputValue,
    onKeyDown: onInputKeyDown,
    onChange: onInputChange
    // TODO Ожидается, что клик поймает нативный select, но его перехватывает Input. К сожалению, это приводит к конфликтам типизации.
    // TODO Нужно перестать пытаться превратить CustomSelect в select. Тогда эта проблема уйдёт.
    // @ts-expect-error: TS2322 MouseEventHandler<HTMLSelectElement> !== MouseEventHandler<HTMLInputElement>
    ,
    onClick: props.onClick,
    before: before,
    after: icon,
    placeholder: restProps.placeholder,
    mode: (0, _select.getFormFieldModeFromSelectType)(selectType)
  })) : /*#__PURE__*/React.createElement(_SelectMimicry.SelectMimicry, (0, _extends2.default)({}, restProps, {
    "aria-hidden": true,
    onClick: onClick,
    onKeyDown: handleKeyDownSelect,
    onKeyUp: handleKeyUp,
    onFocus: onFocus,
    onBlur: onBlur,
    className: openedClassNames,
    after: icon,
    selectType: selectType
  }), selected === null || selected === void 0 ? void 0 : selected.label), /*#__PURE__*/React.createElement("select", {
    ref: selectElRef,
    name: name,
    onChange: onNativeSelectChange,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    onClick: props.onClick,
    value: nativeSelectValue,
    "aria-hidden": true,
    className: "vkuiCustomSelect__control"
  }, optionsProp.map(function (item) {
    return /*#__PURE__*/React.createElement("option", {
      key: "".concat(item.value),
      value: item.value
    });
  })), opened && /*#__PURE__*/React.createElement(_CustomSelectDropdown.CustomSelectDropdown, {
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
    observableRefs: scrollBoxRef
  }, resolvedContent));
}
//# sourceMappingURL=CustomSelect.js.map