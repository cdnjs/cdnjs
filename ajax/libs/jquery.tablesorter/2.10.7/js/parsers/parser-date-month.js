/*! Month parser
 * Demo: http://jsfiddle.net/Mottie/abkNM/477/
 */
/*jshint jquery:true */
;(function($){
"use strict";

	$.tablesorter.dates = $.extend({}, $.tablesorter.dates, {
		// *** modify this array to change match the language ***
		monthCased : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
	});
	$.tablesorter.dates.monthLower = $.tablesorter.dates.monthCased.join(',').toLocaleLowerCase().split(',');

	$.tablesorter.addParser({
		id: "month",
		is: function(){
			return false;
		},
		format: function(s, table) {
			var j = -1, c = table.config;
			s = c.ignoreCase ? s.toLocaleLowerCase() : s;
			$.each($.tablesorter.dates[ 'month' + (c.ignoreCase ? 'Lower' : 'Cased') ], function(i,v){
				if (j < 0 && s.match(v)) { j = i; }
			});
			// return s (original string) if there isn't a match
			// (non-weekdays will sort separately and empty cells will sort as expected)
			return j < 0 ? s : j;
		},
		type: "numeric"
	});

})(jQuery);
