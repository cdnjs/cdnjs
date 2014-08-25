/*! Filter widget formatter functions - updated 7/17/2014 (v2.17.5)
 * requires: tableSorter 2.15+ and jQuery 1.4.3+
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

var ts = $.tablesorter || {},

// compare option selector class name (jQuery selector)
compareSelect = '.compare-select',


tsff = ts.filterFormatter = {

	addCompare: function($cell, indx, options){
		if (options.compare && $.isArray(options.compare) && options.compare.length > 1) {
			var opt = '',
				compareSelectClass = [ compareSelect.slice(1), ' ' + compareSelect.slice(1), '' ],
				txt = options.cellText ? '<label class="' + compareSelectClass.join('-label') + indx + '">' + options.cellText + '</label>' : '';
			$.each(options.compare, function(i, c){
				opt += '<option ' + (options.selected === i ? 'selected' : '') + '>' + c + '</option>';
			});
			$cell
				.wrapInner('<div class="' + compareSelectClass.join('-wrapper') + indx + '" />')
				.prepend( txt + '<select class="' + compareSelectClass.join('') + indx + '" />' )
				.find('select')
				.append(opt);
		}
	},

	updateCompare : function($cell, $input, o) {
		var val = $input.val() || '',
			num = val.replace(/\s*?[><=]\s*?/g, ''),
			compare = val.match(/[><=]/g) || '';
		if (o.compare) {
			if ($.isArray(o.compare)){
				compare = (compare || []).join('') || o.compare[o.selected || 0];
			}
			$cell.find(compareSelect).val( compare );
		}
		return [ val, num ];
	},

	/**********************\
	jQuery UI Spinner
	\**********************/
	uiSpinner: function($cell, indx, spinnerDef) {
		var o = $.extend({
			// filter formatter options
			delayed : true,
			addToggle : true,
			exactMatch : true,
			value : 1,
			cellText : '',
			compare : '',
			// include ANY jQuery UI spinner options below
			min : 0,
			max : 100,
			step : 1,
			disabled : false

		}, spinnerDef ),
		c = $cell.closest('table')[0].config,
		// Add a hidden input to hold the range values
		$input = $('<input class="filter" type="hidden">')
			.appendTo($cell)
			// hidden filter update namespace trigger by filter widget
			.bind('change' + c.namespace + 'filter', function(){
				updateSpinner({ value: this.value, delayed: false });
			}),
		$shcell = [],

		// this function updates the hidden input and adds the current values to the header cell text
		updateSpinner = function(ui, notrigger) {
			var chkd = true, state,
				// ui is not undefined on create
				v = ui && ui.value && ts.formatFloat((ui.value + '').replace(/[><=]/g,'')) ||
					$cell.find('.spinner').val() || o.value,
				compare = ($.isArray(o.compare) ? $cell.find(compareSelect).val() || o.compare[ o.selected || 0] : o.compare) || '',
				searchType = ui && typeof ui.delayed === 'boolean' ? ui.delayed : c.$table[0].hasInitialized ? o.delayed || '' : true;
			if (o.addToggle) {
				chkd = $cell.find('.toggle').is(':checked');
			}
			state = o.disabled || !chkd ? 'disable' : 'enable';
			$cell.find('.filter')
				// add equal to the beginning, so we filter exact numbers
				.val( chkd ? (compare ? compare : o.exactMatch ? '=' : '') + v : '' )
				.trigger( notrigger ? '' : 'search', searchType ).end()
				.find('.spinner').spinner(state).val(v);
			// update sticky header cell
			if ($shcell.length) {
				$shcell
					.find('.spinner').spinner(state).val(v).end()
					.find(compareSelect).val( compare );
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
			$('<div class="button"><input id="uispinnerbutton' + indx + '" type="checkbox" class="toggle" />' +
				'<label for="uispinnerbutton' + indx + '"></label></div>')
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
			.bind('change keyup', function(){
				updateSpinner();
			});

		// update spinner from hidden input, in case of saved filters
		c.$table.bind('filterFomatterUpdate', function(){
			var val = tsff.updateCompare($cell, $input, o)[0];
			$cell.find('.spinner').val( val );
			updateSpinner({ value: val }, true);
			ts.filter.formatterUpdated($cell, indx);
		});

		if (o.compare) {
			// add compare select
			tsff.addCompare($cell, indx, o);
			$cell.find(compareSelect).bind('change', function(){
				updateSpinner();
			});
		}

		// has sticky headers?
		c.$table.bind('stickyHeadersInit', function(){
			$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
			if (o.addToggle) {
				$('<div class="button"><input id="stickyuispinnerbutton' + indx + '" type="checkbox" class="toggle" />' +
					'<label for="stickyuispinnerbutton' + indx + '"></label></div>')
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
				.bind('change keyup', function(){
					$cell.find('.spinner').val( this.value );
					updateSpinner();
				});

			if (o.compare) {
				// add compare select
				tsff.addCompare($shcell, indx, o);
				$shcell.find(compareSelect).bind('change', function(){
					$cell.find(compareSelect).val( $(this).val() );
					updateSpinner();
				});
			}

		});

		// on reset
		c.$table.bind('filterReset', function(){
			if ($.isArray(o.compare)) {
				$cell.add($shcell).find(compareSelect).val( o.compare[ o.selected || 0 ] );
			}
			// turn off the toggle checkbox
			if (o.addToggle) {
				$cell.find('.toggle')[0].checked = false;
			}
			$cell.find('.spinner').spinner('value', o.value);
			setTimeout(function(){
				updateSpinner();
			}, 0);
		});

		updateSpinner();
		return $input;
	},

	/**********************\
	jQuery UI Slider
	\**********************/
	uiSlider: function($cell, indx, sliderDef) {
		var o = $.extend({
			// filter formatter options
			delayed : true,
			valueToHeader : false,
			exactMatch : true,
			cellText : '',
			compare : '',
			allText : 'all',
			// include ANY jQuery UI spinner options below
			// except values, since this is a non-range setup
			value : 0,
			min : 0,
			max : 100,
			step : 1,
			range : "min"
		}, sliderDef ),
		c = $cell.closest('table')[0].config,
		// Add a hidden input to hold the range values
		$input = $('<input class="filter" type="hidden">')
			.appendTo($cell)
			// hidden filter update namespace trigger by filter widget
			.bind('change' + c.namespace + 'filter', function(){
				updateSlider({ value: this.value });
			}),
		$shcell = [],

		// this function updates the hidden input and adds the current values to the header cell text
		updateSlider = function(ui, notrigger) {
			// ui is not undefined on create
			var v = typeof ui !== "undefined" ? ts.formatFloat((ui.value + '').replace(/[><=]/g,'')) || o.value : o.value,
				val = o.compare ? v : v === o.min ? o.allText : v,
				compare = ($.isArray(o.compare) ? $cell.find(compareSelect).val() || o.compare[ o.selected || 0] : o.compare) || '',
				result = compare + val,
				searchType = ui && typeof ui.delayed === 'boolean' ? ui.delayed : c.$table[0].hasInitialized ? o.delayed || '' : true;
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
				.val( ( compare ? compare + v : v === o.min ? '' : (o.exactMatch ? '=' : '') + v ) )
				.trigger( notrigger ? '' : 'search', searchType ).end()
				.find('.slider').slider('value', v);

			// update sticky header cell
			if ($shcell.length) {
				$shcell
					.find(compareSelect).val( compare ).end()
					.find('.slider').slider('value', v);
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

		// update slider from hidden input, in case of saved filters
		c.$table.bind('filterFomatterUpdate', function(){
			var val = tsff.updateCompare($cell, $input, o)[0];
			$cell.find('.slider').slider('value', val );
			updateSlider({ value: val }, false);
			ts.filter.formatterUpdated($cell, indx);
		});

		if (o.compare) {
			// add compare select
			tsff.addCompare($cell, indx, o);
			$cell.find(compareSelect).bind('change', function(){
				updateSlider({ value: $cell.find('.slider').slider('value') });
			});
		}

		// on reset
		c.$table.bind('filterReset', function(){
			if ($.isArray(o.compare)) {
				$cell.add($shcell).find(compareSelect).val( o.compare[ o.selected || 0 ] );
			}
			setTimeout(function(){
				updateSlider({ value: o.value });
			}, 0);
		});

		// has sticky headers?
		c.$table.bind('stickyHeadersInit', function(){
			$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();

			// add a jQuery UI slider!
			$('<div class="slider slider' + indx + '"/>')
				.val(o.value)
				.appendTo($shcell)
				.slider(o)
				.bind('change keyup', function(){
					$cell.find('.slider').slider('value', this.value );
					updateSlider();
				});

			if (o.compare) {
				// add compare select
				tsff.addCompare($shcell, indx, o);
				$shcell.find(compareSelect).bind('change', function(){
					$cell.find(compareSelect).val( $(this).val() );
					updateSlider();
				});
			}

		});

		return $input;
	},

	/*************************\
	jQuery UI Range Slider (2 handles)
	\*************************/
	uiRange: function($cell, indx, rangeDef) {
		var o = $.extend({
			// filter formatter options
			delayed : true,
			valueToHeader : false,
			// include ANY jQuery UI spinner options below
			// except value, since this one is range specific)
			values : [0, 100],
			min : 0,
			max : 100,
			range : true
		}, rangeDef ),
		c = $cell.closest('table')[0].config,
		// Add a hidden input to hold the range values
		$input = $('<input class="filter" type="hidden">')
			.appendTo($cell)
			// hidden filter update namespace trigger by filter widget
			.bind('change' + c.namespace + 'filter', function(){
				getRange();
			}),
		$shcell = [],

		getRange = function(){
			var val = $input.val(),
				v = val.split(' - ');
			if (val === '') { v = [ o.min, o.max ]; }
			if (v && v[1]) {
				updateUiRange({ values: v, delay: false }, true);
			}
		},

		// this function updates the hidden input and adds the current values to the header cell text
		updateUiRange = function(ui, notrigger) {
			// ui.values are undefined for some reason on create
			var val = ui && ui.values || o.values,
				result = val[0] + ' - ' + val[1],
				// make range an empty string if entire range is covered so the filter row will hide (if set)
				range = val[0] === o.min && val[1] === o.max ? '' : result,
				searchType = ui && typeof ui.delayed === 'boolean' ? ui.delayed : c.$table[0].hasInitialized ? o.delayed || '': true;
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
				.trigger(notrigger ? '' : 'search', searchType).end()
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

		// update slider from hidden input, in case of saved filters
		c.$table.bind('filterFomatterUpdate', function(){
			getRange();
			ts.filter.formatterUpdated($cell, indx);
		});

		// on reset
		c.$table.bind('filterReset', function(){
			$cell.find('.range').slider('values', o.values);
			setTimeout(function(){
				updateUiRange();
			}, 0);
		});

		// has sticky headers?
		c.$table.bind('stickyHeadersInit', function(){
			$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();

		// add a jQuery UI slider!
		$('<div class="range range' + indx + '"/>')
			.val(o.value)
			.appendTo($shcell)
			.slider(o)
			.bind('change keyup', function(){
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
			// filter formatter options
			cellText : '',
			compare : '',
			endOfDay : true,
			// include ANY jQuery UI spinner options below

			defaultDate : '',

			changeMonth : true,
			changeYear : true,
			numberOfMonths : 1
		}, defDate),

		$date,
		c = $cell.closest('table')[0].config,
		// make sure we're using parsed dates in the search
		$hdr = $cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed'),
		// Add a hidden input to hold the range values
		$input = $('<input class="dateCompare" type="hidden">')
			.appendTo($cell)
			// hidden filter update namespace trigger by filter widget
			.bind('change' + c.namespace + 'filter', function(){
				var v = this.value;
				if (v) {
					o.onClose(v);
				}
			}),
		t, $shcell = [],

		// this function updates the hidden input
		date1Compare = function(notrigger) {
			var date, query,
				getdate = $date.datepicker('getDate') || '',
				compare = ($.isArray(o.compare) ? $cell.find(compareSelect).val() || o.compare[ o.selected || 0] : o.compare) || '',
				searchType = c.$table[0].hasInitialized ? o.delayed || '': true;
			$date.datepicker('setDate', (getdate === '' ? '' : getdate) || null);
			if (getdate === '') { notrigger = false; }
			date = $date.datepicker('getDate');
			query = date ? ( o.endOfDay && /<=/.test(compare) ? date.setHours(23, 59, 59) : date.getTime() ) || '' : '';
			if (date && o.endOfDay && compare === '=') {
				compare = '';
				query += ' - ' + date.setHours(23, 59, 59);
				notrigger = false;
			}
			$cell.find('.dateCompare')
			// add equal to the beginning, so we filter exact numbers
				.val(compare + query)
				.trigger( notrigger ? '' : 'search', searchType ).end();
			// update sticky header cell
			if ($shcell.length) {
				$shcell
					.find('.dateCompare').val(compare + query).end()
					.find(compareSelect).val(compare);
			}
		};

		// Add date range picker
		t = '<input type="text" class="date date' + indx + '" placeholder="' +
			($hdr.data('placeholder') || $hdr.attr('data-placeholder') || c.widgetOptions.filter_placeholder.search || '') + '" />';
		$date = $(t).appendTo($cell);

		// add callbacks; preserve added callbacks
		o.oldonClose = o.onClose;

		o.onClose = function( selectedDate, ui ) {
			date1Compare();
			if (typeof o.oldonClose === 'function') { o.oldonClose(selectedDate, ui); }
		};
		$date.datepicker(o);

		// on reset
		c.$table.bind('filterReset', function(){
			if ($.isArray(o.compare)) {
				$cell.add($shcell).find(compareSelect).val( o.compare[ o.selected || 0 ] );
			}
			$cell.add($shcell).find('.date').val(o.defaultDate).datepicker('setDate', o.defaultDate || null);
			setTimeout(function(){
				date1Compare();
			}, 0);
		});

		// update date compare from hidden input, in case of saved filters
		c.$table.bind('filterFomatterUpdate', function(){
			var num, v = $input.val();
			if (/\s+-\s+/.test(v)) {
				// date range found; assume an exact match on one day
				$cell.find(compareSelect).val('=');
				num = v.split(/\s+-\s+/)[0];
				$date.datepicker( 'setDate', num || null );
			} else {
				num = (tsff.updateCompare($cell, $input, o)[1]).toString() || '';
				// differeniate 1388556000000 from 1/1/2014 using \d{5} regex
				num = num !== '' ? /\d{5}/g.test(num) ? new Date(Number(num)) : num || '' : '';
			}
			$cell.add($shcell).find('.date').datepicker( 'setDate', num || null );
			setTimeout(function(){
				date1Compare(true);
				ts.filter.formatterUpdated($cell, indx);
			}, 0);
		});

		if (o.compare) {
			// add compare select
			tsff.addCompare($cell, indx, o);
			$cell.find(compareSelect).bind('change', function(){
				date1Compare();
			});
		}

		// has sticky headers?
		c.$table.bind('stickyHeadersInit', function(){
			$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();

			// add a jQuery datepicker!
			$shcell
				.append(t)
				.find('.date')
				.datepicker(o);

			if (o.compare) {
				// add compare select
				tsff.addCompare($shcell, indx, o);
				$shcell.find(compareSelect).bind('change', function(){
					$cell.find(compareSelect).val( $(this).val() );
					date1Compare();
				});
			}

		});

		// return the hidden input so the filter widget has a reference to it
		return $input.val( o.defaultDate ? o.defaultDate : '' );
	},

	/*************************\
	jQuery UI Datepicker (2 inputs)
	\*************************/
	uiDatepicker: function($cell, indx, defDate) {
		var o = $.extend({
			// filter formatter options
			endOfDay : true,
			textFrom : 'from',
			textTo : 'to',
			from : '', // defaultDate "from" input
			to : '', // defaultDate "to" input
			// include ANY jQuery UI spinner options below
			changeMonth : true,
			changeYear : true,
			numberOfMonths : 1
		}, defDate),
		t, closeDate, $shcell = [],
		c = $cell.closest('table')[0].config,
		validDate = function(d){
			return d instanceof Date && isFinite(d);
		},
		// Add a hidden input to hold the range values
		$input = $('<input class="dateRange" type="hidden">')
			.appendTo($cell)
			// hidden filter update namespace trigger by filter widget
			.bind('change' + c.namespace + 'filter', function(){
				var v = this.value;
				if (v.match(' - ')) {
					v = v.split(' - ');
					$cell.find('.dateTo').val(v[1]);
					closeDate(v[0]);
				} else if (v.match('>=')) {
					closeDate( v.replace('>=', '') );
				} else if (v.match('<=')) {
					closeDate( v.replace('<=', '') );
				}
			}),

		// make sure we're using parsed dates in the search
		$hdr = $cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed');
		// Add date range picker
		t = '<label>' + o.textFrom + '</label><input type="text" class="dateFrom" placeholder="' +
			($hdr.data('placeholderFrom') || $hdr.attr('data-placeholder-from') || c.widgetOptions.filter_placeholder.from || '') + '" />' +
			'<label>' + o.textTo + '</label><input type="text" class="dateTo" placeholder="' +
			($hdr.data('placeholderTo') || $hdr.attr('data-placeholder-to') || c.widgetOptions.filter_placeholder.to || '') + '" />';
		$(t).appendTo($cell);

		// add callbacks; preserve added callbacks
		o.oldonClose = o.onClose;

		closeDate = o.onClose = function( selectedDate, ui ) {
			var range,
				from = $cell.find('.dateFrom').datepicker('getDate'),
				to = $cell.find('.dateTo').datepicker('getDate');
			from = validDate(from) ? from.getTime() : '';
			to = validDate(to) ? ( o.endOfDay ? to.setHours(23, 59, 59) : to.getTime() ) || '' : '';
			range = from ? ( to ? from + ' - ' + to : '>=' + from ) : (to ? '<=' + to : '');
			$cell.add( $shcell )
				.find('.dateRange').val(range)
				.trigger('search');
			// date picker needs date objects
			from = from ? new Date(from) : '';
			to = to ? new Date(to) : '';

			if (/<=/.test(range)) {
				$cell.add( $shcell )
					.find('.dateFrom').datepicker('option', 'maxDate', to || null ).end()
					.find('.dateTo').datepicker('option', 'minDate', null).datepicker('setDate', to || null);
			} else if (/>=/.test(range)) {
				$cell.add( $shcell )
					.find('.dateFrom').datepicker('option', 'maxDate', null).datepicker('setDate', from || null).end()
					.find('.dateTo').datepicker('option', 'minDate', from || null );
			} else {
				$cell.add( $shcell )
					.find('.dateFrom').datepicker('option', 'maxDate', null).datepicker('setDate', from || null ).end()
					.find('.dateTo').datepicker('option', 'minDate', null).datepicker('setDate', to || null);
			}

			if (typeof o.oldonClose === 'function') { o.oldonClose(selectedDate, ui); }
		};

		o.defaultDate = o.from || '';
		$cell.find('.dateFrom').datepicker(o);
		o.defaultDate = o.to || '+7d'; // set to date +7 days from today (if not defined)
		$cell.find('.dateTo').datepicker(o);

		// update date compare from hidden input, in case of saved filters
		c.$table.bind('filterFomatterUpdate', function(){
			var val = $input.val() || '',
				from = '',
				to = '';
			// date range
			if (/\s+-\s+/.test(val)){
				val = val.split(/\s+-\s+/) || [];
				from = val[0] || '';
				to = val[1] || '';
			} else if (/>=/.test(val)) {
				// greater than date (to date empty)
				from = val.replace(/>=/, '') || '';
			} else if (/<=/.test(val)) {
				// less than date (from date empty)
				to = val.replace(/<=/, '') || '';
			}

			// differeniate 1388556000000 from 1/1/2014 using \d{5} regex
			from = from !== '' ? /\d{5}/g.test(from) ? new Date(Number(from)) : from || '' : '';
			to = to !== '' ? /\d{5}/g.test(to) ? new Date(Number(to)) : to || '' : '';

			$cell.add($shcell).find('.dateFrom').datepicker('setDate', from || null);
			$cell.add($shcell).find('.dateTo').datepicker('setDate', to || null);
			// give datepicker time to process
			setTimeout(function(){
				closeDate();
				ts.filter.formatterUpdated($cell, indx);
			}, 0);
		});

		// has sticky headers?
		c.$table.bind('stickyHeadersInit', function(){
			$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
			$shcell.append(t);

			// add a jQuery datepicker!
			o.defaultDate = o.from || '';
			$shcell.find('.dateFrom').datepicker(o);

			o.defaultDate = o.to || '+7d';
			$shcell.find('.dateTo').datepicker(o);

		});

		// on reset
		$cell.closest('table').bind('filterReset', function(){
			$cell.add($shcell).find('.dateFrom').val('').datepicker('setDate', o.from || null );
			$cell.add($shcell).find('.dateTo').val('').datepicker('setDate', o.to || null );
			setTimeout(function(){
				closeDate();
			}, 0);
		});

		// return the hidden input so the filter widget has a reference to it
		return $input.val( o.from ? ( o.to ? o.from + ' - ' + o.to : '>=' + o.from ) : (o.to ? '<=' + o.to : '') );
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
			addToggle : false,
			exactMatch : false,
			cellText : '',
			compare : '',
			skipTest: false
		}, def5Num),

		$input,
		// test browser for HTML5 range support
		$number = $('<input type="number" style="visibility:hidden;" value="test">').appendTo($cell),
		// test if HTML5 number is supported - from Modernizr
		numberSupported = o.skipTest || $number.attr('type') === 'number' && $number.val() !== 'test',
		$shcell = [],
		c = $cell.closest('table')[0].config,

		updateNumber = function(delayed, notrigger){
			var chkd = o.addToggle ? $cell.find('.toggle').is(':checked') : true,
				v = $cell.find('.number').val(),
				compare = ($.isArray(o.compare) ? $cell.find(compareSelect).val() || o.compare[ o.selected || 0] : o.compare) || '',
				searchType = c.$table[0].hasInitialized ? (delayed ? delayed : o.delayed) || '' : true;
			$input
				// add equal to the beginning, so we filter exact numbers
				.val( !o.addToggle || chkd ? (compare ? compare : o.exactMatch ? '=' : '') + v : '' )
				.trigger( notrigger ? '' : 'search', searchType ).end()
				.find('.number').val(v);
			if ($cell.find('.number').length) {
				$cell.find('.number')[0].disabled = (o.disabled || !chkd);
			}
			// update sticky header cell
			if ($shcell.length) {
				$shcell.find('.number').val(v)[0].disabled = (o.disabled || !chkd);
				$shcell.find(compareSelect).val(compare);
				if (o.addToggle) {
					$shcell.find('.toggle')[0].checked = chkd;
				}
			}
		};
		$number.remove();

		if (numberSupported) {
			t = o.addToggle ? '<div class="button"><input id="html5button' + indx + '" type="checkbox" class="toggle" />' +
				'<label for="html5button' + indx + '"></label></div>' : '';
			t += '<input class="number" type="number" min="' + o.min + '" max="' + o.max + '" value="' +
				o.value + '" step="' + o.step + '" />';
			// add HTML5 number (spinner)
			$cell
				.append(t + '<input type="hidden" />')
				.find('.toggle, .number').bind('change', function(){
					updateNumber();
				})
				.closest('thead').find('th[data-column=' + indx + ']')
				.addClass('filter-parsed') // get exact numbers from column
				// on reset
				.closest('table').bind('filterReset', function(){
					if ($.isArray(o.compare)) {
						$cell.add($shcell).find(compareSelect).val( o.compare[ o.selected || 0 ] );
					}
					// turn off the toggle checkbox
					if (o.addToggle) {
						$cell.find('.toggle')[0].checked = false;
						if ($shcell.length) {
							$shcell.find('.toggle')[0].checked = false;
						}
					}
					$cell.find('.number').val( o.value );
					setTimeout(function(){
						updateNumber();
					}, 0);
				});
			$input = $cell.find('input[type=hidden]').bind('change', function(){
				$cell.find('.number').val( this.value );
				updateNumber();
			});

			// update slider from hidden input, in case of saved filters
			c.$table.bind('filterFomatterUpdate', function(){
				var val = tsff.updateCompare($cell, $input, o)[0] || o.value;
				$cell.find('.number').val( ((val || '') + '').replace(/[><=]/g,'') );
				updateNumber(false, true);
				ts.filter.formatterUpdated($cell, indx);
			});

			if (o.compare) {
				// add compare select
				tsff.addCompare($cell, indx, o);
				$cell.find(compareSelect).bind('change', function(){
					updateNumber();
				});
			}

			// has sticky headers?
			c.$table.bind('stickyHeadersInit', function(){
				$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
				$shcell
					.append(t)
					.find('.toggle, .number').bind('change', function(){
						$cell.find('.number').val( $(this).val() );
						updateNumber();
					});

				if (o.compare) {
					// add compare select
					tsff.addCompare($shcell, indx, o);
					$shcell.find(compareSelect).bind('change', function(){
						$cell.find(compareSelect).val( $(this).val() );
						updateNumber();
					});
				}

				updateNumber();
			});

			updateNumber();

		}

		return numberSupported ? $cell.find('input[type="hidden"]') : $('<input type="search">');
	},

	/**********************\
	HTML5 range slider
	\**********************/
	html5Range : function($cell, indx, def5Range) {
		var o = $.extend({
			value : 0,
			min : 0,
			max : 100,
			step : 1,
			delayed : true,
			valueToHeader : true,
			exactMatch : true,
			cellText : '',
			compare : '',
			allText : 'all',
			skipTest : false
		}, def5Range),

		$input,
		// test browser for HTML5 range support
		$range = $('<input type="range" style="visibility:hidden;" value="test">').appendTo($cell),
		// test if HTML5 range is supported - from Modernizr (but I left out the method to detect in Safari 2-4)
		// see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/inputtypes.js
		rangeSupported = o.skipTest || $range.attr('type') === 'range' && $range.val() !== 'test',
		$shcell = [],
		c = $cell.closest('table')[0].config,

		updateRange = function(v, delayed, notrigger){
			/*jshint eqeqeq:false */
			// hidden input changes may include compare symbols
			v = ( typeof v === "undefined" ? $input.val() : v ).toString().replace(/[<>=]/g,'') || o.value;
			var compare = ($.isArray(o.compare) ? $cell.find(compareSelect).val() || o.compare[ o.selected || 0] : o.compare) || '',
				t = ' (' + (compare ? compare + v : v == o.min ? o.allText : v) + ')',
				searchType =  c.$table[0].hasInitialized ? (delayed ? delayed : o.delayed) || '' : true;
			$cell.find('input[type=hidden]')
				// add equal to the beginning, so we filter exact numbers
				.val( ( compare ? compare + v : ( v == o.min ? '' : ( o.exactMatch ? '=' : '' ) + v ) ) )
				//( val == o.min ? '' : val + (o.exactMatch ? '=' : ''))
				.trigger( notrigger ? '' : 'search', searchType ).end()
				.find('.range').val(v);
			// or add current value to the header cell, if desired
			$cell.closest('thead').find('th[data-column=' + indx + ']').find('.curvalue').html(t);
			// update sticky header cell
			if ($shcell.length) {
				$shcell
					.find('.range').val(v).end()
					.find(compareSelect).val( compare );
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
			// hidden filter update namespace trigger by filter widget
			$input = $cell.find('input[type=hidden]').bind('change' + c.namespace + 'filter', function(){
				/*jshint eqeqeq:false */
				var v = this.value,
					compare = ($.isArray(o.compare) ? $cell.find(compareSelect).val() || o.compare[ o.selected || 0] : o.compare) || '';
				if (v !== this.lastValue) {
					this.lastValue = ( compare ? compare + v : ( v == o.min ? '' : ( o.exactMatch ? '=' : '' ) + v ) );
					this.value = this.lastValue;
					updateRange( v );
				}
			});

			$cell.find('.range').bind('change', function(){
				updateRange( this.value );
			});

			// update spinner from hidden input, in case of saved filters
			c.$table.bind('filterFomatterUpdate', function(){
				var val = tsff.updateCompare($cell, $input, o)[0];
				$cell.find('.range').val( val );
				updateRange(val, false, true);
				ts.filter.formatterUpdated($cell, indx);
			});

			if (o.compare) {
				// add compare select
				tsff.addCompare($cell, indx, o);
				$cell.find(compareSelect).bind('change', function(){
					updateRange();
				});
			}

			// has sticky headers?
			c.$table.bind('stickyHeadersInit', function(){
				$shcell = c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
				$shcell
					.html('<input class="range" type="range" min="' + o.min + '" max="' + o.max + '" value="' + o.value + '" />')
					.find('.range').bind('change', function(){
						updateRange( $shcell.find('.range').val() );
					});
				updateRange();

				if (o.compare) {
					// add compare select
					tsff.addCompare($shcell, indx, o);
					$shcell.find(compareSelect).bind('change', function(){
						$cell.find(compareSelect).val( $(this).val() );
						updateRange();
					});
				}

			});

			// on reset
			$cell.closest('table').bind('filterReset', function(){
				if ($.isArray(o.compare)) {
					$cell.add($shcell).find(compareSelect).val( o.compare[ o.selected || 0 ] );
				}
				setTimeout(function(){
					updateRange(o.value, false, true);
				}, 0);
			});
			updateRange();

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
		$input,
		// Add a hidden input to hold the range values
		$color = $('<input type="color" style="visibility:hidden;" value="test">').appendTo($cell),
		// test if HTML5 color is supported - from Modernizr
		colorSupported = o.skipTest || $color.attr('type') === 'color' && $color.val() !== 'test',
		$shcell = [],
		c = $cell.closest('table')[0].config,

		updateColor = function(v, notrigger){
			v = ( typeof v === "undefined" ? $input.val() : v ).toString().replace('=','') || o.value;
			var chkd = true,
				t = ' (' + v + ')';
			if (o.addToggle) {
				chkd = $cell.find('.toggle').is(':checked');
			}
			if ($cell.find('.colorpicker').length) {
				$cell.find('.colorpicker').val(v)[0].disabled = (o.disabled || !chkd);
			}

			$input
				.val( chkd ? v + (o.exactMatch ? '=' : '') : '' )
				.trigger( !c.$table[0].hasInitialized || notrigger ? '' : 'search' );
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
			t = '' + indx + Math.round(Math.random() * 100);
			// add HTML5 color picker
			t = '<div class="color-controls-wrapper">' +
				(o.addToggle ? '<div class="button"><input id="colorbutton' + t + '" type="checkbox" class="toggle" /><label for="colorbutton' +
				t + '"></label></div>' : '') +
				'<input type="hidden"><input class="colorpicker" type="color" />' +
				(o.valueToHeader ? '' : '<span class="currentColor">(#000000)</span>') + '</div>';
			$cell.html(t);
			// add span to header for the current color value - only works if the line in the updateColor() function is also un-commented out
			if (o.valueToHeader) {
				$cell.closest('thead').find('th[data-column=' + indx + ']').find('.tablesorter-header-inner').append('<span class="curcolor" />');
			}

			$cell.find('.toggle, .colorpicker').bind('change', function(){
				updateColor( $cell.find('.colorpicker').val() );
			});

			// hidden filter update namespace trigger by filter widget
			$input = $cell.find('input[type=hidden]').bind('change' + c.namespace + 'filter', function(){
				updateColor( this.value );
			});

			// update slider from hidden input, in case of saved filters
			c.$table.bind('filterFomatterUpdate', function(){
				updateColor( $input.val(), true );
				ts.filter.formatterUpdated($cell, indx);
			});

			// on reset
			$cell.closest('table').bind('filterReset', function(){
				// just turn off the colorpicker
				if (o.addToggle) {
					$cell.find('.toggle')[0].checked = false;
				}
				// delay needed because default color needs to be set in the filter
				// there is no compare option here, so if addToggle = false,
				// default color is #000000 (even with no value set)
				setTimeout(function(){
					updateColor();
				}, 0);
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
