'use strict';

var Button = require('primevue/button');
var CalendarIcon = require('primevue/icons/calendar');
var ChevronDownIcon = require('primevue/icons/chevrondown');
var ChevronLeftIcon = require('primevue/icons/chevronleft');
var ChevronRightIcon = require('primevue/icons/chevronright');
var ChevronUpIcon = require('primevue/icons/chevronup');
var OverlayEventBus = require('primevue/overlayeventbus');
var Portal = require('primevue/portal');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var CalendarIcon__default = /*#__PURE__*/_interopDefaultLegacy(CalendarIcon);
var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
var ChevronLeftIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronLeftIcon);
var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
var ChevronUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronUpIcon);
var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var _classes;
function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var styles = "\n.p-calendar {\n    display: inline-flex;\n    max-width: 100%;\n}\n\n.p-calendar .p-inputtext {\n    flex: 1 1 auto;\n    width: 1%;\n}\n\n.p-calendar-w-btn .p-inputtext {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n\n.p-calendar-w-btn .p-datepicker-trigger {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n\n/* Fluid */\n.p-fluid .p-calendar {\n    display: flex;\n}\n\n.p-fluid .p-calendar .p-inputtext {\n    width: 1%;\n}\n\n/* Datepicker */\n.p-calendar .p-datepicker {\n    min-width: 100%;\n}\n\n.p-datepicker {\n    width: auto;\n}\n\n.p-datepicker-inline {\n    display: inline-block;\n    overflow-x: auto;\n}\n\n/* Header */\n.p-datepicker-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n.p-datepicker-header .p-datepicker-title {\n    margin: 0 auto;\n}\n\n.p-datepicker-prev,\n.p-datepicker-next {\n    cursor: pointer;\n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Multiple Month DatePicker */\n.p-datepicker-multiple-month .p-datepicker-group-container {\n    display: flex;\n}\n\n.p-datepicker-multiple-month .p-datepicker-group-container .p-datepicker-group {\n    flex: 1 1 auto;\n}\n\n/* DatePicker Table */\n.p-datepicker table {\n    width: 100%;\n    border-collapse: collapse;\n}\n\n.p-datepicker td > span {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    margin: 0 auto;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Month Picker */\n.p-monthpicker-month {\n    width: 33.3%;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Year Picker */\n.p-yearpicker-year {\n    width: 50%;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    overflow: hidden;\n    position: relative;\n}\n\n/*  Button Bar */\n.p-datepicker-buttonbar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n/* Time Picker */\n.p-timepicker {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.p-timepicker button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-timepicker > div {\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n}\n\n/* Touch UI */\n.p-datepicker-touch-ui,\n.p-calendar .p-datepicker-touch-ui {\n    min-width: 80vw;\n}\n";
var inlineStyles = {
  root: function root(_ref) {
    var props = _ref.props;
    return {
      position: props.appendTo === 'self' ? 'relative' : undefined
    };
  }
};
var classes = (_classes = {
  root: function root(_ref2) {
    var props = _ref2.props,
      state = _ref2.state;
    return ['p-calendar p-component p-inputwrapper', {
      'p-calendar-w-btn': props.showIcon,
      'p-calendar-timeonly': props.timeOnly,
      'p-calendar-disabled': props.disabled,
      'p-inputwrapper-filled': props.modelValue,
      'p-inputwrapper-focus': state.focused
    }];
  },
  input: 'p-inputtext p-component',
  dropdownButton: 'p-datepicker-trigger',
  panel: function panel(_ref3) {
    var instance = _ref3.instance,
      props = _ref3.props,
      state = _ref3.state;
    return ['p-datepicker p-component', {
      'p-datepicker-inline': props.inline,
      'p-disabled': props.disabled,
      'p-datepicker-timeonly': props.timeOnly,
      'p-datepicker-multiple-month': props.numberOfMonths > 1,
      'p-datepicker-monthpicker': state.currentView === 'month',
      'p-datepicker-yearpicker': state.currentView === 'year',
      'p-datepicker-touch-ui': props.touchUI,
      'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  groupContainer: 'p-datepicker-group-container',
  group: 'p-datepicker-group',
  header: 'p-datepicker-header',
  previousButton: 'p-datepicker-prev p-link',
  previousIcon: 'p-datepicker-prev-icon',
  title: 'p-datepicker-title',
  monthTitle: 'p-datepicker-month p-link',
  yearTitle: 'p-datepicker-year p-link',
  decadeTitle: 'p-datepicker-decade',
  nextButton: 'p-datepicker-next p-link',
  nextIcon: 'p-datepicker-next-icon',
  container: 'p-datepicker-calendar-container',
  table: 'p-datepicker-calendar',
  weekHeader: 'p-datepicker-weekheader p-disabled',
  weekNumber: 'p-datepicker-weeknumber',
  weekLabelContainer: 'p-disabled',
  day: function day(_ref4) {
    var date = _ref4.date;
    return [{
      'p-datepicker-other-month': date.otherMonth,
      'p-datepicker-today': date.today
    }];
  },
  dayLabel: function dayLabel(_ref5) {
    var instance = _ref5.instance,
      date = _ref5.date;
    return [{
      'p-highlight': instance.isSelected(date),
      'p-disabled': !date.selectable
    }];
  },
  monthPicker: 'p-monthpicker',
  month: function month(_ref6) {
    var instance = _ref6.instance,
      _month = _ref6.month,
      index = _ref6.index;
    return ['p-monthpicker-month', {
      'p-highlight': instance.isMonthSelected(index),
      'p-disabled': !_month.selectable
    }];
  },
  yearPicker: 'p-yearpicker',
  year: function year(_ref7) {
    var instance = _ref7.instance,
      _year = _ref7.year;
    return ['p-yearpicker-year', {
      'p-highlight': instance.isYearSelected(_year.value),
      'p-disabled': !_year.selectable
    }];
  },
  timePicker: 'p-timepicker',
  hourPicker: 'p-hour-picker',
  incrementButton: 'p-link',
  decrementButton: 'p-link',
  separatorContainer: 'p-separator',
  minutePicker: 'p-minute-picker'
}, _defineProperty$1(_classes, "incrementButton", 'p-link'), _defineProperty$1(_classes, "decrementButton", 'p-link'), _defineProperty$1(_classes, "secondPicker", 'p-second-picker'), _defineProperty$1(_classes, "ampmPicker", 'p-ampm-picker'), _defineProperty$1(_classes, "buttonbar", 'p-datepicker-buttonbar'), _defineProperty$1(_classes, "todayButton", 'p-button-text'), _defineProperty$1(_classes, "clearButton", 'p-button-text'), _classes);
var _useStyle = usestyle.useStyle(styles, {
    name: 'calendar',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseCalendar',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: null,
    selectionMode: {
      type: String,
      "default": 'single'
    },
    dateFormat: {
      type: String,
      "default": null
    },
    inline: {
      type: Boolean,
      "default": false
    },
    showOtherMonths: {
      type: Boolean,
      "default": true
    },
    selectOtherMonths: {
      type: Boolean,
      "default": false
    },
    showIcon: {
      type: Boolean,
      "default": false
    },
    icon: {
      type: String,
      "default": undefined
    },
    previousIcon: {
      type: String,
      "default": undefined
    },
    nextIcon: {
      type: String,
      "default": undefined
    },
    incrementIcon: {
      type: String,
      "default": undefined
    },
    decrementIcon: {
      type: String,
      "default": undefined
    },
    numberOfMonths: {
      type: Number,
      "default": 1
    },
    responsiveOptions: Array,
    view: {
      type: String,
      "default": 'date'
    },
    touchUI: {
      type: Boolean,
      "default": false
    },
    monthNavigator: {
      type: Boolean,
      "default": false
    },
    yearNavigator: {
      type: Boolean,
      "default": false
    },
    yearRange: {
      type: String,
      "default": null
    },
    minDate: {
      type: Date,
      value: null
    },
    maxDate: {
      type: Date,
      value: null
    },
    disabledDates: {
      type: Array,
      value: null
    },
    disabledDays: {
      type: Array,
      value: null
    },
    maxDateCount: {
      type: Number,
      value: null
    },
    showOnFocus: {
      type: Boolean,
      "default": true
    },
    autoZIndex: {
      type: Boolean,
      "default": true
    },
    baseZIndex: {
      type: Number,
      "default": 0
    },
    showButtonBar: {
      type: Boolean,
      "default": false
    },
    shortYearCutoff: {
      type: String,
      "default": '+10'
    },
    showTime: {
      type: Boolean,
      "default": false
    },
    timeOnly: {
      type: Boolean,
      "default": false
    },
    hourFormat: {
      type: String,
      "default": '24'
    },
    stepHour: {
      type: Number,
      "default": 1
    },
    stepMinute: {
      type: Number,
      "default": 1
    },
    stepSecond: {
      type: Number,
      "default": 1
    },
    showSeconds: {
      type: Boolean,
      "default": false
    },
    hideOnDateTimeSelect: {
      type: Boolean,
      "default": false
    },
    hideOnRangeSelection: {
      type: Boolean,
      "default": false
    },
    timeSeparator: {
      type: String,
      "default": ':'
    },
    showWeek: {
      type: Boolean,
      "default": false
    },
    manualInput: {
      type: Boolean,
      "default": true
    },
    appendTo: {
      type: String,
      "default": 'body'
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    placeholder: {
      type: String,
      "default": null
    },
    id: {
      type: String,
      "default": null
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    inputProps: {
      type: null,
      "default": null
    },
    panelClass: {
      type: [String, Object],
      "default": null
    },
    panelStyle: {
      type: Object,
      "default": null
    },
    panelProps: {
      type: null,
      "default": null
    },
    'aria-labelledby': {
      type: String,
      "default": null
    },
    'aria-label': {
      type: String,
      "default": null
    }
  },
  css: {
    inlineStyles: inlineStyles,
    classes: classes,
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'Calendar',
  "extends": script$1,
  emits: ['show', 'hide', 'input', 'month-change', 'year-change', 'date-select', 'update:modelValue', 'today-click', 'clear-click', 'focus', 'blur', 'keydown'],
  navigationState: null,
  timePickerChange: false,
  scrollHandler: null,
  outsideClickListener: null,
  maskClickListener: null,
  resizeListener: null,
  overlay: null,
  input: null,
  mask: null,
  previousButton: null,
  nextButton: null,
  timePickerTimer: null,
  preventFocus: false,
  typeUpdate: false,
  data: function data() {
    return {
      currentMonth: null,
      currentYear: null,
      currentHour: null,
      currentMinute: null,
      currentSecond: null,
      pm: null,
      focused: false,
      overlayVisible: false,
      currentView: this.view
    };
  },
  watch: {
    modelValue: function modelValue(newValue) {
      this.updateCurrentMetaData();
      if (!this.typeUpdate && !this.inline && this.input) {
        this.input.value = this.formatValue(newValue);
      }
      this.typeUpdate = false;
    },
    showTime: function showTime() {
      this.updateCurrentMetaData();
    },
    months: function months() {
      if (this.overlay) {
        if (!this.focused) {
          if (this.inline) {
            this.preventFocus = true;
          }
          setTimeout(this.updateFocus, 0);
        }
      }
    },
    numberOfMonths: function numberOfMonths() {
      this.destroyResponsiveStyleElement();
      this.createResponsiveStyle();
    },
    responsiveOptions: function responsiveOptions() {
      this.destroyResponsiveStyleElement();
      this.createResponsiveStyle();
    },
    currentView: function currentView() {
      var _this = this;
      Promise.resolve(null).then(function () {
        return _this.alignOverlay();
      });
    }
  },
  created: function created() {
    this.updateCurrentMetaData();
  },
  mounted: function mounted() {
    this.createResponsiveStyle();
    if (this.inline) {
      this.overlay && this.overlay.setAttribute(this.attributeSelector, '');
      if (!this.disabled) {
        this.preventFocus = true;
        this.initFocusableCell();
        if (this.numberOfMonths === 1) {
          this.overlay.style.width = utils.DomHandler.getOuterWidth(this.$el) + 'px';
        }
      }
    } else {
      this.input.value = this.formatValue(this.modelValue);
    }
  },
  updated: function updated() {
    if (this.overlay) {
      this.preventFocus = true;
      setTimeout(this.updateFocus, 0);
    }
    if (this.input && this.selectionStart != null && this.selectionEnd != null) {
      this.input.selectionStart = this.selectionStart;
      this.input.selectionEnd = this.selectionEnd;
      this.selectionStart = null;
      this.selectionEnd = null;
    }
  },
  beforeUnmount: function beforeUnmount() {
    if (this.timePickerTimer) {
      clearTimeout(this.timePickerTimer);
    }
    if (this.mask) {
      this.destroyMask();
    }
    this.destroyResponsiveStyleElement();
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay && this.autoZIndex) {
      utils.ZIndexUtils.clear(this.overlay);
    }
    this.overlay = null;
  },
  methods: {
    isComparable: function isComparable() {
      return this.modelValue != null && typeof this.modelValue !== 'string';
    },
    isSelected: function isSelected(dateMeta) {
      if (!this.isComparable()) {
        return false;
      }
      if (this.modelValue) {
        if (this.isSingleSelection()) {
          return this.isDateEquals(this.modelValue, dateMeta);
        } else if (this.isMultipleSelection()) {
          var selected = false;
          var _iterator = _createForOfIteratorHelper(this.modelValue),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var date = _step.value;
              selected = this.isDateEquals(date, dateMeta);
              if (selected) {
                break;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return selected;
        } else if (this.isRangeSelection()) {
          if (this.modelValue[1]) return this.isDateEquals(this.modelValue[0], dateMeta) || this.isDateEquals(this.modelValue[1], dateMeta) || this.isDateBetween(this.modelValue[0], this.modelValue[1], dateMeta);else {
            return this.isDateEquals(this.modelValue[0], dateMeta);
          }
        }
      }
      return false;
    },
    isMonthSelected: function isMonthSelected(month) {
      if (this.isComparable()) {
        var value = this.isRangeSelection() ? this.modelValue[0] : this.modelValue;
        return !this.isMultipleSelection() ? value.getMonth() === month && value.getFullYear() === this.currentYear : false;
      }
      return false;
    },
    isYearSelected: function isYearSelected(year) {
      if (this.isComparable()) {
        var value = this.isRangeSelection() ? this.modelValue[0] : this.modelValue;
        return !this.isMultipleSelection() && this.isComparable() ? value.getFullYear() === year : false;
      }
      return false;
    },
    isDateEquals: function isDateEquals(value, dateMeta) {
      if (value) return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;else return false;
    },
    isDateBetween: function isDateBetween(start, end, dateMeta) {
      var between = false;
      if (start && end) {
        var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
      }
      return between;
    },
    getFirstDayOfMonthIndex: function getFirstDayOfMonthIndex(month, year) {
      var day = new Date();
      day.setDate(1);
      day.setMonth(month);
      day.setFullYear(year);
      var dayIndex = day.getDay() + this.sundayIndex;
      return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    },
    getDaysCountInMonth: function getDaysCountInMonth(month, year) {
      return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    },
    getDaysCountInPrevMonth: function getDaysCountInPrevMonth(month, year) {
      var prev = this.getPreviousMonthAndYear(month, year);
      return this.getDaysCountInMonth(prev.month, prev.year);
    },
    getPreviousMonthAndYear: function getPreviousMonthAndYear(month, year) {
      var m, y;
      if (month === 0) {
        m = 11;
        y = year - 1;
      } else {
        m = month - 1;
        y = year;
      }
      return {
        month: m,
        year: y
      };
    },
    getNextMonthAndYear: function getNextMonthAndYear(month, year) {
      var m, y;
      if (month === 11) {
        m = 0;
        y = year + 1;
      } else {
        m = month + 1;
        y = year;
      }
      return {
        month: m,
        year: y
      };
    },
    daylightSavingAdjust: function daylightSavingAdjust(date) {
      if (!date) {
        return null;
      }
      date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
      return date;
    },
    isToday: function isToday(today, day, month, year) {
      return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    },
    isSelectable: function isSelectable(day, month, year, otherMonth) {
      var validMin = true;
      var validMax = true;
      var validDate = true;
      var validDay = true;
      if (otherMonth && !this.selectOtherMonths) {
        return false;
      }
      if (this.minDate) {
        if (this.minDate.getFullYear() > year) {
          validMin = false;
        } else if (this.minDate.getFullYear() === year) {
          if (this.minDate.getMonth() > month) {
            validMin = false;
          } else if (this.minDate.getMonth() === month) {
            if (this.minDate.getDate() > day) {
              validMin = false;
            }
          }
        }
      }
      if (this.maxDate) {
        if (this.maxDate.getFullYear() < year) {
          validMax = false;
        } else if (this.maxDate.getFullYear() === year) {
          if (this.maxDate.getMonth() < month) {
            validMax = false;
          } else if (this.maxDate.getMonth() === month) {
            if (this.maxDate.getDate() < day) {
              validMax = false;
            }
          }
        }
      }
      if (this.disabledDates) {
        validDate = !this.isDateDisabled(day, month, year);
      }
      if (this.disabledDays) {
        validDay = !this.isDayDisabled(day, month, year);
      }
      return validMin && validMax && validDate && validDay;
    },
    onOverlayEnter: function onOverlayEnter(el) {
      el.setAttribute(this.attributeSelector, '');
      var styles = this.touchUI ? {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      } : !this.inline ? {
        position: 'absolute',
        top: '0',
        left: '0'
      } : undefined;
      utils.DomHandler.addStyles(el, styles);
      if (this.autoZIndex) {
        if (this.touchUI) utils.ZIndexUtils.set('modal', el, this.baseZIndex || this.$primevue.config.zIndex.modal);else utils.ZIndexUtils.set('overlay', el, this.baseZIndex || this.$primevue.config.zIndex.overlay);
      }
      this.alignOverlay();
      this.$emit('show');
    },
    onOverlayEnterComplete: function onOverlayEnterComplete() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
    },
    onOverlayAfterLeave: function onOverlayAfterLeave(el) {
      if (this.autoZIndex) {
        utils.ZIndexUtils.clear(el);
      }
    },
    onOverlayLeave: function onOverlayLeave() {
      this.currentView = this.view;
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit('hide');
      if (this.mask) {
        this.disableModality();
      }
      this.overlay = null;
    },
    onPrevButtonClick: function onPrevButtonClick(event) {
      if (this.showOtherMonths) {
        this.navigationState = {
          backward: true,
          button: true
        };
        this.navBackward(event);
      }
    },
    onNextButtonClick: function onNextButtonClick(event) {
      if (this.showOtherMonths) {
        this.navigationState = {
          backward: false,
          button: true
        };
        this.navForward(event);
      }
    },
    navBackward: function navBackward(event) {
      event.preventDefault();
      if (!this.isEnabled()) {
        return;
      }
      if (this.currentView === 'month') {
        this.decrementYear();
        this.$emit('year-change', {
          month: this.currentMonth,
          year: this.currentYear
        });
      } else if (this.currentView === 'year') {
        this.decrementDecade();
      } else {
        if (event.shiftKey) {
          this.decrementYear();
        } else {
          if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.decrementYear();
          } else {
            this.currentMonth--;
          }
          this.$emit('month-change', {
            month: this.currentMonth + 1,
            year: this.currentYear
          });
        }
      }
    },
    navForward: function navForward(event) {
      event.preventDefault();
      if (!this.isEnabled()) {
        return;
      }
      if (this.currentView === 'month') {
        this.incrementYear();
        this.$emit('year-change', {
          month: this.currentMonth,
          year: this.currentYear
        });
      } else if (this.currentView === 'year') {
        this.incrementDecade();
      } else {
        if (event.shiftKey) {
          this.incrementYear();
        } else {
          if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.incrementYear();
          } else {
            this.currentMonth++;
          }
          this.$emit('month-change', {
            month: this.currentMonth + 1,
            year: this.currentYear
          });
        }
      }
    },
    decrementYear: function decrementYear() {
      this.currentYear--;
    },
    decrementDecade: function decrementDecade() {
      this.currentYear = this.currentYear - 10;
    },
    incrementYear: function incrementYear() {
      this.currentYear++;
    },
    incrementDecade: function incrementDecade() {
      this.currentYear = this.currentYear + 10;
    },
    switchToMonthView: function switchToMonthView(event) {
      this.currentView = 'month';
      setTimeout(this.updateFocus, 0);
      event.preventDefault();
    },
    switchToYearView: function switchToYearView(event) {
      this.currentView = 'year';
      setTimeout(this.updateFocus, 0);
      event.preventDefault();
    },
    isEnabled: function isEnabled() {
      return !this.disabled && !this.readonly;
    },
    updateCurrentTimeMeta: function updateCurrentTimeMeta(date) {
      var currentHour = date.getHours();
      if (this.hourFormat === '12') {
        this.pm = currentHour > 11;
        if (currentHour >= 12) currentHour = currentHour == 12 ? 12 : currentHour - 12;else currentHour = currentHour == 0 ? 12 : currentHour;
      }
      this.currentHour = Math.floor(currentHour / this.stepHour) * this.stepHour;
      this.currentMinute = Math.floor(date.getMinutes() / this.stepMinute) * this.stepMinute;
      this.currentSecond = Math.floor(date.getSeconds() / this.stepSecond) * this.stepSecond;
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this2 = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          if (_this2.overlayVisible && _this2.isOutsideClicked(event)) {
            _this2.overlayVisible = false;
          }
        };
        document.addEventListener('mousedown', this.outsideClickListener);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('mousedown', this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener: function bindScrollListener() {
      var _this3 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.container, function () {
          if (_this3.overlayVisible) {
            _this3.overlayVisible = false;
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener: function bindResizeListener() {
      var _this4 = this;
      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this4.overlayVisible && !utils.DomHandler.isTouchDevice()) {
            _this4.overlayVisible = false;
          }
        };
        window.addEventListener('resize', this.resizeListener);
      }
    },
    unbindResizeListener: function unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    },
    isOutsideClicked: function isOutsideClicked(event) {
      return !(this.$el.isSameNode(event.target) || this.isNavIconClicked(event) || this.$el.contains(event.target) || this.overlay && this.overlay.contains(event.target));
    },
    isNavIconClicked: function isNavIconClicked(event) {
      return this.previousButton && (this.previousButton.isSameNode(event.target) || this.previousButton.contains(event.target)) || this.nextButton && (this.nextButton.isSameNode(event.target) || this.nextButton.contains(event.target));
    },
    alignOverlay: function alignOverlay() {
      if (this.touchUI) {
        this.enableModality();
      } else if (this.overlay) {
        if (this.appendTo === 'self' || this.inline) {
          utils.DomHandler.relativePosition(this.overlay, this.$el);
        } else {
          if (this.view === 'date') {
            this.overlay.style.width = utils.DomHandler.getOuterWidth(this.overlay) + 'px';
            this.overlay.style.minWidth = utils.DomHandler.getOuterWidth(this.$el) + 'px';
          } else {
            this.overlay.style.width = utils.DomHandler.getOuterWidth(this.$el) + 'px';
          }
          utils.DomHandler.absolutePosition(this.overlay, this.$el);
        }
      }
    },
    onButtonClick: function onButtonClick() {
      if (this.isEnabled()) {
        if (!this.overlayVisible) {
          this.input.focus();
          this.overlayVisible = true;
        } else {
          this.overlayVisible = false;
        }
      }
    },
    isDateDisabled: function isDateDisabled(day, month, year) {
      if (this.disabledDates) {
        var _iterator2 = _createForOfIteratorHelper(this.disabledDates),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var disabledDate = _step2.value;
            if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
              return true;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return false;
    },
    isDayDisabled: function isDayDisabled(day, month, year) {
      if (this.disabledDays) {
        var weekday = new Date(year, month, day);
        var weekdayNumber = weekday.getDay();
        return this.disabledDays.indexOf(weekdayNumber) !== -1;
      }
      return false;
    },
    onMonthDropdownChange: function onMonthDropdownChange(value) {
      this.currentMonth = parseInt(value);
      this.$emit('month-change', {
        month: this.currentMonth + 1,
        year: this.currentYear
      });
    },
    onYearDropdownChange: function onYearDropdownChange(value) {
      this.currentYear = parseInt(value);
      this.$emit('year-change', {
        month: this.currentMonth + 1,
        year: this.currentYear
      });
    },
    onDateSelect: function onDateSelect(event, dateMeta) {
      var _this5 = this;
      if (this.disabled || !dateMeta.selectable) {
        return;
      }
      utils.DomHandler.find(this.overlay, 'table td span:not([data-p-disabled="true"])').forEach(function (cell) {
        return cell.tabIndex = -1;
      });
      if (event) {
        event.currentTarget.focus();
      }
      if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
        var newValue = this.modelValue.filter(function (date) {
          return !_this5.isDateEquals(date, dateMeta);
        });
        this.updateModel(newValue);
      } else {
        if (this.shouldSelectDate(dateMeta)) {
          if (dateMeta.otherMonth) {
            this.currentMonth = dateMeta.month;
            this.currentYear = dateMeta.year;
            this.selectDate(dateMeta);
          } else {
            this.selectDate(dateMeta);
          }
        }
      }
      if (this.isSingleSelection() && (!this.showTime || this.hideOnDateTimeSelect)) {
        setTimeout(function () {
          if (_this5.input) {
            _this5.input.focus();
          }
          _this5.overlayVisible = false;
        }, 150);
      }
    },
    selectDate: function selectDate(dateMeta) {
      var _this6 = this;
      var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
      if (this.showTime) {
        if (this.hourFormat === '12' && this.pm && this.currentHour != 12) date.setHours(this.currentHour + 12);else date.setHours(this.currentHour);
        date.setMinutes(this.currentMinute);
        date.setSeconds(this.currentSecond);
      }
      if (this.minDate && this.minDate > date) {
        date = this.minDate;
        this.currentHour = date.getHours();
        this.currentMinute = date.getMinutes();
        this.currentSecond = date.getSeconds();
      }
      if (this.maxDate && this.maxDate < date) {
        date = this.maxDate;
        this.currentHour = date.getHours();
        this.currentMinute = date.getMinutes();
        this.currentSecond = date.getSeconds();
      }
      var modelVal = null;
      if (this.isSingleSelection()) {
        modelVal = date;
      } else if (this.isMultipleSelection()) {
        modelVal = this.modelValue ? [].concat(_toConsumableArray(this.modelValue), [date]) : [date];
      } else if (this.isRangeSelection()) {
        if (this.modelValue && this.modelValue.length) {
          var startDate = this.modelValue[0];
          var endDate = this.modelValue[1];
          if (!endDate && date.getTime() >= startDate.getTime()) {
            endDate = date;
          } else {
            startDate = date;
            endDate = null;
          }
          modelVal = [startDate, endDate];
        } else {
          modelVal = [date, null];
        }
      }
      if (modelVal !== null) {
        this.updateModel(modelVal);
      }
      if (this.isRangeSelection() && this.hideOnRangeSelection && modelVal[1] !== null) {
        setTimeout(function () {
          _this6.overlayVisible = false;
        }, 150);
      }
      this.$emit('date-select', date);
    },
    updateModel: function updateModel(value) {
      this.$emit('update:modelValue', value);
    },
    shouldSelectDate: function shouldSelectDate() {
      if (this.isMultipleSelection()) return this.maxDateCount != null ? this.maxDateCount > (this.modelValue ? this.modelValue.length : 0) : true;else return true;
    },
    isSingleSelection: function isSingleSelection() {
      return this.selectionMode === 'single';
    },
    isRangeSelection: function isRangeSelection() {
      return this.selectionMode === 'range';
    },
    isMultipleSelection: function isMultipleSelection() {
      return this.selectionMode === 'multiple';
    },
    formatValue: function formatValue(value) {
      if (typeof value === 'string') {
        return value;
      }
      var formattedValue = '';
      if (value) {
        try {
          if (this.isSingleSelection()) {
            formattedValue = this.formatDateTime(value);
          } else if (this.isMultipleSelection()) {
            for (var i = 0; i < value.length; i++) {
              var dateAsString = this.formatDateTime(value[i]);
              formattedValue += dateAsString;
              if (i !== value.length - 1) {
                formattedValue += ', ';
              }
            }
          } else if (this.isRangeSelection()) {
            if (value && value.length) {
              var startDate = value[0];
              var endDate = value[1];
              formattedValue = this.formatDateTime(startDate);
              if (endDate) {
                formattedValue += ' - ' + this.formatDateTime(endDate);
              }
            }
          }
        } catch (err) {
          formattedValue = value;
        }
      }
      return formattedValue;
    },
    formatDateTime: function formatDateTime(date) {
      var formattedValue = null;
      if (date) {
        if (this.timeOnly) {
          formattedValue = this.formatTime(date);
        } else {
          formattedValue = this.formatDate(date, this.datePattern);
          if (this.showTime) {
            formattedValue += ' ' + this.formatTime(date);
          }
        }
      }
      return formattedValue;
    },
    formatDate: function formatDate(date, format) {
      if (!date) {
        return '';
      }
      var iFormat;
      var lookAhead = function lookAhead(match) {
          var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
          if (matches) {
            iFormat++;
          }
          return matches;
        },
        formatNumber = function formatNumber(match, value, len) {
          var num = '' + value;
          if (lookAhead(match)) {
            while (num.length < len) {
              num = '0' + num;
            }
          }
          return num;
        },
        formatName = function formatName(match, value, shortNames, longNames) {
          return lookAhead(match) ? longNames[value] : shortNames[value];
        };
      var output = '';
      var literal = false;
      if (date) {
        for (iFormat = 0; iFormat < format.length; iFormat++) {
          if (literal) {
            if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
              literal = false;
            } else {
              output += format.charAt(iFormat);
            }
          } else {
            switch (format.charAt(iFormat)) {
              case 'd':
                output += formatNumber('d', date.getDate(), 2);
                break;
              case 'D':
                output += formatName('D', date.getDay(), this.$primevue.config.locale.dayNamesShort, this.$primevue.config.locale.dayNames);
                break;
              case 'o':
                output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                break;
              case 'm':
                output += formatNumber('m', date.getMonth() + 1, 2);
                break;
              case 'M':
                output += formatName('M', date.getMonth(), this.$primevue.config.locale.monthNamesShort, this.$primevue.config.locale.monthNames);
                break;
              case 'y':
                output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() % 100;
                break;
              case '@':
                output += date.getTime();
                break;
              case '!':
                output += date.getTime() * 10000 + this.ticksTo1970;
                break;
              case "'":
                if (lookAhead("'")) {
                  output += "'";
                } else {
                  literal = true;
                }
                break;
              default:
                output += format.charAt(iFormat);
            }
          }
        }
      }
      return output;
    },
    formatTime: function formatTime(date) {
      if (!date) {
        return '';
      }
      var output = '';
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      if (this.hourFormat === '12' && hours > 11 && hours !== 12) {
        hours -= 12;
      }
      if (this.hourFormat === '12') {
        output += hours === 0 ? 12 : hours < 10 ? '0' + hours : hours;
      } else {
        output += hours < 10 ? '0' + hours : hours;
      }
      output += ':';
      output += minutes < 10 ? '0' + minutes : minutes;
      if (this.showSeconds) {
        output += ':';
        output += seconds < 10 ? '0' + seconds : seconds;
      }
      if (this.hourFormat === '12') {
        output += date.getHours() > 11 ? " ".concat(this.$primevue.config.locale.pm) : " ".concat(this.$primevue.config.locale.am);
      }
      return output;
    },
    onTodayButtonClick: function onTodayButtonClick(event) {
      var date = new Date();
      var dateMeta = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear,
        today: true,
        selectable: true
      };
      this.onDateSelect(null, dateMeta);
      this.$emit('today-click', date);
      event.preventDefault();
    },
    onClearButtonClick: function onClearButtonClick(event) {
      this.updateModel(null);
      this.overlayVisible = false;
      this.$emit('clear-click', event);
      event.preventDefault();
    },
    onTimePickerElementMouseDown: function onTimePickerElementMouseDown(event, type, direction) {
      if (this.isEnabled()) {
        this.repeat(event, null, type, direction);
        event.preventDefault();
      }
    },
    onTimePickerElementMouseUp: function onTimePickerElementMouseUp(event) {
      if (this.isEnabled()) {
        this.clearTimePickerTimer();
        this.updateModelTime();
        event.preventDefault();
      }
    },
    onTimePickerElementMouseLeave: function onTimePickerElementMouseLeave() {
      this.clearTimePickerTimer();
    },
    repeat: function repeat(event, interval, type, direction) {
      var _this7 = this;
      var i = interval || 500;
      this.clearTimePickerTimer();
      this.timePickerTimer = setTimeout(function () {
        _this7.repeat(event, 100, type, direction);
      }, i);
      switch (type) {
        case 0:
          if (direction === 1) this.incrementHour(event);else this.decrementHour(event);
          break;
        case 1:
          if (direction === 1) this.incrementMinute(event);else this.decrementMinute(event);
          break;
        case 2:
          if (direction === 1) this.incrementSecond(event);else this.decrementSecond(event);
          break;
      }
    },
    convertTo24Hour: function convertTo24Hour(hours, pm) {
      if (this.hourFormat == '12') {
        if (hours === 12) {
          return pm ? 12 : 0;
        } else {
          return pm ? hours + 12 : hours;
        }
      }
      return hours;
    },
    validateTime: function validateTime(hour, minute, second, pm) {
      var value = this.isComparable() ? this.modelValue : this.viewDate;
      var convertedHour = this.convertTo24Hour(hour, pm);
      if (this.isRangeSelection()) {
        value = this.modelValue[1] || this.modelValue[0];
      }
      if (this.isMultipleSelection()) {
        value = this.modelValue[this.modelValue.length - 1];
      }
      var valueDateString = value ? value.toDateString() : null;
      if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
        if (this.minDate.getHours() > convertedHour) {
          return false;
        }
        if (this.minDate.getHours() === convertedHour) {
          if (this.minDate.getMinutes() > minute) {
            return false;
          }
          if (this.minDate.getMinutes() === minute) {
            if (this.minDate.getSeconds() > second) {
              return false;
            }
          }
        }
      }
      if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
        if (this.maxDate.getHours() < convertedHour) {
          return false;
        }
        if (this.maxDate.getHours() === convertedHour) {
          if (this.maxDate.getMinutes() < minute) {
            return false;
          }
          if (this.maxDate.getMinutes() === minute) {
            if (this.maxDate.getSeconds() < second) {
              return false;
            }
          }
        }
      }
      return true;
    },
    incrementHour: function incrementHour(event) {
      var prevHour = this.currentHour;
      var newHour = this.currentHour + this.stepHour;
      var newPM = this.pm;
      if (this.hourFormat == '24') newHour = newHour >= 24 ? newHour - 24 : newHour;else if (this.hourFormat == '12') {
        // Before the AM/PM break, now after
        if (prevHour < 12 && newHour > 11) {
          newPM = !this.pm;
        }
        newHour = newHour >= 13 ? newHour - 12 : newHour;
      }
      if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
        this.currentHour = newHour;
        this.pm = newPM;
      }
      event.preventDefault();
    },
    decrementHour: function decrementHour(event) {
      var newHour = this.currentHour - this.stepHour;
      var newPM = this.pm;
      if (this.hourFormat == '24') newHour = newHour < 0 ? 24 + newHour : newHour;else if (this.hourFormat == '12') {
        // If we were at noon/midnight, then switch
        if (this.currentHour === 12) {
          newPM = !this.pm;
        }
        newHour = newHour <= 0 ? 12 + newHour : newHour;
      }
      if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
        this.currentHour = newHour;
        this.pm = newPM;
      }
      event.preventDefault();
    },
    incrementMinute: function incrementMinute(event) {
      var newMinute = this.currentMinute + this.stepMinute;
      if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
        this.currentMinute = newMinute > 59 ? newMinute - 60 : newMinute;
      }
      event.preventDefault();
    },
    decrementMinute: function decrementMinute(event) {
      var newMinute = this.currentMinute - this.stepMinute;
      newMinute = newMinute < 0 ? 60 + newMinute : newMinute;
      if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
        this.currentMinute = newMinute;
      }
      event.preventDefault();
    },
    incrementSecond: function incrementSecond(event) {
      var newSecond = this.currentSecond + this.stepSecond;
      if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
        this.currentSecond = newSecond > 59 ? newSecond - 60 : newSecond;
      }
      event.preventDefault();
    },
    decrementSecond: function decrementSecond(event) {
      var newSecond = this.currentSecond - this.stepSecond;
      newSecond = newSecond < 0 ? 60 + newSecond : newSecond;
      if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
        this.currentSecond = newSecond;
      }
      event.preventDefault();
    },
    updateModelTime: function updateModelTime() {
      var _this8 = this;
      this.timePickerChange = true;
      var value = this.isComparable() ? this.modelValue : this.viewDate;
      if (this.isRangeSelection()) {
        value = this.modelValue[1] || this.modelValue[0];
      }
      if (this.isMultipleSelection()) {
        value = this.modelValue[this.modelValue.length - 1];
      }
      value = value ? new Date(value.getTime()) : new Date();
      if (this.hourFormat == '12') {
        if (this.currentHour === 12) value.setHours(this.pm ? 12 : 0);else value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
      } else {
        value.setHours(this.currentHour);
      }
      value.setMinutes(this.currentMinute);
      value.setSeconds(this.currentSecond);
      if (this.isRangeSelection()) {
        if (this.modelValue[1]) value = [this.modelValue[0], value];else value = [value, null];
      }
      if (this.isMultipleSelection()) {
        value = [].concat(_toConsumableArray(this.modelValue.slice(0, -1)), [value]);
      }
      this.updateModel(value);
      this.$emit('date-select', value);
      setTimeout(function () {
        return _this8.timePickerChange = false;
      }, 0);
    },
    toggleAMPM: function toggleAMPM(event) {
      var validHour = this.validateTime(this.currentHour, this.currentMinute, this.currentSecond, !this.pm);
      if (!validHour && (this.maxDate || this.minDate)) return;
      this.pm = !this.pm;
      this.updateModelTime();
      event.preventDefault();
    },
    clearTimePickerTimer: function clearTimePickerTimer() {
      if (this.timePickerTimer) {
        clearInterval(this.timePickerTimer);
      }
    },
    onMonthSelect: function onMonthSelect(event, _ref) {
      _ref.month;
        var index = _ref.index;
      if (this.view === 'month') {
        this.onDateSelect(event, {
          year: this.currentYear,
          month: index,
          day: 1,
          selectable: true
        });
      } else {
        this.currentMonth = index;
        this.currentView = 'date';
        this.$emit('month-change', {
          month: this.currentMonth + 1,
          year: this.currentYear
        });
      }
      setTimeout(this.updateFocus, 0);
    },
    onYearSelect: function onYearSelect(event, year) {
      if (this.view === 'year') {
        this.onDateSelect(event, {
          year: year.value,
          month: 0,
          day: 1,
          selectable: true
        });
      } else {
        this.currentYear = year.value;
        this.currentView = 'month';
        this.$emit('year-change', {
          month: this.currentMonth + 1,
          year: this.currentYear
        });
      }
      setTimeout(this.updateFocus, 0);
    },
    enableModality: function enableModality() {
      var _this9 = this;
      if (!this.mask) {
        this.mask = document.createElement('div');
        this.mask.style.zIndex = String(parseInt(this.overlay.style.zIndex, 10) - 1);
        this.mask.setAttribute('data-pc-section', 'datepicker-mask');
        !this.isUnstyled && utils.DomHandler.addMultipleClasses(this.mask, 'p-datepicker-mask p-datepicker-mask-scrollblocker p-component-overlay p-component-overlay-enter');
        this.maskClickListener = function () {
          _this9.overlayVisible = false;
        };
        this.mask.addEventListener('click', this.maskClickListener);
        document.body.appendChild(this.mask);
        utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
      }
    },
    disableModality: function disableModality() {
      var _this10 = this;
      if (this.mask) {
        if (this.isUnstyled) {
          this.destroyMask();
        } else {
          utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
          this.mask.addEventListener('animationend', function () {
            _this10.destroyMask();
          });
        }
      }
    },
    destroyMask: function destroyMask() {
      this.mask.removeEventListener('click', this.maskClickListener);
      this.maskClickListener = null;
      document.body.removeChild(this.mask);
      this.mask = null;
      var bodyChildren = document.body.children;
      var hasBlockerMasks;
      for (var i = 0; i < bodyChildren.length; i++) {
        var bodyChild = bodyChildren[i];
        if (utils.DomHandler.isAttributeEquals(bodyChild, 'data-pc-section', 'datepicker-mask')) {
          hasBlockerMasks = true;
          break;
        }
      }
      if (!hasBlockerMasks) {
        utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
      }
    },
    updateCurrentMetaData: function updateCurrentMetaData() {
      var viewDate = this.viewDate;
      this.currentMonth = viewDate.getMonth();
      this.currentYear = viewDate.getFullYear();
      if (this.showTime || this.timeOnly) {
        this.updateCurrentTimeMeta(viewDate);
      }
    },
    isValidSelection: function isValidSelection(value) {
      var _this11 = this;
      if (value == null) {
        return true;
      }
      var isValid = true;
      if (this.isSingleSelection()) {
        if (!this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
          isValid = false;
        }
      } else if (value.every(function (v) {
        return _this11.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false);
      })) {
        if (this.isRangeSelection()) {
          isValid = value.length > 1 && value[1] > value[0] ? true : false;
        }
      }
      return isValid;
    },
    parseValue: function parseValue(text) {
      if (!text || text.trim().length === 0) {
        return null;
      }
      var value;
      if (this.isSingleSelection()) {
        value = this.parseDateTime(text);
      } else if (this.isMultipleSelection()) {
        var tokens = text.split(',');
        value = [];
        var _iterator3 = _createForOfIteratorHelper(tokens),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var token = _step3.value;
            value.push(this.parseDateTime(token.trim()));
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      } else if (this.isRangeSelection()) {
        var _tokens = text.split(' - ');
        value = [];
        for (var i = 0; i < _tokens.length; i++) {
          value[i] = this.parseDateTime(_tokens[i].trim());
        }
      }
      return value;
    },
    parseDateTime: function parseDateTime(text) {
      var date;
      var parts = text.split(' ');
      if (this.timeOnly) {
        date = new Date();
        this.populateTime(date, parts[0], parts[1]);
      } else {
        var dateFormat = this.datePattern;
        if (this.showTime) {
          date = this.parseDate(parts[0], dateFormat);
          this.populateTime(date, parts[1], parts[2]);
        } else {
          date = this.parseDate(text, dateFormat);
        }
      }
      return date;
    },
    populateTime: function populateTime(value, timeString, ampm) {
      if (this.hourFormat == '12' && !ampm) {
        throw 'Invalid Time';
      }
      this.pm = ampm === this.$primevue.config.locale.pm || ampm === this.$primevue.config.locale.pm.toLowerCase();
      var time = this.parseTime(timeString);
      value.setHours(time.hour);
      value.setMinutes(time.minute);
      value.setSeconds(time.second);
    },
    parseTime: function parseTime(value) {
      var tokens = value.split(':');
      var validTokenLength = this.showSeconds ? 3 : 2;
      var regex = /^[0-9][0-9]$/;
      if (tokens.length !== validTokenLength || !tokens[0].match(regex) || !tokens[1].match(regex) || this.showSeconds && !tokens[2].match(regex)) {
        throw 'Invalid time';
      }
      var h = parseInt(tokens[0]);
      var m = parseInt(tokens[1]);
      var s = this.showSeconds ? parseInt(tokens[2]) : null;
      if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || this.hourFormat == '12' && h > 12 || this.showSeconds && (isNaN(s) || s > 59)) {
        throw 'Invalid time';
      } else {
        if (this.hourFormat == '12' && h !== 12 && this.pm) {
          h += 12;
        }
        return {
          hour: h,
          minute: m,
          second: s
        };
      }
    },
    parseDate: function parseDate(value, format) {
      if (format == null || value == null) {
        throw 'Invalid arguments';
      }
      value = _typeof$1(value) === 'object' ? value.toString() : value + '';
      if (value === '') {
        return null;
      }
      var iFormat,
        dim,
        extra,
        iValue = 0,
        shortYearCutoff = typeof this.shortYearCutoff !== 'string' ? this.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.shortYearCutoff, 10),
        year = -1,
        month = -1,
        day = -1,
        doy = -1,
        literal = false,
        date,
        lookAhead = function lookAhead(match) {
          var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
          if (matches) {
            iFormat++;
          }
          return matches;
        },
        getNumber = function getNumber(match) {
          var isDoubled = lookAhead(match),
            size = match === '@' ? 14 : match === '!' ? 20 : match === 'y' && isDoubled ? 4 : match === 'o' ? 3 : 2,
            minSize = match === 'y' ? size : 1,
            digits = new RegExp('^\\d{' + minSize + ',' + size + '}'),
            num = value.substring(iValue).match(digits);
          if (!num) {
            throw 'Missing number at position ' + iValue;
          }
          iValue += num[0].length;
          return parseInt(num[0], 10);
        },
        getName = function getName(match, shortNames, longNames) {
          var index = -1;
          var arr = lookAhead(match) ? longNames : shortNames;
          var names = [];
          for (var i = 0; i < arr.length; i++) {
            names.push([i, arr[i]]);
          }
          names.sort(function (a, b) {
            return -(a[1].length - b[1].length);
          });
          for (var _i = 0; _i < names.length; _i++) {
            var name = names[_i][1];
            if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
              index = names[_i][0];
              iValue += name.length;
              break;
            }
          }
          if (index !== -1) {
            return index + 1;
          } else {
            throw 'Unknown name at position ' + iValue;
          }
        },
        checkLiteral = function checkLiteral() {
          if (value.charAt(iValue) !== format.charAt(iFormat)) {
            throw 'Unexpected literal at position ' + iValue;
          }
          iValue++;
        };
      if (this.currentView === 'month') {
        day = 1;
      }
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            checkLiteral();
          }
        } else {
          switch (format.charAt(iFormat)) {
            case 'd':
              day = getNumber('d');
              break;
            case 'D':
              getName('D', this.$primevue.config.locale.dayNamesShort, this.$primevue.config.locale.dayNames);
              break;
            case 'o':
              doy = getNumber('o');
              break;
            case 'm':
              month = getNumber('m');
              break;
            case 'M':
              month = getName('M', this.$primevue.config.locale.monthNamesShort, this.$primevue.config.locale.monthNames);
              break;
            case 'y':
              year = getNumber('y');
              break;
            case '@':
              date = new Date(getNumber('@'));
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case '!':
              date = new Date((getNumber('!') - this.ticksTo1970) / 10000);
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case "'":
              if (lookAhead("'")) {
                checkLiteral();
              } else {
                literal = true;
              }
              break;
            default:
              checkLiteral();
          }
        }
      }
      if (iValue < value.length) {
        extra = value.substr(iValue);
        if (!/^\s+/.test(extra)) {
          throw 'Extra/unparsed characters found in date: ' + extra;
        }
      }
      if (year === -1) {
        year = new Date().getFullYear();
      } else if (year < 100) {
        year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
      }
      if (doy > -1) {
        month = 1;
        day = doy;
        do {
          dim = this.getDaysCountInMonth(year, month - 1);
          if (day <= dim) {
            break;
          }
          month++;
          day -= dim;
          // eslint-disable-next-line
        } while (true);
      }
      date = this.daylightSavingAdjust(new Date(year, month - 1, day));
      if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        throw 'Invalid date'; // E.g. 31/02/00
      }

      return date;
    },
    getWeekNumber: function getWeekNumber(date) {
      var checkDate = new Date(date.getTime());
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
      var time = checkDate.getTime();
      checkDate.setMonth(0);
      checkDate.setDate(1);
      return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    },
    onDateCellKeydown: function onDateCellKeydown(event, date, groupIndex) {
      var cellContent = event.currentTarget;
      var cell = cellContent.parentElement;
      var cellIndex = utils.DomHandler.index(cell);
      switch (event.code) {
        case 'ArrowDown':
          {
            cellContent.tabIndex = '-1';
            var nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
              var tableRowIndex = utils.DomHandler.index(cell.parentElement);
              var tableRows = Array.from(cell.parentElement.parentElement.children);
              var nextTableRows = tableRows.slice(tableRowIndex + 1);
              var hasNextFocusableDate = nextTableRows.find(function (el) {
                var focusCell = el.children[cellIndex].children[0];
                return !utils.DomHandler.getAttribute(focusCell, 'data-p-disabled');
              });
              if (hasNextFocusableDate) {
                var focusCell = hasNextFocusableDate.children[cellIndex].children[0];
                focusCell.tabIndex = '0';
                focusCell.focus();
              } else {
                this.navigationState = {
                  backward: false
                };
                this.navForward(event);
              }
            } else {
              this.navigationState = {
                backward: false
              };
              this.navForward(event);
            }
            event.preventDefault();
            break;
          }
        case 'ArrowUp':
          {
            cellContent.tabIndex = '-1';
            var prevRow = cell.parentElement.previousElementSibling;
            if (prevRow) {
              var _tableRowIndex = utils.DomHandler.index(cell.parentElement);
              var _tableRows = Array.from(cell.parentElement.parentElement.children);
              var prevTableRows = _tableRows.slice(0, _tableRowIndex).reverse();
              var _hasNextFocusableDate = prevTableRows.find(function (el) {
                var focusCell = el.children[cellIndex].children[0];
                return !utils.DomHandler.getAttribute(focusCell, 'data-p-disabled');
              });
              if (_hasNextFocusableDate) {
                var _focusCell = _hasNextFocusableDate.children[cellIndex].children[0];
                _focusCell.tabIndex = '0';
                _focusCell.focus();
              } else {
                this.navigationState = {
                  backward: true
                };
                this.navBackward(event);
              }
            } else {
              this.navigationState = {
                backward: true
              };
              this.navBackward(event);
            }
            event.preventDefault();
            break;
          }
        case 'ArrowLeft':
          {
            cellContent.tabIndex = '-1';
            var prevCell = cell.previousElementSibling;
            if (prevCell) {
              var cells = Array.from(cell.parentElement.children);
              var prevCells = cells.slice(0, cellIndex).reverse();
              var _hasNextFocusableDate2 = prevCells.find(function (el) {
                var focusCell = el.children[0];
                return !utils.DomHandler.getAttribute(focusCell, 'data-p-disabled');
              });
              if (_hasNextFocusableDate2) {
                var _focusCell2 = _hasNextFocusableDate2.children[0];
                _focusCell2.tabIndex = '0';
                _focusCell2.focus();
              } else {
                this.navigateToMonth(event, true, groupIndex);
              }
            } else {
              this.navigateToMonth(event, true, groupIndex);
            }
            event.preventDefault();
            break;
          }
        case 'ArrowRight':
          {
            cellContent.tabIndex = '-1';
            var nextCell = cell.nextElementSibling;
            if (nextCell) {
              var _cells = Array.from(cell.parentElement.children);
              var nextCells = _cells.slice(cellIndex + 1);
              var _hasNextFocusableDate3 = nextCells.find(function (el) {
                var focusCell = el.children[0];
                return !utils.DomHandler.getAttribute(focusCell, 'data-p-disabled');
              });
              if (_hasNextFocusableDate3) {
                var _focusCell3 = _hasNextFocusableDate3.children[0];
                _focusCell3.tabIndex = '0';
                _focusCell3.focus();
              } else {
                this.navigateToMonth(event, false, groupIndex);
              }
            } else {
              this.navigateToMonth(event, false, groupIndex);
            }
            event.preventDefault();
            break;
          }
        case 'Enter':
        case 'Space':
          {
            this.onDateSelect(event, date);
            event.preventDefault();
            break;
          }
        case 'Escape':
          {
            this.overlayVisible = false;
            event.preventDefault();
            break;
          }
        case 'Tab':
          {
            if (!this.inline) {
              this.trapFocus(event);
            }
            break;
          }
        case 'Home':
          {
            cellContent.tabIndex = '-1';
            var currentRow = cell.parentElement;
            var _focusCell4 = currentRow.children[0].children[0];
            if (utils.DomHandler.getAttribute(_focusCell4, 'data-p-disabled')) {
              this.navigateToMonth(event, true, groupIndex);
            } else {
              _focusCell4.tabIndex = '0';
              _focusCell4.focus();
            }
            event.preventDefault();
            break;
          }
        case 'End':
          {
            cellContent.tabIndex = '-1';
            var _currentRow = cell.parentElement;
            var _focusCell5 = _currentRow.children[_currentRow.children.length - 1].children[0];
            if (utils.DomHandler.getAttribute(_focusCell5, 'data-p-disabled')) {
              this.navigateToMonth(event, false, groupIndex);
            } else {
              _focusCell5.tabIndex = '0';
              _focusCell5.focus();
            }
            event.preventDefault();
            break;
          }
        case 'PageUp':
          {
            cellContent.tabIndex = '-1';
            if (event.shiftKey) {
              this.navigationState = {
                backward: true
              };
              this.navBackward(event);
            } else this.navigateToMonth(event, true, groupIndex);
            event.preventDefault();
            break;
          }
        case 'PageDown':
          {
            cellContent.tabIndex = '-1';
            if (event.shiftKey) {
              this.navigationState = {
                backward: false
              };
              this.navForward(event);
            } else this.navigateToMonth(event, false, groupIndex);
            event.preventDefault();
            break;
          }
      }
    },
    navigateToMonth: function navigateToMonth(event, prev, groupIndex) {
      if (prev) {
        if (this.numberOfMonths === 1 || groupIndex === 0) {
          this.navigationState = {
            backward: true
          };
          this.navBackward(event);
        } else {
          var prevMonthContainer = this.overlay.children[groupIndex - 1];
          var cells = utils.DomHandler.find(prevMonthContainer, 'table td span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
          var focusCell = cells[cells.length - 1];
          focusCell.tabIndex = '0';
          focusCell.focus();
        }
      } else {
        if (this.numberOfMonths === 1 || groupIndex === this.numberOfMonths - 1) {
          this.navigationState = {
            backward: false
          };
          this.navForward(event);
        } else {
          var nextMonthContainer = this.overlay.children[groupIndex + 1];
          var _focusCell6 = utils.DomHandler.findSingle(nextMonthContainer, 'table td span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
          _focusCell6.tabIndex = '0';
          _focusCell6.focus();
        }
      }
    },
    onMonthCellKeydown: function onMonthCellKeydown(event, index) {
      var cell = event.currentTarget;
      switch (event.code) {
        case 'ArrowUp':
        case 'ArrowDown':
          {
            cell.tabIndex = '-1';
            var cells = cell.parentElement.children;
            var cellIndex = utils.DomHandler.index(cell);
            var nextCell = cells[event.code === 'ArrowDown' ? cellIndex + 3 : cellIndex - 3];
            if (nextCell) {
              nextCell.tabIndex = '0';
              nextCell.focus();
            }
            event.preventDefault();
            break;
          }
        case 'ArrowLeft':
          {
            cell.tabIndex = '-1';
            var prevCell = cell.previousElementSibling;
            if (prevCell) {
              prevCell.tabIndex = '0';
              prevCell.focus();
            } else {
              this.navigationState = {
                backward: true
              };
              this.navBackward(event);
            }
            event.preventDefault();
            break;
          }
        case 'ArrowRight':
          {
            cell.tabIndex = '-1';
            var _nextCell = cell.nextElementSibling;
            if (_nextCell) {
              _nextCell.tabIndex = '0';
              _nextCell.focus();
            } else {
              this.navigationState = {
                backward: false
              };
              this.navForward(event);
            }
            event.preventDefault();
            break;
          }
        case 'PageUp':
          {
            if (event.shiftKey) return;
            this.navigationState = {
              backward: true
            };
            this.navBackward(event);
            break;
          }
        case 'PageDown':
          {
            if (event.shiftKey) return;
            this.navigationState = {
              backward: false
            };
            this.navForward(event);
            break;
          }
        case 'Enter':
        case 'Space':
          {
            this.onMonthSelect(event, index);
            event.preventDefault();
            break;
          }
        case 'Escape':
          {
            this.overlayVisible = false;
            event.preventDefault();
            break;
          }
        case 'Tab':
          {
            this.trapFocus(event);
            break;
          }
      }
    },
    onYearCellKeydown: function onYearCellKeydown(event, index) {
      var cell = event.currentTarget;
      switch (event.code) {
        case 'ArrowUp':
        case 'ArrowDown':
          {
            cell.tabIndex = '-1';
            var cells = cell.parentElement.children;
            var cellIndex = utils.DomHandler.index(cell);
            var nextCell = cells[event.code === 'ArrowDown' ? cellIndex + 2 : cellIndex - 2];
            if (nextCell) {
              nextCell.tabIndex = '0';
              nextCell.focus();
            }
            event.preventDefault();
            break;
          }
        case 'ArrowLeft':
          {
            cell.tabIndex = '-1';
            var prevCell = cell.previousElementSibling;
            if (prevCell) {
              prevCell.tabIndex = '0';
              prevCell.focus();
            } else {
              this.navigationState = {
                backward: true
              };
              this.navBackward(event);
            }
            event.preventDefault();
            break;
          }
        case 'ArrowRight':
          {
            cell.tabIndex = '-1';
            var _nextCell2 = cell.nextElementSibling;
            if (_nextCell2) {
              _nextCell2.tabIndex = '0';
              _nextCell2.focus();
            } else {
              this.navigationState = {
                backward: false
              };
              this.navForward(event);
            }
            event.preventDefault();
            break;
          }
        case 'PageUp':
          {
            if (event.shiftKey) return;
            this.navigationState = {
              backward: true
            };
            this.navBackward(event);
            break;
          }
        case 'PageDown':
          {
            if (event.shiftKey) return;
            this.navigationState = {
              backward: false
            };
            this.navForward(event);
            break;
          }
        case 'Enter':
        case 'Space':
          {
            this.onYearSelect(event, index);
            event.preventDefault();
            break;
          }
        case 'Escape':
          {
            this.overlayVisible = false;
            event.preventDefault();
            break;
          }
        case 'Tab':
          {
            this.trapFocus(event);
            break;
          }
      }
    },
    updateFocus: function updateFocus() {
      var cell;
      if (this.navigationState) {
        if (this.navigationState.button) {
          this.initFocusableCell();
          if (this.navigationState.backward) this.previousButton.focus();else this.nextButton.focus();
        } else {
          if (this.navigationState.backward) {
            var cells;
            if (this.currentView === 'month') {
              cells = utils.DomHandler.find(this.overlay, '[data-pc-section="monthpicker"] [data-pc-section="month"]:not([data-p-disabled="true"])');
            } else if (this.currentView === 'year') {
              cells = utils.DomHandler.find(this.overlay, '[data-pc-section="yearpicker"] [data-pc-section="year"]:not([data-p-disabled="true"])');
            } else {
              cells = utils.DomHandler.find(this.overlay, 'table td span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
            }
            if (cells && cells.length > 0) {
              cell = cells[cells.length - 1];
            }
          } else {
            if (this.currentView === 'month') {
              cell = utils.DomHandler.findSingle(this.overlay, '[data-pc-section="monthpicker"] [data-pc-section="month"]:not([data-p-disabled="true"])');
            } else if (this.currentView === 'year') {
              cell = utils.DomHandler.findSingle(this.overlay, '[data-pc-section="yearpicker"] [data-pc-section="year"]:not([data-p-disabled="true"])');
            } else {
              cell = utils.DomHandler.findSingle(this.overlay, 'table td span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
            }
          }
          if (cell) {
            cell.tabIndex = '0';
            cell.focus();
          }
        }
        this.navigationState = null;
      } else {
        this.initFocusableCell();
      }
    },
    initFocusableCell: function initFocusableCell() {
      var cell;
      if (this.currentView === 'month') {
        var cells = utils.DomHandler.find(this.overlay, '[data-pc-section="monthpicker"] [data-pc-section="month"]');
        var selectedCell = utils.DomHandler.findSingle(this.overlay, '[data-pc-section="monthpicker"] [data-pc-section="month"][data-p-highlight="true"]');
        cells.forEach(function (cell) {
          return cell.tabIndex = -1;
        });
        cell = selectedCell || cells[0];
      } else if (this.currentView === 'year') {
        var _cells2 = utils.DomHandler.find(this.overlay, '[data-pc-section="yearpicker"] [data-pc-section="year"]');
        var _selectedCell = utils.DomHandler.findSingle(this.overlay, '[data-pc-section="yearpicker"] [data-pc-section="year"][data-p-highlight="true"]');
        _cells2.forEach(function (cell) {
          return cell.tabIndex = -1;
        });
        cell = _selectedCell || _cells2[0];
      } else {
        cell = utils.DomHandler.findSingle(this.overlay, 'span[data-p-highlight="true"]');
        if (!cell) {
          var todayCell = utils.DomHandler.findSingle(this.overlay, 'td.p-datepicker-today span:not(.p-disabled):not(.p-ink)');
          if (todayCell) cell = todayCell;else cell = utils.DomHandler.findSingle(this.overlay, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
        }
      }
      if (cell) {
        cell.tabIndex = '0';
        if (!this.inline && (!this.navigationState || !this.navigationState.button) && !this.timePickerChange) {
          cell.focus();
        }
        this.preventFocus = false;
      }
    },
    trapFocus: function trapFocus(event) {
      event.preventDefault();
      var focusableElements = utils.DomHandler.getFocusableElements(this.overlay);
      if (focusableElements && focusableElements.length > 0) {
        if (!document.activeElement) {
          focusableElements[0].focus();
        } else {
          var focusedIndex = focusableElements.indexOf(document.activeElement);
          if (event.shiftKey) {
            if (focusedIndex === -1 || focusedIndex === 0) focusableElements[focusableElements.length - 1].focus();else focusableElements[focusedIndex - 1].focus();
          } else {
            if (focusedIndex === -1) {
              if (this.timeOnly) {
                focusableElements[0].focus();
              } else {
                var spanIndex = null;
                for (var i = 0; i < focusableElements.length; i++) {
                  if (focusableElements[i].tagName === 'SPAN') spanIndex = i;
                }
                focusableElements[spanIndex].focus();
              }
            } else if (focusedIndex === focusableElements.length - 1) focusableElements[0].focus();else focusableElements[focusedIndex + 1].focus();
          }
        }
      }
    },
    onContainerButtonKeydown: function onContainerButtonKeydown(event) {
      switch (event.code) {
        case 'Tab':
          this.trapFocus(event);
          break;
        case 'Escape':
          this.overlayVisible = false;
          event.preventDefault();
          break;
      }
      this.$emit('keydown', event);
    },
    onInput: function onInput(event) {
      try {
        this.selectionStart = this.input.selectionStart;
        this.selectionEnd = this.input.selectionEnd;
        var value = this.parseValue(event.target.value);
        if (this.isValidSelection(value)) {
          this.typeUpdate = true;
          this.updateModel(value);
        }
      } catch (err) {
        /* NoOp */
      }
      this.$emit('input', event);
    },
    onInputClick: function onInputClick() {
      if (this.showOnFocus && this.isEnabled() && !this.overlayVisible) {
        this.overlayVisible = true;
      }
    },
    onFocus: function onFocus(event) {
      if (this.showOnFocus && this.isEnabled()) {
        this.overlayVisible = true;
      }
      this.focused = true;
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.$emit('blur', {
        originalEvent: event,
        value: event.target.value
      });
      this.focused = false;
      event.target.value = this.formatValue(this.modelValue);
    },
    onKeyDown: function onKeyDown(event) {
      if (event.code === 'ArrowDown' && this.overlay) {
        this.trapFocus(event);
      } else if (event.code === 'ArrowDown' && !this.overlay) {
        this.overlayVisible = true;
      } else if (event.code === 'Escape') {
        if (this.overlayVisible) {
          this.overlayVisible = false;
          event.preventDefault();
        }
      } else if (event.code === 'Tab') {
        if (this.overlay) {
          utils.DomHandler.getFocusableElements(this.overlay).forEach(function (el) {
            return el.tabIndex = '-1';
          });
        }
        if (this.overlayVisible) {
          this.overlayVisible = false;
        }
      }
    },
    overlayRef: function overlayRef(el) {
      this.overlay = el;
    },
    inputRef: function inputRef(el) {
      this.input = el;
    },
    previousButtonRef: function previousButtonRef(el) {
      this.previousButton = el;
    },
    nextButtonRef: function nextButtonRef(el) {
      this.nextButton = el;
    },
    getMonthName: function getMonthName(index) {
      return this.$primevue.config.locale.monthNames[index];
    },
    getYear: function getYear(month) {
      return this.currentView === 'month' ? this.currentYear : month.year;
    },
    onOverlayClick: function onOverlayClick(event) {
      if (!this.inline) {
        OverlayEventBus__default["default"].emit('overlay-click', {
          originalEvent: event,
          target: this.$el
        });
      }
    },
    onOverlayKeyDown: function onOverlayKeyDown(event) {
      switch (event.code) {
        case 'Escape':
          this.input.focus();
          this.overlayVisible = false;
          break;
      }
    },
    onOverlayMouseUp: function onOverlayMouseUp(event) {
      this.onOverlayClick(event);
    },
    createResponsiveStyle: function createResponsiveStyle() {
      if (this.numberOfMonths > 1 && this.responsiveOptions && !this.isUnstyled) {
        if (!this.responsiveStyleElement) {
          this.responsiveStyleElement = document.createElement('style');
          this.responsiveStyleElement.type = 'text/css';
          document.body.appendChild(this.responsiveStyleElement);
        }
        var innerHTML = '';
        if (this.responsiveOptions) {
          var responsiveOptions = _toConsumableArray(this.responsiveOptions).filter(function (o) {
            return !!(o.breakpoint && o.numMonths);
          }).sort(function (o1, o2) {
            return -1 * o1.breakpoint.localeCompare(o2.breakpoint, undefined, {
              numeric: true
            });
          });
          for (var i = 0; i < responsiveOptions.length; i++) {
            var _responsiveOptions$i = responsiveOptions[i],
              breakpoint = _responsiveOptions$i.breakpoint,
              numMonths = _responsiveOptions$i.numMonths;
            var styles = "\n                            .p-datepicker[".concat(this.attributeSelector, "] .p-datepicker-group:nth-child(").concat(numMonths, ") .p-datepicker-next {\n                                display: inline-flex !important;\n                            }\n                        ");
            for (var j = numMonths; j < this.numberOfMonths; j++) {
              styles += "\n                                .p-datepicker[".concat(this.attributeSelector, "] .p-datepicker-group:nth-child(").concat(j + 1, ") {\n                                    display: none !important;\n                                }\n                            ");
            }
            innerHTML += "\n                            @media screen and (max-width: ".concat(breakpoint, ") {\n                                ").concat(styles, "\n                            }\n                        ");
          }
        }
        this.responsiveStyleElement.innerHTML = innerHTML;
      }
    },
    destroyResponsiveStyleElement: function destroyResponsiveStyleElement() {
      if (this.responsiveStyleElement) {
        this.responsiveStyleElement.remove();
        this.responsiveStyleElement = null;
      }
    }
  },
  computed: {
    viewDate: function viewDate() {
      var propValue = this.modelValue;
      if (propValue && Array.isArray(propValue)) {
        if (this.isRangeSelection()) {
          propValue = this.inline ? propValue[0] : propValue[1] || propValue[0];
        } else if (this.isMultipleSelection()) {
          propValue = propValue[propValue.length - 1];
        }
      }
      if (propValue && typeof propValue !== 'string') {
        return propValue;
      } else {
        var today = new Date();
        if (this.maxDate && this.maxDate < today) {
          return this.maxDate;
        }
        if (this.minDate && this.minDate > today) {
          return this.minDate;
        }
        return today;
      }
    },
    inputFieldValue: function inputFieldValue() {
      return this.formatValue(this.modelValue);
    },
    months: function months() {
      var months = [];
      for (var i = 0; i < this.numberOfMonths; i++) {
        var month = this.currentMonth + i;
        var year = this.currentYear;
        if (month > 11) {
          month = month % 11 - 1;
          year = year + 1;
        }
        var dates = [];
        var firstDay = this.getFirstDayOfMonthIndex(month, year);
        var daysLength = this.getDaysCountInMonth(month, year);
        var prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        var dayNo = 1;
        var today = new Date();
        var weekNumbers = [];
        var monthRows = Math.ceil((daysLength + firstDay) / 7);
        for (var _i2 = 0; _i2 < monthRows; _i2++) {
          var week = [];
          if (_i2 == 0) {
            for (var j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
              var prev = this.getPreviousMonthAndYear(month, year);
              week.push({
                day: j,
                month: prev.month,
                year: prev.year,
                otherMonth: true,
                today: this.isToday(today, j, prev.month, prev.year),
                selectable: this.isSelectable(j, prev.month, prev.year, true)
              });
            }
            var remainingDaysLength = 7 - week.length;
            for (var _j = 0; _j < remainingDaysLength; _j++) {
              week.push({
                day: dayNo,
                month: month,
                year: year,
                today: this.isToday(today, dayNo, month, year),
                selectable: this.isSelectable(dayNo, month, year, false)
              });
              dayNo++;
            }
          } else {
            for (var _j2 = 0; _j2 < 7; _j2++) {
              if (dayNo > daysLength) {
                var next = this.getNextMonthAndYear(month, year);
                week.push({
                  day: dayNo - daysLength,
                  month: next.month,
                  year: next.year,
                  otherMonth: true,
                  today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                  selectable: this.isSelectable(dayNo - daysLength, next.month, next.year, true)
                });
              } else {
                week.push({
                  day: dayNo,
                  month: month,
                  year: year,
                  today: this.isToday(today, dayNo, month, year),
                  selectable: this.isSelectable(dayNo, month, year, false)
                });
              }
              dayNo++;
            }
          }
          if (this.showWeek) {
            weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
          }
          dates.push(week);
        }
        months.push({
          month: month,
          year: year,
          dates: dates,
          weekNumbers: weekNumbers
        });
      }
      return months;
    },
    weekDays: function weekDays() {
      var weekDays = [];
      var dayIndex = this.$primevue.config.locale.firstDayOfWeek;
      for (var i = 0; i < 7; i++) {
        weekDays.push(this.$primevue.config.locale.dayNamesMin[dayIndex]);
        dayIndex = dayIndex == 6 ? 0 : ++dayIndex;
      }
      return weekDays;
    },
    ticksTo1970: function ticksTo1970() {
      return ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000;
    },
    sundayIndex: function sundayIndex() {
      return this.$primevue.config.locale.firstDayOfWeek > 0 ? 7 - this.$primevue.config.locale.firstDayOfWeek : 0;
    },
    datePattern: function datePattern() {
      return this.dateFormat || this.$primevue.config.locale.dateFormat;
    },
    yearOptions: function yearOptions() {
      if (this.yearRange) {
        var $vm = this;
        var years = this.yearRange.split(':');
        var yearStart = parseInt(years[0]);
        var yearEnd = parseInt(years[1]);
        var yearOptions = [];
        if (this.currentYear < yearStart) {
          $vm.currentYear = yearEnd;
        } else if (this.currentYear > yearEnd) {
          $vm.currentYear = yearStart;
        }
        for (var i = yearStart; i <= yearEnd; i++) {
          yearOptions.push(i);
        }
        return yearOptions;
      } else {
        return null;
      }
    },
    monthPickerValues: function monthPickerValues() {
      var _this12 = this;
      var monthPickerValues = [];
      var isSelectableMonth = function isSelectableMonth(baseMonth) {
        if (_this12.minDate) {
          var minMonth = _this12.minDate.getMonth();
          var minYear = _this12.minDate.getFullYear();
          if (_this12.currentYear < minYear || _this12.currentYear === minYear && baseMonth < minMonth) {
            return false;
          }
        }
        if (_this12.maxDate) {
          var maxMonth = _this12.maxDate.getMonth();
          var maxYear = _this12.maxDate.getFullYear();
          if (_this12.currentYear > maxYear || _this12.currentYear === maxYear && baseMonth > maxMonth) {
            return false;
          }
        }
        return true;
      };
      for (var i = 0; i <= 11; i++) {
        monthPickerValues.push({
          value: this.$primevue.config.locale.monthNamesShort[i],
          selectable: isSelectableMonth(i)
        });
      }
      return monthPickerValues;
    },
    yearPickerValues: function yearPickerValues() {
      var _this13 = this;
      var yearPickerValues = [];
      var base = this.currentYear - this.currentYear % 10;
      var isSelectableYear = function isSelectableYear(baseYear) {
        if (_this13.minDate) {
          if (_this13.minDate.getFullYear() > baseYear) return false;
        }
        if (_this13.maxDate) {
          if (_this13.maxDate.getFullYear() < baseYear) return false;
        }
        return true;
      };
      for (var i = 0; i < 10; i++) {
        yearPickerValues.push({
          value: base + i,
          selectable: isSelectableYear(base + i)
        });
      }
      return yearPickerValues;
    },
    formattedCurrentHour: function formattedCurrentHour() {
      return this.currentHour < 10 ? '0' + this.currentHour : this.currentHour;
    },
    formattedCurrentMinute: function formattedCurrentMinute() {
      return this.currentMinute < 10 ? '0' + this.currentMinute : this.currentMinute;
    },
    formattedCurrentSecond: function formattedCurrentSecond() {
      return this.currentSecond < 10 ? '0' + this.currentSecond : this.currentSecond;
    },
    todayLabel: function todayLabel() {
      return this.$primevue.config.locale.today;
    },
    clearLabel: function clearLabel() {
      return this.$primevue.config.locale.clear;
    },
    weekHeaderLabel: function weekHeaderLabel() {
      return this.$primevue.config.locale.weekHeader;
    },
    monthNames: function monthNames() {
      return this.$primevue.config.locale.monthNames;
    },
    attributeSelector: function attributeSelector() {
      return utils.UniqueComponentId();
    },
    switchViewButtonDisabled: function switchViewButtonDisabled() {
      return this.numberOfMonths > 1 || this.disabled;
    },
    panelId: function panelId() {
      return utils.UniqueComponentId() + '_panel';
    }
  },
  components: {
    CalendarButton: Button__default["default"],
    Portal: Portal__default["default"],
    CalendarIcon: CalendarIcon__default["default"],
    ChevronLeftIcon: ChevronLeftIcon__default["default"],
    ChevronRightIcon: ChevronRightIcon__default["default"],
    ChevronUpIcon: ChevronUpIcon__default["default"],
    ChevronDownIcon: ChevronDownIcon__default["default"]
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["id"];
var _hoisted_2 = ["id", "placeholder", "aria-expanded", "aria-controls", "aria-labelledby", "aria-label", "disabled", "readonly"];
var _hoisted_3 = ["id", "role", "aria-modal", "aria-label"];
var _hoisted_4 = ["disabled", "aria-label"];
var _hoisted_5 = ["disabled", "aria-label"];
var _hoisted_6 = ["disabled", "aria-label"];
var _hoisted_7 = ["disabled", "aria-label"];
var _hoisted_8 = ["abbr"];
var _hoisted_9 = ["aria-label", "data-p-today", "data-p-other-month"];
var _hoisted_10 = ["onClick", "onKeydown", "aria-selected", "aria-disabled", "data-p-disabled", "data-p-highlight"];
var _hoisted_11 = ["onClick", "onKeydown", "data-p-disabled", "data-p-highlight"];
var _hoisted_12 = ["onClick", "onKeydown", "data-p-disabled", "data-p-highlight"];
var _hoisted_13 = ["aria-label"];
var _hoisted_14 = ["aria-label"];
var _hoisted_15 = ["aria-label", "disabled"];
var _hoisted_16 = ["aria-label", "disabled"];
var _hoisted_17 = ["aria-label", "disabled"];
var _hoisted_18 = ["aria-label", "disabled"];
var _hoisted_19 = ["aria-label", "disabled"];
var _hoisted_20 = ["aria-label", "disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CalendarButton = vue.resolveComponent("CalendarButton");
  var _component_Portal = vue.resolveComponent("Portal");
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
    ref: "container",
    id: _ctx.id,
    "class": _ctx.cx('root'),
    style: _ctx.sx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "calendar"
  }), [!_ctx.inline ? (vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
    key: 0,
    ref: $options.inputRef,
    id: _ctx.inputId,
    type: "text",
    role: "combobox",
    "class": [_ctx.cx('input'), _ctx.inputClass],
    style: _ctx.inputStyle,
    placeholder: _ctx.placeholder,
    autocomplete: "off",
    "aria-autocomplete": "none",
    "aria-haspopup": "dialog",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $options.panelId,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    inputmode: "none",
    disabled: _ctx.disabled,
    readonly: !_ctx.manualInput || _ctx.readonly,
    tabindex: 0,
    onInput: _cache[0] || (_cache[0] = function () {
      return $options.onInput && $options.onInput.apply($options, arguments);
    }),
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.onInputClick && $options.onInputClick.apply($options, arguments);
    }),
    onFocus: _cache[2] || (_cache[2] = function () {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[3] || (_cache[3] = function () {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onKeydown: _cache[4] || (_cache[4] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('input'))), null, 16, _hoisted_2)) : vue.createCommentVNode("", true), _ctx.showIcon ? (vue.openBlock(), vue.createBlock(_component_CalendarButton, {
    key: 1,
    "class": vue.normalizeClass(_ctx.cx('dropdownButton')),
    disabled: _ctx.disabled,
    onClick: $options.onButtonClick,
    type: "button",
    "aria-label": _ctx.$primevue.config.locale.chooseDate,
    "aria-haspopup": "dialog",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $options.panelId,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm('dropdownButton'),
    "data-pc-section": "dropdownbutton"
  }, {
    icon: vue.withCtx(function () {
      return [vue.renderSlot(_ctx.$slots, "dropdownicon", {}, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon ? 'span' : 'CalendarIcon'), vue.mergeProps({
          "class": _ctx.icon
        }, _ctx.ptm('dropdownButton')['icon'], {
          "data-pc-section": "icon"
        }), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 8, ["class", "disabled", "onClick", "aria-label", "aria-expanded", "aria-controls", "unstyled", "pt"])) : vue.createCommentVNode("", true), vue.createVNode(_component_Portal, {
    appendTo: _ctx.appendTo,
    disabled: _ctx.inline
  }, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(vue.Transition, {
        name: "p-connected-overlay",
        onEnter: _cache[68] || (_cache[68] = function ($event) {
          return $options.onOverlayEnter($event);
        }),
        onAfterEnter: $options.onOverlayEnterComplete,
        onAfterLeave: $options.onOverlayAfterLeave,
        onLeave: $options.onOverlayLeave
      }, {
        "default": vue.withCtx(function () {
          return [_ctx.inline || $data.overlayVisible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            ref: $options.overlayRef,
            id: $options.panelId,
            "class": [_ctx.cx('panel'), _ctx.panelClass],
            style: _ctx.panelStyle,
            role: _ctx.inline ? null : 'dialog',
            "aria-modal": _ctx.inline ? null : 'true',
            "aria-label": _ctx.$primevue.config.locale.chooseDate,
            onClick: _cache[65] || (_cache[65] = function () {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            }),
            onKeydown: _cache[66] || (_cache[66] = function () {
              return $options.onOverlayKeyDown && $options.onOverlayKeyDown.apply($options, arguments);
            }),
            onMouseup: _cache[67] || (_cache[67] = function () {
              return $options.onOverlayMouseUp && $options.onOverlayMouseUp.apply($options, arguments);
            })
          }, _objectSpread(_objectSpread({}, _ctx.panelProps), _ctx.ptm('panel'))), [!_ctx.timeOnly ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
            key: 0
          }, [vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('groupContainer')
          }, _ctx.ptm('groupContainer')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.months, function (month, groupIndex) {
            return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: month.month + month.year,
              "class": _ctx.cx('group')
            }, _ctx.ptm('group')), [vue.createElementVNode("div", vue.mergeProps({
              "class": _ctx.cx('header')
            }, _ctx.ptm('header')), [vue.renderSlot(_ctx.$slots, "header"), vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
              ref_for: true,
              ref: $options.previousButtonRef,
              "class": _ctx.cx('previousButton'),
              onClick: _cache[5] || (_cache[5] = function () {
                return $options.onPrevButtonClick && $options.onPrevButtonClick.apply($options, arguments);
              }),
              type: "button",
              onKeydown: _cache[6] || (_cache[6] = function () {
                return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
              }),
              disabled: _ctx.disabled,
              "aria-label": $data.currentView === 'year' ? _ctx.$primevue.config.locale.prevDecade : $data.currentView === 'month' ? _ctx.$primevue.config.locale.prevYear : _ctx.$primevue.config.locale.prevMonth
            }, _ctx.ptm('previousButton')), [vue.renderSlot(_ctx.$slots, "previousicon", {}, function () {
              return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.previousIcon ? 'span' : 'ChevronLeftIcon'), vue.mergeProps({
                "class": [_ctx.cx('previousIcon'), _ctx.previousIcon]
              }, _ctx.ptm('previousIcon')), null, 16, ["class"]))];
            })], 16, _hoisted_4)), [[vue.vShow, _ctx.showOtherMonths ? groupIndex === 0 : false], [_directive_ripple]]), vue.createElementVNode("div", vue.mergeProps({
              "class": _ctx.cx('title')
            }, _ctx.ptm('title')), [$data.currentView === 'date' ? (vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
              key: 0,
              type: "button",
              onClick: _cache[7] || (_cache[7] = function () {
                return $options.switchToMonthView && $options.switchToMonthView.apply($options, arguments);
              }),
              onKeydown: _cache[8] || (_cache[8] = function () {
                return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
              }),
              "class": _ctx.cx('monthTitle'),
              disabled: $options.switchViewButtonDisabled,
              "aria-label": _ctx.$primevue.config.locale.chooseMonth
            }, _ctx.ptm('monthTitle')), vue.toDisplayString($options.getMonthName(month.month)), 17, _hoisted_5)) : vue.createCommentVNode("", true), $data.currentView !== 'year' ? (vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
              key: 1,
              type: "button",
              onClick: _cache[9] || (_cache[9] = function () {
                return $options.switchToYearView && $options.switchToYearView.apply($options, arguments);
              }),
              onKeydown: _cache[10] || (_cache[10] = function () {
                return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
              }),
              "class": _ctx.cx('yearTitle'),
              disabled: $options.switchViewButtonDisabled,
              "aria-label": _ctx.$primevue.config.locale.chooseYear
            }, _ctx.ptm('yearTitle')), vue.toDisplayString($options.getYear(month)), 17, _hoisted_6)) : vue.createCommentVNode("", true), $data.currentView === 'year' ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
              key: 2,
              "class": _ctx.cx('decadeTitle')
            }, _ctx.ptm('decadeTitle')), [vue.renderSlot(_ctx.$slots, "decade", {
              years: $options.yearPickerValues
            }, function () {
              return [vue.createTextVNode(vue.toDisplayString($options.yearPickerValues[0].value) + " - " + vue.toDisplayString($options.yearPickerValues[$options.yearPickerValues.length - 1].value), 1)];
            })], 16)) : vue.createCommentVNode("", true)], 16), vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
              ref_for: true,
              ref: $options.nextButtonRef,
              "class": _ctx.cx('nextButton'),
              onClick: _cache[11] || (_cache[11] = function () {
                return $options.onNextButtonClick && $options.onNextButtonClick.apply($options, arguments);
              }),
              type: "button",
              onKeydown: _cache[12] || (_cache[12] = function () {
                return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
              }),
              disabled: _ctx.disabled,
              "aria-label": $data.currentView === 'year' ? _ctx.$primevue.config.locale.nextDecade : $data.currentView === 'month' ? _ctx.$primevue.config.locale.nextYear : _ctx.$primevue.config.locale.nextMonth
            }, _ctx.ptm('nextButton')), [vue.renderSlot(_ctx.$slots, "nexticon", {}, function () {
              return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.nextIcon ? 'span' : 'ChevronRightIcon'), vue.mergeProps({
                "class": [_ctx.cx('nextIcon'), _ctx.nextIcon]
              }, _ctx.ptm('nextIcon')), null, 16, ["class"]))];
            })], 16, _hoisted_7)), [[vue.vShow, _ctx.showOtherMonths ? _ctx.numberOfMonths === 1 ? true : groupIndex === _ctx.numberOfMonths - 1 : false], [_directive_ripple]])], 16), $data.currentView === 'date' ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: 0,
              "class": _ctx.cx('container')
            }, _ctx.ptm('container')), [vue.createElementVNode("table", vue.mergeProps({
              "class": _ctx.cx('table'),
              role: "grid"
            }, _ctx.ptm('table')), [vue.createElementVNode("thead", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('tableHeader'))), [vue.createElementVNode("tr", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('tableHeaderRow'))), [_ctx.showWeek ? (vue.openBlock(), vue.createElementBlock("th", vue.mergeProps({
              key: 0,
              scope: "col",
              "class": _ctx.cx('weekHeader')
            }, _ctx.ptm('weekHeader'), {
              "data-p-disabled": true
            }), [vue.createElementVNode("span", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('weekLabel'))), vue.toDisplayString($options.weekHeaderLabel), 17)], 16)) : vue.createCommentVNode("", true), (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.weekDays, function (weekDay) {
              return vue.openBlock(), vue.createElementBlock("th", vue.mergeProps({
                key: weekDay,
                scope: "col",
                abbr: weekDay
              }, _ctx.ptm('tableHeaderCell')), [vue.createElementVNode("span", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('weekDay'))), vue.toDisplayString(weekDay), 17)], 16, _hoisted_8);
            }), 128))], 16)], 16), vue.createElementVNode("tbody", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('tableBody'))), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(month.dates, function (week, i) {
              return vue.openBlock(), vue.createElementBlock("tr", vue.mergeProps({
                key: week[0].day + '' + week[0].month
              }, _ctx.ptm('tableBodyRow')), [_ctx.showWeek ? (vue.openBlock(), vue.createElementBlock("td", vue.mergeProps({
                key: 0,
                "class": _ctx.cx('weekNumber')
              }, _ctx.ptm('weekNumber')), [vue.createElementVNode("span", vue.mergeProps({
                "class": _ctx.cx('weekLabelContainer')
              }, _ctx.ptm('weekLabelContainer'), {
                "data-p-disabled": true
              }), [month.weekNumbers[i] < 10 ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                key: 0,
                style: {
                  "visibility": "hidden"
                }
              }, _ctx.ptm('weekLabel')), "0", 16)) : vue.createCommentVNode("", true), vue.createTextVNode(" " + vue.toDisplayString(month.weekNumbers[i]), 1)], 16)], 16)) : vue.createCommentVNode("", true), (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(week, function (date) {
                return vue.openBlock(), vue.createElementBlock("td", vue.mergeProps({
                  key: date.day + '' + date.month,
                  "aria-label": date.day,
                  "class": _ctx.cx('day', {
                    date: date
                  })
                }, _ctx.ptm('day'), {
                  "data-p-today": date.today,
                  "data-p-other-month": date.otherMonth
                }), [vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
                  "class": _ctx.cx('dayLabel', {
                    date: date
                  }),
                  onClick: function onClick($event) {
                    return $options.onDateSelect($event, date);
                  },
                  draggable: "false",
                  onKeydown: function onKeydown($event) {
                    return $options.onDateCellKeydown($event, date, groupIndex);
                  },
                  "aria-selected": $options.isSelected(date),
                  "aria-disabled": !date.selectable
                }, _ctx.ptm('dayLabel'), {
                  "data-p-disabled": !date.selectable,
                  "data-p-highlight": $options.isSelected(date)
                }), [vue.renderSlot(_ctx.$slots, "date", {
                  date: date
                }, function () {
                  return [vue.createTextVNode(vue.toDisplayString(date.day), 1)];
                })], 16, _hoisted_10)), [[_directive_ripple]]), $options.isSelected(date) ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: 0,
                  "class": "p-hidden-accessible",
                  "aria-live": "polite"
                }, _ctx.ptm('hiddenSelectedDay'), {
                  "data-p-hidden-accessible": true
                }), vue.toDisplayString(date.day), 17)) : vue.createCommentVNode("", true)], 16, _hoisted_9);
              }), 128))], 16);
            }), 128))], 16)], 16)], 16)) : vue.createCommentVNode("", true)], 16);
          }), 128))], 16), $data.currentView === 'month' ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            "class": _ctx.cx('monthPicker')
          }, _ctx.ptm('monthPicker')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.monthPickerValues, function (m, i) {
            return vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
              key: m,
              onClick: function onClick($event) {
                return $options.onMonthSelect($event, {
                  month: m,
                  index: i
                });
              },
              onKeydown: function onKeydown($event) {
                return $options.onMonthCellKeydown($event, {
                  month: m,
                  index: i
                });
              },
              "class": _ctx.cx('month', {
                month: m,
                index: i
              })
            }, _ctx.ptm('month'), {
              "data-p-disabled": !m.selectable,
              "data-p-highlight": $options.isMonthSelected(i)
            }), [vue.createTextVNode(vue.toDisplayString(m.value) + " ", 1), $options.isMonthSelected(i) ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: 0,
              "class": "p-hidden-accessible",
              "aria-live": "polite"
            }, _ctx.ptm('hiddenMonth'), {
              "data-p-hidden-accessible": true
            }), vue.toDisplayString(m.value), 17)) : vue.createCommentVNode("", true)], 16, _hoisted_11)), [[_directive_ripple]]);
          }), 128))], 16)) : vue.createCommentVNode("", true), $data.currentView === 'year' ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 1,
            "class": _ctx.cx('yearPicker')
          }, _ctx.ptm('yearPicker')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.yearPickerValues, function (y) {
            return vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
              key: y.value,
              onClick: function onClick($event) {
                return $options.onYearSelect($event, y);
              },
              onKeydown: function onKeydown($event) {
                return $options.onYearCellKeydown($event, y);
              },
              "class": _ctx.cx('year', {
                year: y
              })
            }, _ctx.ptm('year'), {
              "data-p-disabled": !y.selectable,
              "data-p-highlight": $options.isYearSelected(y.value)
            }), [vue.createTextVNode(vue.toDisplayString(y.value) + " ", 1), $options.isYearSelected(y.value) ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: 0,
              "class": "p-hidden-accessible",
              "aria-live": "polite"
            }, _ctx.ptm('hiddenYear'), {
              "data-p-hidden-accessible": true
            }), vue.toDisplayString(y.value), 17)) : vue.createCommentVNode("", true)], 16, _hoisted_12)), [[_directive_ripple]]);
          }), 128))], 16)) : vue.createCommentVNode("", true)], 64)) : vue.createCommentVNode("", true), (_ctx.showTime || _ctx.timeOnly) && $data.currentView === 'date' ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 1,
            "class": _ctx.cx('timePicker')
          }, _ctx.ptm('timePicker')), [vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('hourPicker')
          }, _ctx.ptm('hourPicker')), [vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
            "class": _ctx.cx('incrementButton'),
            "aria-label": _ctx.$primevue.config.locale.nextHour,
            onMousedown: _cache[13] || (_cache[13] = function ($event) {
              return $options.onTimePickerElementMouseDown($event, 0, 1);
            }),
            onMouseup: _cache[14] || (_cache[14] = function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }),
            onKeydown: [_cache[15] || (_cache[15] = function () {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }), _cache[17] || (_cache[17] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseDown($event, 0, 1);
            }, ["enter"])), _cache[18] || (_cache[18] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseDown($event, 0, 1);
            }, ["space"]))],
            onMouseleave: _cache[16] || (_cache[16] = function ($event) {
              return $options.onTimePickerElementMouseLeave();
            }),
            onKeyup: [_cache[19] || (_cache[19] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["enter"])), _cache[20] || (_cache[20] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["space"]))],
            type: "button"
          }, _ctx.ptm('incrementButton')), [vue.renderSlot(_ctx.$slots, "incrementicon", {}, function () {
            return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.incrementIcon ? 'span' : 'ChevronUpIcon'), vue.mergeProps({
              "class": _ctx.incrementIcon
            }, _ctx.ptm('incrementIcon')), null, 16, ["class"]))];
          })], 16, _hoisted_13)), [[_directive_ripple]]), vue.createElementVNode("span", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('hour'))), vue.toDisplayString($options.formattedCurrentHour), 17), vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
            "class": _ctx.cx('decrementButton'),
            "aria-label": _ctx.$primevue.config.locale.prevHour,
            onMousedown: _cache[21] || (_cache[21] = function ($event) {
              return $options.onTimePickerElementMouseDown($event, 0, -1);
            }),
            onMouseup: _cache[22] || (_cache[22] = function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }),
            onKeydown: [_cache[23] || (_cache[23] = function () {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }), _cache[25] || (_cache[25] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseDown($event, 0, -1);
            }, ["enter"])), _cache[26] || (_cache[26] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseDown($event, 0, -1);
            }, ["space"]))],
            onMouseleave: _cache[24] || (_cache[24] = function ($event) {
              return $options.onTimePickerElementMouseLeave();
            }),
            onKeyup: [_cache[27] || (_cache[27] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["enter"])), _cache[28] || (_cache[28] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["space"]))],
            type: "button"
          }, _ctx.ptm('decrementButton')), [vue.renderSlot(_ctx.$slots, "decrementicon", {}, function () {
            return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.decrementIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
              "class": _ctx.decrementIcon
            }, _ctx.ptm('decrementIcon')), null, 16, ["class"]))];
          })], 16, _hoisted_14)), [[_directive_ripple]])], 16), vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('separatorContainer')
          }, _ctx.ptm('separatorContainer')), [vue.createElementVNode("span", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('separator'))), vue.toDisplayString(_ctx.timeSeparator), 17)], 16), vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('minutePicker')
          }, _ctx.ptm('minutePicker')), [vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
            "class": _ctx.cx('incrementButton'),
            "aria-label": _ctx.$primevue.config.locale.nextMinute,
            onMousedown: _cache[29] || (_cache[29] = function ($event) {
              return $options.onTimePickerElementMouseDown($event, 1, 1);
            }),
            onMouseup: _cache[30] || (_cache[30] = function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }),
            onKeydown: [_cache[31] || (_cache[31] = function () {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }), _cache[33] || (_cache[33] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseDown($event, 1, 1);
            }, ["enter"])), _cache[34] || (_cache[34] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseDown($event, 1, 1);
            }, ["space"]))],
            disabled: _ctx.disabled,
            onMouseleave: _cache[32] || (_cache[32] = function ($event) {
              return $options.onTimePickerElementMouseLeave();
            }),
            onKeyup: [_cache[35] || (_cache[35] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["enter"])), _cache[36] || (_cache[36] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["space"]))],
            type: "button"
          }, _ctx.ptm('incrementButton')), [vue.renderSlot(_ctx.$slots, "incrementicon", {}, function () {
            return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.incrementIcon ? 'span' : 'ChevronUpIcon'), vue.mergeProps({
              "class": _ctx.incrementIcon
            }, _ctx.ptm('incrementIcon')), null, 16, ["class"]))];
          })], 16, _hoisted_15)), [[_directive_ripple]]), vue.createElementVNode("span", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('minute'))), vue.toDisplayString($options.formattedCurrentMinute), 17), vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
            "class": _ctx.cx('decrementButton'),
            "aria-label": _ctx.$primevue.config.locale.prevMinute,
            onMousedown: _cache[37] || (_cache[37] = function ($event) {
              return $options.onTimePickerElementMouseDown($event, 1, -1);
            }),
            onMouseup: _cache[38] || (_cache[38] = function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }),
            onKeydown: [_cache[39] || (_cache[39] = function () {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }), _cache[41] || (_cache[41] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseDown($event, 1, -1);
            }, ["enter"])), _cache[42] || (_cache[42] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseDown($event, 1, -1);
            }, ["space"]))],
            disabled: _ctx.disabled,
            onMouseleave: _cache[40] || (_cache[40] = function ($event) {
              return $options.onTimePickerElementMouseLeave();
            }),
            onKeyup: [_cache[43] || (_cache[43] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["enter"])), _cache[44] || (_cache[44] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["space"]))],
            type: "button"
          }, _ctx.ptm('decrementButton')), [vue.renderSlot(_ctx.$slots, "decrementicon", {}, function () {
            return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.decrementIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
              "class": _ctx.decrementIcon
            }, _ctx.ptm('decrementIcon')), null, 16, ["class"]))];
          })], 16, _hoisted_16)), [[_directive_ripple]])], 16), _ctx.showSeconds ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            "class": _ctx.cx('separatorContainer')
          }, _ctx.ptm('separatorContainer')), [vue.createElementVNode("span", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('separator'))), vue.toDisplayString(_ctx.timeSeparator), 17)], 16)) : vue.createCommentVNode("", true), _ctx.showSeconds ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 1,
            "class": _ctx.cx('secondPicker')
          }, _ctx.ptm('secondPicker')), [vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
            "class": _ctx.cx('incrementButton'),
            "aria-label": _ctx.$primevue.config.locale.nextSecond,
            onMousedown: _cache[45] || (_cache[45] = function ($event) {
              return $options.onTimePickerElementMouseDown($event, 2, 1);
            }),
            onMouseup: _cache[46] || (_cache[46] = function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }),
            onKeydown: [_cache[47] || (_cache[47] = function () {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }), _cache[49] || (_cache[49] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseDown($event, 2, 1);
            }, ["enter"])), _cache[50] || (_cache[50] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseDown($event, 2, 1);
            }, ["space"]))],
            disabled: _ctx.disabled,
            onMouseleave: _cache[48] || (_cache[48] = function ($event) {
              return $options.onTimePickerElementMouseLeave();
            }),
            onKeyup: [_cache[51] || (_cache[51] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["enter"])), _cache[52] || (_cache[52] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["space"]))],
            type: "button"
          }, _ctx.ptm('incrementButton')), [vue.renderSlot(_ctx.$slots, "incrementicon", {}, function () {
            return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.incrementIcon ? 'span' : 'ChevronUpIcon'), vue.mergeProps({
              "class": _ctx.incrementIcon
            }, _ctx.ptm('incrementIcon')), null, 16, ["class"]))];
          })], 16, _hoisted_17)), [[_directive_ripple]]), vue.createElementVNode("span", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('second'))), vue.toDisplayString($options.formattedCurrentSecond), 17), vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
            "class": _ctx.cx('decrementButton'),
            "aria-label": _ctx.$primevue.config.locale.prevSecond,
            onMousedown: _cache[53] || (_cache[53] = function ($event) {
              return $options.onTimePickerElementMouseDown($event, 2, -1);
            }),
            onMouseup: _cache[54] || (_cache[54] = function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }),
            onKeydown: [_cache[55] || (_cache[55] = function () {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }), _cache[57] || (_cache[57] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseDown($event, 2, -1);
            }, ["enter"])), _cache[58] || (_cache[58] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseDown($event, 2, -1);
            }, ["space"]))],
            disabled: _ctx.disabled,
            onMouseleave: _cache[56] || (_cache[56] = function ($event) {
              return $options.onTimePickerElementMouseLeave();
            }),
            onKeyup: [_cache[59] || (_cache[59] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["enter"])), _cache[60] || (_cache[60] = vue.withKeys(function ($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["space"]))],
            type: "button"
          }, _ctx.ptm('decrementButton')), [vue.renderSlot(_ctx.$slots, "decrementicon", {}, function () {
            return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.decrementIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
              "class": _ctx.decrementIcon
            }, _ctx.ptm('decrementIcon')), null, 16, ["class"]))];
          })], 16, _hoisted_18)), [[_directive_ripple]])], 16)) : vue.createCommentVNode("", true), _ctx.hourFormat == '12' ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 2,
            "class": _ctx.cx('separatorContainer')
          }, _ctx.ptm('separatorContainer')), [vue.createElementVNode("span", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('separator'))), vue.toDisplayString(_ctx.timeSeparator), 17)], 16)) : vue.createCommentVNode("", true), _ctx.hourFormat == '12' ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 3,
            "class": _ctx.cx('ampmPicker')
          }, _ctx.ptm('ampmPicker')), [vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
            "class": _ctx.cx('incrementButton'),
            "aria-label": _ctx.$primevue.config.locale.am,
            onClick: _cache[61] || (_cache[61] = function ($event) {
              return $options.toggleAMPM($event);
            }),
            type: "button",
            disabled: _ctx.disabled
          }, _ctx.ptm('incrementButton')), [vue.renderSlot(_ctx.$slots, "incrementicon", {}, function () {
            return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.incrementIcon ? 'span' : 'ChevronUpIcon'), vue.mergeProps({
              "class": _ctx.cx('incrementIcon')
            }, _ctx.ptm('incrementIcon')), null, 16, ["class"]))];
          })], 16, _hoisted_19)), [[_directive_ripple]]), vue.createElementVNode("span", vue.normalizeProps(vue.guardReactiveProps(_ctx.ptm('ampm'))), vue.toDisplayString($data.pm ? _ctx.$primevue.config.locale.pm : _ctx.$primevue.config.locale.am), 17), vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
            "class": _ctx.cx('decrementButton'),
            "aria-label": _ctx.$primevue.config.locale.pm,
            onClick: _cache[62] || (_cache[62] = function ($event) {
              return $options.toggleAMPM($event);
            }),
            type: "button",
            disabled: _ctx.disabled
          }, _ctx.ptm('decrementButton')), [vue.renderSlot(_ctx.$slots, "decrementicon", {}, function () {
            return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.decrementIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
              "class": _ctx.cx('decrementIcon')
            }, _ctx.ptm('decrementIcon')), null, 16, ["class"]))];
          })], 16, _hoisted_20)), [[_directive_ripple]])], 16)) : vue.createCommentVNode("", true)], 16)) : vue.createCommentVNode("", true), _ctx.showButtonBar ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 2,
            "class": _ctx.cx('buttonbar')
          }, _ctx.ptm('buttonbar')), [vue.createVNode(_component_CalendarButton, {
            type: "button",
            label: $options.todayLabel,
            onClick: _cache[63] || (_cache[63] = function ($event) {
              return $options.onTodayButtonClick($event);
            }),
            "class": vue.normalizeClass(_ctx.cx('todayButton')),
            onKeydown: $options.onContainerButtonKeydown,
            unstyled: _ctx.unstyled,
            pt: _ctx.ptm('todayButton'),
            "data-pc-section": "todaybutton"
          }, null, 8, ["label", "class", "onKeydown", "unstyled", "pt"]), vue.createVNode(_component_CalendarButton, {
            type: "button",
            label: $options.clearLabel,
            onClick: _cache[64] || (_cache[64] = function ($event) {
              return $options.onClearButtonClick($event);
            }),
            "class": vue.normalizeClass(_ctx.cx('clearButton')),
            onKeydown: $options.onContainerButtonKeydown,
            unstyled: _ctx.unstyled,
            pt: _ctx.ptm('clearButton'),
            "data-pc-section": "clearbutton"
          }, null, 8, ["label", "class", "onKeydown", "unstyled", "pt"])], 16)) : vue.createCommentVNode("", true), vue.renderSlot(_ctx.$slots, "footer")], 16, _hoisted_3)) : vue.createCommentVNode("", true)];
        }),
        _: 3
      }, 8, ["onAfterEnter", "onAfterLeave", "onLeave"])];
    }),
    _: 3
  }, 8, ["appendTo", "disabled"])], 16, _hoisted_1);
}

script.render = render;

module.exports = script;
