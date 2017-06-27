/*! Parser: Month - updated 10/26/2014 (v2.18.0) */
/* Demo: http://jsfiddle.net/Mottie/abkNM/4169/ */
/*jshint jquery:true */
;(function($){
"use strict";

	var ts = $.tablesorter;
	ts.dates = $.extend({}, ts.dates, {
		// *** modify this array to match the desired language ***
		monthCased : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
	});
	ts.dates.monthLower = ts.dates.monthCased.join(',').toLocaleLowerCase().split(',');

	ts.addParser({
		id: "month",
		is: function(){
			return false;
		},
		format: function(s, table) {
			if (s) {
				var j = -1, c = table.config,
				n = c.ignoreCase ? s.toLocaleLowerCase() : s;
				$.each(ts.dates[ 'month' + (c.ignoreCase ? 'Lower' : 'Cased') ], function(i,v){
					if (j < 0 && n.match(v)) {
						j = i;
						return false;
					}
				});
				// return s (original string) if there isn't a match
				// (non-weekdays will sort separately and empty cells will sort as expected)
				return j < 0 ? s : j;
			}
			return s;
		},
		type: "numeric"
	});

})(jQuery);
