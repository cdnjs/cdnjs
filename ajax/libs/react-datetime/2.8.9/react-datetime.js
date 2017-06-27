/*
react-datetime v2.8.9
https://github.com/YouCanBookMe/react-datetime
MIT: https://github.com/YouCanBookMe/react-datetime/raw/master/LICENSE
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["moment", "React", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["Datetime"] = factory(require("moment"), require("React"), require("ReactDOM"));
	else
		root["Datetime"] = factory(root["moment"], root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__) {
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

	var assign = __webpack_require__(1),
		moment = __webpack_require__(2),
		React = __webpack_require__(3),
		CalendarContainer = __webpack_require__(4)
	;

	var TYPES = React.PropTypes;
	var Datetime = React.createClass({
		propTypes: {
			// value: TYPES.object | TYPES.string,
			// defaultValue: TYPES.object | TYPES.string,
			onFocus: TYPES.func,
			onBlur: TYPES.func,
			onChange: TYPES.func,
			locale: TYPES.string,
			utc: TYPES.bool,
			input: TYPES.bool,
			// dateFormat: TYPES.string | TYPES.bool,
			// timeFormat: TYPES.string | TYPES.bool,
			inputProps: TYPES.object,
			timeConstraints: TYPES.object,
			viewMode: TYPES.oneOf(['years', 'months', 'days', 'time']),
			isValidDate: TYPES.func,
			open: TYPES.bool,
			strictParsing: TYPES.bool,
			closeOnSelect: TYPES.bool,
			closeOnTab: TYPES.bool
		},

		getDefaultProps: function() {
			var nof = function() {};
			return {
				className: '',
				defaultValue: '',
				inputProps: {},
				input: true,
				onFocus: nof,
				onBlur: nof,
				onChange: nof,
				timeFormat: true,
				timeConstraints: {},
				dateFormat: true,
				strictParsing: true,
				closeOnSelect: false,
				closeOnTab: true,
				utc: false
			};
		},

		getInitialState: function() {
			var state = this.getStateFromProps( this.props );

			if ( state.open === undefined )
				state.open = !this.props.input;

			state.currentView = this.props.dateFormat ? (this.props.viewMode || state.updateOn || 'days') : 'time';

			return state;
		},

		getStateFromProps: function( props ) {
			var formats = this.getFormats( props ),
				date = props.value || props.defaultValue,
				selectedDate, viewDate, updateOn, inputValue
			;

			if ( date && typeof date === 'string' )
				selectedDate = this.localMoment( date, formats.datetime );
			else if ( date )
				selectedDate = this.localMoment( date );

			if ( selectedDate && !selectedDate.isValid() )
				selectedDate = null;

			viewDate = selectedDate ?
				selectedDate.clone().startOf('month') :
				this.localMoment().startOf('month')
			;

			updateOn = this.getUpdateOn(formats);

			if ( selectedDate )
				inputValue = selectedDate.format(formats.datetime);
			else if ( date.isValid && !date.isValid() )
				inputValue = '';
			else
				inputValue = date || '';

			return {
				updateOn: updateOn,
				inputFormat: formats.datetime,
				viewDate: viewDate,
				selectedDate: selectedDate,
				inputValue: inputValue,
				open: props.open
			};
		},

		getUpdateOn: function( formats ) {
			if ( formats.date.match(/[lLD]/) ) {
				return 'days';
			}
			else if ( formats.date.indexOf('M') !== -1 ) {
				return 'months';
			}
			else if ( formats.date.indexOf('Y') !== -1 ) {
				return 'years';
			}

			return 'days';
		},

		getFormats: function( props ) {
			var formats = {
					date: props.dateFormat || '',
					time: props.timeFormat || ''
				},
				locale = this.localMoment( props.date, null, props ).localeData()
			;

			if ( formats.date === true ) {
				formats.date = locale.longDateFormat('L');
			}
			else if ( this.getUpdateOn(formats) !== 'days' ) {
				formats.time = '';
			}

			if ( formats.time === true ) {
				formats.time = locale.longDateFormat('LT');
			}

			formats.datetime = formats.date && formats.time ?
				formats.date + ' ' + formats.time :
				formats.date || formats.time
			;

			return formats;
		},

		componentWillReceiveProps: function( nextProps ) {
			var formats = this.getFormats( nextProps ),
				updatedState = {}
			;

			if ( nextProps.value !== this.props.value ||
				formats.datetime !== this.getFormats( this.props ).datetime ) {
				updatedState = this.getStateFromProps( nextProps );
			}

			if ( updatedState.open === undefined ) {
				if ( this.props.closeOnSelect && this.state.currentView !== 'time' ) {
					updatedState.open = false;
				} else {
					updatedState.open = this.state.open;
				}
			}

			if ( nextProps.viewMode !== this.props.viewMode ) {
				updatedState.currentView = nextProps.viewMode;
			}

			if ( nextProps.locale !== this.props.locale ) {
				if ( this.state.viewDate ) {
					var updatedViewDate = this.state.viewDate.clone().locale( nextProps.locale );
					updatedState.viewDate = updatedViewDate;
				}
				if ( this.state.selectedDate ) {
					var updatedSelectedDate = this.state.selectedDate.clone().locale( nextProps.locale );
					updatedState.selectedDate = updatedSelectedDate;
					updatedState.inputValue = updatedSelectedDate.format( formats.datetime );
				}
			}

			if ( nextProps.utc !== this.props.utc ) {
				if ( nextProps.utc ) {
					if ( this.state.viewDate )
						updatedState.viewDate = this.state.viewDate.clone().utc();
					if ( this.state.selectedDate ) {
						updatedState.selectedDate = this.state.selectedDate.clone().utc();
						updatedState.inputValue = updatedState.selectedDate.format( formats.datetime );
					}
				} else {
					if ( this.state.viewDate )
						updatedState.viewDate = this.state.viewDate.clone().local();
					if ( this.state.selectedDate ) {
						updatedState.selectedDate = this.state.selectedDate.clone().local();
						updatedState.inputValue = updatedState.selectedDate.format(formats.datetime);
					}
				}
			}

			this.setState( updatedState );
		},

		onInputChange: function( e ) {
			var value = e.target === null ? e : e.target.value,
				localMoment = this.localMoment( value, this.state.inputFormat ),
				update = { inputValue: value }
			;

			if ( localMoment.isValid() && !this.props.value ) {
				update.selectedDate = localMoment;
				update.viewDate = localMoment.clone().startOf('month');
			}
			else {
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

		showView: function( view ) {
			var me = this;
			return function() {
				me.setState({ currentView: view });
			};
		},

		setDate: function( type ) {
			var me = this,
				nextViews = {
					month: 'days',
					year: 'months'
				}
			;
			return function( e ) {
				me.setState({
					viewDate: me.state.viewDate.clone()[ type ]( parseInt(e.target.getAttribute('data-value'), 10) ).startOf( type ),
					currentView: nextViews[ type ]
				});
			};
		},

		addTime: function( amount, type, toSelected ) {
			return this.updateTime( 'add', amount, type, toSelected );
		},

		subtractTime: function( amount, type, toSelected ) {
			return this.updateTime( 'subtract', amount, type, toSelected );
		},

		updateTime: function( op, amount, type, toSelected ) {
			var me = this;

			return function() {
				var update = {},
					date = toSelected ? 'selectedDate' : 'viewDate'
				;

				update[ date ] = me.state[ date ].clone()[ op ]( amount, type );

				me.setState( update );
			};
		},

		allowedSetTime: ['hours', 'minutes', 'seconds', 'milliseconds'],
		setTime: function( type, value ) {
			var index = this.allowedSetTime.indexOf( type ) + 1,
				state = this.state,
				date = (state.selectedDate || state.viewDate).clone(),
				nextType
			;

			// It is needed to set all the time properties
			// to not to reset the time
			date[ type ]( value );
			for (; index < this.allowedSetTime.length; index++) {
				nextType = this.allowedSetTime[index];
				date[ nextType ]( date[nextType]() );
			}

			if ( !this.props.value ) {
				this.setState({
					selectedDate: date,
					inputValue: date.format( state.inputFormat )
				});
			}
			this.props.onChange( date );
		},

		updateSelectedDate: function( e, close ) {
			var target = e.target,
				modifier = 0,
				viewDate = this.state.viewDate,
				currentDate = this.state.selectedDate || viewDate,
				date
	    ;

			if (target.className.indexOf('rdtDay') !== -1) {
				if (target.className.indexOf('rdtNew') !== -1)
					modifier = 1;
				else if (target.className.indexOf('rdtOld') !== -1)
					modifier = -1;

				date = viewDate.clone()
					.month( viewDate.month() + modifier )
					.date( parseInt( target.getAttribute('data-value'), 10 ) );
			} else if (target.className.indexOf('rdtMonth') !== -1) {
				date = viewDate.clone()
					.month( parseInt( target.getAttribute('data-value'), 10 ) )
					.date( currentDate.date() );
			} else if (target.className.indexOf('rdtYear') !== -1) {
				date = viewDate.clone()
					.month( currentDate.month() )
					.date( currentDate.date() )
					.year( parseInt( target.getAttribute('data-value'), 10 ) );
			}

			date.hours( currentDate.hours() )
				.minutes( currentDate.minutes() )
				.seconds( currentDate.seconds() )
				.milliseconds( currentDate.milliseconds() );

			if ( !this.props.value ) {
				var open = !( this.props.closeOnSelect && close );
				if ( !open ) {
					this.props.onBlur( date );
				}

				this.setState({
					selectedDate: date,
					viewDate: date.clone().startOf('month'),
					inputValue: date.format( this.state.inputFormat ),
					open: open
				});
			} else {
				if ( this.props.closeOnSelect && close ) {
					this.closeCalendar();
				}
			}

			this.props.onChange( date );
		},

		openCalendar: function() {
			if (!this.state.open) {
				this.setState({ open: true }, function() {
					this.props.onFocus();
				});
			}
		},

		closeCalendar: function() {
			this.setState({ open: false }, function () {
				this.props.onBlur( this.state.selectedDate || this.state.inputValue );
			});
		},

		handleClickOutside: function() {
			if ( this.props.input && this.state.open && !this.props.open ) {
				this.setState({ open: false }, function() {
					this.props.onBlur( this.state.selectedDate || this.state.inputValue );
				});
			}
		},

		localMoment: function( date, format, props ) {
			props = props || this.props;
			var momentFn = props.utc ? moment.utc : moment;
			var m = momentFn( date, format, props.strictParsing );
			if ( props.locale )
				m.locale( props.locale );
			return m;
		},

		componentProps: {
			fromProps: ['value', 'isValidDate', 'renderDay', 'renderMonth', 'renderYear', 'timeConstraints'],
			fromState: ['viewDate', 'selectedDate', 'updateOn'],
			fromThis: ['setDate', 'setTime', 'showView', 'addTime', 'subtractTime', 'updateSelectedDate', 'localMoment', 'handleClickOutside']
		},

		getComponentProps: function() {
			var me = this,
				formats = this.getFormats( this.props ),
				props = {dateFormat: formats.date, timeFormat: formats.time}
			;

			this.componentProps.fromProps.forEach( function( name ) {
				props[ name ] = me.props[ name ];
			});
			this.componentProps.fromState.forEach( function( name ) {
				props[ name ] = me.state[ name ];
			});
			this.componentProps.fromThis.forEach( function( name ) {
				props[ name ] = me[ name ];
			});

			return props;
		},

		render: function() {
			var DOM = React.DOM,
				className = 'rdt' + (this.props.className ?
	                  ( Array.isArray( this.props.className ) ?
	                  ' ' + this.props.className.join( ' ' ) : ' ' + this.props.className) : ''),
				children = []
			;

			if ( this.props.input ) {
				children = [ DOM.input( assign({
					key: 'i',
					type: 'text',
					className: 'form-control',
					onFocus: this.openCalendar,
					onChange: this.onInputChange,
					onKeyDown: this.onInputKey,
					value: this.state.inputValue
				}, this.props.inputProps ))];
			} else {
				className += ' rdtStatic';
			}

			if ( this.state.open )
				className += ' rdtOpen';

			return DOM.div({className: className}, children.concat(
				DOM.div(
					{ key: 'dt', className: 'rdtPicker' },
					React.createElement( CalendarContainer, {view: this.state.currentView, viewProps: this.getComponentProps(), onClickOutside: this.handleClickOutside })
				)
			));
		}
	});

	// Make moment accessible through the Datetime class
	Datetime.moment = moment;

	module.exports = Datetime;


/***/ },
/* 1 */
/***/ function(module, exports) {

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

	var React = __webpack_require__(3),
	  DaysView = __webpack_require__(5),
	  MonthsView = __webpack_require__(8),
	  YearsView = __webpack_require__(9),
	  TimeView = __webpack_require__(10)
	;

	var CalendarContainer = React.createClass({
		viewComponents: {
			days: DaysView,
			months: MonthsView,
			years: YearsView,
			time: TimeView
		},

	  render: function() {
	    return React.createElement( this.viewComponents[ this.props.view ], this.props.viewProps );
	  }
	});

	module.exports = CalendarContainer;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3),
		moment = __webpack_require__(2),
	  onClickOutside = __webpack_require__(6)
	;

	var DOM = React.DOM;
	var DateTimePickerDays = onClickOutside( React.createClass({
		render: function() {
			var footer = this.renderFooter(),
				date = this.props.viewDate,
				locale = date.localeData(),
				tableChildren
			;

			tableChildren = [
				DOM.thead({ key: 'th' }, [
					DOM.tr({ key: 'h' }, [
						DOM.th({ key: 'p', className: 'rdtPrev' }, DOM.span({ onClick: this.props.subtractTime( 1, 'months' )}, '‹' )),
						DOM.th({ key: 's', className: 'rdtSwitch', onClick: this.props.showView( 'months' ), colSpan: 5, 'data-value': this.props.viewDate.month() }, locale.months( date ) + ' ' + date.year() ),
						DOM.th({ key: 'n', className: 'rdtNext' }, DOM.span({ onClick: this.props.addTime( 1, 'months' )}, '›' ))
					]),
					DOM.tr({ key: 'd'}, this.getDaysOfWeek( locale ).map( function( day, index ) { return DOM.th({ key: day + index, className: 'dow'}, day ); }) )
				]),
				DOM.tbody({ key: 'tb' }, this.renderDays())
			];

			if ( footer )
				tableChildren.push( footer );

			return DOM.div({ className: 'rdtDays' },
				DOM.table({}, tableChildren )
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

				if ( ( prevMonth.year() === currentYear && prevMonth.month() < currentMonth ) || ( prevMonth.year() < currentYear ) )
					classes += ' rdtOld';
				else if ( ( prevMonth.year() === currentYear && prevMonth.month() > currentMonth ) || ( prevMonth.year() > currentYear ) )
					classes += ' rdtNew';

				if ( selected && prevMonth.isSame( selected, 'day' ) )
					classes += ' rdtActive';

				if ( prevMonth.isSame( moment(), 'day' ) )
					classes += ' rdtToday';

				isDisabled = !isValid( currentDate, selected );
				if ( isDisabled )
					classes += ' rdtDisabled';

				dayProps = {
					key: prevMonth.format( 'M_D' ),
					'data-value': prevMonth.date(),
					className: classes
				};

				if ( !isDisabled )
					dayProps.onClick = this.updateSelectedDate;

				days.push( renderer( dayProps, currentDate, selected ) );

				if ( days.length === 7 ) {
					weeks.push( DOM.tr({ key: prevMonth.format( 'M_D' )}, days ) );
					days = [];
				}

				prevMonth.add( 1, 'd' );
			}

			return weeks;
		},

		updateSelectedDate: function( event ) {
			this.props.updateSelectedDate( event, true );
		},

		renderDay: function( props, currentDate ) {
			return DOM.td( props, currentDate.date() );
		},

		renderFooter: function() {
			if ( !this.props.timeFormat )
				return '';

			var date = this.props.selectedDate || this.props.viewDate;

			return DOM.tfoot({ key: 'tf'},
				DOM.tr({},
					DOM.td({ onClick: this.props.showView( 'time' ), colSpan: 7, className: 'rdtTimeToggle' }, date.format( this.props.timeFormat ))
				)
			);
		},

		alwaysValidDate: function() {
			return 1;
		},

	  handleClickOutside: function() {
	    this.props.handleClickOutside();
	  }
	}));

	module.exports = DateTimePickerDays;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * A higher-order-component for handling onClickOutside for React components.
	 */
	(function(root) {

	  // administrative
	  var registeredComponents = [];
	  var handlers = [];
	  var IGNORE_CLASS = 'ignore-react-onclickoutside';
	  var DEFAULT_EVENTS = ['mousedown', 'touchstart'];

	  /**
	   * Check whether some DOM node is our Component's node.
	   */
	  var isNodeFound = function(current, componentNode, ignoreClass) {
	    if (current === componentNode) {
	      return true;
	    }
	    // SVG <use/> elements do not technically reside in the rendered DOM, so
	    // they do not have classList directly, but they offer a link to their
	    // corresponding element, which can have classList. This extra check is for
	    // that case.
	    // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
	    // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17
	    if (current.correspondingElement) {
	      return current.correspondingElement.classList.contains(ignoreClass);
	    }
	    return current.classList.contains(ignoreClass);
	  };

	  /**
	   * Try to find our node in a hierarchy of nodes, returning the document
	   * node as highest noode if our node is not found in the path up.
	   */
	  var findHighest = function(current, componentNode, ignoreClass) {
	    if (current === componentNode) {
	      return true;
	    }

	    // If source=local then this event came from 'somewhere'
	    // inside and should be ignored. We could handle this with
	    // a layered approach, too, but that requires going back to
	    // thinking in terms of Dom node nesting, running counter
	    // to React's 'you shouldn't care about the DOM' philosophy.
	    while(current.parentNode) {
	      if (isNodeFound(current, componentNode, ignoreClass)) {
	        return true;
	      }
	      current = current.parentNode;
	    }
	    return current;
	  };

	  /**
	   * Check if the browser scrollbar was clicked
	   */
	  var clickedScrollbar = function(evt) {
	    return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY;
	  };

	  /**
	   * Generate the event handler that checks whether a clicked DOM node
	   * is inside of, or lives outside of, our Component's node tree.
	   */
	  var generateOutsideCheck = function(componentNode, componentInstance, eventHandler, ignoreClass, excludeScrollbar, preventDefault, stopPropagation) {
	    return function(evt) {
	      if (preventDefault) {
	        evt.preventDefault();
	      }
	      if (stopPropagation) {
	        evt.stopPropagation();
	      }
	      var current = evt.target;
	      if((excludeScrollbar && clickedScrollbar(evt)) || (findHighest(current, componentNode, ignoreClass) !== document)) {
	        return;
	      }
	      eventHandler(evt);
	    };
	  };

	  /**
	   * This function generates the HOC function that you'll use
	   * in order to impart onOutsideClick listening to an
	   * arbitrary component. It gets called at the end of the
	   * bootstrapping code to yield an instance of the
	   * onClickOutsideHOC function defined inside setupHOC().
	   */
	  function setupHOC(root, React, ReactDOM) {

	    // The actual Component-wrapping HOC:
	    return function onClickOutsideHOC(Component, config) {
	      var wrapComponentWithOnClickOutsideHandling = React.createClass({
	        statics: {
	          /**
	           * Access the wrapped Component's class.
	           */
	          getClass: function() {
	            if (Component.getClass) {
	              return Component.getClass();
	            }
	            return Component;
	          }
	        },

	        /**
	         * Access the wrapped Component's instance.
	         */
	        getInstance: function() {
	          return Component.prototype.isReactComponent ? this.refs.instance : this;
	        },

	        // this is given meaning in componentDidMount
	        __outsideClickHandler: function() {},

	        getDefaultProps: function() {
	          return {
	            excludeScrollbar: config && config.excludeScrollbar
	          };
	        },

	        /**
	         * Add click listeners to the current document,
	         * linked to this component's state.
	         */
	        componentDidMount: function() {
	          // If we are in an environment without a DOM such
	          // as shallow rendering or snapshots then we exit
	          // early to prevent any unhandled errors being thrown.
	          if (typeof document === 'undefined' || !document.createElement){
	            return;
	          }

	          var instance = this.getInstance();
	          var clickOutsideHandler;

	          if(config && typeof config.handleClickOutside === 'function') {
	            clickOutsideHandler = config.handleClickOutside(instance);
	            if(typeof clickOutsideHandler !== 'function') {
	              throw new Error('Component lacks a function for processing outside click events specified by the handleClickOutside config option.');
	            }
	          } else if(typeof instance.handleClickOutside === 'function') {
	            if (React.Component.prototype.isPrototypeOf(instance)) {
	              clickOutsideHandler = instance.handleClickOutside.bind(instance);
	            } else {
	              clickOutsideHandler = instance.handleClickOutside;
	            }
	          } else if(typeof instance.props.handleClickOutside === 'function') {
	            clickOutsideHandler = instance.props.handleClickOutside;
	          } else {
	            throw new Error('Component lacks a handleClickOutside(event) function for processing outside click events.');
	          }

	          var componentNode = ReactDOM.findDOMNode(instance);
	          if (componentNode === null) {
	            console.warn('Antipattern warning: there was no DOM node associated with the component that is being wrapped by outsideClick.');
	            console.warn([
	              'This is typically caused by having a component that starts life with a render function that',
	              'returns `null` (due to a state or props value), so that the component \'exist\' in the React',
	              'chain of components, but not in the DOM.\n\nInstead, you need to refactor your code so that the',
	              'decision of whether or not to show your component is handled by the parent, in their render()',
	              'function.\n\nIn code, rather than:\n\n  A{render(){return check? <.../> : null;}\n  B{render(){<A check=... />}\n\nmake sure that you',
	              'use:\n\n  A{render(){return <.../>}\n  B{render(){return <...>{ check ? <A/> : null }<...>}}\n\nThat is:',
	              'the parent is always responsible for deciding whether or not to render any of its children.',
	              'It is not the child\'s responsibility to decide whether a render instruction from above should',
	              'get ignored or not by returning `null`.\n\nWhen any component gets its render() function called,',
	              'that is the signal that it should be rendering its part of the UI. It may in turn decide not to',
	              'render all of *its* children, but it should never return `null` for itself. It is not responsible',
	              'for that decision.'
	            ].join(' '));
	          }

	          var fn = this.__outsideClickHandler = generateOutsideCheck(
	            componentNode,
	            instance,
	            clickOutsideHandler,
	            this.props.outsideClickIgnoreClass || IGNORE_CLASS,
	            this.props.excludeScrollbar, // fallback not needed, prop always exists because of getDefaultProps
	            this.props.preventDefault || false,
	            this.props.stopPropagation || false
	          );

	          var pos = registeredComponents.length;
	          registeredComponents.push(this);
	          handlers[pos] = fn;

	          // If there is a truthy disableOnClickOutside property for this
	          // component, don't immediately start listening for outside events.
	          if (!this.props.disableOnClickOutside) {
	            this.enableOnClickOutside();
	          }
	        },

	        /**
	        * Track for disableOnClickOutside props changes and enable/disable click outside
	        */
	        componentWillReceiveProps: function(nextProps) {
	          if (this.props.disableOnClickOutside && !nextProps.disableOnClickOutside) {
	            this.enableOnClickOutside();
	          } else if (!this.props.disableOnClickOutside && nextProps.disableOnClickOutside) {
	            this.disableOnClickOutside();
	          }
	        },

	        /**
	         * Remove the document's event listeners
	         */
	        componentWillUnmount: function() {
	          this.disableOnClickOutside();
	          this.__outsideClickHandler = false;
	          var pos = registeredComponents.indexOf(this);
	          if( pos>-1) {
	            // clean up so we don't leak memory
	            if (handlers[pos]) { handlers.splice(pos, 1); }
	            registeredComponents.splice(pos, 1);
	          }
	        },

	        /**
	         * Can be called to explicitly enable event listening
	         * for clicks and touches outside of this element.
	         */
	        enableOnClickOutside: function() {
	          var fn = this.__outsideClickHandler;
	          if (typeof document !== 'undefined') {
	            var events = this.props.eventTypes || DEFAULT_EVENTS;
	            if (!events.forEach) {
	              events = [events];
	            }
	            events.forEach(function (eventName) {
	              document.addEventListener(eventName, fn);
	            });
	          }
	        },

	        /**
	         * Can be called to explicitly disable event listening
	         * for clicks and touches outside of this element.
	         */
	        disableOnClickOutside: function() {
	          var fn = this.__outsideClickHandler;
	          if (typeof document !== 'undefined') {
	            var events = this.props.eventTypes || DEFAULT_EVENTS;
	            if (!events.forEach) {
	              events = [events];
	            }
	            events.forEach(function (eventName) {
	              document.removeEventListener(eventName, fn);
	            });
	          }
	        },

	        /**
	         * Pass-through render
	         */
	        render: function() {
	          var passedProps = this.props;
	          var props = {};
	          Object.keys(this.props).forEach(function(key) {
	            if (key !== 'excludeScrollbar') {
	              props[key] = passedProps[key];
	            }
	          });
	          if (Component.prototype.isReactComponent) {
	            props.ref = 'instance';
	          }
	          props.disableOnClickOutside = this.disableOnClickOutside;
	          props.enableOnClickOutside = this.enableOnClickOutside;
	          return React.createElement(Component, props);
	        }
	      });

	      // Add display name for React devtools
	      (function bindWrappedComponentName(c, wrapper) {
	        var componentName = c.displayName || c.name || 'Component';
	        wrapper.displayName = 'OnClickOutside(' + componentName + ')';
	      }(Component, wrapComponentWithOnClickOutsideHandling));

	      return wrapComponentWithOnClickOutsideHandling;
	    };
	  }

	  /**
	   * This function sets up the library in ways that
	   * work with the various modulde loading solutions
	   * used in JavaScript land today.
	   */
	  function setupBinding(root, factory) {
	    if (true) {
	      // AMD. Register as an anonymous module.
	      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3),__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(React, ReactDom) {
	        return factory(root, React, ReactDom);
	      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	      // Node. Note that this does not work with strict
	      // CommonJS, but only CommonJS-like environments
	      // that support module.exports
	      module.exports = factory(root, require('react'), require('react-dom'));
	    } else {
	      // Browser globals (root is window)
	      root.onClickOutside = factory(root, React, ReactDOM);
	    }
	  }

	  // Make it all happen
	  setupBinding(root, setupHOC);

	}(this));


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3),
		onClickOutside = __webpack_require__(6)
	;

	var DOM = React.DOM;
	var DateTimePickerMonths = onClickOutside( React.createClass({
		render: function() {
			return DOM.div({ className: 'rdtMonths' }, [
				DOM.table({ key: 'a' }, DOM.thead( {}, DOM.tr( {}, [
					DOM.th({ key: 'prev', className: 'rdtPrev' }, DOM.span({ onClick: this.props.subtractTime( 1, 'years' )}, '‹' )),
					DOM.th({ key: 'year', className: 'rdtSwitch', onClick: this.props.showView( 'years' ), colSpan: 2, 'data-value': this.props.viewDate.year() }, this.props.viewDate.year() ),
					DOM.th({ key: 'next', className: 'rdtNext' }, DOM.span({ onClick: this.props.addTime( 1, 'years' )}, '›' ))
				]))),
				DOM.table({ key: 'months' }, DOM.tbody({ key: 'b' }, this.renderMonths()))
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
					props.onClick = ( this.props.updateOn === 'months' ?
						this.updateSelectedMonth : this.props.setDate( 'month' ) );

				months.push( renderer( props, i, year, date && date.clone() ) );

				if ( months.length === 4 ) {
					rows.push( DOM.tr({ key: month + '_' + rows.length }, months ) );
					months = [];
				}

				i++;
			}

			return rows;
		},

		updateSelectedMonth: function( event ) {
			this.props.updateSelectedDate( event );
		},

		renderMonth: function( props, month ) {
			var localMoment = this.props.viewDate;
			var monthStr = localMoment.localeData().monthsShort( localMoment.month( month ) );
			var strLength = 3;
			// Because some months are up to 5 characters long, we want to
			// use a fixed string length for consistency
			var monthStrFixedLength = monthStr.substring( 0, strLength );
			return DOM.td( props, capitalize( monthStrFixedLength ) );
		},

		alwaysValidDate: function() {
			return 1;
		},

	  handleClickOutside: function() {
	    this.props.handleClickOutside();
	  }
	}));

	function capitalize( str ) {
		return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
	}

	module.exports = DateTimePickerMonths;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3),
		onClickOutside = __webpack_require__(6)
	;

	var DOM = React.DOM;
	var DateTimePickerYears = onClickOutside( React.createClass({
		render: function() {
			var year = parseInt( this.props.viewDate.year() / 10, 10 ) * 10;

			return DOM.div({ className: 'rdtYears' }, [
				DOM.table({ key: 'a' }, DOM.thead({}, DOM.tr({}, [
					DOM.th({ key: 'prev', className: 'rdtPrev' }, DOM.span({ onClick: this.props.subtractTime( 10, 'years' )}, '‹' )),
					DOM.th({ key: 'year', className: 'rdtSwitch', onClick: this.props.showView( 'years' ), colSpan: 2 }, year + '-' + ( year + 9 ) ),
					DOM.th({ key: 'next', className: 'rdtNext' }, DOM.span({ onClick: this.props.addTime( 10, 'years' )}, '›' ))
					]))),
				DOM.table({ key: 'years' }, DOM.tbody( {}, this.renderYears( year )))
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
					props.onClick = ( this.props.updateOn === 'years' ?
						this.updateSelectedYear : this.props.setDate('year') );

				years.push( renderer( props, year, selectedDate && selectedDate.clone() ));

				if ( years.length === 4 ) {
					rows.push( DOM.tr({ key: i }, years ) );
					years = [];
				}

				year++;
				i++;
			}

			return rows;
		},

		updateSelectedYear: function( event ) {
			this.props.updateSelectedDate( event );
		},

		renderYear: function( props, year ) {
			return DOM.td( props, year );
		},

		alwaysValidDate: function() {
			return 1;
		},

	  handleClickOutside: function() {
	    this.props.handleClickOutside();
	  }
	}));

	module.exports = DateTimePickerYears;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3),
		assign = __webpack_require__(1),
	  onClickOutside = __webpack_require__(6)
	;

	var DOM = React.DOM;
	var DateTimePickerTime = onClickOutside( React.createClass({
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

			var daypart = false;
			if ( this.state !== null && this.props.timeFormat.toLowerCase().indexOf( ' a' ) !== -1 ) {
				if ( this.props.timeFormat.indexOf( ' A' ) !== -1 ) {
					daypart = ( this.state.hours >= 12 ) ? 'PM' : 'AM';
				} else {
					daypart = ( this.state.hours >= 12 ) ? 'pm' : 'am';
				}
			}

			return {
				hours: date.format( 'H' ),
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
				return DOM.div({ key: type, className: 'rdtCounter' }, [
					DOM.span({ key: 'up', className: 'rdtBtn', onMouseDown: this.onStartClicking( 'increase', type ) }, '▲' ),
					DOM.div({ key: 'c', className: 'rdtCount' }, value ),
					DOM.span({ key: 'do', className: 'rdtBtn', onMouseDown: this.onStartClicking( 'decrease', type ) }, '▼' )
				]);
			}
			return '';
		},

		renderDayPart: function() {
			return DOM.div({ key: 'dayPart', className: 'rdtCounter' }, [
				DOM.span({ key: 'up', className: 'rdtBtn', onMouseDown: this.onStartClicking( 'toggleDayPart', 'hours') }, '▲' ),
				DOM.div({ key: this.state.daypart, className: 'rdtCount' }, this.state.daypart ),
				DOM.span({ key: 'do', className: 'rdtBtn', onMouseDown: this.onStartClicking( 'toggleDayPart', 'hours') }, '▼' )
			]);
		},

		render: function() {
			var me = this,
				counters = []
			;

			this.state.counters.forEach( function( c ) {
				if ( counters.length )
					counters.push( DOM.div({ key: 'sep' + counters.length, className: 'rdtCounterSeparator' }, ':' ) );
				counters.push( me.renderCounter( c ) );
			});

			if ( this.state.daypart !== false ) {
				counters.push( me.renderDayPart() );
			}

			if ( this.state.counters.length === 3 && this.props.timeFormat.indexOf( 'S' ) !== -1 ) {
				counters.push( DOM.div({ className: 'rdtCounterSeparator', key: 'sep5' }, ':' ) );
				counters.push(
					DOM.div({ className: 'rdtCounter rdtMilli', key: 'm' },
						DOM.input({ value: this.state.milliseconds, type: 'text', onChange: this.updateMilli } )
						)
					);
			}

			return DOM.div({ className: 'rdtTime' },
				DOM.table({}, [
					this.renderHeader(),
					DOM.tbody({ key: 'b'}, DOM.tr({}, DOM.td({},
						DOM.div({ className: 'rdtCounters' }, counters )
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
			return DOM.thead({ key: 'h' }, DOM.tr({},
				DOM.th({ className: 'rdtSwitch', colSpan: 4, onClick: this.props.showView( 'days' ) }, date.format( this.props.dateFormat ) )
			));
		},

		onStartClicking: function( action, type ) {
			var me = this;

			return function() {
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
				};

				document.body.addEventListener( 'mouseup', me.mouseUpListener );
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
			if ( value > this.timeConstraints[ type ].max )
				value = this.timeConstraints[ type ].min + ( value - ( this.timeConstraints[ type ].max + 1 ) );
			return this.pad( type, value );
		},

		increase: function( type ) {
			var value = parseInt( this.state[ type ], 10) + this.timeConstraints[ type ].step;
			if ( value > this.timeConstraints[ type ].max )
				value = this.timeConstraints[ type ].min + ( value - ( this.timeConstraints[ type ].max + 1 ) );
			return this.pad( type, value );
		},

		decrease: function( type ) {
			var value = parseInt( this.state[ type ], 10) - this.timeConstraints[ type ].step;
			if ( value < this.timeConstraints[ type ].min )
				value = this.timeConstraints[ type ].max + 1 - ( this.timeConstraints[ type ].min - value );
			return this.pad( type, value );
		},

		pad: function( type, value ) {
			var str = value + '';
			while ( str.length < this.padValues[ type ] )
				str = '0' + str;
			return str;
		},

	  handleClickOutside: function() {
	    this.props.handleClickOutside();
	  }
	}));

	module.exports = DateTimePickerTime;


/***/ }
/******/ ])
});
;
