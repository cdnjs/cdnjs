(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("tether"), require("moment"), require("lodash"), require("react-onclickoutside"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "tether", "moment", "lodash", "react-onclickoutside"], factory);
	else if(typeof exports === 'object')
		exports["DatePicker"] = factory(require("react"), require("tether"), require("moment"), require("lodash"), require("react-onclickoutside"));
	else
		root["DatePicker"] = factory(root["React"], root["Tether"], root["moment"], root["_"], root["OnClickOutside"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
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

	var React = __webpack_require__(1);
	var Popover = __webpack_require__(2);
	var DateUtil = __webpack_require__(4);
	var Calendar = __webpack_require__(5);
	var DateInput = __webpack_require__(10);
	var moment = __webpack_require__(7);
	var _ = __webpack_require__(8);

	var DatePicker = React.createClass({
	  displayName: "DatePicker",

	  propTypes: {
	    weekdays: React.PropTypes.arrayOf(React.PropTypes.string),
	    locale: React.PropTypes.string,
	    dateFormatCalendar: React.PropTypes.string,
	    popoverAttachment: React.PropTypes.string,
	    popoverTargetAttachment: React.PropTypes.string,
	    popoverTargetOffset: React.PropTypes.string,
	    onChange: React.PropTypes.func.isRequired,
	    onBlur: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
	      locale: "en",
	      dateFormatCalendar: "MMMM YYYY",
	      moment: moment,
	      onChange: function onChange() {},
	      disabled: false
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      focus: false,
	      virtualFocus: false,
	      selected: this.props.selected
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      selected: nextProps.selected
	    });
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state));
	  },

	  getValue: function getValue() {
	    return this.state.selected;
	  },

	  handleFocus: function handleFocus() {
	    this.setState({
	      focus: true
	    });
	  },

	  handleBlur: function handleBlur() {
	    this.setState({ virtualFocus: false });
	    setTimeout((function () {
	      if (!this.state.virtualFocus && typeof this.props.onBlur === "function") {
	        this.props.onBlur(this.state.selected);
	        this.hideCalendar();
	      }
	    }).bind(this), 200);
	  },

	  hideCalendar: function hideCalendar() {
	    setTimeout((function () {
	      this.setState({
	        focus: false
	      });
	    }).bind(this), 0);
	  },

	  handleSelect: function handleSelect(date) {
	    this.setSelected(date);

	    setTimeout((function () {
	      this.hideCalendar();
	    }).bind(this), 200);
	  },

	  setSelected: function setSelected(date) {
	    var moment = date.moment();

	    this.props.onChange(moment);

	    this.setState({
	      selected: moment,
	      virtualFocus: true
	    });
	  },

	  clearSelected: function clearSelected() {
	    this.props.onChange(null);

	    this.setState({
	      selected: null
	    });
	  },

	  onInputClick: function onInputClick() {
	    this.setState({
	      focus: true,
	      virtualFocus: true
	    });
	  },

	  calendar: function calendar() {
	    if (this.state.focus) {
	      return React.createElement(
	        Popover,
	        {
	          attachment: this.props.popoverAttachment,
	          targetAttachment: this.props.popoverTargetAttachment,
	          targetOffset: this.props.popoverTargetOffset },
	        React.createElement(Calendar, {
	          weekdays: this.props.weekdays,
	          locale: this.props.locale,
	          moment: this.props.moment,
	          dateFormat: this.props.dateFormatCalendar,
	          selected: this.state.selected,
	          onSelect: this.handleSelect,
	          hideCalendar: this.hideCalendar,
	          minDate: this.props.minDate,
	          maxDate: this.props.maxDate,
	          excludeDates: this.props.excludeDates,
	          weekStart: this.props.weekStart })
	      );
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(DateInput, {
	        name: this.props.name,
	        date: this.state.selected,
	        dateFormat: this.props.dateFormat,
	        focus: this.state.focus,
	        onFocus: this.handleFocus,
	        onBlur: this.handleBlur,
	        handleClick: this.onInputClick,
	        handleEnter: this.hideCalendar,
	        setSelected: this.setSelected,
	        clearSelected: this.clearSelected,
	        hideCalendar: this.hideCalendar,
	        placeholderText: this.props.placeholderText,
	        disabled: this.props.disabled,
	        className: this.props.className,
	        title: this.props.title }),
	      this.props.disabled ? null : this.calendar()
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

	var React = __webpack_require__(1);

	var Popover = React.createClass({
	  displayName: "Popover",

	  propTypes: {
	    attachment: React.PropTypes.string,
	    targetAttachment: React.PropTypes.string,
	    targetOffset: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      attachment: "top left",
	      targetAttachment: "bottom left",
	      targetOffset: "10px 0"
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    var popoverContainer = document.createElement("span");
	    popoverContainer.className = "datepicker__container";

	    this._popoverElement = popoverContainer;

	    document.querySelector("body").appendChild(this._popoverElement);
	  },

	  componentDidMount: function componentDidMount() {
	    this._renderPopover();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._renderPopover();
	  },

	  _popoverComponent: function _popoverComponent() {
	    var className = this.props.className;
	    return React.createElement(
	      "div",
	      { className: className },
	      this.props.children
	    );
	  },

	  _tetherOptions: function _tetherOptions() {
	    return {
	      element: this._popoverElement,
	      target: this.getDOMNode().parentElement.querySelector("input"),
	      attachment: this.props.attachment,
	      targetAttachment: this.props.targetAttachment,
	      targetOffset: this.props.targetOffset,
	      optimizations: {
	        moveElement: false // always moves to <body> anyway!
	      },
	      constraints: [{
	        to: "window",
	        attachment: "together"
	      }]
	    };
	  },

	  _renderPopover: function _renderPopover() {
	    React.render(this._popoverComponent(), this._popoverElement);

	    if (this._tether != null) {
	      this._tether.setOptions(this._tetherOptions());
	    } else if (window && document) {
	      var Tether = __webpack_require__(3);
	      this._tether = new Tether(this._tetherOptions());
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._tether.destroy();
	    React.unmountComponentAtNode(this._popoverElement);
	    if (this._popoverElement.parentNode) {
	      this._popoverElement.parentNode.removeChild(this._popoverElement);
	    }
	  },

	  render: function render() {
	    return React.createElement("span", null);
	  }
	});

	module.exports = Popover;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	function DateUtil(date) {
	  this._date = date;
	}

	DateUtil.prototype.isBefore = function (other) {
	  return this._date.isBefore(other._date, "day");
	};

	DateUtil.prototype.isAfter = function (other) {
	  return this._date.isAfter(other._date, "day");
	};

	DateUtil.prototype.sameDay = function (other) {
	  return this._date.isSame(other._date, "day");
	};

	DateUtil.prototype.sameMonth = function (other) {
	  return this._date.isSame(other._date, "month");
	};

	DateUtil.prototype.day = function () {
	  return this._date.date();
	};

	DateUtil.prototype.mapDaysInWeek = function (callback) {
	  var week = [];
	  var firstDay = this._date.clone();

	  for (var i = 0; i < 7; i++) {
	    var day = new DateUtil(firstDay.clone().add(i, "days"));

	    week[i] = callback(day, i);
	  }

	  return week;
	};

	DateUtil.prototype.mapWeeksInMonth = function (callback) {
	  var month = [];
	  var firstDay = this._date.clone().startOf("month").startOf("week");

	  for (var i = 0; i < 6; i++) {
	    var weekStart = new DateUtil(firstDay.clone().add(i, "weeks"));

	    month[i] = callback(weekStart, i);
	  }

	  return month;
	};

	DateUtil.prototype.weekInMonth = function (other) {
	  var firstDayInWeek = this._date.clone();
	  var lastDayInWeek = this._date.clone().weekday(7);

	  return firstDayInWeek.isSame(other._date, "month") || lastDayInWeek.isSame(other._date, "month");
	};

	DateUtil.prototype.format = function () {
	  return this._date.format.apply(this._date, arguments);
	};

	DateUtil.prototype.localeFormat = function () {
	  var args = Array.prototype.slice.call(arguments);
	  var locale = args.shift();
	  return this._date.locale(locale).format.apply(this._date, args);
	};

	DateUtil.prototype.addMonth = function () {
	  return new DateUtil(this._date.clone().add(1, "month"));
	};

	DateUtil.prototype.subtractMonth = function () {
	  return new DateUtil(this._date.clone().subtract(1, "month"));
	};

	DateUtil.prototype.clone = function () {
	  return new DateUtil(this._date.clone());
	};

	DateUtil.prototype.safeClone = function (alternative) {
	  if (!!this._date) return this.clone();

	  if (alternative === undefined) alternative = null;
	  return new DateUtil(alternative);
	};

	DateUtil.prototype.moment = function () {
	  return this._date;
	};

	module.exports = DateUtil;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var Day = __webpack_require__(6);
	var DateUtil = __webpack_require__(4);
	var _ = __webpack_require__(8);

	var Calendar = React.createClass({
	  displayName: "Calendar",

	  mixins: [__webpack_require__(9)],

	  handleClickOutside: function handleClickOutside() {
	    this.props.hideCalendar();
	  },

	  getInitialState: function getInitialState() {
	    return {
	      date: new DateUtil(this.props.selected).safeClone(this.props.moment())
	    };
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      weekStart: 1
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    this.initializeMomentLocale();
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.selected === null) {
	      return;
	    }

	    // When the selected date changed
	    if (nextProps.selected !== this.props.selected) {
	      this.setState({
	        date: new DateUtil(nextProps.selected).clone()
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
	      date: this.state.date.addMonth()
	    });
	  },

	  decreaseMonth: function decreaseMonth() {
	    this.setState({
	      date: this.state.date.subtractMonth()
	    });
	  },

	  weeks: function weeks() {
	    return this.state.date.mapWeeksInMonth(this.renderWeek);
	  },

	  handleDayClick: function handleDayClick(day) {
	    this.props.onSelect(day);
	  },

	  renderWeek: function renderWeek(weekStart, key) {
	    if (!weekStart.weekInMonth(this.state.date)) {
	      return;
	    }

	    return React.createElement(
	      "div",
	      { key: key },
	      this.days(weekStart)
	    );
	  },

	  renderDay: function renderDay(day, key) {
	    var minDate = new DateUtil(this.props.minDate).safeClone(),
	        maxDate = new DateUtil(this.props.maxDate).safeClone(),
	        excludeDates,
	        disabled;

	    if (this.props.excludeDates && Array.isArray(this.props.excludeDates)) {
	      excludeDates = _(this.props.excludeDates).map(function (date) {
	        return new DateUtil(date).safeClone();
	      });
	    }

	    disabled = day.isBefore(minDate) || day.isAfter(maxDate) || _(excludeDates).some(function (xDay) {
	      return day.sameDay(xDay);
	    });

	    return React.createElement(Day, {
	      key: key,
	      day: day,
	      date: this.state.date,
	      onClick: this.handleDayClick.bind(this, day),
	      selected: new DateUtil(this.props.selected),
	      disabled: disabled });
	  },

	  days: function days(weekStart) {
	    return weekStart.mapDaysInWeek(this.renderDay);
	  },

	  header: function header() {
	    return this.props.moment.weekdaysMin().map(function (day, key) {
	      return React.createElement(
	        "div",
	        { className: "datepicker__day", key: key },
	        day
	      );
	    });
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "datepicker" },
	      React.createElement("div", { className: "datepicker__triangle" }),
	      React.createElement(
	        "div",
	        { className: "datepicker__header" },
	        React.createElement("a", { className: "datepicker__navigation datepicker__navigation--previous",
	          onClick: this.decreaseMonth }),
	        React.createElement(
	          "span",
	          { className: "datepicker__current-month" },
	          this.state.date.localeFormat(this.props.locale, this.props.dateFormat)
	        ),
	        React.createElement("a", { className: "datepicker__navigation datepicker__navigation--next",
	          onClick: this.increaseMonth }),
	        React.createElement(
	          "div",
	          null,
	          this.header()
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "datepicker__month" },
	        this.weeks()
	      )
	    );
	  }
	});

	module.exports = Calendar;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var moment = __webpack_require__(7);

	var Day = React.createClass({
	  displayName: "Day",

	  handleClick: function handleClick(event) {
	    if (this.props.disabled) return;

	    this.props.onClick(event);
	  },

	  isWeekend: function isWeekend() {
	    var weekday = this.props.day.moment().weekday();
	    return weekday === 5 || weekday === 6;
	  },

	  render: function render() {
	    var classes = ["datepicker__day"];

	    if (this.props.disabled) classes.push("datepicker__day--disabled");

	    if (this.props.day.sameDay(this.props.selected)) classes.push("datepicker__day--selected");

	    if (this.props.day.sameDay(moment())) classes.push("datepicker__day--today");

	    if (this.isWeekend()) {
	      classes.push("datepicker__day--weekend");
	    }

	    return React.createElement(
	      "div",
	      { className: classes.join(" "), onClick: this.handleClick },
	      this.props.day.day()
	    );
	  }
	});

	module.exports = Day;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var DateUtil = __webpack_require__(4);
	var moment = __webpack_require__(7);

	var DateInput = React.createClass({
	  displayName: "DateInput",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      dateFormat: "YYYY-MM-DD",
	      className: "datepicker__input",
	      onBlur: function onBlur() {}
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      value: this.safeDateFormat(this.props.date)
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this.toggleFocus(this.props.focus);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    this.toggleFocus(newProps.focus);

	    this.setState({
	      value: this.safeDateFormat(newProps.date)
	    });
	  },

	  toggleFocus: function toggleFocus(focus) {
	    if (focus) {
	      React.findDOMNode(this.refs.input).focus();
	    } else {
	      React.findDOMNode(this.refs.input).blur();
	    }
	  },

	  handleChange: function handleChange(event) {
	    var date = moment(event.target.value, this.props.dateFormat, true);

	    this.setState({
	      value: event.target.value
	    });

	    if (date.isValid()) {
	      this.props.setSelected(new DateUtil(date));
	    } else if (event.target.value === "") {
	      this.props.clearSelected();
	    }
	  },

	  safeDateFormat: function safeDateFormat(date) {
	    return !!date ? date.format(this.props.dateFormat) : null;
	  },

	  handleKeyDown: function handleKeyDown(event) {
	    switch (event.key) {
	      case "Enter":
	        event.preventDefault();
	        this.props.handleEnter();
	        break;
	      case "Escape":
	        event.preventDefault();
	        this.props.hideCalendar();
	        break;
	    }
	  },

	  handleClick: function handleClick(event) {
	    if (!this.props.disabled) {
	      this.props.handleClick(event);
	    }
	  },

	  render: function render() {
	    return React.createElement("input", {
	      ref: "input",
	      type: "text",
	      name: this.props.name,
	      value: this.state.value,
	      onClick: this.handleClick,
	      onKeyDown: this.handleKeyDown,
	      onFocus: this.props.onFocus,
	      onBlur: this.props.onBlur,
	      onChange: this.handleChange,
	      className: this.props.className,
	      disabled: this.props.disabled,
	      placeholder: this.props.placeholderText });
	  }
	});

	module.exports = DateInput;

/***/ }
/******/ ])
});
;