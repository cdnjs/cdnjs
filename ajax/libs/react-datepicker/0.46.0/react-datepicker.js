(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("react"), require("react-onclickoutside"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["moment", "react", "react-onclickoutside", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["DatePicker"] = factory(require("moment"), require("react"), require("react-onclickoutside"), require("react-dom"));
	else
		root["DatePicker"] = factory(root["moment"], root["React"], root["onClickOutside"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_20__) {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _calendar = __webpack_require__(1);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _tether_component = __webpack_require__(19);

	var _tether_component2 = _interopRequireDefault(_tether_component);

	var _classnames2 = __webpack_require__(10);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _date_utils = __webpack_require__(17);

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

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
	        dateFormat: 'L',
	        dateFormatCalendar: 'MMMM YYYY',
	        onChange: function onChange() {},

	        disabled: false,
	        disabledKeyboardNavigation: false,
	        dropdownMode: 'scroll',
	        onFocus: function onFocus() {},
	        onBlur: function onBlur() {},
	        onSelect: function onSelect() {},
	        onClickOutside: function onClickOutside() {},
	        onMonthChange: function onMonthChange() {},

	        popoverAttachment: 'top left',
	        popoverTargetAttachment: 'bottom left',
	        popoverTargetOffset: '10px 0',
	        tetherConstraints: [{
	          to: 'window',
	          attachment: 'together'
	        }],
	        utcOffset: (0, _moment2.default)().utcOffset(),
	        monthsShown: 1,
	        withPortal: false
	      };
	    }
	  }]);

	  function DatePicker(props) {
	    _classCallCheck(this, DatePicker);

	    var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

	    _this.getInitialState = function () {
	      var defaultPreSelection = _this.props.openToDate ? (0, _moment2.default)(_this.props.openToDate) : _this.props.selectsEnd && _this.props.startDate ? (0, _moment2.default)(_this.props.startDate) : _this.props.selectsStart && _this.props.endDate ? (0, _moment2.default)(_this.props.endDate) : (0, _moment2.default)();
	      var minDate = (0, _date_utils.getEffectiveMinDate)(_this.props);
	      var maxDate = (0, _date_utils.getEffectiveMaxDate)(_this.props);
	      var boundedPreSelection = minDate && defaultPreSelection.isBefore(minDate) ? minDate : maxDate && defaultPreSelection.isAfter(maxDate) ? maxDate : defaultPreSelection;

	      return {
	        open: false,
	        preventFocus: false,
	        preSelection: _this.props.selected ? (0, _moment2.default)(_this.props.selected) : boundedPreSelection
	      };
	    };

	    _this.clearPreventFocusTimeout = function () {
	      if (_this.preventFocusTimeout) {
	        clearTimeout(_this.preventFocusTimeout);
	      }
	    };

	    _this.setFocus = function () {
	      _this.refs.input.focus();
	    };

	    _this.setOpen = function (open) {
	      _this.setState({
	        open: open,
	        preSelection: open && _this.state.open ? _this.state.preSelection : _this.getInitialState().preSelection
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
	      _this.inputFocusTimeout = window.setTimeout(function () {
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
	      _this.setOpen(false);
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
	      _this.setOpen(false);
	    };

	    _this.setSelected = function (date, event, keepInput) {
	      var changedDate = date;

	      if (changedDate !== null && (0, _date_utils.isDayDisabled)(changedDate, _this.props)) {
	        return;
	      }

	      if (!(0, _date_utils.isSameDay)(_this.props.selected, changedDate)) {
	        if (changedDate !== null) {
	          if (_this.props.selected) {
	            changedDate = (0, _moment2.default)(changedDate).set({
	              hour: _this.props.selected.hour(),
	              minute: _this.props.selected.minute(),
	              second: _this.props.selected.second()
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

	    _this.onInputClick = function () {
	      if (!_this.props.disabled) {
	        _this.setOpen(true);
	      }
	    };

	    _this.onInputKeyDown = function (event) {
	      if (!_this.state.open && !_this.props.inline) {
	        if (/^Arrow/.test(event.key)) {
	          _this.onInputClick();
	        }
	        return;
	      }
	      var copy = (0, _moment2.default)(_this.state.preSelection);
	      if (event.key === 'Enter') {
	        event.preventDefault();
	        _this.handleSelect(copy, event);
	      } else if (event.key === 'Escape') {
	        event.preventDefault();
	        _this.setOpen(false);
	      } else if (event.key === 'Tab') {
	        _this.setOpen(false);
	      }
	      if (!_this.props.disabledKeyboardNavigation) {
	        var newSelection = void 0;
	        switch (event.key) {
	          case 'ArrowLeft':
	            event.preventDefault();
	            newSelection = copy.subtract(1, 'days');
	            break;
	          case 'ArrowRight':
	            event.preventDefault();
	            newSelection = copy.add(1, 'days');
	            break;
	          case 'ArrowUp':
	            event.preventDefault();
	            newSelection = copy.subtract(1, 'weeks');
	            break;
	          case 'ArrowDown':
	            event.preventDefault();
	            newSelection = copy.add(1, 'weeks');
	            break;
	          case 'PageUp':
	            event.preventDefault();
	            newSelection = copy.subtract(1, 'months');
	            break;
	          case 'PageDown':
	            event.preventDefault();
	            newSelection = copy.add(1, 'months');
	            break;
	          case 'Home':
	            event.preventDefault();
	            newSelection = copy.subtract(1, 'years');
	            break;
	          case 'End':
	            event.preventDefault();
	            newSelection = copy.add(1, 'years');
	            break;
	        }
	        _this.setPreSelection(newSelection);
	      }
	    };

	    _this.onClearClick = function (event) {
	      event.preventDefault();
	      _this.props.onChange(null, event);
	    };

	    _this.renderCalendar = function () {
	      if (!_this.props.inline && (!_this.state.open || _this.props.disabled)) {
	        return null;
	      }
	      return _react2.default.createElement(
	        WrappedCalendar,
	        {
	          ref: 'calendar',
	          locale: _this.props.locale,
	          dateFormat: _this.props.dateFormatCalendar,
	          dropdownMode: _this.props.dropdownMode,
	          selected: _this.props.selected,
	          preSelection: _this.state.preSelection,
	          onSelect: _this.handleSelect,
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
	          highlightDates: _this.props.highlightDates,
	          includeDates: _this.props.includeDates,
	          inline: _this.props.inline,
	          peekNextMonth: _this.props.peekNextMonth,
	          showMonthDropdown: _this.props.showMonthDropdown,
	          showWeekNumbers: _this.props.showWeekNumbers,
	          showYearDropdown: _this.props.showYearDropdown,
	          forceShowMonthNavigation: _this.props.forceShowMonthNavigation,
	          scrollableYearDropdown: _this.props.scrollableYearDropdown,
	          todayButton: _this.props.todayButton,
	          utcOffset: _this.props.utcOffset,
	          outsideClickIgnoreClass: outsideClickIgnoreClass,
	          fixedHeight: _this.props.fixedHeight,
	          monthsShown: _this.props.monthsShown,
	          onDropdownFocus: _this.handleDropdownFocus,
	          onMonthChange: _this.props.onMonthChange,
	          className: _this.props.calendarClassName },
	        _this.props.children
	      );
	    };

	    _this.renderDateInput = function () {
	      var className = (0, _classnames3.default)(_this.props.className, _defineProperty({}, outsideClickIgnoreClass, _this.state.open));

	      var customInput = _this.props.customInput || _react2.default.createElement('input', { type: 'text' });
	      var inputValue = typeof _this.props.value === 'string' ? _this.props.value : typeof _this.state.inputValue === 'string' ? _this.state.inputValue : (0, _date_utils.safeDateFormat)(_this.props.selected, _this.props);

	      return _react2.default.cloneElement(customInput, {
	        ref: 'input',
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

	    _this.state = _this.getInitialState();
	    return _this;
	  }

	  _createClass(DatePicker, [{
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

	      return _react2.default.createElement(
	        _tether_component2.default,
	        {
	          classPrefix: 'react-datepicker__tether',
	          attachment: this.props.popoverAttachment,
	          targetAttachment: this.props.popoverTargetAttachment,
	          targetOffset: this.props.popoverTargetOffset,
	          renderElementTo: this.props.renderCalendarTo,
	          constraints: this.props.tetherConstraints },
	        _react2.default.createElement(
	          'div',
	          { className: 'react-datepicker__input-container' },
	          this.renderDateInput(),
	          this.renderClearButton()
	        ),
	        calendar
	      );
	    }
	  }]);

	  return DatePicker;
	}(_react2.default.Component);

	DatePicker.propTypes = {
	  autoComplete: _propTypes2.default.string,
	  autoFocus: _propTypes2.default.bool,
	  calendarClassName: _propTypes2.default.string,
	  children: _propTypes2.default.node,
	  className: _propTypes2.default.string,
	  customInput: _propTypes2.default.element,
	  dateFormat: _propTypes2.default.oneOfType([// eslint-disable-line react/no-unused-prop-types
	  _propTypes2.default.string, _propTypes2.default.array]),
	  dateFormatCalendar: _propTypes2.default.string,
	  disabled: _propTypes2.default.bool,
	  disabledKeyboardNavigation: _propTypes2.default.bool,
	  dropdownMode: _propTypes2.default.oneOf(['scroll', 'select']).isRequired,
	  endDate: _propTypes2.default.object,
	  excludeDates: _propTypes2.default.array,
	  filterDate: _propTypes2.default.func,
	  fixedHeight: _propTypes2.default.bool,
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
	  onClickOutside: _propTypes2.default.func,
	  onChangeRaw: _propTypes2.default.func,
	  onFocus: _propTypes2.default.func,
	  onMonthChange: _propTypes2.default.func,
	  openToDate: _propTypes2.default.object,
	  peekNextMonth: _propTypes2.default.bool,
	  placeholderText: _propTypes2.default.string,
	  popoverAttachment: _propTypes2.default.string,
	  popoverTargetAttachment: _propTypes2.default.string,
	  popoverTargetOffset: _propTypes2.default.string,
	  readOnly: _propTypes2.default.bool,
	  renderCalendarTo: _propTypes2.default.any,
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
	  tabIndex: _propTypes2.default.number,
	  tetherConstraints: _propTypes2.default.array,
	  title: _propTypes2.default.string,
	  todayButton: _propTypes2.default.string,
	  utcOffset: _propTypes2.default.number,
	  value: _propTypes2.default.string,
	  withPortal: _propTypes2.default.bool
	};
	exports.default = DatePicker;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	var _year_dropdown = __webpack_require__(3);

	var _year_dropdown2 = _interopRequireDefault(_year_dropdown);

	var _month_dropdown = __webpack_require__(12);

	var _month_dropdown2 = _interopRequireDefault(_month_dropdown);

	var _month = __webpack_require__(14);

	var _month2 = _interopRequireDefault(_month);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(10);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _date_utils = __webpack_require__(17);

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
	        utcOffset: _moment2.default.utc().utcOffset(),
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
	      var current = _moment2.default.utc().utcOffset(utcOffset);
	      var initialDate = preSelection || selected;
	      if (initialDate) {
	        return initialDate;
	      } else if (minDate && maxDate && openToDate && openToDate.isBetween(minDate, maxDate)) {
	        return openToDate;
	      } else if (minDate && openToDate && openToDate.isAfter(minDate)) {
	        return openToDate;
	      } else if (minDate && minDate.isAfter(current)) {
	        return minDate;
	      } else if (maxDate && openToDate && openToDate.isBefore(maxDate)) {
	        return openToDate;
	      } else if (maxDate && maxDate.isBefore(current)) {
	        return maxDate;
	      } else if (openToDate) {
	        return openToDate;
	      } else {
	        return current;
	      }
	    };

	    _this.localizeMoment = function (date) {
	      return date.clone().locale(_this.props.locale || _moment2.default.locale());
	    };

	    _this.increaseMonth = function () {
	      _this.setState({
	        date: _this.state.date.clone().add(1, 'month')
	      }, function () {
	        return _this.handleMonthChange(_this.state.date);
	      });
	    };

	    _this.decreaseMonth = function () {
	      _this.setState({
	        date: _this.state.date.clone().subtract(1, 'month')
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
	        date: _this.state.date.clone().set('year', year)
	      });
	    };

	    _this.changeMonth = function (month) {
	      _this.setState({
	        date: _this.state.date.clone().set('month', month)
	      }, function () {
	        return _this.handleMonthChange(_this.state.date);
	      });
	    };

	    _this.header = function () {
	      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.date;

	      var startOfWeek = date.clone().startOf('week');
	      var dayNames = [];
	      if (_this.props.showWeekNumbers) {
	        dayNames.push(_react2.default.createElement(
	          'div',
	          { key: 'W', className: 'react-datepicker__day-name' },
	          '#'
	        ));
	      }
	      return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
	        var day = startOfWeek.clone().add(offset, 'days');
	        return _react2.default.createElement(
	          'div',
	          { key: offset, className: 'react-datepicker__day-name' },
	          day.localeData().weekdaysMin(day)
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
	      return _react2.default.createElement('a', {
	        className: 'react-datepicker__navigation react-datepicker__navigation--next',
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
	        date.format(_this.props.dateFormat)
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
	        year: _this.state.date.year(),
	        scrollableYearDropdown: _this.props.scrollableYearDropdown });
	    };

	    _this.renderMonthDropdown = function () {
	      var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      if (!_this.props.showMonthDropdown) {
	        return;
	      }
	      return _react2.default.createElement(_month_dropdown2.default, {
	        dropdownMode: _this.props.dropdownMode,
	        locale: _this.props.locale,
	        onChange: _this.changeMonth,
	        month: _this.state.date.month() });
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
	            return _this.props.onSelect(_moment2.default.utc().utcOffset(_this.props.utcOffset).startOf('date'), e);
	          } },
	        _this.props.todayButton
	      );
	    };

	    _this.renderMonths = function () {
	      var monthList = [];
	      for (var i = 0; i < _this.props.monthsShown; ++i) {
	        var monthDate = _this.state.date.clone().add(i, 'M');
	        var monthKey = 'month-' + i;
	        monthList.push(_react2.default.createElement(
	          'div',
	          { key: monthKey, className: 'react-datepicker__month-container' },
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
	            onDayClick: _this.handleDayClick,
	            onDayMouseEnter: _this.handleDayMouseEnter,
	            onMouseLeave: _this.handleMonthMouseLeave,
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

	    _this.state = {
	      date: _this.localizeMoment(_this.getDateInView()),
	      selectingDate: null
	    };
	    return _this;
	  }

	  _createClass(Calendar, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.preSelection && !(0, _date_utils.isSameDay)(nextProps.preSelection, this.props.preSelection)) {
	        this.setState({
	          date: this.localizeMoment(nextProps.preSelection)
	        });
	      } else if (nextProps.openToDate && !(0, _date_utils.isSameDay)(nextProps.openToDate, this.props.openToDate)) {
	        this.setState({
	          date: this.localizeMoment(nextProps.openToDate)
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
	  dropdownMode: _propTypes2.default.oneOf(['scroll', 'select']).isRequired,
	  endDate: _propTypes2.default.object,
	  excludeDates: _propTypes2.default.array,
	  filterDate: _propTypes2.default.func,
	  fixedHeight: _propTypes2.default.bool,
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
	  utcOffset: _propTypes2.default.number
	};
	exports.default = Calendar;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _year_dropdown_options = __webpack_require__(9);

	var _year_dropdown_options2 = _interopRequireDefault(_year_dropdown_options);

	var _reactOnclickoutside = __webpack_require__(11);

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

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
	      var minYear = _this.props.minDate ? _this.props.minDate.year() : 1900;
	      var maxYear = _this.props.maxDate ? _this.props.maxDate.year() : 2100;

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
	        scrollableYearDropdown: _this.props.scrollableYearDropdown });
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
	  year: _propTypes2.default.number.isRequired
	};
	exports.default = YearDropdown;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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
	  module.exports = __webpack_require__(6)();
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(7);
	var invariant = __webpack_require__(8);

	module.exports = function() {
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  function shim() {
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


/***/ },
/* 7 */
/***/ function(module, exports) {

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(10);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function generateYears(year, noOfYear) {
	  var list = [];
	  for (var i = 0; i < 2 * noOfYear; i++) {
	    list.push(year + noOfYear - i);
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

	      options.unshift(_react2.default.createElement(
	        'div',
	        { className: 'react-datepicker__year-option',
	          ref: 'upcoming',
	          key: 'upcoming',
	          onClick: _this.incrementYears },
	        _react2.default.createElement('a', { className: 'react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming' })
	      ));
	      options.push(_react2.default.createElement(
	        'div',
	        { className: 'react-datepicker__year-option',
	          ref: 'previous',
	          key: 'previous',
	          onClick: _this.decrementYears },
	        _react2.default.createElement('a', { className: 'react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous' })
	      ));
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

	    _this.state = {
	      yearsList: _this.props.scrollableYearDropdown ? generateYears(_this.props.year, 10) : generateYears(_this.props.year, 5)
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
	  onCancel: _propTypes2.default.func.isRequired,
	  onChange: _propTypes2.default.func.isRequired,
	  scrollableYearDropdown: _propTypes2.default.bool,
	  year: _propTypes2.default.number.isRequired
	};
	exports.default = YearDropdownOptions;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _month_dropdown_options = __webpack_require__(13);

	var _month_dropdown_options2 = _interopRequireDefault(_month_dropdown_options);

	var _reactOnclickoutside = __webpack_require__(11);

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

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
	      var localeData = _moment2.default.localeData(this.props.locale);
	      var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (M) {
	        return localeData.months((0, _moment2.default)({ M: M }));
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
	  month: _propTypes2.default.number.isRequired,
	  onChange: _propTypes2.default.func.isRequired
	};
	exports.default = MonthDropdown;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(10);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _week = __webpack_require__(15);

	var _week2 = _interopRequireDefault(_week);

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
	      var endOfWeek = startOfWeek.clone().add(6, 'days');
	      return startOfWeek.isSame(day, 'month') || endOfWeek.isSame(day, 'month');
	    }, _this.renderWeeks = function () {
	      var weeks = [];
	      var isFixedHeight = _this.props.fixedHeight;
	      var currentWeekStart = _this.props.day.clone().startOf('month').startOf('week');
	      var i = 0;
	      var breakAfterNextPush = false;

	      while (true) {
	        weeks.push(_react2.default.createElement(_week2.default, {
	          key: i,
	          day: currentWeekStart,
	          month: _this.props.day.month(),
	          onDayClick: _this.handleDayClick,
	          onDayMouseEnter: _this.handleDayMouseEnter,
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
	          utcOffset: _this.props.utcOffset }));

	        if (breakAfterNextPush) break;

	        i++;
	        currentWeekStart = currentWeekStart.clone().add(1, 'weeks');

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
	  endDate: _propTypes2.default.object,
	  excludeDates: _propTypes2.default.array,
	  filterDate: _propTypes2.default.func,
	  fixedHeight: _propTypes2.default.bool,
	  highlightDates: _propTypes2.default.array,
	  includeDates: _propTypes2.default.array,
	  inline: _propTypes2.default.bool,
	  maxDate: _propTypes2.default.object,
	  minDate: _propTypes2.default.object,
	  onDayClick: _propTypes2.default.func,
	  onDayMouseEnter: _propTypes2.default.func,
	  onMouseLeave: _propTypes2.default.func,
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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _day = __webpack_require__(16);

	var _day2 = _interopRequireDefault(_day);

	var _week_number = __webpack_require__(18);

	var _week_number2 = _interopRequireDefault(_week_number);

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
	    }, _this.renderDays = function () {
	      var startOfWeek = _this.props.day.clone().startOf('week');
	      var days = [];
	      if (_this.props.showWeekNumber) {
	        days.push(_react2.default.createElement(_week_number2.default, { key: 'W', weekNumber: parseInt(startOfWeek.format('w'), 10) }));
	      }
	      return days.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
	        var day = startOfWeek.clone().add(offset, 'days');
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
	  endDate: _propTypes2.default.object,
	  excludeDates: _propTypes2.default.array,
	  filterDate: _propTypes2.default.func,
	  highlightDates: _propTypes2.default.array,
	  includeDates: _propTypes2.default.array,
	  inline: _propTypes2.default.bool,
	  maxDate: _propTypes2.default.object,
	  minDate: _propTypes2.default.object,
	  month: _propTypes2.default.number,
	  onDayClick: _propTypes2.default.func,
	  onDayMouseEnter: _propTypes2.default.func,
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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(10);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _date_utils = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    }, _this.isHighlighted = function () {
	      var _this$props = _this.props,
	          day = _this$props.day,
	          highlightDates = _this$props.highlightDates;

	      if (!highlightDates) {
	        return false;
	      }
	      return highlightDates.some(function (testDay) {
	        return (0, _date_utils.isSameDay)(day, testDay);
	      });
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
	      var weekday = _this.props.day.day();
	      return weekday === 0 || weekday === 6;
	    }, _this.isOutsideMonth = function () {
	      return _this.props.month !== undefined && _this.props.month !== _this.props.day.month();
	    }, _this.getClassNames = function () {
	      return (0, _classnames2.default)('react-datepicker__day', {
	        'react-datepicker__day--disabled': _this.isDisabled(),
	        'react-datepicker__day--selected': _this.isSameDay(_this.props.selected),
	        'react-datepicker__day--keyboard-selected': _this.isKeyboardSelected(),
	        'react-datepicker__day--highlighted': _this.isHighlighted(),
	        'react-datepicker__day--range-start': _this.isRangeStart(),
	        'react-datepicker__day--range-end': _this.isRangeEnd(),
	        'react-datepicker__day--in-range': _this.isInRange(),
	        'react-datepicker__day--in-selecting-range': _this.isInSelectingRange(),
	        'react-datepicker__day--selecting-range-start': _this.isSelectingRangeStart(),
	        'react-datepicker__day--selecting-range-end': _this.isSelectingRangeEnd(),
	        'react-datepicker__day--today': _this.isSameDay(_moment2.default.utc().utcOffset(_this.props.utcOffset)),
	        'react-datepicker__day--weekend': _this.isWeekend(),
	        'react-datepicker__day--outside-month': _this.isOutsideMonth()
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Day, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        {
	          className: this.getClassNames(),
	          onClick: this.handleClick,
	          onMouseEnter: this.handleMouseEnter,
	          'aria-label': 'day-' + this.props.day.date(),
	          role: 'option' },
	        this.props.day.date()
	      );
	    }
	  }]);

	  return Day;
	}(_react2.default.Component);

	Day.propTypes = {
	  day: _propTypes2.default.object.isRequired,
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
	Day.defaultProps = {
	  utcOffset: _moment2.default.utc().utcOffset()
	};
	exports.default = Day;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isSameDay = isSameDay;
	exports.isSameUtcOffset = isSameUtcOffset;
	exports.isDayInRange = isDayInRange;
	exports.isDayDisabled = isDayDisabled;
	exports.allDaysDisabledBefore = allDaysDisabledBefore;
	exports.allDaysDisabledAfter = allDaysDisabledAfter;
	exports.getEffectiveMinDate = getEffectiveMinDate;
	exports.getEffectiveMaxDate = getEffectiveMaxDate;
	exports.parseDate = parseDate;
	exports.safeDateFormat = safeDateFormat;

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	function isDayDisabled(day) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      minDate = _ref.minDate,
	      maxDate = _ref.maxDate,
	      excludeDates = _ref.excludeDates,
	      includeDates = _ref.includeDates,
	      filterDate = _ref.filterDate;

	  return minDate && day.isBefore(minDate, 'day') || maxDate && day.isAfter(maxDate, 'day') || excludeDates && excludeDates.some(function (excludeDate) {
	    return isSameDay(day, excludeDate);
	  }) || includeDates && !includeDates.some(function (includeDate) {
	    return isSameDay(day, includeDate);
	  }) || filterDate && !filterDate(day.clone()) || false;
	}

	function allDaysDisabledBefore(day, unit) {
	  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      minDate = _ref2.minDate,
	      includeDates = _ref2.includeDates;

	  var dateBefore = day.clone().subtract(1, unit);
	  return minDate && dateBefore.isBefore(minDate, unit) || includeDates && includeDates.every(function (includeDate) {
	    return dateBefore.isBefore(includeDate, unit);
	  }) || false;
	}

	function allDaysDisabledAfter(day, unit) {
	  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      maxDate = _ref3.maxDate,
	      includeDates = _ref3.includeDates;

	  var dateAfter = day.clone().add(1, unit);
	  return maxDate && dateAfter.isAfter(maxDate, unit) || includeDates && includeDates.every(function (includeDate) {
	    return dateAfter.isAfter(includeDate, unit);
	  }) || false;
	}

	function getEffectiveMinDate(_ref4) {
	  var minDate = _ref4.minDate,
	      includeDates = _ref4.includeDates;

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

	function getEffectiveMaxDate(_ref5) {
	  var maxDate = _ref5.maxDate,
	      includeDates = _ref5.includeDates;

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

	function parseDate(value, _ref6) {
	  var dateFormat = _ref6.dateFormat,
	      locale = _ref6.locale;

	  var m = (0, _moment2.default)(value, dateFormat, locale || _moment2.default.locale(), true);
	  return m.isValid() ? m : null;
	}

	function safeDateFormat(date, _ref7) {
	  var dateFormat = _ref7.dateFormat,
	      locale = _ref7.locale;

	  return date && date.clone().locale(locale || _moment2.default.locale()).format(Array.isArray(dateFormat) ? dateFormat[0] : dateFormat) || '';
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WeekNumber = function (_React$Component) {
	  _inherits(WeekNumber, _React$Component);

	  function WeekNumber() {
	    _classCallCheck(this, WeekNumber);

	    return _possibleConstructorReturn(this, (WeekNumber.__proto__ || Object.getPrototypeOf(WeekNumber)).apply(this, arguments));
	  }

	  _createClass(WeekNumber, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        {
	          className: 'react-datepicker__week-number',
	          'aria-label': 'week-' + this.props.weekNumber },
	        this.props.weekNumber
	      );
	    }
	  }]);

	  return WeekNumber;
	}(_react2.default.Component);

	WeekNumber.propTypes = {
	  weekNumber: _propTypes2.default.number.isRequired
	};
	exports.default = WeekNumber;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactDom = __webpack_require__(20);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _tether = __webpack_require__(21);

	var _tether2 = _interopRequireDefault(_tether);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function childrenPropType(_ref, propName, componentName) {
	  var children = _ref.children;

	  var childCount = _react2.default.Children.count(children);
	  if (childCount <= 0) {
	    return new Error(componentName + ' expects at least one child to use as the target element.');
	  } else if (childCount > 2) {
	    return new Error('Only a max of two children allowed in ' + componentName + '.');
	  }
	}

	var attachmentPositions = ['top left', 'top center', 'top right', 'middle left', 'middle center', 'middle right', 'bottom left', 'bottom center', 'bottom right'];

	var TetherComponent = function (_React$Component) {
	  _inherits(TetherComponent, _React$Component);

	  function TetherComponent() {
	    var _ref2;

	    var _temp, _this, _ret;

	    _classCallCheck(this, TetherComponent);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = TetherComponent.__proto__ || Object.getPrototypeOf(TetherComponent)).call.apply(_ref2, [this].concat(args))), _this), _this.disable = function () {
	      return _this._tether.disable();
	    }, _this.enable = function () {
	      return _this._tether.enable();
	    }, _this.position = function () {
	      return _this._tether.position();
	    }, _this._destroy = function () {
	      if (_this._elementParentNode) {
	        _reactDom2.default.unmountComponentAtNode(_this._elementParentNode);
	        _this._elementParentNode.parentNode.removeChild(_this._elementParentNode);
	      }

	      if (_this._tether) {
	        _this._tether.destroy();
	      }

	      _this._elementParentNode = null;
	      _this._tether = null;
	    }, _this._update = function () {
	      var _this$props = _this.props,
	          children = _this$props.children,
	          renderElementTag = _this$props.renderElementTag,
	          renderElementTo = _this$props.renderElementTo;

	      var elementComponent = children[1];

	      // if no element component provided, bail out
	      if (!elementComponent) {
	        // destroy Tether elements if they have been created
	        if (_this._tether) {
	          _this._destroy();
	        }
	        return;
	      }

	      // create element node container if it hasn't been yet
	      if (!_this._elementParentNode) {
	        // create a node that we can stick our content Component in
	        _this._elementParentNode = document.createElement(renderElementTag);

	        // append node to the end of the body
	        var renderTo = renderElementTo || document.body;
	        renderTo.appendChild(_this._elementParentNode);
	      }

	      // render element component into the DOM
	      _reactDom2.default.unstable_renderSubtreeIntoContainer(_this, elementComponent, _this._elementParentNode, function () {
	        // don't update Tether until the subtree has finished rendering
	        _this._updateTether();
	      });
	    }, _this._updateTether = function () {
	      var _this$props2 = _this.props,
	          renderElementTag = _this$props2.renderElementTag,
	          renderElementTo = _this$props2.renderElementTo,
	          options = _objectWithoutProperties(_this$props2, ['renderElementTag', 'renderElementTo']); // eslint-disable-line no-unused-vars


	      var tetherOptions = _extends({
	        target: _this._targetNode,
	        element: _this._elementParentNode
	      }, options);

	      if (!_this._tether) {
	        _this._tether = new _tether2.default(tetherOptions);
	      } else {
	        _this._tether.setOptions(tetherOptions);
	      }

	      _this._tether.position();
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(TetherComponent, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._targetNode = _reactDom2.default.findDOMNode(this);
	      this._update();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this._update();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._destroy();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var children = this.props.children;

	      var firstChild = null;

	      // we use forEach because the second child could be null
	      // causing children to not be an array
	      _react2.default.Children.forEach(children, function (child, index) {
	        if (index === 0) {
	          firstChild = child;
	          return false;
	        }
	      });

	      return firstChild;
	    }
	  }]);

	  return TetherComponent;
	}(_react2.default.Component);

	TetherComponent.propTypes = {
	  attachment: _propTypes2.default.oneOf(attachmentPositions).isRequired,
	  children: childrenPropType,
	  className: _propTypes2.default.string,
	  classPrefix: _propTypes2.default.string,
	  classes: _propTypes2.default.object,
	  constraints: _propTypes2.default.array,
	  enabled: _propTypes2.default.bool,
	  id: _propTypes2.default.string,
	  offset: _propTypes2.default.string,
	  optimizations: _propTypes2.default.object,
	  renderElementTag: _propTypes2.default.string,
	  renderElementTo: _propTypes2.default.any,
	  style: _propTypes2.default.object,
	  targetAttachment: _propTypes2.default.oneOf(attachmentPositions),
	  targetModifier: _propTypes2.default.string,
	  targetOffset: _propTypes2.default.string
	};
	TetherComponent.defaultProps = {
	  renderElementTag: 'div',
	  renderElementTo: null
	};
	exports.default = TetherComponent;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.4.0 */

	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require, exports, module);
	  } else {
	    root.Tether = factory();
	  }
	}(this, function(require, exports, module) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TetherBase = undefined;
	if (typeof TetherBase === 'undefined') {
	  TetherBase = { modules: [] };
	}

	var zeroElement = null;

	// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
	// if the element lies within a nested document (<frame> or <iframe>-like).
	function getActualBoundingClientRect(node) {
	  var boundingRect = node.getBoundingClientRect();

	  // The original object returned by getBoundingClientRect is immutable, so we clone it
	  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
	  var rect = {};
	  for (var k in boundingRect) {
	    rect[k] = boundingRect[k];
	  }

	  if (node.ownerDocument !== document) {
	    var _frameElement = node.ownerDocument.defaultView.frameElement;
	    if (_frameElement) {
	      var frameRect = getActualBoundingClientRect(_frameElement);
	      rect.top += frameRect.top;
	      rect.bottom += frameRect.top;
	      rect.left += frameRect.left;
	      rect.right += frameRect.left;
	    }
	  }

	  return rect;
	}

	function getScrollParents(el) {
	  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	  var computedStyle = getComputedStyle(el) || {};
	  var position = computedStyle.position;
	  var parents = [];

	  if (position === 'fixed') {
	    return [el];
	  }

	  var parent = el;
	  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
	    var style = undefined;
	    try {
	      style = getComputedStyle(parent);
	    } catch (err) {}

	    if (typeof style === 'undefined' || style === null) {
	      parents.push(parent);
	      return parents;
	    }

	    var _style = style;
	    var overflow = _style.overflow;
	    var overflowX = _style.overflowX;
	    var overflowY = _style.overflowY;

	    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
	        parents.push(parent);
	      }
	    }
	  }

	  parents.push(el.ownerDocument.body);

	  // If the node is within a frame, account for the parent window scroll
	  if (el.ownerDocument !== document) {
	    parents.push(el.ownerDocument.defaultView);
	  }

	  return parents;
	}

	var uniqueId = (function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	})();

	var zeroPosCache = {};
	var getOrigin = function getOrigin() {
	  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
	  // jitter as the user scrolls that messes with our ability to detect if two positions
	  // are equivilant or not.  We place an element at the top left of the page that will
	  // get the same jitter, so we can cancel the two out.
	  var node = zeroElement;
	  if (!node || !document.body.contains(node)) {
	    node = document.createElement('div');
	    node.setAttribute('data-tether-id', uniqueId());
	    extend(node.style, {
	      top: 0,
	      left: 0,
	      position: 'absolute'
	    });

	    document.body.appendChild(node);

	    zeroElement = node;
	  }

	  var id = node.getAttribute('data-tether-id');
	  if (typeof zeroPosCache[id] === 'undefined') {
	    zeroPosCache[id] = getActualBoundingClientRect(node);

	    // Clear the cache when this position call is done
	    defer(function () {
	      delete zeroPosCache[id];
	    });
	  }

	  return zeroPosCache[id];
	};

	function removeUtilElements() {
	  if (zeroElement) {
	    document.body.removeChild(zeroElement);
	  }
	  zeroElement = null;
	};

	function getBounds(el) {
	  var doc = undefined;
	  if (el === document) {
	    doc = document;
	    el = document.documentElement;
	  } else {
	    doc = el.ownerDocument;
	  }

	  var docEl = doc.documentElement;

	  var box = getActualBoundingClientRect(el);

	  var origin = getOrigin();

	  box.top -= origin.top;
	  box.left -= origin.left;

	  if (typeof box.width === 'undefined') {
	    box.width = document.body.scrollWidth - box.left - box.right;
	  }
	  if (typeof box.height === 'undefined') {
	    box.height = document.body.scrollHeight - box.top - box.bottom;
	  }

	  box.top = box.top - docEl.clientTop;
	  box.left = box.left - docEl.clientLeft;
	  box.right = doc.body.clientWidth - box.width - box.left;
	  box.bottom = doc.body.clientHeight - box.height - box.top;

	  return box;
	}

	function getOffsetParent(el) {
	  return el.offsetParent || document.documentElement;
	}

	var _scrollBarSize = null;
	function getScrollBarSize() {
	  if (_scrollBarSize) {
	    return _scrollBarSize;
	  }
	  var inner = document.createElement('div');
	  inner.style.width = '100%';
	  inner.style.height = '200px';

	  var outer = document.createElement('div');
	  extend(outer.style, {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    pointerEvents: 'none',
	    visibility: 'hidden',
	    width: '200px',
	    height: '150px',
	    overflow: 'hidden'
	  });

	  outer.appendChild(inner);

	  document.body.appendChild(outer);

	  var widthContained = inner.offsetWidth;
	  outer.style.overflow = 'scroll';
	  var widthScroll = inner.offsetWidth;

	  if (widthContained === widthScroll) {
	    widthScroll = outer.clientWidth;
	  }

	  document.body.removeChild(outer);

	  var width = widthContained - widthScroll;

	  _scrollBarSize = { width: width, height: width };
	  return _scrollBarSize;
	}

	function extend() {
	  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var args = [];

	  Array.prototype.push.apply(args, arguments);

	  args.slice(1).forEach(function (obj) {
	    if (obj) {
	      for (var key in obj) {
	        if (({}).hasOwnProperty.call(obj, key)) {
	          out[key] = obj[key];
	        }
	      }
	    }
	  });

	  return out;
	}

	function removeClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.remove(cls);
	      }
	    });
	  } else {
	    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
	    var className = getClassName(el).replace(regex, ' ');
	    setClassName(el, className);
	  }
	}

	function addClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.add(cls);
	      }
	    });
	  } else {
	    removeClass(el, name);
	    var cls = getClassName(el) + (' ' + name);
	    setClassName(el, cls);
	  }
	}

	function hasClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    return el.classList.contains(name);
	  }
	  var className = getClassName(el);
	  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
	}

	function getClassName(el) {
	  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
	  // completely separately SVGAnimatedString base classes
	  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
	    return el.className.baseVal;
	  }
	  return el.className;
	}

	function setClassName(el, className) {
	  el.setAttribute('class', className);
	}

	function updateClasses(el, add, all) {
	  // Of the set of 'all' classes, we need the 'add' classes, and only the
	  // 'add' classes to be set.
	  all.forEach(function (cls) {
	    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
	      removeClass(el, cls);
	    }
	  });

	  add.forEach(function (cls) {
	    if (!hasClass(el, cls)) {
	      addClass(el, cls);
	    }
	  });
	}

	var deferred = [];

	var defer = function defer(fn) {
	  deferred.push(fn);
	};

	var flush = function flush() {
	  var fn = undefined;
	  while (fn = deferred.pop()) {
	    fn();
	  }
	};

	var Evented = (function () {
	  function Evented() {
	    _classCallCheck(this, Evented);
	  }

	  _createClass(Evented, [{
	    key: 'on',
	    value: function on(event, handler, ctx) {
	      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	      if (typeof this.bindings === 'undefined') {
	        this.bindings = {};
	      }
	      if (typeof this.bindings[event] === 'undefined') {
	        this.bindings[event] = [];
	      }
	      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
	    }
	  }, {
	    key: 'once',
	    value: function once(event, handler, ctx) {
	      this.on(event, handler, ctx, true);
	    }
	  }, {
	    key: 'off',
	    value: function off(event, handler) {
	      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
	        return;
	      }

	      if (typeof handler === 'undefined') {
	        delete this.bindings[event];
	      } else {
	        var i = 0;
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(event) {
	      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
	        var i = 0;

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        while (i < this.bindings[event].length) {
	          var _bindings$event$i = this.bindings[event][i];
	          var handler = _bindings$event$i.handler;
	          var ctx = _bindings$event$i.ctx;
	          var once = _bindings$event$i.once;

	          var context = ctx;
	          if (typeof context === 'undefined') {
	            context = this;
	          }

	          handler.apply(context, args);

	          if (once) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }]);

	  return Evented;
	})();

	TetherBase.Utils = {
	  getActualBoundingClientRect: getActualBoundingClientRect,
	  getScrollParents: getScrollParents,
	  getBounds: getBounds,
	  getOffsetParent: getOffsetParent,
	  extend: extend,
	  addClass: addClass,
	  removeClass: removeClass,
	  hasClass: hasClass,
	  updateClasses: updateClasses,
	  defer: defer,
	  flush: flush,
	  uniqueId: uniqueId,
	  Evented: Evented,
	  getScrollBarSize: getScrollBarSize,
	  removeUtilElements: removeUtilElements
	};
	/* globals TetherBase, performance */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (typeof TetherBase === 'undefined') {
	  throw new Error('You must include the utils.js file before tether.js');
	}

	var _TetherBase$Utils = TetherBase.Utils;
	var getScrollParents = _TetherBase$Utils.getScrollParents;
	var getBounds = _TetherBase$Utils.getBounds;
	var getOffsetParent = _TetherBase$Utils.getOffsetParent;
	var extend = _TetherBase$Utils.extend;
	var addClass = _TetherBase$Utils.addClass;
	var removeClass = _TetherBase$Utils.removeClass;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	var flush = _TetherBase$Utils.flush;
	var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
	var removeUtilElements = _TetherBase$Utils.removeUtilElements;

	function within(a, b) {
	  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	  return a + diff >= b && b >= a - diff;
	}

	var transformKey = (function () {
	  if (typeof document === 'undefined') {
	    return '';
	  }
	  var el = document.createElement('div');

	  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	  for (var i = 0; i < transforms.length; ++i) {
	    var key = transforms[i];
	    if (el.style[key] !== undefined) {
	      return key;
	    }
	  }
	})();

	var tethers = [];

	var position = function position() {
	  tethers.forEach(function (tether) {
	    tether.position(false);
	  });
	  flush();
	};

	function now() {
	  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
	    return performance.now();
	  }
	  return +new Date();
	}

	(function () {
	  var lastCall = null;
	  var lastDuration = null;
	  var pendingTimeout = null;

	  var tick = function tick() {
	    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
	      // We voluntarily throttle ourselves if we can't manage 60fps
	      lastDuration = Math.min(lastDuration - 16, 250);

	      // Just in case this is the last event, remember to position just once more
	      pendingTimeout = setTimeout(tick, 250);
	      return;
	    }

	    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
	      // Some browsers call events a little too frequently, refuse to run more than is reasonable
	      return;
	    }

	    if (pendingTimeout != null) {
	      clearTimeout(pendingTimeout);
	      pendingTimeout = null;
	    }

	    lastCall = now();
	    position();
	    lastDuration = now() - lastCall;
	  };

	  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
	    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
	      window.addEventListener(event, tick);
	    });
	  }
	})();

	var MIRROR_LR = {
	  center: 'center',
	  left: 'right',
	  right: 'left'
	};

	var MIRROR_TB = {
	  middle: 'middle',
	  top: 'bottom',
	  bottom: 'top'
	};

	var OFFSET_MAP = {
	  top: 0,
	  left: 0,
	  middle: '50%',
	  center: '50%',
	  bottom: '100%',
	  right: '100%'
	};

	var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (left === 'auto') {
	    left = MIRROR_LR[relativeToAttachment.left];
	  }

	  if (top === 'auto') {
	    top = MIRROR_TB[relativeToAttachment.top];
	  }

	  return { left: left, top: top };
	};

	var attachmentToOffset = function attachmentToOffset(attachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
	    left = OFFSET_MAP[attachment.left];
	  }

	  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
	    top = OFFSET_MAP[attachment.top];
	  }

	  return { left: left, top: top };
	};

	function addOffset() {
	  var out = { top: 0, left: 0 };

	  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
	    offsets[_key] = arguments[_key];
	  }

	  offsets.forEach(function (_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (typeof top === 'string') {
	      top = parseFloat(top, 10);
	    }
	    if (typeof left === 'string') {
	      left = parseFloat(left, 10);
	    }

	    out.top += top;
	    out.left += left;
	  });

	  return out;
	}

	function offsetToPx(offset, size) {
	  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
	    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
	  }
	  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
	    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
	  }

	  return offset;
	}

	var parseOffset = function parseOffset(value) {
	  var _value$split = value.split(' ');

	  var _value$split2 = _slicedToArray(_value$split, 2);

	  var top = _value$split2[0];
	  var left = _value$split2[1];

	  return { top: top, left: left };
	};
	var parseAttachment = parseOffset;

	var TetherClass = (function (_Evented) {
	  _inherits(TetherClass, _Evented);

	  function TetherClass(options) {
	    var _this = this;

	    _classCallCheck(this, TetherClass);

	    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
	    this.position = this.position.bind(this);

	    tethers.push(this);

	    this.history = [];

	    this.setOptions(options, false);

	    TetherBase.modules.forEach(function (module) {
	      if (typeof module.initialize !== 'undefined') {
	        module.initialize.call(_this);
	      }
	    });

	    this.position();
	  }

	  _createClass(TetherClass, [{
	    key: 'getClass',
	    value: function getClass() {
	      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var classes = this.options.classes;

	      if (typeof classes !== 'undefined' && classes[key]) {
	        return this.options.classes[key];
	      } else if (this.options.classPrefix) {
	        return this.options.classPrefix + '-' + key;
	      } else {
	        return key;
	      }
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      var _this2 = this;

	      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      var defaults = {
	        offset: '0 0',
	        targetOffset: '0 0',
	        targetAttachment: 'auto auto',
	        classPrefix: 'tether'
	      };

	      this.options = extend(defaults, options);

	      var _options = this.options;
	      var element = _options.element;
	      var target = _options.target;
	      var targetModifier = _options.targetModifier;

	      this.element = element;
	      this.target = target;
	      this.targetModifier = targetModifier;

	      if (this.target === 'viewport') {
	        this.target = document.body;
	        this.targetModifier = 'visible';
	      } else if (this.target === 'scroll-handle') {
	        this.target = document.body;
	        this.targetModifier = 'scroll-handle';
	      }

	      ['element', 'target'].forEach(function (key) {
	        if (typeof _this2[key] === 'undefined') {
	          throw new Error('Tether Error: Both element and target must be defined');
	        }

	        if (typeof _this2[key].jquery !== 'undefined') {
	          _this2[key] = _this2[key][0];
	        } else if (typeof _this2[key] === 'string') {
	          _this2[key] = document.querySelector(_this2[key]);
	        }
	      });

	      addClass(this.element, this.getClass('element'));
	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('target'));
	      }

	      if (!this.options.attachment) {
	        throw new Error('Tether Error: You must provide an attachment');
	      }

	      this.targetAttachment = parseAttachment(this.options.targetAttachment);
	      this.attachment = parseAttachment(this.options.attachment);
	      this.offset = parseOffset(this.options.offset);
	      this.targetOffset = parseOffset(this.options.targetOffset);

	      if (typeof this.scrollParents !== 'undefined') {
	        this.disable();
	      }

	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParents = [this.target];
	      } else {
	        this.scrollParents = getScrollParents(this.target);
	      }

	      if (!(this.options.enabled === false)) {
	        this.enable(pos);
	      }
	    }
	  }, {
	    key: 'getTargetBounds',
	    value: function getTargetBounds() {
	      if (typeof this.targetModifier !== 'undefined') {
	        if (this.targetModifier === 'visible') {
	          if (this.target === document.body) {
	            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
	          } else {
	            var bounds = getBounds(this.target);

	            var out = {
	              height: bounds.height,
	              width: bounds.width,
	              top: bounds.top,
	              left: bounds.left
	            };

	            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
	            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
	            out.height = Math.min(innerHeight, out.height);
	            out.height -= 2;

	            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
	            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
	            out.width = Math.min(innerWidth, out.width);
	            out.width -= 2;

	            if (out.top < pageYOffset) {
	              out.top = pageYOffset;
	            }
	            if (out.left < pageXOffset) {
	              out.left = pageXOffset;
	            }

	            return out;
	          }
	        } else if (this.targetModifier === 'scroll-handle') {
	          var bounds = undefined;
	          var target = this.target;
	          if (target === document.body) {
	            target = document.documentElement;

	            bounds = {
	              left: pageXOffset,
	              top: pageYOffset,
	              height: innerHeight,
	              width: innerWidth
	            };
	          } else {
	            bounds = getBounds(target);
	          }

	          var style = getComputedStyle(target);

	          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

	          var scrollBottom = 0;
	          if (hasBottomScroll) {
	            scrollBottom = 15;
	          }

	          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

	          var out = {
	            width: 15,
	            height: height * 0.975 * (height / target.scrollHeight),
	            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
	          };

	          var fitAdj = 0;
	          if (height < 408 && this.target === document.body) {
	            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
	          }

	          if (this.target !== document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
	          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

	          if (this.target === document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          return out;
	        }
	      } else {
	        return getBounds(this.target);
	      }
	    }
	  }, {
	    key: 'clearCache',
	    value: function clearCache() {
	      this._cache = {};
	    }
	  }, {
	    key: 'cache',
	    value: function cache(k, getter) {
	      // More than one module will often need the same DOM info, so
	      // we keep a cache which is cleared on each position call
	      if (typeof this._cache === 'undefined') {
	        this._cache = {};
	      }

	      if (typeof this._cache[k] === 'undefined') {
	        this._cache[k] = getter.call(this);
	      }

	      return this._cache[k];
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var _this3 = this;

	      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('enabled'));
	      }
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;

	      this.scrollParents.forEach(function (parent) {
	        if (parent !== _this3.target.ownerDocument) {
	          parent.addEventListener('scroll', _this3.position);
	        }
	      });

	      if (pos) {
	        this.position();
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      var _this4 = this;

	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;

	      if (typeof this.scrollParents !== 'undefined') {
	        this.scrollParents.forEach(function (parent) {
	          parent.removeEventListener('scroll', _this4.position);
	        });
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this5 = this;

	      this.disable();

	      tethers.forEach(function (tether, i) {
	        if (tether === _this5) {
	          tethers.splice(i, 1);
	        }
	      });

	      // Remove any elements we were using for convenience from the DOM
	      if (tethers.length === 0) {
	        removeUtilElements();
	      }
	    }
	  }, {
	    key: 'updateAttachClasses',
	    value: function updateAttachClasses(elementAttach, targetAttach) {
	      var _this6 = this;

	      elementAttach = elementAttach || this.attachment;
	      targetAttach = targetAttach || this.targetAttachment;
	      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

	      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
	        // updateAttachClasses can be called more than once in a position call, so
	        // we need to clean up after ourselves such that when the last defer gets
	        // ran it doesn't add any extra classes from previous calls.
	        this._addAttachClasses.splice(0, this._addAttachClasses.length);
	      }

	      if (typeof this._addAttachClasses === 'undefined') {
	        this._addAttachClasses = [];
	      }
	      var add = this._addAttachClasses;

	      if (elementAttach.top) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
	      }
	      if (elementAttach.left) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
	      }
	      if (targetAttach.top) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
	      }
	      if (targetAttach.left) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
	      }

	      var all = [];
	      sides.forEach(function (side) {
	        all.push(_this6.getClass('element-attached') + '-' + side);
	        all.push(_this6.getClass('target-attached') + '-' + side);
	      });

	      defer(function () {
	        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
	          return;
	        }

	        updateClasses(_this6.element, _this6._addAttachClasses, all);
	        if (!(_this6.options.addTargetClasses === false)) {
	          updateClasses(_this6.target, _this6._addAttachClasses, all);
	        }

	        delete _this6._addAttachClasses;
	      });
	    }
	  }, {
	    key: 'position',
	    value: function position() {
	      var _this7 = this;

	      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
	      // tethers (in which case call Tether.Utils.flush yourself when you're done)

	      if (!this.enabled) {
	        return;
	      }

	      this.clearCache();

	      // Turn 'auto' attachments into the appropriate corner or edge
	      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

	      this.updateAttachClasses(this.attachment, targetAttachment);

	      var elementPos = this.cache('element-bounds', function () {
	        return getBounds(_this7.element);
	      });

	      var width = elementPos.width;
	      var height = elementPos.height;

	      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	        var _lastSize = this.lastSize;

	        // We cache the height and width to make it possible to position elements that are
	        // getting hidden.
	        width = _lastSize.width;
	        height = _lastSize.height;
	      } else {
	        this.lastSize = { width: width, height: height };
	      }

	      var targetPos = this.cache('target-bounds', function () {
	        return _this7.getTargetBounds();
	      });
	      var targetSize = targetPos;

	      // Get an actual px offset from the attachment
	      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
	      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

	      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
	      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

	      // Add the manually provided offset
	      offset = addOffset(offset, manualOffset);
	      targetOffset = addOffset(targetOffset, manualTargetOffset);

	      // It's now our goal to make (element position + offset) == (target position + target offset)
	      var left = targetPos.left + targetOffset.left - offset.left;
	      var top = targetPos.top + targetOffset.top - offset.top;

	      for (var i = 0; i < TetherBase.modules.length; ++i) {
	        var _module2 = TetherBase.modules[i];
	        var ret = _module2.position.call(this, {
	          left: left,
	          top: top,
	          targetAttachment: targetAttachment,
	          targetPos: targetPos,
	          elementPos: elementPos,
	          offset: offset,
	          targetOffset: targetOffset,
	          manualOffset: manualOffset,
	          manualTargetOffset: manualTargetOffset,
	          scrollbarSize: scrollbarSize,
	          attachment: this.attachment
	        });

	        if (ret === false) {
	          return false;
	        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
	          continue;
	        } else {
	          top = ret.top;
	          left = ret.left;
	        }
	      }

	      // We describe the position three different ways to give the optimizer
	      // a chance to decide the best possible way to position the element
	      // with the fewest repaints.
	      var next = {
	        // It's position relative to the page (absolute positioning when
	        // the element is a child of the body)
	        page: {
	          top: top,
	          left: left
	        },

	        // It's position relative to the viewport (fixed positioning)
	        viewport: {
	          top: top - pageYOffset,
	          bottom: pageYOffset - top - height + innerHeight,
	          left: left - pageXOffset,
	          right: pageXOffset - left - width + innerWidth
	        }
	      };

	      var doc = this.target.ownerDocument;
	      var win = doc.defaultView;

	      var scrollbarSize = undefined;
	      if (win.innerHeight > doc.documentElement.clientHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }

	      if (win.innerWidth > doc.documentElement.clientWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }

	      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
	        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
	        next.page.bottom = doc.body.scrollHeight - top - height;
	        next.page.right = doc.body.scrollWidth - left - width;
	      }

	      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
	        (function () {
	          var offsetParent = _this7.cache('target-offsetparent', function () {
	            return getOffsetParent(_this7.target);
	          });
	          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
	            return getBounds(offsetParent);
	          });
	          var offsetParentStyle = getComputedStyle(offsetParent);
	          var offsetParentSize = offsetPosition;

	          var offsetBorder = {};
	          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
	            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
	          });

	          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

	          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
	            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
	              // We're within the visible part of the target's scroll parent
	              var scrollTop = offsetParent.scrollTop;
	              var scrollLeft = offsetParent.scrollLeft;

	              // It's position relative to the target's offset parent (absolute positioning when
	              // the element is moved to be a child of the target's offset parent).
	              next.offset = {
	                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
	                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
	              };
	            }
	          }
	        })();
	      }

	      // We could also travel up the DOM and try each containing context, rather than only
	      // looking at the body, but we're gonna get diminishing returns.

	      this.move(next);

	      this.history.unshift(next);

	      if (this.history.length > 3) {
	        this.history.pop();
	      }

	      if (flushChanges) {
	        flush();
	      }

	      return true;
	    }

	    // THE ISSUE
	  }, {
	    key: 'move',
	    value: function move(pos) {
	      var _this8 = this;

	      if (!(typeof this.element.parentNode !== 'undefined')) {
	        return;
	      }

	      var same = {};

	      for (var type in pos) {
	        same[type] = {};

	        for (var key in pos[type]) {
	          var found = false;

	          for (var i = 0; i < this.history.length; ++i) {
	            var point = this.history[i];
	            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
	              found = true;
	              break;
	            }
	          }

	          if (!found) {
	            same[type][key] = true;
	          }
	        }
	      }

	      var css = { top: '', left: '', right: '', bottom: '' };

	      var transcribe = function transcribe(_same, _pos) {
	        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
	        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
	        if (gpu !== false) {
	          var yPos = undefined,
	              xPos = undefined;
	          if (_same.top) {
	            css.top = 0;
	            yPos = _pos.top;
	          } else {
	            css.bottom = 0;
	            yPos = -_pos.bottom;
	          }

	          if (_same.left) {
	            css.left = 0;
	            xPos = _pos.left;
	          } else {
	            css.right = 0;
	            xPos = -_pos.right;
	          }

	          if (window.matchMedia) {
	            // HubSpot/tether#207
	            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
	            if (!retina) {
	              xPos = Math.round(xPos);
	              yPos = Math.round(yPos);
	            }
	          }

	          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

	          if (transformKey !== 'msTransform') {
	            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
	            // but IE9 doesn't support 3d transforms and will choke.
	            css[transformKey] += " translateZ(0)";
	          }
	        } else {
	          if (_same.top) {
	            css.top = _pos.top + 'px';
	          } else {
	            css.bottom = _pos.bottom + 'px';
	          }

	          if (_same.left) {
	            css.left = _pos.left + 'px';
	          } else {
	            css.right = _pos.right + 'px';
	          }
	        }
	      };

	      var moved = false;
	      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
	        css.position = 'absolute';
	        transcribe(same.page, pos.page);
	      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
	        css.position = 'fixed';
	        transcribe(same.viewport, pos.viewport);
	      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
	        (function () {
	          css.position = 'absolute';
	          var offsetParent = _this8.cache('target-offsetparent', function () {
	            return getOffsetParent(_this8.target);
	          });

	          if (getOffsetParent(_this8.element) !== offsetParent) {
	            defer(function () {
	              _this8.element.parentNode.removeChild(_this8.element);
	              offsetParent.appendChild(_this8.element);
	            });
	          }

	          transcribe(same.offset, pos.offset);
	          moved = true;
	        })();
	      } else {
	        css.position = 'absolute';
	        transcribe({ top: true, left: true }, pos.page);
	      }

	      if (!moved) {
	        if (this.options.bodyElement) {
	          this.options.bodyElement.appendChild(this.element);
	        } else {
	          var offsetParentIsBody = true;
	          var currentNode = this.element.parentNode;
	          while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
	            if (getComputedStyle(currentNode).position !== 'static') {
	              offsetParentIsBody = false;
	              break;
	            }

	            currentNode = currentNode.parentNode;
	          }

	          if (!offsetParentIsBody) {
	            this.element.parentNode.removeChild(this.element);
	            this.element.ownerDocument.body.appendChild(this.element);
	          }
	        }
	      }

	      // Any css change will trigger a repaint, so let's avoid one if nothing changed
	      var writeCSS = {};
	      var write = false;
	      for (var key in css) {
	        var val = css[key];
	        var elVal = this.element.style[key];

	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = val;
	        }
	      }

	      if (write) {
	        defer(function () {
	          extend(_this8.element.style, writeCSS);
	          _this8.trigger('repositioned');
	        });
	      }
	    }
	  }]);

	  return TetherClass;
	})(Evented);

	TetherClass.modules = [];

	TetherBase.position = position;

	var Tether = extend(TetherClass, TetherBase);
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var extend = _TetherBase$Utils.extend;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

	function getBoundingRect(tether, to) {
	  if (to === 'scrollParent') {
	    to = tether.scrollParents[0];
	  } else if (to === 'window') {
	    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	  }

	  if (to === document) {
	    to = to.documentElement;
	  }

	  if (typeof to.nodeType !== 'undefined') {
	    (function () {
	      var node = to;
	      var size = getBounds(to);
	      var pos = size;
	      var style = getComputedStyle(to);

	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

	      // Account any parent Frames scroll offset
	      if (node.ownerDocument !== document) {
	        var win = node.ownerDocument.defaultView;
	        to[0] += win.pageXOffset;
	        to[1] += win.pageYOffset;
	        to[2] += win.pageXOffset;
	        to[3] += win.pageYOffset;
	      }

	      BOUNDS_FORMAT.forEach(function (side, i) {
	        side = side[0].toUpperCase() + side.substr(1);
	        if (side === 'Top' || side === 'Left') {
	          to[i] += parseFloat(style['border' + side + 'Width']);
	        } else {
	          to[i] -= parseFloat(style['border' + side + 'Width']);
	        }
	      });
	    })();
	  }

	  return to;
	}

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;
	    var targetAttachment = _ref.targetAttachment;

	    if (!this.options.constraints) {
	      return true;
	    }

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	      var _lastSize = this.lastSize;

	      // Handle the item getting hidden as a result of our positioning without glitching
	      // the classes in and out
	      width = _lastSize.width;
	      height = _lastSize.height;
	    }

	    var targetSize = this.cache('target-bounds', function () {
	      return _this.getTargetBounds();
	    });

	    var targetHeight = targetSize.height;
	    var targetWidth = targetSize.width;

	    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

	    this.options.constraints.forEach(function (constraint) {
	      var outOfBoundsClass = constraint.outOfBoundsClass;
	      var pinnedClass = constraint.pinnedClass;

	      if (outOfBoundsClass) {
	        allClasses.push(outOfBoundsClass);
	      }
	      if (pinnedClass) {
	        allClasses.push(pinnedClass);
	      }
	    });

	    allClasses.forEach(function (cls) {
	      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
	        allClasses.push(cls + '-' + side);
	      });
	    });

	    var addClasses = [];

	    var tAttachment = extend({}, targetAttachment);
	    var eAttachment = extend({}, this.attachment);

	    this.options.constraints.forEach(function (constraint) {
	      var to = constraint.to;
	      var attachment = constraint.attachment;
	      var pin = constraint.pin;

	      if (typeof attachment === 'undefined') {
	        attachment = '';
	      }

	      var changeAttachX = undefined,
	          changeAttachY = undefined;
	      if (attachment.indexOf(' ') >= 0) {
	        var _attachment$split = attachment.split(' ');

	        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

	        changeAttachY = _attachment$split2[0];
	        changeAttachX = _attachment$split2[1];
	      } else {
	        changeAttachX = changeAttachY = attachment;
	      }

	      var bounds = getBoundingRect(_this, to);

	      if (changeAttachY === 'target' || changeAttachY === 'both') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          top += targetHeight;
	          tAttachment.top = 'bottom';
	        }

	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          top -= targetHeight;
	          tAttachment.top = 'top';
	        }
	      }

	      if (changeAttachY === 'together') {
	        if (tAttachment.top === 'top') {
	          if (eAttachment.top === 'bottom' && top < bounds[1]) {
	            top += targetHeight;
	            tAttachment.top = 'bottom';

	            top += height;
	            eAttachment.top = 'top';
	          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
	            top -= height - targetHeight;
	            tAttachment.top = 'bottom';

	            eAttachment.top = 'bottom';
	          }
	        }

	        if (tAttachment.top === 'bottom') {
	          if (eAttachment.top === 'top' && top + height > bounds[3]) {
	            top -= targetHeight;
	            tAttachment.top = 'top';

	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
	            top += height - targetHeight;
	            tAttachment.top = 'top';

	            eAttachment.top = 'top';
	          }
	        }

	        if (tAttachment.top === 'middle') {
	          if (top + height > bounds[3] && eAttachment.top === 'top') {
	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
	            top += height;
	            eAttachment.top = 'top';
	          }
	        }
	      }

	      if (changeAttachX === 'target' || changeAttachX === 'both') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          left += targetWidth;
	          tAttachment.left = 'right';
	        }

	        if (left + width > bounds[2] && tAttachment.left === 'right') {
	          left -= targetWidth;
	          tAttachment.left = 'left';
	        }
	      }

	      if (changeAttachX === 'together') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          if (eAttachment.left === 'right') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'left') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left -= width;
	            eAttachment.left = 'right';
	          }
	        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
	          if (eAttachment.left === 'left') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'right') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left += width;
	            eAttachment.left = 'left';
	          }
	        } else if (tAttachment.left === 'center') {
	          if (left + width > bounds[2] && eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (left < bounds[0] && eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          }
	        }
	      }

	      if (changeAttachY === 'element' || changeAttachY === 'both') {
	        if (top < bounds[1] && eAttachment.top === 'bottom') {
	          top += height;
	          eAttachment.top = 'top';
	        }

	        if (top + height > bounds[3] && eAttachment.top === 'top') {
	          top -= height;
	          eAttachment.top = 'bottom';
	        }
	      }

	      if (changeAttachX === 'element' || changeAttachX === 'both') {
	        if (left < bounds[0]) {
	          if (eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'center') {
	            left += width / 2;
	            eAttachment.left = 'left';
	          }
	        }

	        if (left + width > bounds[2]) {
	          if (eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'center') {
	            left -= width / 2;
	            eAttachment.left = 'right';
	          }
	        }
	      }

	      if (typeof pin === 'string') {
	        pin = pin.split(',').map(function (p) {
	          return p.trim();
	        });
	      } else if (pin === true) {
	        pin = ['top', 'left', 'right', 'bottom'];
	      }

	      pin = pin || [];

	      var pinned = [];
	      var oob = [];

	      if (top < bounds[1]) {
	        if (pin.indexOf('top') >= 0) {
	          top = bounds[1];
	          pinned.push('top');
	        } else {
	          oob.push('top');
	        }
	      }

	      if (top + height > bounds[3]) {
	        if (pin.indexOf('bottom') >= 0) {
	          top = bounds[3] - height;
	          pinned.push('bottom');
	        } else {
	          oob.push('bottom');
	        }
	      }

	      if (left < bounds[0]) {
	        if (pin.indexOf('left') >= 0) {
	          left = bounds[0];
	          pinned.push('left');
	        } else {
	          oob.push('left');
	        }
	      }

	      if (left + width > bounds[2]) {
	        if (pin.indexOf('right') >= 0) {
	          left = bounds[2] - width;
	          pinned.push('right');
	        } else {
	          oob.push('right');
	        }
	      }

	      if (pinned.length) {
	        (function () {
	          var pinnedClass = undefined;
	          if (typeof _this.options.pinnedClass !== 'undefined') {
	            pinnedClass = _this.options.pinnedClass;
	          } else {
	            pinnedClass = _this.getClass('pinned');
	          }

	          addClasses.push(pinnedClass);
	          pinned.forEach(function (side) {
	            addClasses.push(pinnedClass + '-' + side);
	          });
	        })();
	      }

	      if (oob.length) {
	        (function () {
	          var oobClass = undefined;
	          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
	            oobClass = _this.options.outOfBoundsClass;
	          } else {
	            oobClass = _this.getClass('out-of-bounds');
	          }

	          addClasses.push(oobClass);
	          oob.forEach(function (side) {
	            addClasses.push(oobClass + '-' + side);
	          });
	        })();
	      }

	      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
	        eAttachment.left = tAttachment.left = false;
	      }
	      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
	        eAttachment.top = tAttachment.top = false;
	      }

	      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
	        _this.updateAttachClasses(eAttachment, tAttachment);
	        _this.trigger('update', {
	          attachment: eAttachment,
	          targetAttachment: tAttachment
	        });
	      }
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return { top: top, left: left };
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    var targetPos = this.getTargetBounds();

	    var bottom = top + height;
	    var right = left + width;

	    var abutted = [];
	    if (top <= targetPos.bottom && bottom >= targetPos.top) {
	      ['left', 'right'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === left || targetPosSide === right) {
	          abutted.push(side);
	        }
	      });
	    }

	    if (left <= targetPos.right && right >= targetPos.left) {
	      ['top', 'bottom'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === top || targetPosSide === bottom) {
	          abutted.push(side);
	        }
	      });
	    }

	    var allClasses = [];
	    var addClasses = [];

	    var sides = ['left', 'top', 'right', 'bottom'];
	    allClasses.push(this.getClass('abutted'));
	    sides.forEach(function (side) {
	      allClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    if (abutted.length) {
	      addClasses.push(this.getClass('abutted'));
	    }

	    abutted.forEach(function (side) {
	      addClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return true;
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (!this.options.shift) {
	      return;
	    }

	    var shift = this.options.shift;
	    if (typeof this.options.shift === 'function') {
	      shift = this.options.shift.call(this, { top: top, left: left });
	    }

	    var shiftTop = undefined,
	        shiftLeft = undefined;
	    if (typeof shift === 'string') {
	      shift = shift.split(' ');
	      shift[1] = shift[1] || shift[0];

	      var _shift = shift;

	      var _shift2 = _slicedToArray(_shift, 2);

	      shiftTop = _shift2[0];
	      shiftLeft = _shift2[1];

	      shiftTop = parseFloat(shiftTop, 10);
	      shiftLeft = parseFloat(shiftLeft, 10);
	    } else {
	      shiftTop = shift.top;
	      shiftLeft = shift.left;
	    }

	    top += shiftTop;
	    left += shiftLeft;

	    return { top: top, left: left };
	  }
	});
	return Tether;

	}));


/***/ }
/******/ ])
});
;