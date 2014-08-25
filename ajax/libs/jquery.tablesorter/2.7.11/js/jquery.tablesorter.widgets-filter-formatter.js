/*! Filter widget formatter functions - updated 2/24/2013
 * requires: tableSorter 2.7.7+ and jQuery 1.4.3+
 *
 * jQuery UI spinner
 * jQuery UI silder
 * jQuery UI range slider
 * jQuery UI datepicker (range)
 * HTML5 number (spinner)
 * HTML5 range slider
 * HTML5 color selector
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
	uiSpinner: function($cell, indx, spinnerDef){
		var o = $.extend({
			min : 0,
			max : 100,
			step: 1,
			value: 1,
			delayed: true,
			addToggle: true,
			disabled: false,
			exactMatch: true,
			numberFormat: "n"
		}, spinnerDef ),
		// Add a hidden input to hold the range values
		$input = $('<input class="filter" type="hidden">').appendTo($cell),

		// this function updates the hidden input and adds the current values to the header cell text
		updateSpinner = function(ui) {
			var chkd = true,
				// ui is not undefined on create
				v = ui && ui.value || $('#spinner' + indx).val() || o.value;
			if (o.addToggle) {
				chkd = $cell.find('.toggle').is(':checked');
			}
			$cell.find('.filter')
				.val( chkd ? v + (o.exactMatch ? '=' : '') : '' ) // add equal to the end, so we filter exact numbers
				.trigger('search', o.delayed).end()
				.find('#spinner' + indx).spinner( o.disabled || !chkd ? 'disable' : 'enable' );
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
			$('<div class="button"><input id="button' + indx + '" type="checkbox" class="toggle" /><label for="button' + indx + '"></label></div>')
				.appendTo($cell)
				.find('.toggle')
				.bind('change', function(){
					updateSpinner();
				});
		}
		// make sure we use parsed data
		$cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed');
		// add a jQuery UI slider!
		$('<input id="spinner' + indx + '" />')
			.val(o.value)
			.appendTo($cell)
			.spinner(o)
			.bind('change keyup', function(e){
				updateSpinner();
			});

		// on reset
		$cell.closest('table').bind('filterReset', function(){
			// turn off the toggle checkbox
			$cell.find('.toggle')[0].checked = false;
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
			value: 0,
			min: 0,
			max: 100,
			step: 1,
			range: "min",
			delayed: true,
			valueToHeader : false,
			exactMatch: true,
			allText: 'all'
		}, sliderDef ),
		// Add a hidden input to hold the range values
		$input = $('<input class="filter" type="hidden">').appendTo($cell),

		// this function updates the hidden input and adds the current values to the header cell text
		updateSlider = function(ui) {
			// ui is not undefined on create
			var v = typeof ui !== "undefined" ? ui.value : o.value;
			if (o.valueToHeader) {
				// add range indication to the header cell above!
				$cell.closest('thead').find('th[data-column=' + indx + ']').find('.curvalue').html(' (' + (v === o.min ? o.allText : v) + ')');
			} else {
				// add values to the handle data-value attribute so the css tooltip will work properly
				$cell.find('.ui-slider-handle').addClass('value-popup').attr('data-value', v === o.min ? o.allText : v);
			}
			// update the hidden input;
			// ****** ADD AN EQUAL SIGN TO THE END! <- this makes the slide exactly match the number ******
			// when the value is at the minimum, clear the hidden input so all rows will be seen
			$cell.find('.filter').val(v === o.min ? '' : v + (o.exactMatch ? '=' : '')).trigger('search', o.delayed);
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
		$('<div id="slider' + indx + '"/>')
			.appendTo($cell)
			.slider(o);

		// on reset
		$cell.closest('table').bind('filterReset', function(){
			$cell.find('div[id*="slider"]').slider('value', o.value);
			updateSlider();
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
			range: true,
			delayed: true,
			valueToHeader : false
		}, rangeDef ),
		// Add a hidden input to hold the range values
		$input = $('<input class="filter" type="hidden">').appendTo($cell),

		// this function updates the hidden input and adds the current values to the header cell text
		updateUiRange = function(ui) {
			// ui.values are undefined for some reason on create
			var val = typeof ui !== "undefined" && ui.values || o.values,
				range = val[0] + ' - ' + val[1];
			if (o.valueToHeader) {
				// add range indication to the header cell above (if not using the css method)!
				$cell.closest('thead').find('th[data-column=' + indx + ']').find('.currange').html(' (' + range + ')');
			} else {
				// add values to the handle data-value attribute so the css tooltip will work properly
				$cell.find('.ui-slider-handle')
					.addClass('value-popup')
					.eq(0).attr('data-value', val[0]).end() // adding value to data attribute
					.eq(1).attr('data-value', val[1]);      // value popup shown via css
			}
			// update the hidden input
			$cell.find('.filter').val(range).trigger('search', o.delayed);
		};
		$cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed');

		// add span to header for value - only works if the line in the updateSlider() function is also un-commented out
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
		$('<div id="range' + indx +'"/>')
			.appendTo($cell)
			.slider(o);

		// on reset
		$cell.closest('table').bind('filterReset', function(){
			$cell.find('div[id*="range"]').slider('values', o.values);
			updateUiRange();
		});

		// return the hidden input so the filter widget has a reference to it
		return $input;
	},

	/*************************\
	jQuery UI Datepicker (2 inputs)
	\*************************/
	uiDatepicker: function($cell, indx, defDate) {
		var o = $.extend({
			from: '',
			to: '',
			changeMonth: true,
			changeYear: true,
			numberOfMonths: 1
		}, defDate),
		// Add a hidden input to hold the range values
		$input = $('<input class="dateRange" type="hidden">').appendTo($cell);

		// make sure we're using parsed dates in the search
		$cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed');
		// Add date range picker
		$('<label>From</label><input type="text" class="dateFrom" /><label>to</label><input type="text" class="dateTo" />').appendTo($cell);

		// add callbacks; preserve added callbacks
		o.oldonClose = o.onClose;

		o.defaultDate = o.defaultDate || o.from;
		o.onClose = function( selectedDate, ui ) {
			var from = ( (new Date(selectedDate)).getTime() || ''),
				to = (new Date($cell.find('.dateTo').val()).getTime() || ''),
				range = from && to ? from + ' - ' + to : '';
			$cell
				.find('.dateTo').datepicker('option', 'minDate', selectedDate).end()
				// update hidden input
				.find('.dateRange').val(range)
				.trigger('search');
			if (typeof o.oldonClose === 'function') { o.oldonClose(selectedDate, ui); }
		};
		$cell.find('.dateFrom').datepicker(o);

		o.defaultDate = o.defaultDate || o.to;
		o.onClose = function( selectedDate, ui ) {
			var from = ( new Date($cell.find('.dateFrom').val()).getTime() || ''),
				to = ((new Date(selectedDate)).getTime() || ''),
				range = from && to ? from + ' - ' + to : '';
			$cell
				.find('.dateFrom').datepicker('option', 'maxDate', selectedDate ).end()
				.find('.dateRange').val(range)
				.trigger('search');
			if (typeof o.oldonClose === 'function') { o.oldonClose(selectedDate, ui); }
		};
		$cell.find('.dateTo').datepicker(o);

		// on reset
		$cell.closest('table').bind('filterReset', function(){
			$cell.find('.dateFrom, .dateTo').val('').datepicker('option', 'currentText', '' );
		});

		// return the hidden input so the filter widget has a reference to it
		return $input;
	},

	/**********************\
	HTML5 Number (spinner)
	\**********************/
	html5Number : function($cell, indx, def5Num) {
		var t, o = $.extend({
			value: 0,
			min: 0,
			max: 100,
			step: 1,
			delayed: true,
			disabled: false,
			addToggle: true,
			exactMatch: true
		}, def5Num),

		// test browser for HTML5 range support
		$number = $('<input type="number" style="visibility:hidden;" value="test">').appendTo($cell),
		// test if HTML5 number is supported - from Modernizr
		numberSupported = $number.attr('type') === 'number' && $number.val() !== 'test',
		updateNumber = function(){
			var val = $cell.find('.number').val(),
				chkd = o.addToggle ? $cell.find('.toggle').is(':checked') : true;
			$cell
				.find('input[type=hidden]').val( chkd ? val + (o.exactMatch ? '=' : '') : '' ) // add equal to the end, so we filter exact numbers
				.trigger('search', o.delayed);
			if ($cell.find('.number').length) {
				$cell.find('.number')[0].disabled = (o.disabled || !chkd);
			}
		};
		$number.remove();

		if (numberSupported) {
			t = o.addToggle ? '<div class="button"><input id="button' + indx + '" type="checkbox" class="toggle" /><label for="button' + indx + '"></label></div>' : '';
			t += '<input type="hidden"><input class="number" type="number" min="' + o.min + '" max="' + o.max + '" value="' +
				o.value + '" step="' + o.step + '" />';
			// add HTML5 number (spinner)
			$cell
				.html(t)
				.find('.toggle, .number').bind('change', function(){
					updateNumber();
				})
				.closest('thead').find('th[data-column=' + indx + ']')
				.addClass('filter-parsed') // get exact numbers from column
				// on reset
				.closest('table').bind('filterReset', function(){
					// turn off the toggle checkbox
					$cell.find('.toggle')[0].checked = false;
					updateNumber();
				});
		}

		updateNumber();
		return numberSupported ? $cell.find('input[type="hidden"]') : $('<input type="search">');
	},

	/**********************\
	HTML5 range slider
	\**********************/
	html5Range : function($cell, indx, def5Range) {
		var t, o = $.extend({
			value: 0,
			min: 0,
			max: 100,
			step: 1,
			delayed: true,
			valueToHeader: true,
			exactMatch: true,
			allText: 'all'
		}, def5Range),

		// test browser for HTML5 range support
		$range = $('<input type="range" style="visibility:hidden;" value="test">').appendTo($cell),
		// test if HTML5 range is supported - from Modernizr (but I left out the method to detect in Safari 2-4)
		// see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/inputtypes.js
		rangeSupported = $range.attr('type') === 'range' && $range.val() !== 'test',
		updateRange = function(){
			/*jshint eqeqeq:false */
			var val = $cell.find('.range').val();
			$cell
				.find('input[type=hidden]').val( val == o.min ? '' : val + (o.exactMatch ? '=' : '')) // add equal to the end, so we filter exact numbers
				.trigger('search', o.delayed);
			// or add current color to the header cell, if desired
			$cell.closest('thead').find('th[data-column=' + indx + ']').find('.curvalue').html(' (' + (val == o.min ? o.allText : val) + ')');
		};
		$range.remove();

		if (rangeSupported) {
			// add HTML5 color picker
			$cell
				.html('<input type="hidden"><input class="range" type="range" min="' + o.min + '" max="' + o.max + '" value="' + o.value + '" />')
				.closest('thead').find('th[data-column=' + indx + ']')
				.addClass('filter-parsed') // get exact numbers from column
				// add span to header for the current slider value
				.find('.tablesorter-header-inner').append('<span class="curvalue" />');

			$cell.find('.range').bind('change', function(){
				updateRange();
			});

			// on reset
			$cell.closest('table').bind('filterReset', function(){
				// just turn off the colorpicker
				$cell.find('input.range').val(o.value);
				updateRange();
			});
		}

		updateRange();
		return rangeSupported ? $cell.find('input[type="hidden"]') : $('<input type="search">');
	},

	/**********************\
	HTML5 Color picker
	\**********************/
	html5Color: function($cell, indx, defColor) {
		var t, o = $.extend({
			value: '#000000',
			disabled: false,
			addToggle: true,
			valueToHeader: false
		}, defColor),
		// Add a hidden input to hold the range values
		$color = $('<input type="color" style="visibility:hidden;" value="test">').appendTo($cell),
		// test if HTML5 color is supported - from Modernizr
		colorSupported = $color.attr('type') === 'color' && $color.val() !== 'test',
		updateColor = function(){
			var chkd = true, val = $cell.find('.colorpicker').val();
			if (o.addToggle) {
				chkd = $cell.find('.toggle').is(':checked');
			}
			if ($cell.find('.colorpicker').length) {
				$cell.find('.colorpicker')[0].disabled = (o.disabled || !chkd);
			}
			$cell
				.find('input[type=hidden]').val( chkd ? val : '' )
				.trigger('search');
			if (o.valueToHeader) {
				// add current color to the header cell
				$cell.closest('thead').find('th[data-column=' + indx + ']').find('.curcolor').html(' (' + val + ')');
			} else {
				// current color to span in cell
				$cell.find('.currentColor').html(' (' + val + ')');
			}
		};
		$color.remove();

		if (colorSupported) {
			// add HTML5 color picker
			t = o.addToggle ? '<div class="button"><input id="button' + indx + '" type="checkbox" class="toggle" /><label for="button' + indx + '"></label></div>' : '';
			t += '<input type="hidden"><input class="colorpicker" type="color" />';
			t += o.valueToHeader ? '' : '<span class="currentColor">(#000000)</span>';
			$cell.html(t);

			// add span to header for the current color value - only works if the line in the updateColor() function is also un-commented out
			if (o.valueToHeader) {
				$cell.closest('thead').find('th[data-column=' + indx + ']').find('.tablesorter-header-inner').append('<span class="curcolor" />');
			}

			$cell.find('.toggle, .colorpicker').bind('change', function(){
				updateColor();
			});

			// on reset
			$cell.closest('table').bind('filterReset', function(){
				// just turn off the colorpicker
				$cell.find('.toggle')[0].checked = false;
				updateColor();
			});
		}
		updateColor();
		return colorSupported ? $cell.find('input[type="hidden"]') : $('<input type="search">');
	}

};

})(jQuery);