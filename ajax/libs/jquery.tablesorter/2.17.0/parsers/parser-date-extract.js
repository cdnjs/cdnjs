/*!
 * Extract out date parsers
 */
/*jshint jquery:true */
;(function($){
"use strict";

	/*! extract US Long Date (ignore any other text)
	* e.g. "Sue's Birthday! Jun 26, 2004 7:22 AM (8# 2oz)"
	* demo: http://jsfiddle.net/abkNM/2293/
	*/
	$.tablesorter.addParser({
		id: "extractUSLongDate",
		is: function (s) {
			// don't auto detect this parser
			return false;
		},
		format: function (s, table) {
			var date = s.match(/[A-Z]{3,10}\.?\s+\d{1,2},?\s+(?:\d{4})(?:\s+\d{1,2}:\d{2}(?::\d{2})?(?:\s+[AP]M)?)?/i);
			return date ? $.tablesorter.formatFloat((new Date(date[0]).getTime() || ''), table) || s : s;
		},
		type: "numeric"
	});

	/*! extract MMDDYYYY (ignore any other text)
	* demo: http://jsfiddle.net/Mottie/abkNM/2418/
	*/
	$.tablesorter.addParser({
		id: "extractMMDDYYYY",
		is: function (s) {
			// don't auto detect this parser
			return false;
		},
		format: function (s, table) {
			var date = s.replace(/\s+/g," ").replace(/[\-.,]/g, "/").match(/(\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/i);
			return date ? $.tablesorter.formatFloat((new Date(date[0]).getTime() || ''), table) || s : s;
		},
		type: "numeric"
	});

	/*! extract DDMMYYYY (ignore any other text)
	* demo: http://jsfiddle.net/Mottie/abkNM/2419/
	*/
	$.tablesorter.addParser({
		id: "extractDDMMYYYY",
		is: function (s) {
			// don't auto detect this parser
			return false;
		},
		format: function (s, table) {
			var date = s.replace(/\s+/g," ").replace(/[\-.,]/g, "/").match(/(\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/i);
			if (date) {
				date = date[0].replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$2/$1/$3");
				return $.tablesorter.formatFloat((new Date(date).getTime() || ''), table) || s;
			}
			return s;
		},
		type: "numeric"
	});

	/*! extract YYYYMMDD (ignore any other text)
	* demo: http://jsfiddle.net/Mottie/abkNM/2420/
	*/
	$.tablesorter.addParser({
		id: "extractYYYYMMDD",
		is: function (s) {
			// don't auto detect this parser
			return false;
		},
		format: function (s, table) {
			var date = s.replace(/\s+/g," ").replace(/[\-.,]/g, "/").match(/(\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/i);
			if (date) {
				date = date[0].replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$2/$3/$1");
				console.log(date);
				return $.tablesorter.formatFloat((new Date(date).getTime() || ''), table) || s;
			}
			return s;
		},
		type: "numeric"
	});

})(jQuery);
