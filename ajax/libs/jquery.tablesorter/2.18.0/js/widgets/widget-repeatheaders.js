/*! tablesorter repeatHeaders widget - updated 10/26/2014 (v2.18.0)
* Requires tablesorter v2.8+ and jQuery 1.7+
* Original by Christian Bach from the example-widgets.html demo
*/
/*global jQuery: false */
;(function($){
	"use strict";

	$.tablesorter.addWidget({
		id: "repeatHeaders",
		priority: 10,
		options: {
			rowsToSkip : 4
		},
		// format is called on init and when a sorting has finished
		format: function(table, c, wo) {
			var h = '', i, $tr, l, skip;
			// cache and collect all TH headers
			if (!wo.repeatHeaders) {
				h = '<tr class="repeated-header remove-me">';
				$.each(c.headerContent, function(i,t) {
					h += '<th>' + t + '</th>';
				});
				// "remove-me" class was added in case the table needs to be updated, the "remove-me" rows will be
				// removed prior to the update to prevent including the rows in the update - see "selectorRemove" option
				wo.repeatHeaders = h + '</tr>';
			}

			// number of rows to skip
			skip = wo && wo.rowsToSkip || 4;

			// remove appended headers by classname
			c.$table.find("tr.repeated-header").remove();
			$tr = c.$tbodies.find('tr');
			l = $tr.length;
			// loop all tr elements and insert a copy of the "headers"
			for (i = skip; i < l; i += skip) {
				// insert a copy of the table head every X rows
				$tr.eq(i).before(wo.repeatHeaders);
			}
		},
		// this remove function is called when using the refreshWidgets method or when destroying the tablesorter plugin
		// this function only applies to tablesorter v2.4+
		remove: function(table, c){
			c.$table.find("tr.repeated-header").remove();
		}

	});

})(jQuery);
