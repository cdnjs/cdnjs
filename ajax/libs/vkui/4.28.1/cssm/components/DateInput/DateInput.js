import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["enableTime", "shouldDisableDate", "disableFuture", "disablePast", "value", "onChange", "calendarPlacement", "style", "className", "doneButtonText", "closeOnChange", "disablePickers", "getRootRef", "name", "autoFocus", "disabled", "onClick", "onFocus", "prevMonthAriaLabel", "nextMonthAriaLabel", "showNeighboringMonth", "size", "changeMonthAriaLabel", "changeYearAriaLabel", "changeDayAriaLabel", "changeHoursAriaLabel", "changeMinutesAriaLabel", "clearFieldAriaLabel", "showCalendarAriaLabel"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { format, isMatch, parse } from "date-fns";
import { Icon16Clear, Icon20CalendarOutline } from "@vkontakte/icons";
import { Calendar } from "../Calendar/Calendar";
import { Popper } from "../Popper/Popper";
import { multiRef } from "../../lib/utils";
import IconButton from "../IconButton/IconButton";
import { classNames } from "../../lib/classNames";
import { FormField } from "../FormField/FormField";
import { useDateInput } from "../../hooks/useDateInput";
import { InputLike } from "../InputLike/InputLike";
import { InputLikeDivider } from "../InputLike/InputLikeDivider";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { callMultiple } from "../../lib/callMultiple";
import "./DateInput.css";

var elementsConfig = function elementsConfig(index) {
  var length = 2;
  var min = 1;
  var max = 0;

  switch (index) {
    case 0:
      max = 31;
      break;

    case 1:
      max = 12;
      break;

    case 2:
      max = 2100;
      min = 1900;
      length = 4;
      break;

    case 3:
      max = 23;
      break;

    case 4:
      max = 59;
      break;
  }

  return {
    length: length,
    min: min,
    max: max
  };
};

var getInternalValue = function getInternalValue(value) {
  var newValue = ["", "", "", "", ""];

  if (value) {
    newValue[0] = String(value.getDate()).padStart(2, "0");
    newValue[1] = String(value.getMonth() + 1).padStart(2, "0");
    newValue[2] = String(value.getFullYear()).padStart(4, "0");
    newValue[3] = String(value.getHours()).padStart(2, "0");
    newValue[4] = String(value.getMinutes()).padStart(2, "0");
  }

  return newValue;
};

export var DateInput = function DateInput(_ref) {
  var enableTime = _ref.enableTime,
      shouldDisableDate = _ref.shouldDisableDate,
      disableFuture = _ref.disableFuture,
      disablePast = _ref.disablePast,
      value = _ref.value,
      onChange = _ref.onChange,
      _ref$calendarPlacemen = _ref.calendarPlacement,
      calendarPlacement = _ref$calendarPlacemen === void 0 ? "bottom-start" : _ref$calendarPlacemen,
      style = _ref.style,
      className = _ref.className,
      doneButtonText = _ref.doneButtonText,
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
      showNeighboringMonth = _ref.showNeighboringMonth,
      size = _ref.size,
      _ref$changeMonthAriaL = _ref.changeMonthAriaLabel,
      changeMonthAriaLabel = _ref$changeMonthAriaL === void 0 ? "Изменить месяц" : _ref$changeMonthAriaL,
      _ref$changeYearAriaLa = _ref.changeYearAriaLabel,
      changeYearAriaLabel = _ref$changeYearAriaLa === void 0 ? "Изменить год" : _ref$changeYearAriaLa,
      _ref$changeDayAriaLab = _ref.changeDayAriaLabel,
      changeDayAriaLabel = _ref$changeDayAriaLab === void 0 ? "Изменить день" : _ref$changeDayAriaLab,
      _ref$changeHoursAriaL = _ref.changeHoursAriaLabel,
      changeHoursAriaLabel = _ref$changeHoursAriaL === void 0 ? "Изменить час" : _ref$changeHoursAriaL,
      _ref$changeMinutesAri = _ref.changeMinutesAriaLabel,
      changeMinutesAriaLabel = _ref$changeMinutesAri === void 0 ? "Изменить минуту" : _ref$changeMinutesAri,
      _ref$clearFieldAriaLa = _ref.clearFieldAriaLabel,
      clearFieldAriaLabel = _ref$clearFieldAriaLa === void 0 ? "Очистить поле" : _ref$clearFieldAriaLa,
      _ref$showCalendarAria = _ref.showCalendarAriaLabel,
      showCalendarAriaLabel = _ref$showCalendarAria === void 0 ? "Показать календарь" : _ref$showCalendarAria,
      props = _objectWithoutProperties(_ref, _excluded);

  var daysRef = React.useRef(null);
  var monthsRef = React.useRef(null);
  var yearsRef = React.useRef(null);
  var hoursRef = React.useRef(null);
  var minutesRef = React.useRef(null);
  var maxElement = enableTime ? 4 : 2;
  var onInternalValueChange = React.useCallback(function (internalValue) {
    for (var i = 0; i <= maxElement; i += 1) {
      if (internalValue[i].length < elementsConfig(i).length) {
        return;
      }
    }

    var formattedValue = "".concat(internalValue[0], ".").concat(internalValue[1], ".").concat(internalValue[2]);
    var mask = "dd.MM.yyyy";

    if (enableTime) {
      formattedValue += " ".concat(internalValue[3], ":").concat(internalValue[4]);
      mask += " HH:mm";
    }

    if (isMatch(formattedValue, mask)) {
      onChange === null || onChange === void 0 ? void 0 : onChange(parse(formattedValue, mask, value !== null && value !== void 0 ? value : new Date()));
    }
  }, [enableTime, maxElement, onChange, value]);
  var refs = React.useMemo(function () {
    return [daysRef, monthsRef, yearsRef, hoursRef, minutesRef];
  }, [daysRef, monthsRef, yearsRef, hoursRef, minutesRef]);

  var _useDateInput = useDateInput({
    maxElement: maxElement,
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

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  var onCalendarChange = React.useCallback(function (value) {
    onChange === null || onChange === void 0 ? void 0 : onChange(value);

    if (closeOnChange && !enableTime) {
      removeFocusFromField();
    }
  }, [onChange, removeFocusFromField, closeOnChange, enableTime]);
  return createScopedElement(FormField, _extends({
    vkuiClass: classNames("DateInput", "DateInput--sizeY-".concat(sizeY)),
    style: style,
    className: className,
    getRootRef: multiRef(rootRef, getRootRef),
    after: value ? createScopedElement(IconButton, {
      hoverMode: "opacity",
      "aria-label": clearFieldAriaLabel,
      onClick: clear
    }, createScopedElement(Icon16Clear, null)) : createScopedElement(IconButton, {
      hoverMode: "opacity",
      "aria-label": showCalendarAriaLabel,
      onClick: openCalendar
    }, createScopedElement(Icon20CalendarOutline, null)),
    disabled: disabled,
    onClick: callMultiple(handleFieldEnter, onClick),
    onFocus: callMultiple(handleFieldEnter, onFocus)
  }, props), createScopedElement("input", {
    type: "hidden",
    name: name,
    value: value ? format(value, enableTime ? "dd.MM.yyyy'T'HH:mm" : "dd.MM.yyyy") : ""
  }), createScopedElement("span", {
    vkuiClass: "DateInput__input",
    onKeyDown: handleKeyDown
  }, createScopedElement(InputLike, {
    tabIndex: 1,
    length: 2,
    getRootRef: daysRef,
    index: 0,
    onElementSelect: setFocusedElement,
    value: internalValue[0],
    "aria-label": changeDayAriaLabel
  }), createScopedElement(InputLikeDivider, null, "."), createScopedElement(InputLike, {
    length: 2,
    getRootRef: monthsRef,
    index: 1,
    onElementSelect: setFocusedElement,
    value: internalValue[1],
    "aria-label": changeMonthAriaLabel
  }), createScopedElement(InputLikeDivider, null, "."), createScopedElement(InputLike, {
    length: 4,
    getRootRef: yearsRef,
    index: 2,
    onElementSelect: setFocusedElement,
    value: internalValue[2],
    "aria-label": changeYearAriaLabel
  }), enableTime && createScopedElement(React.Fragment, null, createScopedElement(InputLikeDivider, {
    vkuiClass: "DateInput__input-time-divider"
  }, " "), createScopedElement(InputLike, {
    length: 2,
    getRootRef: hoursRef,
    index: 3,
    onElementSelect: setFocusedElement,
    value: internalValue[3],
    "aria-label": changeHoursAriaLabel
  }), createScopedElement(InputLikeDivider, null, ":"), createScopedElement(InputLike, {
    length: 2,
    getRootRef: minutesRef,
    index: 4,
    onElementSelect: setFocusedElement,
    value: internalValue[4],
    "aria-label": changeMinutesAriaLabel
  }))), open && createScopedElement(Popper, {
    targetRef: rootRef,
    offsetDistance: 8,
    placement: calendarPlacement
  }, createScopedElement(Calendar, {
    value: value,
    onChange: onCalendarChange,
    enableTime: enableTime,
    disablePast: disablePast,
    disableFuture: disableFuture,
    shouldDisableDate: shouldDisableDate,
    onClose: closeCalendar,
    getRootRef: calendarRef,
    doneButtonText: doneButtonText,
    disablePickers: disablePickers,
    changeHoursAriaLabel: changeHoursAriaLabel,
    changeMinutesAriaLabel: changeMinutesAriaLabel,
    prevMonthAriaLabel: prevMonthAriaLabel,
    nextMonthAriaLabel: nextMonthAriaLabel,
    changeMonthAriaLabel: changeMonthAriaLabel,
    changeYearAriaLabel: changeYearAriaLabel,
    changeDayAriaLabel: changeDayAriaLabel,
    showNeighboringMonth: showNeighboringMonth,
    size: size
  })));
};
//# sourceMappingURL=DateInput.js.map