(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("react-dom"), require("react"), require("react-onclickoutside"));
	else if(typeof define === 'function' && define.amd)
		define(["moment", "react-dom", "react", "react-onclickoutside"], factory);
	else if(typeof exports === 'object')
		exports["DatePicker"] = factory(require("moment"), require("react-dom"), require("react"), require("react-onclickoutside"));
	else
		root["DatePicker"] = factory(root["moment"], root["ReactDOM"], root["React"], root["OnClickOutside"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_10__) {
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

	"use strict";

	var _moment = __webpack_require__(1);

	var _moment2 = _interopRequireDefault(_moment);

	var _date_input = __webpack_require__(2);

	var _date_input2 = _interopRequireDefault(_date_input);

	var _calendar = __webpack_require__(7);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactTether = __webpack_require__(14);

	var _reactTether2 = _interopRequireDefault(_reactTether);

	var _date_utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * General datepicker component.
	 */

	var DatePicker = _react2.default.createClass({
	  displayName: "DatePicker",


	  propTypes: {
	    selected: _react2.default.PropTypes.object,
	    weekdays: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
	    locale: _react2.default.PropTypes.string,
	    dateFormatCalendar: _react2.default.PropTypes.string,
	    disabled: _react2.default.PropTypes.bool,
	    id: _react2.default.PropTypes.string,
	    popoverAttachment: _react2.default.PropTypes.string,
	    popoverTargetAttachment: _react2.default.PropTypes.string,
	    popoverTargetOffset: _react2.default.PropTypes.string,
	    tetherConstraints: _react2.default.PropTypes.array,
	    weekStart: _react2.default.PropTypes.string,
	    showYearDropdown: _react2.default.PropTypes.bool,
	    onChange: _react2.default.PropTypes.func.isRequired,
	    onBlur: _react2.default.PropTypes.func,
	    onFocus: _react2.default.PropTypes.func,
	    tabIndex: _react2.default.PropTypes.number,
	    filterDate: _react2.default.PropTypes.func,
	    todayButton: _react2.default.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
	      locale: "en",
	      dateFormatCalendar: "MMMM YYYY",
	      onChange: function onChange() {},

	      disabled: false,
	      onFocus: function onFocus() {},
	      onBlur: function onBlur() {},

	      popoverAttachment: "top left",
	      popoverTargetAttachment: "bottom left",
	      popoverTargetOffset: "10px 0",
	      tetherConstraints: [{
	        to: "window",
	        attachment: "together"
	      }]
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      open: false
	    };
	  },
	  setOpen: function setOpen(open) {
	    this.setState({ open: open });
	  },
	  handleFocus: function handleFocus(event) {
	    this.props.onFocus(event);
	    this.setOpen(true);
	  },
	  handleBlur: function handleBlur(event) {
	    if (this.state.open) {
	      this.refs.input.focus();
	    } else {
	      this.props.onBlur(event);
	    }
	  },
	  handleCalendarClickOutside: function handleCalendarClickOutside(event) {
	    this.setOpen(false);
	  },
	  handleSelect: function handleSelect(date) {
	    this.setSelected(date);
	    this.setOpen(false);
	  },
	  setSelected: function setSelected(date) {
	    if (!(0, _date_utils.isSameDay)(this.props.selected, date)) {
	      this.props.onChange(date);
	    }
	  },
	  onInputClick: function onInputClick() {
	    this.setOpen(true);
	  },
	  handleInputDone: function handleInputDone() {
	    this.setOpen(false);
	  },
	  onClearClick: function onClearClick(event) {
	    event.preventDefault();
	    this.props.onChange(null);
	  },
	  renderCalendar: function renderCalendar() {
	    if (!this.state.open || this.props.disabled) {
	      return null;
	    }
	    return _react2.default.createElement(_calendar2.default, {
	      ref: "calendar",
	      weekdays: this.props.weekdays,
	      locale: this.props.locale,
	      moment: _moment2.default,
	      dateFormat: this.props.dateFormatCalendar,
	      selected: this.props.selected,
	      onSelect: this.handleSelect,
	      minDate: this.props.minDate,
	      maxDate: this.props.maxDate,
	      startDate: this.props.startDate,
	      endDate: this.props.endDate,
	      excludeDates: this.props.excludeDates,
	      filterDate: this.props.filterDate,
	      onClickOutside: this.handleCalendarClickOutside,
	      includeDates: this.props.includeDates,
	      weekStart: this.props.weekStart,
	      showYearDropdown: this.props.showYearDropdown,
	      todayButton: this.props.todayButton });
	  },
	  renderClearButton: function renderClearButton() {
	    if (this.props.isClearable && this.props.selected != null) {
	      return _react2.default.createElement("a", { className: "close-icon", href: "#", onClick: this.onClearClick });
	    } else {
	      return null;
	    }
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      _reactTether2.default,
	      {
	        classPrefix: "datepicker__tether",
	        attachment: this.props.popoverAttachment,
	        targetAttachment: this.props.popoverTargetAttachment,
	        targetOffset: this.props.popoverTargetOffset,
	        constraints: this.props.tetherConstraints },
	      _react2.default.createElement(
	        "div",
	        { className: "datepicker__input-container" },
	        _react2.default.createElement(_date_input2.default, {
	          ref: "input",
	          id: this.props.id,
	          name: this.props.name,
	          date: this.props.selected,
	          minDate: this.props.minDate,
	          maxDate: this.props.maxDate,
	          excludeDates: this.props.excludeDates,
	          includeDates: this.props.includeDates,
	          filterDate: this.props.filterDate,
	          dateFormat: this.props.dateFormat,
	          onFocus: this.handleFocus,
	          onBlur: this.handleBlur,
	          handleClick: this.onInputClick,
	          handleDone: this.handleInputDone,
	          setSelected: this.setSelected,
	          placeholderText: this.props.placeholderText,
	          disabled: this.props.disabled,
	          className: this.props.className,
	          title: this.props.title,
	          readOnly: this.props.readOnly,
	          required: this.props.required,
	          tabIndex: this.props.tabIndex,
	          open: this.state.open }),
	        this.renderClearButton()
	      ),
	      this.renderCalendar()
	    );
	  }
	});

	module.exports = DatePicker;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _moment = __webpack_require__(1);

	var _moment2 = _interopRequireDefault(_moment);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _date_utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DateInput = _react2.default.createClass({
	  displayName: "DateInput",


	  propTypes: {
	    date: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    maxDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    includeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    open: _react2.default.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      dateFormat: "YYYY-MM-DD"
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      maybeDate: this.safeDateFormat(this.props.date)
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    if (!(0, _date_utils.isSameDay)(newProps.date, this.props.date)) {
	      this.setState({
	        maybeDate: this.safeDateFormat(newProps.date)
	      });
	    }
	  },
	  handleChange: function handleChange(event) {
	    var value = event.target.value;
	    var date = (0, _moment2.default)(value, this.props.dateFormat, true);
	    if (date.isValid() && !(0, _date_utils.isDayDisabled)(date, this.props)) {
	      this.props.setSelected(date);
	    } else if (value === "") {
	      this.props.setSelected(null);
	    }
	    this.setState({
	      maybeDate: value
	    });
	  },
	  safeDateFormat: function safeDateFormat(date) {
	    return !!date ? date.format(this.props.dateFormat) : null;
	  },
	  handleKeyDown: function handleKeyDown(event) {
	    if (event.key === "Enter" || event.key === "Escape") {
	      event.preventDefault();
	      this.props.handleDone();
	    } else if (event.key === "Tab") {
	      this.props.handleDone();
	    }
	  },
	  handleClick: function handleClick(event) {
	    if (!this.props.disabled) {
	      this.props.handleClick(event);
	    }
	  },
	  handleBlur: function handleBlur(event) {
	    this.setState({
	      maybeDate: this.safeDateFormat(this.props.date)
	    });
	    if (this.props.onBlur) {
	      this.props.onBlur(event);
	    }
	  },
	  focus: function focus() {
	    this.refs.input.focus();
	  },
	  getClassNames: function getClassNames() {
	    return (0, _classnames2.default)("datepicker__input", { "ignore-react-onclickoutside": this.props.open }, this.props.className);
	  },
	  render: function render() {
	    return _react2.default.createElement("input", {
	      ref: "input",
	      type: "text",
	      id: this.props.id,
	      name: this.props.name,
	      value: this.state.maybeDate,
	      onClick: this.handleClick,
	      onKeyDown: this.handleKeyDown,
	      onFocus: this.props.onFocus,
	      onBlur: this.handleBlur,
	      onChange: this.handleChange,
	      className: this.getClassNames(),
	      disabled: this.props.disabled,
	      placeholder: this.props.placeholderText,
	      readOnly: this.props.readOnly,
	      required: this.props.required,
	      tabIndex: this.props.tabIndex });
	  }
	});

	module.exports = DateInput;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isSameDay = isSameDay;
	exports.isDayDisabled = isDayDisabled;
	function isSameDay(moment1, moment2) {
	  if (moment1 && moment2) {
	    return moment1.isSame(moment2, "day");
	  } else {
	    return !moment1 && !moment2;
	  }
	}

	function isDayDisabled(day) {
	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var minDate = _ref.minDate;
	  var maxDate = _ref.maxDate;
	  var excludeDates = _ref.excludeDates;
	  var includeDates = _ref.includeDates;
	  var filterDate = _ref.filterDate;

	  return minDate && day.isBefore(minDate, "day") || maxDate && day.isAfter(maxDate, "day") || excludeDates && excludeDates.some(function (excludeDate) {
	    return isSameDay(day, excludeDate);
	  }) || includeDates && !includeDates.some(function (includeDate) {
	    return isSameDay(day, includeDate);
	  }) || filterDate && !filterDate(day.clone()) || false;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _year_dropdown = __webpack_require__(8);

	var _year_dropdown2 = _interopRequireDefault(_year_dropdown);

	var _month = __webpack_require__(11);

	var _month2 = _interopRequireDefault(_month);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _date_utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getDateInView(_ref) {
	  var moment = _ref.moment;
	  var selected = _ref.selected;
	  var minDate = _ref.minDate;
	  var maxDate = _ref.maxDate;

	  var current = moment();
	  if (selected) {
	    return selected;
	  } else if (minDate && minDate.isAfter(current)) {
	    return minDate;
	  } else if (maxDate && maxDate.isBefore(current)) {
	    return maxDate;
	  } else {
	    return current;
	  }
	}

	var Calendar = _react2.default.createClass({
	  displayName: "Calendar",

	  mixins: [__webpack_require__(10)],

	  propTypes: {
	    weekdays: _react2.default.PropTypes.array.isRequired,
	    locale: _react2.default.PropTypes.string.isRequired,
	    moment: _react2.default.PropTypes.func.isRequired,
	    dateFormat: _react2.default.PropTypes.string.isRequired,
	    onSelect: _react2.default.PropTypes.func.isRequired,
	    onClickOutside: _react2.default.PropTypes.func.isRequired,
	    minDate: _react2.default.PropTypes.object,
	    maxDate: _react2.default.PropTypes.object,
	    startDate: _react2.default.PropTypes.object,
	    endDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    includeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    weekStart: _react2.default.PropTypes.string.isRequired,
	    showYearDropdown: _react2.default.PropTypes.bool
	  },

	  handleClickOutside: function handleClickOutside(event) {
	    this.props.onClickOutside(event);
	  },
	  getInitialState: function getInitialState() {
	    return {
	      date: getDateInView(this.props)
	    };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      weekStart: "1"
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this.initializeMomentLocale();
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.selected && !(0, _date_utils.isSameDay)(nextProps.selected, this.props.selected)) {
	      this.setState({
	        date: nextProps.selected
	      });
	    }
	  },
	  initializeMomentLocale: function initializeMomentLocale() {
	    var weekdays = this.props.weekdays.slice(0);
	    weekdays = weekdays.concat(weekdays.splice(0, this.props.weekStart));

	    this.props.moment.locale(this.props.locale, {
	      week: {
	        dow: this.props.weekStart
	      },
	      weekdaysMin: weekdays
	    });
	  },
	  increaseMonth: function increaseMonth() {
	    this.setState({
	      date: this.state.date.clone().add(1, "month")
	    });
	  },
	  decreaseMonth: function decreaseMonth() {
	    this.setState({
	      date: this.state.date.clone().subtract(1, "month")
	    });
	  },
	  handleDayClick: function handleDayClick(day) {
	    this.props.onSelect(day);
	  },
	  changeYear: function changeYear(year) {
	    this.setState({
	      date: this.state.date.clone().set("year", year)
	    });
	  },
	  header: function header() {
	    return this.props.moment.weekdaysMin().map(function (day, key) {
	      return _react2.default.createElement(
	        "div",
	        { className: "datepicker__day", key: key },
	        day
	      );
	    });
	  },
	  renderCurrentMonth: function renderCurrentMonth() {
	    var classes = ["datepicker__current-month"];
	    if (this.props.showYearDropdown) {
	      classes.push("datepicker__current-month--hasYearDropdown");
	    }
	    return _react2.default.createElement(
	      "div",
	      { className: classes.join(" ") },
	      this.state.date.format(this.props.dateFormat)
	    );
	  },
	  renderYearDropdown: function renderYearDropdown() {
	    if (!this.props.showYearDropdown) {
	      return;
	    }
	    return _react2.default.createElement(_year_dropdown2.default, {
	      onChange: this.changeYear,
	      year: this.state.date.year() });
	  },
	  renderTodayButton: function renderTodayButton() {
	    var _props = this.props;
	    var moment = _props.moment;
	    var onSelect = _props.onSelect;


	    if (!this.props.todayButton) {
	      return;
	    }

	    return _react2.default.createElement(
	      "div",
	      { className: "datepicker__today-button", onClick: function onClick() {
	          return onSelect(moment());
	        } },
	      this.props.todayButton
	    );
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "datepicker" },
	      _react2.default.createElement("div", { className: "datepicker__triangle" }),
	      _react2.default.createElement(
	        "div",
	        { className: "datepicker__header" },
	        _react2.default.createElement("a", { className: "datepicker__navigation datepicker__navigation--previous",
	          onClick: this.decreaseMonth }),
	        this.renderCurrentMonth(),
	        this.renderYearDropdown(),
	        _react2.default.createElement("a", { className: "datepicker__navigation datepicker__navigation--next",
	          onClick: this.increaseMonth }),
	        _react2.default.createElement(
	          "div",
	          null,
	          this.header()
	        )
	      ),
	      _react2.default.createElement(_month2.default, {
	        day: this.state.date,
	        onDayClick: this.handleDayClick,
	        minDate: this.props.minDate,
	        maxDate: this.props.maxDate,
	        excludeDates: this.props.excludeDates,
	        includeDates: this.props.includeDates,
	        filterDate: this.props.filterDate,
	        selected: this.props.selected,
	        startDate: this.props.startDate,
	        endDate: this.props.endDate }),
	      this.renderTodayButton()
	    );
	  }
	});

	module.exports = Calendar;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _year_dropdown_options = __webpack_require__(9);

	var _year_dropdown_options2 = _interopRequireDefault(_year_dropdown_options);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var YearDropdown = _react2.default.createClass({
	  displayName: "YearDropdown",

	  propTypes: {
	    year: _react2.default.PropTypes.number.isRequired,
	    onChange: _react2.default.PropTypes.func.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      dropdownVisible: false
	    };
	  },
	  renderReadView: function renderReadView() {
	    return _react2.default.createElement(
	      "div",
	      { className: "datepicker__year-read-view", onClick: this.toggleDropdown },
	      _react2.default.createElement(
	        "span",
	        { className: "datepicker__year-read-view--selected-year" },
	        this.props.year
	      ),
	      _react2.default.createElement("span", { className: "datepicker__year-read-view--down-arrow" })
	    );
	  },
	  renderDropdown: function renderDropdown() {
	    return _react2.default.createElement(_year_dropdown_options2.default, {
	      ref: "options",
	      year: this.props.year,
	      onChange: this.onChange,
	      onCancel: this.toggleDropdown });
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
	    return _react2.default.createElement(
	      "div",
	      null,
	      this.state.dropdownVisible ? this.renderDropdown() : this.renderReadView()
	    );
	  }
	});

	module.exports = YearDropdown;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateYears(year) {
	  var list = [];
	  for (var i = 0; i < 5; i++) {
	    list.push(year - i);
	  }
	  return list;
	}

	var YearDropdownOptions = _react2.default.createClass({
	  displayName: "YearDropdownOptions",

	  mixins: [__webpack_require__(10)],

	  propTypes: {
	    year: _react2.default.PropTypes.number.isRequired,
	    onChange: _react2.default.PropTypes.func.isRequired,
	    onCancel: _react2.default.PropTypes.func.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      yearsList: generateYears(this.props.year)
	    };
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "datepicker__year-dropdown" },
	      this.renderOptions()
	    );
	  },
	  renderOptions: function renderOptions() {
	    var _this = this;

	    var selectedYear = this.props.year;
	    var options = this.state.yearsList.map(function (year) {
	      return _react2.default.createElement(
	        "div",
	        { className: "datepicker__year-option",
	          key: year,
	          onClick: _this.onChange.bind(_this, year) },
	        selectedYear === year ? _react2.default.createElement(
	          "span",
	          { className: "datepicker__year-option--selected" },
	          "✓"
	        ) : "",
	        year
	      );
	    });

	    options.unshift(_react2.default.createElement(
	      "div",
	      { className: "datepicker__year-option",
	        ref: "upcoming",
	        key: "upcoming",
	        onClick: this.incrementYears },
	      _react2.default.createElement("a", { className: "datepicker__navigation datepicker__navigation--years datepicker__navigation--years-upcoming" })
	    ));
	    options.push(_react2.default.createElement(
	      "div",
	      { className: "datepicker__year-option",
	        ref: "previous",
	        key: "previous",
	        onClick: this.decrementYears },
	      _react2.default.createElement("a", { className: "datepicker__navigation datepicker__navigation--years datepicker__navigation--years-previous" })
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
	  }
	});

	module.exports = YearDropdownOptions;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _week = __webpack_require__(12);

	var _week2 = _interopRequireDefault(_week);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Month = _react2.default.createClass({
	  displayName: "Month",

	  propTypes: {
	    day: _react2.default.PropTypes.object.isRequired,
	    onDayClick: _react2.default.PropTypes.func,
	    minDate: _react2.default.PropTypes.object,
	    maxDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    includeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    selected: _react2.default.PropTypes.object,
	    startDate: _react2.default.PropTypes.object,
	    endDate: _react2.default.PropTypes.object
	  },

	  handleDayClick: function handleDayClick(day) {
	    if (this.props.onDayClick) {
	      this.props.onDayClick(day);
	    }
	  },
	  isWeekInMonth: function isWeekInMonth(startOfWeek) {
	    var day = this.props.day;
	    var endOfWeek = startOfWeek.clone().add(6, "days");
	    return startOfWeek.isSame(day, "month") || endOfWeek.isSame(day, "month");
	  },
	  renderWeeks: function renderWeeks() {
	    var _this = this;

	    var startOfMonth = this.props.day.clone().startOf("month").startOf("week");
	    return [0, 1, 2, 3, 4, 5].map(function (offset) {
	      return startOfMonth.clone().add(offset, "weeks");
	    }).filter(function (startOfWeek) {
	      return _this.isWeekInMonth(startOfWeek);
	    }).map(function (startOfWeek, offset) {
	      return _react2.default.createElement(_week2.default, {
	        key: offset,
	        day: startOfWeek,
	        month: _this.props.day.month(),
	        onDayClick: _this.handleDayClick,
	        minDate: _this.props.minDate,
	        maxDate: _this.props.maxDate,
	        excludeDates: _this.props.excludeDates,
	        includeDates: _this.props.includeDates,
	        filterDate: _this.props.filterDate,
	        selected: _this.props.selected,
	        startDate: _this.props.startDate,
	        endDate: _this.props.endDate });
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "datepicker__month" },
	      this.renderWeeks()
	    );
	  }
	});

	module.exports = Month;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _day = __webpack_require__(13);

	var _day2 = _interopRequireDefault(_day);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Week = _react2.default.createClass({
	  displayName: "Week",

	  propTypes: {
	    day: _react2.default.PropTypes.object.isRequired,
	    month: _react2.default.PropTypes.number,
	    onDayClick: _react2.default.PropTypes.func,
	    minDate: _react2.default.PropTypes.object,
	    maxDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    includeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    selected: _react2.default.PropTypes.object,
	    startDate: _react2.default.PropTypes.object,
	    endDate: _react2.default.PropTypes.object
	  },

	  handleDayClick: function handleDayClick(day) {
	    if (this.props.onDayClick) {
	      this.props.onDayClick(day);
	    }
	  },
	  renderDays: function renderDays() {
	    var _this = this;

	    var startOfWeek = this.props.day.clone().startOf("week");
	    return [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
	      var day = startOfWeek.clone().add(offset, "days");
	      return _react2.default.createElement(_day2.default, {
	        key: offset,
	        day: day,
	        month: _this.props.month,
	        onClick: _this.handleDayClick.bind(_this, day),
	        minDate: _this.props.minDate,
	        maxDate: _this.props.maxDate,
	        excludeDates: _this.props.excludeDates,
	        includeDates: _this.props.includeDates,
	        filterDate: _this.props.filterDate,
	        selected: _this.props.selected,
	        startDate: _this.props.startDate,
	        endDate: _this.props.endDate });
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "datepicker__week" },
	      this.renderDays()
	    );
	  }
	});

	module.exports = Week;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _moment = __webpack_require__(1);

	var _moment2 = _interopRequireDefault(_moment);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _date_utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Day = _react2.default.createClass({
	  displayName: "Day",

	  propTypes: {
	    day: _react2.default.PropTypes.object.isRequired,
	    month: _react2.default.PropTypes.number,
	    onClick: _react2.default.PropTypes.func,
	    minDate: _react2.default.PropTypes.object,
	    maxDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    includeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    selected: _react2.default.PropTypes.object,
	    startDate: _react2.default.PropTypes.object,
	    endDate: _react2.default.PropTypes.object
	  },

	  handleClick: function handleClick(event) {
	    if (!this.isDisabled() && this.props.onClick) {
	      this.props.onClick(event);
	    }
	  },
	  isSameDay: function isSameDay(other) {
	    return (0, _date_utils.isSameDay)(this.props.day, other);
	  },
	  isDisabled: function isDisabled() {
	    return (0, _date_utils.isDayDisabled)(this.props.day, this.props);
	  },
	  isInRange: function isInRange() {
	    var _props = this.props;
	    var day = _props.day;
	    var startDate = _props.startDate;
	    var endDate = _props.endDate;

	    if (!startDate || !endDate) return false;

	    var before = startDate.clone().startOf("day").subtract(1, "seconds");
	    var after = endDate.clone().startOf("day").add(1, "seconds");
	    return day.clone().startOf("day").isBetween(before, after);
	  },
	  isWeekend: function isWeekend() {
	    var weekday = this.props.day.weekday();
	    return weekday === 5 || weekday === 6;
	  },
	  isOutsideMonth: function isOutsideMonth() {
	    return this.props.month !== undefined && this.props.month !== this.props.day.month();
	  },
	  getClassNames: function getClassNames() {
	    return (0, _classnames2.default)("datepicker__day", {
	      "datepicker__day--disabled": this.isDisabled(),
	      "datepicker__day--selected": this.isSameDay(this.props.selected),
	      "datepicker__day--in-range": this.isInRange(),
	      "datepicker__day--today": this.isSameDay((0, _moment2.default)()),
	      "datepicker__day--weekend": this.isWeekend(),
	      "datepicker__day--outside-month": this.isOutsideMonth()
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: this.getClassNames(), onClick: this.handleClick },
	      this.props.day.date()
	    );
	  }
	});

	module.exports = Day;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _TetherComponent = __webpack_require__(15);

	var _TetherComponent2 = _interopRequireDefault(_TetherComponent);

	exports['default'] = _TetherComponent2['default'];
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _tether = __webpack_require__(16);

	var _tether2 = _interopRequireDefault(_tether);

	var childrenPropType = function childrenPropType(_ref, propName, componentName) {
	  var children = _ref.children;

	  var childCount = _react.Children.count(children);
	  if (childCount <= 0) {
	    return new Error(componentName + ' expects at least one child to use as the target element.');
	  } else if (childCount > 2) {
	    return new Error('Only a max of two children allowed in ' + componentName + '.');
	  }
	};

	var attachmentPositions = ['top left', 'top center', 'top right', 'middle left', 'middle center', 'middle right', 'bottom left', 'bottom center', 'bottom right'];

	var TetherComponent = (function (_Component) {
	  _inherits(TetherComponent, _Component);

	  function TetherComponent() {
	    _classCallCheck(this, TetherComponent);

	    _get(Object.getPrototypeOf(TetherComponent.prototype), 'constructor', this).apply(this, arguments);

	    this._targetNode = null;
	    this._elementParentNode = null;
	    this._tether = false;
	  }

	  _createClass(TetherComponent, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._targetNode = _reactDom2['default'].findDOMNode(this);
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
	    key: 'disable',
	    value: function disable() {
	      this._tether.disable();
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      this._tether.enable();
	    }
	  }, {
	    key: 'position',
	    value: function position() {
	      this._tether.position();
	    }
	  }, {
	    key: '_destroy',
	    value: function _destroy() {
	      _reactDom2['default'].unmountComponentAtNode(this._elementParentNode);
	      this._elementParentNode.parentNode.removeChild(this._elementParentNode);

	      if (this._tether) {
	        this._tether.destroy();
	      }

	      this._elementParentNode = null;
	      this._tether = null;
	    }
	  }, {
	    key: '_update',
	    value: function _update() {
	      var _this = this;

	      var _props = this.props;
	      var children = _props.children;
	      var renderElementTag = _props.renderElementTag;
	      var renderElementTo = _props.renderElementTo;

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
	        renderElementTo.appendChild(this._elementParentNode);
	      }

	      // render element component into the DOM
	      _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, elementComponent, this._elementParentNode, function () {
	        // don't update Tether until the subtree has finished rendering
	        _this._updateTether();
	      });
	    }
	  }, {
	    key: '_updateTether',
	    value: function _updateTether() {
	      var _props2 = this.props;
	      var children = _props2.children;
	      var renderElementTag = _props2.renderElementTag;
	      var renderElementTo = _props2.renderElementTo;

	      var options = _objectWithoutProperties(_props2, ['children', 'renderElementTag', 'renderElementTo']);

	      var tetherOptions = _extends({
	        target: this._targetNode,
	        element: this._elementParentNode
	      }, options);

	      if (!this._tether) {
	        this._tether = new _tether2['default'](tetherOptions);
	      } else {
	        this._tether.setOptions(tetherOptions);
	      }

	      this._tether.position();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var children = this.props.children;

	      var firstChild = null;

	      // we use forEach because the second child could be null
	      // causing children to not be an array
	      _react.Children.forEach(children, function (child, index) {
	        if (index === 0) {
	          firstChild = child;
	          return;
	        }
	      });

	      return firstChild;
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      children: childrenPropType,
	      renderElementTag: _react.PropTypes.string,
	      renderElementTo: _react.PropTypes.any,
	      attachment: _react.PropTypes.oneOf(attachmentPositions).isRequired,
	      targetAttachment: _react.PropTypes.oneOf(attachmentPositions),
	      offset: _react.PropTypes.string,
	      targetOffset: _react.PropTypes.string,
	      targetModifier: _react.PropTypes.string,
	      enabled: _react.PropTypes.bool,
	      classes: _react.PropTypes.object,
	      classPrefix: _react.PropTypes.string,
	      optimizations: _react.PropTypes.object,
	      constraints: _react.PropTypes.array
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      renderElementTag: 'div',
	      renderElementTo: document.body
	    },
	    enumerable: true
	  }]);

	  return TetherComponent;
	})(_react.Component);

	exports['default'] = TetherComponent;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.1.0 */

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

	function getScrollParent(el) {
	  var _getComputedStyle = getComputedStyle(el);

	  var position = _getComputedStyle.position;

	  if (position === 'fixed') {
	    return el;
	  }

	  var parent = el;
	  while (parent = parent.parentNode) {
	    var style = undefined;
	    try {
	      style = getComputedStyle(parent);
	    } catch (err) {}

	    if (typeof style === 'undefined' || style === null) {
	      return parent;
	    }

	    var _style = style;
	    var overflow = _style.overflow;
	    var overflowX = _style.overflowX;
	    var overflowY = _style.overflowY;

	    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
	        return parent;
	      }
	    }
	  }

	  return document.body;
	}

	var uniqueId = (function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	})();

	var zeroPosCache = {};
	var getOrigin = function getOrigin(doc) {
	  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
	  // jitter as the user scrolls that messes with our ability to detect if two positions
	  // are equivilant or not.  We place an element at the top left of the page that will
	  // get the same jitter, so we can cancel the two out.
	  var node = doc._tetherZeroElement;
	  if (typeof node === 'undefined') {
	    node = doc.createElement('div');
	    node.setAttribute('data-tether-id', uniqueId());
	    extend(node.style, {
	      top: 0,
	      left: 0,
	      position: 'absolute'
	    });

	    doc.body.appendChild(node);

	    doc._tetherZeroElement = node;
	  }

	  var id = node.getAttribute('data-tether-id');
	  if (typeof zeroPosCache[id] === 'undefined') {
	    zeroPosCache[id] = {};

	    var rect = node.getBoundingClientRect();
	    for (var k in rect) {
	      // Can't use extend, as on IE9, elements don't resolve to be hasOwnProperty
	      zeroPosCache[id][k] = rect[k];
	    }

	    // Clear the cache when this position call is done
	    defer(function () {
	      delete zeroPosCache[id];
	    });
	  }

	  return zeroPosCache[id];
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

	  var box = {};
	  // The original object returned by getBoundingClientRect is immutable, so we clone it
	  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
	  var rect = el.getBoundingClientRect();
	  for (var k in rect) {
	    box[k] = rect[k];
	  }

	  var origin = getOrigin(doc);

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

	function getScrollBarSize() {
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

	  return { width: width, height: width };
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
	  if (el.className instanceof SVGAnimatedString) {
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
	      if (typeof this.bindings !== 'undefined' && typeof this.bindings[event] !== 'undefined') {
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
	  getScrollParent: getScrollParent,
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
	  getScrollBarSize: getScrollBarSize
	};
	/* globals TetherBase, performance */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	if (typeof TetherBase === 'undefined') {
	  throw new Error('You must include the utils.js file before tether.js');
	}

	var _TetherBase$Utils = TetherBase.Utils;
	var getScrollParent = _TetherBase$Utils.getScrollParent;
	var getBounds = _TetherBase$Utils.getBounds;
	var getOffsetParent = _TetherBase$Utils.getOffsetParent;
	var extend = _TetherBase$Utils.extend;
	var addClass = _TetherBase$Utils.addClass;
	var removeClass = _TetherBase$Utils.removeClass;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	var flush = _TetherBase$Utils.flush;
	var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;

	function within(a, b) {
	  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	  return a + diff >= b && b >= a - diff;
	}

	var transformKey = (function () {
	  if (typeof document === 'undefined') {
	    return '';
	  }
	  var el = document.createElement('div');

	  var transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
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

	    if (typeof pendingTimeout !== 'undefined') {
	      clearTimeout(pendingTimeout);
	      pendingTimeout = null;
	    }

	    lastCall = now();
	    position();
	    lastDuration = now() - lastCall;
	  };

	  if (typeof window !== 'undefined') {
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

	var TetherClass = (function () {
	  function TetherClass(options) {
	    var _this = this;

	    _classCallCheck(this, TetherClass);

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

	      if (typeof this.scrollParent !== 'undefined') {
	        this.disable();
	      }

	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParent = this.target;
	      } else {
	        this.scrollParent = getScrollParent(this.target);
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
	      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('enabled'));
	      }
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;

	      if (this.scrollParent !== document) {
	        this.scrollParent.addEventListener('scroll', this.position);
	      }

	      if (pos) {
	        this.position();
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;

	      if (typeof this.scrollParent !== 'undefined') {
	        this.scrollParent.removeEventListener('scroll', this.position);
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this3 = this;

	      this.disable();

	      tethers.forEach(function (tether, i) {
	        if (tether === _this3) {
	          tethers.splice(i, 1);
	          return;
	        }
	      });
	    }
	  }, {
	    key: 'updateAttachClasses',
	    value: function updateAttachClasses(elementAttach, targetAttach) {
	      var _this4 = this;

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
	        all.push(_this4.getClass('element-attached') + '-' + side);
	        all.push(_this4.getClass('target-attached') + '-' + side);
	      });

	      defer(function () {
	        if (!(typeof _this4._addAttachClasses !== 'undefined')) {
	          return;
	        }

	        updateClasses(_this4.element, _this4._addAttachClasses, all);
	        if (!(_this4.options.addTargetClasses === false)) {
	          updateClasses(_this4.target, _this4._addAttachClasses, all);
	        }

	        delete _this4._addAttachClasses;
	      });
	    }
	  }, {
	    key: 'position',
	    value: function position() {
	      var _this5 = this;

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
	        return getBounds(_this5.element);
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
	        return _this5.getTargetBounds();
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

	      var scrollbarSize = undefined;
	      if (document.body.scrollWidth > window.innerWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }

	      if (document.body.scrollHeight > window.innerHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }

	      if (['', 'static'].indexOf(document.body.style.position) === -1 || ['', 'static'].indexOf(document.body.parentElement.style.position) === -1) {
	        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
	        next.page.bottom = document.body.scrollHeight - top - height;
	        next.page.right = document.body.scrollWidth - left - width;
	      }

	      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
	        (function () {
	          var offsetParent = _this5.cache('target-offsetparent', function () {
	            return getOffsetParent(_this5.target);
	          });
	          var offsetPosition = _this5.cache('target-offsetparent-bounds', function () {
	            return getBounds(offsetParent);
	          });
	          var offsetParentStyle = getComputedStyle(offsetParent);
	          var offsetParentSize = offsetPosition;

	          var offsetBorder = {};
	          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
	            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
	          });

	          offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	          offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

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
	      var _this6 = this;

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
	        var hasOptimizations = typeof _this6.options.optimizations !== 'undefined';
	        var gpu = hasOptimizations ? _this6.options.optimizations.gpu : null;
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

	          css[transformKey] = 'translateX(' + Math.round(xPos) + 'px) translateY(' + Math.round(yPos) + 'px)';

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
	          var offsetParent = _this6.cache('target-offsetparent', function () {
	            return getOffsetParent(_this6.target);
	          });

	          if (getOffsetParent(_this6.element) !== offsetParent) {
	            defer(function () {
	              _this6.element.parentNode.removeChild(_this6.element);
	              offsetParent.appendChild(_this6.element);
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
	        var offsetParentIsBody = true;
	        var currentNode = this.element.parentNode;
	        while (currentNode && currentNode.tagName !== 'BODY') {
	          if (getComputedStyle(currentNode).position !== 'static') {
	            offsetParentIsBody = false;
	            break;
	          }

	          currentNode = currentNode.parentNode;
	        }

	        if (!offsetParentIsBody) {
	          this.element.parentNode.removeChild(this.element);
	          document.body.appendChild(this.element);
	        }
	      }

	      // Any css change will trigger a repaint, so let's avoid one if nothing changed
	      var writeCSS = {};
	      var write = false;
	      for (var key in css) {
	        var val = css[key];
	        var elVal = this.element.style[key];

	        if (elVal !== '' && val !== '' && ['top', 'left', 'bottom', 'right'].indexOf(key) >= 0) {
	          elVal = parseFloat(elVal);
	          val = parseFloat(val);
	        }

	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = val;
	        }
	      }

	      if (write) {
	        defer(function () {
	          extend(_this6.element.style, writeCSS);
	        });
	      }
	    }
	  }]);

	  return TetherClass;
	})();

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
	    to = tether.scrollParent;
	  } else if (to === 'window') {
	    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	  }

	  if (to === document) {
	    to = to.documentElement;
	  }

	  if (typeof to.nodeType !== 'undefined') {
	    (function () {
	      var size = getBounds(to);
	      var pos = size;
	      var style = getComputedStyle(to);

	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

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
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          if (eAttachment.top === 'bottom') {
	            top += targetHeight;
	            tAttachment.top = 'bottom';

	            top += height;
	            eAttachment.top = 'top';
	          } else if (eAttachment.top === 'top') {
	            top += targetHeight;
	            tAttachment.top = 'bottom';

	            top -= height;
	            eAttachment.top = 'bottom';
	          }
	        }

	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          if (eAttachment.top === 'top') {
	            top -= targetHeight;
	            tAttachment.top = 'top';

	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (eAttachment.top === 'bottom') {
	            top -= targetHeight;
	            tAttachment.top = 'top';

	            top += height;
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
	        if (left < bounds[0] && eAttachment.left === 'right') {
	          left += width;
	          eAttachment.left = 'left';
	        }

	        if (left + width > bounds[2] && eAttachment.left === 'left') {
	          left -= width;
	          eAttachment.left = 'right';
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