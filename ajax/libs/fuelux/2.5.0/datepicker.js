/*
 * Fuel UX Datepicker
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2013 ExactTarget
 * Licensed under the MIT license.
 */

define(['require','jquery'],function (require) {

	var $   = require('jquery');
	var old = $.fn.datepicker;

	// DATEPICKER CONSTRUCTOR AND PROTOTYPE

	var Datepicker = function (element, options) {
		this.$element = $(element);

		this.options = $.extend(true, {}, $.fn.datepicker.defaults, options);

		this.formatDate    = ( Boolean( this.options.createInput ) && Boolean( this.options.createInput.native ) ) ? this.formatNativeDate : this.options.formatDate || this.formatDate;
		this.parseDate     = this.options.parseDate || this.parseDate;
		this.blackoutDates = this.options.blackoutDates || this.blackoutDates;

		this.date = this.options.date || new Date();
		this.date = this.parseDate( this.date );

		this.viewDate   = new Date( this.date.valueOf() );
		this.stagedDate = new Date( this.date.valueOf() );
		this.viewDate.setHours( 0,0,0,0 );
		this.stagedDate.setHours( 0,0,0,0 );

		this.done      = false;
		this.callbacks = [];

		this.minDate = new Date();
		this.minDate.setDate( this.minDate.getDate() - 1 );
		this.minDate.setHours( 0,0,0,0 );

		this.maxDate = new Date();
		this.maxDate.setFullYear( this.maxDate.getFullYear() + 10 );
		this.maxDate.setHours( 23,59,59,999 );

		this.years = this._yearRange( this.viewDate );

		this.bindingsAdded = false;

		// OPTIONS
		this.options.dropdownWidth = this.options.dropdownWidth || 170;
		this.options.monthNames    = this.options.monthNames || [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
		this.options.weekdays      = this.options.weekdays || [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

		this.options.showYears  = false;
		this.options.showDays   = true;
		this.options.showMonths = false;

		this.options.restrictLastMonth = Boolean( this.options.restrictDateSelection );
		this.options.restrictNextMonth = false;

		this.months = [
			{ abbreviation: this.options.monthNames[0], 'class': '', number: 0 },
			{ abbreviation: this.options.monthNames[1], 'class': '', number: 1 },
			{ abbreviation: this.options.monthNames[2], 'class': '', number: 2 },
			{ abbreviation: this.options.monthNames[3], 'class': '', number: 3 },
			{ abbreviation: this.options.monthNames[4], 'class': '', number: 4 },
			{ abbreviation: this.options.monthNames[5], 'class': '', number: 5 },
			{ abbreviation: this.options.monthNames[6], 'class': '', number: 6 },
			{ abbreviation: this.options.monthNames[7], 'class': '', number: 7 },
			{ abbreviation: this.options.monthNames[8], 'class': '', number: 8 },
			{ abbreviation: this.options.monthNames[9], 'class': '', number: 9 },
			{ abbreviation: this.options.monthNames[10], 'class': '', number: 10 },
			{ abbreviation: this.options.monthNames[11], 'class': '', number: 11 }
		];

		if( Boolean( this.options.createInput ) ) {
			if( typeof this.options.createInput === "boolean" && Boolean( this.options.createInput ) ) {
				this.options.createInput = {};
			}

			if( typeof this.options.createInput === 'object' && isNaN( this.options.createInput.length ) ) {
				this.options.createInput.inputSize = this.options.createInput.inputSize || 'span3';
				this._renderInput();
			} else {
				throw new Error( 'createInput option needs to be an object or boolean true' );
			}
		} else {
			this._render();
		}
	};

	Datepicker.prototype = {

		constructor: Datepicker,

		// functions that can be called on object
		disable: function() {
			this.$element.find('input, button').attr( 'disabled', true );
		},

		enable: function() {
			this.$element.find('input, button').attr( 'disabled', false );
		},

		getFormattedDate: function() {
			return this.formatDate( this.date );
		},

		getDate: function( options ) {
			if( Boolean( options ) && Boolean( options.unix ) ) {
				return this.date.getTime();
			} else {
				return this.date;
			}
		},

		setDate: function( date, inputUpdate ) {
			inputUpdate     = inputUpdate || false;
			this.date       = this.parseDate( date, inputUpdate );
			this.stagedDate = new Date( this.date );
			this.viewDate   = new Date( this.date );
			this._render();
			this.$element.trigger( 'changed', this.date );
			return this.date;
		},

		formatDate: function( date ) {
			// this.pad to is function on extension
			return this.padTwo( date.getMonth() + 1 ) + '-' + this.padTwo( date.getDate() ) + '-' + date.getFullYear();
		},

		formatNativeDate: function( date ) {
			return date.getFullYear() + '-' + this.padTwo( date.getMonth() + 1 ) + '-' + this.padTwo( date.getDate() );
		},

		//some code ripped from http://stackoverflow.com/questions/2182246/javascript-dates-in-ie-nan-firefox-chrome-ok
		parseDate: function( date, inputUpdate ) {
			var dt, isoExp, month, parts;

			if( Boolean( date) && new Date( date ) !== 'Invalid Date' ) {
				if( typeof( date ) === 'string' && !inputUpdate  ) {
					date   = date.split( 'T' )[ 0 ];
					isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/;
					dt     = new Date( NaN );
					parts  = isoExp.exec( date );

					if( parts ) {
						month = +parts[ 2 ];
						dt.setFullYear( parts[ 1 ], month - 1, parts[ 3 ] );
						if( month !== dt.getMonth() + 1 ) {
								dt.setTime( NaN );
						}
					}
					return dt;
				}
				return new Date( date );
			} else {
				throw new Error( 'could not parse date' );
			}
		},

		blackoutDates: function( date ) {
			date = date;
			return false;
		},

		padTwo: function( value ) {
			var s = '0' + value;
			return s.substr( s.length - 2 );
		},

		_restrictDateSelectionSetup: function() {
			var scopedLastMonth, scopedNextMonth;
			if( Boolean( this.options ) ) {
				if( !this.options.restrictDateSelection ) {
					scopedLastMonth = false;
					scopedNextMonth = false;
				} else {
					scopedNextMonth = ( this.viewDate.getMonth() < new Date().getMonth() ) ? true : false;
					scopedLastMonth = ( this.viewDate.getMonth() > new Date().getMonth() ) ? false : true;
				}
			}
			this.options.restrictLastMonth = scopedLastMonth;
			this.options.restrictNextMonth = scopedNextMonth;
		},

		_repeat: function( head, collection, iterator, tail) {
			var value = head;
			for (var i = 0, ii = collection.length; i < ii; i++) {
				value += iterator( collection[i] );
			}
			value += tail;
			return value;
		},

		_getDaysInMonth: function( month, year ) {
			return 32 - new Date( year, month, 32 ).getDate();
		},

		_range: function( start, end ) {
			var numbers = [];
			for ( var i = start; i < end; i++ ) {
				numbers[ numbers.length ] = i;
			}
			return numbers;
		},

		_yearRange: function( date ) {
			var start    = ( Math.floor(date.getFullYear() / 10 ) * 10) - 1;
			var end      = start + 12;
			var years    = this._range(start, end);
			var interval = [];

			for (var i = 0, ii = years.length; i < ii; i++) {
				var clazz = '';
				if( i === 0 ) {
					clazz = 'previous';
				}
				if( i === years.length - 1 ) {
					clazz = 'next';
				}
				interval[i] = {
					number: years[ i ],
					'class': clazz
				};
			}
			return interval;
		},

		_killEvent: function( e ) {
			e.stopPropagation();
			e.preventDefault();
			return false;
		},

		_applySize: function( elements, size ) {
			for (var i = 0; i < elements.length; i++) {
				$(elements[ i ]).css({
					'width': size,
					'height': size,
					'line-height': size
				});
			}
		},

		_show: function( show ) {
			return show ? '' : 'display: none;';
		},

		_hide: function( hide ) {
			return this._show( !hide );
		},

		_runCallbacks: function() {
			for (var i = 0; i < this.callbacks.length; i++) {
				this.callbacks[ i ]( this.date );
			}
		},

		_showView: function( view ) {
			if( view === 1 ) {
				this.options.showDays   = true;
				this.options.showMonths = false;
				this.options.showYears  = false;
			} else if( view === 2 ) {
				this.options.showDays   = false;
				this.options.showMonths = true;
				this.options.showYears  = false;
			} else if( view === 3 ) {
				this.options.showDays   = false;
				this.options.showMonths = false;
				this.options.showYears  = true;
			}
		},

		_updateCalendarData: function() {
			var viewedMonth            = this.viewDate.getMonth();
			var viewedYear             = this.viewDate.getFullYear();
			var selectedDay            = this.stagedDate.getDate();
			var selectedMonth          = this.stagedDate.getMonth();
			var selectedYear           = this.stagedDate.getFullYear();
			var firstDayOfMonthWeekday = new Date( viewedYear, viewedMonth, 1 ).getDay();
			var lastDayOfMonth         = this._getDaysInMonth( viewedMonth, viewedYear );
			var lastDayOfLastMonth     = this._getDaysInMonth( viewedMonth - 1, viewedYear );

			if( firstDayOfMonthWeekday === 0 ) {
				firstDayOfMonthWeekday = 7;
			}

			var addToEnd = ( 42 - lastDayOfMonth ) - firstDayOfMonthWeekday;

			this.daysOfLastMonth = this._range( lastDayOfLastMonth - firstDayOfMonthWeekday + 1, lastDayOfLastMonth + 1 );
			this.daysOfNextMonth = this._range( 1, addToEnd + 1 );

			// blackout functionality for dates of last month on current calendar view
			for( var x = 0, xx = this.daysOfLastMonth.length; x < xx; x++ ) {
				var tmpLastMonthDaysObj        = {};
				tmpLastMonthDaysObj.number     = this.daysOfLastMonth[ x ];
				tmpLastMonthDaysObj[ 'class' ] = '';

				if( Boolean( this.blackoutDates( new Date( viewedYear, viewedMonth + 1, this.daysOfLastMonth[ x ], 0, 0, 0, 0 ) ) ) ) {
					tmpLastMonthDaysObj[ 'class' ] = 'restrict blackout';
				}

				this.daysOfLastMonth[ x ] = tmpLastMonthDaysObj;
			}

			// blackout functionality for dates of next month on current calendar view
			for( var b = 0, bb = this.daysOfNextMonth.length; b < bb; b++ ) {
				var tmpNextMonthDaysObj        = {};
				tmpNextMonthDaysObj.number     = this.daysOfNextMonth[ b ];
				tmpNextMonthDaysObj[ 'class' ] = '';

				if( Boolean( this.blackoutDates( new Date( viewedYear, viewedMonth + 1, this.daysOfNextMonth[ b ], 0, 0, 0, 0 ) ) ) ) {
					tmpNextMonthDaysObj[ 'class' ] = 'restrict blackout';
				}

				this.daysOfNextMonth[ b ] = tmpNextMonthDaysObj;
			}

			var now                  = new Date();
			var currentDay           = now.getDate();
			var currentMonth         = now.getMonth();
			var currentYear          = now.getFullYear();
			var viewingCurrentMonth  = viewedMonth === currentMonth;
			var viewingCurrentYear   = viewedYear === currentYear;
			var viewingSelectedMonth = viewedMonth === selectedMonth;
			var viewingSelectedYear  = viewedYear === selectedYear;

			var daysOfThisMonth  = this._range( 1, lastDayOfMonth + 1 );
			this.daysOfThisMonth = [];

			for( var i = 0, ii = daysOfThisMonth.length; i < ii; i++) {

				var weekDay      = new Date(viewedYear, viewedMonth, daysOfThisMonth[ i ]).getDay();
				var weekDayClass = 'weekday';

				if(weekDay === 6 || weekDay === 0) {
					weekDayClass = 'weekend';
				}
				if( weekDay === 1 ) {
					weekDayClass = '';
				}
				weekDayClass += ' weekday' + weekDay;

				if( daysOfThisMonth[ i ] === selectedDay && viewingSelectedMonth && viewingSelectedYear ) {
					weekDayClass += ' selected';
				} else if( daysOfThisMonth[ i ] === currentDay && viewingCurrentMonth && viewingCurrentYear ) {
					weekDayClass += ' today';
				}

				var dt = new Date( viewedYear, viewedMonth, daysOfThisMonth[ i ], 0, 0, 0, 0 );
				if( dt <= this.minDate || dt >= this.maxDate ) {
					if ( Boolean( this.blackoutDates( dt ) ) ) {
						weekDayClass += ' restrict blackout';
					} else if ( Boolean( this.options ) && Boolean( this.options.restrictDateSelection ) ) {
						weekDayClass += ' restrict';
					} else {
						weekDayClass += ' past';
					}
				} else if(  Boolean( this.blackoutDates( dt ) ) ) {
					weekDayClass += ' restrict blackout';
				}

				this.daysOfThisMonth[ this.daysOfThisMonth.length ] = {
					'number': daysOfThisMonth[ i ],
					'class' : weekDayClass
				};
			}

			var daysInMonth = this._getDaysInMonth( this.minDate.getFullYear(), this.minDate.getMonth() );
			for( var j = 0, jj = this.months.length; j < jj; j++ ) {

				this.months[ j ][ 'class' ] = '';
				if( viewingCurrentYear && j === currentMonth ) {
					this.months[ j ][ 'class' ] += ' today';
				}
				if( j === selectedMonth && viewingSelectedYear ) {
					this.months[ j ][ 'class' ] += ' selected';
				}

				var minDt = new Date( viewedYear, j, daysInMonth, 23, 59, 59, 999 );
				var maxDt = new Date( viewedYear, j, 0, 0, 0, 0, 0 );
				if( minDt <= this.minDate || maxDt >= this.maxDate ) {
					if( Boolean( this.options.restrictDateSelection ) ) {
						this.months[ j ][ 'class' ] += ' restrict';
					}
				}
			}

			this.years  = this._yearRange( this.viewDate);
			daysInMonth = this._getDaysInMonth( this.minDate.getFullYear(), 11 );

			for( var z = 0, zz = this.years.length; z < zz; z++ ) {
				if( this.years[ z ].number === currentYear ) {
					this.years[ z ][ 'class' ] += ' today';
				}
				if( this.years[ z ].number === selectedYear ) {
					this.years[ z ][ 'class' ] += ' selected';
				}

				var minDt2 = new Date( this.years[ z ].number, 11, daysInMonth, 23, 59, 59, 999);
				var maxDt2 = new Date( this.years[ z ].number, 0, 0, 0, 0, 0, 0);
				if( minDt2 <= this.minDate || maxDt2 >= this.maxDate ) {
					if( Boolean( this.options.restrictDateSelection ) ) {
						this.years[ z ]['class'] += ' restrict';
					}
				}
			}
		},

		_updateCss: function() {
			while( this.options.dropdownWidth % 7 !== 0 ) {
				this.options.dropdownWidth++;
			}

			this.$view.css('width', this.options.dropdownWidth + 'px' );
			this.$header.css('width', this.options.dropdownWidth + 'px' );
			this.$labelDiv.css('width', ( this.options.dropdownWidth - 60 ) + 'px' );
			this.$footer.css('width', this.options.dropdownWidth + 'px' );
			var labelSize     = ( this.options.dropdownWidth * 0.25 ) - 2;
			var paddingTop    = Math.round( ( this.options.dropdownWidth - ( labelSize * 3 ) ) / 2 );
			var paddingBottom = paddingTop;
			while( paddingBottom + paddingTop + ( labelSize * 3 ) < this.options.dropdownWidth ) {
				paddingBottom += 0.1;
			}
			while( paddingBottom + paddingTop + ( labelSize * 3 ) > this.options.dropdownWidth ) {
				paddingBottom -= 0.1;
			}
			
			this.$calendar.css({
				'float': 'left'
			});

			this.$monthsView.css({
				'width': this.options.dropdownWidth + 'px',
				'padding-top': paddingTop + 'px',
				'padding-bottom': paddingBottom + 'px'
			});

			this.$yearsView.css({
				'width': this.options.dropdownWidth + 'px',
				'padding-top': paddingTop + 'px',
				'padding-bottom': paddingBottom + 'px'
			});

			var cellSize       = Math.round( this.options.dropdownWidth / 7.0 ) - 2 + 'px';
			var headerCellSize = Math.round( this.options.dropdownWidth / 7.0 ) + 'px';
			this._applySize( this.$yearsView.children(), labelSize + 'px' );
			this._applySize( this.$monthsView.children(), labelSize + 'px' );
			this._applySize( this.$weekdaysDiv.children(), headerCellSize );
			this._applySize( this.$lastMonthDiv.children(), cellSize );
			this._applySize( this.$thisMonthDiv.children(), cellSize );
			this._applySize( this.$nextMonthDiv.children(), cellSize );
		},

		_close: function() {
			this.$input.dropdown( 'toggle' );
		},

		_select: function( e ) {
			if( e.target.className.indexOf( 'restrict' ) > -1 ) {
				return this._killEvent(e);
			} else {
				this._killEvent( e );
				this._close();
			}

			this.stagedDate = this.viewDate;
			this.stagedDate.setDate( parseInt( e.target.innerHTML, 10 ) );

			this.setDate( this.stagedDate );
			this._render();
			this.done = true;
			this._runCallbacks();
		},

		_pickYear: function( e ) {
			var year = parseInt( $( e.target ).data( 'yearNumber' ), 10 );
			if( e.target.className.indexOf('restrict') > -1 ) {
				return this._killEvent(e);
			}

			this.viewDate = new Date( year, this.viewDate.getMonth(), 1 );
			this._showView( 2 );
			this._render();

			return this._killEvent(e);
		},

		_pickMonth: function( e ) {
			var month = parseInt( $(e.target).data( 'monthNumber' ), 10 );
			if( e.target.className.indexOf( 'restrict' ) > -1 ) {
				return this._killEvent(e);
			}

			this.viewDate = new Date( this.viewDate.getFullYear(), month, 1 );
			this._showView( 1 );
			this._render();

			return this._killEvent(e);
		},

		_previousSet: function( e ) {
			this._previous( e, true );
		},

		_previous: function( e, set ) {
			if( e.target.className.indexOf( 'restrict' ) > -1 ) {
				return this._killEvent(e);
			}
			
			if( this.options.showDays) {
				this.viewDate = new Date( this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1 );
			} else if( this.options.showMonths ) {
				this.viewDate = new Date( this.viewDate.getFullYear() - 1, this.viewDate.getMonth(), 1 );
			} else if( this.options.showYears ) {
				this.viewDate = new Date( this.viewDate.getFullYear() - 10, this.viewDate.getMonth(), 1 );
			}

			if( Boolean( set ) ) {
				this._select( e );
			} else {
				this._render();
			}
			// move this below 'this._render()' if you want it to go to the previous month when you select a day from the current month
			return this._killEvent( e );
		},

		_nextSet: function( e ) {
			this._next( e, true );
		},

		_next: function( e, set ) {
			if( e.target.className.indexOf('restrict') > -1 ) {
				return this._killEvent(e);
			}
			
			if( this.options.showDays ) {
				this.viewDate = new Date( this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1 );
			} else if( this.options.showMonths ) {
				this.viewDate = new Date( this.viewDate.getFullYear() + 1, this.viewDate.getMonth(), 1 );
			} else if( this.options.showYears ) {
				this.viewDate = new Date( this.viewDate.getFullYear() + 10, this.viewDate.getMonth(), 1 );
			}

			if( Boolean( set ) ) {
				this._select( e );
			} else {
				this._render();
			}
			// move this below 'this._render()' if you want it to go to the next month when you select a day from the current month
			return this._killEvent(e);
		},

		_today: function( e ) {
			this.viewDate = new Date();
			this._showView( 1 );
			this._render();
			return this._killEvent(e);
		},

		_emptySpace: function( e ) {
			if( Boolean( this.done ) ) {
				this.done = false;
			}
			return this._killEvent(e);
		},

		_monthLabel: function() {
			return this.options.monthNames[ this.viewDate.getMonth() ];
		},

		_yearLabel: function() {
			return this.viewDate.getFullYear();
		},

		_monthYearLabel: function() {
			var label;
			if( this.options.showDays ) {
				label = this._monthLabel() + ' ' + this._yearLabel();
			} else if( this.options.showMonths ) {
				label = this._yearLabel();
			} else if( this.options.showYears ) {
				label = this.years[ 0 ].number + ' - ' + this.years[ this.years.length - 1 ].number;
			}
			return label;
		},

		_toggleMonthYearPicker: function( e ) {
			if( this.options.showDays ) {
				this._showView( 2 );
			} else if( this.options.showMonths ) {
				this._showView( 3 );
			} else if( this.options.showYears ) {
				this._showView( 1 );
			}
			this._render();
			return this._killEvent( e );
		},

		_renderCalendar: function() {
			var self = this;
			self._restrictDateSelectionSetup();

			return '<div class="calendar">' +
				'<div class="header clearfix">' +
					'<div class="left hover"><div class="leftArrow"></div></div>' +
					'<div class="right hover"><div class="rightArrow"></div></div>' +
					'<div class="center hover">' + self._monthYearLabel() + '</div>' +
				'</div>' +
				'<div class="daysView" style="' + self._show( self.options.showDays ) + '">' +

					self._repeat( '<div class="weekdays">', self.options.weekdays,
						function( weekday ) {
							return '<div >' + weekday + '</div>';
						}, '</div>' ) +

					self._repeat( '<div class="lastmonth">', self.daysOfLastMonth,
						function( day ) {
							if( self.options.restrictLastMonth ) {
								day['class'] = day['class'].replace('restrict', '') + " restrict";
							}
							return '<div class="' + day[ 'class' ] + '">' + day.number + '</div>';
						}, '</div>' ) +

					self._repeat( '<div class="thismonth">', self.daysOfThisMonth,
						function( day ) {
							return '<div class="' + day[ 'class' ] + '">' + day.number + '</div>';
						}, '</div>' ) +

					self._repeat( '<div class="nextmonth">', self.daysOfNextMonth,
						function( day ) {
							if( self.options.restrictNextMonth ) {
								day['class'] = day['class'].replace('restrict', '') + " restrict";
							}
							return '<div class="' + day[ 'class' ] + '">' + day.number + '</div>';
						}, '</div>' ) +
				'</div>' +

				self._repeat( '<div class="monthsView" style="' + self._show( self.options.showMonths ) + '">', self.months,
					function( month ) {
						return '<div data-month-number="' + month.number +
							'" class="' + month[ 'class' ] + '">' + month.abbreviation + '</div>';
					}, '</div>' ) +

				self._repeat( '<div class="yearsView" style="' + self._show( self.options.showYears ) + '">', self.years,
					function( year ) {
						return '<div data-year-number="' + year.number +
							'" class="' + year[ 'class' ] + '">' + year.number + '</div>';
					}, '</div>' ) +

				'<div class="footer">' +
					'<div class="center hover">Today</div>' +
				'</div>' +
			'</div>';
		},

		_render: function() {
			this._insertDateIntoInput();
			this._updateCalendarData();
			if ( Boolean( this.bindingsAdded ) ) this._removeBindings();
			this.$element.find( '.dropdown-menu' ).html( this._renderCalendar() );
			this._initializeCalendarElements();
			this._addBindings();
			this._updateCss();
		},

		_renderInput: function() {
			var input = ( Boolean( this.options.createInput.native ) ) ? this._renderInputNative() : this._renderInputHTML();
			this.$element.html( input );
			this._render();
		},

		_renderInputNative: function() {
			return '<input type="date" value="' + this.formatDate( this.date ) + '"' + this._calculateInputSize( [ 'native' ] ) + '>';
		},

		_renderInputHTML: function() {
			var inputClass = ( Boolean( this.options.createInput.dropDownBtn ) ) ? 'input-append' : 'input-group';

			var dropdownHtml = '<div class="' + inputClass + '">' +
						'<div class="dropdown-menu"></div>' +
						'<input type="text" '+ this._calculateInputSize() +' value="'+this.formatDate( this.date ) +'" data-toggle="dropdown">';
			
			if( Boolean( this.options.createInput.dropDownBtn ) ) {
				dropdownHtml = dropdownHtml + '<button type="button" class="btn" data-toggle="dropdown"><i class="icon-calendar"></i></button>';
			}

			dropdownHtml = dropdownHtml + '</div>';

			return '<div class="datepicker dropdown">' + dropdownHtml + '</div>';
		},

		_calculateInputSize: function( options ) {
			if( Boolean( parseInt( this.options.createInput.inputSize, 10 ) ) ) {
				return 'style="width:'+ this.options.createInput.inputSize +'px"';
			} else {
				options = ( Boolean( options ) ) ? " " + options.join(' ') : '';
				return 'class="' + this.options.createInput.inputSize + options + '"';
			}

		},

		_insertDateIntoInput: function() {
			this.$element.find('input[type="text"]').val( this.formatDate( this.date ) );
		},

		_keyupDateUpdate: function( e ) {
			var validLength = this.formatDate( this.date ).length;
			var inputValue  = this.$input.val();

			if( validLength === inputValue.length && this._checkKeyCode( e ) ) {
				this.setDate( inputValue, true );
			}
		},

		_checkKeyCode: function( e ) {
			// only allow numbers, function keys, and date formatting symbols
			// Allow: Ctrl+A
			// Allow: home, end, left, right
			if ( $.inArray( e.keyCode, [ 46,8,9,27,13,32 ] ) !== -1 || ( e.keyCode === 65 && e.ctrlKey === true ) || ( e.keyCode >= 35 && e.keyCode <= 39 ) ) {
				// let it happen, don't do anything
				return false;
			} else if ( e.shiftKey || ( e.keyCode >= 48 || e.keyCode <= 57 ) || ( e.keyCode >= 96 || e.keyCode <= 105 ) || e.keyCode === 110 ||  e.keyCode === 190 || e.keyCode === 191 ) {
				// Ensure that it is a number and return true
				return true;
			} else {
				return false;
			}
		},

		_initializeCalendarElements: function() {
			this.$input        = this.$element.find( 'input[type="text"]' );
			this.$calendar     = this.$element.find('div.calendar');
			this.$header       = this.$calendar.children().eq(0);
			this.$labelDiv     = this.$header.children().eq(2);
			this.$view         = this.$calendar.children().eq(1);
			this.$monthsView   = this.$calendar.children().eq(2);
			this.$yearsView    = this.$calendar.children().eq(3);
			this.$weekdaysDiv  = this.$view.children().eq(0);
			this.$lastMonthDiv = this.$view.children().eq(1);
			this.$thisMonthDiv = this.$view.children().eq(2);
			this.$nextMonthDiv = this.$view.children().eq(3);
			this.$footer       = this.$calendar.children().eq(4);
		},

		_addBindings: function() {
			this.$input.on( 'keyup', $.proxy( this._keyupDateUpdate, this ) );
			this.$calendar.on( 'click', $.proxy( this._emptySpace, this) );

			this.$header.find( '.left' ).on( 'click', $.proxy( this._previous, this ) );
			this.$header.find( '.right' ).on( 'click', $.proxy( this._next, this ) );
			this.$header.find( '.center' ).on( 'click', $.proxy( this._toggleMonthYearPicker, this ) );

			this.$lastMonthDiv.find( 'div' ).on( 'click', $.proxy( this._previousSet, this ) );
			this.$thisMonthDiv.find( 'div' ).on( 'click', $.proxy( this._select, this ) );
			this.$nextMonthDiv.find( 'div' ).on( 'click', $.proxy( this._nextSet, this ) );

			this.$monthsView.find( 'div' ).on( 'click', $.proxy( this._pickMonth, this ) );
			this.$yearsView.find( 'div' ).on( 'click', $.proxy( this._pickYear, this ) );
			this.$footer.find( '.center' ).on( 'click', $.proxy( this._today, this ) );

			this.bindingsAdded = true;
		},

		_removeBindings: function() {
			this.$input.off( 'keyup' );
			this.$calendar.off( 'click' );

			this.$header.find( '.left' ).off( 'click' );
			this.$header.find( '.right' ).off( 'click' );
			this.$header.find( '.center' ).off( 'click' );

			this.$lastMonthDiv.find( 'div' ).off( 'click' );
			this.$thisMonthDiv.find( 'div' ).off( 'click' );
			this.$nextMonthDiv.find( 'div' ).off( 'click' );

			this.$monthsView.find( 'div' ).off( 'click' );
			this.$yearsView.find( 'div' ).off( 'click' );
			this.$footer.find( '.center' ).off( 'click' );

			this.bindingsAdded = false;
		}
	};


	// DATEPICKER PLUGIN DEFINITION

	$.fn.datepicker = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data( 'datepicker' );
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('datepicker', (data = new Datepicker( this, options ) ) );
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.datepicker.defaults = {
		date: new Date(),
		createInput: false,
		dropdownWidth: 170,
		restrictDateSelection: true
	};

	$.fn.datepicker.Constructor = Datepicker;

	$.fn.datepicker.noConflict = function () {
		$.fn.datepicker = old;
		return this;
	};
});