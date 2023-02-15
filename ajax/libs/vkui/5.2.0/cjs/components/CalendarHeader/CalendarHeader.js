"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarHeader = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _date = require("../../lib/date");
var _icons = require("@vkontakte/icons");
var _Tappable = require("../Tappable/Tappable");
var _vkjs = require("@vkontakte/vkjs");
var _CustomSelect = require("../CustomSelect/CustomSelect");
var _adaptivity = require("../../lib/adaptivity");
var _calendar = require("../../lib/calendar");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _Paragraph = require("../Typography/Paragraph/Paragraph");
var _AdaptivityProvider = require("../AdaptivityProvider/AdaptivityProvider");
var _excluded = ["className"],
  _excluded2 = ["className"];
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
    _ref$prevMonthProps = _ref.prevMonthProps,
    prevMonthProps = _ref$prevMonthProps === void 0 ? {} : _ref$prevMonthProps,
    _ref$nextMonthProps = _ref.nextMonthProps,
    nextMonthProps = _ref$nextMonthProps === void 0 ? {} : _ref$nextMonthProps,
    _ref$prevMonthAriaLab = _ref.prevMonthAriaLabel,
    prevMonthAriaLabel = _ref$prevMonthAriaLab === void 0 ? 'Предыдущий месяц' : _ref$prevMonthAriaLab,
    _ref$nextMonthAriaLab = _ref.nextMonthAriaLabel,
    nextMonthAriaLabel = _ref$nextMonthAriaLab === void 0 ? 'Следующий месяц' : _ref$nextMonthAriaLab,
    _ref$changeMonthAriaL = _ref.changeMonthAriaLabel,
    changeMonthAriaLabel = _ref$changeMonthAriaL === void 0 ? 'Изменить месяц' : _ref$changeMonthAriaL,
    _ref$changeYearAriaLa = _ref.changeYearAriaLabel,
    changeYearAriaLabel = _ref$changeYearAriaLa === void 0 ? 'Изменить год' : _ref$changeYearAriaLa,
    _ref$prevMonthIcon = _ref.prevMonthIcon,
    prevMonthIcon = _ref$prevMonthIcon === void 0 ? /*#__PURE__*/React.createElement(_icons.Icon20ChevronLeftOutline, {
      className: "vkuiCalendarHeader__nav-icon--accent",
      width: 30,
      height: 30
    }) : _ref$prevMonthIcon,
    _ref$nextMonthIcon = _ref.nextMonthIcon,
    nextMonthIcon = _ref$nextMonthIcon === void 0 ? /*#__PURE__*/React.createElement(_icons.Icon20ChevronRightOutline, {
      className: "vkuiCalendarHeader__nav-icon--accent",
      width: 30,
      height: 30
    }) : _ref$nextMonthIcon;
  var _useConfigProvider = (0, _ConfigProviderContext.useConfigProvider)(),
    locale = _useConfigProvider.locale;
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
        label: /*#__PURE__*/React.createElement("span", {
          className: "vkuiCalendarHeader__month"
        }, label)
      };
    });
  }, [locale]);
  var currentYear = viewDate.getFullYear();
  var years = React.useMemo(function () {
    return (0, _calendar.getYears)(currentYear, 100);
  }, [currentYear]);
  var formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long'
  });
  var prevMonthClassName = prevMonthProps.className,
    restPrevMonthProps = (0, _objectWithoutProperties2.default)(prevMonthProps, _excluded);
  var nextMonthClassName = nextMonthProps.className,
    restNextMonthProps = (0, _objectWithoutProperties2.default)(nextMonthProps, _excluded2);
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _vkjs.classNames)("vkuiCalendarHeader", className)
  }, prevMonth && /*#__PURE__*/React.createElement(_AdaptivityProvider.AdaptivityProvider, {
    sizeX: _adaptivity.SizeType.REGULAR
  }, /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-prev", prevMonthClassName),
    onClick: onPrevMonth,
    "aria-label": "".concat(prevMonthAriaLabel, ", ").concat(formatter.format((0, _date.subMonths)(viewDate, 1)))
  }, restPrevMonthProps), prevMonthIcon)), disablePickers ? /*#__PURE__*/React.createElement(_Paragraph.Paragraph, {
    className: "vkuiCalendarHeader__pickers",
    weight: "2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vkuiCalendarHeader__month"
  }, new Intl.DateTimeFormat(locale, {
    month: 'long'
  }).format(viewDate)), "\xA0", new Intl.DateTimeFormat(locale, {
    year: 'numeric'
  }).format(viewDate)) : /*#__PURE__*/React.createElement(_AdaptivityProvider.AdaptivityProvider, {
    sizeY: _adaptivity.SizeType.COMPACT
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiCalendarHeader__pickers"
  }, /*#__PURE__*/React.createElement(_CustomSelect.CustomSelect, {
    className: "vkuiCalendarHeader__picker",
    value: viewDate.getMonth(),
    options: months,
    dropdownOffsetDistance: 4,
    fixDropdownWidth: false,
    icon: /*#__PURE__*/React.createElement(_icons.Icon12Dropdown, null),
    onChange: onMonthsChange,
    forceDropdownPortal: false,
    selectType: "accent",
    "aria-label": changeMonthAriaLabel
  }), /*#__PURE__*/React.createElement(_CustomSelect.CustomSelect, {
    className: "vkuiCalendarHeader__picker",
    value: viewDate.getFullYear(),
    options: years,
    dropdownOffsetDistance: 4,
    fixDropdownWidth: false,
    icon: /*#__PURE__*/React.createElement(_icons.Icon12Dropdown, null),
    onChange: onYearChange,
    forceDropdownPortal: false,
    selectType: "accent",
    "aria-label": changeYearAriaLabel
  }))), nextMonth && /*#__PURE__*/React.createElement(_AdaptivityProvider.AdaptivityProvider, {
    sizeX: _adaptivity.SizeType.REGULAR
  }, /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiCalendarHeader__nav-icon", "vkuiCalendarHeader__nav-icon-next", nextMonthClassName),
    onClick: onNextMonth,
    "aria-label": "".concat(nextMonthAriaLabel, ", ").concat(formatter.format((0, _date.addMonths)(viewDate, 1)))
  }, restNextMonthProps), nextMonthIcon)));
};
exports.CalendarHeader = CalendarHeader;
//# sourceMappingURL=CalendarHeader.js.map