/*! Parser: Extract out date - updated 10/26/2014 (v2.18.0) */
/*jshint jquery:true */
;(function($){
"use strict";

	var regex = {
		usLong     : /[A-Z]{3,10}\.?\s+\d{1,2},?\s+(?:\d{4})(?:\s+\d{1,2}:\d{2}(?::\d{2})?(?:\s+[AP]M)?)?/i,
		mdy        : /(\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/i,

		dmy        : /(\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/i,
		dmyreplace : /(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,

		ymd        : /(\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/i,
		ymdreplace : /(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/
	};

	/*! extract US Long Date *//* (ignore any other text)
	* e.g. "Sue's Birthday! Jun 26, 2004 7:22 AM (8# 2oz)"
	* demo: http://jsfiddle.net/Mottie/abkNM/4165/ */
	$.tablesorter.addParser({
		id: "extractUSLongDate",
		is: function () {
			// don't auto detect this parser
			return false;
		},
		format: function (s) {
			var date,
				str = s ? s.match(regex.usLong) : s;
			if (str) {
				date = new Date( str[0] );
				return date instanceof Date && isFinite(date) ? date.getTime() : s;
			}
			return s;
		},
		type: "numeric"
	});

	/*! extract MMDDYYYY *//* (ignore any other text)
	* demo: http://jsfiddle.net/Mottie/abkNM/4166/ */
	$.tablesorter.addParser({
		id: "extractMMDDYYYY",
		is: function () {
			// don't auto detect this parser
			return false;
		},
		format: function (s) {
			var date,
				str = s ? s.replace(/\s+/g," ").replace(/[\-.,]/g, "/").match(regex.mdy) : s;
			if (str) {
				date = new Date( str[0] );
				return date instanceof Date && isFinite(date) ? date.getTime() : s;
			}
			return s;
		},
		type: "numeric"
	});

	/*! extract DDMMYYYY *//* (ignore any other text)
	* demo: http://jsfiddle.net/Mottie/abkNM/4167/ */
	$.tablesorter.addParser({
		id: "extractDDMMYYYY",
		is: function () {
			// don't auto detect this parser
			return false;
		},
		format: function (s) {
			var date,
				str = s ? s.replace(/\s+/g," ").replace(/[\-.,]/g, "/").match(regex.dmy) : s;
			if (str) {
				date = new Date( str[0].replace(regex.dmyreplace, "$2/$1/$3") );
				return date instanceof Date && isFinite(date) ? date.getTime() : s;
			}
			return s;
		},
		type: "numeric"
	});

	/*! extract YYYYMMDD *//* (ignore any other text)
	* demo: http://jsfiddle.net/Mottie/abkNM/4168/ */
	$.tablesorter.addParser({
		id: "extractYYYYMMDD",
		is: function () {
			// don't auto detect this parser
			return false;
		},
		format: function (s) {
			var date,
				str = s ? s.replace(/\s+/g," ").replace(/[\-.,]/g, "/").match(regex.ymd) : s;
			if (str) {
				date = new Date( str[0].replace(regex.ymdreplace, "$2/$3/$1") );
				return date instanceof Date && isFinite(date) ? date.getTime() : s;
			}
			return s;
		},
		type: "numeric"
	});

})(jQuery);
