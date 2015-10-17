/*!
 * Fuel UX v3.0.1
 * Copyright 2012-2014 ExactTarget
 * Licensed under the BSD-3-Clause license ()
 */


// For more information on UMD visit: https://github.com/umdjs/umd/
( function( factory ) {
	if ( typeof define === 'function' && define.amd ) {
		define( [ 'jquery', 'bootstrap' ], factory );
	} else {
		factory( jQuery );
	}
}( function( jQuery ) {

	if ( typeof jQuery === 'undefined' ) {
		throw new Error( 'Fuel UX\'s JavaScript requires jQuery' )
	}

	if ( typeof jQuery.fn.dropdown === 'undefined' || typeof jQuery.fn.collapse === 'undefined' ) {
		throw new Error( 'Fuel UX\'s JavaScript requires Bootstrap' )
	}

	( function( $ ) {

		/*
		 * Fuel UX Checkbox
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.checkbox;

		// CHECKBOX CONSTRUCTOR AND PROTOTYPE

		var Checkbox = function( element, options ) {
			this.options = $.extend( {}, $.fn.checkbox.defaults, options );

			// cache elements
			this.$element = $( element ).is( 'input[type="checkbox"]' ) ? $( element ) : $( element ).find( 'input[type="checkbox"]:first' );
			this.$label = this.$element.parent();
			this.$parent = this.$label.parent( '.checkbox' );
			this.$toggleContainer = this.$element.attr( 'data-toggle' );
			this.state = {
				disabled: false,
				checked: false
			};

			if ( this.$parent.length === 0 ) {
				this.$parent = null;
			}

			if ( Boolean( this.$toggleContainer ) ) {
				this.$toggleContainer = $( this.$toggleContainer );
			} else {
				this.$toggleContainer = null;
			}

			// handle events
			this.$element.on( 'change.fu.checkbox', $.proxy( this.itemchecked, this ) );

			// set default state
			this.setState();
		};

		Checkbox.prototype = {

			constructor: Checkbox,

			setState: function( $chk ) {
				$chk = $chk || this.$element;

				this.state.disabled = Boolean( $chk.prop( 'disabled' ) );
				this.state.checked = Boolean( $chk.is( ':checked' ) );

				this._resetClasses();

				// set state of checkbox
				this._toggleCheckedState();
				this._toggleDisabledState();

				//toggle container
				this.toggleContainer();
			},

			enable: function() {
				this.state.disabled = false;
				this.$element.attr( 'disabled', false );
				this._resetClasses();
				this.$element.trigger( 'enabled.fu.checkbox' );
			},

			disable: function() {
				this.state.disabled = true;
				this.$element.attr( 'disabled', true );
				this._setDisabledClass();
				this.$element.trigger( 'disabled.fu.checkbox' );
			},

			check: function() {
				this.state.checked = true;
				this.$element.prop( 'checked', true );
				this._setCheckedClass();
				this.$element.trigger( 'checked.fu.checkbox' );
			},

			uncheck: function() {
				this.state.checked = false;
				this.$element.prop( 'checked', false );
				this._resetClasses();
				this.$element.trigger( 'unchecked.fu.checkbox' );
			},

			isChecked: function() {
				return this.state.checked;
			},

			toggle: function() {
				this.state.checked = !this.state.checked;

				this._toggleCheckedState();
			},

			toggleContainer: function() {
				if ( Boolean( this.$toggleContainer ) ) {
					if ( this.state.checked ) {
						this.$toggleContainer.removeClass( 'hide' );
						this.$toggleContainer.attr( 'aria-hidden', 'false' );
					} else {
						this.$toggleContainer.addClass( 'hide' );
						this.$toggleContainer.attr( 'aria-hidden', 'true' );
					}
				}
			},

			itemchecked: function( element ) {
				this.setState( $( element.target ) );
			},

			destroy: function() {
				this.$parent.remove();
				// remove any external bindings
				// [none]
				// empty elements to return to original markup
				// [none]
				return this.$parent[ 0 ].outerHTML;
			},

			_resetClasses: function() {
				var classesToRemove = [];

				if ( !this.state.checked ) {
					classesToRemove.push( 'checked' );
				}

				if ( !this.state.disabled ) {
					classesToRemove.push( 'disabled' );
				}

				classesToRemove = classesToRemove.join( ' ' );

				this.$label.removeClass( classesToRemove );

				if ( this.$parent ) {
					this.$parent.removeClass( classesToRemove );
				}
			},

			_toggleCheckedState: function() {
				if ( this.state.checked ) {
					this.check();
				} else {
					this.uncheck();
				}
			},

			_toggleDisabledState: function() {
				if ( this.state.disabled ) {
					this.disable();
				} else {
					this.enable();
				}
			},

			_setCheckedClass: function() {
				this.$label.addClass( 'checked' );

				if ( this.$parent ) {
					this.$parent.addClass( 'checked' );
				}
			},

			_setDisabledClass: function() {
				this.$label.addClass( 'disabled' );

				if ( this.$parent ) {
					this.$parent.addClass( 'disabled' );
				}
			}
		};


		// CHECKBOX PLUGIN DEFINITION

		$.fn.checkbox = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.checkbox' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.checkbox', ( data = new Checkbox( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.checkbox.defaults = {};

		$.fn.checkbox.Constructor = Checkbox;

		$.fn.checkbox.noConflict = function() {
			$.fn.checkbox = old;
			return this;
		};

		// DATA-API

		$( document ).on( 'mouseover.fu.checkbox.data-api', '[data-initialize=checkbox]', function( e ) {
			var $control = $( e.target ).closest( '.checkbox' ).find( '[type=checkbox]' );
			if ( !$control.data( 'fu.checkbox' ) ) {
				$control.checkbox( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=checkbox] [type=checkbox]' ).each( function() {
				var $this = $( this );
				if ( !$this.data( 'fu.checkbox' ) ) {
					$this.checkbox( $this.data() );
				}
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Combobox
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.combobox;


		// COMBOBOX CONSTRUCTOR AND PROTOTYPE

		var Combobox = function( element, options ) {
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.combobox.defaults, options );

			this.$dropMenu = this.$element.find( '.dropdown-menu' );
			this.$input = this.$element.find( 'input' );
			this.$button = this.$element.find( '.btn' );

			this.$element.on( 'click.fu.combobox', 'a', $.proxy( this.itemclicked, this ) );
			this.$element.on( 'change.fu.combobox', 'input', $.proxy( this.inputchanged, this ) );
			this.$element.on( 'shown.bs.dropdown', $.proxy( this.menuShown, this ) );

			// set default selection
			this.setDefaultSelection();
		};

		Combobox.prototype = {

			constructor: Combobox,

			destroy: function() {
				this.$element.remove();
				// remove any external bindings
				// [none]

				// set input value attrbute in markup
				this.$element.find( 'input' ).each( function() {
					$( this ).attr( 'value', $( this ).val() );
				} );

				// empty elements to return to original markup
				// [none]

				return this.$element[ 0 ].outerHTML;
			},

			doSelect: function( $item ) {
				if ( typeof $item[ 0 ] !== 'undefined' ) {
					this.$selectedItem = $item;
					this.$input.val( this.$selectedItem.text() );
				} else {
					this.$selectedItem = null;
				}
			},

			menuShown: function() {
				if ( this.options.autoResizeMenu ) {
					this.resizeMenu();
				}
			},

			resizeMenu: function() {
				var width = this.$element.outerWidth();
				this.$dropMenu.outerWidth( width );
			},

			selectedItem: function() {
				var item = this.$selectedItem;
				var data = {};

				if ( item ) {
					var txt = this.$selectedItem.text();
					data = $.extend( {
						text: txt
					}, this.$selectedItem.data() );
				} else {
					data = {
						text: this.$input.val()
					};
				}

				return data;
			},

			selectByText: function( text ) {
				var $item = $( [] );
				this.$element.find( 'li' ).each( function() {
					if ( ( this.textContent || this.innerText || $( this ).text() || '' ).toLowerCase() === ( text || '' ).toLowerCase() ) {
						$item = $( this );
						return false;
					}
				} );
				this.doSelect( $item );
			},

			selectByValue: function( value ) {
				var selector = 'li[data-value="' + value + '"]';
				this.selectBySelector( selector );
			},

			selectByIndex: function( index ) {
				// zero-based index
				var selector = 'li:eq(' + index + ')';
				this.selectBySelector( selector );
			},

			selectBySelector: function( selector ) {
				var $item = this.$element.find( selector );
				this.doSelect( $item );
			},

			setDefaultSelection: function() {
				var selector = 'li[data-selected=true]:first';
				var item = this.$element.find( selector );

				if ( item.length > 0 ) {
					// select by data-attribute
					this.selectBySelector( selector );
					item.removeData( 'selected' );
					item.removeAttr( 'data-selected' );
				}
			},

			enable: function() {
				this.$element.removeClass( 'disabled' );
				this.$input.removeAttr( 'disabled' );
				this.$button.removeClass( 'disabled' );
			},

			disable: function() {
				this.$element.addClass( 'disabled' );
				this.$input.attr( 'disabled', true );
				this.$button.addClass( 'disabled' );
			},

			itemclicked: function( e ) {
				this.$selectedItem = $( e.target ).parent();

				// set input text and trigger input change event marked as synthetic
				this.$input.val( this.$selectedItem.text() ).trigger( 'change', {
					synthetic: true
				} );

				// pass object including text and any data-attributes
				// to onchange event
				var data = this.selectedItem();

				// trigger changed event
				this.$element.trigger( 'changed.fu.combobox', data );

				e.preventDefault();

				// return focus to control after selecting an option
				this.$element.find( '.dropdown-toggle' ).focus();
			},

			inputchanged: function( e, extra ) {

				// skip processing for internally-generated synthetic event
				// to avoid double processing
				if ( extra && extra.synthetic ) return;

				var val = $( e.target ).val();
				this.selectByText( val );

				// find match based on input
				// if no match, pass the input value
				var data = this.selectedItem();
				if ( data.text.length === 0 ) {
					data = {
						text: val
					};
				}

				// trigger changed event
				this.$element.trigger( 'changed.fu.combobox', data );

			}

		};


		// COMBOBOX PLUGIN DEFINITION

		$.fn.combobox = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.combobox' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'fu.combobox', ( data = new Combobox( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.combobox.defaults = {
			autoResizeMenu: true
		};

		$.fn.combobox.Constructor = Combobox;

		$.fn.combobox.noConflict = function() {
			$.fn.combobox = old;
			return this;
		};

		// DATA-API

		$( document ).on( 'mousedown.fu.combobox.data-api', '[data-initialize=combobox]', function( e ) {
			var $control = $( e.target ).closest( '.combobox' );
			if ( !$control.data( 'fu.combobox' ) ) {
				$control.combobox( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=combobox]' ).each( function() {
				var $this = $( this );
				if ( !$this.data( 'fu.combobox' ) ) {
					$this.combobox( $this.data() );
				}
			} );
		} );


	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Datepicker
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var INVALID_DATE = 'Invalid Date';
		var MOMENT_NOT_AVAILABLE = 'moment.js is not available so you cannot use this function';

		var datepickerStack = [];
		var moment = false;
		var old = $.fn.datepicker;
		var requestedMoment = false;

		var runStack = function() {
			var i, l;
			requestedMoment = true;
			for ( i = 0, l = datepickerStack.length; i < l; i++ ) {
				datepickerStack[ i ].init.call( datepickerStack[ i ].scope );
			}
			datepickerStack = [];
		};

		//only load moment if it's there. otherwise we'll look for it in window.moment
		if ( typeof define === 'function' && define.amd ) { //check if AMD is available
			require( [ 'moment' ], function( amdMoment ) {
				moment = amdMoment;
				runStack();
			}, function( err ) {
				var failedId = err.requireModules && err.requireModules[ 0 ];
				if ( failedId === 'moment' ) {
					runStack();
				}
			} );
		} else {
			runStack();
		}

		// DATEPICKER CONSTRUCTOR AND PROTOTYPE

		var Datepicker = function( element, options ) {
			this.$element = $( element );
			this.options = $.extend( true, {}, $.fn.datepicker.defaults, options );

			this.$calendar = this.$element.find( '.datepicker-calendar' );
			this.$days = this.$calendar.find( '.datepicker-calendar-days' );
			this.$header = this.$calendar.find( '.datepicker-calendar-header' );
			this.$headerTitle = this.$header.find( '.title' );
			this.$input = this.$element.find( 'input' );
			this.$wheels = this.$element.find( '.datepicker-wheels' );
			this.$wheelsMonth = this.$element.find( '.datepicker-wheels-month' );
			this.$wheelsYear = this.$element.find( '.datepicker-wheels-year' );

			this.artificialScrolling = false;
			this.formatDate = this.options.formatDate || this.formatDate;
			this.inputValue = null;
			this.moment = false;
			this.momentFormat = null;
			this.parseDate = this.options.parseDate || this.parseDate;
			this.preventBlurHide = false;
			this.restricted = this.options.restricted || [];
			this.restrictedParsed = [];
			this.restrictedText = this.options.restrictedText;
			this.sameYearOnly = this.options.sameYearOnly;
			this.selectedDate = null;
			this.yearRestriction = null;

			this.$calendar.find( '.datepicker-today' ).on( 'click.fu.datepicker', $.proxy( this.todayClicked, this ) );
			this.$days.on( 'click.fu.datepicker', 'tr td button', $.proxy( this.dateClicked, this ) );
			this.$element.find( '.dropdown-menu' ).on( 'mousedown.fu.datepicker', $.proxy( this.dropdownMousedown, this ) );
			this.$header.find( '.next' ).on( 'click.fu.datepicker', $.proxy( this.next, this ) );
			this.$header.find( '.prev' ).on( 'click.fu.datepicker', $.proxy( this.prev, this ) );
			this.$headerTitle.on( 'click.fu.datepicker', $.proxy( this.titleClicked, this ) );
			this.$input.on( 'blur.fu.datepicker', $.proxy( this.inputBlurred, this ) );
			this.$input.on( 'focus.fu.datepicker', $.proxy( this.inputFocused, this ) );
			this.$wheels.find( '.datepicker-wheels-back' ).on( 'click.fu.datepicker', $.proxy( this.backClicked, this ) );
			this.$wheels.find( '.datepicker-wheels-select' ).on( 'click.fu.datepicker', $.proxy( this.selectClicked, this ) );
			this.$wheelsMonth.on( 'click.fu.datepicker', 'ul button', $.proxy( this.monthClicked, this ) );
			this.$wheelsYear.on( 'click.fu.datepicker', 'ul button', $.proxy( this.yearClicked, this ) );
			this.$wheelsYear.find( 'ul' ).on( 'scroll.fu.datepicker', $.proxy( this.onYearScroll, this ) );

			var init = function() {
				if ( this.checkForMomentJS() ) {
					moment = moment || window.moment; // need to pull in the global moment if they didn't do it via require
					this.moment = true;
					this.momentFormat = this.options.momentConfig.format;
					this.setCulture( this.options.momentConfig.culture );
				}

				this.setRestrictedDates( this.restricted );
				if ( !this.setDate( this.options.date ) ) {
					this.$input.val( '' );
					this.inputValue = this.$input.val();
				}
				if ( this.sameYearOnly ) {
					this.yearRestriction = ( this.selectedDate ) ? this.selectedDate.getFullYear() : new Date().getFullYear();
				}
			};

			if ( requestedMoment ) {
				init.call( this );
			} else {
				datepickerStack.push( {
					init: init,
					scope: this
				} );
			}
		};

		Datepicker.prototype = {

			constructor: Datepicker,

			backClicked: function() {
				this.changeView( 'calendar' );
			},

			changeView: function( view, date ) {
				if ( view === 'wheels' ) {
					this.$calendar.hide().attr( 'aria-hidden', 'true' );
					this.$wheels.show().removeAttr( 'aria-hidden', '' );
					if ( date ) {
						this.renderWheel( date );
					}
				} else {
					this.$wheels.hide().attr( 'aria-hidden', 'true' );
					this.$calendar.show().removeAttr( 'aria-hidden', '' );
					if ( date ) {
						this.renderMonth( date );
					}
				}
			},

			checkForMomentJS: function() {
				if (
					( $.isFunction( window.moment ) || ( typeof moment !== 'undefined' && $.isFunction( moment ) ) ) &&
					$.isPlainObject( this.options.momentConfig ) &&
					this.options.momentConfig.culture && this.options.momentConfig.format
				) {
					return true;
				} else {
					return false;
				}
			},

			dateClicked: function( e ) {
				var $td = $( e.currentTarget ).parents( 'td:first' );
				var date;

				if ( $td.hasClass( 'restricted' ) ) {
					return;
				}

				this.$days.find( 'td.selected' ).removeClass( 'selected' );
				$td.addClass( 'selected' );

				date = new Date( $td.attr( 'data-year' ), $td.attr( 'data-month' ), $td.attr( 'data-date' ) );
				this.selectedDate = date;
				this.$input.val( this.formatDate( date ) );
				this.inputValue = this.$input.val();
				this.$input.focus();
			},

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]

				// empty elements to return to original markup
				this.$days.find( 'tbody' ).empty();
				this.$wheelsYear.find( 'ul' ).empty();

				return this.$element[ 0 ].outerHTML;
			},

			disable: function() {
				this.$element.addClass( 'disabled' );
				this.$element.find( 'input, button' ).attr( 'disabled', 'disabled' );
				this.$element.find( '.input-group-btn' ).removeClass( 'open' );
			},

			dropdownMousedown: function() {
				var self = this;
				this.preventBlurHide = true;
				setTimeout( function() {
					self.preventBlurHide = false;
				}, 0 );
			},

			enable: function() {
				this.$element.removeClass( 'disabled' );
				this.$element.find( 'input, button' ).removeAttr( 'disabled' );
			},

			formatDate: function( date ) {
				var padTwo = function( value ) {
					var s = '0' + value;
					return s.substr( s.length - 2 );
				};

				if ( this.moment ) {
					return moment( date ).format( this.momentFormat );
				} else {
					return padTwo( date.getMonth() + 1 ) + '/' + padTwo( date.getDate() ) + '/' + date.getFullYear();
				}
			},

			getCulture: function() {
				if ( this.moment ) {
					return moment.lang();
				} else {
					throw MOMENT_NOT_AVAILABLE;
				}
			},

			getDate: function() {
				return ( !this.selectedDate ) ? new Date( NaN ) : this.selectedDate;
			},

			getFormat: function() {
				if ( this.moment ) {
					return this.momentFormat;
				} else {
					throw MOMENT_NOT_AVAILABLE;
				}
			},

			getFormattedDate: function() {
				return ( !this.selectedDate ) ? INVALID_DATE : this.formatDate( this.selectedDate );
			},

			getRestrictedDates: function() {
				return this.restricted;
			},

			inputBlurred: function( e ) {
				var inputVal = this.$input.val();
				var date;
				if ( inputVal !== this.inputValue ) {
					date = this.setDate( inputVal );
					if ( date === null ) {
						this.$element.trigger( 'inputParsingFailed.fu.datepicker', inputVal );
					} else if ( date === false ) {
						this.$element.trigger( 'inputRestrictedDate.fu.datepicker', date );
					} else {
						this.$element.trigger( 'changed.fu.datepicker', date );
					}
				}
				if ( !this.preventBlurHide ) {
					this.$element.find( '.input-group-btn' ).removeClass( 'open' );
				}
			},

			inputFocused: function( e ) {
				this.$element.find( '.input-group-btn' ).addClass( 'open' );
			},

			isInvalidDate: function( date ) {
				var dateString = date.toString();
				if ( dateString === INVALID_DATE || dateString === 'NaN' ) {
					return true;
				}
				return false;
			},

			isRestricted: function( date, month, year ) {
				var restricted = this.restrictedParsed;
				var i, from, l, to;

				if ( this.sameYearOnly && this.yearRestriction !== null && year !== this.yearRestriction ) {
					return true;
				}
				for ( i = 0, l = restricted.length; i < l; i++ ) {
					from = restricted[ i ].from;
					to = restricted[ i ].to;
					if ( ( date >= from.date && month >= from.month && year >= from.year ) && ( date <= to.date && month <= to.month && year <= to.year ) ) {
						return true;
					}
				}

				return false;
			},

			monthClicked: function( e ) {
				this.$wheelsMonth.find( '.selected' ).removeClass( 'selected' );
				$( e.currentTarget ).parent().addClass( 'selected' );
			},

			next: function() {
				var month = this.$headerTitle.attr( 'data-month' );
				var year = this.$headerTitle.attr( 'data-year' );
				month++;
				if ( month > 11 ) {
					if ( this.sameYearOnly ) {
						return;
					}
					month = 0;
					year++;
				}
				this.renderMonth( new Date( year, month, 1 ) );
			},

			onYearScroll: function( e ) {
				if ( this.artificialScrolling ) {
					return;
				}

				var $yearUl = $( e.currentTarget );
				var height = ( $yearUl.css( 'box-sizing' ) === 'border-box' ) ? $yearUl.outerHeight() : $yearUl.height();
				var scrollHeight = $yearUl.get( 0 ).scrollHeight;
				var scrollTop = $yearUl.scrollTop();
				var bottomPercentage = ( height / ( scrollHeight - scrollTop ) ) * 100;
				var topPercentage = ( scrollTop / scrollHeight ) * 100;
				var i, start;

				if ( topPercentage < 5 ) {
					start = parseInt( $yearUl.find( 'li:first' ).attr( 'data-year' ), 10 );
					for ( i = ( start - 1 ); i > ( start - 11 ); i-- ) {
						$yearUl.prepend( '<li data-year="' + i + '"><button type="button">' + i + '</button></li>' );
					}
					this.artificialScrolling = true;
					$yearUl.scrollTop( ( $yearUl.get( 0 ).scrollHeight - scrollHeight ) + scrollTop );
					this.artificialScrolling = false;
				} else if ( bottomPercentage > 90 ) {
					start = parseInt( $yearUl.find( 'li:last' ).attr( 'data-year' ), 10 );
					for ( i = ( start + 1 ); i < ( start + 11 ); i++ ) {
						$yearUl.append( '<li data-year="' + i + '"><button type="button">' + i + '</button></li>' );
					}
				}
			},

			//some code ripped from http://stackoverflow.com/questions/2182246/javascript-dates-in-ie-nan-firefox-chrome-ok
			parseDate: function( date ) {
				var self = this;
				var dt, isoExp, momentParse, month, parts, use;

				if ( date ) {
					if ( this.moment ) { //if we have moment, use that to parse the dates
						momentParse = function( type, d ) {
							d = ( type === 'b' ) ? moment( d, self.momentFormat ) : moment( d );
							return ( d.isValid() === true ) ? d.toDate() : new Date( NaN );
						};
						use = ( typeof( date ) === 'string' ) ? [ 'b', 'a' ] : [ 'a', 'b' ];
						dt = momentParse( use[ 0 ], date );
						if ( !this.isInvalidDate( dt ) ) {
							return dt;
						} else {
							dt = momentParse( use[ 1 ], date );
							if ( !this.isInvalidDate( dt ) ) {
								return dt;
							}
						}
					} else { //if moment isn't present, use previous date parsing strategy
						if ( typeof( date ) === 'string' ) {
							dt = new Date( Date.parse( date ) );
							if ( !this.isInvalidDate( dt ) ) {
								return dt;
							} else {
								date = date.split( 'T' )[ 0 ];
								isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/;
								parts = isoExp.exec( date );
								if ( parts ) {
									month = parseInt( parts[ 2 ], 10 );
									dt = new Date( parts[ 1 ], month - 1, parts[ 3 ] );
									if ( month === ( dt.getMonth() + 1 ) ) {
										return dt;
									}
								}
							}
						} else {
							dt = new Date( date );
							if ( !this.isInvalidDate( dt ) ) {
								return dt;
							}
						}
					}
				}
				return new Date( NaN );
			},

			prev: function() {
				var month = this.$headerTitle.attr( 'data-month' );
				var year = this.$headerTitle.attr( 'data-year' );
				month--;
				if ( month < 0 ) {
					if ( this.sameYearOnly ) {
						return;
					}
					month = 11;
					year--;
				}
				this.renderMonth( new Date( year, month, 1 ) );
			},

			renderMonth: function( date ) {
				date = date || new Date();

				var firstDay = new Date( date.getFullYear(), date.getMonth(), 1 ).getDay();
				var lastDate = new Date( date.getFullYear(), date.getMonth() + 1, 0 ).getDate();
				var lastMonthDate = new Date( date.getFullYear(), date.getMonth(), 0 ).getDate();
				var $month = this.$headerTitle.find( '.month' );
				var month = date.getMonth();
				var now = new Date();
				var nowDate = now.getDate();
				var nowMonth = now.getMonth();
				var nowYear = now.getFullYear();
				var selected = this.selectedDate;
				var $tbody = this.$days.find( 'tbody' );
				var year = date.getFullYear();
				var curDate, curMonth, curYear, i, j, rows, stage, $td, $tr;

				if ( selected ) {
					selected = {
						date: selected.getDate(),
						month: selected.getMonth(),
						year: selected.getFullYear()
					};
				}

				$month.find( '.current' ).removeClass( 'current' );
				$month.find( 'span[data-month="' + month + '"]' ).addClass( 'current' );
				this.$headerTitle.find( '.year' ).text( year );
				this.$headerTitle.attr( {
					'data-month': month,
					'data-year': year
				} );

				$tbody.empty();
				if ( firstDay !== 0 ) {
					curDate = lastMonthDate - firstDay + 1;
					stage = -1;
				} else {
					curDate = 1;
					stage = 0;
				}
				rows = ( lastDate <= ( 35 - firstDay ) ) ? 5 : 6;
				for ( i = 0; i < rows; i++ ) {
					$tr = $( '<tr></tr>' );
					for ( j = 0; j < 7; j++ ) {
						$td = $( '<td><span><button type="button" class="datepicker-date">' + curDate + '</button></span></td>' );
						if ( stage === -1 ) {
							$td.addClass( 'last-month' );
						} else if ( stage === 1 ) {
							$td.addClass( 'next-month' );
						}

						curMonth = month + stage;
						curYear = year;
						if ( curMonth < 0 ) {
							curMonth = 11;
							curYear--;
						} else if ( curMonth > 11 ) {
							curMonth = 0;
							curYear++;
						}

						$td.attr( {
							'data-date': curDate,
							'data-month': curMonth,
							'data-year': curYear
						} );
						if ( curYear === nowYear && curMonth === nowMonth && curDate === nowDate ) {
							$td.addClass( 'current-day' );
						} else if ( curYear < nowYear || ( curYear === nowYear && curMonth < nowMonth ) ||
							( curYear === nowYear && curMonth === nowMonth && curDate < nowDate ) ) {
							$td.addClass( 'past' );
							if ( !this.options.allowPastDates ) {
								$td.addClass( 'restricted' ).attr( 'title', this.restrictedText );
							}
						}
						if ( this.isRestricted( curDate, curMonth, curYear ) ) {
							$td.addClass( 'restricted' ).attr( 'title', this.restrictedText );
						}
						if ( selected && curYear === selected.year && curMonth === selected.month && curDate === selected.date ) {
							$td.addClass( 'selected' );
						}

						curDate++;
						if ( stage === -1 && curDate > lastMonthDate ) {
							curDate = 1;
							stage = 0;
						} else if ( stage === 0 && curDate > lastDate ) {
							curDate = 1;
							stage = 1;
						}

						$tr.append( $td );
					}
					$tbody.append( $tr );
				}
			},

			renderWheel: function( date ) {
				var month = date.getMonth();
				var $monthUl = this.$wheelsMonth.find( 'ul' );
				var year = date.getFullYear();
				var $yearUl = this.$wheelsYear.find( 'ul' );
				var i, $monthSelected, $yearSelected;

				if ( this.sameYearOnly ) {
					this.$wheelsMonth.addClass( 'full' );
					this.$wheelsYear.addClass( 'hide' );
				} else {
					this.$wheelsMonth.removeClass( 'full' );
					this.$wheelsYear.removeClass( 'hide' );
				}

				$monthUl.find( '.selected' ).removeClass( 'selected' );
				$monthSelected = $monthUl.find( 'li[data-month="' + month + '"]' );
				$monthSelected.addClass( 'selected' );
				$monthUl.scrollTop( $monthUl.scrollTop() + ( $monthSelected.position().top - $monthUl.outerHeight() / 2 - $monthSelected.outerHeight( true ) / 2 ) );

				$yearUl.empty();
				for ( i = ( year - 10 ); i < ( year + 11 ); i++ ) {
					$yearUl.append( '<li data-year="' + i + '"><button type="button">' + i + '</button></li>' );
				}
				$yearSelected = $yearUl.find( 'li[data-year="' + year + '"]' );
				$yearSelected.addClass( 'selected' );
				this.artificialScrolling = true;
				$yearUl.scrollTop( $yearUl.scrollTop() + ( $yearSelected.position().top - $yearUl.outerHeight() / 2 - $yearSelected.outerHeight( true ) / 2 ) );
				this.artificialScrolling = false;
				$monthSelected.find( 'button' ).focus();
			},

			selectClicked: function() {
				var month = this.$wheelsMonth.find( '.selected' ).attr( 'data-month' );
				var year = this.$wheelsYear.find( '.selected' ).attr( 'data-year' );
				this.changeView( 'calendar', new Date( year, month, 1 ) );
			},

			setCulture: function( cultureCode ) {
				if ( !cultureCode ) {
					return false;
				}
				if ( this.moment ) {
					moment.lang( cultureCode );
				} else {
					throw MOMENT_NOT_AVAILABLE;
				}
			},

			setDate: function( date ) {
				var parsed = this.parseDate( date );
				if ( !this.isInvalidDate( parsed ) ) {
					if ( !this.isRestricted( parsed.getDate(), parsed.getMonth(), parsed.getFullYear() ) ) {
						this.selectedDate = parsed;
						this.renderMonth( parsed );
						this.$input.val( this.formatDate( parsed ) );
					} else {
						this.selectedDate = false;
						this.renderMonth();
					}
				} else {
					this.selectedDate = null;
					this.renderMonth();
				}
				this.inputValue = this.$input.val();
				return this.selectedDate;
			},

			setFormat: function( format ) {
				if ( !format ) {
					return false;
				}
				if ( this.moment ) {
					this.momentFormat = format;
				} else {
					throw MOMENT_NOT_AVAILABLE;
				}
			},

			setRestrictedDates: function( restricted ) {
				var parsed = [];
				var self = this;
				var i, l;

				var parseItem = function( val ) {
					if ( val === -Infinity ) {
						return {
							date: -Infinity,
							month: -Infinity,
							year: -Infinity
						};
					} else if ( val === Infinity ) {
						return {
							date: Infinity,
							month: Infinity,
							year: Infinity
						};
					} else {
						val = self.parseDate( val );
						return {
							date: val.getDate(),
							month: val.getMonth(),
							year: val.getFullYear()
						};
					}
				};

				this.restricted = restricted;
				for ( i = 0, l = restricted.length; i < l; i++ ) {
					parsed.push( {
						from: parseItem( restricted[ i ].from ),
						to: parseItem( restricted[ i ].to )
					} );
				}
				this.restrictedParsed = parsed;
			},

			titleClicked: function( e ) {
				this.changeView( 'wheels', new Date( this.$headerTitle.attr( 'data-year' ), this.$headerTitle.attr( 'data-month' ), 1 ) );
			},

			todayClicked: function( e ) {
				var date = new Date();

				if ( ( date.getMonth() + '' ) !== this.$headerTitle.attr( 'data-month' ) || ( date.getFullYear() + '' ) !== this.$headerTitle.attr( 'data-year' ) ) {
					this.renderMonth( date );
				}
			},

			yearClicked: function( e ) {
				this.$wheelsYear.find( '.selected' ).removeClass( 'selected' );
				$( e.currentTarget ).parent().addClass( 'selected' );
			}
		};


		// DATEPICKER PLUGIN DEFINITION

		$.fn.datepicker = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'datepicker' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'datepicker', ( data = new Datepicker( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.datepicker.defaults = {
			allowPastDates: false,
			date: new Date(),
			formatDate: null,
			momentConfig: {
				culture: 'en',
				format: 'L' // more formats can be found here http://momentjs.com/docs/#/customization/long-date-formats/.
			},
			parseDate: null,
			restricted: [], //accepts an array of objects formatted as so: { from: {{date}}, to: {{date}} }  (ex: [ { from: new Date('12/11/2014'), to: new Date('03/31/2015') } ])
			restrictedText: 'Restricted',
			sameYearOnly: false
		};

		$.fn.datepicker.Constructor = Datepicker;

		$.fn.datepicker.noConflict = function() {
			$.fn.datepicker = old;
			return this;
		};

		// DATA-API

		$( document ).on( 'mousedown.fu.datepicker.data-api', '[data-initialize=datepicker]', function( e ) {
			var $control = $( e.target ).closest( '.datepicker' );
			if ( !$control.data( 'datepicker' ) ) {
				$control.datepicker( $control.data() );
			}
		} );

		//used to prevent the dropdown from closing when clicking within it's bounds
		$( document ).on( 'click.fu.datepicker.data-api', '.datepicker .dropdown-menu', function( e ) {
			var $target = $( e.target );
			if ( !$target.is( '.datepicker-date' ) || $target.closest( '.restricted' ).length ) {
				e.stopPropagation();
			}
		} );

		//used to prevent the dropdown from closing when clicking on the input
		$( document ).on( 'click.fu.datepicker.data-api', '.datepicker input', function( e ) {
			e.stopPropagation();
		} );

		$( function() {
			$( '[data-initialize=datepicker]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'datepicker' ) ) {
					return;
				}
				$this.datepicker( $this.data() );
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Dropdown Auto Flip
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		$( document.body ).on( 'click.fu.dropdown-autoflip', '[data-toggle=dropdown][data-flip]', function( event ) {
			if ( $( this ).data().flip === "auto" ) {
				// have the drop down decide where to place itself
				_autoFlip( $( this ).next( '.dropdown-menu' ) );
			}
		} );

		// For pillbox suggestions dropdown 
		$( document.body ).on( 'suggested.fu.pillbox', function( event, element ) {
			_autoFlip( $( element ) );
			$( element ).parent().addClass( 'open' );
		} );

		function _autoFlip( menu ) {
			// hide while the browser thinks
			$( menu ).css( {
				visibility: "hidden"
			} );

			// decide where to put menu
			if ( dropUpCheck( menu ) ) {
				menu.parent().addClass( "dropup" );
			} else {
				menu.parent().removeClass( "dropup" );
			}

			// show again
			$( menu ).css( {
				visibility: "visible"
			} );
		}

		function dropUpCheck( element ) {
			// caching container
			var $container = _getContainer( element );

			// building object with measurementsances for later use
			var measurements = {};
			measurements.parentHeight = element.parent().outerHeight();
			measurements.parentOffsetTop = element.parent().offset().top;
			measurements.dropdownHeight = element.outerHeight();
			measurements.containerHeight = $container.overflowElement.outerHeight();

			// this needs to be different if the window is the container or another element is
			measurements.containerOffsetTop = ( !!$container.isWindow ) ? $container.overflowElement.scrollTop() : $container.overflowElement.offset().top;

			// doing the calculations
			measurements.fromTop = measurements.parentOffsetTop - measurements.containerOffsetTop;
			measurements.fromBottom = measurements.containerHeight - measurements.parentHeight - ( measurements.parentOffsetTop - measurements.containerOffsetTop );

			// actual determination of where to put menu
			// false = drop down
			// true = drop up
			if ( measurements.dropdownHeight < measurements.fromBottom ) {
				return false;
			} else if ( measurements.dropdownHeight < measurements.fromTop ) {
				return true;
			} else if ( measurements.dropdownHeight >= measurements.fromTop && measurements.dropdownHeight >= measurements.fromBottom ) {
				// decide which one is bigger and put it there
				if ( measurements.fromTop >= measurements.fromBottom ) {
					return true;
				} else {
					return false;
				}
			}
		}

		function _getContainer( element ) {
			var containerElement = window;
			var isWindow = true;

			$.each( element.parents(), function( index, value ) {
				if ( $( value ).css( 'overflow' ) !== 'visible' ) {
					containerElement = value;
					isWindow = false;
					return false;
				}
			} );

			return {
				overflowElement: $( containerElement ),
				isWindow: isWindow
			};
		}

		// register empty plugin
		$.fn.dropdownautoflip = function() { /* empty */ };


	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Loader
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.loader;

		// LOADER CONSTRUCTOR AND PROTOTYPE

		var Loader = function( element, options ) {
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.loader.defaults, options );

			this.begin = ( this.$element.is( '[data-begin]' ) ) ? parseInt( this.$element.attr( 'data-begin' ), 10 ) : 1;
			this.delay = ( this.$element.is( '[data-delay]' ) ) ? parseFloat( this.$element.attr( 'data-delay' ) ) : 150;
			this.end = ( this.$element.is( '[data-end]' ) ) ? parseInt( this.$element.attr( 'data-end' ), 10 ) : 8;
			this.frame = ( this.$element.is( '[data-frame]' ) ) ? parseInt( this.$element.attr( 'data-frame' ), 10 ) : this.begin;
			this.isIElt9 = false;
			this.timeout = {};

			var ieVer = this.msieVersion();
			if ( ieVer !== false && ieVer < 9 ) {
				this.$element.addClass( 'iefix' );
				this.isIElt9 = true;
			}

			this.$element.attr( 'data-frame', this.frame + '' );
			this.play();
		};

		Loader.prototype = {

			constructor: Loader,

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]
				// empty elements to return to original markup
				// [none]
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			ieRepaint: function() {
				if ( this.isIElt9 ) {
					this.$element.addClass( 'iefix_repaint' ).removeClass( 'iefix_repaint' );
				}
			},

			msieVersion: function() {
				var ua = window.navigator.userAgent;
				var msie = ua.indexOf( 'MSIE ' );
				if ( msie > 0 ) {
					return parseInt( ua.substring( msie + 5, ua.indexOf( ".", msie ) ), 10 );
				} else {
					return false;
				}
			},

			next: function() {
				this.frame++;
				if ( this.frame > this.end ) {
					this.frame = this.begin;
				}
				this.$element.attr( 'data-frame', this.frame + '' );
				this.ieRepaint();
			},

			pause: function() {
				clearTimeout( this.timeout );
			},

			play: function() {
				var self = this;
				clearTimeout( this.timeout );
				this.timeout = setTimeout( function() {
					self.next();
					self.play();
				}, this.delay );
			},

			previous: function() {
				this.frame--;
				if ( this.frame < this.begin ) {
					this.frame = this.end;
				}
				this.$element.attr( 'data-frame', this.frame + '' );
				this.ieRepaint();
			},

			reset: function() {
				this.frame = this.begin;
				this.$element.attr( 'data-frame', this.frame + '' );
				this.ieRepaint();
			}

		};

		// LOADER PLUGIN DEFINITION

		$.fn.loader = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.loader' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'fu.loader', ( data = new Loader( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.loader.defaults = {};

		$.fn.loader.Constructor = Loader;

		$.fn.loader.noConflict = function() {
			$.fn.loader = old;
			return this;
		};

		// INIT LOADER ON DOMCONTENTLOADED

		$( function() {
			$( '[data-initialize=loader]' ).each( function() {
				var $this = $( this );
				if ( !$this.data( 'fu.loader' ) ) {
					$this.loader( $this.data() );
				}
			} );
		} );


	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Placard
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.placard;

		// PLACARD CONSTRUCTOR AND PROTOTYPE

		var Placard = function( element, options ) {
			var self = this;
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.placard.defaults, options );

			this.$accept = this.$element.find( '.placard-accept' );
			this.$cancel = this.$element.find( '.placard-cancel' );
			this.$field = this.$element.find( '.placard-field' );
			this.$footer = this.$element.find( '.placard-footer' );
			this.$header = this.$element.find( '.placard-header' );
			this.$popup = this.$element.find( '.placard-popup' );

			this.actualValue = null;
			this.clickStamp = '_';
			this.previousValue = '';
			if ( this.options.revertOnCancel === -1 ) {
				this.options.revertOnCancel = ( this.$accept.length > 0 ) ? true : false;
			}

			this.$field.on( 'focus.fu.placard', $.proxy( this.show, this ) );
			this.$accept.on( 'click.fu.placard', $.proxy( this.complete, this, 'accept' ) );
			this.$cancel.on( 'click.fu.placard', function( e ) {
				e.preventDefault();
				self.complete( 'cancel' );
			} );

			this.ellipsis();
		};

		Placard.prototype = {
			constructor: Placard,

			complete: function( action ) {
				var func = this.options[ 'on' + action[ 0 ].toUpperCase() + action.substring( 1 ) ];
				var obj = {
					previousValue: this.previousValue,
					value: this.$field.val()
				};
				if ( func ) {
					func( obj );
					this.$element.trigger( action, obj );
				} else {
					if ( action === 'cancel' && this.options.revertOnCancel ) {
						this.$field.val( this.previousValue );
					}
					this.$element.trigger( action, obj );
					this.hide();
				}
			},

			destroy: function() {
				this.$element.remove();
				// remove any external bindings
				$( document ).off( 'click.fu.placard.externalClick.' + this.clickStamp );
				// set input value attrbute
				this.$element.find( 'input' ).each( function() {
					$( this ).attr( 'value', $( this ).val() );
				} );
				// empty elements to return to original markup
				// [none]
				// return string of markup
				return this.$element[ 0 ].outerHTML;
			},

			disable: function() {
				this.$element.addClass( 'disabled' );
				this.$field.attr( 'disabled', 'disabled' );
				this.hide();
			},

			ellipsis: function() {
				var field, i, str;
				if ( this.$element.attr( 'data-ellipsis' ) === 'true' ) {
					field = this.$field.get( 0 );
					if ( this.$field.is( 'input' ) ) {
						field.scrollLeft = 0;
					} else {
						field.scrollTop = 0;
						if ( field.clientHeight < field.scrollHeight ) {
							this.actualValue = this.$field.val();
							this.$field.val( '' );
							str = '';
							i = 0;
							while ( field.clientHeight >= field.scrollHeight ) {
								str += this.actualValue[ i ];
								this.$field.val( str + '...' );
								i++;
							}
							str = ( str.length > 0 ) ? str.substring( 0, str.length - 1 ) : '';
							this.$field.val( str + '...' );
						}
					}
				}
			},

			enable: function() {
				this.$element.removeClass( 'disabled' );
				this.$field.removeAttr( 'disabled' );
			},

			externalClickListener: function( e, force ) {
				if ( force === true || this.isExternalClick( e ) ) {
					this.complete( this.options.externalClickAction );
				}
			},

			getValue: function() {
				if ( this.actualValue !== null ) {
					return this.actualValue;
				} else {
					return this.$field.val();
				}
			},

			hide: function() {
				if ( !this.$element.hasClass( 'showing' ) ) {
					return;
				}
				this.$element.removeClass( 'showing' );
				this.ellipsis();
				$( document ).off( 'click.fu.placard.externalClick.' + this.clickStamp );
				this.$element.trigger( 'hidden.fu.placard' );
			},

			isExternalClick: function( e ) {
				var el = this.$element.get( 0 );
				var exceptions = this.options.externalClickExceptions || [];
				var $originEl = $( e.target );
				var i, l;

				if ( e.target === el || $originEl.parents( '.placard:first' ).get( 0 ) === el ) {
					return false;
				} else {
					for ( i = 0, l = exceptions.length; i < l; i++ ) {
						if ( $originEl.is( exceptions[ i ] ) || $originEl.parents( exceptions[ i ] ).length > 0 ) {
							return false;
						}
					}
				}
				return true;
			},

			setValue: function( val ) {
				this.$field.val( val );
				if ( !this.$element.hasClass( 'showing' ) ) {
					this.ellipsis();
				}
			},

			show: function() {
				var other;

				if ( this.$element.hasClass( 'showing' ) ) {
					return;
				}
				other = $( document ).find( '.placard.showing' );
				if ( other.length > 0 ) {
					if ( other.data( 'fu.placard' ) && other.data( 'fu.placard' ).options.explicit ) {
						return;
					}
					other.placard( 'externalClickListener', {}, true );
				}
				this.previousValue = this.$field.val();

				this.$element.addClass( 'showing' );
				if ( this.actualValue !== null ) {
					this.$field.val( this.actualValue );
					this.actualValue = null;
				}
				if ( this.$header.length > 0 ) {
					this.$popup.css( 'top', '-' + this.$header.outerHeight( true ) + 'px' );
				}
				if ( this.$footer.length > 0 ) {
					this.$popup.css( 'bottom', '-' + this.$footer.outerHeight( true ) + 'px' );
				}

				this.$element.trigger( 'shown.fu.placard' );
				this.clickStamp = new Date().getTime() + ( Math.floor( Math.random() * 100 ) + 1 );
				if ( !this.options.explicit ) {
					$( document ).on( 'click.fu.placard.externalClick.' + this.clickStamp, $.proxy( this.externalClickListener, this ) );
				}
			}
		};

		// PLACARD PLUGIN DEFINITION

		$.fn.placard = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.placard' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'fu.placard', ( data = new Placard( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.placard.defaults = {
			onAccept: undefined,
			onCancel: undefined,
			externalClickAction: 'cancel',
			externalClickExceptions: [],
			explicit: false,
			revertOnCancel: -1 //negative 1 will check for an '.placard-accept' button. Also can be set to true or false
		};

		$.fn.placard.Constructor = Placard;

		$.fn.placard.noConflict = function() {
			$.fn.placard = old;
			return this;
		};

		// DATA-API

		$( document ).on( 'focus.fu.placard.data-api', '[data-initialize=placard]', function( e ) {
			var $control = $( e.target ).closest( '.placard' );
			if ( !$control.data( 'fu.placard' ) ) {
				$control.placard( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=placard]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'fu.placard' ) ) return;
				$this.placard( $this.data() );
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Radio
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.radio;

		// RADIO CONSTRUCTOR AND PROTOTYPE

		var Radio = function( element, options ) {
			this.options = $.extend( {}, $.fn.radio.defaults, options );

			// cache elements
			this.$radio = $( element ).is( 'input[type="radio"]' ) ? $( element ) : $( element ).find( 'input[type="radio"]:first' );
			this.$label = this.$radio.parent();
			this.groupName = this.$radio.attr( 'name' );
			this.$parent = this.$label.parent( '.radio' );
			this.$toggleContainer = null;

			if ( this.$parent.length === 0 ) {
				this.$parent = null;
			}

			var toggleSelector = this.$radio.attr( 'data-toggle' );
			if ( toggleSelector ) {
				this.$toggleContainer = $( toggleSelector );
			}

			// set default state
			this.setState( this.$radio );

			// handle events
			this.$radio.on( 'change.fu.radio', $.proxy( this.itemchecked, this ) );
		};

		Radio.prototype = {

			constructor: Radio,

			destroy: function() {
				this.$parent.remove();
				// remove any external bindings
				// [none]
				// empty elements to return to original markup
				// [none]
				// return string of markup
				return this.$parent[ 0 ].outerHTML;
			},

			setState: function( $radio ) {
				$radio = $radio || this.$radio;

				var checked = $radio.is( ':checked' );
				var disabled = !!$radio.prop( 'disabled' );

				this.$label.removeClass( 'checked' );
				if ( this.$parent ) {
					this.$parent.removeClass( 'checked disabled' );
				}

				// set state of radio
				if ( checked === true ) {
					this.$label.addClass( 'checked' );
					if ( this.$parent ) {
						this.$parent.addClass( 'checked' );
					}
				}
				if ( disabled === true ) {
					this.$label.addClass( 'disabled' );
					if ( this.$parent ) {
						this.$parent.addClass( 'disabled' );
					}
				}

				//toggle container
				this.toggleContainer();
			},

			resetGroup: function() {
				var group = $( 'input[name="' + this.groupName + '"]' );

				group.each( function() {
					var lbl = $( this ).parent( 'label' );
					lbl.removeClass( 'checked' );
					lbl.parent( '.radio' ).removeClass( 'checked' );
				} );
			},

			enable: function() {
				this.$radio.attr( 'disabled', false );
				this.$label.removeClass( 'disabled' );
				if ( this.$parent ) {
					this.$parent.removeClass( 'disabled' );
				}
			},

			disable: function() {
				this.$radio.attr( 'disabled', true );
				this.$label.addClass( 'disabled' );
				if ( this.$parent ) {
					this.$parent.addClass( 'disabled' );
				}
			},

			itemchecked: function( e ) {
				var radio = $( e.target );

				this.resetGroup();
				this.setState( radio );
			},

			check: function() {
				this.resetGroup();
				this.$radio.prop( 'checked', true );
				this.setState( this.$radio );
			},

			toggleContainer: function() {
				var group;
				if ( this.$toggleContainer ) {
					// show corresponding container for currently selected radio
					if ( this.isChecked() ) {
						// hide containers for each item in group
						group = $( 'input[name="' + this.groupName + '"]' );
						group.each( function() {
							var selector = $( this ).attr( 'data-toggle' );
							$( selector ).addClass( 'hide' );
							$( selector ).attr( 'aria-hidden', 'true' );
						} );
						this.$toggleContainer.removeClass( 'hide' );
						this.$toggleContainer.attr( 'aria-hidden', 'false' );
					} else {
						this.$toggleContainer.addClass( 'hide' );
						this.$toggleContainer.attr( 'aria-hidden', 'true' );
					}

				}
			},

			uncheck: function() {
				this.$radio.prop( 'checked', false );
				this.setState( this.$radio );
			},

			isChecked: function() {
				return this.$radio.is( ':checked' );
			}
		};


		// RADIO PLUGIN DEFINITION

		$.fn.radio = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.radio' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'fu.radio', ( data = new Radio( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.radio.defaults = {};

		$.fn.radio.Constructor = Radio;

		$.fn.radio.noConflict = function() {
			$.fn.radio = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mouseover.fu.checkbox.data-api', '[data-initialize=radio]', function( e ) {
			var $control = $( e.target ).closest( '.radio' ).find( '[type=radio]' );
			if ( !$control.data( 'fu.radio' ) ) {
				$control.radio( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=radio] [type=radio]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'fu.radio' ) ) return;
				$this.radio( $this.data() );
			} );
		} );


	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Search
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.search;

		// SEARCH CONSTRUCTOR AND PROTOTYPE

		var Search = function( element, options ) {
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.search.defaults, options );

			this.$button = this.$element.find( 'button' );
			this.$input = this.$element.find( 'input' );
			this.$icon = this.$element.find( '.glyphicon' );

			this.$button.on( 'click.fu.search', $.proxy( this.buttonclicked, this ) );
			this.$input.on( 'keydown.fu.search', $.proxy( this.keypress, this ) );
			this.$input.on( 'keyup.fu.search', $.proxy( this.keypressed, this ) );

			this.activeSearch = '';
		};

		Search.prototype = {

			constructor: Search,

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]
				// set input value attrbute
				this.$element.find( 'input' ).each( function() {
					$( this ).attr( 'value', $( this ).val() );
				} );
				// empty elements to return to original markup
				// [none]
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			search: function( searchText ) {
				if ( this.$icon.hasClass( 'glyphicon' ) ) {
					this.$icon.removeClass( 'glyphicon-search' ).addClass( 'glyphicon-remove' );
				}
				this.activeSearch = searchText;
				this.$element.addClass( 'searched' );
				this.$element.trigger( 'searched.fu.search', searchText );
			},

			clear: function() {
				if ( this.$icon.hasClass( 'glyphicon' ) ) {
					this.$icon.removeClass( 'glyphicon-remove' ).addClass( 'glyphicon-search' );
				}
				this.activeSearch = '';
				this.$input.val( '' );
				this.$element.removeClass( 'searched' );
				this.$element.trigger( 'cleared.fu.search' );
			},

			action: function() {
				var val = this.$input.val();
				var inputEmptyOrUnchanged = val === '' || val === this.activeSearch;

				if ( this.activeSearch && inputEmptyOrUnchanged ) {
					this.clear();
				} else if ( val ) {
					this.search( val );
				}
			},

			buttonclicked: function( e ) {
				e.preventDefault();
				if ( $( e.currentTarget ).is( '.disabled, :disabled' ) ) return;
				this.action();
			},

			keypress: function( e ) {
				if ( e.which === 13 ) {
					e.preventDefault();
				}
			},

			keypressed: function( e ) {
				var val, inputPresentAndUnchanged;

				if ( e.which === 13 ) {
					e.preventDefault();
					this.action();
				} else {
					val = this.$input.val();
					inputPresentAndUnchanged = val && ( val === this.activeSearch );
					this.$icon.attr( 'class', inputPresentAndUnchanged ? 'glyphicon glyphicon-remove' : 'glyphicon glyphicon-search' );
				}
			},

			disable: function() {
				this.$element.addClass( 'disabled' );
				this.$input.attr( 'disabled', 'disabled' );
				this.$button.addClass( 'disabled' );
			},

			enable: function() {
				this.$element.removeClass( 'disabled' );
				this.$input.removeAttr( 'disabled' );
				this.$button.removeClass( 'disabled' );
			}

		};


		// SEARCH PLUGIN DEFINITION

		$.fn.search = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.search' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'fu.search', ( data = new Search( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.search.defaults = {};

		$.fn.search.Constructor = Search;

		$.fn.search.noConflict = function() {
			$.fn.search = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mousedown.fu.search.data-api', '[data-initialize=search]', function( e ) {
			var $control = $( e.target ).closest( '.search' );
			if ( !$control.data( 'fu.search' ) ) {
				$control.search( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=search]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'fu.search' ) ) return;
				$this.search( $this.data() );
			} );
		} );


	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Button Dropdown
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.selectlist;
		// SELECT CONSTRUCTOR AND PROTOTYPE

		var Selectlist = function( element, options ) {
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.selectlist.defaults, options );

			this.$button = this.$element.find( '.btn.dropdown-toggle' );
			this.$hiddenField = this.$element.find( '.hidden-field' );
			this.$label = this.$element.find( '.selected-label' );

			this.$element.on( 'click.fu.selectlist', '.dropdown-menu a', $.proxy( this.itemClicked, this ) );
			this.setDefaultSelection();

			if ( options.resize === 'auto' ) {
				this.resize();
			}
		};

		Selectlist.prototype = {

			constructor: Selectlist,

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]
				// empty elements to return to original markup
				// [none]
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			doSelect: function( $item ) {
				var $selectedItem;
				this.$selectedItem = $selectedItem = $item;

				this.$hiddenField.val( this.$selectedItem.attr( 'data-value' ) );
				this.$label.html( $( this.$selectedItem.children()[ 0 ] ).html() );

				// clear and set selected item to allow declarative init state
				// unlike other controls, selectlist's value is stored internal, not in an input
				this.$element.find( 'li' ).each( function() {
					if ( $selectedItem.is( $( this ) ) ) {
						$( this ).attr( 'data-selected', true );
					} else {
						$( this ).removeData( 'selected' ).removeAttr( 'data-selected' );
					}
				} );

			},

			itemClicked: function( e ) {
				this.$element.trigger( 'clicked.fu.selectlist', this.$selectedItem );

				e.preventDefault();

				// is clicked element different from currently selected element?
				if ( !( $( e.target ).parent().is( this.$selectedItem ) ) ) {
					this.itemChanged( e );
				}

				// return focus to control after selecting an option
				this.$element.find( '.dropdown-toggle' ).focus();

			},

			itemChanged: function( e ) {

				this.doSelect( $( e.target ).parent() );

				// pass object including text and any data-attributes
				// to onchange event
				var data = this.selectedItem();
				// trigger changed event
				this.$element.trigger( 'changed.fu.selectlist', data );
			},

			resize: function() {
				var newWidth = 0;
				var sizer = $( '<div/>' ).addClass( 'selectlist-sizer' );
				var width = 0;

				if ( Boolean( $( document ).find( 'html' ).hasClass( 'fuelux' ) ) ) {
					// default behavior for fuel ux setup. means fuelux was a class on the html tag
					$( document.body ).append( sizer );
				} else {
					// fuelux is not a class on the html tag. So we'll look for the first one we find so the correct styles get applied to the sizer
					$( '.fuelux:first' ).append( sizer );
				}

				// iterate through each item to find longest string
				this.$element.find( 'a' ).each( function() {
					sizer.text( $( this ).text() );
					newWidth = sizer.outerWidth();
					if ( newWidth > width ) {
						width = newWidth;
					}
				} );

				sizer.remove();

				//TODO: betting this is somewhat off with box-sizing: border-box
				this.$label.width( width );
			},

			selectedItem: function() {
				var txt = this.$selectedItem.text();
				return $.extend( {
					text: txt
				}, this.$selectedItem.data() );
			},

			selectByText: function( text ) {
				var $item = $( [] );
				this.$element.find( 'li' ).each( function() {
					if ( ( this.textContent || this.innerText || $( this ).text() || '' ).toLowerCase() === ( text || '' ).toLowerCase() ) {
						$item = $( this );
						return false;
					}
				} );
				this.doSelect( $item );
			},

			selectByValue: function( value ) {
				var selector = 'li[data-value="' + value + '"]';
				this.selectBySelector( selector );
			},

			selectByIndex: function( index ) {
				// zero-based index
				var selector = 'li:eq(' + index + ')';
				this.selectBySelector( selector );
			},

			selectBySelector: function( selector ) {
				var $item = this.$element.find( selector );
				this.doSelect( $item );
			},

			setDefaultSelection: function() {
				var $item = this.$element.find( 'li[data-selected=true]' ).eq( 0 );

				if ( $item.length === 0 ) {
					$item = this.$element.find( 'li' ).has( 'a' ).eq( 0 );
				}

				this.doSelect( $item );
			},

			enable: function() {
				this.$element.removeClass( 'disabled' );
				this.$button.removeClass( 'disabled' );
			},

			disable: function() {
				this.$element.addClass( 'disabled' );
				this.$button.addClass( 'disabled' );
			}

		};


		// SELECT PLUGIN DEFINITION

		$.fn.selectlist = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.selectlist' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'fu.selectlist', ( data = new Selectlist( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.selectlist.defaults = {};

		$.fn.selectlist.Constructor = Selectlist;

		$.fn.selectlist.noConflict = function() {
			$.fn.selectlist = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mousedown.fu.selectlist.data-api', '[data-initialize=selectlist]', function( e ) {
			var $control = $( e.target ).closest( '.selectlist' );
			if ( !$control.data( 'fu.selectlist' ) ) {
				$control.selectlist( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=selectlist]' ).each( function() {
				var $this = $( this );
				if ( !$this.data( 'fu.selectlist' ) ) {
					$this.selectlist( $this.data() );
				}
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Spinbox
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.spinbox;

		// SPINBOX CONSTRUCTOR AND PROTOTYPE

		var Spinbox = function( element, options ) {
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.spinbox.defaults, options );
			this.$input = this.$element.find( '.spinbox-input' );
			this.$element.on( 'focusin.fu.spinbox', this.$input, $.proxy( this.changeFlag, this ) );
			this.$element.on( 'focusout.fu.spinbox', this.$input, $.proxy( this.change, this ) );
			this.$element.on( 'keydown.fu.spinbox', this.$input, $.proxy( this.keydown, this ) );
			this.$element.on( 'keyup.fu.spinbox', this.$input, $.proxy( this.keyup, this ) );

			this.bindMousewheelListeners();
			this.mousewheelTimeout = {};

			if ( this.options.hold ) {
				this.$element.on( 'mousedown.fu.spinbox', '.spinbox-up', $.proxy( function() {
					this.startSpin( true );
				}, this ) );
				this.$element.on( 'mouseup.fu.spinbox', '.spinbox-up, .spinbox-down', $.proxy( this.stopSpin, this ) );
				this.$element.on( 'mouseout.fu.spinbox', '.spinbox-up, .spinbox-down', $.proxy( this.stopSpin, this ) );
				this.$element.on( 'mousedown.fu.spinbox', '.spinbox-down', $.proxy( function() {
					this.startSpin( false );
				}, this ) );
			} else {
				this.$element.on( 'click.fu.spinbox', '.spinbox-up', $.proxy( function() {
					this.step( true );
				}, this ) );
				this.$element.on( 'click.fu.spinbox', '.spinbox-down', $.proxy( function() {
					this.step( false );
				}, this ) );
			}

			this.switches = {
				count: 1,
				enabled: true
			};

			if ( this.options.speed === 'medium' ) {
				this.switches.speed = 300;
			} else if ( this.options.speed === 'fast' ) {
				this.switches.speed = 100;
			} else {
				this.switches.speed = 500;
			}

			this.lastValue = this.options.value;

			this.render();

			if ( this.options.disabled ) {
				this.disable();
			}
		};

		Spinbox.prototype = {
			constructor: Spinbox,

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]
				// set input value attrbute
				this.$element.find( 'input' ).each( function() {
					$( this ).attr( 'value', $( this ).val() );
				} );
				// empty elements to return to original markup
				// [none]
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			render: function() {
				var inputValue = this.parseInput( this.$input.val() );
				var maxUnitLength = '';

				// if input is empty and option value is default, 0
				if ( inputValue !== '' && this.options.value === 0 ) {
					this.value( inputValue );
				} else {
					this.output( this.options.value );
				}

				if ( this.options.units.length ) {
					$.each( this.options.units, function( index, value ) {
						if ( value.length > maxUnitLength.length ) {
							maxUnitLength = value;
						}
					} );
				}

			},

			output: function( value, updateField ) {
				value = ( value + '' ).split( '.' ).join( this.options.decimalMark );
				updateField = ( updateField || true );
				if ( updateField ) {
					this.$input.val( value );
				}

				return value;
			},

			parseInput: function( value ) {
				value = ( value + '' ).split( this.options.decimalMark ).join( '.' );

				return value;
			},

			change: function() {
				var newVal = this.parseInput( this.$input.val() ) || '';

				if ( this.options.units.length || this.options.decimalMark !== '.' ) {
					newVal = this.parseValueWithUnit( newVal );
				} else if ( newVal / 1 ) {
					newVal = this.options.value = this.checkMaxMin( newVal / 1 );
				} else {
					newVal = this.checkMaxMin( newVal.replace( /[^0-9.-]/g, '' ) || '' );
					this.options.value = newVal / 1;
				}
				this.output( newVal );

				this.changeFlag = false;
				this.triggerChangedEvent();
			},

			changeFlag: function() {
				this.changeFlag = true;
			},

			stopSpin: function() {
				if ( this.switches.timeout !== undefined ) {
					clearTimeout( this.switches.timeout );
					this.switches.count = 1;
					this.triggerChangedEvent();
				}
			},

			triggerChangedEvent: function() {
				var currentValue = this.value();
				if ( currentValue === this.lastValue ) return;

				this.lastValue = currentValue;

				// Primary changed event
				this.$element.trigger( 'changed.fu.spinbox', this.output( currentValue, false ) ); // no DOM update
			},

			startSpin: function( type ) {

				if ( !this.options.disabled ) {
					var divisor = this.switches.count;

					if ( divisor === 1 ) {
						this.step( type );
						divisor = 1;
					} else if ( divisor < 3 ) {
						divisor = 1.5;
					} else if ( divisor < 8 ) {
						divisor = 2.5;
					} else {
						divisor = 4;
					}

					this.switches.timeout = setTimeout( $.proxy( function() {
						this.iterate( type );
					}, this ), this.switches.speed / divisor );
					this.switches.count++;
				}
			},

			iterate: function( type ) {
				this.step( type );
				this.startSpin( type );
			},

			step: function( isIncrease ) {
				// isIncrease: true is up, false is down

				var digits, multiple, currentValue, limitValue;

				// trigger change event
				if ( this.changeFlag ) {
					this.change();
				}

				// get current value and min/max options
				currentValue = this.options.value;
				limitValue = isIncrease ? this.options.max : this.options.min;

				if ( ( isIncrease ? currentValue < limitValue : currentValue > limitValue ) ) {
					var newVal = currentValue + ( isIncrease ? 1 : -1 ) * this.options.step;

					// raise to power of 10 x number of decimal places, then round
					if ( this.options.step % 1 !== 0 ) {
						digits = ( this.options.step + '' ).split( '.' )[ 1 ].length;
						multiple = Math.pow( 10, digits );
						newVal = Math.round( newVal * multiple ) / multiple;
					}

					// if outside limits, set to limit value
					if ( isIncrease ? newVal > limitValue : newVal < limitValue ) {
						this.value( limitValue );
					} else {
						this.value( newVal );
					}

				} else if ( this.options.cycle ) {
					var cycleVal = isIncrease ? this.options.min : this.options.max;
					this.value( cycleVal );
				}
			},

			value: function( value ) {

				if ( value || value === 0 ) {
					if ( this.options.units.length || this.options.decimalMark !== '.' ) {
						this.output( this.parseValueWithUnit( value + ( this.unit || '' ) ) );
						return this;

					} else if ( !isNaN( parseFloat( value ) ) && isFinite( value ) ) {
						this.options.value = value / 1;
						this.output( value + ( this.unit ? this.unit : '' ) );
						return this;

					}
				} else {
					if ( this.changeFlag ) {
						this.change();
					}

					if ( this.unit ) {
						return this.options.value + this.unit;
					} else {
						return this.output( this.options.value, false ); // no DOM update
					}
				}
			},

			isUnitLegal: function( unit ) {
				var legalUnit;

				$.each( this.options.units, function( index, value ) {
					if ( value.toLowerCase() === unit.toLowerCase() ) {
						legalUnit = unit.toLowerCase();
						return false;
					}
				} );

				return legalUnit;
			},

			// strips units and add them back
			parseValueWithUnit: function( value ) {
				var unit = value.replace( /[^a-zA-Z]/g, '' );
				var number = value.replace( /[^0-9.-]/g, '' );

				if ( unit ) {
					unit = this.isUnitLegal( unit );
				}

				this.options.value = this.checkMaxMin( number / 1 );
				this.unit = unit || undefined;
				return this.options.value + ( unit || '' );
			},

			checkMaxMin: function( value ) {
				// if unreadable
				if ( isNaN( parseFloat( value ) ) ) {
					return value;
				}
				// if not within range return the limit
				if ( !( value <= this.options.max && value >= this.options.min ) ) {
					value = value >= this.options.max ? this.options.max : this.options.min;
				}
				return value;
			},

			disable: function() {
				this.options.disabled = true;
				this.$element.addClass( 'disabled' );
				this.$input.attr( 'disabled', '' );
				this.$element.find( 'button' ).addClass( 'disabled' );
			},

			enable: function() {
				this.options.disabled = false;
				this.$element.removeClass( 'disabled' );
				this.$input.removeAttr( "disabled" );
				this.$element.find( 'button' ).removeClass( 'disabled' );
			},

			keydown: function( event ) {
				var keyCode = event.keyCode;
				if ( keyCode === 38 ) {
					this.step( true );
				} else if ( keyCode === 40 ) {
					this.step( false );
				}
			},

			keyup: function( event ) {
				var keyCode = event.keyCode;

				if ( keyCode === 38 || keyCode === 40 ) {
					this.triggerChangedEvent();
				}
			},

			bindMousewheelListeners: function() {
				var inputEl = this.$input.get( 0 );
				if ( inputEl.addEventListener ) {
					//IE 9, Chrome, Safari, Opera
					inputEl.addEventListener( 'mousewheel', $.proxy( this.mousewheelHandler, this ), false );
					// Firefox
					inputEl.addEventListener( 'DOMMouseScroll', $.proxy( this.mousewheelHandler, this ), false );
				} else {
					// IE <9
					inputEl.attachEvent( 'onmousewheel', $.proxy( this.mousewheelHandler, this ) );
				}
			},

			mousewheelHandler: function( event ) {
				var e = window.event || event; // old IE support
				var delta = Math.max( -1, Math.min( 1, ( e.wheelDelta || -e.detail ) ) );
				var self = this;

				clearTimeout( this.mousewheelTimeout );
				this.mousewheelTimeout = setTimeout( function() {
					self.triggerChangedEvent();
				}, 300 );

				if ( delta < 0 ) {
					this.step( true );
				} else {
					this.step( false );
				}

				if ( e.preventDefault ) {
					e.preventDefault();
				} else {
					e.returnValue = false;
				}
				return false;
			}
		};


		// SPINBOX PLUGIN DEFINITION

		$.fn.spinbox = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.spinbox' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.spinbox', ( data = new Spinbox( this, options ) ) );
				}
				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		// value needs to be 0 for this.render();
		$.fn.spinbox.defaults = {
			value: 0,
			min: 0,
			max: 999,
			step: 1,
			hold: true,
			speed: 'medium',
			disabled: false,
			cycle: false,
			units: [],
			decimalMark: '.'
		};

		$.fn.spinbox.Constructor = Spinbox;

		$.fn.spinbox.noConflict = function() {
			$.fn.spinbox = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mousedown.fu.spinbox.data-api', '[data-initialize=spinbox]', function( e ) {
			var $control = $( e.target ).closest( '.spinbox' );
			if ( !$control.data( 'fu.spinbox' ) ) {
				$control.spinbox( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=spinbox]' ).each( function() {
				var $this = $( this );
				if ( !$this.data( 'fu.spinbox' ) ) {
					$this.spinbox( $this.data() );
				}
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Tree
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.tree;

		// TREE CONSTRUCTOR AND PROTOTYPE

		var Tree = function( element, options ) {
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.tree.defaults, options );

			this.$element.on( 'click.fu.tree', '.tree-item', $.proxy( function( ev ) {
				this.selectItem( ev.currentTarget );
			}, this ) );
			this.$element.on( 'click.fu.tree', '.tree-branch-name', $.proxy( function( ev ) {
				this.openFolder( ev.currentTarget );
			}, this ) );

			if ( this.options.folderSelect ) {
				this.$element.off( 'click.fu.tree', '.tree-branch-name' );
				this.$element.on( 'click.fu.tree', '.icon-caret', $.proxy( function( ev ) {
					this.openFolder( $( ev.currentTarget ).parent() );
				}, this ) );
				this.$element.on( 'click.fu.tree', '.tree-branch-name', $.proxy( function( ev ) {
					this.selectFolder( $( ev.currentTarget ) );
				}, this ) );
			}

			this.render();
		};

		Tree.prototype = {
			constructor: Tree,

			destroy: function() {
				// any external bindings [none]
				// empty elements to return to original markup
				this.$element.find( "li:not([data-template])" ).remove();

				this.$element.remove();
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			render: function() {
				this.populate( this.$element );
			},

			populate: function( $el ) {
				var self = this;
				var $parent = $el.parent();
				var loader = $parent.find( '.tree-loader:eq(0)' );

				loader.removeClass( 'hide' );
				this.options.dataSource( this.options.folderSelect ? $parent.data() : $el.data(), function( items ) {
					loader.addClass( 'hide' );

					$.each( items.data, function( index, value ) {
						var $entity;

						if ( value.type === 'folder' ) {
							$entity = self.$element.find( '[data-template=treebranch]:eq(0)' ).clone().removeClass( 'hide' ).removeAttr( 'data-template' );
							$entity.data( value );
							$entity.find( '.tree-branch-name > .tree-label' ).html( value.name );
						} else if ( value.type === 'item' ) {
							$entity = self.$element.find( '[data-template=treeitem]:eq(0)' ).clone().removeClass( 'hide' ).removeAttr( 'data-template' );
							$entity.find( '.tree-item-name > .tree-label' ).html( value.name );
							$entity.data( value );
						}

						// Decorate $entity with data making the element
						// easily accessable with libraries like jQuery.
						//
						// Values are contained within the object returned
						// for folders and items as dataAttributes:
						//
						// {
						//     name: "An Item",
						//     type: 'item',
						//     dataAttributes = {
						//         'classes': 'required-item red-text',
						//         'data-parent': parentId,
						//         'guid': guid,
						//         'id': guid
						//     }
						// };

						// add attributes to tree-branch or tree-item
						var dataAttributes = value.dataAttributes || [];
						$.each( dataAttributes, function( key, value ) {
							switch ( key ) {
								case 'class':
								case 'classes':
								case 'className':
									$entity.addClass( value );
									break;

									// allow custom icons
								case 'data-icon':
									$entity.find( '.icon-item' ).removeClass().addClass( 'icon-item ' + value );
									$entity.attr( key, value );
									break;

									// ARIA support
								case 'id':
									$entity.attr( key, value );
									$entity.attr( 'aria-labelledby', value + '-label' );
									$entity.find( '.tree-branch-name > .tree-label' ).attr( 'id', value + '-label' );
									break;

									// id, style, data-*
								default:
									$entity.attr( key, value );
									break;
							}
						} );

						// add child nodes
						if ( $el.hasClass( 'tree-branch-header' ) ) {
							$parent.find( '.tree-branch-children:eq(0)' ).append( $entity );
						} else {
							$el.append( $entity );
						}
					} );

					// return newly populated folder
					self.$element.trigger( 'loaded.fu.tree', $parent );
				} );
			},

			selectItem: function( el ) {
				var $el = $( el );
				var $all = this.$element.find( '.tree-selected' );
				var data = [];
				var $icon = $el.find( '.icon-item' );

				if ( this.options.multiSelect ) {
					$.each( $all, function( index, value ) {
						var $val = $( value );
						if ( $val[ 0 ] !== $el[ 0 ] ) {
							data.push( $( value ).data() );
						}
					} );
				} else if ( $all[ 0 ] !== $el[ 0 ] ) {
					$all.removeClass( 'tree-selected' )
						.find( '.glyphicon' ).removeClass( 'glyphicon-ok' ).addClass( 'tree-dot' );
					data.push( $el.data() );
				}

				var eventType = 'selected';
				if ( $el.hasClass( 'tree-selected' ) ) {
					eventType = 'unselected';
					$el.removeClass( 'tree-selected' );
					if ( $icon.hasClass( 'glyphicon-ok' ) || $icon.hasClass( 'fueluxicon-bullet' ) ) {
						$icon.removeClass( 'glyphicon-ok' ).addClass( 'fueluxicon-bullet' );
					}
				} else {
					$el.addClass( 'tree-selected' );
					// add tree dot back in
					if ( $icon.hasClass( 'glyphicon-ok' ) || $icon.hasClass( 'fueluxicon-bullet' ) ) {
						$icon.removeClass( 'fueluxicon-bullet' ).addClass( 'glyphicon-ok' );
					}
					if ( this.options.multiSelect ) {
						data.push( $el.data() );
					}
				}

				if ( data.length ) {
					this.$element.trigger( 'selected', {
						selected: data
					} );
				}

				// Return new list of selected items, the item
				// clicked, and the type of event:
				$el.trigger( 'updated.fu.tree', {
					selected: data,
					item: $el,
					eventType: eventType
				} );
			},

			openFolder: function( el ) {
				var $el = $( el ); // tree-branch-name
				var $branch;
				var $treeFolderContent;
				var $treeFolderContentFirstChild;

				// if item select only
				if ( !this.options.folderSelect ) {
					$el = $( el ).parent(); // tree-branch, if tree-branch-name clicked
				}

				$branch = $el.closest( '.tree-branch' ); // tree branch
				$treeFolderContent = $branch.find( '.tree-branch-children' );
				$treeFolderContentFirstChild = $treeFolderContent.eq( 0 );

				// manipulate branch/folder
				var eventType, classToTarget, classToAdd;
				if ( $el.find( '.glyphicon-folder-close' ).length ) {
					eventType = 'opened';
					classToTarget = '.glyphicon-folder-close';
					classToAdd = 'glyphicon-folder-open';

					$branch.addClass( 'tree-open' );
					$branch.attr( 'aria-expanded', 'true' );

					$treeFolderContentFirstChild.removeClass( 'hide' );
					if ( !$treeFolderContent.children().length ) {
						this.populate( $treeFolderContent );
					}

				} else if ( $el.find( '.glyphicon-folder-open' ) ) {
					eventType = 'closed';
					classToTarget = '.glyphicon-folder-open';
					classToAdd = 'glyphicon-folder-close';

					$branch.removeClass( 'tree-open' );
					$branch.attr( 'aria-expanded', 'false' );
					$treeFolderContentFirstChild.addClass( 'hide' );

					// remove if no cache
					if ( !this.options.cacheItems ) {
						$treeFolderContentFirstChild.empty();
					}

				}

				$branch.find( '> .tree-branch-header .icon-folder' ).eq( 0 )
					.removeClass( 'glyphicon-folder-close glyphicon-folder-open' )
					.addClass( classToAdd );

				this.$element.trigger( eventType, $branch.data() );
			},

			selectFolder: function( clickedElement ) {
				var $clickedElement = $( clickedElement );
				var $clickedBranch = $clickedElement.closest( '.tree-branch' );
				var $selectedBranch = this.$element.find( '.tree-branch.tree-selected' );
				var selectedData = [];
				var eventType = 'selected';

				// select clicked item
				if ( $clickedBranch.hasClass( 'tree-selected' ) ) {
					eventType = 'unselected';
					$clickedBranch.removeClass( 'tree-selected' );
				} else {
					$clickedBranch.addClass( 'tree-selected' );
				}

				if ( this.options.multiSelect ) {

					// get currently selected
					$selectedBranch = this.$element.find( '.tree-branch.tree-selected' );

					$.each( $selectedBranch, function( index, value ) {
						var $value = $( value );
						if ( $value[ 0 ] !== $clickedElement[ 0 ] ) {
							selectedData.push( $( value ).data() );
						}
					} );

				} else if ( $selectedBranch[ 0 ] !== $clickedElement[ 0 ] ) {
					$selectedBranch.removeClass( 'tree-selected' );

					selectedData.push( $clickedBranch.data() );
				}

				if ( selectedData.length ) {
					this.$element.trigger( 'selected.fu.tree', {
						selected: selectedData
					} );
				}

				// Return new list of selected items, the item
				// clicked, and the type of event:
				$clickedElement.trigger( 'updated.fu.tree', {
					selected: selectedData,
					item: $clickedElement,
					eventType: eventType
				} );
			},

			selectedItems: function() {
				var $sel = this.$element.find( '.tree-selected' );
				var data = [];

				$.each( $sel, function( index, value ) {
					data.push( $( value ).data() );
				} );
				return data;
			},

			// collapses open folders
			collapse: function() {
				var cacheItems = this.options.cacheItems;

				// find open folders
				this.$element.find( '.icon-folder-open' ).each( function() {
					// update icon class
					var $this = $( this )
						.removeClass( 'icon-folder-close icon-folder-open' )
						.addClass( 'icon-folder-close' );

					// "close" or empty folder contents
					var $parent = $this.parent().parent();
					var $folder = $parent.children( '.tree-branch-children' );

					$folder.addClass( 'hide' );
					if ( !cacheItems ) {
						$folder.empty();
					}
				} );
			}
		};


		// TREE PLUGIN DEFINITION

		$.fn.tree = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.tree' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'fu.tree', ( data = new Tree( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.tree.defaults = {
			dataSource: function( options, callback ) {},
			multiSelect: false,
			cacheItems: true,
			folderSelect: true
		};

		$.fn.tree.Constructor = Tree;

		$.fn.tree.noConflict = function() {
			$.fn.tree = old;
			return this;
		};


		// NO DATA-API DUE TO NEED OF DATA-SOURCE



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Wizard
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.wizard;

		// WIZARD CONSTRUCTOR AND PROTOTYPE

		var Wizard = function( element, options ) {
			var kids;

			this.$element = $( element );
			this.options = $.extend( {}, $.fn.wizard.defaults, options );
			this.options.disablePreviousStep = ( this.$element.attr( 'data-restrict' ) === "previous" ) ? true : this.options.disablePreviousStep;
			this.currentStep = this.options.selectedItem.step;
			this.numSteps = this.$element.find( '.steps li' ).length;
			this.$prevBtn = this.$element.find( 'button.btn-prev' );
			this.$nextBtn = this.$element.find( 'button.btn-next' );

			kids = this.$nextBtn.children().detach();
			this.nextText = $.trim( this.$nextBtn.text() );
			this.$nextBtn.append( kids );

			// handle events
			this.$prevBtn.on( 'click.fu.wizard', $.proxy( this.previous, this ) );
			this.$nextBtn.on( 'click.fu.wizard', $.proxy( this.next, this ) );
			this.$element.on( 'click.fu.wizard', 'li.complete', $.proxy( this.stepclicked, this ) );

			this.selectedItem( this.options.selectedItem );

			if ( this.options.disablePreviousStep ) {
				this.$prevBtn.attr( 'disabled', true );
				this.$element.find( '.steps' ).addClass( 'previous-disabled' );
			}
		};

		Wizard.prototype = {

			constructor: Wizard,

			destroy: function() {
				this.$element.remove();
				// any external bindings [none]
				// empty elements to return to original markup [none]
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			//index is 1 based
			//second parameter can be array of objects [{ ... }, { ... }] or you can pass n additional objects as args
			//object structure is as follows (all params are optional): { badge: '', label: '', pane: '' }
			addSteps: function( index ) {
				var items = [].slice.call( arguments ).slice( 1 );
				var $steps = this.$element.find( '.steps' );
				var $stepContent = this.$element.find( '.step-content' );
				var i, l, $pane, $startPane, $startStep, $step;

				index = ( index === -1 || ( index > ( this.numSteps + 1 ) ) ) ? this.numSteps + 1 : index;
				if ( items[ 0 ] instanceof Array ) {
					items = items[ 0 ];
				}

				$startStep = $steps.find( 'li:nth-child(' + index + ')' );
				$startPane = $stepContent.find( '.step-pane:nth-child(' + index + ')' );
				if ( $startStep.length < 1 ) {
					$startStep = null;
				}

				for ( i = 0, l = items.length; i < l; i++ ) {
					$step = $( '<li data-step="' + index + '"><span class="badge badge-info"></span></li>' );
					$step.append( items[ i ].label || '' ).append( '<span class="chevron"></span>' );
					$step.find( '.badge' ).append( items[ i ].badge || index );

					$pane = $( '<div class="step-pane" data-step="' + index + '"></div>' );
					$pane.append( items[ i ].pane || '' );

					if ( !$startStep ) {
						$steps.append( $step );
						$stepContent.append( $pane );
					} else {
						$startStep.before( $step );
						$startPane.before( $pane );
					}
					index++;
				}

				this.syncSteps();
				this.numSteps = $steps.find( 'li' ).length;
				this.setState();
			},

			//index is 1 based, howMany is number to remove
			removeSteps: function( index, howMany ) {
				var action = 'nextAll';
				var i = 0;
				var $steps = this.$element.find( '.steps' );
				var $stepContent = this.$element.find( '.step-content' );
				var $start;

				howMany = ( howMany !== undefined ) ? howMany : 1;

				if ( index > $steps.find( 'li' ).length ) {
					$start = $steps.find( 'li:last' );
				} else {
					$start = $steps.find( 'li:nth-child(' + index + ')' ).prev();
					if ( $start.length < 1 ) {
						action = 'children';
						$start = $steps;
					}
				}

				$start[ action ]().each( function() {
					var item = $( this );
					var step = item.attr( 'data-step' );
					if ( i < howMany ) {
						item.remove();
						$stepContent.find( '.step-pane[data-step="' + step + '"]:first' ).remove();
					} else {
						return false;
					}
					i++;
				} );

				this.syncSteps();
				this.numSteps = $steps.find( 'li' ).length;
				this.setState();
			},

			setState: function() {
				var canMovePrev = ( this.currentStep > 1 );
				var firstStep = ( this.currentStep === 1 );
				var lastStep = ( this.currentStep === this.numSteps );

				// disable buttons based on current step
				if ( !this.options.disablePreviousStep ) {
					this.$prevBtn.attr( 'disabled', ( firstStep === true || canMovePrev === false ) );
				}

				// change button text of last step, if specified
				var last = this.$nextBtn.attr( 'data-last' );
				if ( last ) {
					this.lastText = last;
					// replace text
					var text = this.nextText;
					if ( lastStep === true ) {
						text = this.lastText;
						// add status class to wizard
						this.$element.addClass( 'complete' );
					} else {
						this.$element.removeClass( 'complete' );
					}
					var kids = this.$nextBtn.children().detach();
					this.$nextBtn.text( text ).append( kids );
				}

				// reset classes for all steps
				var $steps = this.$element.find( '.steps li' );
				$steps.removeClass( 'active' ).removeClass( 'complete' );
				$steps.find( 'span.badge' ).removeClass( 'badge-info' ).removeClass( 'badge-success' );

				// set class for all previous steps
				var prevSelector = '.steps li:lt(' + ( this.currentStep - 1 ) + ')';
				var $prevSteps = this.$element.find( prevSelector );
				$prevSteps.addClass( 'complete' );
				$prevSteps.find( 'span.badge' ).addClass( 'badge-success' );

				// set class for current step
				var currentSelector = '.steps li:eq(' + ( this.currentStep - 1 ) + ')';
				var $currentStep = this.$element.find( currentSelector );
				$currentStep.addClass( 'active' );
				$currentStep.find( 'span.badge' ).addClass( 'badge-info' );

				// set display of target element
				var $stepContent = this.$element.find( '.step-content' );
				var target = $currentStep.attr( 'data-step' );
				$stepContent.find( '.step-pane' ).removeClass( 'active' );
				$stepContent.find( '.step-pane[data-step="' + target + '"]:first' ).addClass( 'active' );

				// reset the wizard position to the left
				this.$element.find( '.steps' ).first().attr( 'style', 'margin-left: 0' );

				// check if the steps are wider than the container div
				var totalWidth = 0;
				this.$element.find( '.steps > li' ).each( function() {
					totalWidth += $( this ).outerWidth();
				} );
				var containerWidth = 0;
				if ( this.$element.find( '.actions' ).length ) {
					containerWidth = this.$element.width() - this.$element.find( '.actions' ).first().outerWidth();
				} else {
					containerWidth = this.$element.width();
				}
				if ( totalWidth > containerWidth ) {

					// set the position so that the last step is on the right
					var newMargin = totalWidth - containerWidth;
					this.$element.find( '.steps' ).first().attr( 'style', 'margin-left: -' + newMargin + 'px' );

					// set the position so that the active step is in a good
					// position if it has been moved out of view
					if ( this.$element.find( 'li.active' ).first().position().left < 200 ) {
						newMargin += this.$element.find( 'li.active' ).first().position().left - 200;
						if ( newMargin < 1 ) {
							this.$element.find( '.steps' ).first().attr( 'style', 'margin-left: 0' );
						} else {
							this.$element.find( '.steps' ).first().attr( 'style', 'margin-left: -' + newMargin + 'px' );
						}
					}
				}

				// only fire changed event after initializing
				if ( typeof( this.initialized ) !== 'undefined' ) {
					var e = $.Event( 'changed.fu.wizard' );
					this.$element.trigger( e, {
						step: this.currentStep
					} );
				}

				this.initialized = true;
			},

			stepclicked: function( e ) {
				var li = $( e.currentTarget );
				var index = this.$element.find( '.steps li' ).index( li );
				var canMovePrev = true;

				if ( this.options.disablePreviousStep ) {
					if ( index < this.currentStep ) {
						canMovePrev = false;
					}
				}

				if ( canMovePrev ) {
					var evt = $.Event( 'stepclicked.fu.wizard' );
					this.$element.trigger( evt, {
						step: index + 1
					} );
					if ( evt.isDefaultPrevented() ) {
						return;
					}

					this.currentStep = ( index + 1 );
					this.setState();
				}
			},

			syncSteps: function() {
				var i = 1;
				var $steps = this.$element.find( '.steps' );
				var $stepContent = this.$element.find( '.step-content' );

				$steps.children().each( function() {
					var item = $( this );
					var badge = item.find( '.badge' );
					var step = item.attr( 'data-step' );

					if ( !isNaN( parseInt( badge.html(), 10 ) ) ) {
						badge.html( i );
					}
					item.attr( 'data-step', i );
					$stepContent.find( '.step-pane[data-step="' + step + '"]:last' ).attr( 'data-step', i );
					i++;
				} );
			},

			previous: function() {
				var canMovePrev = ( this.currentStep > 1 );
				if ( this.options.disablePreviousStep ) {
					canMovePrev = false;
				}
				if ( canMovePrev ) {
					var e = $.Event( 'actionclicked.fu.wizard' );
					this.$element.trigger( e, {
						step: this.currentStep,
						direction: 'previous'
					} );
					if ( e.isDefaultPrevented() ) {
						return;
					} // don't increment

					this.currentStep -= 1;
					this.setState();
				}

				// return focus to control after selecting an option
				if ( this.$prevBtn.is( ':disabled' ) ) {
					this.$nextBtn.focus();
				} else {
					this.$prevBtn.focus();
				}

			},

			next: function() {
				var canMoveNext = ( this.currentStep + 1 <= this.numSteps );
				var lastStep = ( this.currentStep === this.numSteps );

				if ( canMoveNext ) {
					var e = $.Event( 'actionclicked.fu.wizard' );
					this.$element.trigger( e, {
						step: this.currentStep,
						direction: 'next'
					} );
					if ( e.isDefaultPrevented() ) {
						return;
					} // don't increment

					this.currentStep += 1;
					this.setState();
				} else if ( lastStep ) {
					this.$element.trigger( 'finished.fu.wizard' );
				}

				// return focus to control after selecting an option
				if ( this.$nextBtn.is( ':disabled' ) ) {
					this.$prevBtn.focus();
				} else {
					this.$nextBtn.focus();
				}
			},

			selectedItem: function( selectedItem ) {
				var retVal, step;

				if ( selectedItem ) {

					step = selectedItem.step || -1;

					if ( step >= 1 && step <= this.numSteps ) {
						this.currentStep = step;
						this.setState();
					} else {
						step = this.$element.find( '.steps li.active:first' ).attr( 'data-step' );
						if ( !isNaN( step ) ) {
							this.currentStep = parseInt( step, 10 );
							this.setState();
						}
					}

					retVal = this;
				} else {
					retVal = {
						step: this.currentStep
					};
				}

				return retVal;
			}
		};


		// WIZARD PLUGIN DEFINITION

		$.fn.wizard = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.wizard' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'fu.wizard', ( data = new Wizard( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.wizard.defaults = {
			disablePreviousStep: false,
			selectedItem: {
				step: -1
			} //-1 means it will attempt to look for "active" class in order to set the step
		};

		$.fn.wizard.Constructor = Wizard;

		$.fn.wizard.noConflict = function() {
			$.fn.wizard = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mouseover.fu.wizard.data-api', '[data-initialize=wizard]', function( e ) {
			var $control = $( e.target ).closest( '.wizard' );
			if ( !$control.data( 'fu.wizard' ) ) {
				$control.wizard( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=wizard]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'fu.wizard' ) ) return;
				$this.wizard( $this.data() );
			} );
		} );


	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Infinite Scroll
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.infinitescroll;

		// INFINITE SCROLL CONSTRUCTOR AND PROTOTYPE

		var InfiniteScroll = function( element, options ) {
			this.$element = $( element );
			this.$element.addClass( 'infinitescroll' );
			this.options = $.extend( {}, $.fn.infinitescroll.defaults, options );

			this.curScrollTop = this.$element.scrollTop();
			this.curPercentage = this.getPercentage();
			this.fetchingData = false;

			this.$element.on( 'scroll.fu.infinitescroll', $.proxy( this.onScroll, this ) );
		};

		InfiniteScroll.prototype = {

			constructor: InfiniteScroll,

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]

				// empty elements to return to original markup
				this.$element.empty();

				return this.$element[ 0 ].outerHTML;
			},

			disable: function() {
				this.$element.off( 'scroll.fu.infinitescroll' );
			},

			enable: function() {
				this.$element.on( 'scroll.fu.infinitescroll', $.proxy( this.onScroll, this ) );
			},

			end: function( content ) {
				var end = $( '<div class="infinitescroll-end"></div>' );
				if ( content ) {
					end.append( content );
				} else {
					end.append( '---------' );
				}
				this.$element.append( end );
				this.disable();
			},

			getPercentage: function() {
				var height = ( this.$element.css( 'box-sizing' ) === 'border-box' ) ? this.$element.outerHeight() : this.$element.height();
				return ( height / ( this.$element.get( 0 ).scrollHeight - this.curScrollTop ) ) * 100;
			},

			fetchData: function( force ) {
				var load = $( '<div class="infinitescroll-load"></div>' );
				var self = this;
				var moreBtn;

				var fetch = function() {
					var helpers = {
						percentage: self.curPercentage,
						scrollTop: self.curScrollTop
					};
					var $loader = $( '<div class="loader"></div>' );
					load.append( $loader );
					$loader.loader();
					if ( self.options.dataSource ) {
						self.options.dataSource( helpers, function( resp ) {
							var end;
							load.remove();
							if ( resp.content ) {
								self.$element.append( resp.content );
							}
							if ( resp.end ) {
								end = ( resp.end !== true ) ? resp.end : undefined;
								self.end( end );
							}
							self.fetchingData = false;
						} );
					}
				};

				this.fetchingData = true;
				this.$element.append( load );
				if ( this.options.hybrid && force !== true ) {
					moreBtn = $( '<button type="button" class="btn btn-primary"></button>' );
					if ( typeof this.options.hybrid === 'object' ) {
						moreBtn.append( this.options.hybrid.label );
					} else {
						moreBtn.append( '<span class="glyphicon glyphicon-repeat"></span>' );
					}
					moreBtn.on( 'click.fu.infinitescroll', function() {
						moreBtn.remove();
						fetch();
					} );
					load.append( moreBtn );
				} else {
					fetch();
				}
			},

			onScroll: function( e ) {
				this.curScrollTop = this.$element.scrollTop();
				this.curPercentage = this.getPercentage();
				if ( !this.fetchingData && this.curPercentage >= this.options.percentage ) {
					this.fetchData();
				}
			}

		};

		// INFINITE SCROLL PLUGIN DEFINITION

		$.fn.infinitescroll = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'infinitescroll' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'fu.infinitescroll', ( data = new InfiniteScroll( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.infinitescroll.defaults = {
			dataSource: null,
			hybrid: false, //can be true or an object with structure: { 'label': (markup or jQuery obj) }
			percentage: 95 //percentage scrolled to the bottom before more is loaded
		};

		$.fn.infinitescroll.Constructor = InfiniteScroll;

		$.fn.infinitescroll.noConflict = function() {
			$.fn.infinitescroll = old;
			return this;
		};

		// NO DATA-API DUE TO NEED OF DATA-SOURCE


	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Pillbox
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.pillbox;

		// PILLBOX CONSTRUCTOR AND PROTOTYPE

		var Pillbox = function( element, options ) {
			this.$element = $( element );
			this.$moreCount = this.$element.find( '.pillbox-more-count' );
			this.$pillGroup = this.$element.find( '.pill-group' );
			this.$addItem = this.$element.find( '.pillbox-add-item' );
			this.$addItemWrap = this.$addItem.parent();
			this.$suggest = this.$element.find( '.suggest' );
			this.$pillHTML = '<li class="btn btn-default pill">' +
				'	<span></span>' +
				'	<span class="glyphicon glyphicon-close">' +
				'		<span class="sr-only">Remove</span>' +
				'	</span>' +
				'</li>';

			this.options = $.extend( {}, $.fn.pillbox.defaults, options );

			if ( this.options.readonly === -1 ) {
				if ( this.$element.attr( 'data-readonly' ) !== undefined ) {
					this.readonly( true );
				}
			} else if ( this.options.readonly ) {
				this.readonly( true );
			}

			// EVENTS
			this.acceptKeyCodes = this._generateObject( this.options.acceptKeyCodes );
			// Creatie an object out of the key code array, so we dont have to loop through it on every key stroke

			this.$element.on( 'click.fu.pillbox', '.pill-group > .pill', $.proxy( this.itemClicked, this ) );
			this.$element.on( 'click.fu.pillbox', $.proxy( this.inputFocus, this ) );
			this.$element.on( 'keydown.fu.pillbox', '.pillbox-add-item', $.proxy( this.inputEvent, this ) );
			if ( this.options.onKeyDown ) {
				this.$element.on( 'mousedown.fu.pillbox', '.suggest > li', $.proxy( this.suggestionClick, this ) );
			}
			if ( this.options.edit ) {
				this.$element.addClass( 'pills-editable' );
				this.$element.on( 'blur.fu.pillbox', '.pillbox-add-item', $.proxy( this.cancelEdit, this ) );
			}
		};

		Pillbox.prototype = {
			constructor: Pillbox,

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]
				// empty elements to return to original markup
				// [none]
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			items: function() {
				var self = this;

				return this.$pillGroup.children( '.pill' ).map( function() {
					return self.getItemData( $( this ) );
				} ).get();
			},

			itemClicked: function( e ) {
				var self = this;
				var $target = $( e.target );
				var $item;

				e.preventDefault();
				e.stopPropagation();
				this._closeSuggestions();

				if ( !$target.hasClass( 'pill' ) ) {
					$item = $target.parent();
					if ( this.$element.attr( 'data-readonly' ) === undefined ) {
						if ( $target.hasClass( 'glyphicon-close' ) ) {
							if ( this.options.onRemove ) {
								this.options.onRemove( this.getItemData( $item, {
									el: $item
								} ), $.proxy( this._removeElement, this ) );
							} else {
								this._removeElement( this.getItemData( $item, {
									el: $item
								} ) );
							}
							return false;
						} else if ( this.options.edit ) {
							if ( $item.find( '.pillbox-list-edit' ).length ) {
								return false;
							}
							this.openEdit( $item );
						}
					}
				} else {
					$item = $target;
				}

				this.$element.trigger( 'clicked.fu.pillbox', this.getItemData( $item ) );
			},

			readonly: function( enable ) {
				if ( enable ) {
					this.$element.attr( 'data-readonly', 'readonly' );
				} else {
					this.$element.removeAttr( 'data-readonly' );
				}
				if ( this.options.truncate ) {
					this.truncate( enable );
				}
			},

			suggestionClick: function( e ) {
				var $item = $( e.currentTarget );

				e.preventDefault();
				this.$addItem.val( '' );

				this.addItems( {
					text: $item.html(),
					value: $item.data( 'value' )
				}, true );

				// needs to be after addItems for IE
				this._closeSuggestions();
			},

			itemCount: function() {
				return this.$pillGroup.children( '.pill' ).length;
			},

			// First parameter is 1 based index (optional, if index is not passed all new items will be appended)
			// Second parameter can be array of objects [{ ... }, { ... }] or you can pass n additional objects as args
			// object structure is as follows (index and value are optional): { text: '', value: '' }
			addItems: function() {
				var self = this;
				var items, index, isInternal;

				if ( isFinite( String( arguments[ 0 ] ) ) && !( arguments[ 0 ] instanceof Array ) ) {
					items = [].slice.call( arguments ).slice( 1 );
					index = arguments[ 0 ];
				} else {
					items = [].slice.call( arguments ).slice( 0 );
					isInternal = items[ 1 ] && !items[ 1 ].text;
				}

				//Accounting for array parameter
				if ( items[ 0 ] instanceof Array ) {
					items = items[ 0 ];
				}

				if ( items.length ) {
					$.each( items, function( i, value ) {
						var data = {
							text: value.text,
							value: ( value.value ? value.value : value.text ),
							el: self.$pillHTML
						};

						items[ i ] = data;
					} );

					if ( this.options.edit && this.currentEdit ) {
						items[ 0 ].el = this.currentEdit.wrap( '<div></div>' ).parent().html();
					}

					if ( isInternal ) {
						items.pop( 1 );
					}

					if ( self.options.onAdd && isInternal ) {

						if ( this.options.edit && this.currentEdit ) {
							self.options.onAdd( items[ 0 ], $.proxy( self.saveEdit, this ) );
						} else {
							self.options.onAdd( items[ 0 ], $.proxy( self.placeItems, this, true ) );
						}
					} else {
						if ( this.options.edit && this.currentEdit ) {
							self.saveEdit( items );
						} else {
							if ( index ) {
								self.placeItems( index, items );
							} else {
								self.placeItems( items, isInternal );
							}
						}
					}
				}

			},

			//First parameter is the index (1 based) to start removing items
			//Second parameter is the number of items to be removed
			removeItems: function( index, howMany ) {
				var self = this;
				var count;
				var $currentItem;

				if ( !index ) {
					this.$pillGroup.find( '.pill' ).remove();
					this._removePillTrigger( {
						method: 'removeAll'
					} );
				} else {
					howMany = howMany ? howMany : 1;

					for ( count = 0; count < howMany; count++ ) {
						$currentItem = self.$pillGroup.find( '> .pill:nth-child(' + index + ')' );

						if ( $currentItem ) {
							$currentItem.remove();
						} else {
							break;
						}
					}
				}
			},

			//First parameter is index (optional)
			//Second parameter is new arguments
			placeItems: function() {
				var newHtml = '';
				var items;
				var index;
				var $neighbor;
				var isInternal;

				if ( isFinite( String( arguments[ 0 ] ) ) && !( arguments[ 0 ] instanceof Array ) ) {
					items = [].slice.call( arguments ).slice( 1 );
					index = arguments[ 0 ];
				} else {
					items = [].slice.call( arguments ).slice( 0 );
					isInternal = items[ 1 ] && !items[ 1 ].text;
				}

				if ( items[ 0 ] instanceof Array ) {
					items = items[ 0 ];
				}

				if ( items.length ) {
					$.each( items, function( i, item ) {
						var $item = $( item.el );
						var $neighbor;

						$item.attr( 'data-value', item.value );
						$item.find( 'span:first' ).html( item.text );

						newHtml += $item.wrap( '<div></div>' ).parent().html();
					} );

					if ( this.$pillGroup.children( '.pill' ).length > 0 ) {
						if ( index ) {
							$neighbor = this.$pillGroup.find( '.pill:nth-child(' + index + ')' );

							if ( $neighbor.length ) {
								$neighbor.before( newHtml );
							} else {
								this.$pillGroup.children( '.pill:last' ).after( newHtml );
							}
						} else {
							this.$pillGroup.children( '.pill:last' ).after( newHtml );
						}
					} else {
						this.$pillGroup.prepend( newHtml );
					}

					if ( isInternal ) {
						this.$element.trigger( 'added.fu.pillbox', {
							text: items[ 0 ].text,
							value: items[ 0 ].value
						} );
					}
				}
			},

			inputEvent: function( e ) {
				var self = this;
				var text = this.$addItem.val();
				var value;
				var $lastItem;
				var $selection;

				if ( this.acceptKeyCodes[ e.keyCode ] ) {

					if ( this.options.onKeyDown && this._isSuggestionsOpen() ) {
						$selection = this.$suggest.find( '.pillbox-suggest-sel' );

						if ( $selection.length ) {
							text = $selection.html();
							value = $selection.data( 'value' );
						}
					}

					if ( text.length ) {
						this._closeSuggestions();
						this.$addItem.hide();

						this.addItems( {
							text: text,
							value: value
						}, true );

						setTimeout( function() {
							self.$addItem.show().val( '' ).attr( {
								size: 10
							} );
						}, 0 );
					}

					e.preventDefault();
					return true;
				} else if ( e.keyCode === 8 || e.keyCode === 46 ) {
					// backspace: 8
					// delete: 46

					if ( !text.length ) {
						e.preventDefault();

						if ( this.options.edit && this.currentEdit ) {
							this.cancelEdit();
							return true;
						}

						this._closeSuggestions();
						$lastItem = this.$pillGroup.children( '.pill:last' );

						if ( $lastItem.hasClass( 'pillbox-highlight' ) ) {
							this._removeElement( this.getItemData( $lastItem, {
								el: $lastItem
							} ) );
						} else {
							$lastItem.addClass( 'pillbox-highlight' );
						}

						return true;
					}
				} else if ( text.length > 10 ) {
					if ( this.$addItem.width() < ( this.$pillGroup.width() - 6 ) ) {
						this.$addItem.attr( {
							size: text.length + 3
						} );
					}
				}

				this.$pillGroup.find( '.pill' ).removeClass( 'pillbox-highlight' );

				if ( this.options.onKeyDown ) {
					if ( e.keyCode === 9 || e.keyCode === 38 || e.keyCode === 40 ) {
						// tab: 9
						// up arrow: 38
						// down arrow: 40

						if ( this._isSuggestionsOpen() ) {
							this._keySuggestions( e );
						}
						return true;
					}

					//only allowing most recent event callback to register
					this.callbackId = e.timeStamp;
					this.options.onKeyDown( {
						event: e,
						value: text
					}, function( data ) {
						self._openSuggestions( e, data );
					} );
				}
			},

			openEdit: function( el ) {
				var index = el.index() + 1;
				var $addItemWrap = this.$addItemWrap.detach().hide();

				this.$pillGroup.find( '.pill:nth-child(' + index + ')' ).before( $addItemWrap );
				this.currentEdit = el.detach();

				$addItemWrap.addClass( 'editing' );
				this.$addItem.val( el.find( 'span:first' ).html() );
				$addItemWrap.show();
				this.$addItem.focus().select();
			},

			cancelEdit: function( e ) {
				var $addItemWrap;
				if ( !this.currentEdit ) {
					return false;
				}

				this._closeSuggestions();
				if ( e ) {
					this.$addItemWrap.before( this.currentEdit );
				}
				this.currentEdit = false;

				$addItemWrap = this.$addItemWrap.detach();
				$addItemWrap.removeClass( 'editing' );
				this.$addItem.val( '' );
				this.$pillGroup.append( $addItemWrap );
			},

			//Must match syntax of placeItem so addItem callback is called when an item is edited
			//expecting to receive an array back from the callback containing edited items
			saveEdit: function() {
				var item = arguments[ 0 ][ 0 ];

				this.currentEdit = $( item.el );
				this.currentEdit.data( 'value', item.value );
				this.currentEdit.find( 'span:first' ).html( item.text );

				this.$addItemWrap.hide();
				this.$addItemWrap.before( this.currentEdit );
				this.currentEdit = false;

				this.$addItem.val( '' );
				this.$addItemWrap.removeClass( 'editing' );
				this.$pillGroup.append( this.$addItemWrap.detach().show() );
				this.$element.trigger( 'edited.fu.pillbox', {
					value: item.value,
					text: item.text
				} );
			},

			removeBySelector: function() {
				var selectors = [].slice.call( arguments ).slice( 0 );
				var self = this;

				$.each( selectors, function( i, sel ) {
					self.$pillGroup.find( sel ).remove();
				} );

				this._removePillTrigger( {
					method: 'removeBySelector',
					removedSelectors: selectors
				} );
			},

			removeByValue: function() {
				var values = [].slice.call( arguments ).slice( 0 );
				var self = this;

				$.each( values, function( i, val ) {
					self.$pillGroup.find( '> .pill[data-value="' + val + '"]' ).remove();
				} );

				this._removePillTrigger( {
					method: 'removeByValue',
					removedValues: values
				} );
			},

			removeByText: function() {
				var text = [].slice.call( arguments ).slice( 0 );
				var self = this;

				$.each( text, function( i, text ) {
					self.$pillGroup.find( '> .pill:contains("' + text + '")' ).remove();
				} );

				this._removePillTrigger( {
					method: 'removeByText',
					removedText: text
				} );
			},

			truncate: function( enable ) {
				var self = this;
				var available, full, i, pills, used;

				this.$element.removeClass( 'truncate' );
				this.$addItemWrap.removeClass( 'truncated' );
				this.$pillGroup.find( '.pill' ).removeClass( 'truncated' );

				if ( enable ) {
					this.$element.addClass( 'truncate' );

					available = this.$element.width();
					full = false;
					i = 0;
					pills = this.$pillGroup.find( '.pill' ).length;
					used = 0;

					this.$pillGroup.find( '.pill' ).each( function() {
						var pill = $( this );
						if ( !full ) {
							i++;
							self.$moreCount.text( pills - i );
							if ( ( used + pill.outerWidth( true ) + self.$addItemWrap.outerWidth( true ) ) <= available ) {
								used += pill.outerWidth( true );
							} else {
								self.$moreCount.text( ( pills - i ) + 1 );
								pill.addClass( 'truncated' );
								full = true;
							}
						} else {
							pill.addClass( 'truncated' );
						}
					} );
					if ( i === pills ) {
						this.$addItemWrap.addClass( 'truncated' );
					}
				}
			},

			inputFocus: function( e ) {
				this.$element.find( '.pillbox-add-item' ).focus();
			},

			getItemData: function( el, data ) {
				return $.extend( {
					text: el.find( 'span:first' ).html()
				}, el.data(), data );
			},

			_removeElement: function( data ) {
				data.el.remove();
				delete data.el;
				this.$element.trigger( 'removed.fu.pillbox', data );
			},

			_removePillTrigger: function( removedBy ) {
				this.$element.trigger( 'removed.fu.pillbox', removedBy );
			},

			_generateObject: function( data ) {
				var obj = {};

				$.each( data, function( index, value ) {
					obj[ value ] = true;
				} );

				return obj;
			},

			_openSuggestions: function( e, data ) {
				var markup = '';

				if ( this.callbackId !== e.timeStamp ) {
					return false;
				}

				if ( data.data && data.data.length ) {
					$.each( data.data, function( index, value ) {
						var val = value.value ? value.value : value.text;
						markup += '<li data-value="' + val + '">' + value.text + '</li>';
					} );

					// suggestion dropdown

					this.$suggest.html( '' ).append( markup );
					$( document.body ).trigger( 'suggested.fu.pillbox', this.$suggest );
				}
			},

			_closeSuggestions: function() {
				this.$suggest.html( '' ).parent().removeClass( 'open' );
			},

			_isSuggestionsOpen: function() {
				return this.$suggest.parent().hasClass( 'open' );
			},

			_keySuggestions: function( e ) {
				var $first = this.$suggest.find( 'li.pillbox-suggest-sel' );
				var dir = e.keyCode === 38; // up arrow
				var $next, val;

				e.preventDefault();

				if ( !$first.length ) {
					$first = this.$suggest.find( 'li:first' );
					$first.addClass( 'pillbox-suggest-sel' );
				} else {
					$next = dir ? $first.prev() : $first.next();

					if ( !$next.length ) {
						$next = dir ? this.$suggest.find( 'li:last' ) : this.$suggest.find( 'li:first' );
					}

					if ( $next ) {
						$next.addClass( 'pillbox-suggest-sel' );
						$first.removeClass( 'pillbox-suggest-sel' );
					}
				}
			}
		};

		// PILLBOX PLUGIN DEFINITION

		$.fn.pillbox = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.pillbox' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'fu.pillbox', ( data = new Pillbox( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.pillbox.defaults = {
			onAdd: undefined,
			onRemove: undefined,
			onKeyDown: undefined,
			edit: false,
			readonly: -1, //can be true or false. -1 means it will check for data-readonly="readonly"
			truncate: false,
			acceptKeyCodes: [
				13, //Enter
				188 //Comma
			]

			//example on remove
			/*onRemove: function(data,callback){
			console.log('onRemove');
			callback(data);
		}*/

			//example on key down
			/*onKeyDown: function(event, data, callback ){
			callback({data:[
				{text: Math.random(),value:'sdfsdfsdf'},
				{text: Math.random(),value:'sdfsdfsdf'}
			]});
		}
		*/
			//example onAdd
			/*onAdd: function( data, callback ){
			console.log(data, callback);
			callback(data);
		}*/
		};

		$.fn.pillbox.Constructor = Pillbox;

		$.fn.pillbox.noConflict = function() {
			$.fn.pillbox = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mousedown.fu.pillbox.data-api', '[data-initialize=pillbox]', function( e ) {
			var $control = $( e.target ).closest( '.pillbox' );
			if ( !$control.data( 'fu.pillbox' ) ) {
				$control.pillbox( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=pillbox]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'fu.pillbox' ) ) return;
				$this.pillbox( $this.data() );
			} );
		} );


	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Repeater
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.repeater;

		// REPEATER CONSTRUCTOR AND PROTOTYPE

		var Repeater = function( element, options ) {
			var self = this;
			var currentView;

			this.$element = $( element );

			this.$canvas = this.$element.find( '.repeater-canvas' );
			this.$count = this.$element.find( '.repeater-count' );
			this.$end = this.$element.find( '.repeater-end' );
			this.$filters = this.$element.find( '.repeater-filters' );
			this.$loader = this.$element.find( '.repeater-loader' );
			this.$pageSize = this.$element.find( '.repeater-itemization .selectlist' );
			this.$nextBtn = this.$element.find( '.repeater-next' );
			this.$pages = this.$element.find( '.repeater-pages' );
			this.$prevBtn = this.$element.find( '.repeater-prev' );
			this.$primaryPaging = this.$element.find( '.repeater-primaryPaging' );
			this.$search = this.$element.find( '.repeater-search' ).find( '.search' );
			this.$secondaryPaging = this.$element.find( '.repeater-secondaryPaging' );
			this.$start = this.$element.find( '.repeater-start' );
			this.$viewport = this.$element.find( '.repeater-viewport' );
			this.$views = this.$element.find( '.repeater-views' );

			this.eventStamp = new Date().getTime() + ( Math.floor( Math.random() * 100 ) + 1 );
			this.currentPage = 0;
			this.currentView = null;
			this.infiniteScrollingCallback = function() {};
			this.infiniteScrollingCont = null;
			this.infiniteScrollingEnabled = false;
			this.infiniteScrollingEnd = null;
			this.infiniteScrollingOptions = {};
			this.lastPageInput = 0;
			this.options = $.extend( {}, $.fn.repeater.defaults, options );
			this.pageIncrement = 0; // store direction navigated
			this.resizeTimeout = {};
			this.staticHeight = ( this.options.staticHeight === -1 ) ? this.$element.attr( 'data-staticheight' ) : this.options.staticHeight;

			this.$filters.selectlist();
			this.$pageSize.selectlist();
			this.$primaryPaging.find( '.combobox' ).combobox();
			this.$search.search();

			this.$filters.on( 'changed.fu.selectlist', $.proxy( this.render, this, {
				clearInfinite: true,
				pageIncrement: null
			} ) );
			this.$nextBtn.on( 'click.fu.repeater', $.proxy( this.next, this ) );
			this.$pageSize.on( 'changed.fu.selectlist', $.proxy( this.render, this, {
				pageIncrement: null
			} ) );
			this.$prevBtn.on( 'click.fu.repeater', $.proxy( this.previous, this ) );
			this.$primaryPaging.find( '.combobox' ).on( 'changed.fu.combobox', function( evt, data ) {
				self.pageInputChange( data.text );
			} );
			this.$search.on( 'searched.fu.search cleared.fu.search', $.proxy( this.render, this, {
				clearInfinite: true,
				pageIncrement: null
			} ) );
			this.$secondaryPaging.on( 'blur.fu.repeater', function() {
				self.pageInputChange( self.$secondaryPaging.val() );
			} );
			this.$secondaryPaging.on( 'change.fu.repeater', function() {
				self.pageInputChange( self.$secondaryPaging.val() );
			} );
			this.$views.find( 'input' ).on( 'change.fu.repeater', $.proxy( this.viewChanged, this ) );

			// ID needed since event is bound to instance
			$( window ).on( 'resize.fu.repeater.' + this.eventStamp, function( event ) {
				clearTimeout( self.resizeTimeout );
				self.resizeTimeout = setTimeout( function() {
					self.resize();
					self.$element.trigger( 'resized.fu.repeater' );
				}, 75 );
			} );

			this.$loader.loader();
			this.$loader.loader( 'pause' );
			currentView = ( this.options.defaultView !== -1 ) ? this.options.defaultView : this.$views.find( 'label.active input' ).val();

			this.initViews( function() {
				self.resize();
				self.$element.trigger( 'resized.fu.repeater' );
				self.render( {
					changeView: currentView
				} );
			} );
		};

		Repeater.prototype = {
			constructor: Repeater,

			clear: function( options ) {
				var scan = function( cont ) {
					var keep = [];
					cont.children().each( function() {
						var item = $( this );
						var pres = item.attr( 'data-preserve' );
						if ( pres === 'deep' ) {
							item.detach();
							keep.push( item );
						} else if ( pres === 'shallow' ) {
							scan( item );
							item.detach();
							keep.push( item );
						}
					} );
					cont.empty();
					cont.append( keep );
				};

				options = options || {};

				if ( !options.preserve ) {
					this.$canvas.empty();
				} else if ( !this.infiniteScrollingEnabled || options.clearInfinite ) {
					scan( this.$canvas );
				}
			},

			destroy: function() {
				var markup;
				// set input value attrbute in markup
				this.$element.find( 'input' ).each( function() {
					$( this ).attr( 'value', $( this ).val() );
				} );

				// empty elements to return to original markup
				this.$canvas.empty();
				markup = this.$element[ 0 ].outerHTML;

				// destroy components and remove leftover
				this.$element.find( '.combobox' ).combobox( 'destroy' );
				this.$element.find( '.selectlist' ).selectlist( 'destroy' );
				this.$element.find( '.search' ).search( 'destroy' );
				if ( this.infiniteScrollingEnabled ) {
					$( this.infiniteScrollingCont ).infinitescroll( 'destroy' );
				}
				this.$element.remove();

				// any external events
				$( window ).off( 'resize.fu.repeater.' + this.eventStamp );

				return markup;
			},

			getDataOptions: function( options, callback ) {
				var opts = {};
				var val, viewDataOpts;

				options = options || {};

				opts.filter = this.$filters.selectlist( 'selectedItem' );
				opts.view = this.currentView;

				if ( !this.infiniteScrollingEnabled ) {
					opts.pageSize = parseInt( this.$pageSize.selectlist( 'selectedItem' ).value, 10 );
				}
				if ( options.pageIncrement !== undefined ) {
					if ( options.pageIncrement === null ) {
						this.currentPage = 0;
					} else {
						this.currentPage += options.pageIncrement;
					}
				}
				opts.pageIndex = this.currentPage;

				val = this.$search.find( 'input' ).val();
				if ( val !== '' ) {
					opts.search = val;
				}

				viewDataOpts = $.fn.repeater.views[ this.currentView ] || {};
				viewDataOpts = viewDataOpts.dataOptions;
				if ( viewDataOpts ) {
					viewDataOpts.call( this, opts, function( obj ) {
						callback( obj );
					} );
				} else {
					callback( opts );
				}
			},

			infiniteScrolling: function( enable, options ) {
				var itemization = this.$element.find( '.repeater-itemization' );
				var pagination = this.$element.find( '.repeater-pagination' );
				var cont, data;

				options = options || {};

				if ( enable ) {
					this.infiniteScrollingEnabled = true;
					this.infiniteScrollingEnd = options.end;
					delete options.dataSource;
					delete options.end;
					this.infiniteScrollingOptions = options;
					itemization.hide();
					pagination.hide();
				} else {
					cont = this.infiniteScrollingCont;
					data = cont.data();
					delete data.infinitescroll;
					cont.off( 'scroll' );
					cont.removeClass( 'infinitescroll' );

					this.infiniteScrollingCont = null;
					this.infiniteScrollingEnabled = false;
					this.infiniteScrollingEnd = null;
					this.infiniteScrollingOptions = {};
					itemization.show();
					pagination.show();
				}
			},

			infiniteScrollPaging: function( data, options ) {
				var end = ( this.infiniteScrollingEnd !== true ) ? this.infiniteScrollingEnd : undefined;
				var page = data.page;
				var pages = data.pages;

				this.currentPage = ( page !== undefined ) ? page : NaN;

				if ( ( this.currentPage + 1 ) >= pages ) {
					this.infiniteScrollingCont.infinitescroll( 'end', end );
				}
			},

			initInfiniteScrolling: function() {
				var cont = this.$canvas.find( '[data-infinite="true"]:first' );
				var opts, self;

				cont = ( cont.length < 1 ) ? this.$canvas : cont;
				if ( cont.data( 'fu.infinitescroll' ) ) {
					cont.infinitescroll( 'enable' );
				} else {
					self = this;
					opts = $.extend( {}, this.infiniteScrollingOptions );
					opts.dataSource = function( helpers, callback ) {
						self.infiniteScrollingCallback = callback;
						self.render( {
							pageIncrement: 1
						} );
					};
					cont.infinitescroll( opts );
					this.infiniteScrollingCont = cont;
				}
			},

			initViews: function( callback ) {
				var views = [];
				var i, viewsLength;

				var init = function( index ) {
					var next = function() {
						index++;
						if ( index < viewsLength ) {
							init( index );
						} else {
							callback();
						}
					};

					if ( views[ index ].initialize ) {
						views[ index ].initialize.call( this, {}, function() {
							next();
						} );
					} else {
						next();
					}
				};

				for ( i in $.fn.repeater.views ) {
					views.push( $.fn.repeater.views[ i ] );
				}
				viewsLength = views.length;
				if ( viewsLength > 0 ) {
					init( 0 );
				} else {
					callback();
				}
			},

			itemization: function( data ) {
				this.$count.html( data.count || '' );
				this.$end.html( data.end || '' );
				this.$start.html( data.start || '' );
			},

			next: function() {
				var d = 'disabled';
				this.$nextBtn.attr( d, d );
				this.$prevBtn.attr( d, d );
				this.pageIncrement = 1;
				this.render( {
					pageIncrement: this.pageIncrement
				} );
			},

			pageInputChange: function( val ) {
				var pageInc;
				if ( val !== this.lastPageInput ) {
					this.lastPageInput = val;
					val = parseInt( val, 10 ) - 1;
					pageInc = val - this.currentPage;
					this.render( {
						pageIncrement: pageInc
					} );
				}
			},

			pagination: function( data ) {
				var act = 'active';
				var dsbl = 'disabled';
				var page = data.page;
				var pages = data.pages;
				var dropMenu, i, l;

				this.currentPage = ( page !== undefined ) ? page : NaN;

				this.$primaryPaging.removeClass( act );
				this.$secondaryPaging.removeClass( act );

				if ( pages <= this.options.dropPagingCap ) {
					this.$primaryPaging.addClass( act );
					dropMenu = this.$primaryPaging.find( '.dropdown-menu' );
					dropMenu.empty();
					for ( i = 0; i < pages; i++ ) {
						l = i + 1;
						dropMenu.append( '<li data-value="' + l + '"><a href="#">' + l + '</a></li>' );
					}
					this.$primaryPaging.find( 'input.form-control' ).val( this.currentPage + 1 );
				} else {
					this.$secondaryPaging.addClass( act );
					this.$secondaryPaging.val( this.currentPage + 1 );
				}
				this.lastPageInput = this.currentPage + 1 + '';

				this.$pages.html( pages );

				// this is not the last page
				if ( ( this.currentPage + 1 ) < pages ) {
					this.$nextBtn.removeAttr( dsbl );
				} else {
					this.$nextBtn.attr( dsbl, dsbl );
				}
				// this is not the first page
				if ( ( this.currentPage - 1 ) >= 0 ) {
					this.$prevBtn.removeAttr( dsbl );
				} else {
					this.$prevBtn.attr( dsbl, dsbl );
				}

				// return focus to next/previous buttons after navigating
				if ( this.pageIncrement !== 0 ) {
					if ( this.pageIncrement > 0 ) {
						if ( this.$nextBtn.is( ':disabled' ) ) {
							// if you can't focus, go the other way
							this.$prevBtn.focus();
						} else {
							this.$nextBtn.focus();
						}
					} else {
						if ( this.$prevBtn.is( ':disabled' ) ) {
							// if you can't focus, go the other way
							this.$nextBtn.focus();
						} else {
							this.$prevBtn.focus();
						}
					}
				}
			},

			previous: function() {
				var d = 'disabled';
				this.$nextBtn.attr( d, d );
				this.$prevBtn.attr( d, d );
				this.pageIncrement = -1;
				this.render( {
					pageIncrement: this.pageIncrement
				} );
			},

			render: function( options ) {
				var self = this;
				var viewChanged = false;
				var viewObj = $.fn.repeater.views[ self.currentView ] || {};
				var prevView;

				var start = function() {
					options.preserve = ( options.preserve !== undefined ) ? options.preserve : !viewChanged;
					self.clear( options );
					if ( !self.infiniteScrollingEnabled || ( self.infiniteScrollingEnabled && viewChanged ) ) {
						self.$loader.show().loader( 'play' );
					}
					self.getDataOptions( options, function( opts ) {
						self.options.dataSource( opts, function( data ) {
							var renderer = viewObj.renderer;
							if ( self.infiniteScrollingEnabled ) {
								self.infiniteScrollingCallback( {} );
							} else {
								self.itemization( data );
								self.pagination( data );
							}
							if ( renderer ) {
								self.runRenderer( self.$canvas, renderer, data, function() {
									if ( self.infiniteScrollingEnabled ) {
										if ( viewChanged || options.clearInfinite ) {
											self.initInfiniteScrolling();
										}
										self.infiniteScrollPaging( data, options );
									}
									self.$loader.hide().loader( 'pause' );
									self.$element.trigger( 'loaded.fu.repeater' );
								} );
							}
						} );
					} );
				};

				options = options || {};

				if ( options.changeView && this.currentView !== options.changeView ) {
					prevView = this.currentView;
					this.currentView = options.changeView;
					this.$element.attr( 'data-currentview', this.currentView );
					viewChanged = true;
					if ( this.infiniteScrollingEnabled ) {
						self.infiniteScrolling( false );
					}
					viewObj = $.fn.repeater.views[ self.currentView ] || {};
					if ( viewObj.selected ) {
						viewObj.selected.call( this, {
							prevView: prevView
						}, function() {
							start();
						} );
					} else {
						start();
					}
				} else {
					start();
				}
			},

			resize: function() {
				var staticHeight = this.staticHeight;
				var viewObj = $.fn.repeater.views[ this.currentView ] || {};
				var height, viewportMargins;

				if ( staticHeight !== undefined ) {
					this.$canvas.addClass( 'scrolling' );
					viewportMargins = {
						bottom: this.$viewport.css( 'margin-bottom' ),
						top: this.$viewport.css( 'margin-top' )
					};
					height = ( ( staticHeight === 'true' || staticHeight === true ) ? this.$element.height() : parseInt( staticHeight, 10 ) ) -
						this.$element.find( '.repeater-header' ).outerHeight() -
						this.$element.find( '.repeater-footer' ).outerHeight() -
						( ( viewportMargins.bottom === 'auto' ) ? 0 : parseInt( viewportMargins.bottom, 10 ) ) -
						( ( viewportMargins.top === 'auto' ) ? 0 : parseInt( viewportMargins.top, 10 ) );
					this.$viewport.outerHeight( height );
				} else {
					this.$canvas.removeClass( 'scrolling' );
				}

				if ( viewObj.resize ) {
					viewObj.resize.call( this, {
						height: this.$element.outerHeight(),
						width: this.$element.outerWidth()
					}, function() {} );
				}
			},

			runRenderer: function( container, renderer, data, callback ) {
				var self = this;
				var skipNested = false;
				var repeat, subset, i, l;

				var loopSubset = function( index ) {
					var args = {
						container: container,
						data: data
					};
					if ( renderer.repeat ) {
						args.subset = subset;
						args.index = index;
					}
					if ( subset.length < 1 ) {
						callback();
					} else {
						start( args, function() {
							index++;
							if ( index < subset.length ) {
								loopSubset( index );
							} else {
								callback();
							}
						} );
					}
				};

				var start = function( args, cb ) {
					var item = '';

					var callbacks = {
						before: function( resp ) {
							if ( resp && resp.skipNested === true ) {
								skipNested = true;
							}
							proceed( 'render', args );
						},
						render: function( resp ) {
							var action = ( resp && resp.action ) ? resp.action : 'append';
							if ( resp && resp.item !== undefined ) {
								item = $( resp.item );
								if ( item.length < 1 ) {
									item = resp.item;
								}
								if ( action !== 'none' ) {
									container[ action ]( item );
								}
								args.item = item;
							}
							if ( resp && resp.skipNested === true ) {
								skipNested = true;
							}
							proceed( 'after', args );
						},
						after: function( resp ) {
							var cont;
							var loopNested = function( cont, index ) {
								self.runRenderer( cont, renderer.nested[ index ], data, function() {
									index++;
									if ( index < renderer.nested.length ) {
										loopNested( cont, index );
									} else {
										proceed( 'complete', args );
									}
								} );
							};

							if ( resp && resp.skipNested === true ) {
								skipNested = true;
							}

							if ( renderer.nested && !skipNested ) {
								cont = $( item );
								cont = ( cont.attr( 'data-container' ) === 'true' ) ? cont : cont.find( '[data-container="true"]:first' );
								if ( cont.length < 1 ) {
									cont = container;
								}
								loopNested( cont, 0 );
							} else {
								callbacks.complete( null );
							}
						},
						complete: function( resp ) {
							if ( cb ) {
								cb();
							}
						}
					};

					var proceed = function( stage, argus ) {
						argus = $.extend( {}, argus );
						if ( renderer[ stage ] ) {
							renderer[ stage ].call( self, argus, callbacks[ stage ] );
						} else {
							callbacks[ stage ]( null );
						}
					};

					proceed( 'before', args );
				};

				if ( renderer.repeat ) {
					repeat = renderer.repeat.split( '.' );
					if ( repeat[ 0 ] === 'data' || repeat[ 0 ] === 'this' ) {
						subset = ( repeat[ 0 ] === 'this' ) ? this : data;
						repeat.shift();
					} else {
						repeat = [];
						subset = [ '' ];
					}

					for ( i = 0, l = repeat.length; i < l; i++ ) {
						subset = subset[ repeat[ i ] ];
					}
				} else {
					subset = [ '' ];
				}

				loopSubset( 0 );
			},

			viewChanged: function( e ) {
				var $selected = $( e.target );
				this.render( {
					changeView: $selected.val(),
					pageIncrement: null
				} );
			}
		};

		// REPEATER PLUGIN DEFINITION

		$.fn.repeater = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.repeater' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'fu.repeater', ( data = new Repeater( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.repeater.defaults = {
			dataSource: function( options, callback ) {},
			defaultView: -1, //should be a string value. -1 means it will grab the active view from the view controls
			dropPagingCap: 10,
			staticHeight: -1 //normally true or false. -1 means it will look for data-staticheight on the element
		};

		//views object contains keyed list of view plugins, each an object with following optional parameters:
		//{
		//initialize: function(){},
		//selected: function(){},
		//renderer: {}
		//}
		//renderer object contains following optional parameters:
		//{
		//before: function(helpers){},
		//after: function(helpers){},
		//complete: function(helpers){},
		//repeat: 'parameter.subparameter.etc',
		//render: function(helpers){},
		//nested: [ *array of renderer objects* ]
		//}

		//helpers object structure:
		//{
		//container: jQuery object,	(current renderer parent)
		//data: {...}, (data returned from dataSource)
		//index: int, (only there if repeat was set. current item index)
		//item: str or jQuery object, (only there if rendered function returned item)
		//subset: {}, (only there if repeat was set. subset of data being repeated on)
		//}
		$.fn.repeater.views = {};

		$.fn.repeater.Constructor = Repeater;

		$.fn.repeater.noConflict = function() {
			$.fn.repeater = old;
			return this;
		};


	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Repeater - List View Plugin
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		if ( $.fn.repeater ) {

			$.fn.repeater.Constructor.prototype.clearSelectedItems = function() {
				this.$canvas.find( '.repeater-list-check' ).remove();
				this.$canvas.find( '.repeater-list-items tr.selected' ).removeClass( 'selected' );
			};

			$.fn.repeater.Constructor.prototype.getSelectedItems = function() {
				var selected = [];
				this.$canvas.find( '.repeater-list-items tr.selected' ).each( function() {
					var $item = $( this );
					selected.push( {
						data: $item.data( 'item_data' ),
						element: $item
					} );
				} );
				return selected;
			};

			$.fn.repeater.Constructor.prototype.setSelectedItems = function( items, force ) {
				var selectable = this.options.list_selectable;
				var self = this;
				var data, i, $item, l;

				var eachFunc = function() {
					$item = $( this );
					data = $item.data( 'item_data' ) || {};
					if ( data[ items[ i ].property ] === items[ i ].value ) {
						selectItem( $item, items[ i ].selected );
					}
				};

				var selectItem = function( $itm, select ) {
					select = ( select !== undefined ) ? select : true;
					if ( select ) {
						if ( !force && selectable !== 'multi' ) {
							self.clearSelectedItems();
						}
						if ( !$itm.hasClass( 'selected' ) ) {
							$itm.addClass( 'selected' );
							$itm.find( 'td:first' ).prepend( '<div class="repeater-list-check"><span class="glyphicon glyphicon-ok"></span></div>' );
						}
					} else {
						$itm.find( '.repeater-list-check' ).remove();
						$itm.removeClass( 'selected' );
					}
				};

				if ( !$.isArray( items ) ) {
					items = [ items ];
				}
				if ( force === true || selectable === 'multi' ) {
					l = items.length;
				} else if ( selectable ) {
					l = ( items.length > 0 ) ? 1 : 0;
				} else {
					l = 0;
				}
				for ( i = 0; i < l; i++ ) {
					if ( items[ i ].index !== undefined ) {
						$item = this.$canvas.find( '.repeater-list-items tr:nth-child(' + ( items[ i ].index + 1 ) + ')' );
						if ( $item.length > 0 ) {
							selectItem( $item, items[ i ].selected );
						}
					} else if ( items[ i ].property !== undefined && items[ i ].value !== undefined ) {
						//lint demanded this function not be within this loop
						this.$canvas.find( '.repeater-list-items tr' ).each( eachFunc );
					}
				}
			};

			$.fn.repeater.defaults = $.extend( {}, $.fn.repeater.defaults, {
				list_columnRendered: null,
				list_columnSizing: true,
				list_columnSyncing: true,
				list_infiniteScroll: false,
				list_noItemsHTML: '',
				list_selectable: false,
				list_sortClearing: false,
				list_rowRendered: null
			} );

			$.fn.repeater.views.list = {
				dataOptions: function( opts, callback ) {
					if ( this.list_sortDirection ) {
						opts.sortDirection = this.list_sortDirection;
					}
					if ( this.list_sortProperty ) {
						opts.sortProperty = this.list_sortProperty;
					}
					callback( opts );
				},
				initialize: function( helpers, callback ) {
					this.list_sortDirection = null;
					this.list_sortProperty = null;
					callback();
				},
				selected: function( helpers, callback ) {
					var infScroll = this.options.list_infiniteScroll;
					var opts;

					this.list_firstRender = true;
					this.$loader.addClass( 'noHeader' );

					if ( infScroll ) {
						opts = ( typeof infScroll === 'object' ) ? infScroll : {};
						this.infiniteScrolling( true, opts );
					}

					callback( {} );
				},
				renderer: {
					complete: function( helpers, callback ) {
						columnSyncing.call( this, helpers, callback );
					},
					nested: [ {
						complete: function( helpers, callback ) {
							var auto = [];
							var self = this;
							var i, l, newWidth, taken;

							if ( !this.options.list_columnSizing || this.list_columnsSame ) {
								callback();
							} else {
								i = 0;
								taken = 0;
								helpers.item.find( 'td' ).each( function() {
									var $col = $( this );
									var isLast = ( $col.next( 'td' ).length === 0 ) ? true : false;
									var width;
									if ( self.list_columns[ i ].width !== undefined ) {
										width = self.list_columns[ i ].width;
										$col.outerWidth( width );
										taken += $col.outerWidth();
										if ( !isLast ) {
											self.list_columns[ i ]._auto_width = width;
										} else {
											$col.outerWidth( '' );
										}
									} else {
										auto.push( {
											col: $col,
											index: i,
											last: isLast
										} );
									}
									i++;
								} );

								l = auto.length;
								if ( l > 0 ) {
									newWidth = Math.floor( ( this.$canvas.width() - taken ) / l );
									for ( i = 0; i < l; i++ ) {
										if ( !auto[ i ].last ) {
											auto[ i ].col.outerWidth( newWidth );
											this.list_columns[ auto[ i ].index ]._auto_width = newWidth;
										}
									}
								}
								callback();
							}
						},
						render: function( helpers, callback ) {
							var differentColumns = function( oldCols, newCols ) {
								var i, j, l;
								if ( !oldCols ) {
									return true;
								}
								if ( !newCols ) {
									return false;
								}
								for ( i = 0, l = newCols.length; i < l; i++ ) {
									if ( !oldCols[ i ] ) {
										return true;
									} else {
										for ( j in newCols[ i ] ) {
											if ( oldCols[ i ][ j ] !== newCols[ i ][ j ] ) {
												return true;
											}
										}
									}
								}
								return false;
							};

							if ( this.list_firstRender || differentColumns( this.list_columns, helpers.data.columns ) ) {
								this.$element.find( '.repeater-list-header' ).remove();
								this.list_columns = helpers.data.columns;
								this.list_columnsSame = false;
								this.list_firstRender = false;
								this.$loader.removeClass( 'noHeader' );
								callback( {
									action: 'prepend',
									item: '<table class="table repeater-list-header" data-preserve="deep" role="grid" aria-readonly="true"><tr data-container="true"></tr></table>'
								} );
							} else {
								this.list_columnsSame = true;
								callback( {
									skipNested: true
								} );
							}
						},
						nested: [ {
							render: function( helpers, callback ) {
								var chev = 'glyphicon-chevron';
								var chevDown = chev + '-down';
								var chevUp = chev + '-up';
								var index = helpers.index;
								var self = this;
								var subset = helpers.subset;
								var cssClass, $item, sortable, $span;

								cssClass = subset[ index ].cssClass;
								$item = $( '<td><span class="glyphicon"></span></td>' );
								$item.addClass( ( ( cssClass !== undefined ) ? cssClass : '' ) ).prepend( subset[ index ].label );
								$span = $item.find( 'span.glyphicon:first' );

								sortable = subset[ index ].sortable;
								if ( sortable ) {
									$item.addClass( 'sortable' );
									$item.on( 'click.fu.repeater-list', function() {
										self.list_sortProperty = ( typeof sortable === 'string' ) ? sortable : subset[ index ].property;
										if ( $item.hasClass( 'sorted' ) ) {
											if ( $span.hasClass( chevUp ) ) {
												$span.removeClass( chevUp ).addClass( chevDown );
												self.list_sortDirection = 'desc';
											} else {
												if ( !self.options.list_sortClearing ) {
													$span.removeClass( chevDown ).addClass( chevUp );
													self.list_sortDirection = 'asc';
												} else {
													$item.removeClass( 'sorted' );
													$span.removeClass( chevDown );
													self.list_sortDirection = null;
													self.list_sortProperty = null;
												}
											}
										} else {
											helpers.container.find( 'td' ).removeClass( 'sorted' );
											$span.removeClass( chevDown ).addClass( chevUp );
											self.list_sortDirection = 'asc';
											$item.addClass( 'sorted' );
										}
										self.render( {
											clearInfinite: true,
											pageIncrement: null
										} );
									} );
								}
								if ( subset[ index ].sortDirection === 'asc' || subset[ index ].sortDirection === 'desc' ) {
									helpers.container.find( 'td' ).removeClass( 'sorted' );
									$item.addClass( 'sortable sorted' );
									if ( subset[ index ].sortDirection === 'asc' ) {
										$span.addClass( chevUp );
										this.list_sortDirection = 'asc';
									} else {
										$span.addClass( chevDown );
										this.list_sortDirection = 'desc';
									}
									this.list_sortProperty = ( typeof sortable === 'string' ) ? sortable : subset[ index ].property;
								}

								callback( {
									item: $item
								} );
							},
							repeat: 'data.columns'
						} ]
					}, {
						after: function( helpers, callback ) {
							var canvas = this.$canvas;
							var header = canvas.find( '.repeater-list-header' );
							if ( this.staticHeight ) {
								helpers.item.height( canvas.height() - header.outerHeight() );
							}
							callback();
						},
						render: function( helpers, callback ) {
							var $item = this.$canvas.find( '.repeater-list-wrapper' );
							var obj = {};
							var $empty;
							if ( $item.length > 0 ) {
								obj.action = 'none';
							} else {
								$item = $( '<div class="repeater-list-wrapper" data-infinite="true"><table class="table repeater-list-items" data-container="true" role="grid" aria-readonly="true"></table></div>' );
							}
							obj.item = $item;
							if ( helpers.data.items.length < 1 ) {
								obj.skipNested = true;
								$empty = $( '<tr class="empty"><td></td></tr>' );
								$empty.find( 'td' ).append( this.options.list_noItemsHTML );
								$item.find( '.repeater-list-items' ).append( $empty );
							} else {
								$item.find( '.repeater-list-items tr.empty:first' ).remove();
							}
							callback( obj );
						},
						nested: [ {
							complete: function( helpers, callback ) {
								var obj = {
									container: helpers.container
								};
								if ( helpers.item !== undefined ) {
									obj.item = helpers.item;
								}
								if ( this.options.list_rowRendered ) {
									this.options.list_rowRendered( obj, function() {
										callback();
									} );
								} else {
									callback();
								}
							},
							render: function( helpers, callback ) {
								var $item = $( '<tr data-container="true"></tr>' );
								var self = this;

								if ( this.options.list_selectable ) {
									$item.addClass( 'selectable' );
									$item.attr( 'tabindex', 0 ); // allow items to be tabbed to / focused on
									$item.data( 'item_data', helpers.subset[ helpers.index ] );
									$item.on( 'click.fu.repeater-list', function() {
										var $row = $( this );
										if ( $row.hasClass( 'selected' ) ) {
											$row.removeClass( 'selected' );
											$row.find( '.repeater-list-check' ).remove();
											self.$element.trigger( 'itemDeselected.fu.repeater', $row );
										} else {
											if ( self.options.list_selectable !== 'multi' ) {
												self.$canvas.find( '.repeater-list-check' ).remove();
												self.$canvas.find( '.repeater-list-items tr.selected' ).each( function() {
													$( this ).removeClass( 'selected' );
													self.$element.trigger( 'itemDeselected.fu.repeater', $( this ) );
												} );
											}
											$row.addClass( 'selected' );
											$row.find( 'td:first' ).prepend( '<div class="repeater-list-check"><span class="glyphicon glyphicon-ok"></span></div>' );
											self.$element.trigger( 'itemSelected.fu.repeater', $row );
										}
									} );
									// allow selection via enter key
									$item.keyup( function( e ) {
										if ( e.keyCode === 13 ) {
											$item.trigger( 'click.fu.repeater-list' );
										}
									} );
								}



								this.list_curRowIndex = helpers.index;
								callback( {
									item: $item
								} );
							},
							repeat: 'data.items',
							nested: [ {
								after: function( helpers, callback ) {
									var obj = {
										container: helpers.container
									};
									if ( helpers.item !== undefined ) {
										obj.item = helpers.item;
									}
									if ( this.options.list_columnRendered ) {
										this.options.list_columnRendered( obj, function() {
											callback();
										} );
									} else {
										callback();
									}
								},
								render: function( helpers, callback ) {
									var cssClass = helpers.subset[ helpers.index ].cssClass;
									var content = helpers.data.items[ this.list_curRowIndex ][ helpers.subset[ helpers.index ].property ];
									var $item = $( '<td></td>' );
									var width = helpers.subset[ helpers.index ]._auto_width;

									$item.addClass( ( ( cssClass !== undefined ) ? cssClass : '' ) ).append( content );
									if ( width !== undefined ) {
										$item.outerWidth( width );
									}
									callback( {
										item: $item
									} );
								},
								repeat: 'this.list_columns'
							} ]
						} ]
					} ]
				},
				resize: function( helpers, callback ) {
					columnSyncing.call( this, {
						data: {
							items: [ '' ]
						}
					}, callback );
				}
			};

			var columnSyncing = function( helpers, callback ) {
				var i = 0;
				var widths = [];
				var $header, $items;

				if ( !this.options.list_columnSyncing || ( helpers.data.items.length < 1 ) ) {
					callback();
				} else {
					$header = this.$element.find( '.repeater-list-header:first' );
					$items = this.$element.find( '.repeater-list-items:first' );
					$items.find( 'tr:first td' ).each( function() {
						widths.push( $( this ).outerWidth() );
					} );
					widths.pop();
					$header.find( 'td' ).each( function() {
						if ( widths[ i ] !== undefined ) {
							$( this ).outerWidth( widths[ i ] );
						}
						i++;
					} );
					callback();
				}
			};
		}


	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Repeater - Thumbnail View Plugin
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		if ( $.fn.repeater ) {

			$.fn.repeater.defaults = $.extend( {}, $.fn.repeater.defaults, {
				thumbnail_infiniteScroll: false,
				thumbnail_itemRendered: null,
				thumbnail_template: '<div class="thumbnail repeater-thumbnail" style="background-color: {{color}};"><img height="75" src="{{src}}" width="65"><span>{{name}}</span></div>'
			} );

			$.fn.repeater.views.thumbnail = {
				selected: function( helpers, callback ) {
					var infScroll = this.options.thumbnail_infiniteScroll;
					var opts;
					if ( infScroll ) {
						opts = ( typeof infScroll === 'object' ) ? infScroll : {};
						this.infiniteScrolling( true, opts );
					}
					callback( {} );
				},
				renderer: {
					render: function( helpers, callback ) {
						var $item = this.$element.find( '.repeater-thumbnail-cont' );
						var obj = {};
						var $empty;
						if ( $item.length > 0 ) {
							obj.action = 'none';
						} else {
							$item = $( '<div class="clearfix repeater-thumbnail-cont" data-container="true" data-infinite="true" data-preserve="shallow"></div>' );
						}
						obj.item = $item;
						if ( helpers.data.items.length < 1 ) {
							obj.skipNested = true;
							$empty = $( '<div class="empty"></div>' );
							$empty.append( this.options.thumbnail_noItemsHTML );
							$item.append( $empty );
						} else {
							$item.find( '.empty:first' ).remove();
						}
						callback( obj );
					},
					nested: [ {
						after: function( helpers, callback ) {
							var obj = {
								container: helpers.container
							};
							if ( helpers.item !== undefined ) {
								obj.item = helpers.item;
							}
							if ( this.options.thumbnail_itemRendered ) {
								this.options.thumbnail_itemRendered( obj, function() {
									callback();
								} );
							} else {
								callback();
							}
						},
						render: function( helpers, callback ) {
							var item = helpers.subset[ helpers.index ];
							var template = function( str ) {
								var invalid = false;
								var replace = function() {
									var end, start, val;

									start = str.indexOf( '{{' );
									end = str.indexOf( '}}', start + 2 );

									if ( start > -1 && end > -1 ) {
										val = $.trim( str.substring( start + 2, end ) );
										val = ( item[ val ] !== undefined ) ? item[ val ] : '';
										str = str.substring( 0, start ) + val + str.substring( end + 2 );
									} else {
										invalid = true;
									}
								};

								while ( !invalid && str.search( '{{' ) >= 0 ) {
									replace( str );
								}
								return str;
							};
							callback( {
								item: template( this.options.thumbnail_template )
							} );
						},
						repeat: 'data.items'
					} ]
				}
			};

		}


	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Scheduler
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.scheduler;

		// SCHEDULER CONSTRUCTOR AND PROTOTYPE

		var Scheduler = function( element, options ) {
			var self = this;

			this.$element = $( element );
			this.options = $.extend( {}, $.fn.scheduler.defaults, options );

			// cache elements
			this.$startDate = this.$element.find( '.start-datetime .start-date' );
			this.$startTime = this.$element.find( '.start-datetime .start-time' );

			this.$timeZone = this.$element.find( '.timezone-container .timezone' );

			this.$repeatIntervalPanel = this.$element.find( '.repeat-every-panel' );
			this.$repeatIntervalSelect = this.$element.find( '.repeat-options' );

			this.$repeatIntervalSpinbox = this.$element.find( '.repeat-every' );
			this.$repeatIntervalTxt = this.$element.find( '.repeat-every-text' );

			this.$end = this.$element.find( '.repeat-end' );
			this.$endSelect = this.$end.find( '.end-options' );
			this.$endAfter = this.$end.find( '.end-after' );
			this.$endDate = this.$end.find( '.end-on-date' );

			// panels
			this.$recurrencePanels = this.$element.find( '.repeat-panel' );


			this.$repeatIntervalSelect.selectlist();

			//initialize sub-controls
			this.$element.find( '.selectlist' ).selectlist();
			this.$startDate.datepicker();
			this.$startTime.combobox();
			// init start time
			if ( this.$startTime.find( 'input' ).val() === '' ) {
				this.$startTime.combobox( 'selectByIndex', 0 );
			}
			// every 0 days/hours doesn't make sense, change if not set
			if ( this.$repeatIntervalSpinbox.find( 'input' ).val() === '0' ) {
				this.$repeatIntervalSpinbox.spinbox( {
					'value': 1,
					'min': 1
				} );
			} else {
				this.$repeatIntervalSpinbox.spinbox( {
					'min': 1
				} );
			}
			this.$endAfter.spinbox();
			this.$endDate.datepicker();
			this.$element.find( '.radio-custom' ).radio();

			// bind events: 'change' is a Bootstrap JS fired event
			this.$repeatIntervalSelect.on( 'changed.fu.selectlist', $.proxy( this.repeatIntervalSelectChanged, this ) );
			this.$endSelect.on( 'changed.fu.selectlist', $.proxy( this.endSelectChanged, this ) );
			this.$element.find( '.repeat-days-of-the-week .btn-group .btn' ).on( 'change.fu.scheduler', function( e, data ) {
				self.changed( e, data, true );
			} );
			this.$element.find( '.combobox' ).on( 'changed.fu.combobox', $.proxy( this.changed, this ) );
			this.$element.find( '.datepicker' ).on( 'changed.fu.datepicker', $.proxy( this.changed, this ) );
			this.$element.find( '.selectlist' ).on( 'changed.fu.selectlist', $.proxy( this.changed, this ) );
			this.$element.find( '.spinbox' ).on( 'changed.fu.spinbox', $.proxy( this.changed, this ) );
			this.$element.find( '.repeat-monthly .radio, .repeat-yearly .radio' ).on( 'change.fu.scheduler', $.proxy( this.changed, this ) );

		};

		Scheduler.prototype = {
			constructor: Scheduler,

			destroy: function() {

				var markup;
				// set input value attribute
				this.$element.find( 'input' ).each( function() {
					$( this ).attr( 'value', $( this ).val() );
				} );

				// empty elements to return to original markup and store
				this.$element.find( '.datepicker .calendar' ).empty();

				markup = this.$element[ 0 ].outerHTML;

				// destroy components
				this.$element.find( '.combobox' ).combobox( 'destroy' );
				this.$element.find( '.datepicker' ).datepicker( 'destroy' );
				this.$element.find( '.selectlist' ).selectlist( 'destroy' );
				this.$element.find( '.spinbox' ).spinbox( 'destroy' );
				this.$element.find( '[type=radio]' ).radio( 'destroy' );
				this.$element.remove();

				// any external bindings
				// [none]

				return markup;
			},

			changed: function( e, data, propagate ) {
				if ( !propagate ) {
					e.stopPropagation();
				}
				this.$element.trigger( 'changed.fu.scheduler', {
					data: ( data !== undefined ) ? data : $( e.currentTarget ).data(),
					originalEvent: e,
					value: this.getValue()
				} );
			},

			disable: function() {
				this.toggleState( 'disable' );
			},

			enable: function() {
				this.toggleState( 'enable' );
			},

			// called when the end range changes
			// (Never, After, On date)
			endSelectChanged: function( e, data ) {
				var selectedItem, val;

				if ( !data ) {
					selectedItem = this.$endSelect.selectlist( 'selectedItem' );
					val = selectedItem.value;
				} else {
					val = data.value;
				}

				// hide all panels
				this.$endAfter.parent().addClass( 'hide' );
				this.$endAfter.parent().attr( 'aria-hidden', 'true' );

				this.$endDate.parent().addClass( 'hide' );
				this.$endDate.parent().attr( 'aria-hidden', 'true' );

				if ( val === 'after' ) {
					this.$endAfter.parent().removeClass( 'hide' );
					this.$endAfter.parent().attr( 'aria-hidden', 'false' );
				} else if ( val === 'date' ) {
					this.$endDate.parent().removeClass( 'hide' );
					this.$endDate.parent().attr( 'aria-hidden', 'false' );
				}
			},

			getValue: function() {
				// FREQ = frequency (hourly, daily, monthly...)
				// BYDAY = when picking days (MO,TU,WE,etc)
				// BYMONTH = when picking months (Jan,Feb,March) - note the values should be 1,2,3...
				// BYMONTHDAY = when picking days of the month (1,2,3...)
				// BYSETPOS = when picking First,Second,Third,Fourth,Last (1,2,3,4,-1)

				var interval = this.$repeatIntervalSpinbox.spinbox( 'value' );
				var pattern = '';
				var repeat = this.$repeatIntervalSelect.selectlist( 'selectedItem' ).value;
				var startTime = this.$startTime.combobox( 'selectedItem' ).text.toLowerCase();
				var timeZone = this.$timeZone.selectlist( 'selectedItem' );
				var getFormattedDate;

				getFormattedDate = function( dateObj, dash ) {
					var fdate = '';
					var item;

					fdate += dateObj.getFullYear();
					fdate += dash;
					item = dateObj.getMonth() + 1; //because 0 indexing makes sense when dealing with months /sarcasm
					fdate += ( item < 10 ) ? '0' + item : item;
					fdate += dash;
					item = dateObj.getDate();
					fdate += ( item < 10 ) ? '0' + item : item;

					return fdate;
				};

				var day, days, hasAm, hasPm, month, pos, startDateTime, type;

				startDateTime = '' + getFormattedDate( this.$startDate.datepicker( 'getDate' ), '-' );

				startDateTime += 'T';
				hasAm = ( startTime.search( 'am' ) >= 0 );
				hasPm = ( startTime.search( 'pm' ) >= 0 );
				startTime = $.trim( startTime.replace( /am/g, '' ).replace( /pm/g, '' ) ).split( ':' );
				startTime[ 0 ] = parseInt( startTime[ 0 ], 10 );
				startTime[ 1 ] = parseInt( startTime[ 1 ], 10 );
				if ( hasAm && startTime[ 0 ] > 11 ) {
					startTime[ 0 ] = 0;
				} else if ( hasPm && startTime[ 0 ] < 12 ) {
					startTime[ 0 ] += 12;
				}
				startDateTime += ( startTime[ 0 ] < 10 ) ? '0' + startTime[ 0 ] : startTime[ 0 ];
				startDateTime += ':';
				startDateTime += ( startTime[ 1 ] < 10 ) ? '0' + startTime[ 1 ] : startTime[ 1 ];

				startDateTime += ( timeZone.offset === '+00:00' ) ? 'Z' : timeZone.offset;

				if ( repeat === 'none' ) {
					pattern = 'FREQ=DAILY;INTERVAL=1;COUNT=1;';
				} else if ( repeat === 'hourly' ) {
					pattern = 'FREQ=HOURLY;';
					pattern += 'INTERVAL=' + interval + ';';
				} else if ( repeat === 'daily' ) {
					pattern += 'FREQ=DAILY;';
					pattern += 'INTERVAL=' + interval + ';';
				} else if ( repeat === 'weekdays' ) {
					pattern += 'FREQ=DAILY;';
					pattern += 'BYDAY=MO,TU,WE,TH,FR;';
					pattern += 'INTERVAL=1;';
				} else if ( repeat === 'weekly' ) {
					days = [];
					this.$element.find( '.repeat-days-of-the-week .btn-group input:checked' ).each( function() {
						days.push( $( this ).data().value );
					} );

					pattern += 'FREQ=WEEKLY;';
					pattern += 'BYDAY=' + days.join( ',' ) + ';';
					pattern += 'INTERVAL=' + interval + ';';
				} else if ( repeat === 'monthly' ) {
					pattern += 'FREQ=MONTHLY;';
					pattern += 'INTERVAL=' + interval + ';';
					type = this.$element.find( 'input[name=repeat-monthly]:checked' ).val();

					if ( type === 'bymonthday' ) {
						day = parseInt( this.$element.find( '.repeat-monthly-date .selectlist' ).selectlist( 'selectedItem' ).text, 10 );
						pattern += 'BYMONTHDAY=' + day + ';';
					} else if ( type === 'bysetpos' ) {
						days = this.$element.find( '.month-days' ).selectlist( 'selectedItem' ).value;
						pos = this.$element.find( '.month-day-pos' ).selectlist( 'selectedItem' ).value;
						pattern += 'BYDAY=' + days + ';';
						pattern += 'BYSETPOS=' + pos + ';';
					}

				} else if ( repeat === 'yearly' ) {
					pattern += 'FREQ=YEARLY;';
					type = this.$element.find( 'input[name=repeat-yearly]:checked' ).val();

					if ( type === 'bymonthday' ) {
						month = this.$element.find( '.repeat-yearly-date .year-month' ).selectlist( 'selectedItem' ).value;
						day = this.$element.find( '.year-month-day' ).selectlist( 'selectedItem' ).text;
						pattern += 'BYMONTH=' + month + ';';
						pattern += 'BYMONTHDAY=' + day + ';';
					} else if ( type === 'bysetpos' ) {
						days = this.$element.find( '.year-month-days' ).selectlist( 'selectedItem' ).value;
						pos = this.$element.find( '.year-month-day-pos' ).selectlist( 'selectedItem' ).value;
						month = this.$element.find( '.repeat-yearly-day .year-month' ).selectlist( 'selectedItem' ).value;

						pattern += 'BYDAY=' + days + ';';
						pattern += 'BYSETPOS=' + pos + ';';
						pattern += 'BYMONTH=' + month + ';';
					}

				}

				var end = this.$endSelect.selectlist( 'selectedItem' ).value;
				var duration = '';

				// if both UNTIL and COUNT are not specified, the recurrence will repeat forever
				// http://tools.ietf.org/html/rfc2445#section-4.3.10
				if ( repeat !== 'none' ) {
					if ( end === 'after' ) {
						duration = 'COUNT=' + this.$endAfter.spinbox( 'value' ) + ';';
					} else if ( end === 'date' ) {
						duration = 'UNTIL=' + getFormattedDate( this.$endDate.datepicker( 'getDate' ), '' ) + ';';
					}
				}

				pattern += duration;

				var data = {
					startDateTime: startDateTime,
					timeZone: {
						name: timeZone.name,
						offset: timeZone.offset
					},
					recurrencePattern: pattern
				};

				return data;
			},

			// called when the repeat interval changes
			// (None, Hourly, Daily, Weekdays, Weekly, Monthly, Yearly
			repeatIntervalSelectChanged: function( e, data ) {
				var selectedItem, val, txt;

				if ( !data ) {
					selectedItem = this.$repeatIntervalSelect.selectlist( 'selectedItem' );
					val = selectedItem.value;
					txt = selectedItem.text;
				} else {
					val = data.value;
					txt = data.text;
				}

				// set the text
				this.$repeatIntervalTxt.text( txt );

				switch ( val.toLowerCase() ) {
					case 'hourly':
					case 'daily':
					case 'weekly':
					case 'monthly':
						this.$repeatIntervalPanel.removeClass( 'hide' );
						this.$repeatIntervalPanel.attr( 'aria-hidden', 'false' );
						break;
					default:
						this.$repeatIntervalPanel.addClass( 'hide' );
						this.$repeatIntervalPanel.attr( 'aria-hidden', 'true' );
						break;
				}

				// hide all panels
				this.$recurrencePanels.addClass( 'hide' );
				this.$recurrencePanels.attr( 'aria-hidden', 'true' );

				// show panel for current selection
				this.$element.find( '.repeat-' + val ).removeClass( 'hide' );
				this.$element.find( '.repeat-' + val ).attr( 'aria-hidden', 'false' );

				// the end selection should only be shown when
				// the repeat interval is not "None (run once)"
				if ( val === 'none' ) {
					this.$end.addClass( 'hide' );
					this.$end.attr( 'aria-hidden', 'true' );
				} else {
					this.$end.removeClass( 'hide' );
					this.$end.attr( 'aria-hidden', 'false' );
				}
			},

			setValue: function( options ) {
				var hours, i, item, l, minutes, period, recur, temp;

				if ( options.startDateTime ) {
					temp = options.startDateTime.split( 'T' );
					this.$startDate.datepicker( 'setDate', temp[ 0 ] );

					if ( temp[ 1 ] ) {
						temp[ 1 ] = temp[ 1 ].split( ':' );
						hours = parseInt( temp[ 1 ][ 0 ], 10 );
						minutes = ( temp[ 1 ][ 1 ] ) ? parseInt( temp[ 1 ][ 1 ].split( '+' )[ 0 ].split( '-' )[ 0 ].split( 'Z' )[ 0 ], 10 ) : 0;
						period = ( hours < 12 ) ? 'AM' : 'PM';

						if ( hours === 0 ) {
							hours = 12;
						} else if ( hours > 12 ) {
							hours -= 12;
						}
						minutes = ( minutes < 10 ) ? '0' + minutes : minutes;

						temp = hours + ':' + minutes + ' ' + period;
						this.$startTime.find( 'input' ).val( temp );
						this.$startTime.combobox( 'selectByText', temp );
					}
				}

				item = 'li[data';
				if ( options.timeZone ) {
					if ( typeof( options.timeZone ) === 'string' ) {
						item += '-name="' + options.timeZone;
					} else {
						if ( options.timeZone.name ) {
							item += '-name="' + options.timeZone.name;
						} else {
							item += '-offset="' + options.timeZone.offset;
						}
					}
					item += '"]';
					this.$timeZone.selectlist( 'selectBySelector', item );
				} else if ( options.startDateTime ) {
					temp = options.startDateTime.split( 'T' )[ 1 ];
					if ( temp ) {
						if ( temp.search( /\+/ ) > -1 ) {
							temp = '+' + $.trim( temp.split( '+' )[ 1 ] );
						} else if ( temp.search( /\-/ ) > -1 ) {
							temp = '-' + $.trim( temp.split( '-' )[ 1 ] );
						} else {
							temp = '+00:00';
						}
					} else {
						temp = '+00:00';
					}
					item += '-offset="' + temp + '"]';
					this.$timeZone.selectlist( 'selectBySelector', item );
				}

				if ( options.recurrencePattern ) {
					recur = {};
					temp = options.recurrencePattern.toUpperCase().split( ';' );
					for ( i = 0, l = temp.length; i < l; i++ ) {
						if ( temp[ i ] !== '' ) {
							item = temp[ i ].split( '=' );
							recur[ item[ 0 ] ] = item[ 1 ];
						}
					}

					if ( recur.FREQ === 'DAILY' ) {
						if ( recur.BYDAY === 'MO,TU,WE,TH,FR' ) {
							item = 'weekdays';
						} else {
							if ( recur.INTERVAL === '1' && recur.COUNT === '1' ) {
								item = 'none';
							} else {
								item = 'daily';
							}
						}
					} else if ( recur.FREQ === 'HOURLY' ) {
						item = 'hourly';
					} else if ( recur.FREQ === 'WEEKLY' ) {
						if ( recur.BYDAY ) {
							item = this.$element.find( '.repeat-days-of-the-week .btn-group' );
							item.find( 'label' ).removeClass( 'active' );
							temp = recur.BYDAY.split( ',' );
							for ( i = 0, l = temp.length; i < l; i++ ) {
								item.find( 'input[data-value="' + temp[ i ] + '"]' ).parent().addClass( 'active' );
							}
						}
						item = 'weekly';
					} else if ( recur.FREQ === 'MONTHLY' ) {
						this.$element.find( '.repeat-monthly input' ).removeClass( 'checked' );
						if ( recur.BYMONTHDAY ) {
							temp = this.$element.find( '.repeat-monthly-date' );
							temp.find( 'input' ).addClass( 'checked' );
							temp.find( '.select' ).selectlist( 'selectByValue', recur.BYMONTHDAY );
						} else if ( recur.BYDAY ) {
							temp = this.$element.find( '.repeat-monthly-day' );
							temp.find( 'input' ).addClass( 'checked' );
							if ( recur.BYSETPOS ) {
								temp.find( '.month-day-pos' ).selectlist( 'selectByValue', recur.BYSETPOS );
							}
							temp.find( '.month-days' ).selectlist( 'selectByValue', recur.BYDAY );
						}
						item = 'monthly';
					} else if ( recur.FREQ === 'YEARLY' ) {
						this.$element.find( '.repeat-yearly input' ).removeClass( 'checked' );
						if ( recur.BYMONTHDAY ) {
							temp = this.$element.find( '.repeat-yearly-date' );
							temp.find( 'input' ).addClass( 'checked' );
							if ( recur.BYMONTH ) {
								temp.find( '.year-month' ).selectlist( 'selectByValue', recur.BYMONTH );
							}
							temp.find( '.year-month-day' ).selectlist( 'selectByValue', recur.BYMONTHDAY );
						} else if ( recur.BYSETPOS ) {
							temp = this.$element.find( '.repeat-yearly-day' );
							temp.find( 'input' ).addClass( 'checked' );
							temp.find( '.year-month-day-pos' ).selectlist( 'selectByValue', recur.BYSETPOS );
							if ( recur.BYDAY ) {
								temp.find( '.year-month-days' ).selectlist( 'selectByValue', recur.BYDAY );
							}
							if ( recur.BYMONTH ) {
								temp.find( '.year-month' ).selectlist( 'selectByValue', recur.BYMONTH );
							}
						}
						item = 'yearly';
					} else {
						item = 'none';
					}

					if ( recur.COUNT ) {
						this.$endAfter.spinbox( 'value', parseInt( recur.COUNT, 10 ) );
						this.$endSelect.selectlist( 'selectByValue', 'after' );
					} else if ( recur.UNTIL ) {
						temp = recur.UNTIL;
						if ( temp.length === 8 ) {
							temp = temp.split( '' );
							temp.splice( 4, 0, '-' );
							temp.splice( 7, 0, '-' );
							temp = temp.join( '' );
						}
						this.$endDate.datepicker( 'setDate', temp );
						this.$endSelect.selectlist( 'selectByValue', 'date' );
					}
					this.endSelectChanged();

					if ( recur.INTERVAL ) {
						this.$repeatIntervalSpinbox.spinbox( 'value', parseInt( recur.INTERVAL, 10 ) );
					}
					this.$repeatIntervalSelect.selectlist( 'selectByValue', item );
					this.repeatIntervalSelectChanged();
				}
			},

			toggleState: function( action ) {
				this.$element.find( '.combobox' ).combobox( action );
				this.$element.find( '.datepicker' ).datepicker( action );
				this.$element.find( '.selectlist' ).selectlist( action );
				this.$element.find( '.spinbox' ).spinbox( action );
				this.$element.find( '[type=radio]' ).radio( action );

				if ( action === 'disable' ) {
					action = 'addClass';
				} else {
					action = 'removeClass';
				}
				this.$element.find( '.repeat-days-of-the-week .btn-group' )[ action ]( 'disabled' );
			},

			value: function( options ) {
				if ( options ) {
					return this.setValue( options );
				} else {
					return this.getValue();
				}
			}
		};


		// SCHEDULER PLUGIN DEFINITION

		$.fn.scheduler = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.scheduler' );
				var options = typeof option === 'object' && option;

				if ( !data ) $this.data( 'fu.scheduler', ( data = new Scheduler( this, options ) ) );
				if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.scheduler.defaults = {};

		$.fn.scheduler.Constructor = Scheduler;

		$.fn.scheduler.noConflict = function() {
			$.fn.scheduler = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mousedown.fu.scheduler.data-api', '[data-initialize=scheduler]', function( e ) {
			var $control = $( e.target ).closest( '.scheduler' );
			if ( !$control.data( 'fu.scheduler' ) ) {
				$control.scheduler( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=scheduler]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'scheduler' ) ) return;
				$this.scheduler( $this.data() );
			} );
		} );



	} )( jQuery );


} ) );
