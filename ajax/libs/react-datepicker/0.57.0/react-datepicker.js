(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-onclickoutside"), require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-onclickoutside", "moment"], factory);
	else if(typeof exports === 'object')
		exports["DatePicker"] = factory(require("react"), require("react-onclickoutside"), require("moment"));
	else
		root["DatePicker"] = factory(root["React"], root["onClickOutside"], root["moment"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_13__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _calendar = __webpack_require__(1);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _popper_component = __webpack_require__(21);

	var _popper_component2 = _interopRequireDefault(_popper_component);

	var _classnames2 = __webpack_require__(10);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _date_utils = __webpack_require__(12);

	var _reactOnclickoutside = __webpack_require__(11);

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside';
	var WrappedCalendar = (0, _reactOnclickoutside2.default)(_calendar2.default);

	/**
	 * General datepicker component.
	 */

	var DatePicker = function (_React$Component) {
	  _inherits(DatePicker, _React$Component);

	  _createClass(DatePicker, null, [{
	    key: 'defaultProps',
	    get: function get() {
	      return {
	        allowSameDay: false,
	        dateFormat: 'L',
	        dateFormatCalendar: 'MMMM YYYY',
	        onChange: function onChange() {},

	        disabled: false,
	        disabledKeyboardNavigation: false,
	        dropdownMode: 'scroll',
	        onFocus: function onFocus() {},
	        onBlur: function onBlur() {},
	        onKeyDown: function onKeyDown() {},
	        onSelect: function onSelect() {},
	        onClickOutside: function onClickOutside() {},
	        onMonthChange: function onMonthChange() {},

	        monthsShown: 1,
	        withPortal: false,
	        shouldCloseOnSelect: true,
	        showTimeSelect: false,
	        timeIntervals: 30
	      };
	    }
	  }]);

	  function DatePicker(props) {
	    _classCallCheck(this, DatePicker);

	    var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

	    _this.getPreSelection = function () {
	      return _this.props.openToDate ? (0, _date_utils.newDate)(_this.props.openToDate) : _this.props.selectsEnd && _this.props.startDate ? (0, _date_utils.newDate)(_this.props.startDate) : _this.props.selectsStart && _this.props.endDate ? (0, _date_utils.newDate)(_this.props.endDate) : (0, _date_utils.now)(_this.props.utcOffset);
	    };

	    _this.calcInitialState = function () {
	      var defaultPreSelection = _this.getPreSelection();
	      var minDate = (0, _date_utils.getEffectiveMinDate)(_this.props);
	      var maxDate = (0, _date_utils.getEffectiveMaxDate)(_this.props);
	      var boundedPreSelection = minDate && (0, _date_utils.isBefore)(defaultPreSelection, minDate) ? minDate : maxDate && (0, _date_utils.isAfter)(defaultPreSelection, maxDate) ? maxDate : defaultPreSelection;

	      return {
	        open: _this.props.startOpen || false,
	        preventFocus: false,
	        preSelection: _this.props.selected ? (0, _date_utils.newDate)(_this.props.selected) : boundedPreSelection
	      };
	    };

	    _this.clearPreventFocusTimeout = function () {
	      if (_this.preventFocusTimeout) {
	        clearTimeout(_this.preventFocusTimeout);
	      }
	    };

	    _this.setFocus = function () {
	      _this.input.focus();
	    };

	    _this.setOpen = function (open) {
	      _this.setState({
	        open: open,
	        preSelection: open && _this.state.open ? _this.state.preSelection : _this.calcInitialState().preSelection
	      });
	    };

	    _this.handleFocus = function (event) {
	      if (!_this.state.preventFocus) {
	        _this.props.onFocus(event);
	        _this.setOpen(true);
	      }
	    };

	    _this.cancelFocusInput = function () {
	      clearTimeout(_this.inputFocusTimeout);
	      _this.inputFocusTimeout = null;
	    };

	    _this.deferFocusInput = function () {
	      _this.cancelFocusInput();
	      _this.inputFocusTimeout = setTimeout(function () {
	        return _this.setFocus();
	      }, 1);
	    };

	    _this.handleDropdownFocus = function () {
	      _this.cancelFocusInput();
	    };

	    _this.handleBlur = function (event) {
	      if (_this.state.open) {
	        _this.deferFocusInput();
	      } else {
	        _this.props.onBlur(event);
	      }
	    };

	    _this.handleCalendarClickOutside = function (event) {
	      if (!_this.props.inline) {
	        _this.setOpen(false);
	      }
	      _this.props.onClickOutside(event);
	      if (_this.props.withPortal) {
	        event.preventDefault();
	      }
	    };

	    _this.handleChange = function (event) {
	      if (_this.props.onChangeRaw) {
	        _this.props.onChangeRaw(event);
	        if (event.isDefaultPrevented()) {
	          return;
	        }
	      }
	      _this.setState({ inputValue: event.target.value });
	      var date = (0, _date_utils.parseDate)(event.target.value, _this.props);
	      if (date || !event.target.value) {
	        _this.setSelected(date, event, true);
	      }
	    };

	    _this.handleSelect = function (date, event) {
	      // Preventing onFocus event to fix issue
	      // https://github.com/Hacker0x01/react-datepicker/issues/628
	      _this.setState({ preventFocus: true }, function () {
	        _this.preventFocusTimeout = setTimeout(function () {
	          return _this.setState({ preventFocus: false });
	        }, 50);
	        return _this.preventFocusTimeout;
	      });
	      _this.setSelected(date, event);
	      if (!_this.props.shouldCloseOnSelect) {
	        _this.setPreSelection(date);
	      } else if (!_this.props.inline) {
	        _this.setOpen(false);
	      }
	    };

	    _this.setSelected = function (date, event, keepInput) {
	      var changedDate = date;

	      if (changedDate !== null && (0, _date_utils.isDayDisabled)(changedDate, _this.props)) {
	        return;
	      }

	      if (!(0, _date_utils.isSameDay)(_this.props.selected, changedDate) || _this.props.allowSameDay) {
	        if (changedDate !== null) {
	          if (_this.props.selected) {
	            changedDate = (0, _date_utils.setTime)((0, _date_utils.newDate)(changedDate), {
	              hour: (0, _date_utils.getHour)(_this.props.selected),
	              minute: (0, _date_utils.getMinute)(_this.props.selected),
	              second: (0, _date_utils.getSecond)(_this.props.selected)
	            });
	          }
	          _this.setState({
	            preSelection: changedDate
	          });
	        }
	        _this.props.onChange(changedDate, event);
	      }

	      _this.props.onSelect(changedDate, event);

	      if (!keepInput) {
	        _this.setState({ inputValue: null });
	      }
	    };

	    _this.setPreSelection = function (date) {
	      var isDateRangePresent = typeof _this.props.minDate !== 'undefined' && typeof _this.props.maxDate !== 'undefined';
	      var isValidDateSelection = isDateRangePresent && date ? (0, _date_utils.isDayInRange)(date, _this.props.minDate, _this.props.maxDate) : true;
	      if (isValidDateSelection) {
	        _this.setState({
	          preSelection: date
	        });
	      }
	    };

	    _this.handleTimeChange = function (time) {
	      var selected = _this.props.selected ? _this.props.selected : _this.getPreSelection();
	      var changedDate = (0, _date_utils.setTime)((0, _date_utils.cloneDate)(selected), {
	        hour: (0, _date_utils.getHour)(time),
	        minute: (0, _date_utils.getMinute)(time)
	      });

	      _this.setState({
	        preSelection: changedDate
	      });

	      _this.props.onChange(changedDate);
	    };

	    _this.onInputClick = function () {
	      if (!_this.props.disabled) {
	        _this.setOpen(true);
	      }
	    };

	    _this.onInputKeyDown = function (event) {
	      _this.props.onKeyDown(event);
	      var eventKey = event.key;
	      if (!_this.state.open && !_this.props.inline) {
	        if (eventKey !== 'Enter' && eventKey !== 'Escape' && eventKey !== 'Tab') {
	          _this.onInputClick();
	        }
	        return;
	      }
	      var copy = (0, _date_utils.newDate)(_this.state.preSelection);
	      if (eventKey === 'Enter') {
	        event.preventDefault();
	        if ((0, _date_utils.isMoment)(_this.state.preSelection) || (0, _date_utils.isDate)(_this.state.preSelection)) {
	          _this.handleSelect(copy, event);
	          !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
	        } else {
	          _this.setOpen(false);
	        }
	      } else if (eventKey === 'Escape') {
	        event.preventDefault();
	        _this.setOpen(false);
	      } else if (eventKey === 'Tab') {
	        _this.setOpen(false);
	      } else if (!_this.props.disabledKeyboardNavigation) {
	        var newSelection = void 0;
	        switch (eventKey) {
	          case 'ArrowLeft':
	            event.preventDefault();
	            newSelection = (0, _date_utils.subtractDays)(copy, 1);
	            break;
	          case 'ArrowRight':
	            event.preventDefault();
	            newSelection = (0, _date_utils.addDays)(copy, 1);
	            break;
	          case 'ArrowUp':
	            event.preventDefault();
	            newSelection = (0, _date_utils.subtractWeeks)(copy, 1);
	            break;
	          case 'ArrowDown':
	            event.preventDefault();
	            newSelection = (0, _date_utils.addWeeks)(copy, 1);
	            break;
	          case 'PageUp':
	            event.preventDefault();
	            newSelection = (0, _date_utils.subtractMonths)(copy, 1);
	            break;
	          case 'PageDown':
	            event.preventDefault();
	            newSelection = (0, _date_utils.addMonths)(copy, 1);
	            break;
	          case 'Home':
	            event.preventDefault();
	            newSelection = (0, _date_utils.subtractYears)(copy, 1);
	            break;
	          case 'End':
	            event.preventDefault();
	            newSelection = (0, _date_utils.addYears)(copy, 1);
	            break;
	        }
	        _this.setPreSelection(newSelection);
	      }
	    };

	    _this.onClearClick = function (event) {
	      event.preventDefault();
	      _this.props.onChange(null, event);
	      _this.setState({ inputValue: null });
	    };

	    _this.renderCalendar = function () {
	      if (!_this.props.inline && (!_this.state.open || _this.props.disabled)) {
	        return null;
	      }
	      return _react2.default.createElement(
	        WrappedCalendar,
	        {
	          ref: function ref(elem) {
	            _this.calendar = elem;
	          },
	          locale: _this.props.locale,
	          dateFormat: _this.props.dateFormatCalendar,
	          useWeekdaysShort: _this.props.useWeekdaysShort,
	          dropdownMode: _this.props.dropdownMode,
	          selected: _this.props.selected,
	          preSelection: _this.state.preSelection,
	          onSelect: _this.handleSelect,
	          onWeekSelect: _this.props.onWeekSelect,
	          openToDate: _this.props.openToDate,
	          minDate: _this.props.minDate,
	          maxDate: _this.props.maxDate,
	          selectsStart: _this.props.selectsStart,
	          selectsEnd: _this.props.selectsEnd,
	          startDate: _this.props.startDate,
	          endDate: _this.props.endDate,
	          excludeDates: _this.props.excludeDates,
	          filterDate: _this.props.filterDate,
	          onClickOutside: _this.handleCalendarClickOutside,
	          formatWeekNumber: _this.props.formatWeekNumber,
	          highlightDates: _this.props.highlightDates,
	          includeDates: _this.props.includeDates,
	          inline: _this.props.inline,
	          peekNextMonth: _this.props.peekNextMonth,
	          showMonthDropdown: _this.props.showMonthDropdown,
	          showWeekNumbers: _this.props.showWeekNumbers,
	          showYearDropdown: _this.props.showYearDropdown,
	          withPortal: _this.props.withPortal,
	          forceShowMonthNavigation: _this.props.forceShowMonthNavigation,
	          scrollableYearDropdown: _this.props.scrollableYearDropdown,
	          todayButton: _this.props.todayButton,
	          weekLabel: _this.props.weekLabel,
	          utcOffset: _this.props.utcOffset,
	          outsideClickIgnoreClass: outsideClickIgnoreClass,
	          fixedHeight: _this.props.fixedHeight,
	          monthsShown: _this.props.monthsShown,
	          onDropdownFocus: _this.handleDropdownFocus,
	          onMonthChange: _this.props.onMonthChange,
	          dayClassName: _this.props.dayClassName,
	          showTimeSelect: _this.props.showTimeSelect,
	          onTimeChange: _this.handleTimeChange,
	          timeFormat: _this.props.timeFormat,
	          timeIntervals: _this.props.timeIntervals,
	          minTime: _this.props.minTime,
	          maxTime: _this.props.maxTime,
	          excludeTimes: _this.props.excludeTimes,
	          className: _this.props.calendarClassName,
	          yearDropdownItemNumber: _this.props.yearDropdownItemNumber },
	        _this.props.children
	      );
	    };

	    _this.renderDateInput = function () {
	      var className = (0, _classnames3.default)(_this.props.className, _defineProperty({}, outsideClickIgnoreClass, _this.state.open));

	      var customInput = _this.props.customInput || _react2.default.createElement('input', { type: 'text' });
	      var inputValue = typeof _this.props.value === 'string' ? _this.props.value : typeof _this.state.inputValue === 'string' ? _this.state.inputValue : (0, _date_utils.safeDateFormat)(_this.props.selected, _this.props);

	      return _react2.default.cloneElement(customInput, {
	        ref: function ref(input) {
	          _this.input = input;
	        },
	        value: inputValue,
	        onBlur: _this.handleBlur,
	        onChange: _this.handleChange,
	        onClick: _this.onInputClick,
	        onFocus: _this.handleFocus,
	        onKeyDown: _this.onInputKeyDown,
	        id: _this.props.id,
	        name: _this.props.name,
	        autoFocus: _this.props.autoFocus,
	        placeholder: _this.props.placeholderText,
	        disabled: _this.props.disabled,
	        autoComplete: _this.props.autoComplete,
	        className: className,
	        title: _this.props.title,
	        readOnly: _this.props.readOnly,
	        required: _this.props.required,
	        tabIndex: _this.props.tabIndex
	      });
	    };

	    _this.renderClearButton = function () {
	      if (_this.props.isClearable && _this.props.selected != null) {
	        return _react2.default.createElement('a', { className: 'react-datepicker__close-icon', href: '#', onClick: _this.onClearClick });
	      } else {
	        return null;
	      }
	    };

	    _this.state = _this.calcInitialState();
	    return _this;
	  }

	  _createClass(DatePicker, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var currentMonth = this.props.selected && (0, _date_utils.getMonth)(this.props.selected);
	      var nextMonth = nextProps.selected && (0, _date_utils.getMonth)(nextProps.selected);
	      if (this.props.inline && currentMonth !== nextMonth) {
	        this.setPreSelection(nextProps.selected);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.clearPreventFocusTimeout();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var calendar = this.renderCalendar();

	      if (this.props.inline && !this.props.withPortal) {
	        return calendar;
	      }

	      if (this.props.withPortal) {
	        return _react2.default.createElement(
	          'div',
	          null,
	          !this.props.inline ? _react2.default.createElement(
	            'div',
	            { className: 'react-datepicker__input-container' },
	            this.renderDateInput(),
	            this.renderClearButton()
	          ) : null,
	          this.state.open || this.props.inline ? _react2.default.createElement(
	            'div',
	            { className: 'react-datepicker__portal' },
	            calendar
	          ) : null
	        );
	      }

	      return _react2.default.createElement(_popper_component2.default, {
	        className: this.props.popperClassName,
	        hidePopper: !this.state.open || this.props.disabled,
	        popperModifiers: this.props.popperModifiers,
	        targetComponent: _react2.default.createElement(
	          'div',
	          { className: 'react-datepicker__input-container' },
	          this.renderDateInput(),
	          this.renderClearButton()
	        ),
	        popperContainer: this.props.popperContainer,
	        popperComponent: calendar,
	        popperPlacement: this.props.popperPlacement });
	    }
	  }]);

	  return DatePicker;
	}(_react2.default.Component);

	DatePicker.propTypes = {
	  allowSameDay: _propTypes2.default.bool,
	  autoComplete: _propTypes2.default.string,
	  autoFocus: _propTypes2.default.bool,
	  calendarClassName: _propTypes2.default.string,
	  children: _propTypes2.default.node,
	  className: _propTypes2.default.string,
	  customInput: _propTypes2.default.element,
	  dateFormat: _propTypes2.default.oneOfType([// eslint-disable-line react/no-unused-prop-types
	  _propTypes2.default.string, _propTypes2.default.array]),
	  dateFormatCalendar: _propTypes2.default.string,
	  dayClassName: _propTypes2.default.func,
	  disabled: _propTypes2.default.bool,
	  disabledKeyboardNavigation: _propTypes2.default.bool,
	  dropdownMode: _propTypes2.default.oneOf(['scroll', 'select']).isRequired,
	  endDate: _propTypes2.default.object,
	  excludeDates: _propTypes2.default.array,
	  filterDate: _propTypes2.default.func,
	  fixedHeight: _propTypes2.default.bool,
	  formatWeekNumber: _propTypes2.default.func,
	  highlightDates: _propTypes2.default.array,
	  id: _propTypes2.default.string,
	  includeDates: _propTypes2.default.array,
	  inline: _propTypes2.default.bool,
	  isClearable: _propTypes2.default.bool,
	  locale: _propTypes2.default.string,
	  maxDate: _propTypes2.default.object,
	  minDate: _propTypes2.default.object,
	  monthsShown: _propTypes2.default.number,
	  name: _propTypes2.default.string,
	  onBlur: _propTypes2.default.func,
	  onChange: _propTypes2.default.func.isRequired,
	  onSelect: _propTypes2.default.func,
	  onWeekSelect: _propTypes2.default.func,
	  onClickOutside: _propTypes2.default.func,
	  onChangeRaw: _propTypes2.default.func,
	  onFocus: _propTypes2.default.func,
	  onKeyDown: _propTypes2.default.func,
	  onMonthChange: _propTypes2.default.func,
	  openToDate: _propTypes2.default.object,
	  peekNextMonth: _propTypes2.default.bool,
	  placeholderText: _propTypes2.default.string,
	  popperContainer: _propTypes2.default.func,
	  popperClassName: _propTypes2.default.string, // <PopperComponent/> props
	  popperModifiers: _propTypes2.default.object, // <PopperComponent/> props
	  popperPlacement: _propTypes2.default.oneOf(_popper_component.popperPlacementPositions), // <PopperComponent/> props
	  readOnly: _propTypes2.default.bool,
	  required: _propTypes2.default.bool,
	  scrollableYearDropdown: _propTypes2.default.bool,
	  selected: _propTypes2.default.object,
	  selectsEnd: _propTypes2.default.bool,
	  selectsStart: _propTypes2.default.bool,
	  showMonthDropdown: _propTypes2.default.bool,
	  showWeekNumbers: _propTypes2.default.bool,
	  showYearDropdown: _propTypes2.default.bool,
	  forceShowMonthNavigation: _propTypes2.default.bool,
	  startDate: _propTypes2.default.object,
	  startOpen: _propTypes2.default.bool,
	  tabIndex: _propTypes2.default.number,
	  title: _propTypes2.default.string,
	  todayButton: _propTypes2.default.string,
	  useWeekdaysShort: _propTypes2.default.bool,
	  utcOffset: _propTypes2.default.number,
	  value: _propTypes2.default.string,
	  weekLabel: _propTypes2.default.string,
	  withPortal: _propTypes2.default.bool,
	  yearDropdownItemNumber: _propTypes2.default.number,
	  shouldCloseOnSelect: _propTypes2.default.bool,
	  showTimeSelect: _propTypes2.default.bool,
	  timeFormat: _propTypes2.default.string,
	  timeIntervals: _propTypes2.default.number,
	  minTime: _propTypes2.default.object,
	  maxTime: _propTypes2.default.object,
	  excludeTimes: _propTypes2.default.array
	};
	exports.default = DatePicker;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _year_dropdown = __webpack_require__(2);

	var _year_dropdown2 = _interopRequireDefault(_year_dropdown);

	var _month_dropdown = __webpack_require__(14);

	var _month_dropdown2 = _interopRequireDefault(_month_dropdown);

	var _month = __webpack_require__(16);

	var _month2 = _interopRequireDefault(_month);

	var _time = __webpack_require__(20);

	var _time2 = _interopRequireDefault(_time);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(10);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _date_utils = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DROPDOWN_FOCUS_CLASSNAMES = ['react-datepicker__year-select', 'react-datepicker__month-select'];

	var isDropdownSelect = function isDropdownSelect() {
	  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var classNames = (element.className || '').split(/\s+/);
	  return DROPDOWN_FOCUS_CLASSNAMES.some(function (testClassname) {
	    return classNames.indexOf(testClassname) >= 0;
	  });
	};

	var Calendar = function (_React$Component) {
	  _inherits(Calendar, _React$Component);

	  _createClass(Calendar, null, [{
	    key: 'defaultProps',
	    get: function get() {
	      return {
	        onDropdownFocus: function onDropdownFocus() {},
	        monthsShown: 1,
	        forceShowMonthNavigation: false
	      };
	    }
	  }]);

	  function Calendar(props) {
	    _classCallCheck(this, Calendar);

	    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

	    _this.handleClickOutside = function (event) {
	      _this.props.onClickOutside(event);
	    };

	    _this.handleDropdownFocus = function (event) {
	      if (isDropdownSelect(event.target)) {
	        _this.props.onDropdownFocus();
	      }
	    };

	    _this.getDateInView = function () {
	      var _this$props = _this.props,
	          preSelection = _this$props.preSelection,
	          selected = _this$props.selected,
	          openToDate = _this$props.openToDate,
	          utcOffset = _this$props.utcOffset;

	      var minDate = (0, _date_utils.getEffectiveMinDate)(_this.props);
	      var maxDate = (0, _date_utils.getEffectiveMaxDate)(_this.props);
	      var current = (0, _date_utils.now)(utcOffset);
	      var initialDate = openToDate || selected || preSelection;
	      if (initialDate) {
	        return initialDate;
	      } else {
	        if (minDate && (0, _date_utils.isBefore)(current, minDate)) {
	          return minDate;
	        } else if (maxDate && (0, _date_utils.isAfter)(current, maxDate)) {
	          return maxDate;
	        }
	      }
	      return current;
	    };

	    _this.localizeDate = function (date) {
	      return (0, _date_utils.localizeDate)(date, _this.props.locale);
	    };

	    _this.increaseMonth = function () {
	      _this.setState({
	        date: (0, _date_utils.addMonths)((0, _date_utils.cloneDate)(_this.state.date), 1)
	      }, function () {
	        return _this.handleMonthChange(_this.state.date);
	      });
	    };

	    _this.decreaseMonth = function () {
	      _this.setState({
	        date: (0, _date_utils.subtractMonths)((0, _date_utils.cloneDate)(_this.state.date), 1)
	      }, function () {
	        return _this.handleMonthChange(_this.state.date);
	      });
	    };

	    _this.handleDayClick = function (day, event) {
	      return _this.props.onSelect(day, event);
	    };

	    _this.handleDayMouseEnter = function (day) {
	      return _this.setState({ selectingDate: day });
	    };

	    _this.handleMonthMouseLeave = function () {
	      return _this.setState({ selectingDate: null });
	    };

	    _this.handleMonthChange = function (date) {
	      if (_this.props.onMonthChange) {
	        _this.props.onMonthChange(date);
	      }
	    };

	    _this.changeYear = function (year) {
	      _this.setState({
	        date: (0, _date_utils.setYear)((0, _date_utils.cloneDate)(_this.state.date), year)
	      });
	    };

	    _this.changeMonth = function (month) {
	      _this.setState({
	        date: (0, _date_utils.setMonth)((0, _date_utils.cloneDate)(_this.state.date), month)
	      }, function () {
	        return _this.handleMonthChange(_this.state.date);
	      });
	    };

	    _this.header = function () {
	      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.date;

	      var startOfWeek = (0, _date_utils.getStartOfWeek)((0, _date_utils.cloneDate)(date));
	      var dayNames = [];
	      if (_this.props.showWeekNumbers) {
	        dayNames.push(_react2.default.createElement(
	          'div',
	          { key: 'W', className: 'react-datepicker__day-name' },
	          _this.props.weekLabel || '#'
	        ));
	      }
	      return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
	        var day = (0, _date_utils.addDays)((0, _date_utils.cloneDate)(startOfWeek), offset);
	        var localeData = (0, _date_utils.getLocaleData)(day);
	        var weekDayName = _this.props.useWeekdaysShort ? (0, _date_utils.getWeekdayShortInLocale)(localeData, day) : (0, _date_utils.getWeekdayMinInLocale)(localeData, day);
	        return _react2.default.createElement(
	          'div',
	          { key: offset, className: 'react-datepicker__day-name' },
	          weekDayName
	        );
	      }));
	    };

	    _this.renderPreviousMonthButton = function () {
	      if (!_this.props.forceShowMonthNavigation && (0, _date_utils.allDaysDisabledBefore)(_this.state.date, 'month', _this.props)) {
	        return;
	      }
	      return _react2.default.createElement('a', {
	        className: 'react-datepicker__navigation react-datepicker__navigation--previous',
	        onClick: _this.decreaseMonth });
	    };

	    _this.renderNextMonthButton = function () {
	      if (!_this.props.forceShowMonthNavigation && (0, _date_utils.allDaysDisabledAfter)(_this.state.date, 'month', _this.props)) {
	        return;
	      }

	      var classes = ['react-datepicker__navigation', 'react-datepicker__navigation--next'];
	      if (_this.props.showTimeSelect) {
	        classes.push('react-datepicker__navigation--next--with-time');
	      }
	      if (_this.props.todayButton) {
	        classes.push('react-datepicker__navigation--next--with-today-button');
	      }

	      return _react2.default.createElement('a', {
	        className: classes.join(' '),
	        onClick: _this.increaseMonth });
	    };

	    _this.renderCurrentMonth = function () {
	      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.date;

	      var classes = ['react-datepicker__current-month'];

	      if (_this.props.showYearDropdown) {
	        classes.push('react-datepicker__current-month--hasYearDropdown');
	      }
	      if (_this.props.showMonthDropdown) {
	        classes.push('react-datepicker__current-month--hasMonthDropdown');
	      }
	      return _react2.default.createElement(
	        'div',
	        { className: classes.join(' ') },
	        (0, _date_utils.formatDate)(date, _this.props.dateFormat)
	      );
	    };

	    _this.renderYearDropdown = function () {
	      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      if (!_this.props.showYearDropdown || overrideHide) {
	        return;
	      }
	      return _react2.default.createElement(_year_dropdown2.default, {
	        dropdownMode: _this.props.dropdownMode,
	        onChange: _this.changeYear,
	        minDate: _this.props.minDate,
	        maxDate: _this.props.maxDate,
	        year: (0, _date_utils.getYear)(_this.state.date),
	        scrollableYearDropdown: _this.props.scrollableYearDropdown,
	        yearDropdownItemNumber: _this.props.yearDropdownItemNumber });
	    };

	    _this.renderMonthDropdown = function () {
	      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      if (!_this.props.showMonthDropdown) {
	        return;
	      }
	      return _react2.default.createElement(_month_dropdown2.default, {
	        dropdownMode: _this.props.dropdownMode,
	        locale: _this.props.locale,
	        dateFormat: _this.props.dateFormat,
	        onChange: _this.changeMonth,
	        month: (0, _date_utils.getMonth)(_this.state.date) });
	    };

	    _this.renderTodayButton = function () {
	      if (!_this.props.todayButton) {
	        return;
	      }
	      return _react2.default.createElement(
	        'div',
	        {
	          className: 'react-datepicker__today-button',
	          onClick: function onClick(e) {
	            return _this.props.onSelect((0, _date_utils.getStartOfDate)((0, _date_utils.now)(_this.props.utcOffset)), e);
	          } },
	        _this.props.todayButton
	      );
	    };

	    _this.renderMonths = function () {
	      var monthList = [];
	      for (var i = 0; i < _this.props.monthsShown; ++i) {
	        var monthDate = (0, _date_utils.addMonths)((0, _date_utils.cloneDate)(_this.state.date), i);
	        var monthKey = 'month-' + i;
	        monthList.push(_react2.default.createElement(
	          'div',
	          { key: monthKey, ref: function ref(div) {
	              _this.monthContainer = div;
	            }, className: 'react-datepicker__month-container' },
	          _react2.default.createElement(
	            'div',
	            { className: 'react-datepicker__header' },
	            _this.renderCurrentMonth(monthDate),
	            _react2.default.createElement(
	              'div',
	              {
	                className: 'react-datepicker__header__dropdown react-datepicker__header__dropdown--' + _this.props.dropdownMode,
	                onFocus: _this.handleDropdownFocus },
	              _this.renderMonthDropdown(i !== 0),
	              _this.renderYearDropdown(i !== 0)
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'react-datepicker__day-names' },
	              _this.header(monthDate)
	            )
	          ),
	          _react2.default.createElement(_month2.default, {
	            day: monthDate,
	            dayClassName: _this.props.dayClassName,
	            onDayClick: _this.handleDayClick,
	            onDayMouseEnter: _this.handleDayMouseEnter,
	            onMouseLeave: _this.handleMonthMouseLeave,
	            onWeekSelect: _this.props.onWeekSelect,
	            formatWeekNumber: _this.props.formatWeekNumber,
	            minDate: _this.props.minDate,
	            maxDate: _this.props.maxDate,
	            excludeDates: _this.props.excludeDates,
	            highlightDates: _this.props.highlightDates,
	            selectingDate: _this.state.selectingDate,
	            includeDates: _this.props.includeDates,
	            inline: _this.props.inline,
	            fixedHeight: _this.props.fixedHeight,
	            filterDate: _this.props.filterDate,
	            preSelection: _this.props.preSelection,
	            selected: _this.props.selected,
	            selectsStart: _this.props.selectsStart,
	            selectsEnd: _this.props.selectsEnd,
	            showWeekNumbers: _this.props.showWeekNumbers,
	            startDate: _this.props.startDate,
	            endDate: _this.props.endDate,
	            peekNextMonth: _this.props.peekNextMonth,
	            utcOffset: _this.props.utcOffset })
	        ));
	      }
	      return monthList;
	    };

	    _this.renderTimeSection = function () {
	      if (_this.props.showTimeSelect) {
	        return _react2.default.createElement(_time2.default, {
	          selected: _this.props.selected,
	          onChange: _this.props.onTimeChange,
	          format: _this.props.timeFormat,
	          intervals: _this.props.timeIntervals,
	          minTime: _this.props.minTime,
	          maxTime: _this.props.maxTime,
	          excludeTimes: _this.props.excludeTimes,
	          todayButton: _this.props.todayButton,
	          showMonthDropdown: _this.props.showMonthDropdown,
	          showYearDropdown: _this.props.showYearDropdown,
	          withPortal: _this.props.withPortal,
	          monthRef: _this.state.monthContainer });
	      } else {
	        return;
	      }
	    };

	    _this.state = {
	      date: _this.localizeDate(_this.getDateInView()),
	      selectingDate: null,
	      monthContainer: _this.monthContainer
	    };
	    return _this;
	  }

	  _createClass(Calendar, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      /* monthContainer height is needed in time component to determine the height for the ul in the time component. setState here so height is given after final component layout is rendered */
	      if (this.props.showTimeSelect) {
	        this.assignMonthContainer = function () {
	          _this2.setState({ monthContainer: _this2.monthContainer });
	        }();
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.preSelection && !(0, _date_utils.isSameDay)(nextProps.preSelection, this.props.preSelection)) {
	        this.setState({
	          date: this.localizeDate(nextProps.preSelection)
	        });
	      } else if (nextProps.openToDate && !(0, _date_utils.isSameDay)(nextProps.openToDate, this.props.openToDate)) {
	        this.setState({
	          date: this.localizeDate(nextProps.openToDate)
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: (0, _classnames2.default)('react-datepicker', this.props.className) },
	        _react2.default.createElement('div', { className: 'react-datepicker__triangle' }),
	        this.renderPreviousMonthButton(),
	        this.renderNextMonthButton(),
	        this.renderMonths(),
	        this.renderTodayButton(),
	        this.renderTimeSection(),
	        this.props.children
	      );
	    }
	  }]);

	  return Calendar;
	}(_react2.default.Component);

	Calendar.propTypes = {
	  className: _propTypes2.default.string,
	  children: _propTypes2.default.node,
	  dateFormat: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]).isRequired,
	  dayClassName: _propTypes2.default.func,
	  dropdownMode: _propTypes2.default.oneOf(['scroll', 'select']).isRequired,
	  endDate: _propTypes2.default.object,
	  excludeDates: _propTypes2.default.array,
	  filterDate: _propTypes2.default.func,
	  fixedHeight: _propTypes2.default.bool,
	  formatWeekNumber: _propTypes2.default.func,
	  highlightDates: _propTypes2.default.array,
	  includeDates: _propTypes2.default.array,
	  inline: _propTypes2.default.bool,
	  locale: _propTypes2.default.string,
	  maxDate: _propTypes2.default.object,
	  minDate: _propTypes2.default.object,
	  monthsShown: _propTypes2.default.number,
	  onClickOutside: _propTypes2.default.func.isRequired,
	  onMonthChange: _propTypes2.default.func,
	  forceShowMonthNavigation: _propTypes2.default.bool,
	  onDropdownFocus: _propTypes2.default.func,
	  onSelect: _propTypes2.default.func.isRequired,
	  onWeekSelect: _propTypes2.default.func,
	  showTimeSelect: _propTypes2.default.bool,
	  timeFormat: _propTypes2.default.string,
	  timeIntervals: _propTypes2.default.number,
	  onTimeChange: _propTypes2.default.func,
	  minTime: _propTypes2.default.object,
	  maxTime: _propTypes2.default.object,
	  excludeTimes: _propTypes2.default.array,
	  openToDate: _propTypes2.default.object,
	  peekNextMonth: _propTypes2.default.bool,
	  scrollableYearDropdown: _propTypes2.default.bool,
	  preSelection: _propTypes2.default.object,
	  selected: _propTypes2.default.object,
	  selectsEnd: _propTypes2.default.bool,
	  selectsStart: _propTypes2.default.bool,
	  showMonthDropdown: _propTypes2.default.bool,
	  showWeekNumbers: _propTypes2.default.bool,
	  showYearDropdown: _propTypes2.default.bool,
	  startDate: _propTypes2.default.object,
	  todayButton: _propTypes2.default.string,
	  useWeekdaysShort: _propTypes2.default.bool,
	  withPortal: _propTypes2.default.bool,
	  utcOffset: _propTypes2.default.number,
	  weekLabel: _propTypes2.default.string,
	  yearDropdownItemNumber: _propTypes2.default.number
	};
	exports.default = Calendar;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _year_dropdown_options = __webpack_require__(9);

	var _year_dropdown_options2 = _interopRequireDefault(_year_dropdown_options);

	var _reactOnclickoutside = __webpack_require__(11);

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

	var _date_utils = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WrappedYearDropdownOptions = (0, _reactOnclickoutside2.default)(_year_dropdown_options2.default);

	var YearDropdown = function (_React$Component) {
	  _inherits(YearDropdown, _React$Component);

	  function YearDropdown() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, YearDropdown);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YearDropdown.__proto__ || Object.getPrototypeOf(YearDropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      dropdownVisible: false
	    }, _this.renderSelectOptions = function () {
	      var minYear = _this.props.minDate ? (0, _date_utils.getYear)(_this.props.minDate) : 1900;
	      var maxYear = _this.props.maxDate ? (0, _date_utils.getYear)(_this.props.maxDate) : 2100;

	      var options = [];
	      for (var i = minYear; i <= maxYear; i++) {
	        options.push(_react2.default.createElement(
	          'option',
	          { key: i, value: i },
	          i
	        ));
	      }
	      return options;
	    }, _this.onSelectChange = function (e) {
	      _this.onChange(e.target.value);
	    }, _this.renderSelectMode = function () {
	      return _react2.default.createElement(
	        'select',
	        {
	          value: _this.props.year,
	          className: 'react-datepicker__year-select',
	          onChange: _this.onSelectChange },
	        _this.renderSelectOptions()
	      );
	    }, _this.renderReadView = function (visible) {
	      return _react2.default.createElement(
	        'div',
	        { key: 'read', style: { visibility: visible ? 'visible' : 'hidden' }, className: 'react-datepicker__year-read-view', onClick: _this.toggleDropdown },
	        _react2.default.createElement('span', { className: 'react-datepicker__year-read-view--down-arrow' }),
	        _react2.default.createElement(
	          'span',
	          { className: 'react-datepicker__year-read-view--selected-year' },
	          _this.props.year
	        )
	      );
	    }, _this.renderDropdown = function () {
	      return _react2.default.createElement(WrappedYearDropdownOptions, {
	        key: 'dropdown',
	        ref: 'options',
	        year: _this.props.year,
	        onChange: _this.onChange,
	        onCancel: _this.toggleDropdown,
	        minDate: _this.props.minDate,
	        maxDate: _this.props.maxDate,
	        scrollableYearDropdown: _this.props.scrollableYearDropdown,
	        yearDropdownItemNumber: _this.props.yearDropdownItemNumber });
	    }, _this.renderScrollMode = function () {
	      var dropdownVisible = _this.state.dropdownVisible;

	      var result = [_this.renderReadView(!dropdownVisible)];
	      if (dropdownVisible) {
	        result.unshift(_this.renderDropdown());
	      }
	      return result;
	    }, _this.onChange = function (year) {
	      _this.toggleDropdown();
	      if (year === _this.props.year) return;
	      _this.props.onChange(year);
	    }, _this.toggleDropdown = function () {
	      _this.setState({
	        dropdownVisible: !_this.state.dropdownVisible
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(YearDropdown, [{
	    key: 'render',
	    value: function render() {
	      var renderedDropdown = void 0;
	      switch (this.props.dropdownMode) {
	        case 'scroll':
	          renderedDropdown = this.renderScrollMode();
	          break;
	        case 'select':
	          renderedDropdown = this.renderSelectMode();
	          break;
	      }

	      return _react2.default.createElement(
	        'div',
	        {
	          className: 'react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--' + this.props.dropdownMode },
	        renderedDropdown
	      );
	    }
	  }]);

	  return YearDropdown;
	}(_react2.default.Component);

	YearDropdown.propTypes = {
	  dropdownMode: _propTypes2.default.oneOf(['scroll', 'select']).isRequired,
	  maxDate: _propTypes2.default.object,
	  minDate: _propTypes2.default.object,
	  onChange: _propTypes2.default.func.isRequired,
	  scrollableYearDropdown: _propTypes2.default.bool,
	  year: _propTypes2.default.number.isRequired,
	  yearDropdownItemNumber: _propTypes2.default.number
	};
	exports.default = YearDropdown;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	if (false) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(5)();
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(6);
	var invariant = __webpack_require__(7);
	var ReactPropTypesSecret = __webpack_require__(8);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (false) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(10);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function generateYears(year, noOfYear, minDate, maxDate) {
	  var list = [];
	  for (var i = 0; i < 2 * noOfYear + 1; i++) {
	    var newYear = year + noOfYear - i;
	    var isInRange = true;

	    if (minDate) {
	      isInRange = minDate.year() <= newYear;
	    }

	    if (maxDate && isInRange) {
	      isInRange = maxDate.year() >= newYear;
	    }

	    if (isInRange) {
	      list.push(newYear);
	    }
	  }

	  return list;
	}

	var YearDropdownOptions = function (_React$Component) {
	  _inherits(YearDropdownOptions, _React$Component);

	  function YearDropdownOptions(props) {
	    _classCallCheck(this, YearDropdownOptions);

	    var _this = _possibleConstructorReturn(this, (YearDropdownOptions.__proto__ || Object.getPrototypeOf(YearDropdownOptions)).call(this, props));

	    _this.renderOptions = function () {
	      var selectedYear = _this.props.year;
	      var options = _this.state.yearsList.map(function (year) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'react-datepicker__year-option',
	            key: year,
	            ref: year,
	            onClick: _this.onChange.bind(_this, year) },
	          selectedYear === year ? _react2.default.createElement(
	            'span',
	            { className: 'react-datepicker__year-option--selected' },
	            '\u2713'
	          ) : '',
	          year
	        );
	      });

	      var minYear = _this.props.minDate ? _this.props.minDate.year() : null;
	      var maxYear = _this.props.maxDate ? _this.props.maxDate.year() : null;

	      if (!maxYear || !_this.state.yearsList.find(function (year) {
	        return year === maxYear;
	      })) {
	        options.unshift(_react2.default.createElement(
	          'div',
	          { className: 'react-datepicker__year-option',
	            ref: 'upcoming',
	            key: 'upcoming',
	            onClick: _this.incrementYears },
	          _react2.default.createElement('a', { className: 'react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming' })
	        ));
	      }

	      if (!minYear || !_this.state.yearsList.find(function (year) {
	        return year === minYear;
	      })) {
	        options.push(_react2.default.createElement(
	          'div',
	          { className: 'react-datepicker__year-option',
	            ref: 'previous',
	            key: 'previous',
	            onClick: _this.decrementYears },
	          _react2.default.createElement('a', { className: 'react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous' })
	        ));
	      }

	      return options;
	    };

	    _this.onChange = function (year) {
	      _this.props.onChange(year);
	    };

	    _this.handleClickOutside = function () {
	      _this.props.onCancel();
	    };

	    _this.shiftYears = function (amount) {
	      var years = _this.state.yearsList.map(function (year) {
	        return year + amount;
	      });

	      _this.setState({
	        yearsList: years
	      });
	    };

	    _this.incrementYears = function () {
	      return _this.shiftYears(1);
	    };

	    _this.decrementYears = function () {
	      return _this.shiftYears(-1);
	    };

	    var yearDropdownItemNumber = props.yearDropdownItemNumber,
	        scrollableYearDropdown = props.scrollableYearDropdown;

	    var noOfYear = yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);

	    _this.state = {
	      yearsList: generateYears(_this.props.year, noOfYear, _this.props.minDate, _this.props.maxDate)
	    };
	    return _this;
	  }

	  _createClass(YearDropdownOptions, [{
	    key: 'render',
	    value: function render() {
	      var dropdownClass = (0, _classnames2.default)({
	        'react-datepicker__year-dropdown': true,
	        'react-datepicker__year-dropdown--scrollable': this.props.scrollableYearDropdown
	      });

	      return _react2.default.createElement(
	        'div',
	        { className: dropdownClass },
	        this.renderOptions()
	      );
	    }
	  }]);

	  return YearDropdownOptions;
	}(_react2.default.Component);

	YearDropdownOptions.propTypes = {
	  minDate: _propTypes2.default.object,
	  maxDate: _propTypes2.default.object,
	  onCancel: _propTypes2.default.func.isRequired,
	  onChange: _propTypes2.default.func.isRequired,
	  scrollableYearDropdown: _propTypes2.default.bool,
	  year: _propTypes2.default.number.isRequired,
	  yearDropdownItemNumber: _propTypes2.default.number
	};
	exports.default = YearDropdownOptions;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.newDate = newDate;
	exports.newDateWithOffset = newDateWithOffset;
	exports.now = now;
	exports.cloneDate = cloneDate;
	exports.parseDate = parseDate;
	exports.isMoment = isMoment;
	exports.isDate = isDate;
	exports.formatDate = formatDate;
	exports.safeDateFormat = safeDateFormat;
	exports.setTime = setTime;
	exports.setMonth = setMonth;
	exports.setYear = setYear;
	exports.setUTCOffset = setUTCOffset;
	exports.getSecond = getSecond;
	exports.getMinute = getMinute;
	exports.getHour = getHour;
	exports.getDay = getDay;
	exports.getWeek = getWeek;
	exports.getMonth = getMonth;
	exports.getYear = getYear;
	exports.getDate = getDate;
	exports.getUTCOffset = getUTCOffset;
	exports.getDayOfWeekCode = getDayOfWeekCode;
	exports.getStartOfDay = getStartOfDay;
	exports.getStartOfWeek = getStartOfWeek;
	exports.getStartOfMonth = getStartOfMonth;
	exports.getStartOfDate = getStartOfDate;
	exports.getEndOfWeek = getEndOfWeek;
	exports.getEndOfMonth = getEndOfMonth;
	exports.addMinutes = addMinutes;
	exports.addDays = addDays;
	exports.addWeeks = addWeeks;
	exports.addMonths = addMonths;
	exports.addYears = addYears;
	exports.subtractDays = subtractDays;
	exports.subtractWeeks = subtractWeeks;
	exports.subtractMonths = subtractMonths;
	exports.subtractYears = subtractYears;
	exports.isBefore = isBefore;
	exports.isAfter = isAfter;
	exports.equals = equals;
	exports.isSameMonth = isSameMonth;
	exports.isSameDay = isSameDay;
	exports.isSameUtcOffset = isSameUtcOffset;
	exports.isDayInRange = isDayInRange;
	exports.getDaysDiff = getDaysDiff;
	exports.localizeDate = localizeDate;
	exports.getDefaultLocale = getDefaultLocale;
	exports.getDefaultLocaleData = getDefaultLocaleData;
	exports.registerLocale = registerLocale;
	exports.getLocaleData = getLocaleData;
	exports.getLocaleDataForLocale = getLocaleDataForLocale;
	exports.getWeekdayMinInLocale = getWeekdayMinInLocale;
	exports.getWeekdayShortInLocale = getWeekdayShortInLocale;
	exports.getMonthInLocale = getMonthInLocale;
	exports.isDayDisabled = isDayDisabled;
	exports.isTimeDisabled = isTimeDisabled;
	exports.isTimeInDisabledRange = isTimeInDisabledRange;
	exports.allDaysDisabledBefore = allDaysDisabledBefore;
	exports.allDaysDisabledAfter = allDaysDisabledAfter;
	exports.getEffectiveMinDate = getEffectiveMinDate;
	exports.getEffectiveMaxDate = getEffectiveMaxDate;

	var _moment = __webpack_require__(13);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dayOfWeekCodes = {
	  1: 'mon',
	  2: 'tue',
	  3: 'wed',
	  4: 'thu',
	  5: 'fri',
	  6: 'sat',
	  7: 'sun'

	  // These functions are not exported so
	  // that we avoid magic strings like 'days'
	};function set(date, unit, to) {
	  return date.set(unit, to);
	}

	function add(date, amount, unit) {
	  return date.add(amount, unit);
	}

	function subtract(date, amount, unit) {
	  return date.subtract(amount, unit);
	}

	function get(date, unit) {
	  return date.get(unit);
	}

	function getStartOf(date, unit) {
	  return date.startOf(unit);
	}

	function getEndOf(date, unit) {
	  return date.endOf(unit);
	}

	function getDiff(date1, date2, unit) {
	  return date1.diff(date2, unit);
	}

	function isSame(date1, date2, unit) {
	  return date1.isSame(date2, unit);
	}

	// ** Date Constructors **

	function newDate(point) {
	  return (0, _moment2.default)(point);
	}

	function newDateWithOffset(utcOffset) {
	  return (0, _moment2.default)().utc().utcOffset(utcOffset);
	}

	function now(maybeFixedUtcOffset) {
	  if (maybeFixedUtcOffset == null) {
	    return newDate();
	  }
	  return newDateWithOffset(maybeFixedUtcOffset);
	}

	function cloneDate(date) {
	  return date.clone();
	}

	function parseDate(value, _ref) {
	  var dateFormat = _ref.dateFormat,
	      locale = _ref.locale;

	  var m = (0, _moment2.default)(value, dateFormat, locale || _moment2.default.locale(), true);
	  return m.isValid() ? m : null;
	}

	// ** Date "Reflection" **

	function isMoment(date) {
	  return _moment2.default.isMoment(date);
	}

	function isDate(date) {
	  return _moment2.default.isDate(date);
	}

	// ** Date Formatting **

	function formatDate(date, format) {
	  return date.format(format);
	}

	function safeDateFormat(date, _ref2) {
	  var dateFormat = _ref2.dateFormat,
	      locale = _ref2.locale;

	  return date && date.clone().locale(locale || _moment2.default.locale()).format(Array.isArray(dateFormat) ? dateFormat[0] : dateFormat) || '';
	}

	// ** Date Setters **

	function setTime(date, _ref3) {
	  var hour = _ref3.hour,
	      minute = _ref3.minute,
	      second = _ref3.second;

	  date.set({ hour: hour, minute: minute, second: second });
	  return date;
	}

	function setMonth(date, month) {
	  return set(date, 'month', month);
	}

	function setYear(date, year) {
	  return set(date, 'year', year);
	}

	function setUTCOffset(date, offset) {
	  return date.utcOffset(offset);
	}

	// ** Date Getters **

	function getSecond(date) {
	  return get(date, 'second');
	}

	function getMinute(date) {
	  return get(date, 'minute');
	}

	function getHour(date) {
	  return get(date, 'hour');
	}

	// Returns day of week
	function getDay(date) {
	  return get(date, 'day');
	}

	function getWeek(date) {
	  return get(date, 'week');
	}

	function getMonth(date) {
	  return get(date, 'month');
	}

	function getYear(date) {
	  return get(date, 'year');
	}

	// Returns day of month
	function getDate(date) {
	  return get(date, 'date');
	}

	function getUTCOffset() {
	  return (0, _moment2.default)().utcOffset();
	}

	function getDayOfWeekCode(day) {
	  return dayOfWeekCodes[day.isoWeekday()];
	}

	// *** Start of ***

	function getStartOfDay(date) {
	  return getStartOf(date, 'day');
	}

	function getStartOfWeek(date) {
	  return getStartOf(date, 'week');
	}
	function getStartOfMonth(date) {
	  return getStartOf(date, 'month');
	}

	function getStartOfDate(date) {
	  return getStartOf(date, 'date');
	}

	// *** End of ***

	function getEndOfWeek(date) {
	  return getEndOf(date, 'week');
	}

	function getEndOfMonth(date) {
	  return getEndOf(date, 'month');
	}

	// ** Date Math **

	// *** Addition ***

	function addMinutes(date, amount) {
	  return add(date, amount, 'minutes');
	}

	function addDays(date, amount) {
	  return add(date, amount, 'days');
	}

	function addWeeks(date, amount) {
	  return add(date, amount, 'weeks');
	}

	function addMonths(date, amount) {
	  return add(date, amount, 'months');
	}

	function addYears(date, amount) {
	  return add(date, amount, 'years');
	}

	// *** Subtraction ***
	function subtractDays(date, amount) {
	  return subtract(date, amount, 'days');
	}

	function subtractWeeks(date, amount) {
	  return subtract(date, amount, 'weeks');
	}

	function subtractMonths(date, amount) {
	  return subtract(date, amount, 'months');
	}

	function subtractYears(date, amount) {
	  return subtract(date, amount, 'years');
	}

	// ** Date Comparison **

	function isBefore(date1, date2) {
	  return date1.isBefore(date2);
	}

	function isAfter(date1, date2) {
	  return date1.isAfter(date2);
	}

	function equals(date1, date2) {
	  return date1.isSame(date2);
	}

	function isSameMonth(date1, date2) {
	  return isSame(date1, date2, 'month');
	}

	function isSameDay(moment1, moment2) {
	  if (moment1 && moment2) {
	    return moment1.isSame(moment2, 'day');
	  } else {
	    return !moment1 && !moment2;
	  }
	}

	function isSameUtcOffset(moment1, moment2) {
	  if (moment1 && moment2) {
	    return moment1.utcOffset() === moment2.utcOffset();
	  } else {
	    return !moment1 && !moment2;
	  }
	}

	function isDayInRange(day, startDate, endDate) {
	  var before = startDate.clone().startOf('day').subtract(1, 'seconds');
	  var after = endDate.clone().startOf('day').add(1, 'seconds');
	  return day.clone().startOf('day').isBetween(before, after);
	}

	// *** Diffing ***

	function getDaysDiff(date1, date2) {
	  return getDiff(date1, date2, 'days');
	}

	// ** Date Localization **

	function localizeDate(date, locale) {
	  return date.clone().locale(locale || _moment2.default.locale());
	}

	function getDefaultLocale() {
	  return _moment2.default.locale();
	}

	function getDefaultLocaleData() {
	  return _moment2.default.localeData();
	}

	function registerLocale(localeName, localeData) {
	  _moment2.default.defineLocale(localeName, localeData);
	}

	function getLocaleData(date) {
	  return date.localeData();
	}

	function getLocaleDataForLocale(locale) {
	  return _moment2.default.localeData(locale);
	}

	function getWeekdayMinInLocale(locale, date) {
	  return locale.weekdaysMin(date);
	}

	function getWeekdayShortInLocale(locale, date) {
	  return locale.weekdaysShort(date);
	}

	// TODO what is this format exactly?
	function getMonthInLocale(locale, date, format) {
	  return locale.months(date, format);
	}

	// ** Utils for some components **

	function isDayDisabled(day) {
	  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      minDate = _ref4.minDate,
	      maxDate = _ref4.maxDate,
	      excludeDates = _ref4.excludeDates,
	      includeDates = _ref4.includeDates,
	      filterDate = _ref4.filterDate;

	  return minDate && day.isBefore(minDate, 'day') || maxDate && day.isAfter(maxDate, 'day') || excludeDates && excludeDates.some(function (excludeDate) {
	    return isSameDay(day, excludeDate);
	  }) || includeDates && !includeDates.some(function (includeDate) {
	    return isSameDay(day, includeDate);
	  }) || filterDate && !filterDate(day.clone()) || false;
	}

	function isTimeDisabled(time, disabledTimes) {
	  var l = disabledTimes.length;
	  for (var i = 0; i < l; i++) {
	    if (disabledTimes[i].get('hours') === time.get('hours') && disabledTimes[i].get('minutes') === time.get('minutes')) {
	      return true;
	    }
	  }

	  return false;
	}

	function isTimeInDisabledRange(time, _ref5) {
	  var minTime = _ref5.minTime,
	      maxTime = _ref5.maxTime;

	  if (!minTime || !maxTime) {
	    throw new Error('Both minTime and maxTime props required');
	  }

	  var base = (0, _moment2.default)().hours(0).minutes(0).seconds(0);
	  var baseTime = base.clone().hours(time.get('hours')).minutes(time.get('minutes'));
	  var min = base.clone().hours(minTime.get('hours')).minutes(minTime.get('minutes'));
	  var max = base.clone().hours(maxTime.get('hours')).minutes(maxTime.get('minutes'));

	  return !(baseTime.isSameOrAfter(min) && baseTime.isSameOrBefore(max));
	}

	function allDaysDisabledBefore(day, unit) {
	  var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      minDate = _ref6.minDate,
	      includeDates = _ref6.includeDates;

	  var dateBefore = day.clone().subtract(1, unit);
	  return minDate && dateBefore.isBefore(minDate, unit) || includeDates && includeDates.every(function (includeDate) {
	    return dateBefore.isBefore(includeDate, unit);
	  }) || false;
	}

	function allDaysDisabledAfter(day, unit) {
	  var _ref7 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      maxDate = _ref7.maxDate,
	      includeDates = _ref7.includeDates;

	  var dateAfter = day.clone().add(1, unit);
	  return maxDate && dateAfter.isAfter(maxDate, unit) || includeDates && includeDates.every(function (includeDate) {
	    return dateAfter.isAfter(includeDate, unit);
	  }) || false;
	}

	function getEffectiveMinDate(_ref8) {
	  var minDate = _ref8.minDate,
	      includeDates = _ref8.includeDates;

	  if (includeDates && minDate) {
	    return _moment2.default.min(includeDates.filter(function (includeDate) {
	      return minDate.isSameOrBefore(includeDate, 'day');
	    }));
	  } else if (includeDates) {
	    return _moment2.default.min(includeDates);
	  } else {
	    return minDate;
	  }
	}

	function getEffectiveMaxDate(_ref9) {
	  var maxDate = _ref9.maxDate,
	      includeDates = _ref9.includeDates;

	  if (includeDates && maxDate) {
	    return _moment2.default.max(includeDates.filter(function (includeDate) {
	      return maxDate.isSameOrAfter(includeDate, 'day');
	    }));
	  } else if (includeDates) {
	    return _moment2.default.max(includeDates);
	  } else {
	    return maxDate;
	  }
	}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _month_dropdown_options = __webpack_require__(15);

	var _month_dropdown_options2 = _interopRequireDefault(_month_dropdown_options);

	var _reactOnclickoutside = __webpack_require__(11);

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

	var _date_utils = __webpack_require__(12);

	var utils = _interopRequireWildcard(_date_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WrappedMonthDropdownOptions = (0, _reactOnclickoutside2.default)(_month_dropdown_options2.default);

	var MonthDropdown = function (_React$Component) {
	  _inherits(MonthDropdown, _React$Component);

	  function MonthDropdown() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, MonthDropdown);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MonthDropdown.__proto__ || Object.getPrototypeOf(MonthDropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      dropdownVisible: false
	    }, _this.renderSelectOptions = function (monthNames) {
	      return monthNames.map(function (M, i) {
	        return _react2.default.createElement(
	          'option',
	          { key: i, value: i },
	          M
	        );
	      });
	    }, _this.renderSelectMode = function (monthNames) {
	      return _react2.default.createElement(
	        'select',
	        { value: _this.props.month, className: 'react-datepicker__month-select', onChange: function onChange(e) {
	            return _this.onChange(e.target.value);
	          } },
	        _this.renderSelectOptions(monthNames)
	      );
	    }, _this.renderReadView = function (visible, monthNames) {
	      return _react2.default.createElement(
	        'div',
	        { key: 'read', style: { visibility: visible ? 'visible' : 'hidden' }, className: 'react-datepicker__month-read-view', onClick: _this.toggleDropdown },
	        _react2.default.createElement(
	          'span',
	          { className: 'react-datepicker__month-read-view--selected-month' },
	          monthNames[_this.props.month]
	        ),
	        _react2.default.createElement('span', { className: 'react-datepicker__month-read-view--down-arrow' })
	      );
	    }, _this.renderDropdown = function (monthNames) {
	      return _react2.default.createElement(WrappedMonthDropdownOptions, {
	        key: 'dropdown',
	        ref: 'options',
	        month: _this.props.month,
	        monthNames: monthNames,
	        onChange: _this.onChange,
	        onCancel: _this.toggleDropdown });
	    }, _this.renderScrollMode = function (monthNames) {
	      var dropdownVisible = _this.state.dropdownVisible;

	      var result = [_this.renderReadView(!dropdownVisible, monthNames)];
	      if (dropdownVisible) {
	        result.unshift(_this.renderDropdown(monthNames));
	      }
	      return result;
	    }, _this.onChange = function (month) {
	      _this.toggleDropdown();
	      if (month !== _this.props.month) {
	        _this.props.onChange(month);
	      }
	    }, _this.toggleDropdown = function () {
	      return _this.setState({
	        dropdownVisible: !_this.state.dropdownVisible
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(MonthDropdown, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var localeData = utils.getLocaleDataForLocale(this.props.locale);
	      var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (M) {
	        return utils.getMonthInLocale(localeData, utils.newDate({ M: M }), _this2.props.dateFormat);
	      });

	      var renderedDropdown = void 0;
	      switch (this.props.dropdownMode) {
	        case 'scroll':
	          renderedDropdown = this.renderScrollMode(monthNames);
	          break;
	        case 'select':
	          renderedDropdown = this.renderSelectMode(monthNames);
	          break;
	      }

	      return _react2.default.createElement(
	        'div',
	        {
	          className: 'react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--' + this.props.dropdownMode },
	        renderedDropdown
	      );
	    }
	  }]);

	  return MonthDropdown;
	}(_react2.default.Component);

	MonthDropdown.propTypes = {
	  dropdownMode: _propTypes2.default.oneOf(['scroll', 'select']).isRequired,
	  locale: _propTypes2.default.string,
	  dateFormat: _propTypes2.default.string.isRequired,
	  month: _propTypes2.default.number.isRequired,
	  onChange: _propTypes2.default.func.isRequired
	};
	exports.default = MonthDropdown;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MonthDropdownOptions = function (_React$Component) {
	  _inherits(MonthDropdownOptions, _React$Component);

	  function MonthDropdownOptions() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, MonthDropdownOptions);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MonthDropdownOptions.__proto__ || Object.getPrototypeOf(MonthDropdownOptions)).call.apply(_ref, [this].concat(args))), _this), _this.renderOptions = function () {
	      return _this.props.monthNames.map(function (month, i) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'react-datepicker__month-option',
	            key: month,
	            ref: month,
	            onClick: _this.onChange.bind(_this, i) },
	          _this.props.month === i ? _react2.default.createElement(
	            'span',
	            { className: 'react-datepicker__month-option--selected' },
	            '\u2713'
	          ) : '',
	          month
	        );
	      });
	    }, _this.onChange = function (month) {
	      return _this.props.onChange(month);
	    }, _this.handleClickOutside = function () {
	      return _this.props.onCancel();
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(MonthDropdownOptions, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'react-datepicker__month-dropdown' },
	        this.renderOptions()
	      );
	    }
	  }]);

	  return MonthDropdownOptions;
	}(_react2.default.Component);

	MonthDropdownOptions.propTypes = {
	  onCancel: _propTypes2.default.func.isRequired,
	  onChange: _propTypes2.default.func.isRequired,
	  month: _propTypes2.default.number.isRequired,
	  monthNames: _propTypes2.default.arrayOf(_propTypes2.default.string.isRequired).isRequired
	};
	exports.default = MonthDropdownOptions;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(10);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _week = __webpack_require__(17);

	var _week2 = _interopRequireDefault(_week);

	var _date_utils = __webpack_require__(12);

	var utils = _interopRequireWildcard(_date_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;

	var Month = function (_React$Component) {
	  _inherits(Month, _React$Component);

	  function Month() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Month);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Month.__proto__ || Object.getPrototypeOf(Month)).call.apply(_ref, [this].concat(args))), _this), _this.handleDayClick = function (day, event) {
	      if (_this.props.onDayClick) {
	        _this.props.onDayClick(day, event);
	      }
	    }, _this.handleDayMouseEnter = function (day) {
	      if (_this.props.onDayMouseEnter) {
	        _this.props.onDayMouseEnter(day);
	      }
	    }, _this.handleMouseLeave = function () {
	      if (_this.props.onMouseLeave) {
	        _this.props.onMouseLeave();
	      }
	    }, _this.isWeekInMonth = function (startOfWeek) {
	      var day = _this.props.day;
	      var endOfWeek = utils.addDays(utils.cloneDate(startOfWeek), 6);
	      return utils.isSameMonth(startOfWeek, day) || utils.isSameMonth(endOfWeek, day);
	    }, _this.renderWeeks = function () {
	      var weeks = [];
	      var isFixedHeight = _this.props.fixedHeight;
	      var currentWeekStart = utils.getStartOfWeek(utils.getStartOfMonth(utils.cloneDate(_this.props.day)));
	      var i = 0;
	      var breakAfterNextPush = false;

	      while (true) {
	        weeks.push(_react2.default.createElement(_week2.default, {
	          key: i,
	          day: currentWeekStart,
	          month: utils.getMonth(_this.props.day),
	          onDayClick: _this.handleDayClick,
	          onDayMouseEnter: _this.handleDayMouseEnter,
	          onWeekSelect: _this.props.onWeekSelect,
	          formatWeekNumber: _this.props.formatWeekNumber,
	          minDate: _this.props.minDate,
	          maxDate: _this.props.maxDate,
	          excludeDates: _this.props.excludeDates,
	          includeDates: _this.props.includeDates,
	          inline: _this.props.inline,
	          highlightDates: _this.props.highlightDates,
	          selectingDate: _this.props.selectingDate,
	          filterDate: _this.props.filterDate,
	          preSelection: _this.props.preSelection,
	          selected: _this.props.selected,
	          selectsStart: _this.props.selectsStart,
	          selectsEnd: _this.props.selectsEnd,
	          showWeekNumber: _this.props.showWeekNumbers,
	          startDate: _this.props.startDate,
	          endDate: _this.props.endDate,
	          dayClassName: _this.props.dayClassName,
	          utcOffset: _this.props.utcOffset }));

	        if (breakAfterNextPush) break;

	        i++;
	        currentWeekStart = utils.addWeeks(utils.cloneDate(currentWeekStart), 1);

	        // If one of these conditions is true, we will either break on this week
	        // or break on the next week
	        var isFixedAndFinalWeek = isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT;
	        var isNonFixedAndOutOfMonth = !isFixedHeight && !_this.isWeekInMonth(currentWeekStart);

	        if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
	          if (_this.props.peekNextMonth) {
	            breakAfterNextPush = true;
	          } else {
	            break;
	          }
	        }
	      }

	      return weeks;
	    }, _this.getClassNames = function () {
	      var _this$props = _this.props,
	          selectingDate = _this$props.selectingDate,
	          selectsStart = _this$props.selectsStart,
	          selectsEnd = _this$props.selectsEnd;

	      return (0, _classnames2.default)('react-datepicker__month', {
	        'react-datepicker__month--selecting-range': selectingDate && (selectsStart || selectsEnd)
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Month, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: this.getClassNames(), onMouseLeave: this.handleMouseLeave, role: 'listbox' },
	        this.renderWeeks()
	      );
	    }
	  }]);

	  return Month;
	}(_react2.default.Component);

	Month.propTypes = {
	  day: _propTypes2.default.object.isRequired,
	  dayClassName: _propTypes2.default.func,
	  endDate: _propTypes2.default.object,
	  excludeDates: _propTypes2.default.array,
	  filterDate: _propTypes2.default.func,
	  fixedHeight: _propTypes2.default.bool,
	  formatWeekNumber: _propTypes2.default.func,
	  highlightDates: _propTypes2.default.array,
	  includeDates: _propTypes2.default.array,
	  inline: _propTypes2.default.bool,
	  maxDate: _propTypes2.default.object,
	  minDate: _propTypes2.default.object,
	  onDayClick: _propTypes2.default.func,
	  onDayMouseEnter: _propTypes2.default.func,
	  onMouseLeave: _propTypes2.default.func,
	  onWeekSelect: _propTypes2.default.func,
	  peekNextMonth: _propTypes2.default.bool,
	  preSelection: _propTypes2.default.object,
	  selected: _propTypes2.default.object,
	  selectingDate: _propTypes2.default.object,
	  selectsEnd: _propTypes2.default.bool,
	  selectsStart: _propTypes2.default.bool,
	  showWeekNumbers: _propTypes2.default.bool,
	  startDate: _propTypes2.default.object,
	  utcOffset: _propTypes2.default.number
	};
	exports.default = Month;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _day = __webpack_require__(18);

	var _day2 = _interopRequireDefault(_day);

	var _week_number = __webpack_require__(19);

	var _week_number2 = _interopRequireDefault(_week_number);

	var _date_utils = __webpack_require__(12);

	var utils = _interopRequireWildcard(_date_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Week = function (_React$Component) {
	  _inherits(Week, _React$Component);

	  function Week() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Week);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Week.__proto__ || Object.getPrototypeOf(Week)).call.apply(_ref, [this].concat(args))), _this), _this.handleDayClick = function (day, event) {
	      if (_this.props.onDayClick) {
	        _this.props.onDayClick(day, event);
	      }
	    }, _this.handleDayMouseEnter = function (day) {
	      if (_this.props.onDayMouseEnter) {
	        _this.props.onDayMouseEnter(day);
	      }
	    }, _this.handleWeekClick = function (day, weekNumber, event) {
	      if (typeof _this.props.onWeekSelect === 'function') {
	        _this.props.onWeekSelect(day, weekNumber, event);
	      }
	    }, _this.formatWeekNumber = function (startOfWeek) {
	      if (_this.props.formatWeekNumber) {
	        return _this.props.formatWeekNumber(startOfWeek);
	      }
	      return utils.getWeek(startOfWeek);
	    }, _this.renderDays = function () {
	      var startOfWeek = utils.getStartOfWeek(utils.cloneDate(_this.props.day));
	      var days = [];
	      var weekNumber = _this.formatWeekNumber(startOfWeek);
	      if (_this.props.showWeekNumber) {
	        var onClickAction = _this.props.onWeekSelect ? _this.handleWeekClick.bind(_this, startOfWeek, weekNumber) : undefined;
	        days.push(_react2.default.createElement(_week_number2.default, { key: 'W', weekNumber: weekNumber, onClick: onClickAction }));
	      }
	      return days.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
	        var day = utils.addDays(utils.cloneDate(startOfWeek), offset);
	        return _react2.default.createElement(_day2.default, {
	          key: offset,
	          day: day,
	          month: _this.props.month,
	          onClick: _this.handleDayClick.bind(_this, day),
	          onMouseEnter: _this.handleDayMouseEnter.bind(_this, day),
	          minDate: _this.props.minDate,
	          maxDate: _this.props.maxDate,
	          excludeDates: _this.props.excludeDates,
	          includeDates: _this.props.includeDates,
	          inline: _this.props.inline,
	          highlightDates: _this.props.highlightDates,
	          selectingDate: _this.props.selectingDate,
	          filterDate: _this.props.filterDate,
	          preSelection: _this.props.preSelection,
	          selected: _this.props.selected,
	          selectsStart: _this.props.selectsStart,
	          selectsEnd: _this.props.selectsEnd,
	          startDate: _this.props.startDate,
	          endDate: _this.props.endDate,
	          dayClassName: _this.props.dayClassName,
	          utcOffset: _this.props.utcOffset });
	      }));
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Week, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'react-datepicker__week' },
	        this.renderDays()
	      );
	    }
	  }]);

	  return Week;
	}(_react2.default.Component);

	Week.propTypes = {
	  day: _propTypes2.default.object.isRequired,
	  dayClassName: _propTypes2.default.func,
	  endDate: _propTypes2.default.object,
	  excludeDates: _propTypes2.default.array,
	  filterDate: _propTypes2.default.func,
	  formatWeekNumber: _propTypes2.default.func,
	  highlightDates: _propTypes2.default.array,
	  includeDates: _propTypes2.default.array,
	  inline: _propTypes2.default.bool,
	  maxDate: _propTypes2.default.object,
	  minDate: _propTypes2.default.object,
	  month: _propTypes2.default.number,
	  onDayClick: _propTypes2.default.func,
	  onDayMouseEnter: _propTypes2.default.func,
	  onWeekSelect: _propTypes2.default.func,
	  preSelection: _propTypes2.default.object,
	  selected: _propTypes2.default.object,
	  selectingDate: _propTypes2.default.object,
	  selectsEnd: _propTypes2.default.bool,
	  selectsStart: _propTypes2.default.bool,
	  showWeekNumber: _propTypes2.default.bool,
	  startDate: _propTypes2.default.object,
	  utcOffset: _propTypes2.default.number
	};
	exports.default = Week;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(10);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _date_utils = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Day = function (_React$Component) {
	  _inherits(Day, _React$Component);

	  function Day() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Day);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Day.__proto__ || Object.getPrototypeOf(Day)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
	      if (!_this.isDisabled() && _this.props.onClick) {
	        _this.props.onClick(event);
	      }
	    }, _this.handleMouseEnter = function (event) {
	      if (!_this.isDisabled() && _this.props.onMouseEnter) {
	        _this.props.onMouseEnter(event);
	      }
	    }, _this.isSameDay = function (other) {
	      return (0, _date_utils.isSameDay)(_this.props.day, other);
	    }, _this.isKeyboardSelected = function () {
	      return !_this.props.inline && !_this.isSameDay(_this.props.selected) && _this.isSameDay(_this.props.preSelection);
	    }, _this.isDisabled = function () {
	      return (0, _date_utils.isDayDisabled)(_this.props.day, _this.props);
	    }, _this.getHighLightedClass = function (defaultClassName) {
	      var _this$props = _this.props,
	          day = _this$props.day,
	          highlightDates = _this$props.highlightDates;


	      if (!highlightDates) {
	        return _defineProperty({}, defaultClassName, false);
	      }

	      var classNames = {};
	      for (var i = 0, len = highlightDates.length; i < len; i++) {
	        var obj = highlightDates[i];
	        if ((0, _date_utils.isMoment)(obj)) {
	          if ((0, _date_utils.isSameDay)(day, obj)) {
	            classNames[defaultClassName] = true;
	          }
	        } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	          var keys = Object.keys(obj);
	          var arr = obj[keys[0]];
	          if (typeof keys[0] === 'string' && arr.constructor === Array) {
	            for (var k = 0, _len2 = arr.length; k < _len2; k++) {
	              if ((0, _date_utils.isSameDay)(day, arr[k])) {
	                classNames[keys[0]] = true;
	              }
	            }
	          }
	        }
	      }

	      return classNames;
	    }, _this.isInRange = function () {
	      var _this$props2 = _this.props,
	          day = _this$props2.day,
	          startDate = _this$props2.startDate,
	          endDate = _this$props2.endDate;

	      if (!startDate || !endDate) {
	        return false;
	      }
	      return (0, _date_utils.isDayInRange)(day, startDate, endDate);
	    }, _this.isInSelectingRange = function () {
	      var _this$props3 = _this.props,
	          day = _this$props3.day,
	          selectsStart = _this$props3.selectsStart,
	          selectsEnd = _this$props3.selectsEnd,
	          selectingDate = _this$props3.selectingDate,
	          startDate = _this$props3.startDate,
	          endDate = _this$props3.endDate;


	      if (!(selectsStart || selectsEnd) || !selectingDate || _this.isDisabled()) {
	        return false;
	      }

	      if (selectsStart && endDate && selectingDate.isSameOrBefore(endDate)) {
	        return (0, _date_utils.isDayInRange)(day, selectingDate, endDate);
	      }

	      if (selectsEnd && startDate && selectingDate.isSameOrAfter(startDate)) {
	        return (0, _date_utils.isDayInRange)(day, startDate, selectingDate);
	      }

	      return false;
	    }, _this.isSelectingRangeStart = function () {
	      if (!_this.isInSelectingRange()) {
	        return false;
	      }

	      var _this$props4 = _this.props,
	          day = _this$props4.day,
	          selectingDate = _this$props4.selectingDate,
	          startDate = _this$props4.startDate,
	          selectsStart = _this$props4.selectsStart;


	      if (selectsStart) {
	        return (0, _date_utils.isSameDay)(day, selectingDate);
	      } else {
	        return (0, _date_utils.isSameDay)(day, startDate);
	      }
	    }, _this.isSelectingRangeEnd = function () {
	      if (!_this.isInSelectingRange()) {
	        return false;
	      }

	      var _this$props5 = _this.props,
	          day = _this$props5.day,
	          selectingDate = _this$props5.selectingDate,
	          endDate = _this$props5.endDate,
	          selectsEnd = _this$props5.selectsEnd;


	      if (selectsEnd) {
	        return (0, _date_utils.isSameDay)(day, selectingDate);
	      } else {
	        return (0, _date_utils.isSameDay)(day, endDate);
	      }
	    }, _this.isRangeStart = function () {
	      var _this$props6 = _this.props,
	          day = _this$props6.day,
	          startDate = _this$props6.startDate,
	          endDate = _this$props6.endDate;

	      if (!startDate || !endDate) {
	        return false;
	      }
	      return (0, _date_utils.isSameDay)(startDate, day);
	    }, _this.isRangeEnd = function () {
	      var _this$props7 = _this.props,
	          day = _this$props7.day,
	          startDate = _this$props7.startDate,
	          endDate = _this$props7.endDate;

	      if (!startDate || !endDate) {
	        return false;
	      }
	      return (0, _date_utils.isSameDay)(endDate, day);
	    }, _this.isWeekend = function () {
	      var weekday = (0, _date_utils.getDay)(_this.props.day);
	      return weekday === 0 || weekday === 6;
	    }, _this.isOutsideMonth = function () {
	      return _this.props.month !== undefined && _this.props.month !== (0, _date_utils.getMonth)(_this.props.day);
	    }, _this.getClassNames = function (date) {
	      var dayClassName = _this.props.dayClassName ? _this.props.dayClassName(date) : undefined;
	      return (0, _classnames2.default)('react-datepicker__day', dayClassName, 'react-datepicker__day--' + (0, _date_utils.getDayOfWeekCode)(_this.props.day), {
	        'react-datepicker__day--disabled': _this.isDisabled(),
	        'react-datepicker__day--selected': _this.isSameDay(_this.props.selected),
	        'react-datepicker__day--keyboard-selected': _this.isKeyboardSelected(),
	        'react-datepicker__day--range-start': _this.isRangeStart(),
	        'react-datepicker__day--range-end': _this.isRangeEnd(),
	        'react-datepicker__day--in-range': _this.isInRange(),
	        'react-datepicker__day--in-selecting-range': _this.isInSelectingRange(),
	        'react-datepicker__day--selecting-range-start': _this.isSelectingRangeStart(),
	        'react-datepicker__day--selecting-range-end': _this.isSelectingRangeEnd(),
	        'react-datepicker__day--today': _this.isSameDay((0, _date_utils.now)(_this.props.utcOffset)),
	        'react-datepicker__day--weekend': _this.isWeekend(),
	        'react-datepicker__day--outside-month': _this.isOutsideMonth()
	      }, _this.getHighLightedClass('react-datepicker__day--highlighted'));
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Day, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        {
	          className: this.getClassNames(this.props.day),
	          onClick: this.handleClick,
	          onMouseEnter: this.handleMouseEnter,
	          'aria-label': 'day-' + (0, _date_utils.getDate)(this.props.day),
	          role: 'option' },
	        (0, _date_utils.getDate)(this.props.day)
	      );
	    }
	  }]);

	  return Day;
	}(_react2.default.Component);

	Day.propTypes = {
	  day: _propTypes2.default.object.isRequired,
	  dayClassName: _propTypes2.default.func,
	  endDate: _propTypes2.default.object,
	  highlightDates: _propTypes2.default.array,
	  inline: _propTypes2.default.bool,
	  month: _propTypes2.default.number,
	  onClick: _propTypes2.default.func,
	  onMouseEnter: _propTypes2.default.func,
	  preSelection: _propTypes2.default.object,
	  selected: _propTypes2.default.object,
	  selectingDate: _propTypes2.default.object,
	  selectsEnd: _propTypes2.default.bool,
	  selectsStart: _propTypes2.default.bool,
	  startDate: _propTypes2.default.object,
	  utcOffset: _propTypes2.default.number
	};
	exports.default = Day;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(10);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WeekNumber = function (_React$Component) {
	  _inherits(WeekNumber, _React$Component);

	  function WeekNumber() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, WeekNumber);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WeekNumber.__proto__ || Object.getPrototypeOf(WeekNumber)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
	      if (_this.props.onClick) {
	        _this.props.onClick(event);
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(WeekNumber, [{
	    key: 'render',
	    value: function render() {
	      var weekNumberClasses = {
	        'react-datepicker__week-number': true,
	        'react-datepicker__week-number--clickable': !!this.props.onClick
	      };
	      return _react2.default.createElement(
	        'div',
	        {
	          className: (0, _classnames2.default)(weekNumberClasses),
	          'aria-label': 'week-' + this.props.weekNumber,
	          onClick: this.handleClick },
	        this.props.weekNumber
	      );
	    }
	  }]);

	  return WeekNumber;
	}(_react2.default.Component);

	WeekNumber.propTypes = {
	  weekNumber: _propTypes2.default.number.isRequired,
	  onClick: _propTypes2.default.func
	};
	exports.default = WeekNumber;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _date_utils = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Time = function (_React$Component) {
	  _inherits(Time, _React$Component);

	  function Time() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Time);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Time.__proto__ || Object.getPrototypeOf(Time)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (time) {
	      if ((_this.props.minTime || _this.props.maxTime) && (0, _date_utils.isTimeInDisabledRange)(time, _this.props) || _this.props.excludeTimes && (0, _date_utils.isTimeDisabled)(time, _this.props.excludeTimes)) {
	        return;
	      }

	      _this.props.onChange(time);
	    }, _this.liClasses = function (time, currH, currM) {
	      var classes = ['react-datepicker__time-list-item'];

	      if (currH === (0, _date_utils.getHour)(time) && currM === (0, _date_utils.getMinute)(time)) {
	        classes.push('react-datepicker__time-list-item--selected');
	      }
	      if ((_this.props.minTime || _this.props.maxTime) && (0, _date_utils.isTimeInDisabledRange)(time, _this.props) || _this.props.excludeTimes && (0, _date_utils.isTimeDisabled)(time, _this.props.excludeTimes)) {
	        classes.push('react-datepicker__time-list-item--disabled');
	      }

	      return classes.join(' ');
	    }, _this.renderTimes = function () {
	      var times = [];
	      var format = _this.props.format ? _this.props.format : 'hh:mm A';
	      var intervals = _this.props.intervals;
	      var activeTime = _this.props.selected ? _this.props.selected : (0, _date_utils.newDate)();
	      var currH = (0, _date_utils.getHour)(activeTime);
	      var currM = (0, _date_utils.getMinute)(activeTime);
	      var base = (0, _date_utils.getStartOfDay)((0, _date_utils.newDate)());
	      var multiplier = 1440 / intervals;
	      for (var i = 0; i < multiplier; i++) {
	        times.push((0, _date_utils.addMinutes)((0, _date_utils.cloneDate)(base), i * intervals));
	      }

	      return times.map(function (time, i) {
	        return _react2.default.createElement(
	          'li',
	          { key: i, onClick: _this.handleClick.bind(_this, time), className: _this.liClasses(time, currH, currM) },
	          (0, _date_utils.formatDate)(time, format)
	        );
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Time, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // code to ensure selected time will always be in focus within time window when it first appears
	      var multiplier = 60 / this.props.intervals;
	      var currH = this.props.selected ? (0, _date_utils.getHour)(this.props.selected) : (0, _date_utils.getHour)((0, _date_utils.newDate)());
	      this.list.scrollTop = 30 * (multiplier * currH);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var height = null;
	      if (this.props.monthRef) {
	        height = this.props.monthRef.clientHeight - 39;
	      }

	      return _react2.default.createElement(
	        'div',
	        { className: 'react-datepicker__time-container ' + (this.props.todayButton ? 'react-datepicker__time-container--with-today-button' : '') },
	        _react2.default.createElement(
	          'div',
	          { className: 'react-datepicker__header react-datepicker__header--time' },
	          _react2.default.createElement(
	            'div',
	            { className: 'react-datepicker-time__header' },
	            'Time'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'react-datepicker__time' },
	          _react2.default.createElement(
	            'div',
	            { className: 'react-datepicker__time-box' },
	            _react2.default.createElement(
	              'ul',
	              { className: 'react-datepicker__time-list', ref: function ref(list) {
	                  _this2.list = list;
	                }, style: height ? { height: height } : {} },
	              this.renderTimes.bind(this)()
	            )
	          )
	        )
	      );
	    }
	  }], [{
	    key: 'defaultProps',
	    get: function get() {
	      return {
	        intervals: 30,
	        onTimeChange: function onTimeChange() {},
	        todayButton: null
	      };
	    }
	  }]);

	  return Time;
	}(_react2.default.Component);

	Time.propTypes = {
	  format: _propTypes2.default.string,
	  intervals: _propTypes2.default.number,
	  selected: _propTypes2.default.object,
	  onChange: _propTypes2.default.func,
	  todayButton: _propTypes2.default.string,
	  minTime: _propTypes2.default.object,
	  maxTime: _propTypes2.default.object,
	  excludeTimes: _propTypes2.default.array,
	  monthRef: _propTypes2.default.object
	};
	exports.default = Time;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.popperPlacementPositions = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classnames = __webpack_require__(10);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactPopper = __webpack_require__(22);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var popperPlacementPositions = exports.popperPlacementPositions = ['auto', 'auto-left', 'auto-right', 'bottom', 'bottom-end', 'bottom-start', 'left', 'left-end', 'left-start', 'right', 'right-end', 'right-start', 'top', 'top-end', 'top-start'];

	var PopperComponent = function (_React$Component) {
	  _inherits(PopperComponent, _React$Component);

	  function PopperComponent() {
	    _classCallCheck(this, PopperComponent);

	    return _possibleConstructorReturn(this, (PopperComponent.__proto__ || Object.getPrototypeOf(PopperComponent)).apply(this, arguments));
	  }

	  _createClass(PopperComponent, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          hidePopper = _props.hidePopper,
	          popperComponent = _props.popperComponent,
	          popperModifiers = _props.popperModifiers,
	          popperPlacement = _props.popperPlacement,
	          targetComponent = _props.targetComponent;


	      var popper = void 0;

	      if (!hidePopper) {
	        var classes = (0, _classnames2.default)('react-datepicker-popper', className);
	        popper = _react2.default.createElement(
	          _reactPopper.Popper,
	          {
	            className: classes,
	            modifiers: popperModifiers,
	            placement: popperPlacement },
	          popperComponent
	        );
	      }

	      if (this.props.popperContainer) {
	        popper = _react2.default.createElement(this.props.popperContainer, {}, popper);
	      }

	      return _react2.default.createElement(
	        _reactPopper.Manager,
	        null,
	        _react2.default.createElement(
	          _reactPopper.Target,
	          { className: 'react-datepicker-wrapper' },
	          targetComponent
	        ),
	        popper
	      );
	    }
	  }], [{
	    key: 'defaultProps',
	    get: function get() {
	      return {
	        hidePopper: true,
	        popperModifiers: {
	          preventOverflow: {
	            enabled: true,
	            escapeWithReference: true,
	            boundariesElement: 'viewport'
	          }
	        },
	        popperPlacement: 'bottom-start'
	      };
	    }
	  }]);

	  return PopperComponent;
	}(_react2.default.Component);

	PopperComponent.propTypes = {
	  className: _propTypes2.default.string,
	  hidePopper: _propTypes2.default.bool,
	  popperComponent: _propTypes2.default.element,
	  popperModifiers: _propTypes2.default.object, // <datepicker/> props
	  popperPlacement: _propTypes2.default.oneOf(popperPlacementPositions), // <datepicker/> props
	  popperContainer: _propTypes2.default.func,
	  targetComponent: _propTypes2.default.element
	};
	exports.default = PopperComponent;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Arrow = exports.Popper = exports.Target = exports.Manager = undefined;

	var _Manager2 = __webpack_require__(23);

	var _Manager3 = _interopRequireDefault(_Manager2);

	var _Target2 = __webpack_require__(24);

	var _Target3 = _interopRequireDefault(_Target2);

	var _Popper2 = __webpack_require__(25);

	var _Popper3 = _interopRequireDefault(_Popper2);

	var _Arrow2 = __webpack_require__(29);

	var _Arrow3 = _interopRequireDefault(_Arrow2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Manager = _Manager3.default;
	exports.Target = _Target3.default;
	exports.Popper = _Popper3.default;
	exports.Arrow = _Arrow3.default;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Manager = function (_Component) {
	  _inherits(Manager, _Component);

	  function Manager() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Manager);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Manager.__proto__ || Object.getPrototypeOf(Manager)).call.apply(_ref, [this].concat(args))), _this), _this._setTargetNode = function (node) {
	      _this._targetNode = node;
	    }, _this._getTargetNode = function () {
	      return _this._targetNode;
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Manager, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        popperManager: {
	          setTargetNode: this._setTargetNode,
	          getTargetNode: this._getTargetNode
	        }
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          tag = _props.tag,
	          children = _props.children,
	          restProps = _objectWithoutProperties(_props, ['tag', 'children']);

	      if (tag !== false) {
	        return (0, _react.createElement)(tag, restProps, children);
	      } else {
	        return children;
	      }
	    }
	  }]);

	  return Manager;
	}(_react.Component);

	Manager.childContextTypes = {
	  popperManager: _propTypes2.default.object.isRequired
	};
	Manager.propTypes = {
	  tag: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool])
	};
	Manager.defaultProps = {
	  tag: 'div'
	};
	exports.default = Manager;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var Target = function Target(props, context) {
	  var _props$component = props.component,
	      component = _props$component === undefined ? 'div' : _props$component,
	      innerRef = props.innerRef,
	      children = props.children,
	      restProps = _objectWithoutProperties(props, ['component', 'innerRef', 'children']);

	  var popperManager = context.popperManager;

	  var targetRef = function targetRef(node) {
	    popperManager.setTargetNode(node);
	    if (typeof innerRef === 'function') {
	      innerRef(node);
	    }
	  };

	  if (typeof children === 'function') {
	    var targetProps = { ref: targetRef };
	    return children({ targetProps: targetProps, restProps: restProps });
	  }

	  var componentProps = _extends({}, restProps);

	  if (typeof component === 'string') {
	    componentProps.ref = targetRef;
	  } else {
	    componentProps.innerRef = targetRef;
	  }

	  return (0, _react.createElement)(component, componentProps, children);
	};

	Target.contextTypes = {
	  popperManager: _propTypes2.default.object.isRequired
	};

	Target.propTypes = {
	  component: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
	  innerRef: _propTypes2.default.func,
	  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])
	};

	exports.default = Target;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _popper = __webpack_require__(26);

	var _popper2 = _interopRequireDefault(_popper);

	var _isEqualShallow = __webpack_require__(27);

	var _isEqualShallow2 = _interopRequireDefault(_isEqualShallow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var noop = function noop() {
	  return null;
	};

	var Popper = function (_Component) {
	  _inherits(Popper, _Component);

	  function Popper() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Popper);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popper.__proto__ || Object.getPrototypeOf(Popper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this._setArrowNode = function (node) {
	      _this._arrowNode = node;
	    }, _this._getTargetNode = function () {
	      return _this.context.popperManager.getTargetNode();
	    }, _this._updateStateModifier = {
	      enabled: true,
	      order: 900,
	      fn: function fn(data) {
	        if (_this.state.data && !(0, _isEqualShallow2.default)(data.offsets, _this.state.data.offsets) || !_this.state.data) {
	          _this.setState({ data: data });
	        }
	        return data;
	      }
	    }, _this._getPopperStyle = function () {
	      var data = _this.state.data;

	      // If Popper isn't instantiated, hide the popperElement
	      // to avoid flash of unstyled content

	      if (!_this._popper || !data) {
	        return {
	          position: 'absolute',
	          pointerEvents: 'none',
	          opacity: 0
	        };
	      }

	      var _data$offsets$popper = data.offsets.popper,
	          top = _data$offsets$popper.top,
	          left = _data$offsets$popper.left,
	          position = _data$offsets$popper.position;


	      return _extends({
	        position: position
	      }, data.styles);
	    }, _this._getPopperPlacement = function () {
	      return !!_this.state.data ? _this.state.data.placement : undefined;
	    }, _this._getArrowStyle = function () {
	      if (!_this.state.data || !_this.state.data.offsets.arrow) {
	        return {};
	      } else {
	        var _this$state$data$offs = _this.state.data.offsets.arrow,
	            top = _this$state$data$offs.top,
	            left = _this$state$data$offs.left;

	        return { top: top, left: left };
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Popper, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        popper: {
	          setArrowNode: this._setArrowNode,
	          getArrowStyle: this._getArrowStyle
	        }
	      };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._updatePopper();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(lastProps) {
	      if (lastProps.placement !== this.props.placement || lastProps.eventsEnabled !== this.props.eventsEnabled) {
	        this._updatePopper();
	      }

	      if (this._popper && lastProps.children !== this.props.children) {
	        this._popper.scheduleUpdate();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._destroyPopper();
	    }
	  }, {
	    key: '_updatePopper',
	    value: function _updatePopper() {
	      this._destroyPopper();
	      if (this._node) {
	        this._createPopper();
	      }
	    }
	  }, {
	    key: '_createPopper',
	    value: function _createPopper() {
	      var _props = this.props,
	          placement = _props.placement,
	          eventsEnabled = _props.eventsEnabled;

	      var modifiers = _extends({}, this.props.modifiers, {
	        applyStyle: { enabled: false },
	        updateState: this._updateStateModifier
	      });

	      if (this._arrowNode) {
	        modifiers.arrow = {
	          element: this._arrowNode
	        };
	      }

	      this._popper = new _popper2.default(this._getTargetNode(), this._node, {
	        placement: placement,
	        eventsEnabled: eventsEnabled,
	        modifiers: modifiers
	      });

	      // schedule an update to make sure everything gets positioned correct
	      // after being instantiated
	      this._popper.scheduleUpdate();
	    }
	  }, {
	    key: '_destroyPopper',
	    value: function _destroyPopper() {
	      if (this._popper) {
	        this._popper.destroy();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props2 = this.props,
	          component = _props2.component,
	          innerRef = _props2.innerRef,
	          placement = _props2.placement,
	          eventsEnabled = _props2.eventsEnabled,
	          modifiers = _props2.modifiers,
	          children = _props2.children,
	          restProps = _objectWithoutProperties(_props2, ['component', 'innerRef', 'placement', 'eventsEnabled', 'modifiers', 'children']);

	      var popperRef = function popperRef(node) {
	        _this2._node = node;
	        if (typeof innerRef === 'function') {
	          innerRef(node);
	        }
	      };
	      var popperStyle = this._getPopperStyle();
	      var popperPlacement = this._getPopperPlacement();

	      if (typeof children === 'function') {
	        var popperProps = _defineProperty({
	          ref: popperRef,
	          style: popperStyle
	        }, 'data-placement', popperPlacement);
	        return children({
	          popperProps: popperProps,
	          restProps: restProps,
	          scheduleUpdate: this._popper && this._popper.scheduleUpdate
	        });
	      }

	      var componentProps = _extends({}, restProps, {
	        style: _extends({}, restProps.style, popperStyle),
	        'data-placement': popperPlacement
	      });

	      if (typeof component === 'string') {
	        componentProps.ref = popperRef;
	      } else {
	        componentProps.innerRef = popperRef;
	      }

	      return (0, _react.createElement)(component, componentProps, children);
	    }
	  }]);

	  return Popper;
	}(_react.Component);

	Popper.contextTypes = {
	  popperManager: _propTypes2.default.object.isRequired
	};
	Popper.childContextTypes = {
	  popper: _propTypes2.default.object.isRequired
	};
	Popper.propTypes = {
	  component: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
	  innerRef: _propTypes2.default.func,
	  placement: _propTypes2.default.oneOf(_popper2.default.placements),
	  eventsEnabled: _propTypes2.default.bool,
	  modifiers: _propTypes2.default.object,
	  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])
	};
	Popper.defaultProps = {
	  component: 'div',
	  placement: 'bottom',
	  eventsEnabled: true,
	  modifiers: {}
	};
	exports.default = Popper;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**!
	 * @fileOverview Kickass library to create and place poppers near their reference elements.
	 * @version 1.12.3
	 * @license
	 * Copyright (c) 2016 Federico Zivolo and contributors
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Popper = factory());
	}(this, (function () { 'use strict';

	var nativeHints = ['native code', '[object MutationObserverConstructor]'];

	/**
	 * Determine if a function is implemented natively (as opposed to a polyfill).
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Function | undefined} fn the function to check
	 * @returns {Boolean}
	 */
	var isNative = (function (fn) {
	  return nativeHints.some(function (hint) {
	    return (fn || '').toString().indexOf(hint) > -1;
	  });
	});

	var isBrowser = typeof window !== 'undefined';
	var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
	var timeoutDuration = 0;
	for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
	  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
	    timeoutDuration = 1;
	    break;
	  }
	}

	function microtaskDebounce(fn) {
	  var scheduled = false;
	  var i = 0;
	  var elem = document.createElement('span');

	  // MutationObserver provides a mechanism for scheduling microtasks, which
	  // are scheduled *before* the next task. This gives us a way to debounce
	  // a function but ensure it's called *before* the next paint.
	  var observer = new MutationObserver(function () {
	    fn();
	    scheduled = false;
	  });

	  observer.observe(elem, { attributes: true });

	  return function () {
	    if (!scheduled) {
	      scheduled = true;
	      elem.setAttribute('x-index', i);
	      i = i + 1; // don't use compund (+=) because it doesn't get optimized in V8
	    }
	  };
	}

	function taskDebounce(fn) {
	  var scheduled = false;
	  return function () {
	    if (!scheduled) {
	      scheduled = true;
	      setTimeout(function () {
	        scheduled = false;
	        fn();
	      }, timeoutDuration);
	    }
	  };
	}

	// It's common for MutationObserver polyfills to be seen in the wild, however
	// these rely on Mutation Events which only occur when an element is connected
	// to the DOM. The algorithm used in this module does not use a connected element,
	// and so we must ensure that a *native* MutationObserver is available.
	var supportsNativeMutationObserver = isBrowser && isNative(window.MutationObserver);

	/**
	* Create a debounced version of a method, that's asynchronously deferred
	* but called in the minimum time possible.
	*
	* @method
	* @memberof Popper.Utils
	* @argument {Function} fn
	* @returns {Function}
	*/
	var debounce = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;

	/**
	 * Check if the given variable is a function
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Any} functionToCheck - variable to check
	 * @returns {Boolean} answer to: is a function?
	 */
	function isFunction(functionToCheck) {
	  var getType = {};
	  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	/**
	 * Get CSS computed property of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Eement} element
	 * @argument {String} property
	 */
	function getStyleComputedProperty(element, property) {
	  if (element.nodeType !== 1) {
	    return [];
	  }
	  // NOTE: 1 DOM access here
	  var css = window.getComputedStyle(element, null);
	  return property ? css[property] : css;
	}

	/**
	 * Returns the parentNode or the host of the element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} parent
	 */
	function getParentNode(element) {
	  if (element.nodeName === 'HTML') {
	    return element;
	  }
	  return element.parentNode || element.host;
	}

	/**
	 * Returns the scrolling parent of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} scroll parent
	 */
	function getScrollParent(element) {
	  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
	  if (!element || ['HTML', 'BODY', '#document'].indexOf(element.nodeName) !== -1) {
	    return window.document.body;
	  }

	  // Firefox want us to check `-x` and `-y` variations as well

	  var _getStyleComputedProp = getStyleComputedProperty(element),
	      overflow = _getStyleComputedProp.overflow,
	      overflowX = _getStyleComputedProp.overflowX,
	      overflowY = _getStyleComputedProp.overflowY;

	  if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	    return element;
	  }

	  return getScrollParent(getParentNode(element));
	}

	/**
	 * Returns the offset parent of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} offset parent
	 */
	function getOffsetParent(element) {
	  // NOTE: 1 DOM access here
	  var offsetParent = element && element.offsetParent;
	  var nodeName = offsetParent && offsetParent.nodeName;

	  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
	    return window.document.documentElement;
	  }

	  // .offsetParent will return the closest TD or TABLE in case
	  // no offsetParent is present, I hate this job...
	  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
	    return getOffsetParent(offsetParent);
	  }

	  return offsetParent;
	}

	function isOffsetContainer(element) {
	  var nodeName = element.nodeName;

	  if (nodeName === 'BODY') {
	    return false;
	  }
	  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
	}

	/**
	 * Finds the root node (document, shadowDOM root) of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} node
	 * @returns {Element} root node
	 */
	function getRoot(node) {
	  if (node.parentNode !== null) {
	    return getRoot(node.parentNode);
	  }

	  return node;
	}

	/**
	 * Finds the offset parent common to the two provided nodes
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element1
	 * @argument {Element} element2
	 * @returns {Element} common offset parent
	 */
	function findCommonOffsetParent(element1, element2) {
	  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
	  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
	    return window.document.documentElement;
	  }

	  // Here we make sure to give as "start" the element that comes first in the DOM
	  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
	  var start = order ? element1 : element2;
	  var end = order ? element2 : element1;

	  // Get common ancestor container
	  var range = document.createRange();
	  range.setStart(start, 0);
	  range.setEnd(end, 0);
	  var commonAncestorContainer = range.commonAncestorContainer;

	  // Both nodes are inside #document

	  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
	    if (isOffsetContainer(commonAncestorContainer)) {
	      return commonAncestorContainer;
	    }

	    return getOffsetParent(commonAncestorContainer);
	  }

	  // one of the nodes is inside shadowDOM, find which one
	  var element1root = getRoot(element1);
	  if (element1root.host) {
	    return findCommonOffsetParent(element1root.host, element2);
	  } else {
	    return findCommonOffsetParent(element1, getRoot(element2).host);
	  }
	}

	/**
	 * Gets the scroll value of the given element in the given side (top and left)
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @argument {String} side `top` or `left`
	 * @returns {number} amount of scrolled pixels
	 */
	function getScroll(element) {
	  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

	  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
	  var nodeName = element.nodeName;

	  if (nodeName === 'BODY' || nodeName === 'HTML') {
	    var html = window.document.documentElement;
	    var scrollingElement = window.document.scrollingElement || html;
	    return scrollingElement[upperSide];
	  }

	  return element[upperSide];
	}

	/*
	 * Sum or subtract the element scroll values (left and top) from a given rect object
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} rect - Rect object you want to change
	 * @param {HTMLElement} element - The element from the function reads the scroll values
	 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
	 * @return {Object} rect - The modifier rect object
	 */
	function includeScroll(rect, element) {
	  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var scrollTop = getScroll(element, 'top');
	  var scrollLeft = getScroll(element, 'left');
	  var modifier = subtract ? -1 : 1;
	  rect.top += scrollTop * modifier;
	  rect.bottom += scrollTop * modifier;
	  rect.left += scrollLeft * modifier;
	  rect.right += scrollLeft * modifier;
	  return rect;
	}

	/*
	 * Helper to detect borders of a given element
	 * @method
	 * @memberof Popper.Utils
	 * @param {CSSStyleDeclaration} styles
	 * Result of `getStyleComputedProperty` on the given element
	 * @param {String} axis - `x` or `y`
	 * @return {number} borders - The borders size of the given axis
	 */

	function getBordersSize(styles, axis) {
	  var sideA = axis === 'x' ? 'Left' : 'Top';
	  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

	  return +styles['border' + sideA + 'Width'].split('px')[0] + +styles['border' + sideB + 'Width'].split('px')[0];
	}

	/**
	 * Tells if you are running Internet Explorer 10
	 * @method
	 * @memberof Popper.Utils
	 * @returns {Boolean} isIE10
	 */
	var isIE10 = undefined;

	var isIE10$1 = function () {
	  if (isIE10 === undefined) {
	    isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
	  }
	  return isIE10;
	};

	function getSize(axis, body, html, computedStyle) {
	  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
	}

	function getWindowSizes() {
	  var body = window.document.body;
	  var html = window.document.documentElement;
	  var computedStyle = isIE10$1() && window.getComputedStyle(html);

	  return {
	    height: getSize('Height', body, html, computedStyle),
	    width: getSize('Width', body, html, computedStyle)
	  };
	}

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();





	var defineProperty = function (obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	/**
	 * Given element offsets, generate an output similar to getBoundingClientRect
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Object} offsets
	 * @returns {Object} ClientRect like output
	 */
	function getClientRect(offsets) {
	  return _extends({}, offsets, {
	    right: offsets.left + offsets.width,
	    bottom: offsets.top + offsets.height
	  });
	}

	/**
	 * Get bounding client rect of given element
	 * @method
	 * @memberof Popper.Utils
	 * @param {HTMLElement} element
	 * @return {Object} client rect
	 */
	function getBoundingClientRect(element) {
	  var rect = {};

	  // IE10 10 FIX: Please, don't ask, the element isn't
	  // considered in DOM in some circumstances...
	  // This isn't reproducible in IE10 compatibility mode of IE11
	  if (isIE10$1()) {
	    try {
	      rect = element.getBoundingClientRect();
	      var scrollTop = getScroll(element, 'top');
	      var scrollLeft = getScroll(element, 'left');
	      rect.top += scrollTop;
	      rect.left += scrollLeft;
	      rect.bottom += scrollTop;
	      rect.right += scrollLeft;
	    } catch (err) {}
	  } else {
	    rect = element.getBoundingClientRect();
	  }

	  var result = {
	    left: rect.left,
	    top: rect.top,
	    width: rect.right - rect.left,
	    height: rect.bottom - rect.top
	  };

	  // subtract scrollbar size from sizes
	  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
	  var width = sizes.width || element.clientWidth || result.right - result.left;
	  var height = sizes.height || element.clientHeight || result.bottom - result.top;

	  var horizScrollbar = element.offsetWidth - width;
	  var vertScrollbar = element.offsetHeight - height;

	  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
	  // we make this check conditional for performance reasons
	  if (horizScrollbar || vertScrollbar) {
	    var styles = getStyleComputedProperty(element);
	    horizScrollbar -= getBordersSize(styles, 'x');
	    vertScrollbar -= getBordersSize(styles, 'y');

	    result.width -= horizScrollbar;
	    result.height -= vertScrollbar;
	  }

	  return getClientRect(result);
	}

	function getOffsetRectRelativeToArbitraryNode(children, parent) {
	  var isIE10 = isIE10$1();
	  var isHTML = parent.nodeName === 'HTML';
	  var childrenRect = getBoundingClientRect(children);
	  var parentRect = getBoundingClientRect(parent);
	  var scrollParent = getScrollParent(children);

	  var styles = getStyleComputedProperty(parent);
	  var borderTopWidth = +styles.borderTopWidth.split('px')[0];
	  var borderLeftWidth = +styles.borderLeftWidth.split('px')[0];

	  var offsets = getClientRect({
	    top: childrenRect.top - parentRect.top - borderTopWidth,
	    left: childrenRect.left - parentRect.left - borderLeftWidth,
	    width: childrenRect.width,
	    height: childrenRect.height
	  });
	  offsets.marginTop = 0;
	  offsets.marginLeft = 0;

	  // Subtract margins of documentElement in case it's being used as parent
	  // we do this only on HTML because it's the only element that behaves
	  // differently when margins are applied to it. The margins are included in
	  // the box of the documentElement, in the other cases not.
	  if (!isIE10 && isHTML) {
	    var marginTop = +styles.marginTop.split('px')[0];
	    var marginLeft = +styles.marginLeft.split('px')[0];

	    offsets.top -= borderTopWidth - marginTop;
	    offsets.bottom -= borderTopWidth - marginTop;
	    offsets.left -= borderLeftWidth - marginLeft;
	    offsets.right -= borderLeftWidth - marginLeft;

	    // Attach marginTop and marginLeft because in some circumstances we may need them
	    offsets.marginTop = marginTop;
	    offsets.marginLeft = marginLeft;
	  }

	  if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
	    offsets = includeScroll(offsets, parent);
	  }

	  return offsets;
	}

	function getViewportOffsetRectRelativeToArtbitraryNode(element) {
	  var html = window.document.documentElement;
	  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
	  var width = Math.max(html.clientWidth, window.innerWidth || 0);
	  var height = Math.max(html.clientHeight, window.innerHeight || 0);

	  var scrollTop = getScroll(html);
	  var scrollLeft = getScroll(html, 'left');

	  var offset = {
	    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
	    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
	    width: width,
	    height: height
	  };

	  return getClientRect(offset);
	}

	/**
	 * Check if the given element is fixed or is inside a fixed parent
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @argument {Element} customContainer
	 * @returns {Boolean} answer to "isFixed?"
	 */
	function isFixed(element) {
	  var nodeName = element.nodeName;
	  if (nodeName === 'BODY' || nodeName === 'HTML') {
	    return false;
	  }
	  if (getStyleComputedProperty(element, 'position') === 'fixed') {
	    return true;
	  }
	  return isFixed(getParentNode(element));
	}

	/**
	 * Computed the boundaries limits and return them
	 * @method
	 * @memberof Popper.Utils
	 * @param {HTMLElement} popper
	 * @param {HTMLElement} reference
	 * @param {number} padding
	 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
	 * @returns {Object} Coordinates of the boundaries
	 */
	function getBoundaries(popper, reference, padding, boundariesElement) {
	  // NOTE: 1 DOM access here
	  var boundaries = { top: 0, left: 0 };
	  var offsetParent = findCommonOffsetParent(popper, reference);

	  // Handle viewport case
	  if (boundariesElement === 'viewport') {
	    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
	  } else {
	    // Handle other cases based on DOM element used as boundaries
	    var boundariesNode = void 0;
	    if (boundariesElement === 'scrollParent') {
	      boundariesNode = getScrollParent(getParentNode(popper));
	      if (boundariesNode.nodeName === 'BODY') {
	        boundariesNode = window.document.documentElement;
	      }
	    } else if (boundariesElement === 'window') {
	      boundariesNode = window.document.documentElement;
	    } else {
	      boundariesNode = boundariesElement;
	    }

	    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

	    // In case of HTML, we need a different computation
	    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
	      var _getWindowSizes = getWindowSizes(),
	          height = _getWindowSizes.height,
	          width = _getWindowSizes.width;

	      boundaries.top += offsets.top - offsets.marginTop;
	      boundaries.bottom = height + offsets.top;
	      boundaries.left += offsets.left - offsets.marginLeft;
	      boundaries.right = width + offsets.left;
	    } else {
	      // for all the other DOM elements, this one is good
	      boundaries = offsets;
	    }
	  }

	  // Add paddings
	  boundaries.left += padding;
	  boundaries.top += padding;
	  boundaries.right -= padding;
	  boundaries.bottom -= padding;

	  return boundaries;
	}

	function getArea(_ref) {
	  var width = _ref.width,
	      height = _ref.height;

	  return width * height;
	}

	/**
	 * Utility used to transform the `auto` placement to the placement with more
	 * available space.
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
	  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

	  if (placement.indexOf('auto') === -1) {
	    return placement;
	  }

	  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

	  var rects = {
	    top: {
	      width: boundaries.width,
	      height: refRect.top - boundaries.top
	    },
	    right: {
	      width: boundaries.right - refRect.right,
	      height: boundaries.height
	    },
	    bottom: {
	      width: boundaries.width,
	      height: boundaries.bottom - refRect.bottom
	    },
	    left: {
	      width: refRect.left - boundaries.left,
	      height: boundaries.height
	    }
	  };

	  var sortedAreas = Object.keys(rects).map(function (key) {
	    return _extends({
	      key: key
	    }, rects[key], {
	      area: getArea(rects[key])
	    });
	  }).sort(function (a, b) {
	    return b.area - a.area;
	  });

	  var filteredAreas = sortedAreas.filter(function (_ref2) {
	    var width = _ref2.width,
	        height = _ref2.height;
	    return width >= popper.clientWidth && height >= popper.clientHeight;
	  });

	  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

	  var variation = placement.split('-')[1];

	  return computedPlacement + (variation ? '-' + variation : '');
	}

	/**
	 * Get offsets to the reference element
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} state
	 * @param {Element} popper - the popper element
	 * @param {Element} reference - the reference element (the popper will be relative to this)
	 * @returns {Object} An object containing the offsets which will be applied to the popper
	 */
	function getReferenceOffsets(state, popper, reference) {
	  var commonOffsetParent = findCommonOffsetParent(popper, reference);
	  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
	}

	/**
	 * Get the outer sizes of the given element (offset size + margins)
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Object} object containing width and height properties
	 */
	function getOuterSizes(element) {
	  var styles = window.getComputedStyle(element);
	  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
	  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
	  var result = {
	    width: element.offsetWidth + y,
	    height: element.offsetHeight + x
	  };
	  return result;
	}

	/**
	 * Get the opposite placement of the given one
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement
	 * @returns {String} flipped placement
	 */
	function getOppositePlacement(placement) {
	  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash[matched];
	  });
	}

	/**
	 * Get offsets to the popper
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} position - CSS position the Popper will get applied
	 * @param {HTMLElement} popper - the popper element
	 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
	 * @param {String} placement - one of the valid placement options
	 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
	 */
	function getPopperOffsets(popper, referenceOffsets, placement) {
	  placement = placement.split('-')[0];

	  // Get popper node sizes
	  var popperRect = getOuterSizes(popper);

	  // Add position, width and height to our offsets object
	  var popperOffsets = {
	    width: popperRect.width,
	    height: popperRect.height
	  };

	  // depending by the popper placement we have to compute its offsets slightly differently
	  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
	  var mainSide = isHoriz ? 'top' : 'left';
	  var secondarySide = isHoriz ? 'left' : 'top';
	  var measurement = isHoriz ? 'height' : 'width';
	  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

	  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
	  if (placement === secondarySide) {
	    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
	  } else {
	    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
	  }

	  return popperOffsets;
	}

	/**
	 * Mimics the `find` method of Array
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Array} arr
	 * @argument prop
	 * @argument value
	 * @returns index or -1
	 */
	function find(arr, check) {
	  // use native find if supported
	  if (Array.prototype.find) {
	    return arr.find(check);
	  }

	  // use `filter` to obtain the same behavior of `find`
	  return arr.filter(check)[0];
	}

	/**
	 * Return the index of the matching object
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Array} arr
	 * @argument prop
	 * @argument value
	 * @returns index or -1
	 */
	function findIndex(arr, prop, value) {
	  // use native findIndex if supported
	  if (Array.prototype.findIndex) {
	    return arr.findIndex(function (cur) {
	      return cur[prop] === value;
	    });
	  }

	  // use `find` + `indexOf` if `findIndex` isn't supported
	  var match = find(arr, function (obj) {
	    return obj[prop] === value;
	  });
	  return arr.indexOf(match);
	}

	/**
	 * Loop trough the list of modifiers and run them in order,
	 * each of them will then edit the data object.
	 * @method
	 * @memberof Popper.Utils
	 * @param {dataObject} data
	 * @param {Array} modifiers
	 * @param {String} ends - Optional modifier name used as stopper
	 * @returns {dataObject}
	 */
	function runModifiers(modifiers, data, ends) {
	  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

	  modifiersToRun.forEach(function (modifier) {
	    if (modifier.function) {
	      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
	    }
	    var fn = modifier.function || modifier.fn;
	    if (modifier.enabled && isFunction(fn)) {
	      // Add properties to offsets to make them a complete clientRect object
	      // we do this before each modifier to make sure the previous one doesn't
	      // mess with these values
	      data.offsets.popper = getClientRect(data.offsets.popper);
	      data.offsets.reference = getClientRect(data.offsets.reference);

	      data = fn(data, modifier);
	    }
	  });

	  return data;
	}

	/**
	 * Updates the position of the popper, computing the new offsets and applying
	 * the new style.<br />
	 * Prefer `scheduleUpdate` over `update` because of performance reasons.
	 * @method
	 * @memberof Popper
	 */
	function update() {
	  // if popper is destroyed, don't perform any further update
	  if (this.state.isDestroyed) {
	    return;
	  }

	  var data = {
	    instance: this,
	    styles: {},
	    arrowStyles: {},
	    attributes: {},
	    flipped: false,
	    offsets: {}
	  };

	  // compute reference element offsets
	  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

	  // compute auto placement, store placement inside the data object,
	  // modifiers will be able to edit `placement` if needed
	  // and refer to originalPlacement to know the original value
	  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

	  // store the computed placement inside `originalPlacement`
	  data.originalPlacement = data.placement;

	  // compute the popper offsets
	  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
	  data.offsets.popper.position = 'absolute';

	  // run the modifiers
	  data = runModifiers(this.modifiers, data);

	  // the first `update` will call `onCreate` callback
	  // the other ones will call `onUpdate` callback
	  if (!this.state.isCreated) {
	    this.state.isCreated = true;
	    this.options.onCreate(data);
	  } else {
	    this.options.onUpdate(data);
	  }
	}

	/**
	 * Helper used to know if the given modifier is enabled.
	 * @method
	 * @memberof Popper.Utils
	 * @returns {Boolean}
	 */
	function isModifierEnabled(modifiers, modifierName) {
	  return modifiers.some(function (_ref) {
	    var name = _ref.name,
	        enabled = _ref.enabled;
	    return enabled && name === modifierName;
	  });
	}

	/**
	 * Get the prefixed supported property name
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} property (camelCase)
	 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
	 */
	function getSupportedPropertyName(property) {
	  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
	  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

	  for (var i = 0; i < prefixes.length - 1; i++) {
	    var prefix = prefixes[i];
	    var toCheck = prefix ? '' + prefix + upperProp : property;
	    if (typeof window.document.body.style[toCheck] !== 'undefined') {
	      return toCheck;
	    }
	  }
	  return null;
	}

	/**
	 * Destroy the popper
	 * @method
	 * @memberof Popper
	 */
	function destroy() {
	  this.state.isDestroyed = true;

	  // touch DOM only if `applyStyle` modifier is enabled
	  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
	    this.popper.removeAttribute('x-placement');
	    this.popper.style.left = '';
	    this.popper.style.position = '';
	    this.popper.style.top = '';
	    this.popper.style[getSupportedPropertyName('transform')] = '';
	  }

	  this.disableEventListeners();

	  // remove the popper if user explicity asked for the deletion on destroy
	  // do not use `remove` because IE11 doesn't support it
	  if (this.options.removeOnDestroy) {
	    this.popper.parentNode.removeChild(this.popper);
	  }
	  return this;
	}

	function attachToScrollParents(scrollParent, event, callback, scrollParents) {
	  var isBody = scrollParent.nodeName === 'BODY';
	  var target = isBody ? window : scrollParent;
	  target.addEventListener(event, callback, { passive: true });

	  if (!isBody) {
	    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
	  }
	  scrollParents.push(target);
	}

	/**
	 * Setup needed event listeners used to update the popper position
	 * @method
	 * @memberof Popper.Utils
	 * @private
	 */
	function setupEventListeners(reference, options, state, updateBound) {
	  // Resize event listener on window
	  state.updateBound = updateBound;
	  window.addEventListener('resize', state.updateBound, { passive: true });

	  // Scroll event listener on scroll parents
	  var scrollElement = getScrollParent(reference);
	  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
	  state.scrollElement = scrollElement;
	  state.eventsEnabled = true;

	  return state;
	}

	/**
	 * It will add resize/scroll events and start recalculating
	 * position of the popper element when they are triggered.
	 * @method
	 * @memberof Popper
	 */
	function enableEventListeners() {
	  if (!this.state.eventsEnabled) {
	    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
	  }
	}

	/**
	 * Remove event listeners used to update the popper position
	 * @method
	 * @memberof Popper.Utils
	 * @private
	 */
	function removeEventListeners(reference, state) {
	  // Remove resize event listener on window
	  window.removeEventListener('resize', state.updateBound);

	  // Remove scroll event listener on scroll parents
	  state.scrollParents.forEach(function (target) {
	    target.removeEventListener('scroll', state.updateBound);
	  });

	  // Reset state
	  state.updateBound = null;
	  state.scrollParents = [];
	  state.scrollElement = null;
	  state.eventsEnabled = false;
	  return state;
	}

	/**
	 * It will remove resize/scroll events and won't recalculate popper position
	 * when they are triggered. It also won't trigger onUpdate callback anymore,
	 * unless you call `update` method manually.
	 * @method
	 * @memberof Popper
	 */
	function disableEventListeners() {
	  if (this.state.eventsEnabled) {
	    window.cancelAnimationFrame(this.scheduleUpdate);
	    this.state = removeEventListeners(this.reference, this.state);
	  }
	}

	/**
	 * Tells if a given input is a number
	 * @method
	 * @memberof Popper.Utils
	 * @param {*} input to check
	 * @return {Boolean}
	 */
	function isNumeric(n) {
	  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
	}

	/**
	 * Set the style to the given popper
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element - Element to apply the style to
	 * @argument {Object} styles
	 * Object with a list of properties and values which will be applied to the element
	 */
	function setStyles(element, styles) {
	  Object.keys(styles).forEach(function (prop) {
	    var unit = '';
	    // add unit if the value is numeric and is one of the following
	    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
	      unit = 'px';
	    }
	    element.style[prop] = styles[prop] + unit;
	  });
	}

	/**
	 * Set the attributes to the given popper
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element - Element to apply the attributes to
	 * @argument {Object} styles
	 * Object with a list of properties and values which will be applied to the element
	 */
	function setAttributes(element, attributes) {
	  Object.keys(attributes).forEach(function (prop) {
	    var value = attributes[prop];
	    if (value !== false) {
	      element.setAttribute(prop, attributes[prop]);
	    } else {
	      element.removeAttribute(prop);
	    }
	  });
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} data.styles - List of style properties - values to apply to popper element
	 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The same data object
	 */
	function applyStyle(data) {
	  // any property present in `data.styles` will be applied to the popper,
	  // in this way we can make the 3rd party modifiers add custom styles to it
	  // Be aware, modifiers could override the properties defined in the previous
	  // lines of this modifier!
	  setStyles(data.instance.popper, data.styles);

	  // any property present in `data.attributes` will be applied to the popper,
	  // they will be set as HTML attributes of the element
	  setAttributes(data.instance.popper, data.attributes);

	  // if arrowElement is defined and arrowStyles has some properties
	  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
	    setStyles(data.arrowElement, data.arrowStyles);
	  }

	  return data;
	}

	/**
	 * Set the x-placement attribute before everything else because it could be used
	 * to add margins to the popper margins needs to be calculated to get the
	 * correct popper offsets.
	 * @method
	 * @memberof Popper.modifiers
	 * @param {HTMLElement} reference - The reference element used to position the popper
	 * @param {HTMLElement} popper - The HTML element used as popper.
	 * @param {Object} options - Popper.js options
	 */
	function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
	  // compute reference element offsets
	  var referenceOffsets = getReferenceOffsets(state, popper, reference);

	  // compute auto placement, store placement inside the data object,
	  // modifiers will be able to edit `placement` if needed
	  // and refer to originalPlacement to know the original value
	  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

	  popper.setAttribute('x-placement', placement);

	  // Apply `position` to popper before anything else because
	  // without the position applied we can't guarantee correct computations
	  setStyles(popper, { position: 'absolute' });

	  return options;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function computeStyle(data, options) {
	  var x = options.x,
	      y = options.y;
	  var popper = data.offsets.popper;

	  // Remove this legacy support in Popper.js v2

	  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
	    return modifier.name === 'applyStyle';
	  }).gpuAcceleration;
	  if (legacyGpuAccelerationOption !== undefined) {
	    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
	  }
	  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

	  var offsetParent = getOffsetParent(data.instance.popper);
	  var offsetParentRect = getBoundingClientRect(offsetParent);

	  // Styles
	  var styles = {
	    position: popper.position
	  };

	  // floor sides to avoid blurry text
	  var offsets = {
	    left: Math.floor(popper.left),
	    top: Math.floor(popper.top),
	    bottom: Math.floor(popper.bottom),
	    right: Math.floor(popper.right)
	  };

	  var sideA = x === 'bottom' ? 'top' : 'bottom';
	  var sideB = y === 'right' ? 'left' : 'right';

	  // if gpuAcceleration is set to `true` and transform is supported,
	  //  we use `translate3d` to apply the position to the popper we
	  // automatically use the supported prefixed version if needed
	  var prefixedProperty = getSupportedPropertyName('transform');

	  // now, let's make a step back and look at this code closely (wtf?)
	  // If the content of the popper grows once it's been positioned, it
	  // may happen that the popper gets misplaced because of the new content
	  // overflowing its reference element
	  // To avoid this problem, we provide two options (x and y), which allow
	  // the consumer to define the offset origin.
	  // If we position a popper on top of a reference element, we can set
	  // `x` to `top` to make the popper grow towards its top instead of
	  // its bottom.
	  var left = void 0,
	      top = void 0;
	  if (sideA === 'bottom') {
	    top = -offsetParentRect.height + offsets.bottom;
	  } else {
	    top = offsets.top;
	  }
	  if (sideB === 'right') {
	    left = -offsetParentRect.width + offsets.right;
	  } else {
	    left = offsets.left;
	  }
	  if (gpuAcceleration && prefixedProperty) {
	    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
	    styles[sideA] = 0;
	    styles[sideB] = 0;
	    styles.willChange = 'transform';
	  } else {
	    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
	    var invertTop = sideA === 'bottom' ? -1 : 1;
	    var invertLeft = sideB === 'right' ? -1 : 1;
	    styles[sideA] = top * invertTop;
	    styles[sideB] = left * invertLeft;
	    styles.willChange = sideA + ', ' + sideB;
	  }

	  // Attributes
	  var attributes = {
	    'x-placement': data.placement
	  };

	  // Update `data` attributes, styles and arrowStyles
	  data.attributes = _extends({}, attributes, data.attributes);
	  data.styles = _extends({}, styles, data.styles);
	  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

	  return data;
	}

	/**
	 * Helper used to know if the given modifier depends from another one.<br />
	 * It checks if the needed modifier is listed and enabled.
	 * @method
	 * @memberof Popper.Utils
	 * @param {Array} modifiers - list of modifiers
	 * @param {String} requestingName - name of requesting modifier
	 * @param {String} requestedName - name of requested modifier
	 * @returns {Boolean}
	 */
	function isModifierRequired(modifiers, requestingName, requestedName) {
	  var requesting = find(modifiers, function (_ref) {
	    var name = _ref.name;
	    return name === requestingName;
	  });

	  var isRequired = !!requesting && modifiers.some(function (modifier) {
	    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
	  });

	  if (!isRequired) {
	    var _requesting = '`' + requestingName + '`';
	    var requested = '`' + requestedName + '`';
	    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
	  }
	  return isRequired;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function arrow(data, options) {
	  // arrow depends on keepTogether in order to work
	  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
	    return data;
	  }

	  var arrowElement = options.element;

	  // if arrowElement is a string, suppose it's a CSS selector
	  if (typeof arrowElement === 'string') {
	    arrowElement = data.instance.popper.querySelector(arrowElement);

	    // if arrowElement is not found, don't run the modifier
	    if (!arrowElement) {
	      return data;
	    }
	  } else {
	    // if the arrowElement isn't a query selector we must check that the
	    // provided DOM node is child of its popper node
	    if (!data.instance.popper.contains(arrowElement)) {
	      console.warn('WARNING: `arrow.element` must be child of its popper element!');
	      return data;
	    }
	  }

	  var placement = data.placement.split('-')[0];
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

	  var len = isVertical ? 'height' : 'width';
	  var sideCapitalized = isVertical ? 'Top' : 'Left';
	  var side = sideCapitalized.toLowerCase();
	  var altSide = isVertical ? 'left' : 'top';
	  var opSide = isVertical ? 'bottom' : 'right';
	  var arrowElementSize = getOuterSizes(arrowElement)[len];

	  //
	  // extends keepTogether behavior making sure the popper and its
	  // reference have enough pixels in conjuction
	  //

	  // top/left side
	  if (reference[opSide] - arrowElementSize < popper[side]) {
	    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
	  }
	  // bottom/right side
	  if (reference[side] + arrowElementSize > popper[opSide]) {
	    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
	  }

	  // compute center of the popper
	  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

	  // Compute the sideValue using the updated popper offsets
	  // take popper margin in account because we don't have this info available
	  var popperMarginSide = getStyleComputedProperty(data.instance.popper, 'margin' + sideCapitalized).replace('px', '');
	  var sideValue = center - getClientRect(data.offsets.popper)[side] - popperMarginSide;

	  // prevent arrowElement from being placed not contiguously to its popper
	  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

	  data.arrowElement = arrowElement;
	  data.offsets.arrow = {};
	  data.offsets.arrow[side] = Math.round(sideValue);
	  data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node

	  return data;
	}

	/**
	 * Get the opposite placement variation of the given one
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement variation
	 * @returns {String} flipped placement variation
	 */
	function getOppositeVariation(variation) {
	  if (variation === 'end') {
	    return 'start';
	  } else if (variation === 'start') {
	    return 'end';
	  }
	  return variation;
	}

	/**
	 * List of accepted placements to use as values of the `placement` option.<br />
	 * Valid placements are:
	 * - `auto`
	 * - `top`
	 * - `right`
	 * - `bottom`
	 * - `left`
	 *
	 * Each placement can have a variation from this list:
	 * - `-start`
	 * - `-end`
	 *
	 * Variations are interpreted easily if you think of them as the left to right
	 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
	 * is right.<br />
	 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
	 *
	 * Some valid examples are:
	 * - `top-end` (on top of reference, right aligned)
	 * - `right-start` (on right of reference, top aligned)
	 * - `bottom` (on bottom, centered)
	 * - `auto-right` (on the side with more space available, alignment depends by placement)
	 *
	 * @static
	 * @type {Array}
	 * @enum {String}
	 * @readonly
	 * @method placements
	 * @memberof Popper
	 */
	var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

	// Get rid of `auto` `auto-start` and `auto-end`
	var validPlacements = placements.slice(3);

	/**
	 * Given an initial placement, returns all the subsequent placements
	 * clockwise (or counter-clockwise).
	 *
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement - A valid placement (it accepts variations)
	 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
	 * @returns {Array} placements including their variations
	 */
	function clockwise(placement) {
	  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var index = validPlacements.indexOf(placement);
	  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
	  return counter ? arr.reverse() : arr;
	}

	var BEHAVIORS = {
	  FLIP: 'flip',
	  CLOCKWISE: 'clockwise',
	  COUNTERCLOCKWISE: 'counterclockwise'
	};

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function flip(data, options) {
	  // if `inner` modifier is enabled, we can't use the `flip` modifier
	  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
	    return data;
	  }

	  if (data.flipped && data.placement === data.originalPlacement) {
	    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
	    return data;
	  }

	  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

	  var placement = data.placement.split('-')[0];
	  var placementOpposite = getOppositePlacement(placement);
	  var variation = data.placement.split('-')[1] || '';

	  var flipOrder = [];

	  switch (options.behavior) {
	    case BEHAVIORS.FLIP:
	      flipOrder = [placement, placementOpposite];
	      break;
	    case BEHAVIORS.CLOCKWISE:
	      flipOrder = clockwise(placement);
	      break;
	    case BEHAVIORS.COUNTERCLOCKWISE:
	      flipOrder = clockwise(placement, true);
	      break;
	    default:
	      flipOrder = options.behavior;
	  }

	  flipOrder.forEach(function (step, index) {
	    if (placement !== step || flipOrder.length === index + 1) {
	      return data;
	    }

	    placement = data.placement.split('-')[0];
	    placementOpposite = getOppositePlacement(placement);

	    var popperOffsets = data.offsets.popper;
	    var refOffsets = data.offsets.reference;

	    // using floor because the reference offsets may contain decimals we are not going to consider here
	    var floor = Math.floor;
	    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

	    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
	    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
	    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
	    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

	    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

	    // flip the variation if required
	    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
	    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

	    if (overlapsRef || overflowsBoundaries || flippedVariation) {
	      // this boolean to detect any flip loop
	      data.flipped = true;

	      if (overlapsRef || overflowsBoundaries) {
	        placement = flipOrder[index + 1];
	      }

	      if (flippedVariation) {
	        variation = getOppositeVariation(variation);
	      }

	      data.placement = placement + (variation ? '-' + variation : '');

	      // this object contains `position`, we want to preserve it along with
	      // any additional property we may add in the future
	      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

	      data = runModifiers(data.instance.modifiers, data, 'flip');
	    }
	  });
	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function keepTogether(data) {
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var placement = data.placement.split('-')[0];
	  var floor = Math.floor;
	  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
	  var side = isVertical ? 'right' : 'bottom';
	  var opSide = isVertical ? 'left' : 'top';
	  var measurement = isVertical ? 'width' : 'height';

	  if (popper[side] < floor(reference[opSide])) {
	    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
	  }
	  if (popper[opSide] > floor(reference[side])) {
	    data.offsets.popper[opSide] = floor(reference[side]);
	  }

	  return data;
	}

	/**
	 * Converts a string containing value + unit into a px value number
	 * @function
	 * @memberof {modifiers~offset}
	 * @private
	 * @argument {String} str - Value + unit string
	 * @argument {String} measurement - `height` or `width`
	 * @argument {Object} popperOffsets
	 * @argument {Object} referenceOffsets
	 * @returns {Number|String}
	 * Value in pixels, or original string if no values were extracted
	 */
	function toValue(str, measurement, popperOffsets, referenceOffsets) {
	  // separate value from unit
	  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
	  var value = +split[1];
	  var unit = split[2];

	  // If it's not a number it's an operator, I guess
	  if (!value) {
	    return str;
	  }

	  if (unit.indexOf('%') === 0) {
	    var element = void 0;
	    switch (unit) {
	      case '%p':
	        element = popperOffsets;
	        break;
	      case '%':
	      case '%r':
	      default:
	        element = referenceOffsets;
	    }

	    var rect = getClientRect(element);
	    return rect[measurement] / 100 * value;
	  } else if (unit === 'vh' || unit === 'vw') {
	    // if is a vh or vw, we calculate the size based on the viewport
	    var size = void 0;
	    if (unit === 'vh') {
	      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	    } else {
	      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	    }
	    return size / 100 * value;
	  } else {
	    // if is an explicit pixel unit, we get rid of the unit and keep the value
	    // if is an implicit unit, it's px, and we return just the value
	    return value;
	  }
	}

	/**
	 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
	 * @function
	 * @memberof {modifiers~offset}
	 * @private
	 * @argument {String} offset
	 * @argument {Object} popperOffsets
	 * @argument {Object} referenceOffsets
	 * @argument {String} basePlacement
	 * @returns {Array} a two cells array with x and y offsets in numbers
	 */
	function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
	  var offsets = [0, 0];

	  // Use height if placement is left or right and index is 0 otherwise use width
	  // in this way the first offset will use an axis and the second one
	  // will use the other one
	  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

	  // Split the offset string to obtain a list of values and operands
	  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
	  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
	    return frag.trim();
	  });

	  // Detect if the offset string contains a pair of values or a single one
	  // they could be separated by comma or space
	  var divider = fragments.indexOf(find(fragments, function (frag) {
	    return frag.search(/,|\s/) !== -1;
	  }));

	  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
	    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
	  }

	  // If divider is found, we divide the list of values and operands to divide
	  // them by ofset X and Y.
	  var splitRegex = /\s*,\s*|\s+/;
	  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

	  // Convert the values with units to absolute pixels to allow our computations
	  ops = ops.map(function (op, index) {
	    // Most of the units rely on the orientation of the popper
	    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
	    var mergeWithPrevious = false;
	    return op
	    // This aggregates any `+` or `-` sign that aren't considered operators
	    // e.g.: 10 + +5 => [10, +, +5]
	    .reduce(function (a, b) {
	      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
	        a[a.length - 1] = b;
	        mergeWithPrevious = true;
	        return a;
	      } else if (mergeWithPrevious) {
	        a[a.length - 1] += b;
	        mergeWithPrevious = false;
	        return a;
	      } else {
	        return a.concat(b);
	      }
	    }, [])
	    // Here we convert the string values into number values (in px)
	    .map(function (str) {
	      return toValue(str, measurement, popperOffsets, referenceOffsets);
	    });
	  });

	  // Loop trough the offsets arrays and execute the operations
	  ops.forEach(function (op, index) {
	    op.forEach(function (frag, index2) {
	      if (isNumeric(frag)) {
	        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
	      }
	    });
	  });
	  return offsets;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @argument {Number|String} options.offset=0
	 * The offset value as described in the modifier description
	 * @returns {Object} The data object, properly modified
	 */
	function offset(data, _ref) {
	  var offset = _ref.offset;
	  var placement = data.placement,
	      _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var basePlacement = placement.split('-')[0];

	  var offsets = void 0;
	  if (isNumeric(+offset)) {
	    offsets = [+offset, 0];
	  } else {
	    offsets = parseOffset(offset, popper, reference, basePlacement);
	  }

	  if (basePlacement === 'left') {
	    popper.top += offsets[0];
	    popper.left -= offsets[1];
	  } else if (basePlacement === 'right') {
	    popper.top += offsets[0];
	    popper.left += offsets[1];
	  } else if (basePlacement === 'top') {
	    popper.left += offsets[0];
	    popper.top -= offsets[1];
	  } else if (basePlacement === 'bottom') {
	    popper.left += offsets[0];
	    popper.top += offsets[1];
	  }

	  data.popper = popper;
	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function preventOverflow(data, options) {
	  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

	  // If offsetParent is the reference element, we really want to
	  // go one step up and use the next offsetParent as reference to
	  // avoid to make this modifier completely useless and look like broken
	  if (data.instance.reference === boundariesElement) {
	    boundariesElement = getOffsetParent(boundariesElement);
	  }

	  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
	  options.boundaries = boundaries;

	  var order = options.priority;
	  var popper = data.offsets.popper;

	  var check = {
	    primary: function primary(placement) {
	      var value = popper[placement];
	      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
	        value = Math.max(popper[placement], boundaries[placement]);
	      }
	      return defineProperty({}, placement, value);
	    },
	    secondary: function secondary(placement) {
	      var mainSide = placement === 'right' ? 'left' : 'top';
	      var value = popper[mainSide];
	      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
	        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
	      }
	      return defineProperty({}, mainSide, value);
	    }
	  };

	  order.forEach(function (placement) {
	    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
	    popper = _extends({}, popper, check[side](placement));
	  });

	  data.offsets.popper = popper;

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function shift(data) {
	  var placement = data.placement;
	  var basePlacement = placement.split('-')[0];
	  var shiftvariation = placement.split('-')[1];

	  // if shift shiftvariation is specified, run the modifier
	  if (shiftvariation) {
	    var _data$offsets = data.offsets,
	        reference = _data$offsets.reference,
	        popper = _data$offsets.popper;

	    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
	    var side = isVertical ? 'left' : 'top';
	    var measurement = isVertical ? 'width' : 'height';

	    var shiftOffsets = {
	      start: defineProperty({}, side, reference[side]),
	      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
	    };

	    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
	  }

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function hide(data) {
	  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
	    return data;
	  }

	  var refRect = data.offsets.reference;
	  var bound = find(data.instance.modifiers, function (modifier) {
	    return modifier.name === 'preventOverflow';
	  }).boundaries;

	  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
	    // Avoid unnecessary DOM access if visibility hasn't changed
	    if (data.hide === true) {
	      return data;
	    }

	    data.hide = true;
	    data.attributes['x-out-of-boundaries'] = '';
	  } else {
	    // Avoid unnecessary DOM access if visibility hasn't changed
	    if (data.hide === false) {
	      return data;
	    }

	    data.hide = false;
	    data.attributes['x-out-of-boundaries'] = false;
	  }

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function inner(data) {
	  var placement = data.placement;
	  var basePlacement = placement.split('-')[0];
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

	  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

	  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

	  data.placement = getOppositePlacement(placement);
	  data.offsets.popper = getClientRect(popper);

	  return data;
	}

	/**
	 * Modifier function, each modifier can have a function of this type assigned
	 * to its `fn` property.<br />
	 * These functions will be called on each update, this means that you must
	 * make sure they are performant enough to avoid performance bottlenecks.
	 *
	 * @function ModifierFn
	 * @argument {dataObject} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {dataObject} The data object, properly modified
	 */

	/**
	 * Modifiers are plugins used to alter the behavior of your poppers.<br />
	 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
	 * needed by the library.
	 *
	 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
	 * All the other properties are configurations that could be tweaked.
	 * @namespace modifiers
	 */
	var modifiers = {
	  /**
	   * Modifier used to shift the popper on the start or end of its reference
	   * element.<br />
	   * It will read the variation of the `placement` property.<br />
	   * It can be one either `-end` or `-start`.
	   * @memberof modifiers
	   * @inner
	   */
	  shift: {
	    /** @prop {number} order=100 - Index used to define the order of execution */
	    order: 100,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: shift
	  },

	  /**
	   * The `offset` modifier can shift your popper on both its axis.
	   *
	   * It accepts the following units:
	   * - `px` or unitless, interpreted as pixels
	   * - `%` or `%r`, percentage relative to the length of the reference element
	   * - `%p`, percentage relative to the length of the popper element
	   * - `vw`, CSS viewport width unit
	   * - `vh`, CSS viewport height unit
	   *
	   * For length is intended the main axis relative to the placement of the popper.<br />
	   * This means that if the placement is `top` or `bottom`, the length will be the
	   * `width`. In case of `left` or `right`, it will be the height.
	   *
	   * You can provide a single value (as `Number` or `String`), or a pair of values
	   * as `String` divided by a comma or one (or more) white spaces.<br />
	   * The latter is a deprecated method because it leads to confusion and will be
	   * removed in v2.<br />
	   * Additionally, it accepts additions and subtractions between different units.
	   * Note that multiplications and divisions aren't supported.
	   *
	   * Valid examples are:
	   * ```
	   * 10
	   * '10%'
	   * '10, 10'
	   * '10%, 10'
	   * '10 + 10%'
	   * '10 - 5vh + 3%'
	   * '-10px + 5vh, 5px - 6%'
	   * ```
	   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
	   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
	   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  offset: {
	    /** @prop {number} order=200 - Index used to define the order of execution */
	    order: 200,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: offset,
	    /** @prop {Number|String} offset=0
	     * The offset value as described in the modifier description
	     */
	    offset: 0
	  },

	  /**
	   * Modifier used to prevent the popper from being positioned outside the boundary.
	   *
	   * An scenario exists where the reference itself is not within the boundaries.<br />
	   * We can say it has "escaped the boundaries" — or just "escaped".<br />
	   * In this case we need to decide whether the popper should either:
	   *
	   * - detach from the reference and remain "trapped" in the boundaries, or
	   * - if it should ignore the boundary and "escape with its reference"
	   *
	   * When `escapeWithReference` is set to`true` and reference is completely
	   * outside its boundaries, the popper will overflow (or completely leave)
	   * the boundaries in order to remain attached to the edge of the reference.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  preventOverflow: {
	    /** @prop {number} order=300 - Index used to define the order of execution */
	    order: 300,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: preventOverflow,
	    /**
	     * @prop {Array} [priority=['left','right','top','bottom']]
	     * Popper will try to prevent overflow following these priorities by default,
	     * then, it could overflow on the left and on top of the `boundariesElement`
	     */
	    priority: ['left', 'right', 'top', 'bottom'],
	    /**
	     * @prop {number} padding=5
	     * Amount of pixel used to define a minimum distance between the boundaries
	     * and the popper this makes sure the popper has always a little padding
	     * between the edges of its container
	     */
	    padding: 5,
	    /**
	     * @prop {String|HTMLElement} boundariesElement='scrollParent'
	     * Boundaries used by the modifier, can be `scrollParent`, `window`,
	     * `viewport` or any DOM element.
	     */
	    boundariesElement: 'scrollParent'
	  },

	  /**
	   * Modifier used to make sure the reference and its popper stay near eachothers
	   * without leaving any gap between the two. Expecially useful when the arrow is
	   * enabled and you want to assure it to point to its reference element.
	   * It cares only about the first axis, you can still have poppers with margin
	   * between the popper and its reference element.
	   * @memberof modifiers
	   * @inner
	   */
	  keepTogether: {
	    /** @prop {number} order=400 - Index used to define the order of execution */
	    order: 400,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: keepTogether
	  },

	  /**
	   * This modifier is used to move the `arrowElement` of the popper to make
	   * sure it is positioned between the reference element and its popper element.
	   * It will read the outer size of the `arrowElement` node to detect how many
	   * pixels of conjuction are needed.
	   *
	   * It has no effect if no `arrowElement` is provided.
	   * @memberof modifiers
	   * @inner
	   */
	  arrow: {
	    /** @prop {number} order=500 - Index used to define the order of execution */
	    order: 500,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: arrow,
	    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
	    element: '[x-arrow]'
	  },

	  /**
	   * Modifier used to flip the popper's placement when it starts to overlap its
	   * reference element.
	   *
	   * Requires the `preventOverflow` modifier before it in order to work.
	   *
	   * **NOTE:** this modifier will interrupt the current update cycle and will
	   * restart it if it detects the need to flip the placement.
	   * @memberof modifiers
	   * @inner
	   */
	  flip: {
	    /** @prop {number} order=600 - Index used to define the order of execution */
	    order: 600,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: flip,
	    /**
	     * @prop {String|Array} behavior='flip'
	     * The behavior used to change the popper's placement. It can be one of
	     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
	     * placements (with optional variations).
	     */
	    behavior: 'flip',
	    /**
	     * @prop {number} padding=5
	     * The popper will flip if it hits the edges of the `boundariesElement`
	     */
	    padding: 5,
	    /**
	     * @prop {String|HTMLElement} boundariesElement='viewport'
	     * The element which will define the boundaries of the popper position,
	     * the popper will never be placed outside of the defined boundaries
	     * (except if keepTogether is enabled)
	     */
	    boundariesElement: 'viewport'
	  },

	  /**
	   * Modifier used to make the popper flow toward the inner of the reference element.
	   * By default, when this modifier is disabled, the popper will be placed outside
	   * the reference element.
	   * @memberof modifiers
	   * @inner
	   */
	  inner: {
	    /** @prop {number} order=700 - Index used to define the order of execution */
	    order: 700,
	    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
	    enabled: false,
	    /** @prop {ModifierFn} */
	    fn: inner
	  },

	  /**
	   * Modifier used to hide the popper when its reference element is outside of the
	   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
	   * be used to hide with a CSS selector the popper when its reference is
	   * out of boundaries.
	   *
	   * Requires the `preventOverflow` modifier before it in order to work.
	   * @memberof modifiers
	   * @inner
	   */
	  hide: {
	    /** @prop {number} order=800 - Index used to define the order of execution */
	    order: 800,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: hide
	  },

	  /**
	   * Computes the style that will be applied to the popper element to gets
	   * properly positioned.
	   *
	   * Note that this modifier will not touch the DOM, it just prepares the styles
	   * so that `applyStyle` modifier can apply it. This separation is useful
	   * in case you need to replace `applyStyle` with a custom implementation.
	   *
	   * This modifier has `850` as `order` value to maintain backward compatibility
	   * with previous versions of Popper.js. Expect the modifiers ordering method
	   * to change in future major versions of the library.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  computeStyle: {
	    /** @prop {number} order=850 - Index used to define the order of execution */
	    order: 850,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: computeStyle,
	    /**
	     * @prop {Boolean} gpuAcceleration=true
	     * If true, it uses the CSS 3d transformation to position the popper.
	     * Otherwise, it will use the `top` and `left` properties.
	     */
	    gpuAcceleration: true,
	    /**
	     * @prop {string} [x='bottom']
	     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
	     * Change this if your popper should grow in a direction different from `bottom`
	     */
	    x: 'bottom',
	    /**
	     * @prop {string} [x='left']
	     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
	     * Change this if your popper should grow in a direction different from `right`
	     */
	    y: 'right'
	  },

	  /**
	   * Applies the computed styles to the popper element.
	   *
	   * All the DOM manipulations are limited to this modifier. This is useful in case
	   * you want to integrate Popper.js inside a framework or view library and you
	   * want to delegate all the DOM manipulations to it.
	   *
	   * Note that if you disable this modifier, you must make sure the popper element
	   * has its position set to `absolute` before Popper.js can do its work!
	   *
	   * Just disable this modifier and define you own to achieve the desired effect.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  applyStyle: {
	    /** @prop {number} order=900 - Index used to define the order of execution */
	    order: 900,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: applyStyle,
	    /** @prop {Function} */
	    onLoad: applyStyleOnLoad,
	    /**
	     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
	     * @prop {Boolean} gpuAcceleration=true
	     * If true, it uses the CSS 3d transformation to position the popper.
	     * Otherwise, it will use the `top` and `left` properties.
	     */
	    gpuAcceleration: undefined
	  }
	};

	/**
	 * The `dataObject` is an object containing all the informations used by Popper.js
	 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
	 * @name dataObject
	 * @property {Object} data.instance The Popper.js instance
	 * @property {String} data.placement Placement applied to popper
	 * @property {String} data.originalPlacement Placement originally defined on init
	 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
	 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
	 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
	 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
	 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
	 * @property {Object} data.boundaries Offsets of the popper boundaries
	 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
	 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
	 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
	 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
	 */

	/**
	 * Default options provided to Popper.js constructor.<br />
	 * These can be overriden using the `options` argument of Popper.js.<br />
	 * To override an option, simply pass as 3rd argument an object with the same
	 * structure of this object, example:
	 * ```
	 * new Popper(ref, pop, {
	 *   modifiers: {
	 *     preventOverflow: { enabled: false }
	 *   }
	 * })
	 * ```
	 * @type {Object}
	 * @static
	 * @memberof Popper
	 */
	var Defaults = {
	  /**
	   * Popper's placement
	   * @prop {Popper.placements} placement='bottom'
	   */
	  placement: 'bottom',

	  /**
	   * Whether events (resize, scroll) are initially enabled
	   * @prop {Boolean} eventsEnabled=true
	   */
	  eventsEnabled: true,

	  /**
	   * Set to true if you want to automatically remove the popper when
	   * you call the `destroy` method.
	   * @prop {Boolean} removeOnDestroy=false
	   */
	  removeOnDestroy: false,

	  /**
	   * Callback called when the popper is created.<br />
	   * By default, is set to no-op.<br />
	   * Access Popper.js instance with `data.instance`.
	   * @prop {onCreate}
	   */
	  onCreate: function onCreate() {},

	  /**
	   * Callback called when the popper is updated, this callback is not called
	   * on the initialization/creation of the popper, but only on subsequent
	   * updates.<br />
	   * By default, is set to no-op.<br />
	   * Access Popper.js instance with `data.instance`.
	   * @prop {onUpdate}
	   */
	  onUpdate: function onUpdate() {},

	  /**
	   * List of modifiers used to modify the offsets before they are applied to the popper.
	   * They provide most of the functionalities of Popper.js
	   * @prop {modifiers}
	   */
	  modifiers: modifiers
	};

	/**
	 * @callback onCreate
	 * @param {dataObject} data
	 */

	/**
	 * @callback onUpdate
	 * @param {dataObject} data
	 */

	// Utils
	// Methods
	var Popper = function () {
	  /**
	   * Create a new Popper.js instance
	   * @class Popper
	   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
	   * @param {HTMLElement} popper - The HTML element used as popper.
	   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
	   * @return {Object} instance - The generated Popper.js instance
	   */
	  function Popper(reference, popper) {
	    var _this = this;

	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    classCallCheck(this, Popper);

	    this.scheduleUpdate = function () {
	      return requestAnimationFrame(_this.update);
	    };

	    // make update() debounced, so that it only runs at most once-per-tick
	    this.update = debounce(this.update.bind(this));

	    // with {} we create a new object with the options inside it
	    this.options = _extends({}, Popper.Defaults, options);

	    // init state
	    this.state = {
	      isDestroyed: false,
	      isCreated: false,
	      scrollParents: []
	    };

	    // get reference and popper elements (allow jQuery wrappers)
	    this.reference = reference.jquery ? reference[0] : reference;
	    this.popper = popper.jquery ? popper[0] : popper;

	    // Deep merge modifiers options
	    this.options.modifiers = {};
	    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
	      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
	    });

	    // Refactoring modifiers' list (Object => Array)
	    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
	      return _extends({
	        name: name
	      }, _this.options.modifiers[name]);
	    })
	    // sort the modifiers by order
	    .sort(function (a, b) {
	      return a.order - b.order;
	    });

	    // modifiers have the ability to execute arbitrary code when Popper.js get inited
	    // such code is executed in the same order of its modifier
	    // they could add new properties to their options configuration
	    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
	    this.modifiers.forEach(function (modifierOptions) {
	      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
	        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
	      }
	    });

	    // fire the first update to position the popper in the right place
	    this.update();

	    var eventsEnabled = this.options.eventsEnabled;
	    if (eventsEnabled) {
	      // setup event listeners, they will take care of update the position in specific situations
	      this.enableEventListeners();
	    }

	    this.state.eventsEnabled = eventsEnabled;
	  }

	  // We can't use class properties because they don't get listed in the
	  // class prototype and break stuff like Sinon stubs


	  createClass(Popper, [{
	    key: 'update',
	    value: function update$$1() {
	      return update.call(this);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy$$1() {
	      return destroy.call(this);
	    }
	  }, {
	    key: 'enableEventListeners',
	    value: function enableEventListeners$$1() {
	      return enableEventListeners.call(this);
	    }
	  }, {
	    key: 'disableEventListeners',
	    value: function disableEventListeners$$1() {
	      return disableEventListeners.call(this);
	    }

	    /**
	     * Schedule an update, it will run on the next UI update available
	     * @method scheduleUpdate
	     * @memberof Popper
	     */


	    /**
	     * Collection of utilities useful when writing custom modifiers.
	     * Starting from version 1.7, this method is available only if you
	     * include `popper-utils.js` before `popper.js`.
	     *
	     * **DEPRECATION**: This way to access PopperUtils is deprecated
	     * and will be removed in v2! Use the PopperUtils module directly instead.
	     * Due to the high instability of the methods contained in Utils, we can't
	     * guarantee them to follow semver. Use them at your own risk!
	     * @static
	     * @private
	     * @type {Object}
	     * @deprecated since version 1.8
	     * @member Utils
	     * @memberof Popper
	     */

	  }]);
	  return Popper;
	}();

	/**
	 * The `referenceObject` is an object that provides an interface compatible with Popper.js
	 * and lets you use it as replacement of a real DOM node.<br />
	 * You can use this method to position a popper relatively to a set of coordinates
	 * in case you don't have a DOM node to use as reference.
	 *
	 * ```
	 * new Popper(referenceObject, popperNode);
	 * ```
	 *
	 * NB: This feature isn't supported in Internet Explorer 10
	 * @name referenceObject
	 * @property {Function} data.getBoundingClientRect
	 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
	 * @property {number} data.clientWidth
	 * An ES6 getter that will return the width of the virtual reference element.
	 * @property {number} data.clientHeight
	 * An ES6 getter that will return the height of the virtual reference element.
	 */


	Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
	Popper.placements = placements;
	Popper.Defaults = Defaults;

	return Popper;

	})));
	//# sourceMappingURL=popper.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * is-equal-shallow <https://github.com/jonschlinkert/is-equal-shallow>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isPrimitive = __webpack_require__(28);

	module.exports = function isEqual(a, b) {
	  if (!a && !b) { return true; }
	  if (!a && b || a && !b) { return false; }

	  var numKeysA = 0, numKeysB = 0, key;
	  for (key in b) {
	    numKeysB++;
	    if (!isPrimitive(b[key]) || !a.hasOwnProperty(key) || (a[key] !== b[key])) {
	      return false;
	    }
	  }
	  for (key in a) {
	    numKeysA++;
	  }
	  return numKeysA === numKeysB;
	};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	/*!
	 * is-primitive <https://github.com/jonschlinkert/is-primitive>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	// see http://jsperf.com/testing-value-is-primitive/7
	module.exports = function isPrimitive(value) {
	  return value == null || (typeof value !== 'function' && typeof value !== 'object');
	};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(4);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var Arrow = function Arrow(props, context) {
	  var _props$component = props.component,
	      component = _props$component === undefined ? 'span' : _props$component,
	      innerRef = props.innerRef,
	      children = props.children,
	      restProps = _objectWithoutProperties(props, ['component', 'innerRef', 'children']);

	  var popper = context.popper;

	  var arrowRef = function arrowRef(node) {
	    popper.setArrowNode(node);
	    if (typeof innerRef === 'function') {
	      innerRef(node);
	    }
	  };
	  var arrowStyle = popper.getArrowStyle();

	  if (typeof children === 'function') {
	    var arrowProps = {
	      ref: arrowRef,
	      style: arrowStyle
	    };
	    return children({ arrowProps: arrowProps, restProps: restProps });
	  }

	  var componentProps = _extends({}, restProps, {
	    style: _extends({}, arrowStyle, restProps.style)
	  });

	  if (typeof component === 'string') {
	    componentProps.ref = arrowRef;
	  } else {
	    componentProps.innerRef = arrowRef;
	  }

	  return (0, _react.createElement)(component, componentProps, children);
	};

	Arrow.contextTypes = {
	  popper: _propTypes2.default.object.isRequired
	};

	Arrow.propTypes = {
	  component: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
	  innerRef: _propTypes2.default.func,
	  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])
	};

	exports.default = Arrow;

/***/ })
/******/ ])
});
;