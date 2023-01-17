"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRangeInput = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _date = require("../../lib/date");
var _icons = require("@vkontakte/icons");
var _CalendarRange = require("../CalendarRange/CalendarRange");
var _Popper = require("../Popper/Popper");
var _IconButton = require("../IconButton/IconButton");
var _useDateInput2 = require("../../hooks/useDateInput");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _vkjs = require("@vkontakte/vkjs");
var _utils = require("../../lib/utils");
var _FormField = require("../FormField/FormField");
var _InputLike = require("../InputLike/InputLike");
var _InputLikeDivider = require("../InputLike/InputLikeDivider");
var _callMultiple = require("../../lib/callMultiple");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _excluded = ["shouldDisableDate", "disableFuture", "disablePast", "value", "onChange", "calendarPlacement", "style", "className", "closeOnChange", "disablePickers", "getRootRef", "name", "autoFocus", "disabled", "onClick", "onFocus", "prevMonthAriaLabel", "nextMonthAriaLabel", "changeDayAriaLabel", "changeMonthAriaLabel", "changeYearAriaLabel", "changeStartDayAriaLabel", "changeStartMonthAriaLabel", "changeStartYearAriaLabel", "changeEndDayAriaLabel", "changeEndMonthAriaLabel", "changeEndYearAriaLabel", "clearFieldAriaLabel", "showCalendarAriaLabel", "prevMonthIcon", "nextMonthIcon", "disableCalendar"];
var elementsConfig = function elementsConfig(index) {
  var length = 2;
  var min = 1;
  var max = 0;
  switch (index) {
    case 0:
    case 3:
      max = 31;
      break;
    case 1:
    case 4:
      max = 12;
      break;
    case 2:
    case 5:
      max = 2100;
      min = 1900;
      length = 4;
      break;
  }
  return {
    length: length,
    min: min,
    max: max
  };
};
var getInternalValue = function getInternalValue(value) {
  var newValue = ['', '', '', '', '', ''];
  if (value !== null && value !== void 0 && value[0]) {
    newValue[0] = String(value[0].getDate()).padStart(2, '0');
    newValue[1] = String(value[0].getMonth() + 1).padStart(2, '0');
    newValue[2] = String(value[0].getFullYear()).padStart(4, '0');
  }
  if (value !== null && value !== void 0 && value[1]) {
    newValue[3] = String(value[1].getDate()).padStart(2, '0');
    newValue[4] = String(value[1].getMonth() + 1).padStart(2, '0');
    newValue[5] = String(value[1].getFullYear()).padStart(4, '0');
  }
  return newValue;
};

/**
 * @see https://vkcom.github.io/VKUI/#/DateRangeInput
 */
var DateRangeInput = function DateRangeInput(_ref) {
  var shouldDisableDate = _ref.shouldDisableDate,
    disableFuture = _ref.disableFuture,
    disablePast = _ref.disablePast,
    value = _ref.value,
    onChange = _ref.onChange,
    _ref$calendarPlacemen = _ref.calendarPlacement,
    calendarPlacement = _ref$calendarPlacemen === void 0 ? 'bottom-start' : _ref$calendarPlacemen,
    style = _ref.style,
    className = _ref.className,
    _ref$closeOnChange = _ref.closeOnChange,
    closeOnChange = _ref$closeOnChange === void 0 ? true : _ref$closeOnChange,
    disablePickers = _ref.disablePickers,
    getRootRef = _ref.getRootRef,
    name = _ref.name,
    autoFocus = _ref.autoFocus,
    disabled = _ref.disabled,
    onClick = _ref.onClick,
    onFocus = _ref.onFocus,
    prevMonthAriaLabel = _ref.prevMonthAriaLabel,
    nextMonthAriaLabel = _ref.nextMonthAriaLabel,
    changeDayAriaLabel = _ref.changeDayAriaLabel,
    changeMonthAriaLabel = _ref.changeMonthAriaLabel,
    changeYearAriaLabel = _ref.changeYearAriaLabel,
    _ref$changeStartDayAr = _ref.changeStartDayAriaLabel,
    changeStartDayAriaLabel = _ref$changeStartDayAr === void 0 ? 'Изменить день начала' : _ref$changeStartDayAr,
    _ref$changeStartMonth = _ref.changeStartMonthAriaLabel,
    changeStartMonthAriaLabel = _ref$changeStartMonth === void 0 ? 'Изменить месяц начала' : _ref$changeStartMonth,
    _ref$changeStartYearA = _ref.changeStartYearAriaLabel,
    changeStartYearAriaLabel = _ref$changeStartYearA === void 0 ? 'Изменить год начала' : _ref$changeStartYearA,
    _ref$changeEndDayAria = _ref.changeEndDayAriaLabel,
    changeEndDayAriaLabel = _ref$changeEndDayAria === void 0 ? 'Изменить день окончания' : _ref$changeEndDayAria,
    _ref$changeEndMonthAr = _ref.changeEndMonthAriaLabel,
    changeEndMonthAriaLabel = _ref$changeEndMonthAr === void 0 ? 'Изменить месяц окончания' : _ref$changeEndMonthAr,
    _ref$changeEndYearAri = _ref.changeEndYearAriaLabel,
    changeEndYearAriaLabel = _ref$changeEndYearAri === void 0 ? 'Изменить год окончания' : _ref$changeEndYearAri,
    _ref$clearFieldAriaLa = _ref.clearFieldAriaLabel,
    clearFieldAriaLabel = _ref$clearFieldAriaLa === void 0 ? 'Очистить поле' : _ref$clearFieldAriaLa,
    _ref$showCalendarAria = _ref.showCalendarAriaLabel,
    showCalendarAriaLabel = _ref$showCalendarAria === void 0 ? 'Показать календарь' : _ref$showCalendarAria,
    prevMonthIcon = _ref.prevMonthIcon,
    nextMonthIcon = _ref.nextMonthIcon,
    _ref$disableCalendar = _ref.disableCalendar,
    disableCalendar = _ref$disableCalendar === void 0 ? false : _ref$disableCalendar,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var daysStartRef = React.useRef(null);
  var monthsStartRef = React.useRef(null);
  var yearsStartRef = React.useRef(null);
  var daysEndRef = React.useRef(null);
  var monthsEndRef = React.useRef(null);
  var yearsEndRef = React.useRef(null);
  var onInternalValueChange = React.useCallback(function (internalValue) {
    var isStartValid = true;
    var isEndValid = true;
    for (var i = 0; i <= 2; i += 1) {
      if (internalValue[i].length < elementsConfig(i).length) {
        isStartValid = false;
      }
    }
    for (var _i = 3; _i <= 5; _i += 1) {
      if (internalValue[_i].length < elementsConfig(_i).length) {
        isEndValid = false;
      }
    }
    var formattedStartValue = "".concat(internalValue[0], ".").concat(internalValue[1], ".").concat(internalValue[2]);
    var formattedEndValue = "".concat(internalValue[3], ".").concat(internalValue[4], ".").concat(internalValue[5]);
    var mask = 'dd.MM.yyyy';
    if (!(0, _date.isMatch)(formattedStartValue, mask)) {
      isStartValid = false;
    }
    if (!(0, _date.isMatch)(formattedEndValue, mask)) {
      isEndValid = false;
    }
    if (!isStartValid && !isEndValid) {
      return;
    }
    var valueExists = Array.isArray(value);
    var now = new Date();
    var start = isStartValid ? (0, _date.parse)(formattedStartValue, mask, valueExists && (value === null || value === void 0 ? void 0 : value[0]) || now) : null;
    var end = isEndValid ? (0, _date.parse)(formattedEndValue, mask, valueExists && (value === null || value === void 0 ? void 0 : value[1]) || now) : null;
    if (start && end && (0, _date.isAfter)(end, start)) {
      onChange === null || onChange === void 0 ? void 0 : onChange([start, end]);
    }
  }, [onChange, value]);
  var refs = React.useMemo(function () {
    return [daysStartRef, monthsStartRef, yearsStartRef, daysEndRef, monthsEndRef, yearsEndRef];
  }, [daysStartRef, monthsStartRef, yearsStartRef, daysEndRef, monthsEndRef, yearsEndRef]);
  var _useDateInput = (0, _useDateInput2.useDateInput)({
      maxElement: 5,
      refs: refs,
      autoFocus: autoFocus,
      disabled: disabled,
      elementsConfig: elementsConfig,
      onChange: onChange,
      onInternalValueChange: onInternalValueChange,
      getInternalValue: getInternalValue,
      value: value
    }),
    rootRef = _useDateInput.rootRef,
    calendarRef = _useDateInput.calendarRef,
    open = _useDateInput.open,
    openCalendar = _useDateInput.openCalendar,
    closeCalendar = _useDateInput.closeCalendar,
    internalValue = _useDateInput.internalValue,
    handleKeyDown = _useDateInput.handleKeyDown,
    setFocusedElement = _useDateInput.setFocusedElement,
    handleFieldEnter = _useDateInput.handleFieldEnter,
    clear = _useDateInput.clear,
    removeFocusFromField = _useDateInput.removeFocusFromField;
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var onCalendarChange = React.useCallback(function (newValue) {
    onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    if (closeOnChange && newValue !== null && newValue !== void 0 && newValue[1] && newValue[1] !== (value === null || value === void 0 ? void 0 : value[1])) {
      removeFocusFromField();
    }
  }, [onChange, closeOnChange, value, removeFocusFromField]);
  return /*#__PURE__*/React.createElement(_FormField.FormField, (0, _extends2.default)({
    style: style,
    className: (0, _vkjs.classNames)("vkuiDateRangeInput", (0, _getSizeYClassName.getSizeYClassName)("vkuiDateRangeInput", sizeY), className),
    getRootRef: (0, _utils.multiRef)(rootRef, getRootRef),
    after: value ? /*#__PURE__*/React.createElement(_IconButton.IconButton, {
      hoverMode: "opacity",
      "aria-label": clearFieldAriaLabel,
      onClick: clear
    }, /*#__PURE__*/React.createElement(_icons.Icon16Clear, null)) : /*#__PURE__*/React.createElement(_IconButton.IconButton, {
      hoverMode: "opacity",
      "aria-label": showCalendarAriaLabel,
      onClick: openCalendar
    }, /*#__PURE__*/React.createElement(_icons.Icon20CalendarOutline, null)),
    disabled: disabled,
    onClick: (0, _callMultiple.callMultiple)(handleFieldEnter, onClick),
    onFocus: (0, _callMultiple.callMultiple)(handleFieldEnter, onFocus)
  }, props), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: name,
    value: value ? "".concat(value[0] ? (0, _date.format)(value[0], 'DD.MM.YYYY') : '', " - ").concat(value[1] ? (0, _date.format)(value[1], 'DD.MM.YYYY') : '') : ''
  }), /*#__PURE__*/React.createElement("span", {
    className: "vkuiDateInput__input",
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/React.createElement(_InputLike.InputLike, {
    length: 2,
    getRootRef: daysStartRef,
    index: 0,
    onElementSelect: setFocusedElement,
    value: internalValue[0],
    "aria-label": changeStartDayAriaLabel
  }), /*#__PURE__*/React.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/React.createElement(_InputLike.InputLike, {
    length: 2,
    getRootRef: monthsStartRef,
    index: 1,
    onElementSelect: setFocusedElement,
    value: internalValue[1],
    "aria-label": changeStartMonthAriaLabel
  }), /*#__PURE__*/React.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/React.createElement(_InputLike.InputLike, {
    length: 4,
    getRootRef: yearsStartRef,
    index: 2,
    onElementSelect: setFocusedElement,
    value: internalValue[2],
    "aria-label": changeStartYearAriaLabel
  }), /*#__PURE__*/React.createElement(_InputLikeDivider.InputLikeDivider, null, ' — '), /*#__PURE__*/React.createElement(_InputLike.InputLike, {
    length: 2,
    getRootRef: daysEndRef,
    index: 3,
    onElementSelect: setFocusedElement,
    value: internalValue[3],
    "aria-label": changeEndDayAriaLabel
  }), /*#__PURE__*/React.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/React.createElement(_InputLike.InputLike, {
    length: 2,
    getRootRef: monthsEndRef,
    index: 4,
    onElementSelect: setFocusedElement,
    value: internalValue[4],
    "aria-label": changeEndMonthAriaLabel
  }), /*#__PURE__*/React.createElement(_InputLikeDivider.InputLikeDivider, null, "."), /*#__PURE__*/React.createElement(_InputLike.InputLike, {
    length: 4,
    getRootRef: yearsEndRef,
    index: 5,
    onElementSelect: setFocusedElement,
    value: internalValue[5],
    "aria-label": changeEndYearAriaLabel
  })), open && !disableCalendar && /*#__PURE__*/React.createElement(_Popper.Popper, {
    targetRef: rootRef,
    offsetDistance: 8,
    placement: calendarPlacement
  }, /*#__PURE__*/React.createElement(_CalendarRange.CalendarRange, {
    value: value,
    onChange: onCalendarChange,
    disablePast: disablePast,
    disableFuture: disableFuture,
    shouldDisableDate: shouldDisableDate,
    onClose: closeCalendar,
    getRootRef: calendarRef,
    disablePickers: disablePickers,
    prevMonthAriaLabel: prevMonthAriaLabel,
    nextMonthAriaLabel: nextMonthAriaLabel,
    changeMonthAriaLabel: changeMonthAriaLabel,
    changeYearAriaLabel: changeYearAriaLabel,
    changeDayAriaLabel: changeDayAriaLabel,
    prevMonthIcon: prevMonthIcon,
    nextMonthIcon: nextMonthIcon
  })));
};
exports.DateRangeInput = DateRangeInput;
//# sourceMappingURL=DateRangeInput.js.map