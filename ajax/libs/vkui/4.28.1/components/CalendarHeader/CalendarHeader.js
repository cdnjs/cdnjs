import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["option", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { setMonth, setYear, subMonths, addMonths } from "date-fns";
import { Icon20ChevronLeftOutline, Icon20ChevronRightOutline, Icon12Dropdown } from "@vkontakte/icons";
import Tappable from "../Tappable/Tappable";
import { classNames } from "../../lib/classNames";
import CustomSelect, { SelectType } from "../CustomSelect/CustomSelect";
import CustomSelectOption from "../CustomSelectOption/CustomSelectOption";
import { SizeType } from "../../hoc/withAdaptivity";
import { getMonths, getYears } from "../../lib/calendar";
import { LocaleProviderContext } from "../LocaleProviderContext/LocaleProviderContext";
import Text from "../Typography/Text/Text";

var renderOption = function renderOption(_ref) {
  var option = _ref.option,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement(CustomSelectOption, props, createScopedElement("span", {
    vkuiClass: "CalendarHeader__month_name"
  }, children));
};

export var CalendarHeader = function CalendarHeader(_ref2) {
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
  var locale = React.useContext(LocaleProviderContext);
  var onMonthsChange = React.useCallback(function (event) {
    return onChange(setMonth(viewDate, Number(event.target.value)));
  }, [onChange, viewDate]);
  var onYearChange = React.useCallback(function (event) {
    return onChange(setYear(viewDate, Number(event.target.value)));
  }, [onChange, viewDate]);
  var months = React.useMemo(function () {
    return getMonths(locale);
  }, [locale]);
  var currentYear = viewDate.getFullYear();
  var years = React.useMemo(function () {
    return getYears(currentYear, 100);
  }, [currentYear]);
  var formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long"
  });
  return createScopedElement("div", {
    vkuiClass: "CalendarHeader",
    className: className
  }, prevMonth && createScopedElement(Tappable, {
    vkuiClass: classNames("CalendarHeader__nav-icon", "CalendarHeader__nav-icon-prev"),
    onClick: onPrevMonth,
    "aria-label": "".concat(prevMonthAriaLabel, ", ").concat(formatter.format(subMonths(viewDate, 1)))
  }, createScopedElement(Icon20ChevronLeftOutline, {
    width: 30,
    height: 30
  })), createScopedElement("div", {
    vkuiClass: "CalendarHeader__pickers"
  }, disablePickers ? createScopedElement(React.Fragment, null, createScopedElement(Text, {
    weight: "medium",
    vkuiClass: "CalendarHeader__pickers-placeholder"
  }, new Intl.DateTimeFormat(locale, {
    month: "long"
  }).format(viewDate)), createScopedElement(Text, {
    weight: "medium",
    vkuiClass: "CalendarHeader__pickers-placeholder"
  }, new Intl.DateTimeFormat(locale, {
    year: "numeric"
  }).format(viewDate))) : createScopedElement(React.Fragment, null, createScopedElement(CustomSelect, {
    value: viewDate.getMonth(),
    options: months,
    renderOption: renderOption,
    dropdownOffsetDistance: 4,
    fixDropdownWidth: false,
    sizeY: SizeType.COMPACT,
    icon: createScopedElement(Icon12Dropdown, null),
    onChange: onMonthsChange,
    forceDropdownPortal: false,
    selectType: SelectType.Plain,
    "aria-label": changeMonthAriaLabel
  }), createScopedElement(CustomSelect, {
    value: viewDate.getFullYear(),
    options: years,
    dropdownOffsetDistance: 4,
    fixDropdownWidth: false,
    sizeY: SizeType.COMPACT,
    icon: createScopedElement(Icon12Dropdown, null),
    onChange: onYearChange,
    forceDropdownPortal: false,
    selectType: SelectType.Plain,
    "aria-label": changeYearAriaLabel
  }))), nextMonth && createScopedElement(Tappable, {
    vkuiClass: classNames("CalendarHeader__nav-icon", "CalendarHeader__nav-icon-next"),
    onClick: onNextMonth,
    "aria-label": "".concat(nextMonthAriaLabel, ", ").concat(formatter.format(addMonths(viewDate, 1)))
  }, createScopedElement(Icon20ChevronRightOutline, {
    width: 30,
    height: 30
  })));
};
//# sourceMappingURL=CalendarHeader.js.map