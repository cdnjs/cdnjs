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

	var React = __webpack_require__(1);

	var moment = __webpack_require__(2);
	var assign = __webpack_require__(3);
	var asConfig = __webpack_require__(4);

	var MonthView = __webpack_require__(7);
	var YearView = __webpack_require__(10);
	var DecadeView = __webpack_require__(11);
	var Header = __webpack_require__(12);

	var toMoment = __webpack_require__(9);

	var hasOwn = function hasOwn(obj, key) {
	    return Object.prototype.hasOwnProperty.call(obj, key);
	};

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
	            navOnDateClick: true,
	            defaultStyle: {
	                boxSizing: 'border-box'
	            }
	        });

	        delete props.viewDate;
	        delete props.date;

	        return props;
	    },

	    getInitialState: function getInitialState() {
	        return {
	            view: this.props.defaultView,
	            viewDate: this.props.defaultViewDate,
	            defaultDate: this.props.defaultDate
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

	    render: function render() {

	        var props = assign({}, this.props);

	        this.toMoment = function (value, dateFormat) {
	            return toMoment(value, dateFormat || props.dateFormat, { locale: props.locale });
	        };

	        var view = this.getViewFactory();

	        props.date = this.getDate();

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

	        viewProps.dateString = dateString;
	        viewProps.localeData = props.localeData;
	        viewProps.onSelect = this.handleSelect;
	        viewProps.onChange = this.handleChange;

	        return React.createElement('div', _extends({ className: className, style: props.style }, this.props), React.createElement('div', { className: 'dp-inner', style: { width: '100%', height: '100%' } }, this.renderHeader(view, props), React.createElement('div', { className: 'dp-body', style: { flex: 1 } }, React.createElement('div', { className: 'dp-anim-target' }, view(viewProps))), this.renderFooter(props)));
	    },

	    prepareStyle: function prepareStyle(props) {
	        var style = assign({}, props.defaultStyle, props.style);

	        return style;
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

	        return React.createElement('div', { className: 'dp-footer' }, React.createElement('div', { className: 'dp-footer-today', onClick: footerProps.gotoToday }, todayText), React.createElement('div', { className: 'dp-footer-selected', onClick: footerProps.gotoSelected }, gotoSelectedText));
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

	module.exports = DatePicker;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
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

	var React = __webpack_require__(1);
	var moment = __webpack_require__(2);
	var assign = __webpack_require__(3);

	var FORMAT = __webpack_require__(8);
	var asConfig = __webpack_require__(4);
	var toMoment = __webpack_require__(9);

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

	    getWeekStartMoment: function getWeekStartMoment(value) {
	        // var clone = moment(value).startOf('week')

	        var weekStartDay = this.weekStartDay;
	        var clone = this.toMoment(value).day(weekStartDay);

	        // debugger
	        if (weekStartDay != null) {}

	        // if (DEFAULT_WEEK_START_DAY != this.weekStartDay){
	        //     clone.add('days', this.weekStartDay - DEFAULT_WEEK_START_DAY)
	        // }

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
	        var start = this.getWeekStartMoment(first);
	        var result = [];
	        var i = 0;

	        if (first.add(-1, 'days').isBefore(start)) {
	            //make sure the last day of prev month is included
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
	            // debugger
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

	        props.minDate && (props.minDate = +this.toMoment(props.minDate, dateFormat));
	        props.maxDate && (props.maxDate = +this.toMoment(props.maxDate, dateFormat));

	        this.monthFirst = this.toMoment(viewMoment).startOf('month');
	        this.monthLast = this.toMoment(viewMoment).endOf('month');

	        if (props.date) {
	            props.moment = this.toMoment(props.date).startOf('day');
	        }

	        var daysInView = this.getDaysInMonth(viewMoment);

	        return React.createElement('table', { className: 'dp-table dp-month-view' }, React.createElement('tbody', null, this.renderWeekDayNames(), this.renderDays(props, daysInView)));
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

	        for (; i < bucketsLen; i++) {
	            buckets.push(nodes.slice(i * 7, (i + 1) * 7));
	        }

	        return buckets.map(function (bucket, i) {
	            return React.createElement('tr', { key: 'row' + i, className: 'dp-week dp-row' }, bucket);
	        });
	    },

	    renderDay: function renderDay(props, date) {
	        var dayText = FORMAT.day(date, props.dayFormat);
	        var classes = ['dp-cell dp-day'];

	        var dateTimestamp = +date;

	        if (dateTimestamp == TODAY) {
	            classes.push('dp-current');
	        } else if (dateTimestamp < this.monthFirst) {
	            classes.push('dp-prev');
	        } else if (dateTimestamp > this.monthLast) {
	            classes.push('dp-next');
	        }

	        if (props.minDate && date < props.minDate) {
	            classes.push('dp-disabled dp-before-min');
	        }
	        if (props.maxDate && date > props.maxDate) {
	            classes.push('dp-disabled dp-after-max');
	        }

	        if (dateTimestamp == props.moment) {
	            classes.push('dp-value');
	        }

	        var mom = this.toMoment(date);

	        var renderDayProps = {
	            key: dayText,
	            text: dayText,
	            date: mom,
	            moment: mom,
	            className: classes.join(' '),
	            style: {},
	            onClick: this.handleClick.bind(this, props, date, dateTimestamp),
	            children: dayText
	        };

	        if (typeof props.onRenderDay === 'function') {
	            renderDayProps = props.onRenderDay(renderDayProps);
	        }

	        var defaultRenderFunction = React.DOM.td;
	        var renderFunction = props.renderDay || defaultRenderFunction;

	        var result = renderFunction(renderDayProps);

	        if (result === undefined) {
	            result = defaultRenderFunction(renderDayProps);
	        }

	        return result;
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
	        var names = this.getWeekDayNames();

	        return React.createElement('tr', { className: 'dp-row dp-week-day-names' }, names.map(function (name) {
	            return React.createElement('td', { key: name, className: 'dp-cell dp-week-day-name' }, name);
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

	module.exports = MonthView;

	// debugger
	// clone.add(this.props.weekStartDay, 'days')

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var moment = __webpack_require__(2);

	var FORMAT = __webpack_require__(8);
	var asConfig = __webpack_require__(4);
	var toMoment = __webpack_require__(9);
	var assign = __webpack_require__(3);

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

	        if (props.date) {
	            props.moment = moment(props.date).startOf('month');
	        }

	        var monthsInView = this.getMonthsInYear(viewMoment);

	        return React.createElement('table', { className: 'dp-table dp-year-view' }, React.createElement('tbody', null, this.renderMonths(props, monthsInView)));
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
	            return React.createElement('tr', { key: 'row' + i }, bucket);
	        });
	    },

	    renderMonth: function renderMonth(props, date) {
	        var monthText = FORMAT.month(date, props.monthFormat);
	        var classes = ['dp-cell dp-month'];

	        var dateTimestamp = +date;

	        if (dateTimestamp == props.moment) {
	            classes.push('dp-value');
	        }

	        return React.createElement('td', { key: monthText, className: classes.join(' '), onClick: this.handleClick.bind(this, props, date) }, monthText);
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var moment = __webpack_require__(2);
	var assign = __webpack_require__(3);

	var FORMAT = __webpack_require__(8);
	var asConfig = __webpack_require__(4);
	var toMoment = __webpack_require__(9);
	var assign = __webpack_require__(3);

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

	        if (props.date) {
	            props.moment = moment(props.date).startOf('year');
	        }

	        var yearsInView = this.getYearsInDecade(viewMoment);

	        return React.createElement('table', { className: 'dp-table dp-decade-view' }, React.createElement('tbody', null, this.renderYears(props, yearsInView)));
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
	            return React.createElement('tr', { key: 'row' + i }, bucket);
	        });
	    },

	    renderYear: function renderYear(props, date, index, arr) {
	        var yearText = FORMAT.year(date, props.yearFormat);
	        var classes = ['dp-cell dp-year'];

	        var dateTimestamp = +date;

	        if (dateTimestamp == props.moment) {
	            classes.push('dp-value');
	        }

	        if (!index) {
	            classes.push('dp-prev');
	        }

	        if (index == arr.length - 1) {
	            classes.push('dp-next');
	        }

	        return React.createElement('td', { key: yearText, className: classes.join(' '), onClick: this.handleClick.bind(this, props, date) }, yearText);
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var P = React.PropTypes;

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

			return React.createElement('div', { className: 'dp-header' }, React.createElement('table', { className: 'dp-nav-table' }, React.createElement('tbody', null, React.createElement('tr', { className: 'dp-row' }, React.createElement('td', {
				className: 'dp-prev-nav dp-nav-cell dp-cell',
				onClick: props.onPrev
			}, props.prevText), React.createElement('td', {
				className: 'dp-nav-view dp-cell',
				colSpan: props.colspan,
				onClick: props.onChange
			}, props.children), React.createElement('td', {
				className: 'dp-next-nav dp-nav-cell dp-cell',
				onClick: props.onNext
			}, props.nextText)))));
		}

	});

/***/ }
/******/ ])
});
;