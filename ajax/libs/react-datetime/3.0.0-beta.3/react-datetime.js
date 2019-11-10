/*
react-datetime v3.0.0-beta.3
https://github.com/YouCanBookMe/react-datetime
MIT: https://github.com/YouCanBookMe/react-datetime/raw/master/LICENSE
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("moment"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "moment", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["Datetime"] = factory(require("React"), require("moment"), require("ReactDOM"));
	else
		root["Datetime"] = factory(root["React"], root["moment"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_23__) {
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

	var assign = __webpack_require__(1),
		PropTypes = __webpack_require__(2),
		createClass = __webpack_require__(9),
		moment = __webpack_require__(17),
		React = __webpack_require__(10),
		DaysView = __webpack_require__(18),
		MonthsView = __webpack_require__(19),
		YearsView = __webpack_require__(20),
		TimeView = __webpack_require__(21),
		onClickOutside = __webpack_require__(22).default
		;

	var viewModes = {
		YEARS: 'years',
		MONTHS: 'months',
		DAYS: 'days',
		TIME: 'time',
	};

	var TYPES = PropTypes;
	var nofn = function () {};
	var datetype = TYPES.oneOfType([ TYPES.instanceOf(moment), TYPES.instanceOf(Date), TYPES.string ]);
	var Datetime = createClass({
		displayName: 'DateTime',
		propTypes: {
			value: datetype,
			initialValue: datetype,
			initialViewDate: datetype,
			initialViewMode: TYPES.oneOf([viewModes.YEARS, viewModes.MONTHS, viewModes.DAYS, viewModes.TIME]),
			onOpen: TYPES.func,
			onClose: TYPES.func,
			onChange: TYPES.func,
			onNavigate: TYPES.func,
			onBeforeNavigate: TYPES.func,
			onNavigateBack: TYPES.func,
			onNavigateForward: TYPES.func,
			updateOnView: TYPES.string,
			locale: TYPES.string,
			utc: TYPES.bool,
			displayTimeZone: TYPES.string,
			input: TYPES.bool,
			dateFormat: TYPES.oneOfType([TYPES.string, TYPES.bool]),
			timeFormat: TYPES.oneOfType([TYPES.string, TYPES.bool]),
			inputProps: TYPES.object,
			timeConstraints: TYPES.object,
			isValidDate: TYPES.func,
			open: TYPES.bool,
			strictParsing: TYPES.bool,
			closeOnSelect: TYPES.bool,
			closeOnTab: TYPES.bool,
			renderView: TYPES.func,
			renderInput: TYPES.func,
			renderDay: TYPES.func,
			renderMonth: TYPES.func,
			renderYear: TYPES.func,
		},

		getDefaultProps: function () {
			return {
				onOpen: nofn,
				onClose: nofn,
				onCalendarOpen: nofn,
				onCalendarClose: nofn,
				onChange: nofn,
				onNavigate: nofn,
				onBeforeNavigate: function(next) { return next; }, 
				onNavigateBack: nofn,
				onNavigateForward: nofn,
				dateFormat: true,
				timeFormat: true,
				utc: false,
				className: '',
				input: true,
				inputProps: {},
				timeConstraints: {},
				isValidDate: function() { return true; },
				strictParsing: true,
				closeOnSelect: false,
				closeOnTab: true,
				closeOnClickOutside: true,
				renderView: function( viewType, renderCalendar ) {
					return renderCalendar();
				}
			};
		},

		getInitialState: function() {
			var props = this.props;
			var inputFormat = this.getFormat('datetime');
			var selectedDate = this.parseDate( props.value || props.initialValue, inputFormat );

			this.checkTZ( props );

			return {
				open: !props.input,
				currentView: props.initialViewMode || this.getInitialView( this.getFormat('date') ),
				viewDate: this.getInitialViewDate( props.initialViewDate, selectedDate, inputFormat ),
				selectedDate: selectedDate && selectedDate.isValid() ? selectedDate : undefined,
				inputValue: props.inputProps.value || 
					selectedDate && selectedDate.isValid() && selectedDate.format( inputFormat ) ||
					props.value && typeof props.value === 'string' && props.value ||
					props.initialValue && typeof props.initialValue === 'string' && props.initialValue ||
					''
			};
		},
		
		getInitialViewDate: function( propDate, selectedDate, format ) {
			var viewDate;
			if ( propDate ) {
				viewDate = this.parseDate( propDate, format );
				if ( viewDate && viewDate.isValid() ) {
					return viewDate;
				}
				else {
					this.log('The initialViewDated given "' + propDate + '" is not valid. Using current date instead.');
				}
			}
			else if ( selectedDate && selectedDate.isValid() ) {
				return selectedDate.clone();
			}
			return this.getInitialDate();
		},

		getInitialDate: function() {
			var m = this.localMoment();
			m.hour(0).minute(0).second(0).millisecond(0);
			return m;
		},

		getInitialView: function( dateFormat ) {
			if ( !dateFormat ) return viewModes.TIME;
			return this.getUpdateOn( dateFormat );
		},

		parseDate: function (date, dateFormat) {
			var parsedDate;

			if (date && typeof date === 'string')
				parsedDate = this.localMoment(date, dateFormat);
			else if (date)
				parsedDate = this.localMoment(date);

			if (parsedDate && !parsedDate.isValid())
				parsedDate = null;

			return parsedDate;
		},

		isOpen: function() {
			var open = !this.props.input || (this.props.open === undefined ? this.state.open : this.props.open);
			return open;
			// return !this.props.input || (this.props.open === undefined ? this.state.open : this.props.open);
		},

		getUpdateOn: function( dateFormat ) {
			if ( this.props.updateOnView ) {
				return this.props.updateOnView;
			}

			if ( dateFormat.match(/[lLD]/) ) {
				return viewModes.DAYS;
			}

			if ( dateFormat.indexOf('M') !== -1 ) {
				return viewModes.MONTHS;
			}

			if ( dateFormat.indexOf('Y') !== -1 ) {
				return viewModes.YEARS;
			}

			return viewModes.DAYS;
		},

		getLocaleData: function( props ) {
			var p = props || this.props;
			return this.localMoment( p.value || p.defaultValue || new Date() ).localeData();
		},

		getDateFormat: function( locale ) {
			var format = this.props.dateFormat;
			if ( format === true ) return locale.longDateFormat('L');
			if ( format ) return format;
			return '';
		},

		getTimeFormat: function( locale ) {
			var format = this.props.timeFormat;
			if ( format === true ) return locale.longDateFormat('LT');
			if ( format ) return format;
			return '';
		},

		getFormat: function( type ) {
			if ( type === 'date' ) {
				return this.getDateFormat( this.getLocaleData() );
			}
			else if ( type === 'time' ) {
				return this.getTimeFormat( this.getLocaleData() );
			}
			else if ( type === 'datetime' ) {
				var locale = this.getLocaleData();
				var dateFormat = this.getDateFormat( locale );
				var timeFormat = this.getTimeFormat( locale );
				return dateFormat && timeFormat ? dateFormat + ' ' + timeFormat : (dateFormat || timeFormat );
			}
		},

		onInputChange: function( e ) {
			var value = e.target === null ? e : e.target.value,
				localMoment = this.localMoment( value, this.getFormat('datetime') ),
				update = { inputValue: value }
				;

			if ( localMoment.isValid() ) {
				update.selectedDate = localMoment;
				update.viewDate = localMoment.clone().startOf('month');
			} else {
				update.selectedDate = null;
			}

			return this.setState( update, function() {
				return this.props.onChange( localMoment.isValid() ? localMoment : this.state.inputValue );
			});
		},

		onInputKey: function( e ) {
			if ( e.which === 9 && this.props.closeOnTab ) {
				this.closeCalendar();
			}
		},

		showView: function( view, date ) {
			var me = this;
			
			// this is a function bound to a click so we need a closure
			return function() {
				var nextView = me.props.onBeforeNavigate( view, me.state.currentView, (date || me.state.viewDate).clone() );

				if ( nextView && me.state.currentView !== nextView ) {
					me.props.onNavigate( nextView );
					me.setState({ currentView: nextView });
				}
			};
		},

		updateTime: function( op, amount, type, toSelected ) {
			var update = {},
				date = toSelected ? 'selectedDate' : 'viewDate';

			update[ date ] = this.state[ date ].clone()[ op ]( amount, type );

			this.setState( update );
		},

		viewToMethod: {days: 'date', months: 'month', years: 'year'},
		nextView: { days: 'time', months: 'days', years: 'months'},
		updateDate: function( e ) {
			var state = this.state;
			var currentView = state.currentView;
			var updateOnView = this.getUpdateOn( this.getFormat('date') );
			var viewDate = this.state.viewDate.clone();

			// Set the value into day/month/year
			viewDate[ this.viewToMethod[currentView] ](
				parseInt( e.target.getAttribute('data-value'), 10 )
			);

			// Need to set month and year will for days view (prev/next month)
			if ( currentView === 'days' ) {
				viewDate.month( parseInt( e.target.getAttribute('data-month'), 10 ) );
				viewDate.year( parseInt( e.target.getAttribute('data-year'), 10 ) );
			}

			var update = {viewDate: viewDate};
			if ( currentView === updateOnView ) {
				update.selectedDate = viewDate.clone();
				update.inputValue = viewDate.format( this.getFormat('datetime') );

				if ( this.props.open === undefined && this.props.input && this.props.closeOnSelect ) {
					this.closeCalendar();
				}

				this.props.onChange( viewDate.clone() );
			}
			else {
				this.showView( this.nextView[ currentView ], viewDate )();
			}

			this.setState( update );
		},

		navigate: function( modifier, unit ) {
			var me  = this;

			// this is a function bound to a click so we need a closure
			return function() {
				var viewDate = me.state.viewDate.clone();
				var update = {
					viewDate: viewDate
				};
		
				// Subtracting is just adding negative time
				viewDate.add( modifier, unit );
				if ( modifier > 0 ) {
					me.props.onNavigateForward( modifier, unit );
				}
				else {
					me.props.onNavigateBack( -(modifier), unit );
				}
		
				me.setState( update );
			};
		},

		allowedSetTime: ['hours', 'minutes', 'seconds', 'milliseconds'],
		setTime: function( type, value ) {
			var state = this.state,
				date = (state.selectedDate || state.viewDate).clone()
			;
			
			date[ type ]( value );

			if ( !this.props.value ) {
				this.setState({
					selectedDate: date,
					viewDate: date.clone(),
					inputValue: date.format( this.getFormat('datetime') )
				});
			}
			this.props.onChange( date.clone() );
		},

		openCalendar: function( e ) {
			if ( !this.isOpen() ) {
				this.setState({ open: true }, function() {
					this.props.onOpen( e );
				});
			}
		},

		closeCalendar: function() {
			this.setState({ open: false }, function () {
				this.props.onClose( this.state.selectedDate || this.state.inputValue );
			});
		},

		handleClickOutside: function() {
			var props = this.props;

			if ( props.input && this.state.open && props.open === undefined && props.closeOnClickOutside ) {
				this.closeCalendar();
			}
		},

		localMoment: function( date, format, props ) {
			props = props || this.props;
			var m = null;

			if (props.utc) {
				m = moment.utc(date, format, props.strictParsing);
			} else if (props.displayTimeZone) {
				m = moment.tz(date, format, props.displayTimeZone);
			} else {
				m = moment(date, format, props.strictParsing);
			}

			if ( props.locale )
				m.locale( props.locale );
			return m;
		},

		checkTZ: function( props ) {
			if ( props.displayTimeZone && !this.tzWarning && !moment.tz ) {
				this.tzWarning = true;
				this.log('displayTimeZone prop with value "' + props.displayTimeZone +  '" is used but moment.js timezone is not loaded.', 'error');
			}
		},

		overrideEvent: function( handler, action ) {
			if ( !this.overridenEvents ) {
				this.overridenEvents = {};
			}

			if ( !this.overridenEvents[handler] ) {
				var me = this;
				this.overridenEvents[handler] = function( e ) {
					var result;
					if ( me.props.inputProps && me.props.inputProps[handler] ) {
						result = me.props.inputProps[handler]( e );
					}
					if ( result !== false ) {
						action( e );
					}
				};
			}

			return this.overridenEvents[handler];
		},

		getClassName: function() {
			var cn = 'rdt';
			var props = this.props;
			var propCn = props.className;

			if ( Array.isArray( propCn ) ) {
				cn += ' ' + propCn.join(' ');
			}
			else if ( propCn ) {
				cn += ' ' + propCn;
			}

			if ( !props.input ) {
				cn += ' rdtStatic';
			}
			if ( this.isOpen() ) {
				cn += ' rdtOpen';
			}

			return cn;
		},

		componentDidUpdate: function( prevProps ) {
			if ( prevProps === this.props ) return;

			var needsUpdate = false;
			var thisProps = this.props;
			['locale', 'utc', 'displayZone', 'dateFormat', 'timeFormat'].forEach( function(p) {
				prevProps[p] !== thisProps[p] && (needsUpdate = true);
			});

			if ( needsUpdate ) {
				this.regenerateDates( this.props );
			}

			this.checkTZ( this.props );
		},

		regenerateDates: function(props) {
			var viewDate = this.state.viewDate.clone();
			var selectedDate = this.state.selectedDate && this.state.selectedDate.clone();

			if ( props.locale ) {
				viewDate.locale( props.locale );
				selectedDate &&	selectedDate.locale( props.locale );
			}
			if ( props.utc ) {
				viewDate.utc();
				selectedDate &&	selectedDate.utc();
			}
			else if ( props.displayTimeZone ) {
				viewDate.tz( props.displayTimeZone );
				selectedDate &&	selectedDate.tz( props.displayTimeZone );
			}
			else {
				viewDate.locale();
				selectedDate &&	selectedDate.locale();
			}

			var update = { viewDate: viewDate, selectedDate: selectedDate};
			if ( selectedDate && selectedDate.isValid() ) {
				update.inputValue = selectedDate.format( this.getFormat('datetime') );
			}
			
			this.setState( update );
		},

		getSelectedDate: function() {
			if ( this.props.value === undefined ) return this.state.selectedDate;
			var selectedDate = this.parseDate( this.props.value, this.getFormat('datetime') );
			return selectedDate && selectedDate.isValid() ? selectedDate : false;
		},

		getInputValue: function() {
			var selectedDate = this.getSelectedDate();
			return selectedDate ? selectedDate.format( this.getFormat('datetime') ) : this.state.inputValue;
		},

		/**
		 * Set the date that is currently shown in the calendar. This is independent from the selected date and it's the one used to navigate through months or days in the calendar.
		 * @param dateType date
		 * @public
		 */
		setViewDate: function( date ) {
			var me = this;
			var logError = function() {
				return me.log( 'Invalid date passed to the `setViewDate` method: ' + date );
			};

			if ( !date ) return logError();
			
			var viewDate;
			if ( typeof date === 'string' ) {
				viewDate = this.localMoment(date, this.getFormat('datetime') );
			}
			else {
				viewDate = this.localMoment( date );
			}

			if ( !viewDate || !viewDate.isValid() ) return logError();
			this.setState({ viewDate: viewDate });
		},

		/**
		 * Set the view currently shown by the calendar. View modes shipped with react-datetime are 'years', 'months', 'days' and 'time'.
		 * @param TYPES.string mode 
		 */
		setViewMode: function( mode ) {
			this.showView( mode )();
		},

		log: function( message, method ) {
			var con = console;
			if ( !method ) {
				method = 'warn';
			}
			con[ method ]( '***react-datetime:' + message );
		},

		render: function() {
			var cn = this.getClassName();
			var children = [];

			if ( this.props.input ) {
				var finalInputProps = assign(
					{ type: 'text', className: 'form-control', value: this.getInputValue() },
					this.props.inputProps,
					{
						onFocus: this.overrideEvent( 'onOpen', this.openCalendar ),
						onChange: this.overrideEvent( 'onChange', this.onInputChange ),
						onKeyDown: this.overrideEvent( 'onKeyDown', this.onInputKey ),
					}
				);

				if ( this.props.renderInput ) {
					children = [ React.createElement('div', { key: 'i' }, this.props.renderInput( finalInputProps, this.openCalendar, this.closeCalendar )) ];
				} else {
					children = [ React.createElement('input', assign({ key: 'i' }, finalInputProps ))];
				}
			}

			return React.createElement( ClickableWrapper, {className: cn, onClickOut: this.handleClickOutside}, children.concat(
				React.createElement( 'div',
					{ key: 'dt', className: 'rdtPicker' },
					this.props.renderView(  this.state.currentView, this.renderCalendar.bind( this, this.state.currentView ) )
				)
			));
		},

		renderCalendar: function( currentView ) {
			var p = this.props;
			var state = this.state;

			var props = {
				viewDate: state.viewDate.clone(),
				selectedDate: this.getSelectedDate(),
				isValidDate: p.isValidDate,
				updateDate: this.updateDate,
				navigate: this.navigate,
				showView: this.showView
			};

			// I think updateOn, updateSelectedDate and setDate can be merged in the same method
			// that would update viewDate or selectedDate depending on the view and the dateFormat
			if ( currentView === viewModes.YEARS ) {
				// Used props
				// { viewDate, selectedDate, renderYear, isValidDate, navigate, showView, updateDate }
				props.renderYear = p.renderYear;
				return React.createElement( YearsView, props );
			}
			else if ( currentView === viewModes.MONTHS ) {
				// { viewDate, selectedDate, renderMonth, isValidDate, navigate, showView, updateDate }
				props.renderMonth = p.renderMonth;
				return React.createElement( MonthsView, props );
			}
			else if ( currentView === viewModes.DAYS ) {
				// { viewDate, selectedDate, renderDay, isValidDate, navigate, showView, updateDate, timeFormat }
				props.renderDay = p.renderDay;
				props.timeFormat = this.getFormat('time');
				return React.createElement( DaysView, props );
			}
			else if ( currentView === viewModes.TIME ) {
				// { viewDate, selectedDate, timeFormat, dateFormat, timeConstraints, setTime, showView }
				props.dateFormat = this.getFormat('date');
				props.timeFormat = this.getFormat('time');
				props.timeConstraints = p.timeConstraints;
				props.setTime = this.setTime;
				return React.createElement( TimeView, props );
			}
		}
	});

	var ClickableWrapper = onClickOutside( createClass({
		render: function() {
			return React.createElement( 'div', { className: this.props.className }, this.props.children );
		},
		handleClickOutside: function( e ) {
			this.props.onClickOut( e );
		}
	}));

	// Make moment accessible through the Datetime class
	Datetime.moment = moment;

	module.exports = Datetime;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function ownEnumerableKeys(obj) {
		var keys = Object.getOwnPropertyNames(obj);

		if (Object.getOwnPropertySymbols) {
			keys = keys.concat(Object.getOwnPropertySymbols(obj));
		}

		return keys.filter(function (key) {
			return propIsEnumerable.call(obj, key);
		});
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = ownEnumerableKeys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
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
	  module.exports = __webpack_require__(4)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(8)();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var assign = __webpack_require__(5);

	var ReactPropTypesSecret = __webpack_require__(6);
	var checkPropTypes = __webpack_require__(7);

	var printWarning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error(
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            printWarning(
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning(
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
	        );
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
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

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var printWarning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  var ReactPropTypesSecret = __webpack_require__(6);
	  var loggedTypeFailures = {};

	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error(
	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
	            );
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning(
	            (componentName || 'React class') + ': type specification of ' +
	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
	            'You may have forgotten to pass an argument to the type checker ' +
	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
	            'shape all require an argument).'
	          )

	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          printWarning(
	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
	          );
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = __webpack_require__(6);

	function emptyFunction() {}

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
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
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var React = __webpack_require__(10);
	var factory = __webpack_require__(11);

	if (typeof React === 'undefined') {
	  throw Error(
	    'create-react-class could not find the React object. If you are using script tags, ' +
	      'make sure that React is being loaded before create-react-class.'
	  );
	}

	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React.Component().updater;

	module.exports = factory(
	  React.Component,
	  React.isValidElement,
	  ReactNoopUpdateQueue
	);


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(12);

	var emptyObject = __webpack_require__(13);
	var _invariant = __webpack_require__(14);

	if (process.env.NODE_ENV !== 'production') {
	  var warning = __webpack_require__(15);
	}

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	var ReactPropTypeLocationNames;
	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}

	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */

	  var injectedMixins = [];

	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */
	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',

	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',

	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',

	    // ==== Definition methods ====

	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',

	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',

	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',

	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',

	    // ==== Delegate methods ====

	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',

	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',

	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',

	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillMount`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillMount: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillReceiveProps`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillUpdate`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillUpdate: 'DEFINE_MANY',

	    // ==== Advanced methods ====

	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };

	  /**
	   * Similar to ReactClassInterface but for static methods.
	   */
	  var ReactClassStaticInterface = {
	    /**
	     * This method is invoked after a component is instantiated and when it
	     * receives new props. Return an object to update state in response to
	     * prop changes. Return null to indicate no change to state.
	     *
	     * If an object is returned, its keys will be merged into the existing state.
	     *
	     * @return {object || null}
	     * @optional
	     */
	    getDerivedStateFromProps: 'DEFINE_MANY_MERGED'
	  };

	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */
	  var RESERVED_SPEC_KEYS = {
	    displayName: function(Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function(Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function(Constructor, childContextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign(
	        {},
	        Constructor.childContextTypes,
	        childContextTypes
	      );
	    },
	    contextTypes: function(Constructor, contextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign(
	        {},
	        Constructor.contextTypes,
	        contextTypes
	      );
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function(Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(
	          Constructor.getDefaultProps,
	          getDefaultProps
	        );
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function(Constructor, propTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function(Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function() {}
	  };

	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            typeof typeDef[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	              'React.PropTypes.',
	            Constructor.displayName || 'ReactClass',
	            ReactPropTypeLocationNames[location],
	            propName
	          );
	        }
	      }
	    }
	  }

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name)
	      ? ReactClassInterface[name]
	      : null;

	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(
	        specPolicy === 'OVERRIDE_BASE',
	        'ReactClassInterface: You are attempting to override ' +
	          '`%s` from your class specification. Ensure that your method names ' +
	          'do not overlap with React methods.',
	        name
	      );
	    }

	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(
	        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
	        'ReactClassInterface: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be due ' +
	          'to a mixin.',
	        name
	      );
	    }
	  }

	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (process.env.NODE_ENV !== 'production') {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;

	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            isMixinValid,
	            "%s: You're attempting to include a mixin that is either null " +
	              'or not an object. Check the mixins included by the component, ' +
	              'as well as any mixins they include themselves. ' +
	              'Expected object but got %s.',
	            Constructor.displayName || 'ReactClass',
	            spec === null ? null : typeofSpec
	          );
	        }
	      }

	      return;
	    }

	    _invariant(
	      typeof spec !== 'function',
	      "ReactClass: You're attempting to " +
	        'use a component class or function as a mixin. Instead, just use a ' +
	        'regular object.'
	    );
	    _invariant(
	      !isValidElement(spec),
	      "ReactClass: You're attempting to " +
	        'use a component as a mixin. Instead, just use a regular object.'
	    );

	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;

	    // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.
	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }

	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }

	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }

	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);

	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind =
	          isFunction &&
	          !isReactClassMethod &&
	          !isAlreadyDefined &&
	          spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];

	            // These cases should already be caught by validateMethodOverride.
	            _invariant(
	              isReactClassMethod &&
	                (specPolicy === 'DEFINE_MANY_MERGED' ||
	                  specPolicy === 'DEFINE_MANY'),
	              'ReactClass: Unexpected spec policy %s for key %s ' +
	                'when mixing in component specs.',
	              specPolicy,
	              name
	            );

	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (process.env.NODE_ENV !== 'production') {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
	          }
	        }
	      }
	    }
	  }

	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }

	    for (var name in statics) {
	      var property = statics[name];
	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }

	      var isReserved = name in RESERVED_SPEC_KEYS;
	      _invariant(
	        !isReserved,
	        'ReactClass: You are attempting to define a reserved ' +
	          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	          'as an instance property instead; it will still be accessible on the ' +
	          'constructor.',
	        name
	      );

	      var isAlreadyDefined = name in Constructor;
	      if (isAlreadyDefined) {
	        var specPolicy = ReactClassStaticInterface.hasOwnProperty(name)
	          ? ReactClassStaticInterface[name]
	          : null;

	        _invariant(
	          specPolicy === 'DEFINE_MANY_MERGED',
	          'ReactClass: You are attempting to define ' +
	            '`%s` on your component more than once. This conflict may be ' +
	            'due to a mixin.',
	          name
	        );

	        Constructor[name] = createMergedResultFunction(Constructor[name], property);

	        return;
	      }

	      Constructor[name] = property;
	    }
	  }

	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */
	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(
	      one && two && typeof one === 'object' && typeof two === 'object',
	      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	    );

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(
	          one[key] === undefined,
	          'mergeIntoWithNoDuplicateKeys(): ' +
	            'Tried to merge two objects with the same key: `%s`. This conflict ' +
	            'may be due to a mixin; in particular, this may be caused by two ' +
	            'getInitialState() or getDefaultProps() methods returning objects ' +
	            'with clashing keys.',
	          key
	        );
	        one[key] = two[key];
	      }
	    }
	    return one;
	  }

	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);
	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }
	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }

	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }

	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */
	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);
	    if (process.env.NODE_ENV !== 'production') {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis) {
	        for (
	          var _len = arguments.length,
	            args = Array(_len > 1 ? _len - 1 : 0),
	            _key = 1;
	          _key < _len;
	          _key++
	        ) {
	          args[_key - 1] = arguments[_key];
	        }

	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): React component methods may only be bound to the ' +
	                'component instance. See %s',
	              componentName
	            );
	          }
	        } else if (!args.length) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): You are binding a component method to the component. ' +
	                'React does this for you automatically in a high-performance ' +
	                'way, so you can safely remove this call. See %s',
	              componentName
	            );
	          }
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }

	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */
	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;
	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }

	  var IsMountedPreMixin = {
	    componentDidMount: function() {
	      this.__isMounted = true;
	    }
	  };

	  var IsMountedPostMixin = {
	    componentWillUnmount: function() {
	      this.__isMounted = false;
	    }
	  };

	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function() {
	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this.__didWarnIsMounted,
	          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
	            'subscriptions and pending requests in componentWillUnmount to ' +
	            'prevent memory leaks.',
	          (this.constructor && this.constructor.displayName) ||
	            this.name ||
	            'Component'
	        );
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function() {};
	  _assign(
	    ReactClassComponent.prototype,
	    ReactComponent.prototype,
	    ReactClassMixin
	  );

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function(props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	            'JSX instead. See: https://fb.me/react-legacyfactory'
	        );
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (
	          initialState === undefined &&
	          this.getInitialState._isMockFunction
	        ) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      );

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    _invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    );

	    if (process.env.NODE_ENV !== 'production') {
	      warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.componentWillRecieveProps,
	        '%s has a method called ' +
	          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.UNSAFE_componentWillRecieveProps,
	        '%s has a method called UNSAFE_componentWillRecieveProps(). ' +
	          'Did you mean UNSAFE_componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  }

	  return createClass;
	}

	module.exports = factory;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
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

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
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

	if (process.env.NODE_ENV !== 'production') {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(16);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
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
/* 17 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(10),
		createClass = __webpack_require__(9),
		moment = __webpack_require__(17)
		;

	var DateTimePickerDays = createClass({
		render: function() {
			var footer = this.renderFooter(),
				date = this.props.viewDate,
				locale = date.localeData(),
				tableChildren
				;

			tableChildren = [
				React.createElement('thead', { key: 'th' }, [
					React.createElement('tr', { key: 'h' }, [
						React.createElement('th', { key: 'p', className: 'rdtPrev', onClick: this.props.navigate( -1, 'months' )}, React.createElement('span', {}, '‹' )),
						React.createElement('th', { key: 's', className: 'rdtSwitch', onClick: this.props.showView( 'months' ), colSpan: 5, 'data-value': this.props.viewDate.month() }, locale.months( date ) + ' ' + date.year() ),
						React.createElement('th', { key: 'n', className: 'rdtNext', onClick: this.props.navigate( 1, 'months' )}, React.createElement('span', {}, '›' ))
					]),
					React.createElement('tr', { key: 'd'}, this.getDaysOfWeek( locale ).map( function( day, index ) { return React.createElement('th', { key: day + index, className: 'dow'}, day ); }) )
				]),
				React.createElement('tbody', { key: 'tb' }, this.renderDays())
			];

			if ( footer )
				tableChildren.push( footer );

			return React.createElement('div', { className: 'rdtDays' },
				React.createElement('table', {}, tableChildren )
			);
		},

		/**
		 * Get a list of the days of the week
		 * depending on the current locale
		 * @return {array} A list with the shortname of the days
		 */
		getDaysOfWeek: function( locale ) {
			var days = locale._weekdaysMin,
				first = locale.firstDayOfWeek(),
				dow = [],
				i = 0
				;

			days.forEach( function( day ) {
				dow[ (7 + ( i++ ) - first) % 7 ] = day;
			});

			return dow;
		},

		renderDays: function() {
			var date = this.props.viewDate,
				selected = this.props.selectedDate && this.props.selectedDate.clone(),
				prevMonth = date.clone().subtract( 1, 'months' ),
				currentYear = date.year(),
				currentMonth = date.month(),
				weeks = [],
				days = [],
				renderer = this.props.renderDay || this.renderDay,
				isValid = this.props.isValidDate || this.alwaysValidDate,
				classes, isDisabled, dayProps, currentDate
				;

			// Go to the last week of the previous month
			prevMonth.date( prevMonth.daysInMonth() ).startOf( 'week' );
			var lastDay = prevMonth.clone().add( 42, 'd' );

			while ( prevMonth.isBefore( lastDay ) ) {
				classes = 'rdtDay';
				currentDate = prevMonth.clone();
				
				dayProps = {
					key: prevMonth.format( 'M_D' ),
					'data-value': prevMonth.date(),
					'data-month': currentMonth,
					'data-year': currentYear
				};

				if ( ( prevMonth.year() === currentYear && prevMonth.month() < currentMonth ) || ( prevMonth.year() < currentYear ) ){
					classes += ' rdtOld';
					dayProps['data-month'] = prevMonth.month();
					dayProps['data-year'] = prevMonth.year();
				}
				else if ( ( prevMonth.year() === currentYear && prevMonth.month() > currentMonth ) || ( prevMonth.year() > currentYear ) ){
					classes += ' rdtNew';
					dayProps['data-month'] = prevMonth.month();
					dayProps['data-year'] = prevMonth.year();
				}

				if ( selected && prevMonth.isSame( selected, 'day' ) )
					classes += ' rdtActive';

				if ( prevMonth.isSame( moment(), 'day' ) )
					classes += ' rdtToday';

				isDisabled = !isValid( currentDate, selected );
				if ( isDisabled )
					classes += ' rdtDisabled';

				dayProps.className = classes;

				if ( !isDisabled )
					dayProps.onClick = this.updateSelectedDate;

				days.push( renderer( dayProps, currentDate, selected ) );

				if ( days.length === 7 ) {
					weeks.push( React.createElement('tr', { key: prevMonth.format( 'M_D' )}, days ) );
					days = [];
				}

				prevMonth.add( 1, 'd' );
			}

			return weeks;
		},

		updateSelectedDate: function( event ) {
			this.props.updateDate( event );
		},

		renderDay: function( props, currentDate ) {
			return React.createElement('td',  props, currentDate.date() );
		},

		renderFooter: function() {
			if ( !this.props.timeFormat )
				return '';

			var date = this.props.selectedDate || this.props.viewDate;

			return React.createElement('tfoot', { key: 'tf'},
				React.createElement('tr', {},
					React.createElement('td', { onClick: this.props.showView( 'time' ), colSpan: 7, className: 'rdtTimeToggle' }, date.format( this.props.timeFormat ))
				)
			);
		},

		alwaysValidDate: function() {
			return 1;
		}
	});

	module.exports = DateTimePickerDays;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(10),
		createClass = __webpack_require__(9)
	;

	var DateTimePickerMonths = createClass({
		render: function() {
			return React.createElement('div', { className: 'rdtMonths' }, [
				React.createElement('table', { key: 'a' }, React.createElement('thead', {}, React.createElement('tr', {}, [
					React.createElement('th', { key: 'prev', className: 'rdtPrev', onClick: this.props.navigate( -1, 'years' )}, React.createElement('span', {}, '‹' )),
					React.createElement('th', { key: 'year', className: 'rdtSwitch', onClick: this.props.showView( 'years' ), colSpan: 2, 'data-value': this.props.viewDate.year() }, this.props.viewDate.year() ),
					React.createElement('th', { key: 'next', className: 'rdtNext', onClick: this.props.navigate( 1, 'years' )}, React.createElement('span', {}, '›' ))
				]))),
				React.createElement('table', { key: 'months' }, React.createElement('tbody', { key: 'b' }, this.renderMonths()))
			]);
		},

		renderMonths: function() {
			var date = this.props.selectedDate,
				month = this.props.viewDate.month(),
				year = this.props.viewDate.year(),
				rows = [],
				i = 0,
				months = [],
				renderer = this.props.renderMonth || this.renderMonth,
				isValid = this.props.isValidDate || this.alwaysValidDate,
				classes, props, currentMonth, isDisabled, noOfDaysInMonth, daysInMonth, validDay,
				// Date is irrelevant because we're only interested in month
				irrelevantDate = 1
				;

			while (i < 12) {
				classes = 'rdtMonth';
				currentMonth =
					this.props.viewDate.clone().set({ year: year, month: i, date: irrelevantDate });

				noOfDaysInMonth = currentMonth.endOf( 'month' ).format( 'D' );
				daysInMonth = Array.from({ length: noOfDaysInMonth }, function( e, i ) {
					return i + 1;
				});

				validDay = daysInMonth.find(function( d ) {
					var day = currentMonth.clone().set( 'date', d );
					return isValid( day );
				});

				isDisabled = ( validDay === undefined );

				if ( isDisabled )
					classes += ' rdtDisabled';

				if ( date && i === date.month() && year === date.year() )
					classes += ' rdtActive';

				props = {
					key: i,
					'data-value': i,
					className: classes
				};

				if ( !isDisabled )
					props.onClick = this.updateSelectedMonth;

				months.push( renderer( props, i, year, date && date.clone() ) );

				if ( months.length === 4 ) {
					rows.push( React.createElement('tr', { key: month + '_' + rows.length }, months ) );
					months = [];
				}

				i++;
			}

			return rows;
		},

		updateSelectedMonth: function( event ) {
			this.props.updateDate( event );
		},

		renderMonth: function( props, month ) {
			var localMoment = this.props.viewDate;
			var monthStr = localMoment.localeData().monthsShort( localMoment.month( month ) );
			var strLength = 3;
			// Because some months are up to 5 characters long, we want to
			// use a fixed string length for consistency
			var monthStrFixedLength = monthStr.substring( 0, strLength );
			return React.createElement('td', props, capitalize( monthStrFixedLength ) );
		},

		alwaysValidDate: function() {
			return 1;
		},
	});

	function capitalize( str ) {
		return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
	}

	module.exports = DateTimePickerMonths;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(10),
		createClass = __webpack_require__(9)
	;

	var DateTimePickerYears = createClass({
		render: function() {
			var year = parseInt( this.props.viewDate.year() / 10, 10 ) * 10;

			return React.createElement('div', { className: 'rdtYears' }, [
				React.createElement('table', { key: 'a' }, React.createElement('thead', {}, React.createElement('tr', {}, [
					React.createElement('th', { key: 'prev', className: 'rdtPrev', onClick: this.props.navigate( -10, 'years' )}, React.createElement('span', {}, '‹' )),
					React.createElement('th', { key: 'year', className: 'rdtSwitch', onClick: this.props.showView( 'years' ), colSpan: 2 }, year + '-' + ( year + 9 ) ),
					React.createElement('th', { key: 'next', className: 'rdtNext', onClick: this.props.navigate( 10, 'years' )}, React.createElement('span', {}, '›' ))
				]))),
				React.createElement('table', { key: 'years' }, React.createElement('tbody',  {}, this.renderYears( year )))
			]);
		},

		renderYears: function( year ) {
			var years = [],
				i = -1,
				rows = [],
				renderer = this.props.renderYear || this.renderYear,
				selectedDate = this.props.selectedDate,
				isValid = this.props.isValidDate || this.alwaysValidDate,
				classes, props, currentYear, isDisabled, noOfDaysInYear, daysInYear, validDay,
				// Month and date are irrelevant here because
				// we're only interested in the year
				irrelevantMonth = 0,
				irrelevantDate = 1
				;

			year--;
			while (i < 11) {
				classes = 'rdtYear';
				currentYear = this.props.viewDate.clone().set(
					{ year: year, month: irrelevantMonth, date: irrelevantDate } );

				// Not sure what 'rdtOld' is for, commenting out for now as it's not working properly
				// if ( i === -1 | i === 10 )
					// classes += ' rdtOld';

				noOfDaysInYear = currentYear.endOf( 'year' ).format( 'DDD' );
				daysInYear = Array.from({ length: noOfDaysInYear }, function( e, i ) {
					return i + 1;
				});

				validDay = daysInYear.find(function( d ) {
					var day = currentYear.clone().dayOfYear( d );
					return isValid( day );
				});

				isDisabled = ( validDay === undefined );

				if ( isDisabled )
					classes += ' rdtDisabled';

				if ( selectedDate && selectedDate.year() === year )
					classes += ' rdtActive';

				props = {
					key: year,
					'data-value': year,
					className: classes
				};

				if ( !isDisabled )
					props.onClick = this.updateSelectedYear;

				years.push( renderer( props, year, selectedDate && selectedDate.clone() ));

				if ( years.length === 4 ) {
					rows.push( React.createElement('tr', { key: i }, years ) );
					years = [];
				}

				year++;
				i++;
			}

			return rows;
		},

		updateSelectedYear: function( event ) {
			this.props.updateDate( event );
		},

		renderYear: function( props, year ) {
			return React.createElement('td',  props, year );
		},

		alwaysValidDate: function() {
			return 1;
		},
	});

	module.exports = DateTimePickerYears;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(10),
		createClass = __webpack_require__(9),
		assign = __webpack_require__(1)
		;

	var DateTimePickerTime = createClass({
		getInitialState: function() {
			return this.calculateState( this.props );
		},

		calculateState: function( props ) {
			var date = props.selectedDate || props.viewDate,
				format = props.timeFormat,
				counters = []
				;

			if ( format.toLowerCase().indexOf('h') !== -1 ) {
				counters.push('hours');
				if ( format.indexOf('m') !== -1 ) {
					counters.push('minutes');
					if ( format.indexOf('s') !== -1 ) {
						counters.push('seconds');
					}
				}
			}

			var hours = date.format( 'H' );

			var daypart = false;
			if ( this.state !== null && this.props.timeFormat.toLowerCase().indexOf( ' a' ) !== -1 ) {
				if ( this.props.timeFormat.indexOf( ' A' ) !== -1 ) {
					daypart = ( hours >= 12 ) ? 'PM' : 'AM';
				} else {
					daypart = ( hours >= 12 ) ? 'pm' : 'am';
				}
			}

			return {
				hours: hours,
				minutes: date.format( 'mm' ),
				seconds: date.format( 'ss' ),
				milliseconds: date.format( 'SSS' ),
				daypart: daypart,
				counters: counters
			};
		},

		renderCounter: function( type ) {
			if ( type !== 'daypart' ) {
				var value = this.state[ type ];
				if ( type === 'hours' && this.props.timeFormat.toLowerCase().indexOf( ' a' ) !== -1 ) {
					value = ( value - 1 ) % 12 + 1;

					if ( value === 0 ) {
						value = 12;
					}
				}
				return React.createElement('div', { key: type, className: 'rdtCounter' }, [
					React.createElement('span', { key: 'up', className: 'rdtBtn', onMouseDown: this.onStartClicking( 'increase', type ) }, '▲' ),
					React.createElement('div', { key: 'c', className: 'rdtCount' }, value ),
					React.createElement('span', { key: 'do', className: 'rdtBtn', onMouseDown: this.onStartClicking( 'decrease', type ) }, '▼' )
				]);
			}
			return '';
		},

		renderDayPart: function() {
			return React.createElement('div', { key: 'dayPart', className: 'rdtCounter' }, [
				React.createElement('span', { key: 'up', className: 'rdtBtn', onMouseDown: this.onStartClicking( 'toggleDayPart', 'hours') }, '▲' ),
				React.createElement('div', { key: this.state.daypart, className: 'rdtCount' }, this.state.daypart ),
				React.createElement('span', { key: 'do', className: 'rdtBtn', onMouseDown: this.onStartClicking( 'toggleDayPart', 'hours') }, '▼' )
			]);
		},

		render: function() {
			var me = this,
				counters = []
			;

			this.state.counters.forEach( function( c ) {
				if ( counters.length )
					counters.push( React.createElement('div', { key: 'sep' + counters.length, className: 'rdtCounterSeparator' }, ':' ) );
				counters.push( me.renderCounter( c ) );
			});

			if ( this.state.daypart !== false ) {
				counters.push( me.renderDayPart() );
			}

			if ( this.state.counters.length === 3 && this.props.timeFormat.indexOf( 'S' ) !== -1 ) {
				counters.push( React.createElement('div', { className: 'rdtCounterSeparator', key: 'sep5' }, ':' ) );
				counters.push(
					React.createElement('div', { className: 'rdtCounter rdtMilli', key: 'm' },
						React.createElement('input', { value: this.state.milliseconds, type: 'text', onChange: this.updateMilli } )
						)
					);
			}

			return React.createElement('div', { className: 'rdtTime' },
				React.createElement('table', {}, [
					this.renderHeader(),
					React.createElement('tbody', { key: 'b'}, React.createElement('tr', {}, React.createElement('td', {},
						React.createElement('div', { className: 'rdtCounters' }, counters )
					)))
				])
			);
		},

		componentWillMount: function() {
			var me = this;
			me.timeConstraints = {
				hours: {
					min: 0,
					max: 23,
					step: 1
				},
				minutes: {
					min: 0,
					max: 59,
					step: 1
				},
				seconds: {
					min: 0,
					max: 59,
					step: 1
				},
				milliseconds: {
					min: 0,
					max: 999,
					step: 1
				}
			};
			['hours', 'minutes', 'seconds', 'milliseconds'].forEach( function( type ) {
				assign(me.timeConstraints[ type ], me.props.timeConstraints[ type ]);
			});
			this.setState( this.calculateState( this.props ) );
		},

		componentWillReceiveProps: function( nextProps ) {
			this.setState( this.calculateState( nextProps ) );
		},

		updateMilli: function( e ) {
			var milli = parseInt( e.target.value, 10 );
			if ( milli === e.target.value && milli >= 0 && milli < 1000 ) {
				this.props.setTime( 'milliseconds', milli );
				this.setState( { milliseconds: milli } );
			}
		},

		renderHeader: function() {
			if ( !this.props.dateFormat )
				return null;

			var date = this.props.selectedDate || this.props.viewDate;
			return React.createElement('thead', { key: 'h' }, React.createElement('tr', {},
				React.createElement('th', { className: 'rdtSwitch', colSpan: 4, onClick: this.props.showView( 'days' ) }, date.format( this.props.dateFormat ) )
			));
		},

		onStartClicking: function( action, type ) {
			var me = this;

			return function( e ) {
				if ( e && e.button && e.button !== 0 ) {
					// Only left clicks, thanks
					return;
				}

				var update = {};
				update[ type ] = me[ action ]( type );
				me.setState( update );

				me.timer = setTimeout( function() {
					me.increaseTimer = setInterval( function() {
						update[ type ] = me[ action ]( type );
						me.setState( update );
					}, 70);
				}, 500);

				me.mouseUpListener = function() {
					clearTimeout( me.timer );
					clearInterval( me.increaseTimer );
					me.props.setTime( type, me.state[ type ] );
					document.body.removeEventListener( 'mouseup', me.mouseUpListener );
					document.body.removeEventListener( 'touchend', me.mouseUpListener );
				};

				document.body.addEventListener( 'mouseup', me.mouseUpListener );
				document.body.addEventListener( 'touchend', me.mouseUpListener );
			};
		},

		padValues: {
			hours: 1,
			minutes: 2,
			seconds: 2,
			milliseconds: 3
		},

		toggleDayPart: function( type ) { // type is always 'hours'
			var value = parseInt( this.state[ type ], 10) + 12;
			var tc = this.timeConstraints[ type ];
			if ( value > tc.max )
				value = tc.min + ( value - ( tc.max + 1 ) );
			return this.pad( type, value );
		},

		increase: function( type ) {
			var tc = this.timeConstraints[ type ];
			var value = parseInt( this.state[ type ], 10) + tc.step;
			if ( value > tc.max )
				value = tc.min + ( value - ( tc.max + 1 ) );
			return this.pad( type, value );
		},

		decrease: function( type ) {
			var tc = this.timeConstraints[ type ];
			var value = parseInt( this.state[ type ], 10) - tc.step;
			if ( value < tc.min )
				value = tc.max + 1 - ( tc.min - value );
			return this.pad( type, value );
		},

		pad: function( type, value ) {
			var str = value + '';
			while ( str.length < this.padValues[ type ] )
				str = '0' + str;
			return str;
		},
	});

	module.exports = DateTimePickerTime;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', { value: true });

	var react = __webpack_require__(10);
	var reactDom = __webpack_require__(23);

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	/**
	 * Check whether some DOM node is our Component's node.
	 */
	function isNodeFound(current, componentNode, ignoreClass) {
	  if (current === componentNode) {
	    return true;
	  } // SVG <use/> elements do not technically reside in the rendered DOM, so
	  // they do not have classList directly, but they offer a link to their
	  // corresponding element, which can have classList. This extra check is for
	  // that case.
	  // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
	  // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17


	  if (current.correspondingElement) {
	    return current.correspondingElement.classList.contains(ignoreClass);
	  }

	  return current.classList.contains(ignoreClass);
	}
	/**
	 * Try to find our node in a hierarchy of nodes, returning the document
	 * node as highest node if our node is not found in the path up.
	 */

	function findHighest(current, componentNode, ignoreClass) {
	  if (current === componentNode) {
	    return true;
	  } // If source=local then this event came from 'somewhere'
	  // inside and should be ignored. We could handle this with
	  // a layered approach, too, but that requires going back to
	  // thinking in terms of Dom node nesting, running counter
	  // to React's 'you shouldn't care about the DOM' philosophy.


	  while (current.parentNode) {
	    if (isNodeFound(current, componentNode, ignoreClass)) {
	      return true;
	    }

	    current = current.parentNode;
	  }

	  return current;
	}
	/**
	 * Check if the browser scrollbar was clicked
	 */

	function clickedScrollbar(evt) {
	  return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY;
	}

	// ideally will get replaced with external dep
	// when rafrex/detect-passive-events#4 and rafrex/detect-passive-events#5 get merged in
	var testPassiveEventSupport = function testPassiveEventSupport() {
	  if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
	    return;
	  }

	  var passive = false;
	  var options = Object.defineProperty({}, 'passive', {
	    get: function get() {
	      passive = true;
	    }
	  });

	  var noop = function noop() {};

	  window.addEventListener('testPassiveEventSupport', noop, options);
	  window.removeEventListener('testPassiveEventSupport', noop, options);
	  return passive;
	};

	function autoInc(seed) {
	  if (seed === void 0) {
	    seed = 0;
	  }

	  return function () {
	    return ++seed;
	  };
	}

	var uid = autoInc();

	var passiveEventSupport;
	var handlersMap = {};
	var enabledInstances = {};
	var touchEvents = ['touchstart', 'touchmove'];
	var IGNORE_CLASS_NAME = 'ignore-react-onclickoutside';
	/**
	 * Options for addEventHandler and removeEventHandler
	 */

	function getEventHandlerOptions(instance, eventName) {
	  var handlerOptions = null;
	  var isTouchEvent = touchEvents.indexOf(eventName) !== -1;

	  if (isTouchEvent && passiveEventSupport) {
	    handlerOptions = {
	      passive: !instance.props.preventDefault
	    };
	  }

	  return handlerOptions;
	}
	/**
	 * This function generates the HOC function that you'll use
	 * in order to impart onOutsideClick listening to an
	 * arbitrary component. It gets called at the end of the
	 * bootstrapping code to yield an instance of the
	 * onClickOutsideHOC function defined inside setupHOC().
	 */


	function onClickOutsideHOC(WrappedComponent, config) {
	  var _class, _temp;

	  return _temp = _class =
	  /*#__PURE__*/
	  function (_Component) {
	    _inheritsLoose(onClickOutside, _Component);

	    function onClickOutside(props) {
	      var _this;

	      _this = _Component.call(this, props) || this;

	      _this.__outsideClickHandler = function (event) {
	        if (typeof _this.__clickOutsideHandlerProp === 'function') {
	          _this.__clickOutsideHandlerProp(event);

	          return;
	        }

	        var instance = _this.getInstance();

	        if (typeof instance.props.handleClickOutside === 'function') {
	          instance.props.handleClickOutside(event);
	          return;
	        }

	        if (typeof instance.handleClickOutside === 'function') {
	          instance.handleClickOutside(event);
	          return;
	        }

	        throw new Error('WrappedComponent lacks a handleClickOutside(event) function for processing outside click events.');
	      };

	      _this.enableOnClickOutside = function () {
	        if (typeof document === 'undefined' || enabledInstances[_this._uid]) {
	          return;
	        }

	        if (typeof passiveEventSupport === 'undefined') {
	          passiveEventSupport = testPassiveEventSupport();
	        }

	        enabledInstances[_this._uid] = true;
	        var events = _this.props.eventTypes;

	        if (!events.forEach) {
	          events = [events];
	        }

	        handlersMap[_this._uid] = function (event) {
	          if (_this.props.disableOnClickOutside) return;
	          if (_this.componentNode === null) return;

	          if (_this.props.preventDefault) {
	            event.preventDefault();
	          }

	          if (_this.props.stopPropagation) {
	            event.stopPropagation();
	          }

	          if (_this.props.excludeScrollbar && clickedScrollbar(event)) return;
	          var current = event.target;

	          if (findHighest(current, _this.componentNode, _this.props.outsideClickIgnoreClass) !== document) {
	            return;
	          }

	          _this.__outsideClickHandler(event);
	        };

	        events.forEach(function (eventName) {
	          document.addEventListener(eventName, handlersMap[_this._uid], getEventHandlerOptions(_this, eventName));
	        });
	      };

	      _this.disableOnClickOutside = function () {
	        delete enabledInstances[_this._uid];
	        var fn = handlersMap[_this._uid];

	        if (fn && typeof document !== 'undefined') {
	          var events = _this.props.eventTypes;

	          if (!events.forEach) {
	            events = [events];
	          }

	          events.forEach(function (eventName) {
	            return document.removeEventListener(eventName, fn, getEventHandlerOptions(_this, eventName));
	          });
	          delete handlersMap[_this._uid];
	        }
	      };

	      _this.getRef = function (ref) {
	        return _this.instanceRef = ref;
	      };

	      _this._uid = uid();
	      return _this;
	    }
	    /**
	     * Access the WrappedComponent's instance.
	     */


	    var _proto = onClickOutside.prototype;

	    _proto.getInstance = function getInstance() {
	      if (!WrappedComponent.prototype.isReactComponent) {
	        return this;
	      }

	      var ref = this.instanceRef;
	      return ref.getInstance ? ref.getInstance() : ref;
	    };

	    /**
	     * Add click listeners to the current document,
	     * linked to this component's state.
	     */
	    _proto.componentDidMount = function componentDidMount() {
	      // If we are in an environment without a DOM such
	      // as shallow rendering or snapshots then we exit
	      // early to prevent any unhandled errors being thrown.
	      if (typeof document === 'undefined' || !document.createElement) {
	        return;
	      }

	      var instance = this.getInstance();

	      if (config && typeof config.handleClickOutside === 'function') {
	        this.__clickOutsideHandlerProp = config.handleClickOutside(instance);

	        if (typeof this.__clickOutsideHandlerProp !== 'function') {
	          throw new Error('WrappedComponent lacks a function for processing outside click events specified by the handleClickOutside config option.');
	        }
	      }

	      this.componentNode = reactDom.findDOMNode(this.getInstance());
	      this.enableOnClickOutside();
	    };

	    _proto.componentDidUpdate = function componentDidUpdate() {
	      this.componentNode = reactDom.findDOMNode(this.getInstance());
	    };
	    /**
	     * Remove all document's event listeners for this component
	     */


	    _proto.componentWillUnmount = function componentWillUnmount() {
	      this.disableOnClickOutside();
	    };
	    /**
	     * Can be called to explicitly enable event listening
	     * for clicks and touches outside of this element.
	     */


	    /**
	     * Pass-through render
	     */
	    _proto.render = function render() {
	      // eslint-disable-next-line no-unused-vars
	      var _props = this.props,
	          excludeScrollbar = _props.excludeScrollbar,
	          props = _objectWithoutProperties(_props, ["excludeScrollbar"]);

	      if (WrappedComponent.prototype.isReactComponent) {
	        props.ref = this.getRef;
	      } else {
	        props.wrappedRef = this.getRef;
	      }

	      props.disableOnClickOutside = this.disableOnClickOutside;
	      props.enableOnClickOutside = this.enableOnClickOutside;
	      return react.createElement(WrappedComponent, props);
	    };

	    return onClickOutside;
	  }(react.Component), _class.displayName = "OnClickOutside(" + (WrappedComponent.displayName || WrappedComponent.name || 'Component') + ")", _class.defaultProps = {
	    eventTypes: ['mousedown', 'touchstart'],
	    excludeScrollbar: config && config.excludeScrollbar || false,
	    outsideClickIgnoreClass: IGNORE_CLASS_NAME,
	    preventDefault: false,
	    stopPropagation: false
	  }, _class.getClass = function () {
	    return WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent;
	  }, _temp;
	}

	exports.IGNORE_CLASS_NAME = IGNORE_CLASS_NAME;
	exports['default'] = onClickOutsideHOC;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ })
/******/ ])
});
;
