/*! Filter widget formatter functions - updated 6/4/2013
 * requires: tableSorter 2.7.7+ and jQuery 1.4.3+
 *
 * uiSpinner (jQuery UI spinner)
 * uiSlider (jQuery UI slider)
 * uiRange (jQuery UI range slider)
 * uiDateCompare (jQuery UI datepicker; 1 input)
 * uiDatepicker (jQuery UI datepicker; 2 inputs, filter range)
 * html5Number (spinner)
 * html5Range (slider)
 * html5Color (color)
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";
$.tablesorter = $.tablesorter || {};

$.tablesorter.filterFormatter = {

	/**********************\
	jQuery UI Spinner
	\**********************/
	uiSpinner: function($cell, indx, spinnerDef) {
		var o = $.extend({
			min : 0,
			max : 100,
			step : 1,
			value : 1,
			delayed : true,
			addToggle : true,
			disabled : false,
			exactMatch : true,
			compare : ''
		}, spinnerDef ),
		// Add a hidden input to hold the range values
		$input = $('<input class="filter" type="hidden">')
			.appendTo($cell)
			// hidden filter update (.tsfilter) namespace trigger by filter widget
			.bind('change.tsfilter', function(){
				updateSpinner({ value: this.value, delayed: false });
			}),
		$shcell = [],
		c = $cell.closest('table')[0].config,

		// this function updates the hidden input and adds the current values to the header cell text
		updateSpinner = function(ui) {
			var chkd = true, state,
				// ui is not undefined on create
				v = ui && ui.value && $.tablesorter.formatFloat((ui.value + '').replace(/[><=]/g,'')) || $cell.find('.spinner').val() || o.value;
			if (o.addToggle) {
				chkd = $cell.find('.toggle').is(':checked');
			}
			state = o.disabled || !chkd ? 'disable' : 'enable';
			$cell.find('.filter')
				// add equal to the beginning, so we filter exact numbers
				.val( chkd ? (o.compare ? o.compare : o.exactMatch ? '=' : '') + v : '' )
				.trigger('search', ui && typeof ui.delayed === 'boolean' ? ui.delayed : o.delayed).end()
				.find('.spinner').spinner(state).val(v);
			// update sticky header cell
			if ($shcell.length) {
				$shcell.find('.spinner').spinner(state).val(v);
				if (o.addToggle) {
					$shcell.find('.toggle')[0].checked = chkd;
				}
			}
		};

		// add callbacks; preserve added callbacks
		o.oldcreate = o.create;
		o.oldspin = o.spin;
		o.create = function(event, ui) {
			updateSpinner(); // ui is an empty object on create
			if (typeof o.oldcreate === 'function') { o.oldcreate(event, ui); }
		};
		o.spin  = function(event, ui) {
			updateSpinner(ui);
			if (typeof o.oldspin === 'function') { o.oldspin(event, ui); }
		};
		if (o.addToggle) {
			$('<div class="button"><input id="uispinnerbutton' + indx + '" type="checkbox" class="toggle" /><label for="uispinnerbutton' + indx + '"></label></div>')
				.appendTo($cell)
				.find('.toggle')
				.bind('change', function(){
					updateSpinner();
				});
		}
		// make sure we use parsed data
		$cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed');
		// add a jQuery UI spinner!
		$('<input class="spinner spinner' + indx + '" />')
			.val(o.value)
			.appendTo($cell)
			.spinner(o)
			.bind('change keyup', function(e){
				updateSpinner();
			});

		// has sticky headers?
		c.$table.bind('stickyHeadersInit', function(){
			$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
			if (o.addToggle) {
				$('<div class="button"><input id="stickyuispinnerbutton' + indx + '" type="checkbox" class="toggle" /><label for="stickyuispinnerbutton' + indx + '"></label></div>')
					.appendTo($shcell)
					.find('.toggle')
					.bind('change', function(){
						$cell.find('.toggle')[0].checked = this.checked;
						updateSpinner();
					});
			}
			// add a jQuery UI spinner!
			$('<input class="spinner spinner' + indx + '" />')
				.val(o.value)
				.appendTo($shcell)
				.spinner(o)
				.bind('change keyup', function(e){
					$cell.find('.spinner').val( this.value );
					updateSpinner();
				});
		});

		// on reset
		c.$table.bind('filterReset', function(){
			// turn off the toggle checkbox
			if (o.addToggle) {
				$cell.find('.toggle')[0].checked = false;
			}
			updateSpinner();
		});

		updateSpinner();
		return $input;
	},

	/**********************\
	jQuery UI Slider
	\**********************/
	uiSlider: function($cell, indx, sliderDef) {
		var o = $.extend({
			value : 0,
			min : 0,
			max : 100,
			step : 1,
			range : "min",
			delayed : true,
			valueToHeader : false,
			exactMatch : true,
			compare : '',
			allText : 'all'
		}, sliderDef ),
		// Add a hidden input to hold the range values
		$input = $('<input class="filter" type="hidden">')
			.appendTo($cell)
			// hidden filter update (.tsfilter) namespace trigger by filter widget
			.bind('change.tsfilter', function(){
				updateSlider({ value: this.value });
			}),
		$shcell = [],
		c = $cell.closest('table')[0].config,

		// this function updates the hidden input and adds the current values to the header cell text
		updateSlider = function(ui) {
			// ui is not undefined on create
			var v = typeof ui !== "undefined" ? $.tablesorter.formatFloat((ui.value + '').replace(/[><=]/g,'')) || o.min : o.value,
				val = o.compare ? v : v === o.min ? o.allText : v,
				result = o.compare + val;
			if (o.valueToHeader) {
				// add range indication to the header cell above!
				$cell.closest('thead').find('th[data-column=' + indx + ']').find('.curvalue').html(' (' + result + ')');
			} else {
				// add values to the handle data-value attribute so the css tooltip will work properly
				$cell.find('.ui-slider-handle').addClass('value-popup').attr('data-value', result);
			}
			// update the hidden input;
			// ****** ADD AN EQUAL SIGN TO THE BEGINNING! <- this makes the slide exactly match the number ******
			// when the value is at the minimum, clear the hidden input so all rows will be seen
			$cell.find('.filter')
				.val( ( o.compare ? o.compare + v : v === o.min ? '' : (o.exactMatch ? '=' : '') + v ) )
				.trigger('search', ui && typeof ui.delayed === 'boolean' ? ui.delayed : o.delayed).end()
				.find('.slider').slider('value', v);

			// update sticky header cell
			if ($shcell.length) {
				$shcell.find('.slider').slider('value', v);
				if (o.valueToHeader) {
					$shcell.closest('thead').find('th[data-column=' + indx + ']').find('.curvalue').html(' (' + result + ')');
				} else {
					$shcell.find('.ui-slider-handle').addClass('value-popup').attr('data-value', result);
				}
			}

		};
		$cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed');

		// add span to header for value - only works if the line in the updateSlider() function is also un-commented out
		if (o.valueToHeader) {
			$cell.closest('thead').find('th[data-column=' + indx + ']').find('.tablesorter-header-inner').append('<span class="curvalue" />');
		}

		// add callbacks; preserve added callbacks
		o.oldcreate = o.create;
		o.oldslide = o.slide;
		o.create = function(event, ui) {
			updateSlider(); // ui is an empty object on create
			if (typeof o.oldcreate === 'function') { o.oldcreate(event, ui); }
		};
		o.slide  = function(event, ui) {
			updateSlider(ui);
			if (typeof o.oldslide === 'function') { o.oldslide(event, ui); }
		};
		// add a jQuery UI slider!
		$('<div class="slider slider' + indx + '"/>')
			.appendTo($cell)
			.slider(o);

		// on reset
		c.$table.bind('filterReset', function(){
			$cell.find('.slider').slider('value', o.value);
			updateSlider();
		});

		// has sticky headers?
		c.$table.bind('stickyHeadersInit', function(){
			$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();

		// add a jQuery UI slider!
		$('<div class="slider slider' + indx + '"/>')
			.val(o.value)
			.appendTo($shcell)
			.slider(o)
			.bind('change keyup', function(e){
				$cell.find('.slider').val( this.value );
				updateSlider();
			});

		});

		return $input;
	},

	/*************************\
	jQuery UI Range Slider (2 handles)
	\*************************/
	uiRange: function($cell, indx, rangeDef) {
		var o = $.extend({
			values : [0, 100],
			min : 0,
			max : 100,
			range : true,
			delayed : true,
			valueToHeader : false
		}, rangeDef ),
		// Add a hidden input to hold the range values
		$input = $('<input class="filter" type="hidden">')
			.appendTo($cell)
			// hidden filter update (.tsfilter) namespace trigger by filter widget
			.bind('change.tsfilter', function(){
				var v = this.value.split(' - ');
				if (this.value === '') { v = [ o.min, o.max ]; }
				if (v && v[1]) {
					updateUiRange({ values: v, delay: false });
				}
			}),
		$shcell = [],
		c = $cell.closest('table')[0].config,

		// this function updates the hidden input and adds the current values to the header cell text
		updateUiRange = function(ui) {
			// ui.values are undefined for some reason on create
			var val = ui && ui.values || o.values,
				result = val[0] + ' - ' + val[1],
				// make range an empty string if entire range is covered so the filter row will hide (if set)
				range = val[0] === o.min && val[1] === o.max ? '' : result;
			if (o.valueToHeader) {
				// add range indication to the header cell above (if not using the css method)!
				$cell.closest('thead').find('th[data-column=' + indx + ']').find('.currange').html(' (' + result + ')');
			} else {
				// add values to the handle data-value attribute so the css tooltip will work properly
				$cell.find('.ui-slider-handle')
					.addClass('value-popup')
					.eq(0).attr('data-value', val[0]).end() // adding value to data attribute
					.eq(1).attr('data-value', val[1]);      // value popup shown via css
			}
			// update the hidden input
			$cell.find('.filter').val(range)
				.trigger('search', ui && typeof ui.delayed === 'boolean' ? ui.delayed : o.delayed).end()
				.find('.range').slider('values', val);
			// update sticky header cell
			if ($shcell.length) {
				$shcell.find('.range').slider('values', val);
				if (o.valueToHeader) {
					$shcell.closest('thead').find('th[data-column=' + indx + ']').find('.currange').html(' (' + result + ')');
				} else {
					$shcell.find('.ui-slider-handle')
					.addClass('value-popup')
					.eq(0).attr('data-value', val[0]).end() // adding value to data attribute
					.eq(1).attr('data-value', val[1]);      // value popup shown via css
				}
			}

		};
		$cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed');

		// add span to header for value - only works if the line in the updateUiRange() function is also un-commented out
		if (o.valueToHeader) {
			$cell.closest('thead').find('th[data-column=' + indx + ']').find('.tablesorter-header-inner').append('<span class="currange"/>');
		}

		// add callbacks; preserve added callbacks
		o.oldcreate = o.create;
		o.oldslide = o.slide;
		// add a jQuery UI range slider!
		o.create = function(event, ui) {
			updateUiRange(); // ui is an empty object on create
			if (typeof o.oldcreate === 'function') { o.oldcreate(event, ui); }
		};
		o.slide  = function(event, ui) {
			updateUiRange(ui);
			if (typeof o.oldslide === 'function') { o.oldslide(event, ui); }
		};
		$('<div class="range range' + indx +'"/>')
			.appendTo($cell)
			.slider(o);

		// on reset
		c.$table.bind('filterReset', function(){
			$cell.find('.range').slider('values', o.values);
			updateUiRange();
		});

		// has sticky headers?
		c.$table.bind('stickyHeadersInit', function(){
			$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();

		// add a jQuery UI slider!
		$('<div class="range range' + indx + '"/>')
			.val(o.value)
			.appendTo($shcell)
			.slider(o)
			.bind('change keyup', function(e){
				$cell.find('.range').val( this.value );
				updateUiRange();
			});

		});

		// return the hidden input so the filter widget has a reference to it
		return $input;
	},

	/*************************\
	jQuery UI Datepicker compare (1 input)
	\*************************/
	uiDateCompare: function($cell, indx, defDate) {
		var o = $.extend({
			defaultDate : '',
			cellText : '',
			changeMonth : true,
			changeYear : true,
			numberOfMonths : 1,
			compare : ''
		}, defDate),
		$hdr = $cell.closest('thead').find('th[data-column=' + indx + ']'),
		// Add a hidden input to hold the range values
		$input = $('<input class="dateCompare" type="hidden">')
			.appendTo($cell)
			// hidden filter update (.tsfilter) namespace trigger by filter widget
			.bind('change.tsfilter', function(){
				var v = this.value;
				if (v) {
					o.onClose(v);
				}
			}),
		t, $shcell = [],
		c = $cell.closest('table')[0].config;

		// make sure we're using parsed dates in the search
		$hdr.addClass('filter-parsed');
		// Add date range picker
		t = '<label>' + o.cellText + '</label><input type="text" class="date date' + indx + 
			'" placeholder="' + ($hdr.data('placeholder') || $hdr.attr('data-placeholder') || '') + '" />';
		$(t).appendTo($cell);

		// add callbacks; preserve added callbacks
		o.oldonClose = o.onClose;

		o.onClose = function( selectedDate, ui ) {
			var date = new Date(selectedDate + ( o.compare.match('<') ? ' 23:59:59' : '' )).getTime() || '';
			$cell
				// update hidden input
				.find('.dateCompare').val( o.compare + date )
				.trigger('search').end()
				.find('.date')
				.datepicker('setDate', selectedDate);

			// update sticky header cell
			if ($shcell.length) {
				$shcell.find('.date').datepicker('setDate', selectedDate);
			}

			if (typeof o.oldonClose === 'function') { o.oldonClose(selectedDate, ui); }
		};
		$cell.find('.date').datepicker(o);

		if (o.filterDate) {
			$cell.find('.date').datepicker('setDate', o.filterDate);
		}

		// on reset
		c.$table.bind('filterReset', function(){
			$cell.find('.date').val('').datepicker('option', 'currentText', '' );
			if ($shcell.length) {
				$shcell.find('.date').val('').datepicker('option', 'currentText', '' );
			}
		});

		// has sticky headers?
		c.$table.bind('stickyHeadersInit', function(){
			$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
			// add a jQuery datepicker!
			$shcell
				.append(t)
				.find('.date')
				.datepicker(o);
		});

		// return the hidden input so the filter widget has a reference to it
		return $input.val( o.defaultDate ? o.defaultDate : '' );
	},

	/*************************\
	jQuery UI Datepicker (2 inputs)
	\*************************/
	uiDatepicker: function($cell, indx, defDate) {
		var o = $.extend({
			from : '',
			to : '',
			textFrom : 'from',
			textTo : 'to',
			changeMonth : true,
			changeYear : true,
			numberOfMonths : 1
		}, defDate),
		t, closeFrom, $shcell = [],
		// Add a hidden input to hold the range values
		$input = $('<input class="dateRange" type="hidden">')
			.appendTo($cell)
			// hidden filter update (.tsfilter) namespace trigger by filter widget
			.bind('change.tsfilter', function(){
				var v = this.value;
				if (v.match(' - ')) {
					v = v.split(' - ');
					$cell.find('.dateTo').val(v[1]);
					closeFrom(v[0]);
				} else if (v.match('>=')) {
					closeFrom( v.replace('>=', '') );
				} else if (v.match('<=')) {
					o.onClose( v.replace('<=', '') );
				}
			}),
		c = $cell.closest('table')[0].config;

		// make sure we're using parsed dates in the search
		$cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed');
		// Add date range picker
		t = '<label>' + o.textFrom + '</label><input type="text" class="dateFrom" /><label>' + o.textTo + '</label><input type="text" class="dateTo" />';
		$(t).appendTo($cell);

		// add callbacks; preserve added callbacks
		o.oldonClose = o.onClose;

		o.defaultDate = o.from || o.defaultDate;

		closeFrom = o.onClose = function( selectedDate, ui ) {
			var from = ( (new Date(selectedDate)).getTime() || ''),
				to = (new Date($cell.find('.dateTo').val() + ' 23:59:59').getTime() || ''),
				range = from ? ( to ? from + ' - ' + to : '>=' + from ) : (to ? '<=' + to : '');
			$cell
				.find('.dateTo').datepicker('option', 'minDate', selectedDate ).end()
				.find('.dateFrom').val(selectedDate).end()
				// update hidden input
				.find('.dateRange').val(range)
				.trigger('search');
			// update sticky header cell
			if ($shcell.length) {
				$shcell
					.find('.dateTo').datepicker('option', 'minDate', selectedDate ).end()
					.find('.dateFrom').val(selectedDate);
			}
			if (typeof o.oldonClose === 'function') { o.oldonClose(selectedDate, ui); }
		};

		$cell.find('.dateFrom').datepicker(o);
		o.defaultDate = o.to || '+7d'; // set to date +7 days from today (if not defined)
		o.onClose = function( selectedDate, ui ) {
			var from = new Date( $cell.find('.dateFrom').val() ).getTime() || '',
				to = new Date( selectedDate + ' 23:59:59' ).getTime() || '',
				range = from ? ( to ? from + ' - ' + to : '>=' + from ) : (to ? '<=' + to : '');
			$cell
				.find('.dateFrom').datepicker('option', 'maxDate', selectedDate ).end()
				.find('.dateTo').val(selectedDate).end()
				.find('.dateRange').val(range)
				.trigger('search');
			// update sticky header cell
			if ($shcell.length) {
				$shcell
					.find('.dateFrom').datepicker('option', 'maxDate', selectedDate ).end()
					.find('.dateTo').val(selectedDate);
			}
			if (typeof o.oldonClose === 'function') { o.oldonClose(selectedDate, ui); }
		};
		$cell.find('.dateTo').datepicker(o);

		// has sticky headers?
		c.$table.bind('stickyHeadersInit', function(){
			$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
			// add a jQuery datepicker!
			$shcell.append(t).find('.dateTo').datepicker(o);
			o.defaultDate = o.from || o.defaultDate || new Date();
			o.onClose = closeFrom;
			$shcell.find('.dateFrom').datepicker(o);
		});

		// on reset
		$cell.closest('table').bind('filterReset', function(){
			$cell.find('.dateFrom, .dateTo').val('');
			if ($shcell.length) {
				$shcell.find('.dateFrom, .dateTo').val('');
			}
		});

		// return the hidden input so the filter widget has a reference to it
		t = o.from ? ( o.to ? o.from + ' - ' + o.to : '>=' + o.from ) : (o.to ? '<=' + o.to : '');
		return $input.val( t );
	},

	/**********************\
	HTML5 Number (spinner)
	\**********************/
	html5Number : function($cell, indx, def5Num) {
		var t, o = $.extend({
			value : 0,
			min : 0,
			max : 100,
			step : 1,
			delayed : true,
			disabled : false,
			addToggle : true,
			exactMatch : true,
			compare : '',
			skipTest: false
		}, def5Num),

		// test browser for HTML5 range support
		$number = $('<input type="number" style="visibility:hidden;" value="test">').appendTo($cell),
		// test if HTML5 number is supported - from Modernizr
		numberSupported = o.skipTest || $number.attr('type') === 'number' && $number.val() !== 'test',
		$shcell = [],
		c = $cell.closest('table')[0].config,

		updateNumber = function(v, delayed){
			var chkd = o.addToggle ? $cell.find('.toggle').is(':checked') : true;
			$cell.find('input[type=hidden]')
				// add equal to the beginning, so we filter exact numbers
				.val( !o.addToggle || chkd ? (o.compare ? o.compare : o.exactMatch ? '=' : '') + v : '' )
				.trigger('search', delayed ? delayed : o.delayed).end()
				.find('.number').val(v);
			if ($cell.find('.number').length) {
				$cell.find('.number')[0].disabled = (o.disabled || !chkd);
			}
			// update sticky header cell
			if ($shcell.length) {
				$shcell.find('.number').val(v)[0].disabled = (o.disabled || !chkd);
				if (o.addToggle) {
					$shcell.find('.toggle')[0].checked = chkd;
				}
			}
		};
		$number.remove();

		if (numberSupported) {
			t = o.addToggle ? '<div class="button"><input id="html5button' + indx + '" type="checkbox" class="toggle" /><label for="html5button' + indx + '"></label></div>' : '';
			t += '<input class="number" type="number" min="' + o.min + '" max="' + o.max + '" value="' +
				o.value + '" step="' + o.step + '" />';
			// add HTML5 number (spinner)
			$cell
				.html(t + '<input type="hidden" />')
				.find('.toggle, .number').bind('change', function(){
					updateNumber( $cell.find('.number').val() );
				})
				.closest('thead').find('th[data-column=' + indx + ']')
				.addClass('filter-parsed') // get exact numbers from column
				// on reset
				.closest('table').bind('filterReset', function(){
					// turn off the toggle checkbox
					if (o.addToggle) {
						$cell.find('.toggle')[0].checked = false;
						if ($shcell.length) {
							$shcell.find('.toggle')[0].checked = false;
						}
					}
					updateNumber( $cell.find('.number').val() );
				});

			// hidden filter update (.tsfilter) namespace trigger by filter widget
			$cell.find('input[type=hidden]').bind('change.tsfilter', function(){
				updateNumber( this.value );
			});

			// has sticky headers?
			c.$table.bind('stickyHeadersInit', function(){
				$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
				$shcell
					.html(t)
					.find('.toggle, .number').bind('change', function(){
						updateNumber( $shcell.find('.number').val() );
					});
				updateNumber( $cell.find('.number').val() );
			});

			updateNumber( $cell.find('.number').val() );

		}

		return numberSupported ? $cell.find('input[type="hidden"]') : $('<input type="search">');
	},

	/**********************\
	HTML5 range slider
	\**********************/
	html5Range : function($cell, indx, def5Range) {
		var t, o = $.extend({
			value : 0,
			min : 0,
			max : 100,
			step : 1,
			delayed : true,
			valueToHeader : true,
			exactMatch : true,
			compare : '',
			allText : 'all',
			skipTest : false
		}, def5Range),

		// test browser for HTML5 range support
		$range = $('<input type="range" style="visibility:hidden;" value="test">').appendTo($cell),
		// test if HTML5 range is supported - from Modernizr (but I left out the method to detect in Safari 2-4)
		// see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/inputtypes.js
		rangeSupported = o.skipTest || $range.attr('type') === 'range' && $range.val() !== 'test',
		$shcell = [],
		c = $cell.closest('table')[0].config,

		updateRange = function(v, delayed){
			/*jshint eqeqeq:false */
			v = (v + '').replace(/[<>=]/g,'') || o.min; // hidden input changes may include compare symbols
			var t = ' (' + (o.compare ? o.compare + v : v == o.min ? o.allText : v) + ')';
			$cell.find('input[type=hidden]')
				// add equal to the beginning, so we filter exact numbers
				.val( ( o.compare ? o.compare + v : ( v == o.min ? '' : ( o.exactMatch ? '=' : '' ) + v ) ) )
				//( val == o.min ? '' : val + (o.exactMatch ? '=' : ''))
				.trigger('search', delayed ? delayed : o.delayed).end()
				.find('.range').val(v);
			// or add current value to the header cell, if desired
			$cell.closest('thead').find('th[data-column=' + indx + ']').find('.curvalue').html(t);
			// update sticky header cell
			if ($shcell.length) {
				$shcell.find('.range').val(v);
				$shcell.closest('thead').find('th[data-column=' + indx + ']').find('.curvalue').html(t);
			}
		};
		$range.remove();

		if (rangeSupported) {
			// add HTML5 range
			$cell
				.html('<input type="hidden"><input class="range" type="range" min="' + o.min + '" max="' + o.max + '" value="' + o.value + '" />')
				.closest('thead').find('th[data-column=' + indx + ']')
				.addClass('filter-parsed') // get exact numbers from column
				// add span to header for the current slider value
				.find('.tablesorter-header-inner').append('<span class="curvalue" />');

			$cell.find('.range').bind('change', function(){
				updateRange( this.value );
			});

			// hidden filter update (.tsfilter) namespace trigger by filter widget
			$cell.find('input[type=hidden]').bind('change.tsfilter', function(){
				/*jshint eqeqeq:false */
				var v = this.value;
				if (v !== this.lastValue) {
					this.lastValue = ( o.compare ? o.compare + v : ( v == o.min ? '' : ( o.exactMatch ? '=' : '' ) + v ) );
					this.value = this.lastValue;
					updateRange( v );
				}
			});

			// has sticky headers?
			c.$table.bind('stickyHeadersInit', function(){
				$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
				$shcell
					.html('<input class="range" type="range" min="' + o.min + '" max="' + o.max + '" value="' + o.value + '" />')
					.find('.range').bind('change', function(){
						updateRange( $shcell.find('.range').val() );
					});
				updateRange( $cell.find('.range').val() );
			});

			// on reset
			$cell.closest('table').bind('filterReset', function(){
				// just turn off the colorpicker
				updateRange(o.value);
			});

			updateRange( $cell.find('.range').val() );

		}

		return rangeSupported ? $cell.find('input[type="hidden"]') : $('<input type="search">');
	},

	/**********************\
	HTML5 Color picker
	\**********************/
	html5Color: function($cell, indx, defColor) {
		var t, o = $.extend({
			value : '#000000',
			disabled : false,
			addToggle : true,
			exactMatch : true,
			valueToHeader : false,
			skipTest : false
		}, defColor),
		// Add a hidden input to hold the range values
		$color = $('<input type="color" style="visibility:hidden;" value="test">').appendTo($cell),
		// test if HTML5 color is supported - from Modernizr
		colorSupported = o.skipTest || $color.attr('type') === 'color' && $color.val() !== 'test',
		$shcell = [],
		c = $cell.closest('table')[0].config,

		updateColor = function(v){
			v = v || o.value;
			var chkd = true,
				t = ' (' + v + ')';
			if (o.addToggle) {
				chkd = $cell.find('.toggle').is(':checked');
			}
			if ($cell.find('.colorpicker').length) {
				$cell.find('.colorpicker').val(v)[0].disabled = (o.disabled || !chkd);
			}

			$cell.find('input[type=hidden]')
				.val( chkd ? v + (o.exactMatch ? '=' : '') : '' )
				.trigger('search');
			if (o.valueToHeader) {
				// add current color to the header cell
				$cell.closest('thead').find('th[data-column=' + indx + ']').find('.curcolor').html(t);
			} else {
				// current color to span in cell
				$cell.find('.currentColor').html(t);
			}

			// update sticky header cell
			if ($shcell.length) {
				$shcell.find('.colorpicker').val(v)[0].disabled = (o.disabled || !chkd);
				if (o.addToggle) {
					$shcell.find('.toggle')[0].checked = chkd;
				}
				if (o.valueToHeader) {
					// add current color to the header cell
					$shcell.closest('thead').find('th[data-column=' + indx + ']').find('.curcolor').html(t);
				} else {
					// current color to span in cell
					$shcell.find('.currentColor').html(t);
				}
			}
		};
		$color.remove();

		if (colorSupported) {
			// add HTML5 color picker
			t = '<div class="color-controls-wrapper">';
			t += o.addToggle ? '<div class="button"><input id="colorbutton' + indx + '" type="checkbox" class="toggle" /><label for="colorbutton' + indx + '"></label></div>' : '';
			t += '<input type="hidden"><input class="colorpicker" type="color" />';
			t += (o.valueToHeader ? '' : '<span class="currentColor">(#000000)</span>') + '</div>';
			$cell.html(t);

			// add span to header for the current color value - only works if the line in the updateColor() function is also un-commented out
			if (o.valueToHeader) {
				$cell.closest('thead').find('th[data-column=' + indx + ']').find('.tablesorter-header-inner').append('<span class="curcolor" />');
			}

			$cell.find('.toggle, .colorpicker').bind('change', function(){
				updateColor( $cell.find('.colorpicker').val() );
			});

			// hidden filter update (.tsfilter) namespace trigger by filter widget
			$cell.find('input[type=hidden]').bind('change.tsfilter', function(){
				updateColor( this.value );
			});

			// on reset
			$cell.closest('table').bind('filterReset', function(){
				// just turn off the colorpicker
				$cell.find('.toggle')[0].checked = false;
				updateColor( $cell.find('.colorpicker').val() );
			});

			// has sticky headers?
			c.$table.bind('stickyHeadersInit', function(){
				$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx);
				$shcell
					.html(t)
					.find('.toggle, .colorpicker').bind('change', function(){
						updateColor( $shcell.find('.colorpicker').val() );
					});
				updateColor( $shcell.find('.colorpicker').val() );
			});

			updateColor( o.value );
		}
		return colorSupported ? $cell.find('input[type="hidden"]') : $('<input type="search">');
	}

};

})(jQuery);