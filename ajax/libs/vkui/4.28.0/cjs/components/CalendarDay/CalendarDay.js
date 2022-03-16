"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarDay = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _useKeyboardInputTracker = require("../../hooks/useKeyboardInputTracker");

var _LocaleProviderContext = require("../LocaleProviderContext/LocaleProviderContext");

var CalendarDay = /*#__PURE__*/React.memo(function (_ref) {
  var day = _ref.day,
      today = _ref.today,
      selected = _ref.selected,
      onChange = _ref.onChange,
      hidden = _ref.hidden,
      disabled = _ref.disabled,
      active = _ref.active,
      selectionStart = _ref.selectionStart,
      selectionEnd = _ref.selectionEnd,
      focused = _ref.focused,
      onEnter = _ref.onEnter,
      onLeave = _ref.onLeave,
      hinted = _ref.hinted,
      hintedSelectionStart = _ref.hintedSelectionStart,
      hintedSelectionEnd = _ref.hintedSelectionEnd,
      sameMonth = _ref.sameMonth,
      size = _ref.size;
  var locale = React.useContext(_LocaleProviderContext.LocaleProviderContext);
  var ref = React.useRef(null);
  var onClick = React.useCallback(function () {
    return onChange(day);
  }, [day, onChange]);
  var handleEnter = React.useCallback(function () {
    return onEnter === null || onEnter === void 0 ? void 0 : onEnter(day);
  }, [day, onEnter]);
  var handleLeave = React.useCallback(function () {
    return onLeave === null || onLeave === void 0 ? void 0 : onLeave(day);
  }, [day, onLeave]);
  React.useEffect(function () {
    if (focused && ref.current) {
      ref.current.dispatchEvent(new Event(_useKeyboardInputTracker.ENABLE_KEYBOARD_INPUT_EVENT_NAME, {
        bubbles: true
      }));
      ref.current.focus();
    }
  }, [focused]);

  if (hidden) {
    return (0, _jsxRuntime.createScopedElement)("div", {
      vkuiClass: "CalendarDay__hidden"
    });
  }

  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
    vkuiClass: (0, _classNames.classNames)("CalendarDay", "CalendarDay--size-".concat(size), {
      "CalendarDay--today": today,
      "CalendarDay--selected": selected && !disabled,
      "CalendarDay--active": active && !disabled,
      "CalendarDay--selection-start": selectionStart,
      "CalendarDay--selection-end": selectionEnd,
      "CalendarDay--disabled": disabled,
      "CalendarDay--not-same-month": !sameMonth
    }),
    hoverMode: active ? "CalendarDay--active-hover" : "CalendarDay--hover",
    hasActive: false,
    onClick: onClick,
    disabled: disabled,
    "aria-label": new Intl.DateTimeFormat(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(day),
    tabIndex: -1,
    getRootRef: ref,
    focusVisibleMode: active ? "outside" : "inside",
    onEnter: handleEnter,
    onLeave: handleLeave
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)("CalendarDay__hinted", {
      "CalendarDay__hinted--active": hinted,
      "CalendarDay__hinted--selection-start": hintedSelectionStart,
      "CalendarDay__hinted--selection-end": hintedSelectionEnd
    })
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)("CalendarDay__inner", {
      "CalendarDay__inner--active": active && !disabled
    })
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CalendarDay__day-number"
  }, day.getDate()))));
});
exports.CalendarDay = CalendarDay;
CalendarDay.displayName = "CalendarDay";
//# sourceMappingURL=CalendarDay.js.map