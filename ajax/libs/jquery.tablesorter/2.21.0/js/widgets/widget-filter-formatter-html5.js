/*! Filter widget formatter html5 functions *//* updated 7/17/2014 (v2.17.5)
 * requires: tableSorter (FORK) 2.15+ and jQuery 1.4.3+
 *
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


tsff = ts.filterFormatter = $.extend( {}, ts.filterFormatter, {

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

});

})(jQuery);
