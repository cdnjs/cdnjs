(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "moment"], factory);
	else if(typeof exports === 'object')
		exports["DatePicker"] = factory(require("React"), require("moment"));
	else
		root["DatePicker"] = factory(root["React"], root["moment"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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

	var _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];for (var key in source) {
	            if (Object.prototype.hasOwnProperty.call(source, key)) {
	                target[key] = source[key];
	            }
	        }
	    }return target;
	};

	function _toConsumableArray(arr) {
	    if (Array.isArray(arr)) {
	        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
	    } else {
	        return Array.from(arr);
	    }
	}

	var React = __webpack_require__(1);

	var moment = __webpack_require__(2);
	var assign = __webpack_require__(3);
	var asConfig = __webpack_require__(4);

	var MonthView = __webpack_require__(7);
	var YearView = __webpack_require__(12);
	var DecadeView = __webpack_require__(13);
	var Header = __webpack_require__(14);
	var toMoment = __webpack_require__(9);

	var hasOwn = function hasOwn(obj, key) {
	    return Object.prototype.hasOwnProperty.call(obj, key);
	};

	var onEnter = __webpack_require__(10);

	var Views = {
	    month: MonthView,
	    year: YearView,
	    decade: DecadeView
	};

	function emptyFn() {}

	var DatePicker = React.createClass({

	    displayName: 'DatePicker',

	    propTypes: {
	        todayText: React.PropTypes.string,
	        gotoSelectedText: React.PropTypes.string,

	        renderFooter: React.PropTypes.func,
	        onChange: React.PropTypes.func,

	        date: React.PropTypes.any,
	        viewDate: React.PropTypes.any
	    },

	    getViewOrder: function getViewOrder() {
	        return this.props.viewOrder || ['month', 'year', 'decade'];
	    },

	    getDefaultProps: function getDefaultProps() {
	        var props = assign({}, asConfig(), {
	            highlightWeekends: false,
	            weekNumberName: '',
	            isDatePicker: true,
	            navOnDateClick: true,
	            highlightRangeOnMouseMove: true,
	            defaultStyle: {
	                boxSizing: 'border-box'
	            },
	            onRangeChange: function onRangeChange() {}
	        });

	        delete props.viewDate;
	        delete props.date;

	        return props;
	    },

	    getInitialState: function getInitialState() {
	        return {
	            view: this.props.defaultView,
	            viewDate: this.props.defaultViewDate,
	            defaultDate: this.props.defaultDate,
	            defaultRange: this.props.defaultRange
	        };
	    },

	    getViewName: function getViewName() {
	        var view = this.props.view != null ? this.props.view : this.state.view;

	        return view || 'month';
	    },

	    addViewIndex: function addViewIndex(amount) {
	        var viewName = this.getViewName();

	        var order = this.getViewOrder();
	        var index = order.indexOf(viewName);

	        index += amount;

	        return index % order.length;
	    },

	    getNextViewName: function getNextViewName() {
	        return this.getViewOrder()[this.addViewIndex(1)];
	    },

	    getPrevViewName: function getPrevViewName() {
	        return this.getViewOrder()[this.addViewIndex(-1)];
	    },

	    getView: function getView() {
	        var views = this.props.views || Views;
	        return views[this.getViewName()] || views.month;
	    },

	    getViewFactory: function getViewFactory() {
	        var view = this.getView();

	        if (React.createFactory && view && view.prototype && typeof view.prototype.render == 'function') {
	            view.__factory = view.__factory || React.createFactory(view);
	            view = view.__factory;
	        }

	        return view;
	    },

	    getViewDate: function getViewDate() {
	        var date = hasOwn(this.props, 'viewDate') ? this.props.viewDate : this.state.viewDate;

	        date = date || this.viewMoment || this.getDate() || new Date();

	        if (moment.isMoment(date)) {
	            //in order to strip the locale - the date picker may have had its locale changed
	            //between two render calls. If we don't strip this, moment(mom) returns a new moment
	            //with the locale of mom, which is not what we want
	            date = +date;
	        }

	        date = this.toMoment(date);

	        return date;
	    },

	    getDate: function getDate() {
	        var date;

	        if (hasOwn(this.props, 'date')) {
	            date = this.props.date;
	        } else {
	            date = this.state.defaultDate;
	        }
	        return date ? this.toMoment(date) : null;
	    },

	    getRange: function getRange() {
	        var _this = this;

	        var range;

	        if (hasOwn(this.props, 'range')) {
	            range = this.props.range;
	        } else if (this.state.defaultRange) {
	            range = this.state.defaultRange;
	        }
	        if (range) {
	            return range.map(function (r) {
	                return r ? _this.toMoment(r) : null;
	            }) || null;
	        } else {
	            return null;
	        }
	    },

	    render: function render() {

	        var props = this.p = assign({}, this.props);

	        this.toMoment = function (value, dateFormat) {
	            return toMoment(value, dateFormat || props.dateFormat, { locale: props.locale });
	        };

	        var view = this.getViewFactory();

	        props.date = this.getDate();
	        props.range = this.getRange();

	        var dateString = props.date == null ? '' : props.date.format(this.props.dateFormat);

	        props.viewDate = this.viewMoment = this.getViewDate();
	        props.locale = this.props.locale;
	        props.localeData = moment.localeData(props.locale);

	        props.renderDay = this.props.renderDay;
	        props.onRenderDay = this.props.onRenderDay;

	        // props.onChange  = this.handleChange
	        // props.onSelect  = this.handleSelect

	        var className = (this.props.className || '') + ' date-picker';

	        props.style = this.prepareStyle(props);

	        var viewProps = props;
	        var viewProps = asConfig(props);

	        viewProps.toMoment = this.toMoment;
	        viewProps.highlightWeekends = this.props.highlightWeekends;
	        viewProps.weekNumbers = this.props.weekNumbers;
	        viewProps.weekNumberName = this.props.weekNumberName;
	        viewProps.dateString = dateString;
	        viewProps.localeData = props.localeData;
	        viewProps.onSelect = this.handleSelect;
	        viewProps.onChange = this.handleChange;
	        viewProps.onWeekChange = this.props.onWeekChange;
	        viewProps.renderWeekNumber = this.props.renderWeekNumber;

	        viewProps.highlightRangeOnMouseMove = this.props.highlightRangeOnMouseMove;
	        viewProps.range = props.range;

	        return React.createElement('div', _extends({}, this.props, { className: className, style: props.style }), this.renderHeader(view, props), React.createElement('div', { className: 'dp-body', style: { flex: 1 } }, view(viewProps)), this.renderFooter(props));
	    },

	    prepareStyle: function prepareStyle(props) {
	        return assign({}, props.defaultStyle, props.style);
	    },

	    renderFooter: function renderFooter(props) {
	        if (this.props.hideFooter) {
	            return;
	        }

	        if (this.props.today) {
	            console.warn('Please use "todayText" prop instead of "today"!');
	        }
	        if (this.props.gotoSelected) {
	            console.warn('Please use "gotoSelectedText" prop instead of "gotoSelected"!');
	        }

	        var todayText = this.props.todayText || 'Today';
	        var gotoSelectedText = this.props.gotoSelectedText || 'Go to selected';

	        var footerProps = {
	            todayText: todayText,
	            gotoSelectedText: gotoSelectedText,
	            gotoToday: this.gotoNow,
	            gotoSelected: this.gotoSelected.bind(this, props),
	            date: props.date,
	            viewDate: props.viewDate
	        };

	        var result;
	        if (typeof this.props.footerFactory == 'function') {
	            result = this.props.footerFactory(footerProps);
	        }

	        if (result !== undefined) {
	            return result;
	        }

	        return React.createElement('div', { className: 'dp-footer' }, React.createElement('div', {
	            tabIndex: '1',
	            role: 'link',
	            className: 'dp-footer-today',
	            onClick: footerProps.gotoToday,
	            onKeyUp: onEnter(footerProps.gotoToday)
	        }, todayText), React.createElement('div', {
	            tabIndex: '1',
	            role: 'link',
	            className: 'dp-footer-selected',
	            onClick: footerProps.gotoSelected,
	            onKeyUp: onEnter(footerProps.gotoSelected)
	        }, gotoSelectedText));
	    },

	    gotoNow: function gotoNow() {
	        this.gotoDate(+new Date());
	    },

	    gotoSelected: function gotoSelected(props) {
	        this.gotoDate(props.date || +new Date());
	    },

	    gotoDate: function gotoDate(value) {

	        this.setView('month');

	        this.setViewDate(value);
	    },

	    getViewColspan: function getViewColspan() {
	        var map = {
	            month: 5,
	            year: 2,
	            decade: 2
	        };

	        return map[this.getViewName()];
	    },

	    renderHeader: function renderHeader(view, props) {

	        if (this.props.hideHeader) {
	            return;
	        }

	        props = props || this.props;

	        var viewDate = this.getViewDate();
	        var headerText = this.getView().getHeaderText(viewDate, props);

	        var colspan = this.getViewColspan();
	        var prev = this.props.navPrev;
	        var next = this.props.navNext;

	        return React.createElement(Header, {
	            prevText: prev,
	            nextText: next,
	            colspan: colspan,
	            onPrev: this.handleNavPrev,
	            onNext: this.handleNavNext,
	            onChange: this.handleViewChange
	        }, headerText);
	    },

	    handleRenderDay: function handleRenderDay(date) {
	        return (this.props.renderDay || emptyFn)(date) || [];
	    },

	    handleViewChange: function handleViewChange() {
	        this.setView(this.getNextViewName());
	    },

	    /**
	     * Use this method to set the view.
	     *
	     * @param {String} view 'month'/'year'/'decade'
	     *
	     * It calls onViewChange, and if the view is uncontrolled, also sets it is state,
	     * so the datepicker gets re-rendered view the new view
	     *
	     */
	    setView: function setView(view) {

	        if (typeof this.props.onViewChange == 'function') {
	            this.props.onViewChange(view);
	        }

	        if (this.props.view == null) {
	            this.setState({
	                view: view
	            });
	        }
	    },

	    setViewDate: function setViewDate(moment) {

	        moment = this.toMoment(moment);

	        var fn = this.props.onViewDateChange;

	        if (typeof fn == 'function') {

	            var text = moment.format(this.props.dateFormat);
	            var view = this.getViewName();

	            fn(text, moment, view);
	        }

	        if (!hasOwn(this.props, 'viewDate')) {
	            this.setState({
	                viewDate: moment
	            });
	        }
	    },

	    getNext: function getNext() {
	        var current = this.getViewDate();
	        var toMoment = this.toMoment;

	        return ({
	            month: function month() {
	                return toMoment(current).add(1, 'month');
	            },
	            year: function year() {
	                return toMoment(current).add(1, 'year');
	            },
	            decade: function decade() {
	                return toMoment(current).add(10, 'year');
	            }
	        })[this.getViewName()]();
	    },

	    getPrev: function getPrev() {
	        var current = this.getViewDate();
	        var toMoment = this.toMoment;

	        return ({
	            month: function month() {
	                return toMoment(current).add(-1, 'month');
	            },
	            year: function year() {
	                return toMoment(current).add(-1, 'year');
	            },
	            decade: function decade() {
	                return toMoment(current).add(-10, 'year');
	            }
	        })[this.getViewName()]();
	    },

	    handleNavigation: function handleNavigation(direction, event) {
	        var viewMoment = direction == -1 ? this.getPrev() : this.getNext();

	        this.setViewDate(viewMoment);

	        if (typeof this.props.onNav === 'function') {
	            var text = viewMoment.format(this.props.dateFormat);
	            var view = this.getViewName();

	            this.props.onNav(text, viewMoment, view, direction, event);
	        }
	    },

	    handleNavPrev: function handleNavPrev(event) {
	        this.handleNavigation(-1, event);
	    },

	    handleNavNext: function handleNavNext(event) {
	        this.handleNavigation(1, event);
	    },

	    handleChange: function handleChange(date, event) {
	        date = this.toMoment(date);

	        if (this.props.navOnDateClick) {
	            var viewDate = this.toMoment(this.getViewDate());

	            //it's not enough to compare months, since the year can change as well
	            //
	            //also it's ok to hardcode the format here
	            var viewMonth = viewDate.format('YYYY-MM');
	            var dateMonth = date.format('YYYY-MM');

	            if (dateMonth > viewMonth) {
	                this.handleNavNext(event);
	            } else if (dateMonth < viewMonth) {
	                this.handleNavPrev(event);
	            }
	        }

	        var text = date.format(this.props.dateFormat);

	        if (!hasOwn(this.props, 'date')) {
	            this.setState({
	                defaultDate: text
	            });
	        }

	        ;(this.props.onChange || emptyFn)(text, date, event);

	        if (this.p.range) {
	            this.handleRangeChange(date, event);
	        }
	    },

	    handleRangeChange: function handleRangeChange(mom) {
	        var _this2 = this;

	        var range = this.p.range;

	        if (range.length < 2) {
	            range = [].concat(_toConsumableArray(range), [mom]);
	        } else {
	            range = [mom];
	        }

	        range.sort(function (a, b) {
	            return a - b;
	        });

	        if (!this.props.range) {
	            this.setState({
	                defaultRange: range
	            });
	        }

	        var rangeText = range.map(function (date) {
	            return date.format(_this2.props.dateFormat);
	        });

	        this.props.onRangeChange(rangeText, range, event);
	    },

	    handleSelect: function handleSelect(date, event) {
	        var viewName = this.getViewName();

	        var property = ({
	            decade: 'year',
	            year: 'month'
	        })[viewName];

	        var value = date.get(property);
	        var viewMoment = this.toMoment(this.getViewDate()).set(property, value);
	        var view = this.getPrevViewName();

	        this.setViewDate(viewMoment);

	        this.setView(view);

	        if (typeof this.props.onSelect === 'function') {
	            var text = viewMoment.format(this.props.dateFormat);
	            this.props.onSelect(text, viewMoment, view, event);
	        }
	    }

	});

	DatePicker.views = Views;

	var PT = React.PropTypes;

	DatePicker.propTypes = {
	    highlightWeekends: PT.bool,

	    /**
	     * Function to be called when user selects a date.
	     *
	     * Called with the following params:
	     *
	     * @param {String} dateText Date formatted as string
	     * @param {Moment} moment Moment.js instance
	     * @param {Event} event
	     *
	     * @type {Function}
	     */
	    onChange: PT.func,

	    /**
	     * Function to be called when the user navigates to the next/prev month/year/decade
	     *
	     * Called with the following params:
	     *
	     * @param {String} dateText Date formatted as string
	     * @param {Moment} moment Moment.js instance
	     * @param {String} view The name of the current view (eg: "month")
	     * @param {Number} direction 1 or -1. 1 if the right arrow, to nav to next period was pressed. -1 if the left arrow, to nav to the prev period was pressed.
	     * @param {Event} event
	     *
	     * @type {Function}
	     */
	    onNav: PT.func,

	    /**
	     * Function to be called when the user selects a year/month.
	     *
	     * Called with the following params:
	     *
	     * @param {String} dateText Date formatted as string
	     * @param {Moment} moment Moment.js instance
	     * @param {String} view The name of the view displayed after following the selection. For now, either "year" or "month"
	     *
	     * @type {Function}
	     */
	    onSelect: PT.func,

	    /**
	     * A function that should return a React DOM for the day cell. The first param is the props object.
	     * You can use this to have full control over what gets rendered for a day.
	     *
	     * @param {Object} dayProps The props object passed to day rendering
	     *
	     * @type {Function}
	     */
	    renderDay: PT.func,

	    /**
	     * A function that can manipulate the props object for a day, and SHOULD return a props object (a new one, or the same).
	     * Use this for CUSTOM DAY STYLING.
	     * You can use this to take full control over the styles/css classes/attributes applied to the day cell in the month view.
	     *
	     * @param {Object} dayProps
	     * @return {Object} dayProps
	     *
	     * @type {Function}
	     */
	    onRenderDay: PT.func,

	    /******************************************/
	    /********** VIEW-related props ************/
	    /******************************************/

	    /**
	     * The default view to show in the picker. This is an uncontrolled prop.
	     * If none specified, the default view will be "month"
	     *
	     * @type {String}
	     */
	    defaultView: PT.string,

	    /**
	     * The view to show in the picker. This is a CONTROLLED prop!
	     *
	     * When using this controlled prop, make sure you update it when `onViewChange` function is called
	     * if you want to navigate to another view, as expected.
	     *
	     * @type {String}
	     */
	    view: PT.string,

	    /**
	     * A function to be called when navigating to another view date.
	     *
	     * Called with the following params:
	     *
	     * @param {String} dateText Date formatted as string
	     * @param {Moment} moment Moment.js instance
	     * @param {String} view the name of the view displayed after the navigation occurs.
	     *
	     * @type {Function}
	     */
	    onViewDateChange: PT.func,

	    /**
	     * A function to be called when the view is changed.
	     * If you're using the controlled `view` prop, make sure you update the `view` prop in this function if you want to navigate to another view, as expected.
	     *
	     * @param {String} nextView One of "month", "year", "decade"
	     *
	     * @type {Function}
	     */
	    onViewChange: PT.func,

	    /**
	     * Defaults to true. If specified as false, will not navigate to the date that was clicked, even if that date is in the prev/next month
	     * @type {Boolean}
	     */
	    navOnDateClick: PT.bool,

	    highlightRangeOnMouseMove: PT.bool
	};

	module.exports = DatePicker;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var assign = __webpack_require__(3)

	var CONFIG = __webpack_require__(5)
	var KEYS   = Object.keys(CONFIG)

	function copyList(src, target, list){
	    if (src){
	        list.forEach(function(key){
	            target[key] = src[key]
	        })
	    }

	    return target
	}

	/**
	 * Returns an object that copies from given source object
	 * on the resulting object only the properties also found in cfg.
	 *
	 * If no cfg specified, CONFIG is assumed
	 *
	 * @param  {object} source
	 * @param  {Object} [cfg] If not specied, CONFIG will be used
	 *
	 * @return {Object}
	 */
	module.exports = function asConfig(source, cfg){

	    var keys = KEYS

	    if (cfg){
	        keys = Object.keys(cfg)
	    }

	    cfg = cfg || CONFIG

	    if (!source){
	        return assign({}, cfg)
	    }

	    return copyList(source, assign({}, cfg), keys)
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var getWeekDayNames = __webpack_require__(6)

	// console.log(getWeekDayNames())

	module.exports = {

	    //the names of week days to be displayed in month view - first should be sunday
	    weekDayNames: getWeekDayNames,

	    //the day to display as first day of week. defaults to 0, which is sunday
	    weekStartDay: null,

	    locale: null,

	    //the format in which days should be displayed in month view
	    dayFormat: 'D',

	    //the format in which months should be displayed in year view
	    monthFormat: 'MMMM',

	    //the format in which years should be displayed in decade view
	    yearFormat: 'YYYY',

	    //text for navigating to prev period
	    navPrev      : '‹',

	    //text for navigating to next period
	    navNext      : '›',

	    //the view to render initially. Possible values are: 'month', 'year', 'decade'
	    view: null,

	    //the date to mark as selected in the date picker.
	    //Can be a Date object, a moment object or a string.
	    //If it's a string, it will be parsed using dateFormat
	    date: null,

	    minDate: null,

	    maxDate: null,

	    //the date where to open the picker. defaults to today if no date and no viewDate specified
	    viewDate: null,

	    //if the date property is given as string, it will be parsed using this format
	    dateFormat: 'YYYY-MM-DD',

	    onRenderDay: null,
	    renderDay: null,

	    alwaysShowPrevWeek: false
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var moment = __webpack_require__(2)

	var DEFAULT_WEEK_START_DAY = moment().startOf('week').format('d') * 1

	module.exports = function getWeekDayNames(startDay, locale){

		var weekDays

		if (locale){
			var data = moment.localeData(locale)

			weekDays = data && data._weekdaysShort? data._weekdaysShort: weekDays
		}

		weekDays = (weekDays || moment.weekdaysShort()).concat()

		var names = weekDays
	    var index = startDay == null? DEFAULT_WEEK_START_DAY: startDay

	    while (index > 0){
	        names.push(names.shift())
	        index--
	    }

	    return names
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i['return']) _i['return']();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError('Invalid attempt to destructure non-iterable instance');
	    }
	  };
	})();

	var React = __webpack_require__(1);
	var moment = __webpack_require__(2);
	var assign = __webpack_require__(3);

	var FORMAT = __webpack_require__(8);
	var asConfig = __webpack_require__(4);
	var onEnter = __webpack_require__(10);
	var toMoment = __webpack_require__(9);

	var isInRange = __webpack_require__(11);

	var TODAY;

	function emptyFn() {}

	var MonthView = React.createClass({

	  displayName: 'MonthView',

	  /**
	   * Formats the given date in the specified format.
	   * @method format
	   *
	   * @param  {Date/String/Moment} value
	   * @param  {String} [format] If none specified, #dateFormat will be used
	   *
	   * @return {String}
	   */

	  formatAsDay: function formatAsDay(moment, dayDisplayFormat) {
	    return moment.format(dayDisplayFormat || 'D');
	  },

	  getDefaultProps: function getDefaultProps() {
	    return asConfig();
	  },

	  getInitialState: function getInitialState() {
	    return {
	      range: null
	    };
	  },

	  getWeekStartMoment: function getWeekStartMoment(value) {
	    var weekStartDay = this.weekStartDay;
	    var clone = this.toMoment(value).day(weekStartDay);

	    return clone;
	  },

	  /**
	   * Returns all the days in the specified month.
	   *
	   * @param  {Moment/Date/Number} value
	   * @return {Moment[]}
	   */
	  getDaysInMonth: function getDaysInMonth(value) {
	    var first = this.toMoment(value).startOf('month');
	    var beforeFirst = this.toMoment(value).startOf('month').add(-1, 'days');
	    var start = this.getWeekStartMoment(first);
	    var result = [];
	    var i = 0;

	    if (beforeFirst.isBefore(start)
	    // and it doesn't start with a full week before and the week has at least 1 day from current month (default)
	     && (this.props.alwaysShowPrevWeek || !start.isSame(first))) {
	      start.add(-1, 'weeks');
	    }

	    for (; i < 42; i++) {
	      result.push(this.toMoment(start));
	      start.add(1, 'days');
	    }

	    return result;
	  },

	  render: function render() {

	    var props = assign({}, this.props);

	    this.toMoment = function (value, dateFormat) {
	      return toMoment(value, dateFormat || props.dateFormat, { locale: props.locale });
	    };

	    TODAY = +this.toMoment().startOf('day');

	    var dateFormat = props.dateFormat;
	    var viewMoment = props.viewMoment = this.toMoment(props.viewDate, dateFormat);

	    var weekStartDay = props.weekStartDay;

	    if (weekStartDay == null) {
	      weekStartDay = props.localeData._week ? props.localeData._week.dow : null;
	    }

	    this.weekStartDay = props.weekStartDay = weekStartDay;

	    if (props.minDate && moment.isMoment(props.minDate)) {
	      props.minDate.startOf('day');
	    }

	    props.minDate && (props.minDate = +this.toMoment(props.minDate, dateFormat));
	    props.maxDate && (props.maxDate = +this.toMoment(props.maxDate, dateFormat));

	    this.monthFirst = this.toMoment(viewMoment).startOf('month');
	    this.monthLast = this.toMoment(viewMoment).endOf('month');

	    if (props.date) {
	      props.moment = this.props.range ? null : this.toMoment(props.date).startOf('day');
	    }

	    var daysInView = this.getDaysInMonth(viewMoment);

	    return React.createElement('div', { className: 'dp-table dp-month-view', onMouseLeave: props.highlightRangeOnMouseMove && this.handleViewMouseLeave }, this.renderWeekDayNames(), this.renderDays(props, daysInView));
	  },

	  handleViewMouseLeave: function handleViewMouseLeave() {
	    this.state.range && this.setState({ range: null });
	  },
	  /**
	   * Render the week number cell
	   * @param  {Moment[]} days The days in a week
	   * @return {React.DOM}
	   */
	  renderWeekNumber: function renderWeekNumber(props, days) {

	    var firstDayOfWeek = days[0];
	    var week = firstDayOfWeek.weeks();
	    var dateTimestamp = +firstDayOfWeek;

	    var weekNumberProps = {
	      key: 'week',
	      className: 'dp-cell dp-weeknumber',

	      //week number
	      week: week,

	      //the days in this week
	      days: days,

	      date: firstDayOfWeek,
	      children: week
	    };

	    var renderWeekNumber = props.renderWeekNumber;
	    var result;

	    if (renderWeekNumber) {
	      result = renderWeekNumber(weekNumberProps);
	    }

	    if (result === undefined) {
	      result = React.createElement('div', weekNumberProps);
	    }

	    return result;
	  },

	  /**
	   * Render the given array of days
	   * @param  {Moment[]} days
	   * @return {React.DOM}
	   */
	  renderDays: function renderDays(props, days) {
	    var nodes = days.map(function (date) {
	      return this.renderDay(props, date);
	    }, this);

	    var len = days.length;
	    var buckets = [];
	    var bucketsLen = Math.ceil(len / 7);

	    var i = 0;
	    var weekStart;
	    var weekEnd;

	    for (; i < bucketsLen; i++) {

	      weekStart = i * 7;
	      weekEnd = (i + 1) * 7;

	      buckets.push([props.weekNumbers && this.renderWeekNumber(props, days.slice(weekStart, weekEnd))].concat(nodes.slice(weekStart, weekEnd)));
	    }

	    return buckets.map(function (bucket, i) {
	      return React.createElement('div', { key: "row" + i, className: 'dp-week dp-row' }, bucket);
	    });
	  },

	  renderDay: function renderDay(props, date) {
	    var dayText = FORMAT.day(date, props.dayFormat);
	    var classes = ["dp-cell dp-day"];

	    var dateTimestamp = +date;
	    var mom = this.toMoment(date);
	    var onClick = this.handleClick.bind(this, props, date, dateTimestamp);

	    var range = this.state.range || this.props.range;
	    var beforeMinDate;

	    if (dateTimestamp == TODAY) {
	      classes.push('dp-current');
	    } else if (dateTimestamp < this.monthFirst) {
	      classes.push('dp-prev');
	    } else if (dateTimestamp > this.monthLast) {
	      classes.push('dp-next');
	    }

	    if (props.minDate && date < props.minDate) {
	      classes.push('dp-disabled dp-before-min');
	      beforeMinDate = true;
	    }

	    var afterMaxDate;
	    if (props.maxDate && date > props.maxDate) {
	      classes.push('dp-disabled dp-after-max');
	      afterMaxDate = true;
	    }

	    if (dateTimestamp == props.moment) {
	      classes.push('dp-value');
	    }

	    if (range) {

	      var start = mom;
	      var end = moment(start).endOf('day');

	      var _range = _slicedToArray(range, 2);

	      var rangeStart = _range[0];
	      var rangeEnd = _range[1];

	      if (isInRange(start, range) || isInRange(end, range) || rangeStart && isInRange(rangeStart, [start, end]) || rangeEnd && isInRange(rangeEnd, [start, end])) {
	        classes.push('dp-in-range');
	      }
	    }

	    var weekDay = mom.day();

	    if (weekDay === 0 /* Sunday */ || weekDay === 6 /* Saturday */) {
	        classes.push('dp-weekend');
	        props.highlightWeekends && classes.push('dp-weekend-highlight');
	      }

	    var renderDayProps = {
	      role: 'link',
	      tabIndex: 1,
	      key: dayText,
	      text: dayText,
	      date: mom,
	      moment: mom,
	      className: classes.join(' '),
	      style: {},
	      onClick: onClick,
	      onKeyUp: onEnter(onClick),
	      children: dayText
	    };

	    if (props.range && props.highlightRangeOnMouseMove) {
	      renderDayProps.onMouseEnter = this.handleDayMouseEnter.bind(this, renderDayProps);
	    }

	    if (beforeMinDate) {
	      renderDayProps.isDisabled = true;
	      renderDayProps.beforeMinDate = true;
	    }
	    if (afterMaxDate) {
	      renderDayProps.isDisabled = true;
	      renderDayProps.afterMaxDate = true;
	    }

	    if (typeof props.onRenderDay === 'function') {
	      renderDayProps = props.onRenderDay(renderDayProps);
	    }

	    var defaultRenderFunction = React.DOM.div;
	    var renderFunction = props.renderDay || defaultRenderFunction;

	    var result = renderFunction(renderDayProps);

	    if (result === undefined) {
	      result = defaultRenderFunction(renderDayProps);
	    }

	    return result;
	  },

	  handleDayMouseEnter: function handleDayMouseEnter(dayProps) {
	    var range = this.props.range;

	    if (range && range.length == 1) {
	      var _range2 = _slicedToArray(range, 1);

	      var start = _range2[0];

	      this.setState({
	        range: [start, dayProps.date].sort(function (a, b) {
	          return a - b;
	        })
	      });
	    } else if (this.state.range) {
	      this.setState({
	        range: null
	      });
	    }
	  },

	  getWeekDayNames: function getWeekDayNames(props) {
	    props = props || this.props;

	    var names = props.weekDayNames;
	    var weekStartDay = this.weekStartDay;

	    if (typeof names == 'function') {
	      names = names(weekStartDay, props.locale);
	    } else if (Array.isArray(names)) {

	      names = [].concat(names);

	      var index = weekStartDay;

	      while (index > 0) {
	        names.push(names.shift());
	        index--;
	      }
	    }

	    return names;
	  },

	  renderWeekDayNames: function renderWeekDayNames() {
	    var weekNumber = this.props.weekNumbers ? [this.props.weekNumberName] : [];
	    var names = weekNumber.concat(this.getWeekDayNames());

	    return React.createElement('div', { className: 'dp-row dp-week-day-names' }, names.map(function (name, index) {
	      return React.createElement('div', { key: index, className: 'dp-cell dp-week-day-name' }, name);
	    }));
	  },

	  handleClick: function handleClick(props, date, timestamp, event) {
	    if (props.minDate && timestamp < props.minDate) {
	      return;
	    }
	    if (props.maxDate && timestamp > props.maxDate) {
	      return;
	    }

	    event.target.value = date;(props.onChange || emptyFn)(date, event);
	  }
	});

	MonthView.getHeaderText = function (moment, props) {
	  return toMoment(moment, null, { locale: props.locale }).format('MMMM YYYY');
	};

	exports['default'] = MonthView;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var CONFIG   = __webpack_require__(5)
	var toMoment = __webpack_require__(9)

	function f(mom, format){
	    return toMoment(mom).format(format)
	}

	module.exports = {
	    day: function(mom, format) {
	        return f(mom, format || CONFIG.dayFormat)
	    },

	    month: function(mom, format) {
	        return f(mom, format || CONFIG.monthFormat)
	    },

	    year: function(mom, format) {
	        return f(mom, format || CONFIG.yearFormat)
	    }
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var moment = __webpack_require__(2)
	var CONFIG = __webpack_require__(5)

	/**
	 * This function will be used to convert a date to a moment.
	 *
	 * It accepts input as sring, date or moment
	 *
	 * @param  {String/Date/Moment} value
	 * @param  {String} [dateFormat] if value is string, it will be parsed to a moment using this format
	 * @param  {Object} [config]
	 * @param  {Boolean} [config.strict] whether to perform strict parsing on strings
	 * @return {Moment}
	 */
	module.exports = function(value, dateFormat, config){
	    var strict = !!(config && config.strict)
	    var locale = config && config.locale

	    dateFormat = dateFormat || CONFIG.dateFormat

	    if (typeof value == 'string'){
	        return moment(value, dateFormat, locale, strict)
	    }

	    // return moment.isMoment(value)?
	    // 			value:
	    return moment(value == null? new Date(): value, undefined, locale, strict)
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function onKeyUp(fn){
	  return function(event){
	    if (event.key == 'Enter'){
	      fn(event)
	    }
	  }
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	var _slicedToArray = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();

	module.exports = function (moment, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var start = _ref2[0];
	  var end = _ref2[1];

	  if (!moment) {
	    return false;
	  }

	  if ((start, end)) {
	    return start.isSameOrBefore(moment) && end.isSameOrAfter(moment);
	  }

	  return false;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = (function () {
	    function sliceIterator(arr, i) {
	        var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	                _arr.push(_s.value);if (i && _arr.length === i) break;
	            }
	        } catch (err) {
	            _d = true;_e = err;
	        } finally {
	            try {
	                if (!_n && _i['return']) _i['return']();
	            } finally {
	                if (_d) throw _e;
	            }
	        }return _arr;
	    }return function (arr, i) {
	        if (Array.isArray(arr)) {
	            return arr;
	        } else if (Symbol.iterator in Object(arr)) {
	            return sliceIterator(arr, i);
	        } else {
	            throw new TypeError('Invalid attempt to destructure non-iterable instance');
	        }
	    };
	})();

	var React = __webpack_require__(1);
	var moment = __webpack_require__(2);

	var FORMAT = __webpack_require__(8);
	var asConfig = __webpack_require__(4);
	var toMoment = __webpack_require__(9);
	var onEnter = __webpack_require__(10);
	var assign = __webpack_require__(3);
	var isInRange = __webpack_require__(11);

	var TODAY;

	function emptyFn() {}

	var YearView = React.createClass({

	    displayName: 'YearView',

	    getDefaultProps: function getDefaultProps() {

	        return asConfig();
	    },

	    /**
	     * Returns all the days in the specified month.
	     *
	     * @param  {Moment/Date/Number} value
	     * @return {Moment[]}
	     */
	    getMonthsInYear: function getMonthsInYear(value) {
	        var start = moment(value).startOf('year');
	        var result = [];
	        var i = 0;

	        for (; i < 12; i++) {
	            result.push(moment(start));
	            start.add(1, 'month');
	        }

	        return result;
	    },

	    render: function render() {

	        TODAY = +moment().startOf('day');

	        var props = assign({}, this.props);

	        var viewMoment = props.viewMoment = moment(this.props.viewDate);

	        if (!this.props.range) {
	            props.moment = moment(props.date).startOf('month');
	        }

	        var monthsInView = this.getMonthsInYear(viewMoment);

	        return React.createElement('div', { className: 'dp-table dp-year-view' }, this.renderMonths(props, monthsInView));
	    },

	    /**
	     * Render the given array of days
	     * @param  {Moment[]} days
	     * @return {React.DOM}
	     */
	    renderMonths: function renderMonths(props, days) {
	        var nodes = days.map(function (date) {
	            return this.renderMonth(props, date);
	        }, this);
	        var len = days.length;
	        var buckets = [];
	        var bucketsLen = Math.ceil(len / 4);

	        var i = 0;

	        for (; i < bucketsLen; i++) {
	            buckets.push(nodes.slice(i * 4, (i + 1) * 4));
	        }

	        return buckets.map(function (bucket, i) {
	            return React.createElement('div', { key: "row" + i, className: 'dp-row' }, bucket);
	        });
	    },

	    renderMonth: function renderMonth(props, date) {
	        var monthText = FORMAT.month(date, props.monthFormat);
	        var classes = ["dp-cell dp-month"];

	        var dateTimestamp = +date;

	        if (props.range) {
	            var start = date;
	            var end = moment(start).endOf('month');

	            var _props$range = _slicedToArray(props.range, 2);

	            var rangeStart = _props$range[0];
	            var rangeEnd = _props$range[1];

	            if (isInRange(start, props.range) || isInRange(end, props.range) || rangeStart && isInRange(rangeStart, [start, end]) || rangeEnd && isInRange(rangeEnd, [start, end])) {
	                classes.push('dp-in-range');
	            }
	        }

	        if (dateTimestamp == props.moment) {
	            classes.push('dp-value');
	        }
	        var onClick = this.handleClick.bind(this, props, date);

	        return React.createElement('div', {
	            tabIndex: '1',
	            role: 'link',
	            key: monthText,
	            className: classes.join(' '),
	            onClick: onClick,
	            onKeyUp: onEnter(onClick)
	        }, monthText);
	    },

	    handleClick: function handleClick(props, date, event) {
	        event.target.value = date;(props.onSelect || emptyFn)(date, event);
	    }
	});

	YearView.getHeaderText = function (moment, props) {
	    return toMoment(moment, null, { locale: props.locale }).format('YYYY');
	};

	module.exports = YearView;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = (function () {
	    function sliceIterator(arr, i) {
	        var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	                _arr.push(_s.value);if (i && _arr.length === i) break;
	            }
	        } catch (err) {
	            _d = true;_e = err;
	        } finally {
	            try {
	                if (!_n && _i['return']) _i['return']();
	            } finally {
	                if (_d) throw _e;
	            }
	        }return _arr;
	    }return function (arr, i) {
	        if (Array.isArray(arr)) {
	            return arr;
	        } else if (Symbol.iterator in Object(arr)) {
	            return sliceIterator(arr, i);
	        } else {
	            throw new TypeError('Invalid attempt to destructure non-iterable instance');
	        }
	    };
	})();

	var React = __webpack_require__(1);
	var moment = __webpack_require__(2);
	var assign = __webpack_require__(3);

	var FORMAT = __webpack_require__(8);
	var asConfig = __webpack_require__(4);
	var toMoment = __webpack_require__(9);
	var onEnter = __webpack_require__(10);
	var assign = __webpack_require__(3);

	var isInRange = __webpack_require__(11);

	var TODAY;

	function emptyFn() {}

	var DecadeView = React.createClass({

	    displayName: 'DecadeView',

	    getDefaultProps: function getDefaultProps() {
	        return asConfig();
	    },

	    /**
	     * Returns all the years in the decade of the given value
	     *
	     * @param  {Moment/Date/Number} value
	     * @return {Moment[]}
	     */
	    getYearsInDecade: function getYearsInDecade(value) {
	        var year = moment(value).get('year');
	        var offset = year % 10;

	        year = year - offset - 1;

	        var result = [];
	        var i = 0;

	        var start = moment(year, 'YYYY').startOf('year');

	        for (; i < 12; i++) {
	            result.push(moment(start));
	            start.add(1, 'year');
	        }

	        return result;
	    },

	    render: function render() {

	        TODAY = +moment().startOf('day');

	        var props = assign({}, this.props);

	        var viewMoment = props.viewMoment = moment(this.props.viewDate);

	        if (!this.props.range) {
	            props.moment = moment(props.date).startOf('year');
	        }

	        var yearsInView = this.getYearsInDecade(viewMoment);

	        return React.createElement('div', { className: 'dp-table dp-decade-view' }, this.renderYears(props, yearsInView));
	    },

	    /**
	     * Render the given array of days
	     * @param  {Moment[]} days
	     * @return {React.DOM}
	     */
	    renderYears: function renderYears(props, days) {
	        var nodes = days.map(function (date, index, arr) {
	            return this.renderYear(props, date, index, arr);
	        }, this);
	        var len = days.length;
	        var buckets = [];
	        var bucketsLen = Math.ceil(len / 4);

	        var i = 0;

	        for (; i < bucketsLen; i++) {
	            buckets.push(nodes.slice(i * 4, (i + 1) * 4));
	        }

	        return buckets.map(function (bucket, i) {
	            return React.createElement('div', { key: "row" + i, className: 'dp-row' }, bucket);
	        });
	    },

	    renderYear: function renderYear(props, date, index, arr) {
	        var yearText = FORMAT.year(date, props.yearFormat);
	        var classes = ["dp-cell dp-year"];

	        var dateTimestamp = +date;

	        if (props.range) {
	            var start = date;
	            var end = moment(start).endOf('year');

	            var _props$range = _slicedToArray(props.range, 2);

	            var rangeStart = _props$range[0];
	            var rangeEnd = _props$range[1];

	            if (isInRange(start, props.range) || isInRange(end, props.range) || rangeStart && isInRange(rangeStart, [start, end]) || rangeEnd && isInRange(rangeEnd, [start, end])) {
	                classes.push('dp-in-range');
	            }
	        }

	        if (dateTimestamp == props.moment && !props.range) {
	            classes.push('dp-value');
	        }

	        if (!index) {
	            classes.push('dp-prev');
	        }

	        if (index == arr.length - 1) {
	            classes.push('dp-next');
	        }

	        var onClick = this.handleClick.bind(this, props, date);

	        return React.createElement('div', {
	            role: 'link',
	            tabIndex: '1',
	            key: yearText,
	            className: classes.join(' '),
	            onClick: onClick,
	            onKeyUp: onEnter(onClick)
	        }, yearText);
	    },

	    handleClick: function handleClick(props, date, event) {
	        event.target.value = date;(props.onSelect || emptyFn)(date, event);
	    }
	});

	DecadeView.getHeaderText = function (value, props) {
	    var year = moment(value).get('year');
	    var offset = year % 10;

	    year = year - offset - 1;

	    return year + ' - ' + (year + 11);
	};

	module.exports = DecadeView;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var P = React.PropTypes;
	var onEnter = __webpack_require__(10);

	module.exports = React.createClass({

	  displayName: 'DatePickerHeader',

	  propTypes: {
	    onChange: P.func,
	    onPrev: P.func,
	    onNext: P.func,
	    colspan: P.number,
	    children: P.node
	  },

	  render: function render() {

	    var props = this.props;

	    return React.createElement('div', { className: 'dp-header' }, React.createElement('div', { className: 'dp-nav-table' }, React.createElement('div', { className: 'dp-row' }, React.createElement('div', {
	      tabIndex: '1',
	      role: 'link',
	      className: 'dp-prev-nav dp-nav-cell dp-cell',
	      onClick: props.onPrev,
	      onKeyUp: onEnter(props.onPrev)
	    }, props.prevText), React.createElement('div', {
	      tabIndex: '1',
	      role: 'link',
	      className: 'dp-nav-view dp-cell',
	      colSpan: props.colspan,
	      onClick: props.onChange,
	      onKeyUp: onEnter(props.onChange)
	    }, props.children), React.createElement('div', {
	      tabIndex: '1',
	      role: 'link',
	      className: 'dp-next-nav dp-nav-cell dp-cell',
	      onClick: props.onNext,
	      onKeyUp: onEnter(props.onNext)
	    }, props.nextText))));
	  }

	});

/***/ }
/******/ ])
});
;