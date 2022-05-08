"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangePicker = exports.CalendarPicker = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils.js");

var _locale = _interopRequireDefault(require("./locale.js"));

var _Calendar = _interopRequireDefault(require("./Calendar.js"));

var _RangeDate = _interopRequireDefault(require("./RangeDate.js"));

var _RangeTime = _interopRequireDefault(require("./RangeTime.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_LACALE = 'en-us';

try {
  STYLES = {
    "react-minimal-datetime-range-calendar--range": "react-minimal-datetime-range__react-minimal-datetime-range-calendar--range",
    "react-minimal-datetime-range": "react-minimal-datetime-range__react-minimal-datetime-range",
    "visible": "react-minimal-datetime-range__visible",
    "react-minimal-datetime-range__calendar": "react-minimal-datetime-range__react-minimal-datetime-range__calendar",
    "react-minimal-datetime-range__close": "react-minimal-datetime-range__react-minimal-datetime-range__close",
    "react-minimal-datetime-range__clear": "react-minimal-datetime-range__react-minimal-datetime-range__clear",
    "disabled": "react-minimal-datetime-range__disabled",
    "react-minimal-datetime-date-piker__divider": "react-minimal-datetime-range__react-minimal-datetime-date-piker__divider",
    "react-minimal-datetime-range-dropdown": "react-minimal-datetime-range__react-minimal-datetime-range-dropdown",
    "react-minimal-datetime-range-dropdown-calendar__menu": "react-minimal-datetime-range__react-minimal-datetime-range-dropdown-calendar__menu",
    "react-minimal-datetime-range-dropdown-calendar__menu-no-effect": "react-minimal-datetime-range__react-minimal-datetime-range-dropdown-calendar__menu-no-effect",
    "react-minimal-datetime-range-dropdown-calendar__container": "react-minimal-datetime-range__react-minimal-datetime-range-dropdown-calendar__container",
    "react-minimal-datetime-range-dropdown-calendar__item": "react-minimal-datetime-range__react-minimal-datetime-range-dropdown-calendar__item",
    "react-minimal-datetime-range-dropdown-calendar__month": "react-minimal-datetime-range__react-minimal-datetime-range-dropdown-calendar__month",
    "react-minimal-datetime-range-dropdown-calendar__month-item": "react-minimal-datetime-range__react-minimal-datetime-range-dropdown-calendar__month-item",
    "active": "react-minimal-datetime-range__active",
    "react-minimal-datetime-range-calendar__previous": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__previous",
    "react-minimal-datetime-range-calendar__next": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__next",
    "react-minimal-datetime-range-dropdown-calendar__year": "react-minimal-datetime-range__react-minimal-datetime-range-dropdown-calendar__year",
    "react-minimal-datetime-range-dropdown-calendar__year-item": "react-minimal-datetime-range__react-minimal-datetime-range-dropdown-calendar__year-item",
    "react-minimal-datetime-range-calendar__default-day": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__default-day",
    "react-minimal-datetime-range-calendar__today": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__today",
    "react-minimal-datetime-range-calendar__icon": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__icon",
    "react-minimal-datetime-range-calendar__clicker": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__clicker",
    "react-minimal-datetime-range__col": "react-minimal-datetime-range__react-minimal-datetime-range__col",
    "react-minimal-datetime-range-calendar__title": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__title",
    "react-minimal-datetime-range-calendar__inline-span": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__inline-span",
    "react-minimal-datetime-range-calendar__content": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__content",
    "react-minimal-datetime-range__col-0-5": "react-minimal-datetime-range__react-minimal-datetime-range__col-0-5",
    "react-minimal-datetime-range__col-9": "react-minimal-datetime-range__react-minimal-datetime-range__col-9",
    "react-minimal-datetime-range__col-3": "react-minimal-datetime-range__react-minimal-datetime-range__col-3",
    "react-minimal-datetime-range__col-6": "react-minimal-datetime-range__react-minimal-datetime-range__col-6",
    "react-minimal-datetime-range-calendar__header": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__header",
    "react-minimal-datetime-range--inline-block": "react-minimal-datetime-range__react-minimal-datetime-range--inline-block",
    "react-minimal-datetime-range-calendar__table": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__table",
    "react-minimal-datetime-range-calendar__table-row": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__table-row",
    "react-minimal-datetime-range-calendar__table-cel": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__table-cel",
    "today": "react-minimal-datetime-range__today",
    "marked": "react-minimal-datetime-range__marked",
    "range": "react-minimal-datetime-range__range",
    "highlight": "react-minimal-datetime-range__highlight",
    "no-border": "react-minimal-datetime-range__no-border",
    "react-minimal-datetime-range-calendar__date-item": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__date-item",
    "react-minimal-datetime-range-calendar__table-caption": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__table-caption",
    "react-minimal-datetime-range-calendar__mask": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__mask",
    "react-minimal-datetime-range-check": "react-minimal-datetime-range__react-minimal-datetime-range-check",
    "react-minimal-datetime-range__icon-fill": "react-minimal-datetime-range__react-minimal-datetime-range__icon-fill",
    "react-minimal-datetime-range-check__path": "react-minimal-datetime-range__react-minimal-datetime-range-check__path",
    "react-minimal-datetime-range-calendar__button": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__button",
    "forwardEnter": "react-minimal-datetime-range__forwardEnter",
    "forwardEnterActive": "react-minimal-datetime-range__forwardEnterActive",
    "forwardLeave": "react-minimal-datetime-range__forwardLeave",
    "forwardLeaveActive": "react-minimal-datetime-range__forwardLeaveActive",
    "backwardEnter": "react-minimal-datetime-range__backwardEnter",
    "backwardEnterActive": "react-minimal-datetime-range__backwardEnterActive",
    "backwardLeave": "react-minimal-datetime-range__backwardLeave",
    "backwardLeaveActive": "react-minimal-datetime-range__backwardLeaveActive",
    "react-minimal-datetime-range-calendar__title-container": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__title-container",
    "react-minimal-datetime-range-calendar__selector-panel-year-set-container": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__selector-panel-year-set-container",
    "react-minimal-datetime-range-calendar__body-container": "react-minimal-datetime-range__react-minimal-datetime-range-calendar__body-container",
    "slide": "react-minimal-datetime-range__slide",
    "slide-enter": "react-minimal-datetime-range__slide-enter",
    "slide-enter-active": "react-minimal-datetime-range__slide-enter-active",
    "slide-leave": "react-minimal-datetime-range__slide-leave",
    "slide-leave-active": "react-minimal-datetime-range__slide-leave-active",
    "forward-enter": "react-minimal-datetime-range__forward-enter",
    "forward-enter-active": "react-minimal-datetime-range__forward-enter-active",
    "forward-leave": "react-minimal-datetime-range__forward-leave",
    "forward-leave-active": "react-minimal-datetime-range__forward-leave-active",
    "backward-enter": "react-minimal-datetime-range__backward-enter",
    "backward-enter-active": "react-minimal-datetime-range__backward-enter-active",
    "backward-leave": "react-minimal-datetime-range__backward-leave",
    "backward-leave-active": "react-minimal-datetime-range__backward-leave-active",
    "react-minimal-datetime-range__range-input-wrapper": "react-minimal-datetime-range__react-minimal-datetime-range__range-input-wrapper",
    "react-minimal-datetime-range__range-input": "react-minimal-datetime-range__react-minimal-datetime-range__range-input",
    "react-minimal-datetime-range__range-input-separator": "react-minimal-datetime-range__react-minimal-datetime-range__range-input-separator",
    "react-minimal-datetime-range__range": "react-minimal-datetime-range__react-minimal-datetime-range__range",
    "react-minimal-datetime-range__button-wrapper": "react-minimal-datetime-range__react-minimal-datetime-range__button-wrapper",
    "react-minimal-datetime-range__button": "react-minimal-datetime-range__react-minimal-datetime-range__button",
    "react-minimal-datetime-range__button--type": "react-minimal-datetime-range__react-minimal-datetime-range__button--type",
    "react-minimal-datetime-range__button--confirm": "react-minimal-datetime-range__react-minimal-datetime-range__button--confirm",
    "react-minimal-datetime-date-piker": "react-minimal-datetime-range__react-minimal-datetime-date-piker",
    "react-minimal-datetime-range__time-piker": "react-minimal-datetime-range__react-minimal-datetime-range__time-piker",
    "react-minimal-datetime-range__time-select-wrapper": "react-minimal-datetime-range__react-minimal-datetime-range__time-select-wrapper",
    "react-minimal-datetime-range__date": "react-minimal-datetime-range__react-minimal-datetime-range__date",
    "react-minimal-datetime-range__time-select-options-wrapper": "react-minimal-datetime-range__react-minimal-datetime-range__time-select-options-wrapper",
    "react-minimal-datetime-range__time-select-wrapper--single": "react-minimal-datetime-range__react-minimal-datetime-range__time-select-wrapper--single",
    "react-minimal-datetime-range__time-select-option": "react-minimal-datetime-range__react-minimal-datetime-range__time-select-option"
  };
} catch (ex) {}

var CalendarPicker = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var _ref$show = _ref.show,
      show = _ref$show === void 0 ? false : _ref$show,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? DEFAULT_LACALE : _ref$locale,
      _ref$allowPageClickTo = _ref.allowPageClickToClose,
      allowPageClickToClose = _ref$allowPageClickTo === void 0 ? true : _ref$allowPageClickTo,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
      _ref$defaultDate = _ref.defaultDate,
      defaultDate = _ref$defaultDate === void 0 ? '' : _ref$defaultDate,
      _ref$onYearPicked = _ref.onYearPicked,
      onYearPicked = _ref$onYearPicked === void 0 ? function () {} : _ref$onYearPicked,
      _ref$onMonthPicked = _ref.onMonthPicked,
      onMonthPicked = _ref$onMonthPicked === void 0 ? function () {} : _ref$onMonthPicked,
      _ref$onDatePicked = _ref.onDatePicked,
      onDatePicked = _ref$onDatePicked === void 0 ? function () {} : _ref$onDatePicked,
      _ref$onResetDate = _ref.onResetDate,
      onResetDate = _ref$onResetDate === void 0 ? function () {} : _ref$onResetDate,
      _ref$onResetDefaultDa = _ref.onResetDefaultDate,
      onResetDefaultDate = _ref$onResetDefaultDa === void 0 ? function () {} : _ref$onResetDefaultDa,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$defaultTimes = _ref.defaultTimes,
      defaultTimes = _ref$defaultTimes === void 0 ? ['', ''] : _ref$defaultTimes,
      _ref$handleChooseHour = _ref.handleChooseHourPick,
      handleChooseHourPick = _ref$handleChooseHour === void 0 ? function () {} : _ref$handleChooseHour,
      _ref$handleChooseMinu = _ref.handleChooseMinutePick,
      handleChooseMinutePick = _ref$handleChooseMinu === void 0 ? function () {} : _ref$handleChooseMinu,
      _ref$enableTimeSelect = _ref.enableTimeSelection,
      enableTimeSelection = _ref$enableTimeSelect === void 0 ? false : _ref$enableTimeSelect,
      _ref$markedDates = _ref.markedDates,
      markedDates = _ref$markedDates === void 0 ? [] : _ref$markedDates;

  var _useState = (0, _react.useState)(show),
      _useState2 = _slicedToArray(_useState, 2),
      internalShow = _useState2[0],
      setInternalShow = _useState2[1];

  var handleOnClose = (0, _react.useCallback)(function () {
    setInternalShow(false);
    onClose && onClose();
  }, []);
  var handleOnYearPicked = (0, _react.useCallback)(function (yearObj) {
    onYearPicked && onYearPicked(yearObj);
  }, []);
  var handleOnMonthPicked = (0, _react.useCallback)(function (monthObj) {
    onMonthPicked && onMonthPicked(monthObj);
  }, []);
  var handleOnDatePicked = (0, _react.useCallback)(function (dateObj) {
    onDatePicked && onDatePicked(dateObj);
  }, []);
  var handleOnResetDate = (0, _react.useCallback)(function (dateObj) {
    onResetDate && onResetDate(dateObj);
  }, []);
  var handleOnResetDefaultDate = (0, _react.useCallback)(function (dateObj) {
    onResetDefaultDate && onResetDefaultDate(dateObj);
  }, []);
  (0, _react.useEffect)(function () {
    setInternalShow(show);
  }, [show]);
  var $elWrapper = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousedown', pageClick);
      window.addEventListener('touchstart', pageClick);
      return function () {
        window.removeEventListener('mousedown', pageClick);
        window.removeEventListener('touchstart', pageClick);
      };
    }
  }, []);
  var pageClick = (0, _react.useCallback)(function (e) {
    if (!allowPageClickToClose) {
      return;
    }

    if ($elWrapper.current.contains(e.target)) {
      return;
    }

    handleOnClose();
  }, [allowPageClickToClose]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style,
    ref: $elWrapper
  }, internalShow && /*#__PURE__*/_react["default"].createElement(CalendarPickerComponent, {
    show: internalShow,
    defaultDate: defaultDate,
    locale: locale,
    onClose: handleOnClose,
    handleOnYearPicked: handleOnYearPicked,
    handleOnMonthPicked: handleOnMonthPicked,
    handleOnDatePicked: handleOnDatePicked,
    handleOnResetDate: handleOnResetDate,
    handleOnResetDefaultDate: handleOnResetDefaultDate,
    enableTimeSelection: enableTimeSelection,
    defaultTimes: defaultTimes,
    handleChooseHourPick: handleChooseHourPick,
    handleChooseMinutePick: handleChooseMinutePick,
    markedDates: markedDates
  }));
});
exports.CalendarPicker = CalendarPicker;
var CalendarPickerComponent = /*#__PURE__*/(0, _react.memo)(function (_ref2) {
  var show = _ref2.show,
      defaultDate = _ref2.defaultDate,
      locale = _ref2.locale,
      onClose = _ref2.onClose,
      handleOnYearPicked = _ref2.handleOnYearPicked,
      handleOnMonthPicked = _ref2.handleOnMonthPicked,
      handleOnDatePicked = _ref2.handleOnDatePicked,
      handleOnResetDate = _ref2.handleOnResetDate,
      handleOnResetDefaultDate = _ref2.handleOnResetDefaultDate,
      defaultTimes = _ref2.defaultTimes,
      markedDates = _ref2.markedDates,
      enableTimeSelection = _ref2.enableTimeSelection,
      handleChooseHourPick = _ref2.handleChooseHourPick,
      handleChooseMinutePick = _ref2.handleChooseMinutePick;
  var isDefaultDatesValid = (0, _utils.isValidDate)(defaultDate);

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      internalShow = _useState4[0],
      setInternalShow = _useState4[1];

  var _useState5 = (0, _react.useState)(defaultTimes),
      _useState6 = _slicedToArray(_useState5, 2),
      times = _useState6[0],
      setTimes = _useState6[1];

  var _useState7 = (0, _react.useState)(TYPES[0]),
      _useState8 = _slicedToArray(_useState7, 2),
      type = _useState8[0],
      setType = _useState8[1];

  var _useState9 = (0, _react.useState)(defaultDate ? defaultDate.split('-') : []),
      _useState10 = _slicedToArray(_useState9, 2),
      startDatePickedArray = _useState10[0],
      setStartDatePickedArray = _useState10[1];

  var _useState11 = (0, _react.useState)([defaultTimes[0].split(':')[0], defaultTimes[0].split(':')[1]]),
      _useState12 = _slicedToArray(_useState11, 2),
      startTimePickedArray = _useState12[0],
      setStartTimePickedArray = _useState12[1];

  var _useState13 = (0, _react.useState)(isDefaultDatesValid ? true : false),
      _useState14 = _slicedToArray(_useState13, 2),
      selected = _useState14[0],
      setSelected = _useState14[1];

  var handleChooseStartTimeHour = (0, _react.useCallback)(function (res) {
    setStartTimePickedArray([res, startTimePickedArray[1]]);
    handleChooseHourPick(res);
  }, [startTimePickedArray]);
  var handleChooseStartTimeMinute = (0, _react.useCallback)(function (res) {
    setStartTimePickedArray([startTimePickedArray[0], res]);
    handleChooseMinutePick(res);
  }, [startTimePickedArray]);
  var handleOnClose = (0, _react.useCallback)(function () {
    setInternalShow(false);
    onClose && onClose();
  }, []);
  (0, _react.useEffect)(function () {
    if (show) {
      setTimeout(function () {
        setInternalShow(true);
      }, 0);
    }
  }, [show]);
  var handleOnChangeType = (0, _react.useCallback)(function () {
    if (type === TYPES[0]) {
      setType(TYPES[1]);
    } else {
      setType(TYPES[0]);
    }
  }, [type]);
  var componentClass = (0, _react.useMemo)(function () {
    return (0, _utils.cx)('react-minimal-datetime-range', internalShow && 'visible');
  }, [internalShow]);
  var LOCALE_DATA = (0, _react.useMemo)(function () {
    return _locale["default"][locale] ? _locale["default"][locale] : _locale["default"]['en-us'];
  }, [locale]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: componentClass
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "react-minimal-datetime-range__close",
    viewBox: "0 0 20 20",
    width: "15",
    height: "15",
    onClick: handleOnClose
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-date-piker"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__calendar"
  }, /*#__PURE__*/_react["default"].createElement(_Calendar["default"], {
    defaultDate: defaultDate,
    locale: locale,
    onYearPicked: handleOnYearPicked,
    onMonthPicked: handleOnMonthPicked,
    onDatePicked: handleOnDatePicked,
    onResetDate: handleOnResetDate,
    onResetDefaultDate: handleOnResetDefaultDate,
    markedDates: markedDates
  })), type === TYPES[1] && /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__time-piker",
    style: {
      marginTop: '10px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_RangeTime["default"], {
    defaultTimeStart: times[0],
    startDatePickedArray: startDatePickedArray,
    handleChooseStartTimeHour: handleChooseStartTimeHour,
    handleChooseStartTimeMinute: handleChooseStartTimeMinute,
    startTimePickedArray: startTimePickedArray,
    showOnlyTime: true,
    LOCALE_DATA: LOCALE_DATA,
    singleMode: true
  }))), enableTimeSelection && /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _utils.cx)('react-minimal-datetime-range__button', 'react-minimal-datetime-range__button--type', !selected && 'disabled'),
    onClick: selected ? handleOnChangeType : function () {},
    style: {
      padding: '0',
      marginTop: '10px'
    }
  }, type === TYPES[0] ? LOCALE_DATA[TYPES[1]] : LOCALE_DATA[TYPES[0]]));
});
var TYPES = ['date', 'time'];
var RangePicker = /*#__PURE__*/(0, _react.memo)(function (_ref3) {
  var _ref3$show = _ref3.show,
      show = _ref3$show === void 0 ? false : _ref3$show,
      _ref3$disabled = _ref3.disabled,
      disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
      _ref3$allowPageClickT = _ref3.allowPageClickToClose,
      allowPageClickToClose = _ref3$allowPageClickT === void 0 ? true : _ref3$allowPageClickT,
      _ref3$locale = _ref3.locale,
      locale = _ref3$locale === void 0 ? DEFAULT_LACALE : _ref3$locale,
      _ref3$placeholder = _ref3.placeholder,
      placeholder = _ref3$placeholder === void 0 ? ['', ''] : _ref3$placeholder,
      _ref3$defaultDates = _ref3.defaultDates,
      defaultDates = _ref3$defaultDates === void 0 ? ['', ''] : _ref3$defaultDates,
      _ref3$defaultTimes = _ref3.defaultTimes,
      defaultTimes = _ref3$defaultTimes === void 0 ? ['', ''] : _ref3$defaultTimes,
      _ref3$initialDates = _ref3.initialDates,
      initialDates = _ref3$initialDates === void 0 ? ['', ''] : _ref3$initialDates,
      _ref3$initialTimes = _ref3.initialTimes,
      initialTimes = _ref3$initialTimes === void 0 ? ['', ''] : _ref3$initialTimes,
      _ref3$onConfirm = _ref3.onConfirm,
      onConfirm = _ref3$onConfirm === void 0 ? function () {} : _ref3$onConfirm,
      _ref3$onClear = _ref3.onClear,
      onClear = _ref3$onClear === void 0 ? function () {} : _ref3$onClear,
      _ref3$onClose = _ref3.onClose,
      onClose = _ref3$onClose === void 0 ? function () {} : _ref3$onClose,
      _ref3$style = _ref3.style,
      style = _ref3$style === void 0 ? {} : _ref3$style,
      _ref3$showOnlyTime = _ref3.showOnlyTime,
      showOnlyTime = _ref3$showOnlyTime === void 0 ? false : _ref3$showOnlyTime,
      _ref3$markedDates = _ref3.markedDates,
      markedDates = _ref3$markedDates === void 0 ? [] : _ref3$markedDates;
  // ['YYYY-MM-DD', 'YYYY-MM-DD'] // ['hh:mm', 'hh:mm']
  var isDefaultDatesValid = (0, _utils.isValidDates)(defaultDates);
  var isInitialDatesValid = (0, _utils.isValidDates)(initialDates);

  var _useState15 = (0, _react.useState)(isDefaultDatesValid ? true : false),
      _useState16 = _slicedToArray(_useState15, 2),
      selected = _useState16[0],
      setSelected = _useState16[1];

  var _useState17 = (0, _react.useState)(defaultDates[0] ? "".concat(defaultDates[0], " ").concat(defaultTimes[0] ? defaultTimes[0] : '') : ''),
      _useState18 = _slicedToArray(_useState17, 2),
      start = _useState18[0],
      setStart = _useState18[1];

  var _useState19 = (0, _react.useState)(defaultDates[1] ? "".concat(defaultDates[1], " ").concat(defaultTimes[1] ? defaultTimes[1] : '') : ''),
      _useState20 = _slicedToArray(_useState19, 2),
      end = _useState20[0],
      setEnd = _useState20[1];

  var _useState21 = (0, _react.useState)(TYPES[0]),
      _useState22 = _slicedToArray(_useState21, 2),
      type = _useState22[0],
      setType = _useState22[1];

  var _useState23 = (0, _react.useState)(show),
      _useState24 = _slicedToArray(_useState23, 2),
      internalShow = _useState24[0],
      setInternalShow = _useState24[1];

  var _useState25 = (0, _react.useState)(defaultDates[0] ? defaultDates[0].split('-') : []),
      _useState26 = _slicedToArray(_useState25, 2),
      startDatePickedArray = _useState26[0],
      setStartDatePickedArray = _useState26[1];

  var _useState27 = (0, _react.useState)(defaultDates[1] ? defaultDates[1].split('-') : []),
      _useState28 = _slicedToArray(_useState27, 2),
      endDatePickedArray = _useState28[0],
      setEndDatePickedArray = _useState28[1];

  var _useState29 = (0, _react.useState)({}),
      _useState30 = _slicedToArray(_useState29, 2),
      currentDateObjStart = _useState30[0],
      setCurrentDateObjStart = _useState30[1];

  var _useState31 = (0, _react.useState)({}),
      _useState32 = _slicedToArray(_useState31, 2),
      currentDateObjEnd = _useState32[0],
      setCurrentDateObjEnd = _useState32[1];

  var _useState33 = (0, _react.useState)([defaultTimes[0].split(':')[0], defaultTimes[0].split(':')[1]]),
      _useState34 = _slicedToArray(_useState33, 2),
      startTimePickedArray = _useState34[0],
      setStartTimePickedArray = _useState34[1];

  var _useState35 = (0, _react.useState)([defaultTimes[1].split(':')[0], defaultTimes[1].split(':')[1]]),
      _useState36 = _slicedToArray(_useState35, 2),
      endTimePickedArray = _useState36[0],
      setEndTimePickedArray = _useState36[1];

  var _useState37 = (0, _react.useState)(defaultDates),
      _useState38 = _slicedToArray(_useState37, 2),
      dates = _useState38[0],
      setDates = _useState38[1];

  var _useState39 = (0, _react.useState)(defaultTimes),
      _useState40 = _slicedToArray(_useState39, 2),
      times = _useState40[0],
      setTimes = _useState40[1];

  var handleChooseStartDate = (0, _react.useCallback)(function (_ref4) {
    var name = _ref4.name,
        month = _ref4.month,
        year = _ref4.year,
        value = _ref4.value;
    setDates([value, dates[1]]);
    setStartDatePickedArray(value === '' ? [] : [year, month, name]);
  }, [dates]);
  var handleChooseEndDate = (0, _react.useCallback)(function (_ref5) {
    var name = _ref5.name,
        month = _ref5.month,
        year = _ref5.year,
        value = _ref5.value;
    setDates([dates[0], value]);
    setEndDatePickedArray(value === '' ? [] : [year, month, name]);
  }, [dates]);
  var handleChooseStartTimeHour = (0, _react.useCallback)(function (res) {
    setStartTimePickedArray([res, startTimePickedArray[1]]);
  }, [startTimePickedArray]);
  var handleChooseStartTimeMinute = (0, _react.useCallback)(function (res) {
    setStartTimePickedArray([startTimePickedArray[0], res]);
  }, [startTimePickedArray]);
  var handleChooseEndTimeHour = (0, _react.useCallback)(function (res) {
    setEndTimePickedArray([res, endTimePickedArray[1]]);
  }, [endTimePickedArray]);
  var handleChooseEndTimeMinute = (0, _react.useCallback)(function (res) {
    setEndTimePickedArray([endTimePickedArray[0], res]);
  }, [endTimePickedArray]);
  var handleOnChangeType = (0, _react.useCallback)(function () {
    if (type === TYPES[0]) {
      setType(TYPES[1]);
    } else {
      setType(TYPES[0]);
    }
  }, [type]);
  var handleOnConfirm = (0, _react.useCallback)(function (e, sd, ed, st, et) {
    if (!sd) {
      sd = startDatePickedArray;
    }

    if (!ed) {
      ed = endDatePickedArray;
    }

    if (!st) {
      st = startTimePickedArray;
    }

    if (!et) {
      et = endTimePickedArray;
    }

    var a = new Date(sd.join('-'));
    var b = new Date(ed.join('-'));
    var starts = a < b ? sd : ed;
    var ends = a > b ? sd : ed;
    var startStr = "".concat(starts.join('-'), " ").concat(st.join(':'));
    var endStr = "".concat(ends.join('-'), " ").concat(et.join(':'));
    setStart(startStr);
    setEnd(endStr);
    setStartDatePickedArray(starts);
    setEndDatePickedArray(ends);
    setStartTimePickedArray(st);
    setEndTimePickedArray(et);
    setDates([starts.join('-'), ends.join('-')]);
    setInternalShow(false);
    onConfirm && onConfirm([startStr, endStr]);
  }, [startDatePickedArray, endDatePickedArray, startTimePickedArray, endTimePickedArray]);
  var handleOnClear = (0, _react.useCallback)(function (e) {
    if (disabled) {
      return;
    }

    e.stopPropagation();

    if (isInitialDatesValid) {
      handleOnConfirm({}, initialDates[0].split('-'), initialDates[1].split('-'), initialTimes[0].split(':'), initialTimes[1].split(':'));
      return;
    }

    setSelected(false);
    setInternalShow(false);
    setStart('');
    setEnd('');
    setStartDatePickedArray([]);
    setEndDatePickedArray([]);
    setDates(['', '']);
    setTimes(['', '']);
    setStartTimePickedArray(['00', '00']);
    setEndTimePickedArray(['00', '00']);
    onClear && onClear();
  }, [disabled, initialDates, initialTimes]);
  (0, _react.useEffect)(function () {
    setType(TYPES[0]);
  }, [internalShow]);
  (0, _react.useEffect)(function () {
    if (!internalShow) {
      onClose && onClose();
    }
  }, [internalShow]);
  (0, _react.useEffect)(function () {
    setStart(defaultDates[0] ? "".concat(defaultDates[0], " ").concat(defaultTimes[0] ? defaultTimes[0] : '') : '');
    setEnd(defaultDates[1] ? "".concat(defaultDates[1], " ").concat(defaultTimes[1] ? defaultTimes[1] : '') : '');
  }, [defaultDates]);
  var $elWrapper = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousedown', pageClick);
      window.addEventListener('touchstart', pageClick);
      return function () {
        window.removeEventListener('mousedown', pageClick);
        window.removeEventListener('touchstart', pageClick);
      };
    }
  }, []);
  var pageClick = (0, _react.useCallback)(function (e) {
    if (!allowPageClickToClose) {
      return;
    }

    if ($elWrapper.current.contains(e.target)) {
      return;
    }

    setInternalShow(false);
  }, [allowPageClickToClose]);
  var isInitial = (0, _react.useMemo)(function () {
    return start === "".concat(initialDates[0], " ").concat(initialTimes[0]) && end === "".concat(initialDates[1], " ").concat(initialTimes[1]);
  }, [initialDates, initialTimes, start, end]);
  var isEmpty = (0, _react.useMemo)(function () {
    return !start && !end;
  }, [start, end]);
  var valueStart = (0, _react.useMemo)(function () {
    return showOnlyTime ? start.split(' ')[1] : start;
  }, [showOnlyTime, start]);
  var valueEnd = (0, _react.useMemo)(function () {
    return showOnlyTime ? end.split(' ')[1] : end;
  }, [showOnlyTime, end]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__range",
    style: style
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "react-minimal-datetime-range__range-input-wrapper ".concat(disabled && 'disabled'),
    onClick: function onClick() {
      return !disabled && setInternalShow(!internalShow);
    }
  }, /*#__PURE__*/_react["default"].createElement("input", {
    readOnly: true,
    placeholder: placeholder[0],
    className: "react-minimal-datetime-range__range-input ".concat(disabled && 'disabled'),
    value: valueStart
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "react-minimal-datetime-range__range-input-separator"
  }, " ~ "), /*#__PURE__*/_react["default"].createElement("input", {
    readOnly: true,
    placeholder: placeholder[1],
    className: "react-minimal-datetime-range__range-input ".concat(disabled && 'disabled'),
    value: valueEnd
  }), !isInitial && !isEmpty ? /*#__PURE__*/_react["default"].createElement("svg", {
    className: "react-minimal-datetime-range__clear ".concat(disabled && 'disabled'),
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    onClick: handleOnClear
  }, /*#__PURE__*/_react["default"].createElement("path", {
    className: "react-minimal-datetime-range__icon-fill",
    d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  })) : /*#__PURE__*/_react["default"].createElement("svg", {
    className: "react-minimal-datetime-range__clear",
    width: "15",
    height: "15",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    className: "react-minimal-datetime-range__icon-fill",
    d: "M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    ref: $elWrapper
  }, internalShow && /*#__PURE__*/_react["default"].createElement(RangePickerComponent, {
    show: internalShow,
    selected: selected,
    setSelected: setSelected,
    handleChooseStartDate: handleChooseStartDate,
    handleChooseEndDate: handleChooseEndDate,
    dates: dates,
    times: times,
    locale: locale,
    startDatePickedArray: startDatePickedArray,
    endDatePickedArray: endDatePickedArray,
    type: type,
    handleOnChangeType: handleOnChangeType,
    handleOnConfirm: handleOnConfirm,
    startTimePickedArray: startTimePickedArray,
    endTimePickedArray: endTimePickedArray,
    handleChooseStartTimeHour: handleChooseStartTimeHour,
    handleChooseStartTimeMinute: handleChooseStartTimeMinute,
    handleChooseEndTimeHour: handleChooseEndTimeHour,
    handleChooseEndTimeMinute: handleChooseEndTimeMinute,
    currentDateObjStart: currentDateObjStart,
    setCurrentDateObjStart: setCurrentDateObjStart,
    currentDateObjEnd: currentDateObjEnd,
    setCurrentDateObjEnd: setCurrentDateObjEnd,
    showOnlyTime: showOnlyTime,
    markedDates: markedDates
  })));
});
exports.RangePicker = RangePicker;
var RangePickerComponent = /*#__PURE__*/(0, _react.memo)(function (_ref6) {
  var show = _ref6.show,
      selected = _ref6.selected,
      setSelected = _ref6.setSelected,
      handleChooseStartDate = _ref6.handleChooseStartDate,
      handleChooseEndDate = _ref6.handleChooseEndDate,
      dates = _ref6.dates,
      times = _ref6.times,
      locale = _ref6.locale,
      startDatePickedArray = _ref6.startDatePickedArray,
      endDatePickedArray = _ref6.endDatePickedArray,
      type = _ref6.type,
      handleOnChangeType = _ref6.handleOnChangeType,
      handleOnConfirm = _ref6.handleOnConfirm,
      handleChooseStartTimeHour = _ref6.handleChooseStartTimeHour,
      handleChooseStartTimeMinute = _ref6.handleChooseStartTimeMinute,
      handleChooseEndTimeHour = _ref6.handleChooseEndTimeHour,
      handleChooseEndTimeMinute = _ref6.handleChooseEndTimeMinute,
      startTimePickedArray = _ref6.startTimePickedArray,
      endTimePickedArray = _ref6.endTimePickedArray,
      currentDateObjList = _ref6.currentDateObjList,
      currentDateObjStart = _ref6.currentDateObjStart,
      setCurrentDateObjStart = _ref6.setCurrentDateObjStart,
      currentDateObjEnd = _ref6.currentDateObjEnd,
      setCurrentDateObjEnd = _ref6.setCurrentDateObjEnd,
      showOnlyTime = _ref6.showOnlyTime,
      markedDates = _ref6.markedDates;

  var _useState41 = (0, _react.useState)(false),
      _useState42 = _slicedToArray(_useState41, 2),
      internalShow = _useState42[0],
      setInternalShow = _useState42[1];

  (0, _react.useEffect)(function () {
    if (show) {
      setTimeout(function () {
        setInternalShow(true);
      }, 0);
    }
  }, [show]);
  var componentClass = (0, _react.useMemo)(function () {
    return (0, _utils.cx)('react-minimal-datetime-range', internalShow && 'visible');
  }, [internalShow]);
  var LOCALE_DATA = (0, _react.useMemo)(function () {
    return _locale["default"][locale] ? _locale["default"][locale] : _locale["default"]['en-us'];
  }, [locale]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: componentClass
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-date-piker"
  }, /*#__PURE__*/_react["default"].createElement(_RangeDate["default"], {
    selected: selected,
    setSelected: setSelected,
    handleChooseStartDate: handleChooseStartDate,
    handleChooseEndDate: handleChooseEndDate,
    rangeDirection: "start",
    defaultDateStart: dates[0],
    defaultDateEnd: dates[1],
    locale: locale,
    startDatePickedArray: startDatePickedArray,
    endDatePickedArray: endDatePickedArray,
    currentDateObjStart: currentDateObjStart,
    setCurrentDateObjStart: setCurrentDateObjStart,
    currentDateObjEnd: currentDateObjEnd,
    setCurrentDateObjEnd: setCurrentDateObjEnd,
    markedDates: markedDates
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-date-piker__divider"
  }), /*#__PURE__*/_react["default"].createElement(_RangeDate["default"], {
    selected: selected,
    setSelected: setSelected,
    handleChooseStartDate: handleChooseStartDate,
    handleChooseEndDate: handleChooseEndDate,
    rangeDirection: "end",
    defaultDateStart: dates[0],
    defaultDateEnd: dates[1],
    locale: locale,
    startDatePickedArray: startDatePickedArray,
    endDatePickedArray: endDatePickedArray,
    currentDateObjStart: currentDateObjStart,
    setCurrentDateObjStart: setCurrentDateObjStart,
    currentDateObjEnd: currentDateObjEnd,
    setCurrentDateObjEnd: setCurrentDateObjEnd,
    markedDates: markedDates
  }), (showOnlyTime || type === TYPES[1]) && /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__time-piker"
  }, /*#__PURE__*/_react["default"].createElement(_RangeTime["default"], {
    defaultTimeStart: times[0],
    defaultTimeEnd: times[1],
    startDatePickedArray: startDatePickedArray,
    endDatePickedArray: endDatePickedArray,
    handleChooseStartTimeHour: handleChooseStartTimeHour,
    handleChooseStartTimeMinute: handleChooseStartTimeMinute,
    handleChooseEndTimeHour: handleChooseEndTimeHour,
    handleChooseEndTimeMinute: handleChooseEndTimeMinute,
    startTimePickedArray: startTimePickedArray,
    endTimePickedArray: endTimePickedArray,
    showOnlyTime: showOnlyTime,
    LOCALE_DATA: LOCALE_DATA
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-minimal-datetime-range__button-wrapper"
  }, !showOnlyTime && /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _utils.cx)('react-minimal-datetime-range__button', 'react-minimal-datetime-range__button--type', !selected && 'disabled'),
    onClick: selected ? handleOnChangeType : function () {}
  }, type === TYPES[0] ? LOCALE_DATA[TYPES[1]] : LOCALE_DATA[TYPES[0]]), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _utils.cx)('react-minimal-datetime-range__button', 'react-minimal-datetime-range__button--confirm', !selected && 'disabled'),
    onClick: selected ? handleOnConfirm : function () {}
  }, LOCALE_DATA['confirm'])));
});