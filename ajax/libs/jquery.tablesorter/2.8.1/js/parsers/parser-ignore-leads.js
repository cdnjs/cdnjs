/*! Title parser
 * This parser will remove "The", "A" and "An" from the beginning of a book
 * or movie title, so it sorts by the second word or number
 * Demo: http://jsfiddle.net/Mottie/abkNM/5/
 */
/*global jQuery: false */
;(function($){
"use strict";

	$.tablesorter.addParser({
		id: 'ignoreLeads',
		is: function() {
			return false;
		},
		format: function(s) {
			// Add more lead words inside the parentheses below
			// separated by a vertical bar (shift + \)
			return (s || '').replace(/^(The|A|An)\s/i, '');
		},
		type: 'text'
	});

})(jQuery);
