"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarHeader = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var React = _interopRequireWildcard(require("react"));

var _date = require("../../lib/date");

var _icons = require("@vkontakte/icons");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _classNames = require("../../lib/classNames");

var _Select = require("../Select/Select");

var _CustomSelect = require("../CustomSelect/CustomSelect");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _calendar = require("../../lib/calendar");

var _LocaleProviderContext = require("../LocaleProviderContext/LocaleProviderContext");

var _Paragraph = require("../Typography/Paragraph/Paragraph");

var _AdaptivityProvider = require("../AdaptivityProvider/AdaptivityProvider");

var CalendarHeader = function CalendarHeader(_ref) {
  var viewDate = _ref.viewDate,
      onChange = _ref.onChange,
      _ref$prevMonth = _ref.prevMonth,
      prevMonth = _ref$prevMonth === void 0 ? true : _ref$prevMonth,
      _ref$nextMonth = _ref.nextMonth,
      nextMonth = _ref$nextMonth === void 0 ? true : _ref$nextMonth,
      _ref$disablePickers = _ref.disablePickers,
      disablePickers = _ref$disablePickers === void 0 ? false : _ref$disablePickers,
      onNextMonth = _ref.onNextMonth,
      onPrevMonth = _ref.onPrevMonth,
      className = _ref.className,
      _ref$prevMonthAriaLab = _ref.prevMonthAriaLabel,
      prevMonthAriaLabel = _ref$prevMonthAriaLab === void 0 ? "Предыдущий месяц" : _ref$prevMonthAriaLab,
      _ref$nextMonthAriaLab = _ref.nextMonthAriaLabel,
      nextMonthAriaLabel = _ref$nextMonthAriaLab === void 0 ? "Следующий месяц" : _ref$nextMonthAriaLab,
      _ref$changeMonthAriaL = _ref.changeMonthAriaLabel,
      changeMonthAriaLabel = _ref$changeMonthAriaL === void 0 ? "Изменить месяц" : _ref$changeMonthAriaL,
      _ref$changeYearAriaLa = _ref.changeYearAriaLabel,
      changeYearAriaLabel = _ref$changeYearAriaLa === void 0 ? "Изменить год" : _ref$changeYearAriaLa,
      _ref$prevMonthIcon = _ref.prevMonthIcon,
      prevMonthIcon = _ref$prevMonthIcon === void 0 ? (0, _jsxRuntime.createScopedElement)(_icons.Icon20ChevronLeftOutline, {
    vkuiClass: "CalendarHeader__nav-icon--accent",
    width: 30,
    height: 30
  }) : _ref$prevMonthIcon,
      _ref$nextMonthIcon = _ref.nextMonthIcon,
      nextMonthIcon = _ref$nextMonthIcon === void 0 ? (0, _jsxRuntime.createScopedElement)(_icons.Icon20ChevronRightOutline, {
    vkuiClass: "CalendarHeader__nav-icon--accent",
    width: 30,
    height: 30
  }) : _ref$nextMonthIcon;
  var locale = React.useContext(_LocaleProviderContext.LocaleProviderContext);
  var onMonthsChange = React.useCallback(function (event) {
    return onChange((0, _date.setMonth)(viewDate, Number(event.target.value)));
  }, [onChange, viewDate]);
  var onYearChange = React.useCallback(function (event) {
    return onChange((0, _date.setYear)(viewDate, Number(event.target.value)));
  }, [onChange, viewDate]);
  var months = React.useMemo(function () {
    return (0, _calendar.getMonths)(locale).map(function (_ref2) {
      var value = _ref2.value,
          label = _ref2.label;
      return {
        value: value,
        label: (0, _jsxRuntime.createScopedElement)("span", {
          vkuiClass: "CalendarHeader__month"
        }, label)
      };
    });
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
  }, prevMonth && (0, _jsxRuntime.createScopedElement)(_AdaptivityProvider.AdaptivityProvider, {
    sizeX: _withAdaptivity.SizeType.REGULAR
  }, (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
    vkuiClass: (0, _classNames.classNames)("CalendarHeader__nav-icon", "CalendarHeader__nav-icon-prev"),
    onClick: onPrevMonth,
    "aria-label": "".concat(prevMonthAriaLabel, ", ").concat(formatter.format((0, _date.subMonths)(viewDate, 1)))
  }, prevMonthIcon)), disablePickers ? (0, _jsxRuntime.createScopedElement)(_Paragraph.Paragraph, {
    vkuiClass: "CalendarHeader__pickers",
    weight: "2"
  }, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "CalendarHeader__month"
  }, new Intl.DateTimeFormat(locale, {
    month: "long"
  }).format(viewDate)), "\xA0", new Intl.DateTimeFormat(locale, {
    year: "numeric"
  }).format(viewDate)) : (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CalendarHeader__pickers"
  }, (0, _jsxRuntime.createScopedElement)(_CustomSelect.CustomSelect, {
    vkuiClass: "CalendarHeader__picker",
    value: viewDate.getMonth(),
    options: months,
    dropdownOffsetDistance: 4,
    fixDropdownWidth: false,
    sizeY: _withAdaptivity.SizeType.COMPACT,
    icon: (0, _jsxRuntime.createScopedElement)(_icons.Icon12Dropdown, null),
    onChange: onMonthsChange,
    forceDropdownPortal: false,
    selectType: _Select.SelectType.accent,
    "aria-label": changeMonthAriaLabel
  }), (0, _jsxRuntime.createScopedElement)(_CustomSelect.CustomSelect, {
    vkuiClass: "CalendarHeader__picker",
    value: viewDate.getFullYear(),
    options: years,
    dropdownOffsetDistance: 4,
    fixDropdownWidth: false,
    sizeY: _withAdaptivity.SizeType.COMPACT,
    icon: (0, _jsxRuntime.createScopedElement)(_icons.Icon12Dropdown, null),
    onChange: onYearChange,
    forceDropdownPortal: false,
    selectType: _Select.SelectType.accent,
    "aria-label": changeYearAriaLabel
  })), nextMonth && (0, _jsxRuntime.createScopedElement)(_AdaptivityProvider.AdaptivityProvider, {
    sizeX: _withAdaptivity.SizeType.REGULAR
  }, (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
    vkuiClass: (0, _classNames.classNames)("CalendarHeader__nav-icon", "CalendarHeader__nav-icon-next"),
    onClick: onNextMonth,
    "aria-label": "".concat(nextMonthAriaLabel, ", ").concat(formatter.format((0, _date.addMonths)(viewDate, 1)))
  }, nextMonthIcon)));
};

exports.CalendarHeader = CalendarHeader;
//# sourceMappingURL=CalendarHeader.js.map