/*! Widget: filter, insideRange filter type - updated 2/23/2015 (v2.21.0) */
;(function($){
'use strict';

	// Add insideRange filter type
	// ============================
	// This allows you to enter a number (e.g. 8) and show the
	// resulting rows that will have that query within it's range
	// demo at http://mottie.github.io/tablesorter/docs/example-widget-filter-custom-search2.html
	var ts = $.tablesorter,
		isDigit = /\d+/,
		range = /\s+-\s+/,
		parseNumber = function(num) {
			return isNaN(num) ? num : parseFloat(num);
		};

	ts.filter.types.insideRange = function( c, data ) {
		if ( isDigit.test( data.iFilter ) && range.test( data.iExact ) ) {
			var t, val, low, high,
				parts = data.iExact.split( range ),
				format = c.parsers[data.index].format;
			// the cell does not contain a range
			if ( parts && parts.length < 2 ) {
				return null;
			}
			// format each side part of the range using the assigned parser
			low = parseNumber( format( parts[0], c.table ) );
			high = parseNumber( format( parts[1], c.table ) );
			val = parseNumber( format( data.iFilter, c.table ) );
			if ( high < low ) {
				// swap high & low
				t = high; high = low; low = t;
			}
			return low <= val && val <= high;
		}
		return null;
	};

})(jQuery);
