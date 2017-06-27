/*
react-datetime v2.6.2
https://github.com/arqex/react-datetime
MIT: https://github.com/arqex/react-datetime/raw/master/LICENSE
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
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_9__) {
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
		React = __webpack_require__(2),
		DaysView = __webpack_require__(3),
		MonthsView = __webpack_require__(5),
		YearsView = __webpack_require__(6),
		TimeView = __webpack_require__(7),
		moment = __webpack_require__(4)
	;

	var TYPES = React.PropTypes;
	var Datetime = React.createClass({
		mixins: [
			__webpack_require__(8)
		],
		viewComponents: {
			days: DaysView,
			months: MonthsView,
			years: YearsView,
			time: TimeView
		},
		propTypes: {
			// value: TYPES.object | TYPES.string,
			// defaultValue: TYPES.object | TYPES.string,
			onFocus: TYPES.func,
			onBlur: TYPES.func,
			onChange: TYPES.func,
			locale: TYPES.string,
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
			var nof = function(){};
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
				closeOnTab: true
			};
		},

		getInitialState: function() {
			var state = this.getStateFromProps( this.props );

			if ( state.open === undefined )
				state.open = !this.props.input;

			state.currentView = this.props.dateFormat ? (this.props.viewMode || state.updateOn || 'days') : 'time';

			return state;
		},

		getStateFromProps: function( props ){
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

		getUpdateOn: function(formats){
			if ( formats.date.match(/[lLD]/) ){
				return 'days';
			}
			else if ( formats.date.indexOf('M') !== -1 ){
				return 'months';
			}
			else if ( formats.date.indexOf('Y') !== -1 ){
				return 'years';
			}

			return 'days';
		},

		getFormats: function( props ){
			var formats = {
					date: props.dateFormat || '',
					time: props.timeFormat || ''
				},
				locale = this.localMoment( props.date ).localeData()
			;

			if ( formats.date === true ){
				formats.date = locale.longDateFormat('L');
			}
			else if ( this.getUpdateOn(formats) !== 'days' ){
				formats.time = '';
			}

			if ( formats.time === true ){
				formats.time = locale.longDateFormat('LT');
			}

			formats.datetime = formats.date && formats.time ?
				formats.date + ' ' + formats.time :
				formats.date || formats.time
			;

			return formats;
		},

		componentWillReceiveProps: function(nextProps) {
			var formats = this.getFormats( nextProps ),
				update = {}
			;

			if ( nextProps.value !== this.props.value ){
				update = this.getStateFromProps( nextProps );
			}
			if ( formats.datetime !== this.getFormats( this.props ).datetime ) {
				update.inputFormat = formats.datetime;
			}

			if ( update.open === undefined ){
				if ( this.props.closeOnSelect && this.state.currentView !== 'time' ){
					update.open = false;
				}
				else {
					update.open = this.state.open;
				}
			}

			this.setState( update );
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

		onInputKey: function( e ){
			if ( e.which === 9 && this.props.closeOnTab ){
				this.closeCalendar();
			}
		},

		showView: function( view ){
			var me = this;
			return function(){
				me.setState({ currentView: view });
			};
		},

		setDate: function( type ){
			var me = this,
				nextViews = {
					month: 'days',
					year: 'months'
				}
			;
			return function( e ){
				me.setState({
					viewDate: me.state.viewDate.clone()[ type ]( parseInt(e.target.getAttribute('data-value'), 10) ).startOf( type ),
					currentView: nextViews[ type ]
				});
			};
		},

		addTime: function( amount, type, toSelected ){
			return this.updateTime( 'add', amount, type, toSelected );
		},

		subtractTime: function( amount, type, toSelected ){
			return this.updateTime( 'subtract', amount, type, toSelected );
		},

		updateTime: function( op, amount, type, toSelected ){
			var me = this;

			return function(){
				var update = {},
					date = toSelected ? 'selectedDate' : 'viewDate'
				;

				update[ date ] = me.state[ date ].clone()[ op ]( amount, type );

				me.setState( update );
			};
		},

		allowedSetTime: ['hours', 'minutes', 'seconds', 'milliseconds'],
		setTime: function( type, value ){
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

			if ( !this.props.value ){
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

			if (target.className.indexOf('rdtDay') !== -1){
				if (target.className.indexOf('rdtNew') !== -1)
					modifier = 1;
				else if (target.className.indexOf('rdtOld') !== -1)
					modifier = -1;

				date = viewDate.clone()
					.month( viewDate.month() + modifier )
					.date( parseInt( target.getAttribute('data-value'), 10 ) );
			} else if (target.className.indexOf('rdtMonth') !== -1){
				date = viewDate.clone()
					.month( parseInt( target.getAttribute('data-value'), 10 ) )
					.date( currentDate.date() );
			} else if (target.className.indexOf('rdtYear') !== -1){
				date = viewDate.clone()
					.month( currentDate.month() )
					.date( currentDate.date() )
					.year( parseInt( target.getAttribute('data-value'), 10 ) );
			}

			date.hours( currentDate.hours() )
				.minutes( currentDate.minutes() )
				.seconds( currentDate.seconds() )
				.milliseconds( currentDate.milliseconds() );

			if ( !this.props.value ){
				this.setState({
					selectedDate: date,
					viewDate: date.clone().startOf('month'),
					inputValue: date.format( this.state.inputFormat ),
					open: !(this.props.closeOnSelect && close )
				});
			} else {
				if (this.props.closeOnSelect && close) {
					this.closeCalendar();
				}
			}

			this.props.onChange( date );
		},

		openCalendar: function() {
			if (!this.state.open) {
				this.props.onFocus();
				this.setState({ open: true });
			}
		},

		closeCalendar: function() {
			this.setState({ open: false });
			this.props.onBlur( this.state.selectedDate || this.state.inputValue );
		},

		handleClickOutside: function(){
			if ( this.props.input && this.state.open && !this.props.open ){
				this.setState({ open: false });
				this.props.onBlur( this.state.selectedDate || this.state.inputValue );
			}
		},

		localMoment: function( date, format ){
			var m = moment( date, format, this.props.strictParsing );
			if ( this.props.locale )
				m.locale( this.props.locale );
			return m;
		},

		componentProps: {
			fromProps: ['value', 'isValidDate', 'renderDay', 'renderMonth', 'renderYear', 'timeConstraints'],
			fromState: ['viewDate', 'selectedDate', 'updateOn'],
			fromThis: ['setDate', 'setTime', 'showView', 'addTime', 'subtractTime', 'updateSelectedDate', 'localMoment']
		},

		getComponentProps: function(){
			var me = this,
				formats = this.getFormats( this.props ),
				props = {dateFormat: formats.date, timeFormat: formats.time}
			;

			this.componentProps.fromProps.forEach( function( name ){
				props[ name ] = me.props[ name ];
			});
			this.componentProps.fromState.forEach( function( name ){
				props[ name ] = me.state[ name ];
			});
			this.componentProps.fromThis.forEach( function( name ){
				props[ name ] = me[ name ];
			});

			return props;
		},

		render: function() {
			var Component = this.viewComponents[ this.state.currentView ],
				DOM = React.DOM,
				className = 'rdt' + (this.props.className ?
	                  ( Array.isArray( this.props.className ) ?
	                  ' ' + this.props.className.join( ' ' ) : ' ' + this.props.className) : ''),
				children = []
			;

			if ( this.props.input ){
				children = [ DOM.input( assign({
					key: 'i',
					type:'text',
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
					React.createElement( Component, this.getComponentProps())
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2),
		moment = __webpack_require__(4)
	;

	var DOM = React.DOM;
	var DateTimePickerDays = React.createClass({

		render: function() {
			var footer = this.renderFooter(),
				date = this.props.viewDate,
				locale = date.localeData(),
				tableChildren
			;

			tableChildren = [
				DOM.thead({ key: 'th'}, [
					DOM.tr({ key: 'h'}, [
						DOM.th({ key: 'p', className: 'rdtPrev' }, DOM.span({onClick: this.props.subtractTime(1, 'months')}, '‹')),
						DOM.th({ key: 's', className: 'rdtSwitch', onClick: this.props.showView('months'), colSpan: 5, 'data-value': this.props.viewDate.month() }, locale.months( date ) + ' ' + date.year() ),
						DOM.th({ key: 'n', className: 'rdtNext' }, DOM.span({onClick: this.props.addTime(1, 'months')}, '›'))
					]),
					DOM.tr({ key: 'd'}, this.getDaysOfWeek( locale ).map( function( day, index ){ return DOM.th({ key: day + index, className: 'dow'}, day ); }) )
				]),
				DOM.tbody({key: 'tb'}, this.renderDays())
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
		getDaysOfWeek: function( locale ){
			var days = locale._weekdaysMin,
				first = locale.firstDayOfWeek(),
				dow = [],
				i = 0
			;

			days.forEach( function( day ){
				dow[ (7 + (i++) - first) % 7 ] = day;
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
				isValid = this.props.isValidDate || this.isValidDate,
				classes, disabled, dayProps, currentDate
			;

			// Go to the last week of the previous month
			prevMonth.date( prevMonth.daysInMonth() ).startOf('week');
			var lastDay = prevMonth.clone().add(42, 'd');

			while ( prevMonth.isBefore( lastDay ) ){
				classes = 'rdtDay';
				currentDate = prevMonth.clone();

				if ( ( prevMonth.year() === currentYear && prevMonth.month() < currentMonth ) || ( prevMonth.year() < currentYear ) )
					classes += ' rdtOld';
				else if ( ( prevMonth.year() === currentYear && prevMonth.month() > currentMonth ) || ( prevMonth.year() > currentYear ) )
					classes += ' rdtNew';

				if ( selected && prevMonth.isSame(selected, 'day') )
					classes += ' rdtActive';

				if (prevMonth.isSame(moment(), 'day') )
					classes += ' rdtToday';

				disabled = !isValid( currentDate, selected );
				if ( disabled )
					classes += ' rdtDisabled';

				dayProps = {
					key: prevMonth.format('M_D'),
					'data-value': prevMonth.date(),
					className: classes
				};
				if ( !disabled )
					dayProps.onClick = this.updateSelectedDate;

				days.push( renderer( dayProps, currentDate, selected ) );

				if ( days.length === 7 ){
					weeks.push( DOM.tr( {key: prevMonth.format('M_D')}, days ) );
					days = [];
				}

				prevMonth.add( 1, 'd' );
			}

			return weeks;
		},

		updateSelectedDate: function( event ) {
			this.props.updateSelectedDate(event, true);
		},

		renderDay: function( props, currentDate ){
			return DOM.td( props, currentDate.date() );
		},

		renderFooter: function(){
			if ( !this.props.timeFormat )
				return '';

			var date = this.props.selectedDate || this.props.viewDate;

			return DOM.tfoot({ key: 'tf'},
				DOM.tr({},
					DOM.td({ onClick: this.props.showView('time'), colSpan: 7, className: 'rdtTimeToggle'}, date.format( this.props.timeFormat ))
				)
			);
		},
		isValidDate: function(){ return 1; }
	});

	module.exports = DateTimePickerDays;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var DOM = React.DOM;
	var DateTimePickerMonths = React.createClass({
		render: function() {
			return DOM.div({ className: 'rdtMonths' }, [
				DOM.table({ key: 'a'}, DOM.thead({}, DOM.tr({}, [
					DOM.th({ key: 'prev', className: 'rdtPrev' }, DOM.span({onClick: this.props.subtractTime(1, 'years')}, '‹')),
					DOM.th({ key: 'year', className: 'rdtSwitch', onClick: this.props.showView('years'), colSpan: 2, 'data-value': this.props.viewDate.year()}, this.props.viewDate.year() ),
					DOM.th({ key: 'next', className: 'rdtNext' }, DOM.span({onClick: this.props.addTime(1, 'years')}, '›'))
				]))),
				DOM.table({ key: 'months'}, DOM.tbody({ key: 'b'}, this.renderMonths()))
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
				classes, props
			;

			while (i < 12) {
				classes = 'rdtMonth';
				if ( date && i === month && year === date.year() )
					classes += ' rdtActive';

				props = {
					key: i,
					'data-value': i,
					className: classes,
					onClick: this.props.updateOn === 'months'? this.updateSelectedMonth : this.props.setDate('month')
				};

				months.push( renderer( props, i, year, date && date.clone() ));

				if ( months.length === 4 ){
					rows.push( DOM.tr({ key: month + '_' + rows.length }, months) );
					months = [];
				}

				i++;
			}

			return rows;
		},

		updateSelectedMonth: function( event ) {
			this.props.updateSelectedDate(event, true);
		},

		renderMonth: function( props, month ) {
			var monthsShort = this.props.viewDate.localeData()._monthsShort;
			return DOM.td( props, monthsShort.standalone
				? capitalize( monthsShort.standalone[ month ] )
				: monthsShort[ month ]
			);
		}
	});

	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	module.exports = DateTimePickerMonths;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var DOM = React.DOM;
	var DateTimePickerYears = React.createClass({
		render: function() {
			var year = parseInt(this.props.viewDate.year() / 10, 10) * 10;

			return DOM.div({ className: 'rdtYears' }, [
				DOM.table({ key: 'a'}, DOM.thead({}, DOM.tr({}, [
					DOM.th({ key: 'prev', className: 'rdtPrev' }, DOM.span({onClick: this.props.subtractTime(10, 'years')}, '‹')),
					DOM.th({ key: 'year', className: 'rdtSwitch', onClick: this.props.showView('years'), colSpan: 2 }, year + '-' + (year + 9) ),
					DOM.th({ key: 'next', className: 'rdtNext'}, DOM.span({onClick: this.props.addTime(10, 'years')}, '›'))
					]))),
				DOM.table({ key: 'years'}, DOM.tbody({}, this.renderYears( year )))
			]);
		},

		renderYears: function( year ) {
			var years = [],
				i = -1,
				rows = [],
				renderer = this.props.renderYear || this.renderYear,
				selectedDate = this.props.selectedDate,
				classes, props
			;

			year--;
			while (i < 11) {
				classes = 'rdtYear';
				if ( i === -1 | i === 10 )
					classes += ' rdtOld';
				if ( selectedDate && selectedDate.year() === year )
					classes += ' rdtActive';

				props = {
					key: year,
					'data-value': year,
					className: classes,
					onClick: this.props.updateOn === 'years' ? this.updateSelectedYear : this.props.setDate('year')
				};

				years.push( renderer( props, year, selectedDate && selectedDate.clone() ));

				if ( years.length === 4 ){
					rows.push( DOM.tr({ key: i }, years ) );
					years = [];
				}

				year++;
				i++;
			}

			return rows;
		},

		updateSelectedYear: function( event ) {
			this.props.updateSelectedDate(event, true);
		},

		renderYear: function( props, year ){
			return DOM.td( props, year );
		}
	});

	module.exports = DateTimePickerYears;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2),
		assign = __webpack_require__(1);

	var DOM = React.DOM;
	var DateTimePickerTime = React.createClass({
		getInitialState: function(){
			return this.calculateState( this.props );
		},
		calculateState: function( props ){
			var date = props.selectedDate || props.viewDate,
				format = props.timeFormat,
				counters = []
			;

			if ( format.indexOf('H') !== -1 || format.indexOf('h') !== -1 ){
				counters.push('hours');
				if ( format.indexOf('m') !== -1 ){
					counters.push('minutes');
					if ( format.indexOf('s') !== -1 ){
						counters.push('seconds');
					}
				}
			}

			var daypart = false;
			if ( this.props.timeFormat.indexOf(' A') !== -1  && this.state !== null ){
				daypart = ( this.state.hours >= 12 ) ? 'PM' : 'AM';
			}

			return {
				hours: date.format('H'),
				minutes: date.format('mm'),
				seconds: date.format('ss'),
				milliseconds: date.format('SSS'),
				daypart: daypart,
				counters: counters
			};
		},
		renderCounter: function( type ){
			if (type !== 'daypart') {
				var value = this.state[ type ];
				if (type === 'hours' && this.props.timeFormat.indexOf(' A') !== -1) {
					value = (value - 1) % 12 + 1;

					if (value === 0) {
						value = 12;
					}
				}
				return DOM.div({ key: type, className: 'rdtCounter'}, [
					DOM.span({ key:'up', className: 'rdtBtn', onMouseDown: this.onStartClicking( 'increase', type ) }, '▲' ),
					DOM.div({ key:'c', className: 'rdtCount' }, value ),
					DOM.span({ key:'do', className: 'rdtBtn', onMouseDown: this.onStartClicking( 'decrease', type ) }, '▼' )
				]);
			}
			return '';
		},
		renderDayPart: function() {
			return DOM.div({ className: 'rdtCounter', key: 'dayPart'}, [
				DOM.span({ key:'up', className: 'rdtBtn', onMouseDown: this.onStartClicking( 'toggleDayPart', 'hours') }, '▲' ),
				DOM.div({ key: this.state.daypart, className: 'rdtCount'}, this.state.daypart ),
				DOM.span({ key:'do', className: 'rdtBtn', onMouseDown: this.onStartClicking( 'toggleDayPart', 'hours') }, '▼' )
			]);
		},
		render: function() {
			var me = this,
				counters = []
			;

			this.state.counters.forEach( function(c){
				if ( counters.length )
					counters.push( DOM.div( {key: 'sep' + counters.length, className: 'rdtCounterSeparator' }, ':' ));
				counters.push( me.renderCounter( c ) );
			});

			if (this.state.daypart !== false) {
				counters.push( me.renderDayPart() );
			}

			if ( this.state.counters.length === 3 && this.props.timeFormat.indexOf('S') !== -1 ){
				counters.push( DOM.div( {className: 'rdtCounterSeparator', key: 'sep5' }, ':' ));
				counters.push(
					DOM.div( {className: 'rdtCounter rdtMilli', key:'m'},
						DOM.input({ value: this.state.milliseconds, type: 'text', onChange: this.updateMilli })
						)
					);
			}

			return DOM.div( {className: 'rdtTime'},
				DOM.table( {}, [
					this.renderHeader(),
					DOM.tbody({key: 'b'}, DOM.tr({}, DOM.td({},
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
					step: 1,
				},
				milliseconds: {
					min: 0,
					max: 999,
					step: 1
				}
			};
			['hours', 'minutes', 'seconds', 'milliseconds'].forEach(function(type) {
				assign(me.timeConstraints[type], me.props.timeConstraints[type]);
			});
			this.setState( this.calculateState( this.props ) );
		},
		componentWillReceiveProps: function( nextProps ){
			this.setState( this.calculateState( nextProps ) );
		},
		updateMilli: function( e ){
			var milli = parseInt( e.target.value, 10 );
			if ( milli === e.target.value && milli >= 0 && milli < 1000 ){
				this.props.setTime( 'milliseconds', milli );
				this.setState({ milliseconds: milli });
			}
		},
		renderHeader: function(){
			if ( !this.props.dateFormat )
				return null;

			var date = this.props.selectedDate || this.props.viewDate;
			return DOM.thead({ key: 'h'}, DOM.tr({},
				DOM.th( {className: 'rdtSwitch', colSpan: 4, onClick: this.props.showView('days')}, date.format( this.props.dateFormat ) )
			));
		},
		onStartClicking: function( action, type ){
			var me = this;

			return function(){
				var update = {};
				update[ type ] = me[ action ]( type );
				me.setState( update );

				me.timer = setTimeout( function(){
					me.increaseTimer = setInterval( function(){
						update[ type ] = me[ action ]( type );
						me.setState( update );
					}, 70);
				}, 500);

				me.mouseUpListener = function(){
					clearTimeout( me.timer );
					clearInterval( me.increaseTimer );
					me.props.setTime( type, me.state[ type ] );
					document.body.removeEventListener('mouseup', me.mouseUpListener);
				};

				document.body.addEventListener('mouseup', me.mouseUpListener);
			};
		},
		padValues: {
			hours: 1,
			minutes: 2,
			seconds: 2,
			milliseconds: 3
		},
		toggleDayPart: function( type ){ // type is always 'hours'
			var value = parseInt(this.state[ type ], 10) + 12;
			if ( value > this.timeConstraints[ type ].max )
				value = this.timeConstraints[ type ].min + (value - (this.timeConstraints[ type ].max + 1));
			return this.pad( type, value );
		},
		increase: function( type ){
			var value = parseInt(this.state[ type ], 10) + this.timeConstraints[ type ].step;
			if ( value > this.timeConstraints[ type ].max )
				value = this.timeConstraints[ type ].min + ( value - ( this.timeConstraints[ type ].max  + 1) );
			return this.pad( type, value );
		},
		decrease: function( type ){
			var value = parseInt(this.state[ type ], 10) - this.timeConstraints[ type ].step;
			if ( value < this.timeConstraints[ type ].min )
				value = this.timeConstraints[ type ].max + 1 - ( this.timeConstraints[ type ].min - value );
			return this.pad( type, value );
		},
		pad: function( type, value ){
			var str = value + '';
			while ( str.length < this.padValues[ type ] )
				str = '0' + str;
			return str;
		}
	});

	module.exports = DateTimePickerTime;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// This is extracted from https://github.com/Pomax/react-onclickoutside
	// And modified to support react 0.13 and react 0.14

	var React = __webpack_require__(2),
		version = React.version && React.version.split('.')
	;

	if ( version && ( version[0] > 0 || version[1] > 13 ) )
		React = __webpack_require__(9);

	// Use a parallel array because we can't use
	// objects as keys, they get toString-coerced
	var registeredComponents = [];
	var handlers = [];

	var IGNORE_CLASS = 'ignore-react-onclickoutside';

	var isSourceFound = function(source, localNode) {
	 if (source === localNode) {
	   return true;
	 }
	 // SVG <use/> elements do not technically reside in the rendered DOM, so
	 // they do not have classList directly, but they offer a link to their
	 // corresponding element, which can have classList. This extra check is for
	 // that case.
	 // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
	 // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17
	 if (source.correspondingElement) {
	   return source.correspondingElement.classList.contains(IGNORE_CLASS);
	 }
	 return source.classList.contains(IGNORE_CLASS);
	};

	module.exports = {
	 componentDidMount: function() {
	   if (typeof this.handleClickOutside !== 'function')
	     throw new Error('Component lacks a handleClickOutside(event) function for processing outside click events.');

	   var fn = this.__outsideClickHandler = (function(localNode, eventHandler) {
	     return function(evt) {
	       evt.stopPropagation();
	       var source = evt.target;
	       var found = false;
	       // If source=local then this event came from "somewhere"
	       // inside and should be ignored. We could handle this with
	       // a layered approach, too, but that requires going back to
	       // thinking in terms of Dom node nesting, running counter
	       // to React's "you shouldn't care about the DOM" philosophy.
	       while (source.parentNode) {
	         found = isSourceFound(source, localNode);
	         if (found) return;
	         source = source.parentNode;
	       }
	       eventHandler(evt);
	     };
	   }(React.findDOMNode(this), this.handleClickOutside));

	   var pos = registeredComponents.length;
	   registeredComponents.push(this);
	   handlers[pos] = fn;

	   // If there is a truthy disableOnClickOutside property for this
	   // component, don't immediately start listening for outside events.
	   if (!this.props.disableOnClickOutside) {
	     this.enableOnClickOutside();
	   }
	 },

	 componentWillUnmount: function() {
	   this.disableOnClickOutside();
	   this.__outsideClickHandler = false;
	   var pos = registeredComponents.indexOf(this);
	   if ( pos>-1) {
	     if (handlers[pos]) {
	       // clean up so we don't leak memory
	       handlers.splice(pos, 1);
	       registeredComponents.splice(pos, 1);
	     }
	   }
	 },

	 /**
	  * Can be called to explicitly enable event listening
	  * for clicks and touches outside of this element.
	  */
	 enableOnClickOutside: function() {
	   var fn = this.__outsideClickHandler;
	   document.addEventListener('mousedown', fn);
	   document.addEventListener('touchstart', fn);
	 },

	 /**
	  * Can be called to explicitly disable event listening
	  * for clicks and touches outside of this element.
	  */
	 disableOnClickOutside: function() {
	   var fn = this.__outsideClickHandler;
	   document.removeEventListener('mousedown', fn);
	   document.removeEventListener('touchstart', fn);
	 }
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-datetime.js.map
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZWFjdC1kYXRldGltZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSwgcmVxdWlyZShcIm1vbWVudFwiKSwgcmVxdWlyZShcIlJlYWN0RE9NXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcIlJlYWN0XCIsIFwibW9tZW50XCIsIFwiUmVhY3RET01cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGF0ZXRpbWVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSwgcmVxdWlyZShcIm1vbWVudFwiKSwgcmVxdWlyZShcIlJlYWN0RE9NXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEYXRldGltZVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdLCByb290W1wibW9tZW50XCJdLCByb290W1wiUmVhY3RET01cIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXykge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG5cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG5cblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGFzc2lnbiA9IF9fd2VicGFja19yZXF1aXJlX18oMSksXG5cdFx0UmVhY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpLFxuXHRcdERheXNWaWV3ID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKSxcblx0XHRNb250aHNWaWV3ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KSxcblx0XHRZZWFyc1ZpZXcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpLFxuXHRcdFRpbWVWaWV3ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KSxcblx0XHRtb21lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpXG5cdDtcblxuXHR2YXIgVFlQRVMgPSBSZWFjdC5Qcm9wVHlwZXM7XG5cdHZhciBEYXRldGltZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHRtaXhpbnM6IFtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18oOClcblx0XHRdLFxuXHRcdHZpZXdDb21wb25lbnRzOiB7XG5cdFx0XHRkYXlzOiBEYXlzVmlldyxcblx0XHRcdG1vbnRoczogTW9udGhzVmlldyxcblx0XHRcdHllYXJzOiBZZWFyc1ZpZXcsXG5cdFx0XHR0aW1lOiBUaW1lVmlld1xuXHRcdH0sXG5cdFx0cHJvcFR5cGVzOiB7XG5cdFx0XHQvLyB2YWx1ZTogVFlQRVMub2JqZWN0IHwgVFlQRVMuc3RyaW5nLFxuXHRcdFx0Ly8gZGVmYXVsdFZhbHVlOiBUWVBFUy5vYmplY3QgfCBUWVBFUy5zdHJpbmcsXG5cdFx0XHRvbkZvY3VzOiBUWVBFUy5mdW5jLFxuXHRcdFx0b25CbHVyOiBUWVBFUy5mdW5jLFxuXHRcdFx0b25DaGFuZ2U6IFRZUEVTLmZ1bmMsXG5cdFx0XHRsb2NhbGU6IFRZUEVTLnN0cmluZyxcblx0XHRcdGlucHV0OiBUWVBFUy5ib29sLFxuXHRcdFx0Ly8gZGF0ZUZvcm1hdDogVFlQRVMuc3RyaW5nIHwgVFlQRVMuYm9vbCxcblx0XHRcdC8vIHRpbWVGb3JtYXQ6IFRZUEVTLnN0cmluZyB8IFRZUEVTLmJvb2wsXG5cdFx0XHRpbnB1dFByb3BzOiBUWVBFUy5vYmplY3QsXG5cdFx0XHR0aW1lQ29uc3RyYWludHM6IFRZUEVTLm9iamVjdCxcblx0XHRcdHZpZXdNb2RlOiBUWVBFUy5vbmVPZihbJ3llYXJzJywgJ21vbnRocycsICdkYXlzJywgJ3RpbWUnXSksXG5cdFx0XHRpc1ZhbGlkRGF0ZTogVFlQRVMuZnVuYyxcblx0XHRcdG9wZW46IFRZUEVTLmJvb2wsXG5cdFx0XHRzdHJpY3RQYXJzaW5nOiBUWVBFUy5ib29sLFxuXHRcdFx0Y2xvc2VPblNlbGVjdDogVFlQRVMuYm9vbCxcblx0XHRcdGNsb3NlT25UYWI6IFRZUEVTLmJvb2xcblx0XHR9LFxuXG5cdFx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBub2YgPSBmdW5jdGlvbigpe307XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjbGFzc05hbWU6ICcnLFxuXHRcdFx0XHRkZWZhdWx0VmFsdWU6ICcnLFxuXHRcdFx0XHRpbnB1dFByb3BzOiB7fSxcblx0XHRcdFx0aW5wdXQ6IHRydWUsXG5cdFx0XHRcdG9uRm9jdXM6IG5vZixcblx0XHRcdFx0b25CbHVyOiBub2YsXG5cdFx0XHRcdG9uQ2hhbmdlOiBub2YsXG5cdFx0XHRcdHRpbWVGb3JtYXQ6IHRydWUsXG5cdFx0XHRcdHRpbWVDb25zdHJhaW50czoge30sXG5cdFx0XHRcdGRhdGVGb3JtYXQ6IHRydWUsXG5cdFx0XHRcdHN0cmljdFBhcnNpbmc6IHRydWUsXG5cdFx0XHRcdGNsb3NlT25TZWxlY3Q6IGZhbHNlLFxuXHRcdFx0XHRjbG9zZU9uVGFiOiB0cnVlXG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHN0YXRlID0gdGhpcy5nZXRTdGF0ZUZyb21Qcm9wcyggdGhpcy5wcm9wcyApO1xuXG5cdFx0XHRpZiAoIHN0YXRlLm9wZW4gPT09IHVuZGVmaW5lZCApXG5cdFx0XHRcdHN0YXRlLm9wZW4gPSAhdGhpcy5wcm9wcy5pbnB1dDtcblxuXHRcdFx0c3RhdGUuY3VycmVudFZpZXcgPSB0aGlzLnByb3BzLmRhdGVGb3JtYXQgPyAodGhpcy5wcm9wcy52aWV3TW9kZSB8fCBzdGF0ZS51cGRhdGVPbiB8fCAnZGF5cycpIDogJ3RpbWUnO1xuXG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fSxcblxuXHRcdGdldFN0YXRlRnJvbVByb3BzOiBmdW5jdGlvbiggcHJvcHMgKXtcblx0XHRcdHZhciBmb3JtYXRzID0gdGhpcy5nZXRGb3JtYXRzKCBwcm9wcyApLFxuXHRcdFx0XHRkYXRlID0gcHJvcHMudmFsdWUgfHwgcHJvcHMuZGVmYXVsdFZhbHVlLFxuXHRcdFx0XHRzZWxlY3RlZERhdGUsIHZpZXdEYXRlLCB1cGRhdGVPbiwgaW5wdXRWYWx1ZVxuXHRcdFx0O1xuXG5cdFx0XHRpZiAoIGRhdGUgJiYgdHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnIClcblx0XHRcdFx0c2VsZWN0ZWREYXRlID0gdGhpcy5sb2NhbE1vbWVudCggZGF0ZSwgZm9ybWF0cy5kYXRldGltZSApO1xuXHRcdFx0ZWxzZSBpZiAoIGRhdGUgKVxuXHRcdFx0XHRzZWxlY3RlZERhdGUgPSB0aGlzLmxvY2FsTW9tZW50KCBkYXRlICk7XG5cblx0XHRcdGlmICggc2VsZWN0ZWREYXRlICYmICFzZWxlY3RlZERhdGUuaXNWYWxpZCgpIClcblx0XHRcdFx0c2VsZWN0ZWREYXRlID0gbnVsbDtcblxuXHRcdFx0dmlld0RhdGUgPSBzZWxlY3RlZERhdGUgP1xuXHRcdFx0XHRzZWxlY3RlZERhdGUuY2xvbmUoKS5zdGFydE9mKCdtb250aCcpIDpcblx0XHRcdFx0dGhpcy5sb2NhbE1vbWVudCgpLnN0YXJ0T2YoJ21vbnRoJylcblx0XHRcdDtcblxuXHRcdFx0dXBkYXRlT24gPSB0aGlzLmdldFVwZGF0ZU9uKGZvcm1hdHMpO1xuXG5cdFx0XHRpZiAoIHNlbGVjdGVkRGF0ZSApXG5cdFx0XHRcdGlucHV0VmFsdWUgPSBzZWxlY3RlZERhdGUuZm9ybWF0KGZvcm1hdHMuZGF0ZXRpbWUpO1xuXHRcdFx0ZWxzZSBpZiAoIGRhdGUuaXNWYWxpZCAmJiAhZGF0ZS5pc1ZhbGlkKCkgKVxuXHRcdFx0XHRpbnB1dFZhbHVlID0gJyc7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGlucHV0VmFsdWUgPSBkYXRlIHx8ICcnO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR1cGRhdGVPbjogdXBkYXRlT24sXG5cdFx0XHRcdGlucHV0Rm9ybWF0OiBmb3JtYXRzLmRhdGV0aW1lLFxuXHRcdFx0XHR2aWV3RGF0ZTogdmlld0RhdGUsXG5cdFx0XHRcdHNlbGVjdGVkRGF0ZTogc2VsZWN0ZWREYXRlLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiBpbnB1dFZhbHVlLFxuXHRcdFx0XHRvcGVuOiBwcm9wcy5vcGVuXG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRnZXRVcGRhdGVPbjogZnVuY3Rpb24oZm9ybWF0cyl7XG5cdFx0XHRpZiAoIGZvcm1hdHMuZGF0ZS5tYXRjaCgvW2xMRF0vKSApe1xuXHRcdFx0XHRyZXR1cm4gJ2RheXMnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoIGZvcm1hdHMuZGF0ZS5pbmRleE9mKCdNJykgIT09IC0xICl7XG5cdFx0XHRcdHJldHVybiAnbW9udGhzJztcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBmb3JtYXRzLmRhdGUuaW5kZXhPZignWScpICE9PSAtMSApe1xuXHRcdFx0XHRyZXR1cm4gJ3llYXJzJztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICdkYXlzJztcblx0XHR9LFxuXG5cdFx0Z2V0Rm9ybWF0czogZnVuY3Rpb24oIHByb3BzICl7XG5cdFx0XHR2YXIgZm9ybWF0cyA9IHtcblx0XHRcdFx0XHRkYXRlOiBwcm9wcy5kYXRlRm9ybWF0IHx8ICcnLFxuXHRcdFx0XHRcdHRpbWU6IHByb3BzLnRpbWVGb3JtYXQgfHwgJydcblx0XHRcdFx0fSxcblx0XHRcdFx0bG9jYWxlID0gdGhpcy5sb2NhbE1vbWVudCggcHJvcHMuZGF0ZSApLmxvY2FsZURhdGEoKVxuXHRcdFx0O1xuXG5cdFx0XHRpZiAoIGZvcm1hdHMuZGF0ZSA9PT0gdHJ1ZSApe1xuXHRcdFx0XHRmb3JtYXRzLmRhdGUgPSBsb2NhbGUubG9uZ0RhdGVGb3JtYXQoJ0wnKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCB0aGlzLmdldFVwZGF0ZU9uKGZvcm1hdHMpICE9PSAnZGF5cycgKXtcblx0XHRcdFx0Zm9ybWF0cy50aW1lID0gJyc7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggZm9ybWF0cy50aW1lID09PSB0cnVlICl7XG5cdFx0XHRcdGZvcm1hdHMudGltZSA9IGxvY2FsZS5sb25nRGF0ZUZvcm1hdCgnTFQnKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9ybWF0cy5kYXRldGltZSA9IGZvcm1hdHMuZGF0ZSAmJiBmb3JtYXRzLnRpbWUgP1xuXHRcdFx0XHRmb3JtYXRzLmRhdGUgKyAnICcgKyBmb3JtYXRzLnRpbWUgOlxuXHRcdFx0XHRmb3JtYXRzLmRhdGUgfHwgZm9ybWF0cy50aW1lXG5cdFx0XHQ7XG5cblx0XHRcdHJldHVybiBmb3JtYXRzO1xuXHRcdH0sXG5cblx0XHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpIHtcblx0XHRcdHZhciBmb3JtYXRzID0gdGhpcy5nZXRGb3JtYXRzKCBuZXh0UHJvcHMgKSxcblx0XHRcdFx0dXBkYXRlID0ge31cblx0XHRcdDtcblxuXHRcdFx0aWYgKCBuZXh0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMudmFsdWUgKXtcblx0XHRcdFx0dXBkYXRlID0gdGhpcy5nZXRTdGF0ZUZyb21Qcm9wcyggbmV4dFByb3BzICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGZvcm1hdHMuZGF0ZXRpbWUgIT09IHRoaXMuZ2V0Rm9ybWF0cyggdGhpcy5wcm9wcyApLmRhdGV0aW1lICkge1xuXHRcdFx0XHR1cGRhdGUuaW5wdXRGb3JtYXQgPSBmb3JtYXRzLmRhdGV0aW1lO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHVwZGF0ZS5vcGVuID09PSB1bmRlZmluZWQgKXtcblx0XHRcdFx0aWYgKCB0aGlzLnByb3BzLmNsb3NlT25TZWxlY3QgJiYgdGhpcy5zdGF0ZS5jdXJyZW50VmlldyAhPT0gJ3RpbWUnICl7XG5cdFx0XHRcdFx0dXBkYXRlLm9wZW4gPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR1cGRhdGUub3BlbiA9IHRoaXMuc3RhdGUub3Blbjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNldFN0YXRlKCB1cGRhdGUgKTtcblx0XHR9LFxuXG5cdFx0b25JbnB1dENoYW5nZTogZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBlLnRhcmdldCA9PT0gbnVsbCA/IGUgOiBlLnRhcmdldC52YWx1ZSxcblx0XHRcdFx0bG9jYWxNb21lbnQgPSB0aGlzLmxvY2FsTW9tZW50KCB2YWx1ZSwgdGhpcy5zdGF0ZS5pbnB1dEZvcm1hdCApLFxuXHRcdFx0XHR1cGRhdGUgPSB7IGlucHV0VmFsdWU6IHZhbHVlIH1cblx0XHRcdDtcblxuXHRcdFx0aWYgKCBsb2NhbE1vbWVudC5pc1ZhbGlkKCkgJiYgIXRoaXMucHJvcHMudmFsdWUgKSB7XG5cdFx0XHRcdHVwZGF0ZS5zZWxlY3RlZERhdGUgPSBsb2NhbE1vbWVudDtcblx0XHRcdFx0dXBkYXRlLnZpZXdEYXRlID0gbG9jYWxNb21lbnQuY2xvbmUoKS5zdGFydE9mKCdtb250aCcpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHVwZGF0ZS5zZWxlY3RlZERhdGUgPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRTdGF0ZSggdXBkYXRlLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2UoIGxvY2FsTW9tZW50LmlzVmFsaWQoKSA/IGxvY2FsTW9tZW50IDogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0b25JbnB1dEtleTogZnVuY3Rpb24oIGUgKXtcblx0XHRcdGlmICggZS53aGljaCA9PT0gOSAmJiB0aGlzLnByb3BzLmNsb3NlT25UYWIgKXtcblx0XHRcdFx0dGhpcy5jbG9zZUNhbGVuZGFyKCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHNob3dWaWV3OiBmdW5jdGlvbiggdmlldyApe1xuXHRcdFx0dmFyIG1lID0gdGhpcztcblx0XHRcdHJldHVybiBmdW5jdGlvbigpe1xuXHRcdFx0XHRtZS5zZXRTdGF0ZSh7IGN1cnJlbnRWaWV3OiB2aWV3IH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0c2V0RGF0ZTogZnVuY3Rpb24oIHR5cGUgKXtcblx0XHRcdHZhciBtZSA9IHRoaXMsXG5cdFx0XHRcdG5leHRWaWV3cyA9IHtcblx0XHRcdFx0XHRtb250aDogJ2RheXMnLFxuXHRcdFx0XHRcdHllYXI6ICdtb250aHMnXG5cdFx0XHRcdH1cblx0XHRcdDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZSApe1xuXHRcdFx0XHRtZS5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0dmlld0RhdGU6IG1lLnN0YXRlLnZpZXdEYXRlLmNsb25lKClbIHR5cGUgXSggcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJyksIDEwKSApLnN0YXJ0T2YoIHR5cGUgKSxcblx0XHRcdFx0XHRjdXJyZW50VmlldzogbmV4dFZpZXdzWyB0eXBlIF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRhZGRUaW1lOiBmdW5jdGlvbiggYW1vdW50LCB0eXBlLCB0b1NlbGVjdGVkICl7XG5cdFx0XHRyZXR1cm4gdGhpcy51cGRhdGVUaW1lKCAnYWRkJywgYW1vdW50LCB0eXBlLCB0b1NlbGVjdGVkICk7XG5cdFx0fSxcblxuXHRcdHN1YnRyYWN0VGltZTogZnVuY3Rpb24oIGFtb3VudCwgdHlwZSwgdG9TZWxlY3RlZCApe1xuXHRcdFx0cmV0dXJuIHRoaXMudXBkYXRlVGltZSggJ3N1YnRyYWN0JywgYW1vdW50LCB0eXBlLCB0b1NlbGVjdGVkICk7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZVRpbWU6IGZ1bmN0aW9uKCBvcCwgYW1vdW50LCB0eXBlLCB0b1NlbGVjdGVkICl7XG5cdFx0XHR2YXIgbWUgPSB0aGlzO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIHVwZGF0ZSA9IHt9LFxuXHRcdFx0XHRcdGRhdGUgPSB0b1NlbGVjdGVkID8gJ3NlbGVjdGVkRGF0ZScgOiAndmlld0RhdGUnXG5cdFx0XHRcdDtcblxuXHRcdFx0XHR1cGRhdGVbIGRhdGUgXSA9IG1lLnN0YXRlWyBkYXRlIF0uY2xvbmUoKVsgb3AgXSggYW1vdW50LCB0eXBlICk7XG5cblx0XHRcdFx0bWUuc2V0U3RhdGUoIHVwZGF0ZSApO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0YWxsb3dlZFNldFRpbWU6IFsnaG91cnMnLCAnbWludXRlcycsICdzZWNvbmRzJywgJ21pbGxpc2Vjb25kcyddLFxuXHRcdHNldFRpbWU6IGZ1bmN0aW9uKCB0eXBlLCB2YWx1ZSApe1xuXHRcdFx0dmFyIGluZGV4ID0gdGhpcy5hbGxvd2VkU2V0VGltZS5pbmRleE9mKCB0eXBlICkgKyAxLFxuXHRcdFx0XHRzdGF0ZSA9IHRoaXMuc3RhdGUsXG5cdFx0XHRcdGRhdGUgPSAoc3RhdGUuc2VsZWN0ZWREYXRlIHx8IHN0YXRlLnZpZXdEYXRlKS5jbG9uZSgpLFxuXHRcdFx0XHRuZXh0VHlwZVxuXHRcdFx0O1xuXG5cdFx0XHQvLyBJdCBpcyBuZWVkZWQgdG8gc2V0IGFsbCB0aGUgdGltZSBwcm9wZXJ0aWVzXG5cdFx0XHQvLyB0byBub3QgdG8gcmVzZXQgdGhlIHRpbWVcblx0XHRcdGRhdGVbIHR5cGUgXSggdmFsdWUgKTtcblx0XHRcdGZvciAoOyBpbmRleCA8IHRoaXMuYWxsb3dlZFNldFRpbWUubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0XHRcdG5leHRUeXBlID0gdGhpcy5hbGxvd2VkU2V0VGltZVtpbmRleF07XG5cdFx0XHRcdGRhdGVbIG5leHRUeXBlIF0oIGRhdGVbbmV4dFR5cGVdKCkgKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCAhdGhpcy5wcm9wcy52YWx1ZSApe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRzZWxlY3RlZERhdGU6IGRhdGUsXG5cdFx0XHRcdFx0aW5wdXRWYWx1ZTogZGF0ZS5mb3JtYXQoIHN0YXRlLmlucHV0Rm9ybWF0IClcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKCBkYXRlICk7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZVNlbGVjdGVkRGF0ZTogZnVuY3Rpb24oIGUsIGNsb3NlICkge1xuXHRcdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0LFxuXHRcdFx0XHRtb2RpZmllciA9IDAsXG5cdFx0XHRcdHZpZXdEYXRlID0gdGhpcy5zdGF0ZS52aWV3RGF0ZSxcblx0XHRcdFx0Y3VycmVudERhdGUgPSB0aGlzLnN0YXRlLnNlbGVjdGVkRGF0ZSB8fCB2aWV3RGF0ZSxcblx0XHRcdFx0ZGF0ZVxuXHQgICAgO1xuXG5cdFx0XHRpZiAodGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdyZHREYXknKSAhPT0gLTEpe1xuXHRcdFx0XHRpZiAodGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdyZHROZXcnKSAhPT0gLTEpXG5cdFx0XHRcdFx0bW9kaWZpZXIgPSAxO1xuXHRcdFx0XHRlbHNlIGlmICh0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ3JkdE9sZCcpICE9PSAtMSlcblx0XHRcdFx0XHRtb2RpZmllciA9IC0xO1xuXG5cdFx0XHRcdGRhdGUgPSB2aWV3RGF0ZS5jbG9uZSgpXG5cdFx0XHRcdFx0Lm1vbnRoKCB2aWV3RGF0ZS5tb250aCgpICsgbW9kaWZpZXIgKVxuXHRcdFx0XHRcdC5kYXRlKCBwYXJzZUludCggdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpLCAxMCApICk7XG5cdFx0XHR9IGVsc2UgaWYgKHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZigncmR0TW9udGgnKSAhPT0gLTEpe1xuXHRcdFx0XHRkYXRlID0gdmlld0RhdGUuY2xvbmUoKVxuXHRcdFx0XHRcdC5tb250aCggcGFyc2VJbnQoIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSwgMTAgKSApXG5cdFx0XHRcdFx0LmRhdGUoIGN1cnJlbnREYXRlLmRhdGUoKSApO1xuXHRcdFx0fSBlbHNlIGlmICh0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ3JkdFllYXInKSAhPT0gLTEpe1xuXHRcdFx0XHRkYXRlID0gdmlld0RhdGUuY2xvbmUoKVxuXHRcdFx0XHRcdC5tb250aCggY3VycmVudERhdGUubW9udGgoKSApXG5cdFx0XHRcdFx0LmRhdGUoIGN1cnJlbnREYXRlLmRhdGUoKSApXG5cdFx0XHRcdFx0LnllYXIoIHBhcnNlSW50KCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJyksIDEwICkgKTtcblx0XHRcdH1cblxuXHRcdFx0ZGF0ZS5ob3VycyggY3VycmVudERhdGUuaG91cnMoKSApXG5cdFx0XHRcdC5taW51dGVzKCBjdXJyZW50RGF0ZS5taW51dGVzKCkgKVxuXHRcdFx0XHQuc2Vjb25kcyggY3VycmVudERhdGUuc2Vjb25kcygpIClcblx0XHRcdFx0Lm1pbGxpc2Vjb25kcyggY3VycmVudERhdGUubWlsbGlzZWNvbmRzKCkgKTtcblxuXHRcdFx0aWYgKCAhdGhpcy5wcm9wcy52YWx1ZSApe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRzZWxlY3RlZERhdGU6IGRhdGUsXG5cdFx0XHRcdFx0dmlld0RhdGU6IGRhdGUuY2xvbmUoKS5zdGFydE9mKCdtb250aCcpLFxuXHRcdFx0XHRcdGlucHV0VmFsdWU6IGRhdGUuZm9ybWF0KCB0aGlzLnN0YXRlLmlucHV0Rm9ybWF0ICksXG5cdFx0XHRcdFx0b3BlbjogISh0aGlzLnByb3BzLmNsb3NlT25TZWxlY3QgJiYgY2xvc2UgKVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLnByb3BzLmNsb3NlT25TZWxlY3QgJiYgY2xvc2UpIHtcblx0XHRcdFx0XHR0aGlzLmNsb3NlQ2FsZW5kYXIoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKCBkYXRlICk7XG5cdFx0fSxcblxuXHRcdG9wZW5DYWxlbmRhcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIXRoaXMuc3RhdGUub3Blbikge1xuXHRcdFx0XHR0aGlzLnByb3BzLm9uRm9jdXMoKTtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IG9wZW46IHRydWUgfSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGNsb3NlQ2FsZW5kYXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IG9wZW46IGZhbHNlIH0pO1xuXHRcdFx0dGhpcy5wcm9wcy5vbkJsdXIoIHRoaXMuc3RhdGUuc2VsZWN0ZWREYXRlIHx8IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSApO1xuXHRcdH0sXG5cblx0XHRoYW5kbGVDbGlja091dHNpZGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoIHRoaXMucHJvcHMuaW5wdXQgJiYgdGhpcy5zdGF0ZS5vcGVuICYmICF0aGlzLnByb3BzLm9wZW4gKXtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IG9wZW46IGZhbHNlIH0pO1xuXHRcdFx0XHR0aGlzLnByb3BzLm9uQmx1ciggdGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUgfHwgdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGxvY2FsTW9tZW50OiBmdW5jdGlvbiggZGF0ZSwgZm9ybWF0ICl7XG5cdFx0XHR2YXIgbSA9IG1vbWVudCggZGF0ZSwgZm9ybWF0LCB0aGlzLnByb3BzLnN0cmljdFBhcnNpbmcgKTtcblx0XHRcdGlmICggdGhpcy5wcm9wcy5sb2NhbGUgKVxuXHRcdFx0XHRtLmxvY2FsZSggdGhpcy5wcm9wcy5sb2NhbGUgKTtcblx0XHRcdHJldHVybiBtO1xuXHRcdH0sXG5cblx0XHRjb21wb25lbnRQcm9wczoge1xuXHRcdFx0ZnJvbVByb3BzOiBbJ3ZhbHVlJywgJ2lzVmFsaWREYXRlJywgJ3JlbmRlckRheScsICdyZW5kZXJNb250aCcsICdyZW5kZXJZZWFyJywgJ3RpbWVDb25zdHJhaW50cyddLFxuXHRcdFx0ZnJvbVN0YXRlOiBbJ3ZpZXdEYXRlJywgJ3NlbGVjdGVkRGF0ZScsICd1cGRhdGVPbiddLFxuXHRcdFx0ZnJvbVRoaXM6IFsnc2V0RGF0ZScsICdzZXRUaW1lJywgJ3Nob3dWaWV3JywgJ2FkZFRpbWUnLCAnc3VidHJhY3RUaW1lJywgJ3VwZGF0ZVNlbGVjdGVkRGF0ZScsICdsb2NhbE1vbWVudCddXG5cdFx0fSxcblxuXHRcdGdldENvbXBvbmVudFByb3BzOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIG1lID0gdGhpcyxcblx0XHRcdFx0Zm9ybWF0cyA9IHRoaXMuZ2V0Rm9ybWF0cyggdGhpcy5wcm9wcyApLFxuXHRcdFx0XHRwcm9wcyA9IHtkYXRlRm9ybWF0OiBmb3JtYXRzLmRhdGUsIHRpbWVGb3JtYXQ6IGZvcm1hdHMudGltZX1cblx0XHRcdDtcblxuXHRcdFx0dGhpcy5jb21wb25lbnRQcm9wcy5mcm9tUHJvcHMuZm9yRWFjaCggZnVuY3Rpb24oIG5hbWUgKXtcblx0XHRcdFx0cHJvcHNbIG5hbWUgXSA9IG1lLnByb3BzWyBuYW1lIF07XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuY29tcG9uZW50UHJvcHMuZnJvbVN0YXRlLmZvckVhY2goIGZ1bmN0aW9uKCBuYW1lICl7XG5cdFx0XHRcdHByb3BzWyBuYW1lIF0gPSBtZS5zdGF0ZVsgbmFtZSBdO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLmNvbXBvbmVudFByb3BzLmZyb21UaGlzLmZvckVhY2goIGZ1bmN0aW9uKCBuYW1lICl7XG5cdFx0XHRcdHByb3BzWyBuYW1lIF0gPSBtZVsgbmFtZSBdO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBwcm9wcztcblx0XHR9LFxuXG5cdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBDb21wb25lbnQgPSB0aGlzLnZpZXdDb21wb25lbnRzWyB0aGlzLnN0YXRlLmN1cnJlbnRWaWV3IF0sXG5cdFx0XHRcdERPTSA9IFJlYWN0LkRPTSxcblx0XHRcdFx0Y2xhc3NOYW1lID0gJ3JkdCcgKyAodGhpcy5wcm9wcy5jbGFzc05hbWUgP1xuXHQgICAgICAgICAgICAgICAgICAoIEFycmF5LmlzQXJyYXkoIHRoaXMucHJvcHMuY2xhc3NOYW1lICkgP1xuXHQgICAgICAgICAgICAgICAgICAnICcgKyB0aGlzLnByb3BzLmNsYXNzTmFtZS5qb2luKCAnICcgKSA6ICcgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lKSA6ICcnKSxcblx0XHRcdFx0Y2hpbGRyZW4gPSBbXVxuXHRcdFx0O1xuXG5cdFx0XHRpZiAoIHRoaXMucHJvcHMuaW5wdXQgKXtcblx0XHRcdFx0Y2hpbGRyZW4gPSBbIERPTS5pbnB1dCggYXNzaWduKHtcblx0XHRcdFx0XHRrZXk6ICdpJyxcblx0XHRcdFx0XHR0eXBlOid0ZXh0Jyxcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdmb3JtLWNvbnRyb2wnLFxuXHRcdFx0XHRcdG9uRm9jdXM6IHRoaXMub3BlbkNhbGVuZGFyLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLm9uSW5wdXRDaGFuZ2UsXG5cdFx0XHRcdFx0b25LZXlEb3duOiB0aGlzLm9uSW5wdXRLZXksXG5cdFx0XHRcdFx0dmFsdWU6IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxuXHRcdFx0XHR9LCB0aGlzLnByb3BzLmlucHV0UHJvcHMgKSldO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2xhc3NOYW1lICs9ICcgcmR0U3RhdGljJztcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB0aGlzLnN0YXRlLm9wZW4gKVxuXHRcdFx0XHRjbGFzc05hbWUgKz0gJyByZHRPcGVuJztcblxuXHRcdFx0cmV0dXJuIERPTS5kaXYoe2NsYXNzTmFtZTogY2xhc3NOYW1lfSwgY2hpbGRyZW4uY29uY2F0KFxuXHRcdFx0XHRET00uZGl2KFxuXHRcdFx0XHRcdHsga2V5OiAnZHQnLCBjbGFzc05hbWU6ICdyZHRQaWNrZXInIH0sXG5cdFx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudCggQ29tcG9uZW50LCB0aGlzLmdldENvbXBvbmVudFByb3BzKCkpXG5cdFx0XHRcdClcblx0XHRcdCkpO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gTWFrZSBtb21lbnQgYWNjZXNzaWJsZSB0aHJvdWdoIHRoZSBEYXRldGltZSBjbGFzc1xuXHREYXRldGltZS5tb21lbnQgPSBtb21lbnQ7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBEYXRldGltZTtcblxuXG4vKioqLyB9LFxuLyogMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblx0ZnVuY3Rpb24gVG9PYmplY3QodmFsKSB7XG5cdFx0aWYgKHZhbCA9PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHRcdH1cblxuXHRcdHJldHVybiBPYmplY3QodmFsKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG93bkVudW1lcmFibGVLZXlzKG9iaikge1xuXHRcdHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcblxuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRrZXlzID0ga2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cmV0dXJuIHByb3BJc0VudW1lcmFibGUuY2FsbChvYmosIGtleSk7XG5cdFx0fSk7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdFx0dmFyIGZyb207XG5cdFx0dmFyIGtleXM7XG5cdFx0dmFyIHRvID0gVG9PYmplY3QodGFyZ2V0KTtcblxuXHRcdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0XHRmcm9tID0gYXJndW1lbnRzW3NdO1xuXHRcdFx0a2V5cyA9IG93bkVudW1lcmFibGVLZXlzKE9iamVjdChmcm9tKSk7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR0b1trZXlzW2ldXSA9IGZyb21ba2V5c1tpXV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRvO1xuXHR9O1xuXG5cbi8qKiovIH0sXG4vKiAyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG4vKioqLyB9LFxuLyogMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBSZWFjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMiksXG5cdFx0bW9tZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KVxuXHQ7XG5cblx0dmFyIERPTSA9IFJlYWN0LkRPTTtcblx0dmFyIERhdGVUaW1lUGlja2VyRGF5cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRcdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZm9vdGVyID0gdGhpcy5yZW5kZXJGb290ZXIoKSxcblx0XHRcdFx0ZGF0ZSA9IHRoaXMucHJvcHMudmlld0RhdGUsXG5cdFx0XHRcdGxvY2FsZSA9IGRhdGUubG9jYWxlRGF0YSgpLFxuXHRcdFx0XHR0YWJsZUNoaWxkcmVuXG5cdFx0XHQ7XG5cblx0XHRcdHRhYmxlQ2hpbGRyZW4gPSBbXG5cdFx0XHRcdERPTS50aGVhZCh7IGtleTogJ3RoJ30sIFtcblx0XHRcdFx0XHRET00udHIoeyBrZXk6ICdoJ30sIFtcblx0XHRcdFx0XHRcdERPTS50aCh7IGtleTogJ3AnLCBjbGFzc05hbWU6ICdyZHRQcmV2JyB9LCBET00uc3Bhbih7b25DbGljazogdGhpcy5wcm9wcy5zdWJ0cmFjdFRpbWUoMSwgJ21vbnRocycpfSwgJ+KAuScpKSxcblx0XHRcdFx0XHRcdERPTS50aCh7IGtleTogJ3MnLCBjbGFzc05hbWU6ICdyZHRTd2l0Y2gnLCBvbkNsaWNrOiB0aGlzLnByb3BzLnNob3dWaWV3KCdtb250aHMnKSwgY29sU3BhbjogNSwgJ2RhdGEtdmFsdWUnOiB0aGlzLnByb3BzLnZpZXdEYXRlLm1vbnRoKCkgfSwgbG9jYWxlLm1vbnRocyggZGF0ZSApICsgJyAnICsgZGF0ZS55ZWFyKCkgKSxcblx0XHRcdFx0XHRcdERPTS50aCh7IGtleTogJ24nLCBjbGFzc05hbWU6ICdyZHROZXh0JyB9LCBET00uc3Bhbih7b25DbGljazogdGhpcy5wcm9wcy5hZGRUaW1lKDEsICdtb250aHMnKX0sICfigLonKSlcblx0XHRcdFx0XHRdKSxcblx0XHRcdFx0XHRET00udHIoeyBrZXk6ICdkJ30sIHRoaXMuZ2V0RGF5c09mV2VlayggbG9jYWxlICkubWFwKCBmdW5jdGlvbiggZGF5LCBpbmRleCApeyByZXR1cm4gRE9NLnRoKHsga2V5OiBkYXkgKyBpbmRleCwgY2xhc3NOYW1lOiAnZG93J30sIGRheSApOyB9KSApXG5cdFx0XHRcdF0pLFxuXHRcdFx0XHRET00udGJvZHkoe2tleTogJ3RiJ30sIHRoaXMucmVuZGVyRGF5cygpKVxuXHRcdFx0XTtcblxuXHRcdFx0aWYgKCBmb290ZXIgKVxuXHRcdFx0XHR0YWJsZUNoaWxkcmVuLnB1c2goIGZvb3RlciApO1xuXG5cdFx0XHRyZXR1cm4gRE9NLmRpdih7IGNsYXNzTmFtZTogJ3JkdERheXMnIH0sXG5cdFx0XHRcdERPTS50YWJsZSh7fSwgdGFibGVDaGlsZHJlbiApXG5cdFx0XHQpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBHZXQgYSBsaXN0IG9mIHRoZSBkYXlzIG9mIHRoZSB3ZWVrXG5cdFx0ICogZGVwZW5kaW5nIG9uIHRoZSBjdXJyZW50IGxvY2FsZVxuXHRcdCAqIEByZXR1cm4ge2FycmF5fSBBIGxpc3Qgd2l0aCB0aGUgc2hvcnRuYW1lIG9mIHRoZSBkYXlzXG5cdFx0ICovXG5cdFx0Z2V0RGF5c09mV2VlazogZnVuY3Rpb24oIGxvY2FsZSApe1xuXHRcdFx0dmFyIGRheXMgPSBsb2NhbGUuX3dlZWtkYXlzTWluLFxuXHRcdFx0XHRmaXJzdCA9IGxvY2FsZS5maXJzdERheU9mV2VlaygpLFxuXHRcdFx0XHRkb3cgPSBbXSxcblx0XHRcdFx0aSA9IDBcblx0XHRcdDtcblxuXHRcdFx0ZGF5cy5mb3JFYWNoKCBmdW5jdGlvbiggZGF5ICl7XG5cdFx0XHRcdGRvd1sgKDcgKyAoaSsrKSAtIGZpcnN0KSAlIDcgXSA9IGRheTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gZG93O1xuXHRcdH0sXG5cblx0XHRyZW5kZXJEYXlzOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkYXRlID0gdGhpcy5wcm9wcy52aWV3RGF0ZSxcblx0XHRcdFx0c2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZSAmJiB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZS5jbG9uZSgpLFxuXHRcdFx0XHRwcmV2TW9udGggPSBkYXRlLmNsb25lKCkuc3VidHJhY3QoIDEsICdtb250aHMnICksXG5cdFx0XHRcdGN1cnJlbnRZZWFyID0gZGF0ZS55ZWFyKCksXG5cdFx0XHRcdGN1cnJlbnRNb250aCA9IGRhdGUubW9udGgoKSxcblx0XHRcdFx0d2Vla3MgPSBbXSxcblx0XHRcdFx0ZGF5cyA9IFtdLFxuXHRcdFx0XHRyZW5kZXJlciA9IHRoaXMucHJvcHMucmVuZGVyRGF5IHx8IHRoaXMucmVuZGVyRGF5LFxuXHRcdFx0XHRpc1ZhbGlkID0gdGhpcy5wcm9wcy5pc1ZhbGlkRGF0ZSB8fCB0aGlzLmlzVmFsaWREYXRlLFxuXHRcdFx0XHRjbGFzc2VzLCBkaXNhYmxlZCwgZGF5UHJvcHMsIGN1cnJlbnREYXRlXG5cdFx0XHQ7XG5cblx0XHRcdC8vIEdvIHRvIHRoZSBsYXN0IHdlZWsgb2YgdGhlIHByZXZpb3VzIG1vbnRoXG5cdFx0XHRwcmV2TW9udGguZGF0ZSggcHJldk1vbnRoLmRheXNJbk1vbnRoKCkgKS5zdGFydE9mKCd3ZWVrJyk7XG5cdFx0XHR2YXIgbGFzdERheSA9IHByZXZNb250aC5jbG9uZSgpLmFkZCg0MiwgJ2QnKTtcblxuXHRcdFx0d2hpbGUgKCBwcmV2TW9udGguaXNCZWZvcmUoIGxhc3REYXkgKSApe1xuXHRcdFx0XHRjbGFzc2VzID0gJ3JkdERheSc7XG5cdFx0XHRcdGN1cnJlbnREYXRlID0gcHJldk1vbnRoLmNsb25lKCk7XG5cblx0XHRcdFx0aWYgKCAoIHByZXZNb250aC55ZWFyKCkgPT09IGN1cnJlbnRZZWFyICYmIHByZXZNb250aC5tb250aCgpIDwgY3VycmVudE1vbnRoICkgfHwgKCBwcmV2TW9udGgueWVhcigpIDwgY3VycmVudFllYXIgKSApXG5cdFx0XHRcdFx0Y2xhc3NlcyArPSAnIHJkdE9sZCc7XG5cdFx0XHRcdGVsc2UgaWYgKCAoIHByZXZNb250aC55ZWFyKCkgPT09IGN1cnJlbnRZZWFyICYmIHByZXZNb250aC5tb250aCgpID4gY3VycmVudE1vbnRoICkgfHwgKCBwcmV2TW9udGgueWVhcigpID4gY3VycmVudFllYXIgKSApXG5cdFx0XHRcdFx0Y2xhc3NlcyArPSAnIHJkdE5ldyc7XG5cblx0XHRcdFx0aWYgKCBzZWxlY3RlZCAmJiBwcmV2TW9udGguaXNTYW1lKHNlbGVjdGVkLCAnZGF5JykgKVxuXHRcdFx0XHRcdGNsYXNzZXMgKz0gJyByZHRBY3RpdmUnO1xuXG5cdFx0XHRcdGlmIChwcmV2TW9udGguaXNTYW1lKG1vbWVudCgpLCAnZGF5JykgKVxuXHRcdFx0XHRcdGNsYXNzZXMgKz0gJyByZHRUb2RheSc7XG5cblx0XHRcdFx0ZGlzYWJsZWQgPSAhaXNWYWxpZCggY3VycmVudERhdGUsIHNlbGVjdGVkICk7XG5cdFx0XHRcdGlmICggZGlzYWJsZWQgKVxuXHRcdFx0XHRcdGNsYXNzZXMgKz0gJyByZHREaXNhYmxlZCc7XG5cblx0XHRcdFx0ZGF5UHJvcHMgPSB7XG5cdFx0XHRcdFx0a2V5OiBwcmV2TW9udGguZm9ybWF0KCdNX0QnKSxcblx0XHRcdFx0XHQnZGF0YS12YWx1ZSc6IHByZXZNb250aC5kYXRlKCksXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiBjbGFzc2VzXG5cdFx0XHRcdH07XG5cdFx0XHRcdGlmICggIWRpc2FibGVkIClcblx0XHRcdFx0XHRkYXlQcm9wcy5vbkNsaWNrID0gdGhpcy51cGRhdGVTZWxlY3RlZERhdGU7XG5cblx0XHRcdFx0ZGF5cy5wdXNoKCByZW5kZXJlciggZGF5UHJvcHMsIGN1cnJlbnREYXRlLCBzZWxlY3RlZCApICk7XG5cblx0XHRcdFx0aWYgKCBkYXlzLmxlbmd0aCA9PT0gNyApe1xuXHRcdFx0XHRcdHdlZWtzLnB1c2goIERPTS50cigge2tleTogcHJldk1vbnRoLmZvcm1hdCgnTV9EJyl9LCBkYXlzICkgKTtcblx0XHRcdFx0XHRkYXlzID0gW107XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwcmV2TW9udGguYWRkKCAxLCAnZCcgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHdlZWtzO1xuXHRcdH0sXG5cblx0XHR1cGRhdGVTZWxlY3RlZERhdGU6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdHRoaXMucHJvcHMudXBkYXRlU2VsZWN0ZWREYXRlKGV2ZW50LCB0cnVlKTtcblx0XHR9LFxuXG5cdFx0cmVuZGVyRGF5OiBmdW5jdGlvbiggcHJvcHMsIGN1cnJlbnREYXRlICl7XG5cdFx0XHRyZXR1cm4gRE9NLnRkKCBwcm9wcywgY3VycmVudERhdGUuZGF0ZSgpICk7XG5cdFx0fSxcblxuXHRcdHJlbmRlckZvb3RlcjogZnVuY3Rpb24oKXtcblx0XHRcdGlmICggIXRoaXMucHJvcHMudGltZUZvcm1hdCApXG5cdFx0XHRcdHJldHVybiAnJztcblxuXHRcdFx0dmFyIGRhdGUgPSB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZSB8fCB0aGlzLnByb3BzLnZpZXdEYXRlO1xuXG5cdFx0XHRyZXR1cm4gRE9NLnRmb290KHsga2V5OiAndGYnfSxcblx0XHRcdFx0RE9NLnRyKHt9LFxuXHRcdFx0XHRcdERPTS50ZCh7IG9uQ2xpY2s6IHRoaXMucHJvcHMuc2hvd1ZpZXcoJ3RpbWUnKSwgY29sU3BhbjogNywgY2xhc3NOYW1lOiAncmR0VGltZVRvZ2dsZSd9LCBkYXRlLmZvcm1hdCggdGhpcy5wcm9wcy50aW1lRm9ybWF0ICkpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fSxcblx0XHRpc1ZhbGlkRGF0ZTogZnVuY3Rpb24oKXsgcmV0dXJuIDE7IH1cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBEYXRlVGltZVBpY2tlckRheXM7XG5cblxuLyoqKi8gfSxcbi8qIDQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X187XG5cbi8qKiovIH0sXG4vKiA1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFJlYWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgRE9NID0gUmVhY3QuRE9NO1xuXHR2YXIgRGF0ZVRpbWVQaWNrZXJNb250aHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBET00uZGl2KHsgY2xhc3NOYW1lOiAncmR0TW9udGhzJyB9LCBbXG5cdFx0XHRcdERPTS50YWJsZSh7IGtleTogJ2EnfSwgRE9NLnRoZWFkKHt9LCBET00udHIoe30sIFtcblx0XHRcdFx0XHRET00udGgoeyBrZXk6ICdwcmV2JywgY2xhc3NOYW1lOiAncmR0UHJldicgfSwgRE9NLnNwYW4oe29uQ2xpY2s6IHRoaXMucHJvcHMuc3VidHJhY3RUaW1lKDEsICd5ZWFycycpfSwgJ+KAuScpKSxcblx0XHRcdFx0XHRET00udGgoeyBrZXk6ICd5ZWFyJywgY2xhc3NOYW1lOiAncmR0U3dpdGNoJywgb25DbGljazogdGhpcy5wcm9wcy5zaG93VmlldygneWVhcnMnKSwgY29sU3BhbjogMiwgJ2RhdGEtdmFsdWUnOiB0aGlzLnByb3BzLnZpZXdEYXRlLnllYXIoKX0sIHRoaXMucHJvcHMudmlld0RhdGUueWVhcigpICksXG5cdFx0XHRcdFx0RE9NLnRoKHsga2V5OiAnbmV4dCcsIGNsYXNzTmFtZTogJ3JkdE5leHQnIH0sIERPTS5zcGFuKHtvbkNsaWNrOiB0aGlzLnByb3BzLmFkZFRpbWUoMSwgJ3llYXJzJyl9LCAn4oC6JykpXG5cdFx0XHRcdF0pKSksXG5cdFx0XHRcdERPTS50YWJsZSh7IGtleTogJ21vbnRocyd9LCBET00udGJvZHkoeyBrZXk6ICdiJ30sIHRoaXMucmVuZGVyTW9udGhzKCkpKVxuXHRcdFx0XSk7XG5cdFx0fSxcblxuXHRcdHJlbmRlck1vbnRoczogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGF0ZSA9IHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlLFxuXHRcdFx0XHRtb250aCA9IHRoaXMucHJvcHMudmlld0RhdGUubW9udGgoKSxcblx0XHRcdFx0eWVhciA9IHRoaXMucHJvcHMudmlld0RhdGUueWVhcigpLFxuXHRcdFx0XHRyb3dzID0gW10sXG5cdFx0XHRcdGkgPSAwLFxuXHRcdFx0XHRtb250aHMgPSBbXSxcblx0XHRcdFx0cmVuZGVyZXIgPSB0aGlzLnByb3BzLnJlbmRlck1vbnRoIHx8IHRoaXMucmVuZGVyTW9udGgsXG5cdFx0XHRcdGNsYXNzZXMsIHByb3BzXG5cdFx0XHQ7XG5cblx0XHRcdHdoaWxlIChpIDwgMTIpIHtcblx0XHRcdFx0Y2xhc3NlcyA9ICdyZHRNb250aCc7XG5cdFx0XHRcdGlmICggZGF0ZSAmJiBpID09PSBtb250aCAmJiB5ZWFyID09PSBkYXRlLnllYXIoKSApXG5cdFx0XHRcdFx0Y2xhc3NlcyArPSAnIHJkdEFjdGl2ZSc7XG5cblx0XHRcdFx0cHJvcHMgPSB7XG5cdFx0XHRcdFx0a2V5OiBpLFxuXHRcdFx0XHRcdCdkYXRhLXZhbHVlJzogaSxcblx0XHRcdFx0XHRjbGFzc05hbWU6IGNsYXNzZXMsXG5cdFx0XHRcdFx0b25DbGljazogdGhpcy5wcm9wcy51cGRhdGVPbiA9PT0gJ21vbnRocyc/IHRoaXMudXBkYXRlU2VsZWN0ZWRNb250aCA6IHRoaXMucHJvcHMuc2V0RGF0ZSgnbW9udGgnKVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdG1vbnRocy5wdXNoKCByZW5kZXJlciggcHJvcHMsIGksIHllYXIsIGRhdGUgJiYgZGF0ZS5jbG9uZSgpICkpO1xuXG5cdFx0XHRcdGlmICggbW9udGhzLmxlbmd0aCA9PT0gNCApe1xuXHRcdFx0XHRcdHJvd3MucHVzaCggRE9NLnRyKHsga2V5OiBtb250aCArICdfJyArIHJvd3MubGVuZ3RoIH0sIG1vbnRocykgKTtcblx0XHRcdFx0XHRtb250aHMgPSBbXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGkrKztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJvd3M7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZVNlbGVjdGVkTW9udGg6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdHRoaXMucHJvcHMudXBkYXRlU2VsZWN0ZWREYXRlKGV2ZW50LCB0cnVlKTtcblx0XHR9LFxuXG5cdFx0cmVuZGVyTW9udGg6IGZ1bmN0aW9uKCBwcm9wcywgbW9udGggKSB7XG5cdFx0XHR2YXIgbW9udGhzU2hvcnQgPSB0aGlzLnByb3BzLnZpZXdEYXRlLmxvY2FsZURhdGEoKS5fbW9udGhzU2hvcnQ7XG5cdFx0XHRyZXR1cm4gRE9NLnRkKCBwcm9wcywgbW9udGhzU2hvcnQuc3RhbmRhbG9uZVxuXHRcdFx0XHQ/IGNhcGl0YWxpemUoIG1vbnRoc1Nob3J0LnN0YW5kYWxvbmVbIG1vbnRoIF0gKVxuXHRcdFx0XHQ6IG1vbnRoc1Nob3J0WyBtb250aCBdXG5cdFx0XHQpO1xuXHRcdH1cblx0fSk7XG5cblx0ZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIpIHtcblx0XHRyZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBEYXRlVGltZVBpY2tlck1vbnRocztcblxuXG4vKioqLyB9LFxuLyogNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBSZWFjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIERPTSA9IFJlYWN0LkRPTTtcblx0dmFyIERhdGVUaW1lUGlja2VyWWVhcnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB5ZWFyID0gcGFyc2VJbnQodGhpcy5wcm9wcy52aWV3RGF0ZS55ZWFyKCkgLyAxMCwgMTApICogMTA7XG5cblx0XHRcdHJldHVybiBET00uZGl2KHsgY2xhc3NOYW1lOiAncmR0WWVhcnMnIH0sIFtcblx0XHRcdFx0RE9NLnRhYmxlKHsga2V5OiAnYSd9LCBET00udGhlYWQoe30sIERPTS50cih7fSwgW1xuXHRcdFx0XHRcdERPTS50aCh7IGtleTogJ3ByZXYnLCBjbGFzc05hbWU6ICdyZHRQcmV2JyB9LCBET00uc3Bhbih7b25DbGljazogdGhpcy5wcm9wcy5zdWJ0cmFjdFRpbWUoMTAsICd5ZWFycycpfSwgJ+KAuScpKSxcblx0XHRcdFx0XHRET00udGgoeyBrZXk6ICd5ZWFyJywgY2xhc3NOYW1lOiAncmR0U3dpdGNoJywgb25DbGljazogdGhpcy5wcm9wcy5zaG93VmlldygneWVhcnMnKSwgY29sU3BhbjogMiB9LCB5ZWFyICsgJy0nICsgKHllYXIgKyA5KSApLFxuXHRcdFx0XHRcdERPTS50aCh7IGtleTogJ25leHQnLCBjbGFzc05hbWU6ICdyZHROZXh0J30sIERPTS5zcGFuKHtvbkNsaWNrOiB0aGlzLnByb3BzLmFkZFRpbWUoMTAsICd5ZWFycycpfSwgJ+KAuicpKVxuXHRcdFx0XHRcdF0pKSksXG5cdFx0XHRcdERPTS50YWJsZSh7IGtleTogJ3llYXJzJ30sIERPTS50Ym9keSh7fSwgdGhpcy5yZW5kZXJZZWFycyggeWVhciApKSlcblx0XHRcdF0pO1xuXHRcdH0sXG5cblx0XHRyZW5kZXJZZWFyczogZnVuY3Rpb24oIHllYXIgKSB7XG5cdFx0XHR2YXIgeWVhcnMgPSBbXSxcblx0XHRcdFx0aSA9IC0xLFxuXHRcdFx0XHRyb3dzID0gW10sXG5cdFx0XHRcdHJlbmRlcmVyID0gdGhpcy5wcm9wcy5yZW5kZXJZZWFyIHx8IHRoaXMucmVuZGVyWWVhcixcblx0XHRcdFx0c2VsZWN0ZWREYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RlZERhdGUsXG5cdFx0XHRcdGNsYXNzZXMsIHByb3BzXG5cdFx0XHQ7XG5cblx0XHRcdHllYXItLTtcblx0XHRcdHdoaWxlIChpIDwgMTEpIHtcblx0XHRcdFx0Y2xhc3NlcyA9ICdyZHRZZWFyJztcblx0XHRcdFx0aWYgKCBpID09PSAtMSB8IGkgPT09IDEwIClcblx0XHRcdFx0XHRjbGFzc2VzICs9ICcgcmR0T2xkJztcblx0XHRcdFx0aWYgKCBzZWxlY3RlZERhdGUgJiYgc2VsZWN0ZWREYXRlLnllYXIoKSA9PT0geWVhciApXG5cdFx0XHRcdFx0Y2xhc3NlcyArPSAnIHJkdEFjdGl2ZSc7XG5cblx0XHRcdFx0cHJvcHMgPSB7XG5cdFx0XHRcdFx0a2V5OiB5ZWFyLFxuXHRcdFx0XHRcdCdkYXRhLXZhbHVlJzogeWVhcixcblx0XHRcdFx0XHRjbGFzc05hbWU6IGNsYXNzZXMsXG5cdFx0XHRcdFx0b25DbGljazogdGhpcy5wcm9wcy51cGRhdGVPbiA9PT0gJ3llYXJzJyA/IHRoaXMudXBkYXRlU2VsZWN0ZWRZZWFyIDogdGhpcy5wcm9wcy5zZXREYXRlKCd5ZWFyJylcblx0XHRcdFx0fTtcblxuXHRcdFx0XHR5ZWFycy5wdXNoKCByZW5kZXJlciggcHJvcHMsIHllYXIsIHNlbGVjdGVkRGF0ZSAmJiBzZWxlY3RlZERhdGUuY2xvbmUoKSApKTtcblxuXHRcdFx0XHRpZiAoIHllYXJzLmxlbmd0aCA9PT0gNCApe1xuXHRcdFx0XHRcdHJvd3MucHVzaCggRE9NLnRyKHsga2V5OiBpIH0sIHllYXJzICkgKTtcblx0XHRcdFx0XHR5ZWFycyA9IFtdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0eWVhcisrO1xuXHRcdFx0XHRpKys7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByb3dzO1xuXHRcdH0sXG5cblx0XHR1cGRhdGVTZWxlY3RlZFllYXI6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdHRoaXMucHJvcHMudXBkYXRlU2VsZWN0ZWREYXRlKGV2ZW50LCB0cnVlKTtcblx0XHR9LFxuXG5cdFx0cmVuZGVyWWVhcjogZnVuY3Rpb24oIHByb3BzLCB5ZWFyICl7XG5cdFx0XHRyZXR1cm4gRE9NLnRkKCBwcm9wcywgeWVhciApO1xuXHRcdH1cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBEYXRlVGltZVBpY2tlclllYXJzO1xuXG5cbi8qKiovIH0sXG4vKiA3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFJlYWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKSxcblx0XHRhc3NpZ24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG5cdHZhciBET00gPSBSZWFjdC5ET007XG5cdHZhciBEYXRlVGltZVBpY2tlclRpbWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuIHRoaXMuY2FsY3VsYXRlU3RhdGUoIHRoaXMucHJvcHMgKTtcblx0XHR9LFxuXHRcdGNhbGN1bGF0ZVN0YXRlOiBmdW5jdGlvbiggcHJvcHMgKXtcblx0XHRcdHZhciBkYXRlID0gcHJvcHMuc2VsZWN0ZWREYXRlIHx8IHByb3BzLnZpZXdEYXRlLFxuXHRcdFx0XHRmb3JtYXQgPSBwcm9wcy50aW1lRm9ybWF0LFxuXHRcdFx0XHRjb3VudGVycyA9IFtdXG5cdFx0XHQ7XG5cblx0XHRcdGlmICggZm9ybWF0LmluZGV4T2YoJ0gnKSAhPT0gLTEgfHwgZm9ybWF0LmluZGV4T2YoJ2gnKSAhPT0gLTEgKXtcblx0XHRcdFx0Y291bnRlcnMucHVzaCgnaG91cnMnKTtcblx0XHRcdFx0aWYgKCBmb3JtYXQuaW5kZXhPZignbScpICE9PSAtMSApe1xuXHRcdFx0XHRcdGNvdW50ZXJzLnB1c2goJ21pbnV0ZXMnKTtcblx0XHRcdFx0XHRpZiAoIGZvcm1hdC5pbmRleE9mKCdzJykgIT09IC0xICl7XG5cdFx0XHRcdFx0XHRjb3VudGVycy5wdXNoKCdzZWNvbmRzJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciBkYXlwYXJ0ID0gZmFsc2U7XG5cdFx0XHRpZiAoIHRoaXMucHJvcHMudGltZUZvcm1hdC5pbmRleE9mKCcgQScpICE9PSAtMSAgJiYgdGhpcy5zdGF0ZSAhPT0gbnVsbCApe1xuXHRcdFx0XHRkYXlwYXJ0ID0gKCB0aGlzLnN0YXRlLmhvdXJzID49IDEyICkgPyAnUE0nIDogJ0FNJztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aG91cnM6IGRhdGUuZm9ybWF0KCdIJyksXG5cdFx0XHRcdG1pbnV0ZXM6IGRhdGUuZm9ybWF0KCdtbScpLFxuXHRcdFx0XHRzZWNvbmRzOiBkYXRlLmZvcm1hdCgnc3MnKSxcblx0XHRcdFx0bWlsbGlzZWNvbmRzOiBkYXRlLmZvcm1hdCgnU1NTJyksXG5cdFx0XHRcdGRheXBhcnQ6IGRheXBhcnQsXG5cdFx0XHRcdGNvdW50ZXJzOiBjb3VudGVyc1xuXHRcdFx0fTtcblx0XHR9LFxuXHRcdHJlbmRlckNvdW50ZXI6IGZ1bmN0aW9uKCB0eXBlICl7XG5cdFx0XHRpZiAodHlwZSAhPT0gJ2RheXBhcnQnKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IHRoaXMuc3RhdGVbIHR5cGUgXTtcblx0XHRcdFx0aWYgKHR5cGUgPT09ICdob3VycycgJiYgdGhpcy5wcm9wcy50aW1lRm9ybWF0LmluZGV4T2YoJyBBJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSAodmFsdWUgLSAxKSAlIDEyICsgMTtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSAxMjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIERPTS5kaXYoeyBrZXk6IHR5cGUsIGNsYXNzTmFtZTogJ3JkdENvdW50ZXInfSwgW1xuXHRcdFx0XHRcdERPTS5zcGFuKHsga2V5Oid1cCcsIGNsYXNzTmFtZTogJ3JkdEJ0bicsIG9uTW91c2VEb3duOiB0aGlzLm9uU3RhcnRDbGlja2luZyggJ2luY3JlYXNlJywgdHlwZSApIH0sICfilrInICksXG5cdFx0XHRcdFx0RE9NLmRpdih7IGtleTonYycsIGNsYXNzTmFtZTogJ3JkdENvdW50JyB9LCB2YWx1ZSApLFxuXHRcdFx0XHRcdERPTS5zcGFuKHsga2V5OidkbycsIGNsYXNzTmFtZTogJ3JkdEJ0bicsIG9uTW91c2VEb3duOiB0aGlzLm9uU3RhcnRDbGlja2luZyggJ2RlY3JlYXNlJywgdHlwZSApIH0sICfilrwnIClcblx0XHRcdFx0XSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fSxcblx0XHRyZW5kZXJEYXlQYXJ0OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBET00uZGl2KHsgY2xhc3NOYW1lOiAncmR0Q291bnRlcicsIGtleTogJ2RheVBhcnQnfSwgW1xuXHRcdFx0XHRET00uc3Bhbih7IGtleTondXAnLCBjbGFzc05hbWU6ICdyZHRCdG4nLCBvbk1vdXNlRG93bjogdGhpcy5vblN0YXJ0Q2xpY2tpbmcoICd0b2dnbGVEYXlQYXJ0JywgJ2hvdXJzJykgfSwgJ+KWsicgKSxcblx0XHRcdFx0RE9NLmRpdih7IGtleTogdGhpcy5zdGF0ZS5kYXlwYXJ0LCBjbGFzc05hbWU6ICdyZHRDb3VudCd9LCB0aGlzLnN0YXRlLmRheXBhcnQgKSxcblx0XHRcdFx0RE9NLnNwYW4oeyBrZXk6J2RvJywgY2xhc3NOYW1lOiAncmR0QnRuJywgb25Nb3VzZURvd246IHRoaXMub25TdGFydENsaWNraW5nKCAndG9nZ2xlRGF5UGFydCcsICdob3VycycpIH0sICfilrwnIClcblx0XHRcdF0pO1xuXHRcdH0sXG5cdFx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBtZSA9IHRoaXMsXG5cdFx0XHRcdGNvdW50ZXJzID0gW11cblx0XHRcdDtcblxuXHRcdFx0dGhpcy5zdGF0ZS5jb3VudGVycy5mb3JFYWNoKCBmdW5jdGlvbihjKXtcblx0XHRcdFx0aWYgKCBjb3VudGVycy5sZW5ndGggKVxuXHRcdFx0XHRcdGNvdW50ZXJzLnB1c2goIERPTS5kaXYoIHtrZXk6ICdzZXAnICsgY291bnRlcnMubGVuZ3RoLCBjbGFzc05hbWU6ICdyZHRDb3VudGVyU2VwYXJhdG9yJyB9LCAnOicgKSk7XG5cdFx0XHRcdGNvdW50ZXJzLnB1c2goIG1lLnJlbmRlckNvdW50ZXIoIGMgKSApO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICh0aGlzLnN0YXRlLmRheXBhcnQgIT09IGZhbHNlKSB7XG5cdFx0XHRcdGNvdW50ZXJzLnB1c2goIG1lLnJlbmRlckRheVBhcnQoKSApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHRoaXMuc3RhdGUuY291bnRlcnMubGVuZ3RoID09PSAzICYmIHRoaXMucHJvcHMudGltZUZvcm1hdC5pbmRleE9mKCdTJykgIT09IC0xICl7XG5cdFx0XHRcdGNvdW50ZXJzLnB1c2goIERPTS5kaXYoIHtjbGFzc05hbWU6ICdyZHRDb3VudGVyU2VwYXJhdG9yJywga2V5OiAnc2VwNScgfSwgJzonICkpO1xuXHRcdFx0XHRjb3VudGVycy5wdXNoKFxuXHRcdFx0XHRcdERPTS5kaXYoIHtjbGFzc05hbWU6ICdyZHRDb3VudGVyIHJkdE1pbGxpJywga2V5OidtJ30sXG5cdFx0XHRcdFx0XHRET00uaW5wdXQoeyB2YWx1ZTogdGhpcy5zdGF0ZS5taWxsaXNlY29uZHMsIHR5cGU6ICd0ZXh0Jywgb25DaGFuZ2U6IHRoaXMudXBkYXRlTWlsbGkgfSlcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gRE9NLmRpdigge2NsYXNzTmFtZTogJ3JkdFRpbWUnfSxcblx0XHRcdFx0RE9NLnRhYmxlKCB7fSwgW1xuXHRcdFx0XHRcdHRoaXMucmVuZGVySGVhZGVyKCksXG5cdFx0XHRcdFx0RE9NLnRib2R5KHtrZXk6ICdiJ30sIERPTS50cih7fSwgRE9NLnRkKHt9LFxuXHRcdFx0XHRcdFx0RE9NLmRpdih7IGNsYXNzTmFtZTogJ3JkdENvdW50ZXJzJyB9LCBjb3VudGVycyApXG5cdFx0XHRcdFx0KSkpXG5cdFx0XHRcdF0pXG5cdFx0XHQpO1xuXHRcdH0sXG5cdFx0Y29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBtZSA9IHRoaXM7XG5cdFx0XHRtZS50aW1lQ29uc3RyYWludHMgPSB7XG5cdFx0XHRcdGhvdXJzOiB7XG5cdFx0XHRcdFx0bWluOiAwLFxuXHRcdFx0XHRcdG1heDogMjMsXG5cdFx0XHRcdFx0c3RlcDogMVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRtaW51dGVzOiB7XG5cdFx0XHRcdFx0bWluOiAwLFxuXHRcdFx0XHRcdG1heDogNTksXG5cdFx0XHRcdFx0c3RlcDogMVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWNvbmRzOiB7XG5cdFx0XHRcdFx0bWluOiAwLFxuXHRcdFx0XHRcdG1heDogNTksXG5cdFx0XHRcdFx0c3RlcDogMSxcblx0XHRcdFx0fSxcblx0XHRcdFx0bWlsbGlzZWNvbmRzOiB7XG5cdFx0XHRcdFx0bWluOiAwLFxuXHRcdFx0XHRcdG1heDogOTk5LFxuXHRcdFx0XHRcdHN0ZXA6IDFcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdFsnaG91cnMnLCAnbWludXRlcycsICdzZWNvbmRzJywgJ21pbGxpc2Vjb25kcyddLmZvckVhY2goZnVuY3Rpb24odHlwZSkge1xuXHRcdFx0XHRhc3NpZ24obWUudGltZUNvbnN0cmFpbnRzW3R5cGVdLCBtZS5wcm9wcy50aW1lQ29uc3RyYWludHNbdHlwZV0pO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnNldFN0YXRlKCB0aGlzLmNhbGN1bGF0ZVN0YXRlKCB0aGlzLnByb3BzICkgKTtcblx0XHR9LFxuXHRcdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKCBuZXh0UHJvcHMgKXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoIHRoaXMuY2FsY3VsYXRlU3RhdGUoIG5leHRQcm9wcyApICk7XG5cdFx0fSxcblx0XHR1cGRhdGVNaWxsaTogZnVuY3Rpb24oIGUgKXtcblx0XHRcdHZhciBtaWxsaSA9IHBhcnNlSW50KCBlLnRhcmdldC52YWx1ZSwgMTAgKTtcblx0XHRcdGlmICggbWlsbGkgPT09IGUudGFyZ2V0LnZhbHVlICYmIG1pbGxpID49IDAgJiYgbWlsbGkgPCAxMDAwICl7XG5cdFx0XHRcdHRoaXMucHJvcHMuc2V0VGltZSggJ21pbGxpc2Vjb25kcycsIG1pbGxpICk7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyBtaWxsaXNlY29uZHM6IG1pbGxpIH0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cmVuZGVySGVhZGVyOiBmdW5jdGlvbigpe1xuXHRcdFx0aWYgKCAhdGhpcy5wcm9wcy5kYXRlRm9ybWF0IClcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHRcdHZhciBkYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RlZERhdGUgfHwgdGhpcy5wcm9wcy52aWV3RGF0ZTtcblx0XHRcdHJldHVybiBET00udGhlYWQoeyBrZXk6ICdoJ30sIERPTS50cih7fSxcblx0XHRcdFx0RE9NLnRoKCB7Y2xhc3NOYW1lOiAncmR0U3dpdGNoJywgY29sU3BhbjogNCwgb25DbGljazogdGhpcy5wcm9wcy5zaG93VmlldygnZGF5cycpfSwgZGF0ZS5mb3JtYXQoIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCApIClcblx0XHRcdCkpO1xuXHRcdH0sXG5cdFx0b25TdGFydENsaWNraW5nOiBmdW5jdGlvbiggYWN0aW9uLCB0eXBlICl7XG5cdFx0XHR2YXIgbWUgPSB0aGlzO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIHVwZGF0ZSA9IHt9O1xuXHRcdFx0XHR1cGRhdGVbIHR5cGUgXSA9IG1lWyBhY3Rpb24gXSggdHlwZSApO1xuXHRcdFx0XHRtZS5zZXRTdGF0ZSggdXBkYXRlICk7XG5cblx0XHRcdFx0bWUudGltZXIgPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdG1lLmluY3JlYXNlVGltZXIgPSBzZXRJbnRlcnZhbCggZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHVwZGF0ZVsgdHlwZSBdID0gbWVbIGFjdGlvbiBdKCB0eXBlICk7XG5cdFx0XHRcdFx0XHRtZS5zZXRTdGF0ZSggdXBkYXRlICk7XG5cdFx0XHRcdFx0fSwgNzApO1xuXHRcdFx0XHR9LCA1MDApO1xuXG5cdFx0XHRcdG1lLm1vdXNlVXBMaXN0ZW5lciA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KCBtZS50aW1lciApO1xuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoIG1lLmluY3JlYXNlVGltZXIgKTtcblx0XHRcdFx0XHRtZS5wcm9wcy5zZXRUaW1lKCB0eXBlLCBtZS5zdGF0ZVsgdHlwZSBdICk7XG5cdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbWUubW91c2VVcExpc3RlbmVyKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtZS5tb3VzZVVwTGlzdGVuZXIpO1xuXHRcdFx0fTtcblx0XHR9LFxuXHRcdHBhZFZhbHVlczoge1xuXHRcdFx0aG91cnM6IDEsXG5cdFx0XHRtaW51dGVzOiAyLFxuXHRcdFx0c2Vjb25kczogMixcblx0XHRcdG1pbGxpc2Vjb25kczogM1xuXHRcdH0sXG5cdFx0dG9nZ2xlRGF5UGFydDogZnVuY3Rpb24oIHR5cGUgKXsgLy8gdHlwZSBpcyBhbHdheXMgJ2hvdXJzJ1xuXHRcdFx0dmFyIHZhbHVlID0gcGFyc2VJbnQodGhpcy5zdGF0ZVsgdHlwZSBdLCAxMCkgKyAxMjtcblx0XHRcdGlmICggdmFsdWUgPiB0aGlzLnRpbWVDb25zdHJhaW50c1sgdHlwZSBdLm1heCApXG5cdFx0XHRcdHZhbHVlID0gdGhpcy50aW1lQ29uc3RyYWludHNbIHR5cGUgXS5taW4gKyAodmFsdWUgLSAodGhpcy50aW1lQ29uc3RyYWludHNbIHR5cGUgXS5tYXggKyAxKSk7XG5cdFx0XHRyZXR1cm4gdGhpcy5wYWQoIHR5cGUsIHZhbHVlICk7XG5cdFx0fSxcblx0XHRpbmNyZWFzZTogZnVuY3Rpb24oIHR5cGUgKXtcblx0XHRcdHZhciB2YWx1ZSA9IHBhcnNlSW50KHRoaXMuc3RhdGVbIHR5cGUgXSwgMTApICsgdGhpcy50aW1lQ29uc3RyYWludHNbIHR5cGUgXS5zdGVwO1xuXHRcdFx0aWYgKCB2YWx1ZSA+IHRoaXMudGltZUNvbnN0cmFpbnRzWyB0eXBlIF0ubWF4IClcblx0XHRcdFx0dmFsdWUgPSB0aGlzLnRpbWVDb25zdHJhaW50c1sgdHlwZSBdLm1pbiArICggdmFsdWUgLSAoIHRoaXMudGltZUNvbnN0cmFpbnRzWyB0eXBlIF0ubWF4ICArIDEpICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5wYWQoIHR5cGUsIHZhbHVlICk7XG5cdFx0fSxcblx0XHRkZWNyZWFzZTogZnVuY3Rpb24oIHR5cGUgKXtcblx0XHRcdHZhciB2YWx1ZSA9IHBhcnNlSW50KHRoaXMuc3RhdGVbIHR5cGUgXSwgMTApIC0gdGhpcy50aW1lQ29uc3RyYWludHNbIHR5cGUgXS5zdGVwO1xuXHRcdFx0aWYgKCB2YWx1ZSA8IHRoaXMudGltZUNvbnN0cmFpbnRzWyB0eXBlIF0ubWluIClcblx0XHRcdFx0dmFsdWUgPSB0aGlzLnRpbWVDb25zdHJhaW50c1sgdHlwZSBdLm1heCArIDEgLSAoIHRoaXMudGltZUNvbnN0cmFpbnRzWyB0eXBlIF0ubWluIC0gdmFsdWUgKTtcblx0XHRcdHJldHVybiB0aGlzLnBhZCggdHlwZSwgdmFsdWUgKTtcblx0XHR9LFxuXHRcdHBhZDogZnVuY3Rpb24oIHR5cGUsIHZhbHVlICl7XG5cdFx0XHR2YXIgc3RyID0gdmFsdWUgKyAnJztcblx0XHRcdHdoaWxlICggc3RyLmxlbmd0aCA8IHRoaXMucGFkVmFsdWVzWyB0eXBlIF0gKVxuXHRcdFx0XHRzdHIgPSAnMCcgKyBzdHI7XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBEYXRlVGltZVBpY2tlclRpbWU7XG5cblxuLyoqKi8gfSxcbi8qIDggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvLyBUaGlzIGlzIGV4dHJhY3RlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9Qb21heC9yZWFjdC1vbmNsaWNrb3V0c2lkZVxuXHQvLyBBbmQgbW9kaWZpZWQgdG8gc3VwcG9ydCByZWFjdCAwLjEzIGFuZCByZWFjdCAwLjE0XG5cblx0dmFyIFJlYWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKSxcblx0XHR2ZXJzaW9uID0gUmVhY3QudmVyc2lvbiAmJiBSZWFjdC52ZXJzaW9uLnNwbGl0KCcuJylcblx0O1xuXG5cdGlmICggdmVyc2lvbiAmJiAoIHZlcnNpb25bMF0gPiAwIHx8IHZlcnNpb25bMV0gPiAxMyApIClcblx0XHRSZWFjdCA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5cblx0Ly8gVXNlIGEgcGFyYWxsZWwgYXJyYXkgYmVjYXVzZSB3ZSBjYW4ndCB1c2Vcblx0Ly8gb2JqZWN0cyBhcyBrZXlzLCB0aGV5IGdldCB0b1N0cmluZy1jb2VyY2VkXG5cdHZhciByZWdpc3RlcmVkQ29tcG9uZW50cyA9IFtdO1xuXHR2YXIgaGFuZGxlcnMgPSBbXTtcblxuXHR2YXIgSUdOT1JFX0NMQVNTID0gJ2lnbm9yZS1yZWFjdC1vbmNsaWNrb3V0c2lkZSc7XG5cblx0dmFyIGlzU291cmNlRm91bmQgPSBmdW5jdGlvbihzb3VyY2UsIGxvY2FsTm9kZSkge1xuXHQgaWYgKHNvdXJjZSA9PT0gbG9jYWxOb2RlKSB7XG5cdCAgIHJldHVybiB0cnVlO1xuXHQgfVxuXHQgLy8gU1ZHIDx1c2UvPiBlbGVtZW50cyBkbyBub3QgdGVjaG5pY2FsbHkgcmVzaWRlIGluIHRoZSByZW5kZXJlZCBET00sIHNvXG5cdCAvLyB0aGV5IGRvIG5vdCBoYXZlIGNsYXNzTGlzdCBkaXJlY3RseSwgYnV0IHRoZXkgb2ZmZXIgYSBsaW5rIHRvIHRoZWlyXG5cdCAvLyBjb3JyZXNwb25kaW5nIGVsZW1lbnQsIHdoaWNoIGNhbiBoYXZlIGNsYXNzTGlzdC4gVGhpcyBleHRyYSBjaGVjayBpcyBmb3Jcblx0IC8vIHRoYXQgY2FzZS5cblx0IC8vIFNlZTogaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvc3RydWN0Lmh0bWwjSW50ZXJmYWNlU1ZHVXNlRWxlbWVudFxuXHQgLy8gRGlzY3Vzc2lvbjogaHR0cHM6Ly9naXRodWIuY29tL1BvbWF4L3JlYWN0LW9uY2xpY2tvdXRzaWRlL3B1bGwvMTdcblx0IGlmIChzb3VyY2UuY29ycmVzcG9uZGluZ0VsZW1lbnQpIHtcblx0ICAgcmV0dXJuIHNvdXJjZS5jb3JyZXNwb25kaW5nRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoSUdOT1JFX0NMQVNTKTtcblx0IH1cblx0IHJldHVybiBzb3VyY2UuY2xhc3NMaXN0LmNvbnRhaW5zKElHTk9SRV9DTEFTUyk7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG5cdCAgIGlmICh0eXBlb2YgdGhpcy5oYW5kbGVDbGlja091dHNpZGUgIT09ICdmdW5jdGlvbicpXG5cdCAgICAgdGhyb3cgbmV3IEVycm9yKCdDb21wb25lbnQgbGFja3MgYSBoYW5kbGVDbGlja091dHNpZGUoZXZlbnQpIGZ1bmN0aW9uIGZvciBwcm9jZXNzaW5nIG91dHNpZGUgY2xpY2sgZXZlbnRzLicpO1xuXG5cdCAgIHZhciBmbiA9IHRoaXMuX19vdXRzaWRlQ2xpY2tIYW5kbGVyID0gKGZ1bmN0aW9uKGxvY2FsTm9kZSwgZXZlbnRIYW5kbGVyKSB7XG5cdCAgICAgcmV0dXJuIGZ1bmN0aW9uKGV2dCkge1xuXHQgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHQgICAgICAgdmFyIHNvdXJjZSA9IGV2dC50YXJnZXQ7XG5cdCAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcblx0ICAgICAgIC8vIElmIHNvdXJjZT1sb2NhbCB0aGVuIHRoaXMgZXZlbnQgY2FtZSBmcm9tIFwic29tZXdoZXJlXCJcblx0ICAgICAgIC8vIGluc2lkZSBhbmQgc2hvdWxkIGJlIGlnbm9yZWQuIFdlIGNvdWxkIGhhbmRsZSB0aGlzIHdpdGhcblx0ICAgICAgIC8vIGEgbGF5ZXJlZCBhcHByb2FjaCwgdG9vLCBidXQgdGhhdCByZXF1aXJlcyBnb2luZyBiYWNrIHRvXG5cdCAgICAgICAvLyB0aGlua2luZyBpbiB0ZXJtcyBvZiBEb20gbm9kZSBuZXN0aW5nLCBydW5uaW5nIGNvdW50ZXJcblx0ICAgICAgIC8vIHRvIFJlYWN0J3MgXCJ5b3Ugc2hvdWxkbid0IGNhcmUgYWJvdXQgdGhlIERPTVwiIHBoaWxvc29waHkuXG5cdCAgICAgICB3aGlsZSAoc291cmNlLnBhcmVudE5vZGUpIHtcblx0ICAgICAgICAgZm91bmQgPSBpc1NvdXJjZUZvdW5kKHNvdXJjZSwgbG9jYWxOb2RlKTtcblx0ICAgICAgICAgaWYgKGZvdW5kKSByZXR1cm47XG5cdCAgICAgICAgIHNvdXJjZSA9IHNvdXJjZS5wYXJlbnROb2RlO1xuXHQgICAgICAgfVxuXHQgICAgICAgZXZlbnRIYW5kbGVyKGV2dCk7XG5cdCAgICAgfTtcblx0ICAgfShSZWFjdC5maW5kRE9NTm9kZSh0aGlzKSwgdGhpcy5oYW5kbGVDbGlja091dHNpZGUpKTtcblxuXHQgICB2YXIgcG9zID0gcmVnaXN0ZXJlZENvbXBvbmVudHMubGVuZ3RoO1xuXHQgICByZWdpc3RlcmVkQ29tcG9uZW50cy5wdXNoKHRoaXMpO1xuXHQgICBoYW5kbGVyc1twb3NdID0gZm47XG5cblx0ICAgLy8gSWYgdGhlcmUgaXMgYSB0cnV0aHkgZGlzYWJsZU9uQ2xpY2tPdXRzaWRlIHByb3BlcnR5IGZvciB0aGlzXG5cdCAgIC8vIGNvbXBvbmVudCwgZG9uJ3QgaW1tZWRpYXRlbHkgc3RhcnQgbGlzdGVuaW5nIGZvciBvdXRzaWRlIGV2ZW50cy5cblx0ICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVPbkNsaWNrT3V0c2lkZSkge1xuXHQgICAgIHRoaXMuZW5hYmxlT25DbGlja091dHNpZGUoKTtcblx0ICAgfVxuXHQgfSxcblxuXHQgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuXHQgICB0aGlzLmRpc2FibGVPbkNsaWNrT3V0c2lkZSgpO1xuXHQgICB0aGlzLl9fb3V0c2lkZUNsaWNrSGFuZGxlciA9IGZhbHNlO1xuXHQgICB2YXIgcG9zID0gcmVnaXN0ZXJlZENvbXBvbmVudHMuaW5kZXhPZih0aGlzKTtcblx0ICAgaWYgKCBwb3M+LTEpIHtcblx0ICAgICBpZiAoaGFuZGxlcnNbcG9zXSkge1xuXHQgICAgICAgLy8gY2xlYW4gdXAgc28gd2UgZG9uJ3QgbGVhayBtZW1vcnlcblx0ICAgICAgIGhhbmRsZXJzLnNwbGljZShwb3MsIDEpO1xuXHQgICAgICAgcmVnaXN0ZXJlZENvbXBvbmVudHMuc3BsaWNlKHBvcywgMSk7XG5cdCAgICAgfVxuXHQgICB9XG5cdCB9LFxuXG5cdCAvKipcblx0ICAqIENhbiBiZSBjYWxsZWQgdG8gZXhwbGljaXRseSBlbmFibGUgZXZlbnQgbGlzdGVuaW5nXG5cdCAgKiBmb3IgY2xpY2tzIGFuZCB0b3VjaGVzIG91dHNpZGUgb2YgdGhpcyBlbGVtZW50LlxuXHQgICovXG5cdCBlbmFibGVPbkNsaWNrT3V0c2lkZTogZnVuY3Rpb24oKSB7XG5cdCAgIHZhciBmbiA9IHRoaXMuX19vdXRzaWRlQ2xpY2tIYW5kbGVyO1xuXHQgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmbik7XG5cdCAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmbik7XG5cdCB9LFxuXG5cdCAvKipcblx0ICAqIENhbiBiZSBjYWxsZWQgdG8gZXhwbGljaXRseSBkaXNhYmxlIGV2ZW50IGxpc3RlbmluZ1xuXHQgICogZm9yIGNsaWNrcyBhbmQgdG91Y2hlcyBvdXRzaWRlIG9mIHRoaXMgZWxlbWVudC5cblx0ICAqL1xuXHQgZGlzYWJsZU9uQ2xpY2tPdXRzaWRlOiBmdW5jdGlvbigpIHtcblx0ICAgdmFyIGZuID0gdGhpcy5fX291dHNpZGVDbGlja0hhbmRsZXI7XG5cdCAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZuKTtcblx0ICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZuKTtcblx0IH1cblx0fTtcblxuXG4vKioqLyB9LFxuLyogOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuLyoqKi8gfVxuLyoqKioqKi8gXSlcbn0pO1xuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVhY3QtZGF0ZXRpbWUuanMubWFwIl0sImZpbGUiOiJyZWFjdC1kYXRldGltZS5qcyJ9
