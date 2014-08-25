/*! ISO-8601 date parser
 * This parser will work with dates in ISO8601 format
 * 2013-02-18T18:18:44+00:00
 * Written by Sean Ellingham :https://github.com/seanellingham
 * See https://github.com/Mottie/tablesorter/issues/247
 */
/*global jQuery: false */
;(function($){
"use strict";

	var iso8601date = /^([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?$/;
	$.tablesorter.addParser({
		id : 'iso8601date',
		is : function(s) {
			return s.match(iso8601date);
		},
		format : function(s) {
			var result = s.match(iso8601date);
			if (result) {
				var date = new Date(result[1], 0, 1);
				if (result[3]) {date.setMonth(result[3] - 1);}
				if (result[5]) {date.setDate(result[5]);}
				if (result[7]) {date.setHours(result[7]);}
				if (result[8]) {date.setMinutes(result[8]);}
				if (result[10]) {date.setSeconds(result[10]);}
				if (result[12]) {date.setMilliseconds(Number('0.' + result[12]) * 1000);}
				return date;
			}
			return 0;
		},
		type   : 'numeric'
	});

})(jQuery);
