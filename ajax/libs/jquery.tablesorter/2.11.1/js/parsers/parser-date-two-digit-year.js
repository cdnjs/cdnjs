/*! Two digit year parser
 * Demo: http://jsfiddle.net/Mottie/abkNM/427/
 */
/*jshint jquery:true */
;(function($){
"use strict";

	var ts = $.tablesorter,

	// Make the date be within +/- range of the 2 digit year
	// so if the current year is 2020, and the 2 digit year is 80 (2080 - 2020 > 50), it becomes 1980
	// if the 2 digit year is 50 (2050 - 2020 < 50), then it becomes 2050.
	range = 50;

	ts.dates = $.extend({}, ts.dates, {
		regxxxxyy: /(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{2})/,
		regyyxxxx: /(\d{2})[\/\s](\d{1,2})[\/\s](\d{1,2})/
	});

	ts.formatDate = function(s, regex, format){
		s = s
			// replace separators
			.replace(/\s+/g," ").replace(/[-.,]/g, "/")
			// reformat xx/xx/xx to mm/dd/19yy;
			.replace(regex, format);
		var d = new Date(s),
			y = d.getFullYear(),
			now = new Date().getFullYear();
		// if date > 50 years old (set range), add 100 years
		// this will work when people start using "50" and mean "2050"
		while (now - y > range) {
			y += 100;
		}
		return d.setFullYear(y);
	};

	$.tablesorter.addParser({
		id: "ddmmyy",
		is: function() {
			return false;
		},
		format: function(s) {
			// reformat dd/mm/yy to mm/dd/19yy;
			return ts.formatDate(s, ts.dates.regxxxxyy, "$2/$1/19$3");
		},
		type: "numeric"
	});

	$.tablesorter.addParser({
		id: "mmddyy",
		is: function() {
			return false;
		},
		format: function(s) {
			// reformat mm/dd/yy to mm/dd/19yy
			return ts.formatDate(s, ts.dates.regxxxxyy, "$1/$2/19$3");
		},
		type: "numeric"
	});

	$.tablesorter.addParser({
		id: "yymmdd",
		is: function() {
			return false;
		},
		format: function(s) {
			// reformat yy/mm/dd to mm/dd/19yy
			return ts.formatDate(s, ts.dates.regyyxxxx, "$2/$3/19$1");
		},
		type: "numeric"
	});

})(jQuery);
