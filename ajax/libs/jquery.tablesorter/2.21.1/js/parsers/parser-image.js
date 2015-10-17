/*! image alt attribute parser for jQuery 1.7+ & tablesorter 2.7.11+
 * New 7/17/2014 (v2.17.5)
 */
/*jshint jquery:true, unused:false */
;(function($){
"use strict";

	$.tablesorter.addParser({
		id: "image",
		is: function(){
			return false;
		},
		format: function(s, table, cell) {
			return $(cell).find('img').attr(table.config.imgAttr || 'alt') || s;
		},
		parsed : true, // filter widget flag
		type: "text"
	});

})(jQuery);
