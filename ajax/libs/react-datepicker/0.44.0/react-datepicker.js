(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("react"), require("react-onclickoutside"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["moment", "react", "react-onclickoutside", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["DatePicker"] = factory(require("moment"), require("react"), require("react-onclickoutside"), require("react-dom"));
	else
		root["DatePicker"] = factory(root["moment"], root["React"], root["onClickOutside"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_17__) {
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

	var _date_input = __webpack_require__(1);

	var _date_input2 = _interopRequireDefault(_date_input);

	var _calendar = __webpack_require__(5);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _tether_component = __webpack_require__(16);

	var _tether_component2 = _interopRequireDefault(_tether_component);

	var _classnames2 = __webpack_require__(8);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _date_utils = __webpack_require__(4);

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	var _reactOnclickoutside = __webpack_require__(9);

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside';
	var WrappedCalendar = (0, _reactOnclickoutside2.default)(_calendar2.default);

	/**
	 * General datepicker component.
	 */

	var DatePicker = _react2.default.createClass({
	  displayName: 'DatePicker',

	  propTypes: {
	    autoComplete: _react2.default.PropTypes.string,
	    autoFocus: _react2.default.PropTypes.bool,
	    calendarClassName: _react2.default.PropTypes.string,
	    children: _react2.default.PropTypes.node,
	    className: _react2.default.PropTypes.string,
	    customInput: _react2.default.PropTypes.element,
	    dateFormat: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.array]),
	    dateFormatCalendar: _react2.default.PropTypes.string,
	    disabled: _react2.default.PropTypes.bool,
	    disableDateAutoCorrection: _react2.default.PropTypes.bool,
	    disabledKeyboardNavigation: _react2.default.PropTypes.bool,
	    dropdownMode: _react2.default.PropTypes.oneOf(['scroll', 'select']).isRequired,
	    endDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    fixedHeight: _react2.default.PropTypes.bool,
	    highlightDates: _react2.default.PropTypes.array,
	    id: _react2.default.PropTypes.string,
	    includeDates: _react2.default.PropTypes.array,
	    inline: _react2.default.PropTypes.bool,
	    isClearable: _react2.default.PropTypes.bool,
	    locale: _react2.default.PropTypes.string,
	    maxDate: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    monthsShown: _react2.default.PropTypes.number,
	    name: _react2.default.PropTypes.string,
	    onBlur: _react2.default.PropTypes.func,
	    onChange: _react2.default.PropTypes.func.isRequired,
	    onSelect: _react2.default.PropTypes.func,
	    onClickOutside: _react2.default.PropTypes.func,
	    onChangeRaw: _react2.default.PropTypes.func,
	    onFocus: _react2.default.PropTypes.func,
	    onMonthChange: _react2.default.PropTypes.func,
	    openToDate: _react2.default.PropTypes.object,
	    peekNextMonth: _react2.default.PropTypes.bool,
	    placeholderText: _react2.default.PropTypes.string,
	    popoverAttachment: _react2.default.PropTypes.string,
	    popoverTargetAttachment: _react2.default.PropTypes.string,
	    popoverTargetOffset: _react2.default.PropTypes.string,
	    readOnly: _react2.default.PropTypes.bool,
	    renderCalendarTo: _react2.default.PropTypes.any,
	    required: _react2.default.PropTypes.bool,
	    scrollableYearDropdown: _react2.default.PropTypes.bool,
	    selected: _react2.default.PropTypes.object,
	    selectsEnd: _react2.default.PropTypes.bool,
	    selectsStart: _react2.default.PropTypes.bool,
	    showMonthDropdown: _react2.default.PropTypes.bool,
	    showWeekNumbers: _react2.default.PropTypes.bool,
	    showYearDropdown: _react2.default.PropTypes.bool,
	    forceShowMonthNavigation: _react2.default.PropTypes.bool,
	    startDate: _react2.default.PropTypes.object,
	    tabIndex: _react2.default.PropTypes.number,
	    tetherConstraints: _react2.default.PropTypes.array,
	    title: _react2.default.PropTypes.string,
	    todayButton: _react2.default.PropTypes.string,
	    utcOffset: _react2.default.PropTypes.number,
	    withPortal: _react2.default.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      dateFormatCalendar: 'MMMM YYYY',
	      onChange: function onChange() {},

	      disabled: false,
	      disableDateAutoCorrection: false,
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
	  },
	  getInitialState: function getInitialState() {
	    var defaultPreSelection = this.props.openToDate ? (0, _moment2.default)(this.props.openToDate) : this.props.selectsEnd && this.props.startDate ? (0, _moment2.default)(this.props.startDate) : this.props.selectsStart && this.props.endDate ? (0, _moment2.default)(this.props.endDate) : (0, _moment2.default)();
	    var minDate = (0, _date_utils.getEffectiveMinDate)(this.props);
	    var maxDate = (0, _date_utils.getEffectiveMaxDate)(this.props);
	    var boundedPreSelection = minDate && defaultPreSelection.isBefore(minDate) ? minDate : maxDate && defaultPreSelection.isAfter(maxDate) ? maxDate : defaultPreSelection;

	    return {
	      open: false,
	      preventFocus: false,
	      preSelection: this.props.selected ? (0, _moment2.default)(this.props.selected) : boundedPreSelection
	    };
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this.clearPreventFocusTimeout();
	  },
	  clearPreventFocusTimeout: function clearPreventFocusTimeout() {
	    if (this.preventFocusTimeout) {
	      clearTimeout(this.preventFocusTimeout);
	    }
	  },
	  setFocus: function setFocus() {
	    this.refs.input.focus();
	  },
	  setOpen: function setOpen(open) {
	    this.setState({
	      open: open,
	      preSelection: open && this.state.open ? this.state.preSelection : this.getInitialState().preSelection
	    });
	  },
	  handleFocus: function handleFocus(event) {
	    if (!this.state.preventFocus) {
	      this.props.onFocus(event);
	      this.setOpen(true);
	    }
	  },
	  cancelFocusInput: function cancelFocusInput() {
	    clearTimeout(this.inputFocusTimeout);
	    this.inputFocusTimeout = null;
	  },
	  deferFocusInput: function deferFocusInput() {
	    var _this = this;

	    this.cancelFocusInput();
	    this.inputFocusTimeout = window.setTimeout(function () {
	      return _this.setFocus();
	    }, 1);
	  },
	  handleDropdownFocus: function handleDropdownFocus() {
	    this.cancelFocusInput();
	  },
	  handleBlur: function handleBlur(event) {
	    if (this.state.open) {
	      this.deferFocusInput();
	    } else {
	      this.props.onBlur(event);
	    }
	  },
	  handleCalendarClickOutside: function handleCalendarClickOutside(event) {
	    this.setOpen(false);
	    this.props.onClickOutside(event);
	    if (this.props.withPortal) {
	      event.preventDefault();
	    }
	  },
	  handleSelect: function handleSelect(date, event) {
	    var _this2 = this;

	    // Preventing onFocus event to fix issue
	    // https://github.com/Hacker0x01/react-datepicker/issues/628
	    this.setState({ preventFocus: true }, function () {
	      _this2.preventFocusTimeout = setTimeout(function () {
	        return _this2.setState({ preventFocus: false });
	      }, 50);
	      return _this2.preventFocusTimeout;
	    });
	    this.setSelected(date, event);
	    this.setOpen(false);
	  },
	  setSelected: function setSelected(date, event) {
	    var changedDate = date;

	    if (changedDate !== null && (0, _date_utils.isDayDisabled)(changedDate, this.props)) {
	      return;
	    }

	    if (!(0, _date_utils.isSameDay)(this.props.selected, changedDate) || this.props.disableDateAutoCorrection) {
	      if (changedDate !== null) {
	        if (this.props.selected) {
	          changedDate = (0, _moment2.default)(changedDate).set({
	            hour: this.props.selected.hour(),
	            minute: this.props.selected.minute(),
	            second: this.props.selected.second()
	          });
	        }
	        this.setState({
	          preSelection: changedDate
	        });
	      }

	      this.props.onChange(changedDate, event);
	    }

	    this.props.onSelect(changedDate, event);
	  },
	  setPreSelection: function setPreSelection(date) {
	    var isDateRangePresent = typeof this.props.minDate !== 'undefined' && typeof this.props.maxDate !== 'undefined';
	    var isValidDateSelection = isDateRangePresent && date ? (0, _date_utils.isDayInRange)(date, this.props.minDate, this.props.maxDate) : true;
	    if (isValidDateSelection) {
	      this.setState({
	        preSelection: date
	      });
	    }
	  },
	  onInputClick: function onInputClick() {
	    if (!this.props.disabled) {
	      this.setOpen(true);
	    }
	  },
	  onInputKeyDown: function onInputKeyDown(event) {
	    if (!this.state.open && !this.props.inline) {
	      if (/^Arrow/.test(event.key)) {
	        this.onInputClick();
	      }
	      return;
	    }
	    var copy = (0, _moment2.default)(this.state.preSelection);
	    if (event.key === 'Enter') {
	      event.preventDefault();
	      this.handleSelect(copy, event);
	    } else if (event.key === 'Escape') {
	      event.preventDefault();
	      this.setOpen(false);
	    } else if (event.key === 'Tab') {
	      this.setOpen(false);
	    }
	    if (!this.props.disabledKeyboardNavigation) {
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
	      this.setPreSelection(newSelection);
	    }
	  },
	  onClearClick: function onClearClick(event) {
	    event.preventDefault();
	    this.props.onChange(null, event);
	  },
	  renderCalendar: function renderCalendar() {
	    if (!this.props.inline && (!this.state.open || this.props.disabled)) {
	      return null;
	    }
	    return _react2.default.createElement(
	      WrappedCalendar,
	      {
	        ref: 'calendar',
	        locale: this.props.locale,
	        dateFormat: this.props.dateFormatCalendar,
	        dropdownMode: this.props.dropdownMode,
	        selected: this.props.selected,
	        preSelection: this.state.preSelection,
	        onSelect: this.handleSelect,
	        openToDate: this.props.openToDate,
	        minDate: this.props.minDate,
	        maxDate: this.props.maxDate,
	        selectsStart: this.props.selectsStart,
	        selectsEnd: this.props.selectsEnd,
	        startDate: this.props.startDate,
	        endDate: this.props.endDate,
	        excludeDates: this.props.excludeDates,
	        filterDate: this.props.filterDate,
	        onClickOutside: this.handleCalendarClickOutside,
	        highlightDates: this.props.highlightDates,
	        includeDates: this.props.includeDates,
	        inline: this.props.inline,
	        peekNextMonth: this.props.peekNextMonth,
	        showMonthDropdown: this.props.showMonthDropdown,
	        showWeekNumbers: this.props.showWeekNumbers,
	        showYearDropdown: this.props.showYearDropdown,
	        forceShowMonthNavigation: this.props.forceShowMonthNavigation,
	        scrollableYearDropdown: this.props.scrollableYearDropdown,
	        todayButton: this.props.todayButton,
	        utcOffset: this.props.utcOffset,
	        outsideClickIgnoreClass: outsideClickIgnoreClass,
	        fixedHeight: this.props.fixedHeight,
	        monthsShown: this.props.monthsShown,
	        onDropdownFocus: this.handleDropdownFocus,
	        onMonthChange: this.props.onMonthChange,
	        className: this.props.calendarClassName },
	      this.props.children
	    );
	  },
	  renderDateInput: function renderDateInput() {
	    var className = (0, _classnames3.default)(this.props.className, _defineProperty({}, outsideClickIgnoreClass, this.state.open));
	    return _react2.default.createElement(_date_input2.default, {
	      ref: 'input',
	      disableDateAutoCorrection: this.props.disableDateAutoCorrection,
	      id: this.props.id,
	      name: this.props.name,
	      autoFocus: this.props.autoFocus,
	      date: this.props.selected,
	      locale: this.props.locale,
	      minDate: this.props.minDate,
	      maxDate: this.props.maxDate,
	      excludeDates: this.props.excludeDates,
	      includeDates: this.props.includeDates,
	      filterDate: this.props.filterDate,
	      dateFormat: this.props.dateFormat,
	      onFocus: this.handleFocus,
	      onBlur: this.handleBlur,
	      onClick: this.onInputClick,
	      onChangeRaw: this.props.onChangeRaw,
	      onKeyDown: this.onInputKeyDown,
	      onChangeDate: this.setSelected,
	      placeholder: this.props.placeholderText,
	      disabled: this.props.disabled,
	      autoComplete: this.props.autoComplete,
	      className: className,
	      title: this.props.title,
	      readOnly: this.props.readOnly,
	      required: this.props.required,
	      tabIndex: this.props.tabIndex,
	      customInput: this.props.customInput });
	  },
	  renderClearButton: function renderClearButton() {
	    if (this.props.isClearable && this.props.selected != null) {
	      return _react2.default.createElement('a', { className: 'react-datepicker__close-icon', href: '#', onClick: this.onClearClick });
	    } else {
	      return null;
	    }
	  },
	  render: function render() {
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
	});

	module.exports = DatePicker;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _date_utils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var DateInput = _react2.default.createClass({
	  displayName: 'DateInput',

	  propTypes: {
	    customInput: _react2.default.PropTypes.element,
	    date: _react2.default.PropTypes.object,
	    dateFormat: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.array]),
	    disabled: _react2.default.PropTypes.bool,
	    disableDateAutoCorrection: _react2.default.PropTypes.bool,
	    excludeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    includeDates: _react2.default.PropTypes.array,
	    locale: _react2.default.PropTypes.string,
	    maxDate: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    onBlur: _react2.default.PropTypes.func,
	    onChange: _react2.default.PropTypes.func,
	    onChangeRaw: _react2.default.PropTypes.func,
	    onChangeDate: _react2.default.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      dateFormat: 'L',
	      disableDateAutoCorrection: false
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      value: this.safeDateFormat(this.props)
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    if (!(0, _date_utils.isSameDay)(newProps.date, this.props.date) || !(0, _date_utils.isSameUtcOffset)(newProps.date, this.props.date) || newProps.locale !== this.props.locale || newProps.dateFormat !== this.props.dateFormat) {
	      if (!this.props.disableDateAutoCorrection || newProps.date && newProps.date.isValid()) {
	        this.setState({
	          value: this.safeDateFormat(newProps)
	        });
	      }
	    }
	  },
	  handleChange: function handleChange(event) {
	    if (this.props.onChange) {
	      this.props.onChange(event);
	    }
	    if (this.props.onChangeRaw) {
	      this.props.onChangeRaw(event);
	    }
	    if (!event.defaultPrevented) {
	      this.handleChangeDate(event.target.value);
	    }
	  },
	  handleChangeDate: function handleChangeDate(value) {
	    if (this.props.onChangeDate) {
	      var date = (0, _moment2.default)(value.trim(), this.props.dateFormat, this.props.locale || _moment2.default.locale(), true);
	      if (date.isValid() && !(0, _date_utils.isDayDisabled)(date, this.props)) {
	        this.props.onChangeDate(date);
	      } else if (value === '') {
	        this.props.onChangeDate(null);
	      } else if (this.props.disableDateAutoCorrection && !date.isValid()) {
	        this.props.onChangeDate(null);
	      }
	    }
	    this.setState({ value: value });
	  },
	  safeDateFormat: function safeDateFormat(props) {
	    return props.date && props.date.clone().locale(props.locale || _moment2.default.locale()).format(Array.isArray(props.dateFormat) ? props.dateFormat[0] : props.dateFormat) || '';
	  },
	  handleBlur: function handleBlur(event) {
	    var val = this.safeDateFormat(this.props);
	    if (!this.props.disableDateAutoCorrection || val !== '') {
	      this.setState({
	        value: val
	      });
	    }
	    if (this.props.onBlur) {
	      this.props.onBlur(event);
	    }
	  },
	  focus: function focus() {
	    this.refs.input.focus();
	  },
	  render: function render() {
	    var _props = this.props,
	        customInput = _props.customInput,
	        date = _props.date,
	        disableDateAutoCorrection = _props.disableDateAutoCorrection,
	        locale = _props.locale,
	        minDate = _props.minDate,
	        maxDate = _props.maxDate,
	        excludeDates = _props.excludeDates,
	        includeDates = _props.includeDates,
	        filterDate = _props.filterDate,
	        dateFormat = _props.dateFormat,
	        onChangeDate = _props.onChangeDate,
	        onChangeRaw = _props.onChangeRaw,
	        rest = _objectWithoutProperties(_props, ['customInput', 'date', 'disableDateAutoCorrection', 'locale', 'minDate', 'maxDate', 'excludeDates', 'includeDates', 'filterDate', 'dateFormat', 'onChangeDate', 'onChangeRaw']); // eslint-disable-line no-unused-vars

	    if (customInput) {
	      return _react2.default.cloneElement(customInput, _extends({}, rest, {
	        ref: 'input',
	        value: this.state.value,
	        onBlur: this.handleBlur,
	        onChange: this.handleChange
	      }));
	    } else {
	      return _react2.default.createElement('input', _extends({
	        ref: 'input',
	        type: 'text'
	      }, rest, {
	        value: this.state.value,
	        onBlur: this.handleBlur,
	        onChange: this.handleChange }));
	    }
	  }
	});

	module.exports = DateInput;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	var _year_dropdown = __webpack_require__(6);

	var _year_dropdown2 = _interopRequireDefault(_year_dropdown);

	var _month_dropdown = __webpack_require__(10);

	var _month_dropdown2 = _interopRequireDefault(_month_dropdown);

	var _month = __webpack_require__(12);

	var _month2 = _interopRequireDefault(_month);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _date_utils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DROPDOWN_FOCUS_CLASSNAMES = ['react-datepicker__year-select', 'react-datepicker__month-select'];

	var isDropdownSelect = function isDropdownSelect() {
	  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var classNames = (element.className || '').split(/\s+/);
	  return DROPDOWN_FOCUS_CLASSNAMES.some(function (testClassname) {
	    return classNames.indexOf(testClassname) >= 0;
	  });
	};

	var Calendar = _react2.default.createClass({
	  displayName: 'Calendar',

	  propTypes: {
	    className: _react2.default.PropTypes.string,
	    children: _react2.default.PropTypes.node,
	    dateFormat: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.array]).isRequired,
	    dropdownMode: _react2.default.PropTypes.oneOf(['scroll', 'select']).isRequired,
	    endDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    fixedHeight: _react2.default.PropTypes.bool,
	    highlightDates: _react2.default.PropTypes.array,
	    includeDates: _react2.default.PropTypes.array,
	    inline: _react2.default.PropTypes.bool,
	    locale: _react2.default.PropTypes.string,
	    maxDate: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    monthsShown: _react2.default.PropTypes.number,
	    onClickOutside: _react2.default.PropTypes.func.isRequired,
	    onMonthChange: _react2.default.PropTypes.func,
	    forceShowMonthNavigation: _react2.default.PropTypes.bool,
	    onDropdownFocus: _react2.default.PropTypes.func,
	    onSelect: _react2.default.PropTypes.func.isRequired,
	    openToDate: _react2.default.PropTypes.object,
	    peekNextMonth: _react2.default.PropTypes.bool,
	    scrollableYearDropdown: _react2.default.PropTypes.bool,
	    preSelection: _react2.default.PropTypes.object,
	    selected: _react2.default.PropTypes.object,
	    selectsEnd: _react2.default.PropTypes.bool,
	    selectsStart: _react2.default.PropTypes.bool,
	    showMonthDropdown: _react2.default.PropTypes.bool,
	    showWeekNumbers: _react2.default.PropTypes.bool,
	    showYearDropdown: _react2.default.PropTypes.bool,
	    startDate: _react2.default.PropTypes.object,
	    todayButton: _react2.default.PropTypes.string,
	    utcOffset: _react2.default.PropTypes.number
	  },

	  defaultProps: {
	    onDropdownFocus: function onDropdownFocus() {}
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      utcOffset: _moment2.default.utc().utcOffset(),
	      monthsShown: 1,
	      forceShowMonthNavigation: false
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      date: this.localizeMoment(this.getDateInView()),
	      selectingDate: null
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.preSelection && !(0, _date_utils.isSameDay)(nextProps.preSelection, this.props.preSelection)) {
	      this.setState({
	        date: this.localizeMoment(nextProps.preSelection)
	      });
	    } else if (nextProps.openToDate && !(0, _date_utils.isSameDay)(nextProps.openToDate, this.props.openToDate)) {
	      this.setState({
	        date: this.localizeMoment(nextProps.openToDate)
	      });
	    }
	  },
	  handleClickOutside: function handleClickOutside(event) {
	    this.props.onClickOutside(event);
	  },
	  handleDropdownFocus: function handleDropdownFocus(event) {
	    if (isDropdownSelect(event.target)) {
	      this.props.onDropdownFocus();
	    }
	  },
	  getDateInView: function getDateInView() {
	    var _props = this.props,
	        preSelection = _props.preSelection,
	        selected = _props.selected,
	        openToDate = _props.openToDate,
	        utcOffset = _props.utcOffset;

	    var minDate = (0, _date_utils.getEffectiveMinDate)(this.props);
	    var maxDate = (0, _date_utils.getEffectiveMaxDate)(this.props);
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
	  },
	  localizeMoment: function localizeMoment(date) {
	    return date.clone().locale(this.props.locale || _moment2.default.locale());
	  },
	  increaseMonth: function increaseMonth() {
	    var _this = this;

	    this.setState({
	      date: this.state.date.clone().add(1, 'month')
	    }, function () {
	      return _this.handleMonthChange(_this.state.date);
	    });
	  },
	  decreaseMonth: function decreaseMonth() {
	    var _this2 = this;

	    this.setState({
	      date: this.state.date.clone().subtract(1, 'month')
	    }, function () {
	      return _this2.handleMonthChange(_this2.state.date);
	    });
	  },
	  handleDayClick: function handleDayClick(day, event) {
	    this.props.onSelect(day, event);
	  },
	  handleDayMouseEnter: function handleDayMouseEnter(day) {
	    this.setState({ selectingDate: day });
	  },
	  handleMonthMouseLeave: function handleMonthMouseLeave() {
	    this.setState({ selectingDate: null });
	  },
	  handleMonthChange: function handleMonthChange(date) {
	    if (this.props.onMonthChange) {
	      this.props.onMonthChange(date);
	    }
	  },
	  changeYear: function changeYear(year) {
	    this.setState({
	      date: this.state.date.clone().set('year', year)
	    });
	  },
	  changeMonth: function changeMonth(month) {
	    var _this3 = this;

	    this.setState({
	      date: this.state.date.clone().set('month', month)
	    }, function () {
	      return _this3.handleMonthChange(_this3.state.date);
	    });
	  },
	  header: function header() {
	    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.date;

	    var startOfWeek = date.clone().startOf('week');
	    var dayNames = [];
	    if (this.props.showWeekNumbers) {
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
	  },
	  renderPreviousMonthButton: function renderPreviousMonthButton() {
	    if (!this.props.forceShowMonthNavigation && (0, _date_utils.allDaysDisabledBefore)(this.state.date, 'month', this.props)) {
	      return;
	    }
	    return _react2.default.createElement('a', {
	      className: 'react-datepicker__navigation react-datepicker__navigation--previous',
	      onClick: this.decreaseMonth });
	  },
	  renderNextMonthButton: function renderNextMonthButton() {
	    if (!this.props.forceShowMonthNavigation && (0, _date_utils.allDaysDisabledAfter)(this.state.date, 'month', this.props)) {
	      return;
	    }
	    return _react2.default.createElement('a', {
	      className: 'react-datepicker__navigation react-datepicker__navigation--next',
	      onClick: this.increaseMonth });
	  },
	  renderCurrentMonth: function renderCurrentMonth() {
	    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.date;

	    var classes = ['react-datepicker__current-month'];
	    if (this.props.showYearDropdown) {
	      classes.push('react-datepicker__current-month--hasYearDropdown');
	    }
	    if (this.props.showMonthDropdown) {
	      classes.push('react-datepicker__current-month--hasMonthDropdown');
	    }
	    return _react2.default.createElement(
	      'div',
	      { className: classes.join(' ') },
	      date.format(this.props.dateFormat)
	    );
	  },
	  renderYearDropdown: function renderYearDropdown() {
	    var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    if (!this.props.showYearDropdown || overrideHide) {
	      return;
	    }
	    return _react2.default.createElement(_year_dropdown2.default, {
	      dropdownMode: this.props.dropdownMode,
	      onChange: this.changeYear,
	      minDate: this.props.minDate,
	      maxDate: this.props.maxDate,
	      year: this.state.date.year(),
	      scrollableYearDropdown: this.props.scrollableYearDropdown });
	  },
	  renderMonthDropdown: function renderMonthDropdown() {
	    var overrideHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    if (!this.props.showMonthDropdown) {
	      return;
	    }
	    return _react2.default.createElement(_month_dropdown2.default, {
	      dropdownMode: this.props.dropdownMode,
	      locale: this.props.locale,
	      onChange: this.changeMonth,
	      month: this.state.date.month() });
	  },
	  renderTodayButton: function renderTodayButton() {
	    var _this4 = this;

	    if (!this.props.todayButton) {
	      return;
	    }
	    return _react2.default.createElement(
	      'div',
	      { className: 'react-datepicker__today-button', onClick: function onClick(event) {
	          return _this4.props.onSelect(_moment2.default.utc().utcOffset(_this4.props.utcOffset).startOf('date'), event);
	        } },
	      this.props.todayButton
	    );
	  },
	  renderMonths: function renderMonths() {
	    var monthList = [];
	    for (var i = 0; i < this.props.monthsShown; ++i) {
	      var monthDate = this.state.date.clone().add(i, 'M');
	      var monthKey = 'month-' + i;
	      monthList.push(_react2.default.createElement(
	        'div',
	        { key: monthKey, className: 'react-datepicker__month-container' },
	        _react2.default.createElement(
	          'div',
	          { className: 'react-datepicker__header' },
	          this.renderCurrentMonth(monthDate),
	          _react2.default.createElement(
	            'div',
	            {
	              className: 'react-datepicker__header__dropdown react-datepicker__header__dropdown--' + this.props.dropdownMode,
	              onFocus: this.handleDropdownFocus },
	            this.renderMonthDropdown(i !== 0),
	            this.renderYearDropdown(i !== 0)
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'react-datepicker__day-names' },
	            this.header(monthDate)
	          )
	        ),
	        _react2.default.createElement(_month2.default, {
	          day: monthDate,
	          onDayClick: this.handleDayClick,
	          onDayMouseEnter: this.handleDayMouseEnter,
	          onMouseLeave: this.handleMonthMouseLeave,
	          minDate: this.props.minDate,
	          maxDate: this.props.maxDate,
	          excludeDates: this.props.excludeDates,
	          highlightDates: this.props.highlightDates,
	          selectingDate: this.state.selectingDate,
	          includeDates: this.props.includeDates,
	          inline: this.props.inline,
	          fixedHeight: this.props.fixedHeight,
	          filterDate: this.props.filterDate,
	          preSelection: this.props.preSelection,
	          selected: this.props.selected,
	          selectsStart: this.props.selectsStart,
	          selectsEnd: this.props.selectsEnd,
	          showWeekNumbers: this.props.showWeekNumbers,
	          startDate: this.props.startDate,
	          endDate: this.props.endDate,
	          peekNextMonth: this.props.peekNextMonth,
	          utcOffset: this.props.utcOffset })
	      ));
	    }
	    return monthList;
	  },
	  render: function render() {
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
	});

	module.exports = Calendar;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _year_dropdown_options = __webpack_require__(7);

	var _year_dropdown_options2 = _interopRequireDefault(_year_dropdown_options);

	var _reactOnclickoutside = __webpack_require__(9);

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var WrappedYearDropdownOptions = (0, _reactOnclickoutside2.default)(_year_dropdown_options2.default);

	var YearDropdown = _react2.default.createClass({
	  displayName: 'YearDropdown',

	  propTypes: {
	    dropdownMode: _react2.default.PropTypes.oneOf(['scroll', 'select']).isRequired,
	    maxDate: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    onChange: _react2.default.PropTypes.func.isRequired,
	    scrollableYearDropdown: _react2.default.PropTypes.bool,
	    year: _react2.default.PropTypes.number.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      dropdownVisible: false
	    };
	  },
	  renderSelectOptions: function renderSelectOptions() {
	    var minYear = this.props.minDate ? this.props.minDate.year() : 1900;
	    var maxYear = this.props.maxDate ? this.props.maxDate.year() : 2100;

	    var options = [];
	    for (var i = minYear; i <= maxYear; i++) {
	      options.push(_react2.default.createElement(
	        'option',
	        { key: i, value: i },
	        i
	      ));
	    }
	    return options;
	  },
	  onSelectChange: function onSelectChange(e) {
	    this.onChange(e.target.value);
	  },
	  renderSelectMode: function renderSelectMode() {
	    return _react2.default.createElement(
	      'select',
	      {
	        value: this.props.year,
	        className: 'react-datepicker__year-select',
	        onChange: this.onSelectChange },
	      this.renderSelectOptions()
	    );
	  },
	  renderReadView: function renderReadView(visible) {
	    return _react2.default.createElement(
	      'div',
	      { key: 'read', style: { visibility: visible ? 'visible' : 'hidden' }, className: 'react-datepicker__year-read-view', onClick: this.toggleDropdown },
	      _react2.default.createElement('span', { className: 'react-datepicker__year-read-view--down-arrow' }),
	      _react2.default.createElement(
	        'span',
	        { className: 'react-datepicker__year-read-view--selected-year' },
	        this.props.year
	      )
	    );
	  },
	  renderDropdown: function renderDropdown() {
	    return _react2.default.createElement(WrappedYearDropdownOptions, {
	      key: 'dropdown',
	      ref: 'options',
	      year: this.props.year,
	      onChange: this.onChange,
	      onCancel: this.toggleDropdown,
	      scrollableYearDropdown: this.props.scrollableYearDropdown });
	  },
	  renderScrollMode: function renderScrollMode() {
	    var dropdownVisible = this.state.dropdownVisible;

	    var result = [this.renderReadView(!dropdownVisible)];
	    if (dropdownVisible) {
	      result.unshift(this.renderDropdown());
	    }
	    return result;
	  },
	  onChange: function onChange(year) {
	    this.toggleDropdown();
	    if (year === this.props.year) return;
	    this.props.onChange(year);
	  },
	  toggleDropdown: function toggleDropdown() {
	    this.setState({
	      dropdownVisible: !this.state.dropdownVisible
	    });
	  },
	  render: function render() {
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
	});

	module.exports = YearDropdown;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateYears(year, noOfYear) {
	  var list = [];
	  for (var i = 0; i < 2 * noOfYear; i++) {
	    list.push(year + noOfYear - i);
	  }
	  return list;
	}

	var YearDropdownOptions = _react2.default.createClass({
	  displayName: 'YearDropdownOptions',

	  propTypes: {
	    onCancel: _react2.default.PropTypes.func.isRequired,
	    onChange: _react2.default.PropTypes.func.isRequired,
	    scrollableYearDropdown: _react2.default.PropTypes.bool,
	    year: _react2.default.PropTypes.number.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      yearsList: this.props.scrollableYearDropdown ? generateYears(this.props.year, 10) : generateYears(this.props.year, 5)
	    };
	  },
	  renderOptions: function renderOptions() {
	    var _this = this;

	    var selectedYear = this.props.year;
	    var options = this.state.yearsList.map(function (year) {
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
	        onClick: this.incrementYears },
	      _react2.default.createElement('a', { className: 'react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming' })
	    ));
	    options.push(_react2.default.createElement(
	      'div',
	      { className: 'react-datepicker__year-option',
	        ref: 'previous',
	        key: 'previous',
	        onClick: this.decrementYears },
	      _react2.default.createElement('a', { className: 'react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous' })
	    ));
	    return options;
	  },
	  onChange: function onChange(year) {
	    this.props.onChange(year);
	  },
	  handleClickOutside: function handleClickOutside() {
	    this.props.onCancel();
	  },
	  shiftYears: function shiftYears(amount) {
	    var years = this.state.yearsList.map(function (year) {
	      return year + amount;
	    });

	    this.setState({
	      yearsList: years
	    });
	  },
	  incrementYears: function incrementYears() {
	    return this.shiftYears(1);
	  },
	  decrementYears: function decrementYears() {
	    return this.shiftYears(-1);
	  },
	  render: function render() {
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
	});

	module.exports = YearDropdownOptions;

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _month_dropdown_options = __webpack_require__(11);

	var _month_dropdown_options2 = _interopRequireDefault(_month_dropdown_options);

	var _reactOnclickoutside = __webpack_require__(9);

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var WrappedMonthDropdownOptions = (0, _reactOnclickoutside2.default)(_month_dropdown_options2.default);

	var MonthDropdown = _react2.default.createClass({
	  displayName: 'MonthDropdown',

	  propTypes: {
	    dropdownMode: _react2.default.PropTypes.oneOf(['scroll', 'select']).isRequired,
	    locale: _react2.default.PropTypes.string,
	    month: _react2.default.PropTypes.number.isRequired,
	    onChange: _react2.default.PropTypes.func.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      dropdownVisible: false
	    };
	  },
	  renderSelectOptions: function renderSelectOptions(monthNames) {
	    return monthNames.map(function (M, i) {
	      return _react2.default.createElement(
	        'option',
	        { key: i, value: i },
	        M
	      );
	    });
	  },
	  renderSelectMode: function renderSelectMode(monthNames) {
	    var _this = this;

	    return _react2.default.createElement(
	      'select',
	      { value: this.props.month, className: 'react-datepicker__month-select', onChange: function onChange(e) {
	          return _this.onChange(e.target.value);
	        } },
	      this.renderSelectOptions(monthNames)
	    );
	  },
	  renderReadView: function renderReadView(visible, monthNames) {
	    return _react2.default.createElement(
	      'div',
	      { key: 'read', style: { visibility: visible ? 'visible' : 'hidden' }, className: 'react-datepicker__month-read-view', onClick: this.toggleDropdown },
	      _react2.default.createElement(
	        'span',
	        { className: 'react-datepicker__month-read-view--selected-month' },
	        monthNames[this.props.month]
	      ),
	      _react2.default.createElement('span', { className: 'react-datepicker__month-read-view--down-arrow' })
	    );
	  },
	  renderDropdown: function renderDropdown(monthNames) {
	    return _react2.default.createElement(WrappedMonthDropdownOptions, {
	      key: 'dropdown',
	      ref: 'options',
	      month: this.props.month,
	      monthNames: monthNames,
	      onChange: this.onChange,
	      onCancel: this.toggleDropdown });
	  },
	  renderScrollMode: function renderScrollMode(monthNames) {
	    var dropdownVisible = this.state.dropdownVisible;

	    var result = [this.renderReadView(!dropdownVisible, monthNames)];
	    if (dropdownVisible) {
	      result.unshift(this.renderDropdown(monthNames));
	    }
	    return result;
	  },
	  onChange: function onChange(month) {
	    this.toggleDropdown();
	    if (month !== this.props.month) {
	      this.props.onChange(month);
	    }
	  },
	  toggleDropdown: function toggleDropdown() {
	    this.setState({
	      dropdownVisible: !this.state.dropdownVisible
	    });
	  },
	  render: function render() {
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
	});

	module.exports = MonthDropdown;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MonthDropdownOptions = _react2.default.createClass({
	  displayName: 'MonthDropdownOptions',

	  propTypes: {
	    onCancel: _react2.default.PropTypes.func.isRequired,
	    onChange: _react2.default.PropTypes.func.isRequired,
	    month: _react2.default.PropTypes.number.isRequired,
	    monthNames: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string.isRequired).isRequired
	  },

	  renderOptions: function renderOptions() {
	    var _this = this;

	    var selectedMonth = this.props.month;
	    var options = this.props.monthNames.map(function (month, i) {
	      return _react2.default.createElement(
	        'div',
	        { className: 'react-datepicker__month-option',
	          key: month,
	          ref: month,
	          onClick: _this.onChange.bind(_this, i) },
	        selectedMonth === i ? _react2.default.createElement(
	          'span',
	          { className: 'react-datepicker__month-option--selected' },
	          '\u2713'
	        ) : '',
	        month
	      );
	    });

	    return options;
	  },
	  onChange: function onChange(month) {
	    this.props.onChange(month);
	  },
	  handleClickOutside: function handleClickOutside() {
	    this.props.onCancel();
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'react-datepicker__month-dropdown' },
	      this.renderOptions()
	    );
	  }
	});

	module.exports = MonthDropdownOptions;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _week = __webpack_require__(13);

	var _week2 = _interopRequireDefault(_week);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;

	var Month = _react2.default.createClass({
	  displayName: 'Month',

	  propTypes: {
	    day: _react2.default.PropTypes.object.isRequired,
	    endDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    fixedHeight: _react2.default.PropTypes.bool,
	    highlightDates: _react2.default.PropTypes.array,
	    includeDates: _react2.default.PropTypes.array,
	    inline: _react2.default.PropTypes.bool,
	    maxDate: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    onDayClick: _react2.default.PropTypes.func,
	    onDayMouseEnter: _react2.default.PropTypes.func,
	    onMouseLeave: _react2.default.PropTypes.func,
	    peekNextMonth: _react2.default.PropTypes.bool,
	    preSelection: _react2.default.PropTypes.object,
	    selected: _react2.default.PropTypes.object,
	    selectingDate: _react2.default.PropTypes.object,
	    selectsEnd: _react2.default.PropTypes.bool,
	    selectsStart: _react2.default.PropTypes.bool,
	    showWeekNumbers: _react2.default.PropTypes.bool,
	    startDate: _react2.default.PropTypes.object,
	    utcOffset: _react2.default.PropTypes.number
	  },

	  handleDayClick: function handleDayClick(day, event) {
	    if (this.props.onDayClick) {
	      this.props.onDayClick(day, event);
	    }
	  },
	  handleDayMouseEnter: function handleDayMouseEnter(day) {
	    if (this.props.onDayMouseEnter) {
	      this.props.onDayMouseEnter(day);
	    }
	  },
	  handleMouseLeave: function handleMouseLeave() {
	    if (this.props.onMouseLeave) {
	      this.props.onMouseLeave();
	    }
	  },
	  isWeekInMonth: function isWeekInMonth(startOfWeek) {
	    var day = this.props.day;
	    var endOfWeek = startOfWeek.clone().add(6, 'days');
	    return startOfWeek.isSame(day, 'month') || endOfWeek.isSame(day, 'month');
	  },
	  renderWeeks: function renderWeeks() {
	    var weeks = [];
	    var isFixedHeight = this.props.fixedHeight;
	    var currentWeekStart = this.props.day.clone().startOf('month').startOf('week');
	    var i = 0;
	    var breakAfterNextPush = false;

	    while (true) {
	      weeks.push(_react2.default.createElement(_week2.default, {
	        key: i,
	        day: currentWeekStart,
	        month: this.props.day.month(),
	        onDayClick: this.handleDayClick,
	        onDayMouseEnter: this.handleDayMouseEnter,
	        minDate: this.props.minDate,
	        maxDate: this.props.maxDate,
	        excludeDates: this.props.excludeDates,
	        includeDates: this.props.includeDates,
	        inline: this.props.inline,
	        highlightDates: this.props.highlightDates,
	        selectingDate: this.props.selectingDate,
	        filterDate: this.props.filterDate,
	        preSelection: this.props.preSelection,
	        selected: this.props.selected,
	        selectsStart: this.props.selectsStart,
	        selectsEnd: this.props.selectsEnd,
	        showWeekNumber: this.props.showWeekNumbers,
	        startDate: this.props.startDate,
	        endDate: this.props.endDate,
	        utcOffset: this.props.utcOffset }));

	      if (breakAfterNextPush) break;

	      i++;
	      currentWeekStart = currentWeekStart.clone().add(1, 'weeks');

	      // If one of these conditions is true, we will either break on this week
	      // or break on the next week
	      var isFixedAndFinalWeek = isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT;
	      var isNonFixedAndOutOfMonth = !isFixedHeight && !this.isWeekInMonth(currentWeekStart);

	      if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
	        if (this.props.peekNextMonth) {
	          breakAfterNextPush = true;
	        } else {
	          break;
	        }
	      }
	    }

	    return weeks;
	  },
	  getClassNames: function getClassNames() {
	    var _props = this.props,
	        selectingDate = _props.selectingDate,
	        selectsStart = _props.selectsStart,
	        selectsEnd = _props.selectsEnd;

	    return (0, _classnames2.default)('react-datepicker__month', {
	      'react-datepicker__month--selecting-range': selectingDate && (selectsStart || selectsEnd)
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: this.getClassNames(), onMouseLeave: this.handleMouseLeave, role: 'listbox' },
	      this.renderWeeks()
	    );
	  }
	});

	module.exports = Month;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _day = __webpack_require__(14);

	var _day2 = _interopRequireDefault(_day);

	var _week_number = __webpack_require__(15);

	var _week_number2 = _interopRequireDefault(_week_number);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Week = _react2.default.createClass({
	  displayName: 'Week',

	  propTypes: {
	    day: _react2.default.PropTypes.object.isRequired,
	    endDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    highlightDates: _react2.default.PropTypes.array,
	    includeDates: _react2.default.PropTypes.array,
	    inline: _react2.default.PropTypes.bool,
	    maxDate: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    month: _react2.default.PropTypes.number,
	    onDayClick: _react2.default.PropTypes.func,
	    onDayMouseEnter: _react2.default.PropTypes.func,
	    preSelection: _react2.default.PropTypes.object,
	    selected: _react2.default.PropTypes.object,
	    selectingDate: _react2.default.PropTypes.object,
	    selectsEnd: _react2.default.PropTypes.bool,
	    selectsStart: _react2.default.PropTypes.bool,
	    showWeekNumber: _react2.default.PropTypes.bool,
	    startDate: _react2.default.PropTypes.object,
	    utcOffset: _react2.default.PropTypes.number
	  },

	  handleDayClick: function handleDayClick(day, event) {
	    if (this.props.onDayClick) {
	      this.props.onDayClick(day, event);
	    }
	  },
	  handleDayMouseEnter: function handleDayMouseEnter(day) {
	    if (this.props.onDayMouseEnter) {
	      this.props.onDayMouseEnter(day);
	    }
	  },
	  renderDays: function renderDays() {
	    var _this = this;

	    var startOfWeek = this.props.day.clone().startOf('week');
	    var days = [];
	    if (this.props.showWeekNumber) {
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
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'react-datepicker__week' },
	      this.renderDays()
	    );
	  }
	});

	module.exports = Week;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(8);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _date_utils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Day = _react2.default.createClass({
	  displayName: 'Day',

	  propTypes: {
	    day: _react2.default.PropTypes.object.isRequired,
	    endDate: _react2.default.PropTypes.object,
	    highlightDates: _react2.default.PropTypes.array,
	    inline: _react2.default.PropTypes.bool,
	    month: _react2.default.PropTypes.number,
	    onClick: _react2.default.PropTypes.func,
	    onMouseEnter: _react2.default.PropTypes.func,
	    preSelection: _react2.default.PropTypes.object,
	    selected: _react2.default.PropTypes.object,
	    selectingDate: _react2.default.PropTypes.object,
	    selectsEnd: _react2.default.PropTypes.bool,
	    selectsStart: _react2.default.PropTypes.bool,
	    startDate: _react2.default.PropTypes.object,
	    utcOffset: _react2.default.PropTypes.number
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      utcOffset: _moment2.default.utc().utcOffset()
	    };
	  },
	  handleClick: function handleClick(event) {
	    if (!this.isDisabled() && this.props.onClick) {
	      this.props.onClick(event);
	    }
	  },
	  handleMouseEnter: function handleMouseEnter(event) {
	    if (!this.isDisabled() && this.props.onMouseEnter) {
	      this.props.onMouseEnter(event);
	    }
	  },
	  isSameDay: function isSameDay(other) {
	    return (0, _date_utils.isSameDay)(this.props.day, other);
	  },
	  isKeyboardSelected: function isKeyboardSelected() {
	    return !this.props.inline && !this.isSameDay(this.props.selected) && this.isSameDay(this.props.preSelection);
	  },
	  isDisabled: function isDisabled() {
	    return (0, _date_utils.isDayDisabled)(this.props.day, this.props);
	  },
	  isHighlighted: function isHighlighted() {
	    var _props = this.props,
	        day = _props.day,
	        highlightDates = _props.highlightDates;

	    if (!highlightDates) return false;
	    return highlightDates.some(function (testDay) {
	      return (0, _date_utils.isSameDay)(day, testDay);
	    });
	  },
	  isInRange: function isInRange() {
	    var _props2 = this.props,
	        day = _props2.day,
	        startDate = _props2.startDate,
	        endDate = _props2.endDate;

	    if (!startDate || !endDate) return false;
	    return (0, _date_utils.isDayInRange)(day, startDate, endDate);
	  },
	  isInSelectingRange: function isInSelectingRange() {
	    var _props3 = this.props,
	        day = _props3.day,
	        selectsStart = _props3.selectsStart,
	        selectsEnd = _props3.selectsEnd,
	        selectingDate = _props3.selectingDate,
	        startDate = _props3.startDate,
	        endDate = _props3.endDate;


	    if (!(selectsStart || selectsEnd) || !selectingDate || this.isDisabled()) {
	      return false;
	    }

	    if (selectsStart && endDate && selectingDate.isSameOrBefore(endDate)) {
	      return (0, _date_utils.isDayInRange)(day, selectingDate, endDate);
	    }

	    if (selectsEnd && startDate && selectingDate.isSameOrAfter(startDate)) {
	      return (0, _date_utils.isDayInRange)(day, startDate, selectingDate);
	    }

	    return false;
	  },
	  isSelectingRangeStart: function isSelectingRangeStart() {
	    if (!this.isInSelectingRange()) {
	      return false;
	    }

	    var _props4 = this.props,
	        day = _props4.day,
	        selectingDate = _props4.selectingDate,
	        startDate = _props4.startDate,
	        selectsStart = _props4.selectsStart;


	    if (selectsStart) {
	      return (0, _date_utils.isSameDay)(day, selectingDate);
	    } else {
	      return (0, _date_utils.isSameDay)(day, startDate);
	    }
	  },
	  isSelectingRangeEnd: function isSelectingRangeEnd() {
	    if (!this.isInSelectingRange()) {
	      return false;
	    }

	    var _props5 = this.props,
	        day = _props5.day,
	        selectingDate = _props5.selectingDate,
	        endDate = _props5.endDate,
	        selectsEnd = _props5.selectsEnd;


	    if (selectsEnd) {
	      return (0, _date_utils.isSameDay)(day, selectingDate);
	    } else {
	      return (0, _date_utils.isSameDay)(day, endDate);
	    }
	  },
	  isRangeStart: function isRangeStart() {
	    var _props6 = this.props,
	        day = _props6.day,
	        startDate = _props6.startDate,
	        endDate = _props6.endDate;

	    if (!startDate || !endDate) return false;
	    return (0, _date_utils.isSameDay)(startDate, day);
	  },
	  isRangeEnd: function isRangeEnd() {
	    var _props7 = this.props,
	        day = _props7.day,
	        startDate = _props7.startDate,
	        endDate = _props7.endDate;

	    if (!startDate || !endDate) return false;
	    return (0, _date_utils.isSameDay)(endDate, day);
	  },
	  isWeekend: function isWeekend() {
	    var weekday = this.props.day.day();
	    return weekday === 0 || weekday === 6;
	  },
	  isOutsideMonth: function isOutsideMonth() {
	    return this.props.month !== undefined && this.props.month !== this.props.day.month();
	  },
	  getClassNames: function getClassNames() {
	    return (0, _classnames2.default)('react-datepicker__day', {
	      'react-datepicker__day--disabled': this.isDisabled(),
	      'react-datepicker__day--selected': this.isSameDay(this.props.selected),
	      'react-datepicker__day--keyboard-selected': this.isKeyboardSelected(),
	      'react-datepicker__day--highlighted': this.isHighlighted(),
	      'react-datepicker__day--range-start': this.isRangeStart(),
	      'react-datepicker__day--range-end': this.isRangeEnd(),
	      'react-datepicker__day--in-range': this.isInRange(),
	      'react-datepicker__day--in-selecting-range': this.isInSelectingRange(),
	      'react-datepicker__day--selecting-range-start': this.isSelectingRangeStart(),
	      'react-datepicker__day--selecting-range-end': this.isSelectingRangeEnd(),
	      'react-datepicker__day--today': this.isSameDay(_moment2.default.utc().utcOffset(this.props.utcOffset)),
	      'react-datepicker__day--weekend': this.isWeekend(),
	      'react-datepicker__day--outside-month': this.isOutsideMonth()
	    });
	  },
	  render: function render() {
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
	});

	module.exports = Day;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var WeekNumber = _react2.default.createClass({
	  displayName: 'WeekNumber',

	  propTypes: {
	    weekNumber: _react2.default.PropTypes.number.isRequired
	  },

	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'react-datepicker__week-number',
	        'aria-label': 'week-' + this.props.weekNumber },
	      this.props.weekNumber
	    );
	  }
	});

	module.exports = WeekNumber;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(17);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _tether = __webpack_require__(18);

	var _tether2 = _interopRequireDefault(_tether);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function childrenPropType(_ref, propName, componentName) {
	  var children = _ref.children;

	  var childCount = _react.Children.count(children);
	  if (childCount <= 0) {
	    return new Error(componentName + ' expects at least one child to use as the target element.');
	  } else if (childCount > 2) {
	    return new Error('Only a max of two children allowed in ' + componentName + '.');
	  }
	}

	var attachmentPositions = ['top left', 'top center', 'top right', 'middle left', 'middle center', 'middle right', 'bottom left', 'bottom center', 'bottom right'];

	var TetherComponent = _react2.default.createClass({
	  displayName: 'TetherComponent',

	  propTypes: {
	    attachment: _react.PropTypes.oneOf(attachmentPositions).isRequired,
	    children: childrenPropType,
	    className: _react.PropTypes.string,
	    classPrefix: _react.PropTypes.string,
	    classes: _react.PropTypes.object,
	    constraints: _react.PropTypes.array,
	    enabled: _react.PropTypes.bool,
	    id: _react.PropTypes.string,
	    offset: _react.PropTypes.string,
	    optimizations: _react.PropTypes.object,
	    renderElementTag: _react.PropTypes.string,
	    renderElementTo: _react.PropTypes.any,
	    style: _react.PropTypes.object,
	    targetAttachment: _react.PropTypes.oneOf(attachmentPositions),
	    targetModifier: _react.PropTypes.string,
	    targetOffset: _react.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      renderElementTag: 'div',
	      renderElementTo: null
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this._targetNode = _reactDom2.default.findDOMNode(this);
	    this._update();
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this._update();
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._destroy();
	  },
	  disable: function disable() {
	    this._tether.disable();
	  },
	  enable: function enable() {
	    this._tether.enable();
	  },
	  position: function position() {
	    this._tether.position();
	  },
	  _destroy: function _destroy() {
	    if (this._elementParentNode) {
	      _reactDom2.default.unmountComponentAtNode(this._elementParentNode);
	      this._elementParentNode.parentNode.removeChild(this._elementParentNode);
	    }

	    if (this._tether) {
	      this._tether.destroy();
	    }

	    this._elementParentNode = null;
	    this._tether = null;
	  },
	  _update: function _update() {
	    var _this = this;

	    var _props = this.props,
	        children = _props.children,
	        renderElementTag = _props.renderElementTag,
	        renderElementTo = _props.renderElementTo;

	    var elementComponent = children[1];

	    // if no element component provided, bail out
	    if (!elementComponent) {
	      // destroy Tether elements if they have been created
	      if (this._tether) {
	        this._destroy();
	      }
	      return;
	    }

	    // create element node container if it hasn't been yet
	    if (!this._elementParentNode) {
	      // create a node that we can stick our content Component in
	      this._elementParentNode = document.createElement(renderElementTag);

	      // append node to the end of the body
	      var renderTo = renderElementTo || document.body;
	      renderTo.appendChild(this._elementParentNode);
	    }

	    // render element component into the DOM
	    _reactDom2.default.unstable_renderSubtreeIntoContainer(this, elementComponent, this._elementParentNode, function () {
	      // don't update Tether until the subtree has finished rendering
	      _this._updateTether();
	    });
	  },
	  _updateTether: function _updateTether() {
	    var _props2 = this.props,
	        renderElementTag = _props2.renderElementTag,
	        renderElementTo = _props2.renderElementTo,
	        options = _objectWithoutProperties(_props2, ['renderElementTag', 'renderElementTo']); // eslint-disable-line no-unused-vars


	    var tetherOptions = _extends({
	      target: this._targetNode,
	      element: this._elementParentNode
	    }, options);

	    if (!this._tether) {
	      this._tether = new _tether2.default(tetherOptions);
	    } else {
	      this._tether.setOptions(tetherOptions);
	    }

	    this._tether.position();
	  },
	  render: function render() {
	    var children = this.props.children;

	    var firstChild = null;

	    // we use forEach because the second child could be null
	    // causing children to not be an array
	    _react.Children.forEach(children, function (child, index) {
	      if (index === 0) {
	        firstChild = child;
	        return false;
	      }
	    });

	    return firstChild;
	  }
	});

	module.exports = TetherComponent;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ },
/* 18 */
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