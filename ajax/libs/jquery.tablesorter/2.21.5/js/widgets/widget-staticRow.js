/*! widget: staticRow - updated 2/9/2015 (v2.19.1) *//*
 * Version 1.2 mod by Rob Garrison (requires tablesorter v2.16+)
 * Requires:
 *  jQuery v1.4+
 *  tablesorter plugin, v2.8+, available at http://mottie.github.com/tablesorter/docs/
 *
 * Copyright (c) 2011 Nils Luxton
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";
var ts = $.tablesorter,

// add/refresh row indexes
addIndexes = function(table){
	var $tr, wo, v, indx, rows,
		c = table.config;
	// "Index" the static rows, saving their current (starting) position in the
	// table inside a data() param on the <tr> element itself for later use.
	if (c) {
		wo = c.widgetOptions;
		c.$tbodies.each(function(){
			$tr = $(this).children();
			rows = $tr.length;
			$tr.filter(wo.staticRow_class).each(function() {
				$tr = $(this);
				indx = $tr.data(wo.staticRow_index);
				if (typeof indx !== "undefined") {
					v = parseFloat(indx);
					// percentage of total rows
					indx = (/%/.test(indx)) ? Math.round(v/100 * rows) : v;
				} else {
					indx = $tr.index();
				}
				// row indexing starts over within each tbody
				$tr.data( wo.staticRow_data, indx );
			});
		});
	}
};

ts.addWidget({
	// Give the new Widget an ID to be used in the tablesorter() call, as follows:
	// $('#myElement').tablesorter({ widgets: ['zebra', 'staticRow'] });
	id: 'staticRow',

	options: {
		staticRow_class : '.static',
		staticRow_data  : 'static-index',
		staticRow_index : 'row-index',
		staticRow_event : 'staticRowsRefresh'
	},

	init: function(table, thisWidget, c, wo){
		addIndexes(table);
		// refresh static rows after updates
		c.$table
			.unbind( ('updateComplete.tsstaticrows ' + wo.staticRow_event).replace(/\s+/g, ' ') )
			.bind('updateComplete.tsstaticrows ' + wo.staticRow_event, function(){
				addIndexes(table);
				c.$table.trigger('applyWidgets');
			});
	},

	format: function(table, c, wo) {
		// Loop thru static rows, moving them to their original "indexed" position,
		// & repeat until no more re-shuffling is needed
		var targetIndex, $thisRow, indx, numRows, $tbody, hasShuffled, $rows, max;

		c.$tbodies.each(function(){
			$tbody = $.tablesorter.processTbody(table, $(this), true); // remove tbody
			hasShuffled = true;
			indx = 0;
			$rows = $tbody.children(wo.staticRow_class);
			numRows = $tbody.children('tr').length - 1;
			max = $rows.length;

			// don't allow the while loop to cycle more times than the set number of static rows
			while (hasShuffled && indx < max) {
				hasShuffled = false;
				/*jshint loopfunc:true */
				$rows.each(function() {
					targetIndex = $(this).data(wo.staticRow_data);
					// allow setting target index >> num rows to always make a row last
					targetIndex = targetIndex >= numRows ? numRows : targetIndex < 0 ? 0 : targetIndex;
					if (targetIndex !== $(this).index()) {
						hasShuffled = true;
						$thisRow = $(this).detach();

						if (targetIndex >= numRows) {
							// Are we trying to be the last row?
							$thisRow.appendTo( $tbody );
						} else if (targetIndex === 0) {
								// Are we trying to be the first row?
								$thisRow.prependTo( $tbody );
						} else {
							// No, we want to be somewhere in the middle!
							$thisRow.insertBefore( $tbody.find('tr:eq(' + targetIndex + ')') );
						}
					}
				});
				indx++;
			}

			$.tablesorter.processTbody(table, $tbody, false); // restore tbody
		});

		c.$table.trigger('staticRowsComplete', table);
	},

	remove : function(table, c, wo){
		c.$table.unbind( ('updateComplete.tsstaticrows ' + wo.staticRow_event).replace(/\s+/g, ' ') );
	}

});

})(jQuery);