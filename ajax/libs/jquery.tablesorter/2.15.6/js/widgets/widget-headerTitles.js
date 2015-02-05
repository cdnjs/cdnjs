/*! tablesorter headerTitles widget - updated 3/5/2014 (core v2.15.6)
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";

	$.tablesorter.addWidget({
		id: 'headerTitles',
		options: {
			headerTitle_prefix  : 'Sort: ',
			headerTitle_text    : [ 'A - Z', 'Z - A' ],
			headerTitle_numeric : [ '0 - 9', '9 - 0' ]
		},
		format: function (table, c, wo) {
			var txt;
			// clear out all titles
			c.$headers.attr('title', '');
			// only add titles to sorted columns
			$.each(c.sortList, function(indx, group) {
				txt = wo.headerTitle_prefix + wo['headerTitle_' + (c.parsers[ group[0] ].type || 'text')][ group[1] ];
				c.$headers.filter('[data-column="' + group[0] + '"]').attr('title', txt);
			});
		},
		remove: function (table, c) {
			c.$headers.attr('title', '');
		}
	});

})(jQuery);
