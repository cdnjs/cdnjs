"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarHeader = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _date = require("../../lib/date");

var _icons = require("@vkontakte/icons");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _classNames = require("../../lib/classNames");

var _CustomSelect = require("../CustomSelect/CustomSelect");

var _CustomSelectOption = require("../CustomSelectOption/CustomSelectOption");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _calendar = require("../../lib/calendar");

var _LocaleProviderContext = require("../LocaleProviderContext/LocaleProviderContext");

var _Paragraph = require("../Typography/Paragraph/Paragraph");

var _excluded = ["option", "children"];

var renderOption = function renderOption(_ref) {
  var option = _ref.option,
      children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)(_CustomSelectOption.CustomSelectOption, props, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "CalendarHeader__month_name"
  }, children));
};

var CalendarHeader = function CalendarHeader(_ref2) {
  var viewDate = _ref2.viewDate,
      onChange = _ref2.onChange,
      _ref2$prevMonth = _ref2.prevMonth,
      prevMonth = _ref2$prevMonth === void 0 ? true : _ref2$prevMonth,
      _ref2$nextMonth = _ref2.nextMonth,
      nextMonth = _ref2$nextMonth === void 0 ? true : _ref2$nextMonth,
      _ref2$disablePickers = _ref2.disablePickers,
      disablePickers = _ref2$disablePickers === void 0 ? false : _ref2$disablePickers,
      onNextMonth = _ref2.onNextMonth,
      onPrevMonth = _ref2.onPrevMonth,
      className = _ref2.className,
      _ref2$prevMonthAriaLa = _ref2.prevMonthAriaLabel,
      prevMonthAriaLabel = _ref2$prevMonthAriaLa === void 0 ? "Предыдущий месяц" : _ref2$prevMonthAriaLa,
      _ref2$nextMonthAriaLa = _ref2.nextMonthAriaLabel,
      nextMonthAriaLabel = _ref2$nextMonthAriaLa === void 0 ? "Следующий месяц" : _ref2$nextMonthAriaLa,
      _ref2$changeMonthAria = _ref2.changeMonthAriaLabel,
      changeMonthAriaLabel = _ref2$changeMonthAria === void 0 ? "Изменить месяц" : _ref2$changeMonthAria,
      _ref2$changeYearAriaL = _ref2.changeYearAriaLabel,
      changeYearAriaLabel = _ref2$changeYearAriaL === void 0 ? "Изменить год" : _ref2$changeYearAriaL;
  var locale = React.useContext(_LocaleProviderContext.LocaleProviderContext);
  var onMonthsChange = React.useCallback(function (event) {
    return onChange((0, _date.setMonth)(viewDate, Number(event.target.value)));
  }, [onChange, viewDate]);
  var onYearChange = React.useCallback(function (event) {
    return onChange((0, _date.setYear)(viewDate, Number(event.target.value)));
  }, [onChange, viewDate]);
  var months = React.useMemo(function () {
    return (0, _calendar.getMonths)(locale);
  }, [locale]);
  var currentYear = viewDate.getFullYear();
  var years = React.useMemo(function () {
    return (0, _calendar.getYears)(currentYear, 100);
  }, [currentYear]);
  var formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long"
  });
  return (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CalendarHeader",
    className: className
  }, prevMonth && (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
    vkuiClass: (0, _classNames.classNames)("CalendarHeader__nav-icon", "CalendarHeader__nav-icon-prev"),
    onClick: onPrevMonth,
    "aria-label": "".concat(prevMonthAriaLabel, ", ").concat(formatter.format((0, _date.subMonths)(viewDate, 1)))
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon20ChevronLeftOutline, {
    width: 30,
    height: 30
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CalendarHeader__pickers"
  }, disablePickers ? (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _jsxRuntime.createScopedElement)(_Paragraph.Paragraph, {
    weight: "2",
    vkuiClass: "CalendarHeader__pickers-placeholder"
  }, new Intl.DateTimeFormat(locale, {
    month: "long"
  }).format(viewDate)), (0, _jsxRuntime.createScopedElement)(_Paragraph.Paragraph, {
    weight: "2",
    vkuiClass: "CalendarHeader__pickers-placeholder"
  }, new Intl.DateTimeFormat(locale, {
    year: "numeric"
  }).format(viewDate))) : (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _jsxRuntime.createScopedElement)(_CustomSelect.CustomSelect, {
    value: viewDate.getMonth(),
    options: months,
    renderOption: renderOption,
    dropdownOffsetDistance: 4,
    fixDropdownWidth: false,
    sizeY: _withAdaptivity.SizeType.COMPACT,
    icon: (0, _jsxRuntime.createScopedElement)(_icons.Icon12Dropdown, null),
    onChange: onMonthsChange,
    forceDropdownPortal: false,
    selectType: _CustomSelect.SelectType.Plain,
    "aria-label": changeMonthAriaLabel
  }), (0, _jsxRuntime.createScopedElement)(_CustomSelect.CustomSelect, {
    value: viewDate.getFullYear(),
    options: years,
    dropdownOffsetDistance: 4,
    fixDropdownWidth: false,
    sizeY: _withAdaptivity.SizeType.COMPACT,
    icon: (0, _jsxRuntime.createScopedElement)(_icons.Icon12Dropdown, null),
    onChange: onYearChange,
    forceDropdownPortal: false,
    selectType: _CustomSelect.SelectType.Plain,
    "aria-label": changeYearAriaLabel
  }))), nextMonth && (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
    vkuiClass: (0, _classNames.classNames)("CalendarHeader__nav-icon", "CalendarHeader__nav-icon-next"),
    onClick: onNextMonth,
    "aria-label": "".concat(nextMonthAriaLabel, ", ").concat(formatter.format((0, _date.addMonths)(viewDate, 1)))
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon20ChevronRightOutline, {
    width: 30,
    height: 30
  })));
};

exports.CalendarHeader = CalendarHeader;
//# sourceMappingURL=CalendarHeader.js.map