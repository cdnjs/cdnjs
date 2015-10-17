/*! Parser: dates - updated 10/26/2014 (v2.18.0) */
/* Extract dates using popular natural language date parsers */
/*jshint jquery:true */
;(function($){
"use strict";

	/*! Sugar (http://sugarjs.com/dates#comparing_dates) */
	/* demo: http://jsfiddle.net/Mottie/abkNM/4163/ */
	$.tablesorter.addParser({
		id: "sugar",
		is: function() {
			return false;
		},
		format: function(s) {
			var date = Date.create ? Date.create(s) : s ? new Date(s) : s;
			return date instanceof Date && isFinite(date) ? date.getTime() : s;
		},
		type: "numeric"
	});

	/*! Datejs (http://www.datejs.com/) */
	/* demo: http://jsfiddle.net/Mottie/abkNM/4164/ */
	$.tablesorter.addParser({
		id: "datejs",
		is: function() {
			return false;
		},
		format: function(s) {
			var date = Date.parse ? Date.parse(s) : s ? new Date(s) : s;
			return date instanceof Date && isFinite(date) ? date.getTime() : s;
		},
		type: "numeric"
	});

})(jQuery);
