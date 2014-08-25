/*! tablesorter math widget - beta - updated 5/28/2014 (v2.17.1)
* Requires tablesorter v2.16+ and jQuery 1.7+
* by Rob Garrison
*/
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
	"use strict";

	var ts = $.tablesorter,
	math = {

		// get all of the row numerical values in an arry
		getRow : function(table, wo, $el, dataAttrib) {
			var $t, txt,
				c = table.config,
				arry = [],
				$row = $el.closest('tr'),
				$cells = $row.children();
			if (!$row.hasClass(wo.filter_filteredRow || 'filtered')) {
				if (wo.math_ignore.length) {
					$cells = $cells.not('[' + dataAttrib + '=ignore]').not('[data-column=' + wo.math_ignore.join('],[data-column=') + ']');
				}
				arry = $cells.not($el).map(function(){
					$t = $(this);
					txt = $t.attr(c.textAttribute);
					if (typeof txt === "undefined") {
						txt = this.textContent || $t.text();
					}
					txt = ts.formatFloat(txt.replace(/[^\w,. \-()]/g, ""), table);
					return isNaN(txt) ? 0 : txt;
				}).get();
			}
			return arry;
		},

		// get all of the column numerical values in an arry
		getColumn : function(table, wo, $el, type, dataAttrib){
			var i, txt, $t, len, mathAbove,
				arry = [],
				c = table.config,
				filtered = wo.filter_filteredRow || 'filtered',
				cIndex = parseInt( $el.attr('data-column'), 10 ),
				$rows = c.$table.children('tbody').children(),
				$row = $el.closest('tr');
			// make sure tfoot rows are AFTER the tbody rows
			// $rows.add( c.$table.children('tfoot').children() );
			if (type === 'above') {
				len = $rows.index($row);
				i = len;
				while (i >= 0) {
					$t = $rows.eq(i).children().filter('[data-column=' + cIndex + ']');
					mathAbove = $t.filter('[' + dataAttrib + '^=above]').length;
					// ignore filtered rows & rows with data-math="ignore" (and starting row)
					if ( ( !$rows.eq(i).hasClass(filtered) && $rows.eq(i).not('[' + dataAttrib + '=ignore]').length && i !== len ) || mathAbove && i !== len ) {
						// stop calculating "above", when encountering another "above"
						if (mathAbove) {
							i = 0;
						} else if ($t.length) {
							txt = $t.attr(c.textAttribute);
							if (typeof txt === "undefined") {
								txt = $t[0].textContent || $t.text();
							}
							txt = ts.formatFloat(txt.replace(/[^\w,. \-()]/g, ""), table);
							arry.push(isNaN(txt) ? 0 : txt);
						}
					}
					i--;
				}
			} else {
				$rows.each(function(){
					$t = $(this).children().filter('[data-column=' + cIndex + ']');
					if (!$(this).hasClass(filtered) && $t.not('[' + dataAttrib + '^=above],[' + dataAttrib + '^=col]').length && !$t.is($el)) {
						txt = $t.attr(c.textAttribute);
						if (typeof txt === "undefined") {
							txt = ($t[0] ? $t[0].textContent : '') || $t.text();
						}
						txt = ts.formatFloat(txt.replace(/[^\w,. \-()]/g, ""), table);
						arry.push(isNaN(txt) ? 0 : txt);
					}
				});
			}
			return arry;
		},

		// get all of the column numerical values in an arry
		getAll : function(table, wo, dataAttrib){
			var txt, $t, col,
				arry = [],
				c = table.config,
				filtered = wo.filter_filteredRow || 'filtered',
				$rows = c.$table.children('tbody').children();
			$rows.each(function(){
				if (!$(this).hasClass(filtered)) {
					$(this).children().each(function(){
						$t = $(this);
						col = parseInt( $t.attr('data-column'), 10);
						if (!$t.filter('[' + dataAttrib + ']').length && $.inArray(col, wo.math_ignore) < 0) {
							txt = $t.attr(c.textAttribute);
							if (typeof txt === "undefined") {
								txt = ($t[0] ? $t[0].textContent : '') || $t.text();
							}
							txt = ts.formatFloat(txt.replace(/[^\w,. \-()]/g, ""), table);
							arry.push(isNaN(txt) ? 0 : txt);
						}
					});
				}
			});
			return arry;
		},

		recalculate : function(table, c, wo, init){
			if (c && (!wo.math_isUpdating || init)) {

				// add data-column attributes to all table cells
				if (init) {
					ts.computeColumnIndex( c.$table.children('tbody').children() );
				}

				// data-attribute name (defaults to data-math)
				var dataAttrib = 'data-' + (wo.math_data || 'math'),

				// all non-info tbody cells
				$mathCells = c.$tbodies.find('[' + dataAttrib + ']');
				math.mathType( table, wo, $mathCells, wo.math_priority, dataAttrib );

				// only info tbody cells
				$mathCells = c.$table.find('.' + c.cssInfoBlock + ', tfoot').find('[' + dataAttrib + ']');
				math.mathType( table, wo, $mathCells, wo.math_priority, dataAttrib );

				// find the "all" total
				math.mathType( table, wo, c.$table.find('[' + dataAttrib + '^=all]'), ['all'], dataAttrib );

				wo.math_isUpdating = true;
				c.$table.trigger('update');
			}
		},

		mathType : function(table, wo, $cells, priority, dataAttrib) {
			if ($cells.length) {
				var formula, t, $t, arry, getAll,
					eq = ts.equations;
				if (priority[0] === 'all') {
					// no need to get all cells more than once
					getAll = math.getAll(table, wo, dataAttrib);
				}
				$.each( priority, function(i, type) {
					$cells.filter('[' + dataAttrib + '^=' + type + ']').each(function(){
						$t = $(this);
						formula = ($t.attr(dataAttrib) || '').replace(type + '-', '');
						arry = (type === "row") ? math.getRow(table, wo, $t, dataAttrib) :
							(type === "all") ? getAll : math.getColumn(table, wo, $t, type, dataAttrib);
						if (eq[formula]) {
							t = eq[formula](arry);
							if (table.config.debug && console && console.log) {
								console.log($t.attr(dataAttrib), arry, '=', t);
							}
							math.output( $t, wo, t, arry );
						}
					});
				});
			}
		},

		output : function($cell, wo, value, arry) {
			// get mask from cell data-attribute: data-math-mask="#,##0.00"
			var result = ts.formatMask( $cell.attr('data-' + wo.math_data + '-mask') || wo.math_mask, value, wo.math_wrapPrefix, wo.math_wrapSuffix );
			if ($.isFunction(wo.math_complete)) {
				result = wo.math_complete($cell, wo, result, value, arry);
			}
			if (result !== false) {
				$cell.html(result);
			}
		}

	};

	// Modified from https://code.google.com/p/javascript-number-formatter/
	/**
	* @preserve IntegraXor Web SCADA - JavaScript Number Formatter
	* http:// www.integraxor.com/
	* author: KPL, KHL
	* (c)2011 ecava
	* Dual licensed under the MIT or GPL Version 2 licenses.
	*/
	ts.formatMask = function(m, v, tmpPrefix, tmpSuffix){
		if ( !m || isNaN(+v) ) {
			return v; // return as it is.
		}

		var isNegative, result, decimal, group, posLeadZero, posTrailZero, posSeparator, part, szSep,
			integer, str, offset, i, l, len, start, tmp, end, inv,
			prefix = '',
			suffix = '';

		// find prefix/suffix
		len = m.length;
		start = m.search( /[0-9\-\+#]/ );
		tmp = start > 0 ? m.substring(0, start) : '';
		prefix = tmp;
		if ( start > 0 && tmpPrefix ) {
			if ( /\{content\}/.test(tmpPrefix || '') ) {
				prefix = (tmpPrefix || '').replace(/\{content\}/g, tmp || '');
			} else {
				prefix = (tmpPrefix || '') + tmp;
			}
		}
		// reverse string: not an ideal method if there are surrogate pairs
		inv = m.split('').reverse().join('');
		end = inv.search( /[0-9\-\+#]/ );
		i = len - end;
		i += (m.substring( i, i + 1 ) === '.') ? 1 : 0;
		tmp = end > 0 ? m.substring( i, len) : '';
		suffix = tmp;
		if (tmp !== '' && tmpSuffix) {
			if ( /\{content\}/.test(tmpSuffix || '') ) {
				suffix = (tmpSuffix || '').replace(/\{content\}/g, tmp || '');
			} else {
				suffix = tmp + (tmpSuffix || '');
			}
		}
		m = m.substring(start, i);

		// convert any string to number according to formation sign.
		v = m.charAt(0) == '-' ? -v : +v;
		isNegative = v < 0 ? v = -v : 0; // process only abs(), and turn on flag.

		// search for separator for grp & decimal, anything not digit, not +/- sign, not #.
		result = m.match( /[^\d\-\+#]/g );
		decimal = ( result && result[result.length-1] ) || '.'; // treat the right most symbol as decimal
		group = ( result && result[1] && result[0] ) || ',';  // treat the left most symbol as group separator

		// split the decimal for the format string if any.
		m = m.split( decimal );
		// Fix the decimal first, toFixed will auto fill trailing zero.
		v = v.toFixed( m[1] && m[1].length );
		v = +(v) + ''; // convert number to string to trim off *all* trailing decimal zero(es)

		// fill back any trailing zero according to format
		posTrailZero = m[1] && m[1].lastIndexOf('0'); // look for last zero in format
		part = v.split('.');
		// integer will get !part[1]
		if ( !part[1] || ( part[1] && part[1].length <= posTrailZero ) ) {
			v = (+v).toFixed( posTrailZero + 1 );
		}
		szSep = m[0].split( group ); // look for separator
		m[0] = szSep.join(''); // join back without separator for counting the pos of any leading 0.

		posLeadZero = m[0] && m[0].indexOf('0');
		if ( posLeadZero > -1 ) {
			while ( part[0].length < ( m[0].length - posLeadZero ) ) {
				part[0] = '0' + part[0];
			}
		} else if ( +part[0] === 0 ) {
			part[0] = '';
		}

		v = v.split('.');
		v[0] = part[0];

		// process the first group separator from decimal (.) only, the rest ignore.
		// get the length of the last slice of split result.
		posSeparator = ( szSep[1] && szSep[ szSep.length - 1 ].length );
		if ( posSeparator ) {
			integer = v[0];
			str = '';
			offset = integer.length % posSeparator;
			l = integer.length;
			for ( i = 0; i < l; i++ ) {
				str += integer.charAt(i); // ie6 only support charAt for sz.
				// -posSeparator so that won't trail separator on full length
				/*jshint -W018 */
				if ( !( ( i - offset + 1 ) % posSeparator ) && i < l - posSeparator ) {
					str += group;
				}
			}
			v[0] = str;
		}

		v[1] = ( m[1] && v[1] ) ? decimal + v[1] : "";
		// put back any negation, combine integer and fraction, and add back prefix & suffix
		return prefix + ( ( isNegative ? '-' : '' ) + v[0] + v[1] ) + suffix;
	};

	ts.equations = {
		count : function(arry) {
			return arry.length;
		},
		sum : function(arry) {
			var total = 0;
			$.each( arry, function(i) {
				total += arry[i];
			});
			return total;
		},
		mean : function(arry) {
			var total = ts.equations.sum( arry );
			return total / arry.length;
		},
		median : function(arry) {
			// https://gist.github.com/caseyjustus/1166258
			arry.sort( function(a,b){ return a - b; } );
			var half = Math.floor( arry.length / 2 );
			return (arry.length % 2) ? arry[half] : ( arry[half - 1] + arry[half] ) / 2.0;
		},
		mode : function(arry) {
			// http://stackoverflow.com/a/3451640/145346
			if ( arry.length === 0 ) { return 'none'; }
			var i, el,
				modeMap = {},
				maxCount = 1,
				modes = [arry[0]];
			for (i = 0; i < arry.length; i++) {
				el = arry[i];
				modeMap[el] = modeMap[el] ? modeMap[el] + 1 : 1;
				if ( modeMap[el] > maxCount ) {
					modes = [el];
					maxCount = modeMap[el];
				} else if (modeMap[el] === maxCount) {
					modes.push(el);
					maxCount = modeMap[el];
				}
			}
			// returns arry of modes if there is a tie
			return modes.sort( function(a,b){ return a - b; } );
		},
		max : function(arry) {
			return Math.max.apply( Math, arry );
		},
		min : function(arry) {
			return Math.min.apply( Math, arry );
		},
		range: function(arry) {
			var v = arry.sort(function(a,b){ return a - b; });
			return v[ arry.length - 1 ] - v[0];
		},
		// common variance equation
		// (not accessible via data-attribute setting)
		variance: function(arry, population) {
			var avg = ts.equations.mean( arry ),
				v = 0,
				i = arry.length;
			while (i--) {
				v += Math.pow( ( arry[i] - avg ), 2 );
			}
			v /= ( arry.length - (population ? 0 : 1) );
			return v;
		},
		// variance (population)
		varp : function(arry) {
			return ts.equations.variance(arry, true);
		},
		// variance (sample)
		vars : function(arry) {
			return ts.equations.variance(arry);
		},
		// standard deviation (sample)
		stdevs : function(arry) {
			var vars = ts.equations.variance(arry);
			return Math.sqrt( vars );
		},
		// standard deviation (population)
		stdevp : function(arry){
			var varp = ts.equations.variance(arry, true);
			return Math.sqrt( varp );
		}
	};

	// add new widget called repeatHeaders
	// ************************************
	ts.addWidget({
		id: "math",
		priority: 100,
		options: {
			math_data     : 'math',
			// column index to ignore
			math_ignore   : [],
			// mask info: https://code.google.com/p/javascript-number-formatter/
			math_mask     : '#,##0.00',
			// complete executed after each fucntion
			math_complete : null, // function($cell, wo, result, value, arry){ return result; },
			// order of calculation; "all" is last
			math_priority : [ 'row', 'above', 'col' ],
			// template for or just prepend the mask prefix & suffix with this HTML
			// e.g. '<span class="red">{content}</span>'
			math_prefix   : '',
			math_suffix   : ''
		},
		init : function(table, thisWidget, c, wo){
			c.$table
				.bind('tablesorter-initialized update updateRows addRows updateCell filterReset filterEnd '.split(' ').join('.tsmath '), function(e){
					var init = e.type === 'tablesorter-initialized';
					if (!wo.math_isUpdating || init) {
						math.recalculate( table, c, wo, init );
					}
				})
				.bind('updateComplete.tsmath', function(){
					setTimeout(function(){
						wo.math_isUpdating = false;
					}, 500);
				});
			wo.math_isUpdating = false;
		},
		// this remove function is called when using the refreshWidgets method or when destroying the tablesorter plugin
		// this function only applies to tablesorter v2.4+
		remove: function(table, c, wo){
			$(table)
				.unbind('tablesorter-initialized update updateRows addRows updateCell filterReset filterEnd '.split(' ').join('.tsmath '))
				.find('[data-' + wo.math_data + ']').empty();
		}
	});

})(jQuery);