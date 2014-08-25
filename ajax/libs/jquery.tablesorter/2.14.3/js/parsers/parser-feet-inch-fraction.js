/*! Distance parser
* This parser will parser numbers like 5'10" (5 foot 10 inches)
* and 31½ into sortable values.
* Demo: http://jsfiddle.net/Mottie/abkNM/154/
*/
/*global jQuery: false */
;(function($){
	"use strict";

	var ts = $.tablesorter;
	ts.symbolRegex = /[\u215b\u215c\u215d\u215e\u00bc\u00bd\u00be]/g;
	ts.processFractions = function(n, table) {
		if (n) {
			var t, p = 0;
			n = $.trim(n.replace(/\"/,''));
			// look for a space in the first part of the number: "10 3/4" and save the "10"
			if (/\s/.test(n)) {
				p = ts.formatFloat(n.split(' ')[0], table);
				// remove stuff to the left of the space
				n = $.trim(n.substring(n.indexOf(' '), n.length));
			}
			// look for a "/" to calculate fractions
			if (/\//g.test(n)) {
				t = n.split('/');
				// turn 3/4 into .75; make sure we don't divide by zero
				n = p + parseInt(t[0], 10) / parseInt(t[1] || 1, 10);
				// look for fraction symbols
			} else if (ts.symbolRegex.test(n)) {
				n = p + n.replace(ts.symbolRegex, function(m){
					return {
						'\u215b' : '.125', // 1/8
						'\u215c' : '.375', // 3/8
						'\u215d' : '.625', // 5/8
						'\u215e' : '.875', // 7/8
						'\u00bc' : '.25',  // 1/4
						'\u00bd' : '.5',   // 1/2
						'\u00be' : '.75'   // 3/4
					}[m];
				});
			}
		}
		return n || 0;
	};

	$.tablesorter.addParser({
		id: 'distance',
		is: function() {
			// return false so this parser is not auto detected
			return false;
		},
		format: function(s, table) {
			if (s === '') { return ''; }
			// look for feet symbol = '
			// very generic test to catch 1.1', 1 1/2' and 1½'
			var d = (/^\s*\S*(\s+\S+)?\s*\'/.test(s)) ? s.split("'") : [0,s],
			f = ts.processFractions(d[0], table), // feet
			i = ts.processFractions(d[1], table); // inches
			return (/[\'\"]/).test(s) ? parseFloat(f) + (parseFloat(i)/12 || 0) : parseFloat(f) + parseFloat(i);
		},
		type: 'numeric'
	});

})(jQuery);
