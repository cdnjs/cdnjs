/*!
 * Extract dates using popular natural language date parsers
 */
/*jshint jquery:true */
;(function($){
"use strict";

	/*! Sugar (http://sugarjs.com/dates#comparing_dates)
	* demo: http://jsfiddle.net/Mottie/abkNM/551/
	*/
	$.tablesorter.addParser({
		id: "sugar",
		is: function() {
			return false;
		},
		format: function(s) {
			return Date.create ? Date.create(s).getTime() || s : new Date(s).getTime() || s;
		},
		type: "numeric"
	});

	/*! Datejs (http://www.datejs.com/)
	* demo: http://jsfiddle.net/Mottie/abkNM/550/
	*/
	$.tablesorter.addParser({
		id: "datejs",
		is: function() {
			return false;
		},
		format: function(s) {
			return Date.parse && Date.parse(s) || s;
		},
		type: "numeric"
	});

})(jQuery);
