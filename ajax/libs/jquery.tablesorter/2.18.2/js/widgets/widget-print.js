/* Print widget (beta) for TableSorter 6/18/2014 (v2.17.2)
 * Requires tablesorter v2.8+ and jQuery 1.2.6+
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";

var ts = $.tablesorter,

printTable = ts.printTable = {

	event      : 'printTable',
	basicStyle : 'table, tr, td, th { border : solid 1px black; border-collapse : collapse; } td, th { padding: 2px; }',

	init : function(c) {
		c.$table
			.unbind(printTable.event)
			.bind(printTable.event, function(){
				// explicitly use table.config.widgetOptions because we want
				// the most up-to-date values; not the "wo" from initialization
				printTable.process(c, c.widgetOptions);
			});
	},

	process : function(c, wo) {
		var $this,
			$table = $('<div/>').append(c.$table.clone()),
			printStyle = printTable.basicStyle + 'table { width: 100% }' +
				// hide filter row
				'.tablesorter-filter-row { display: none }' +
				// hide sort arrows
				'.tablesorter-header { background-image: none !important; }';

		// replace content with data-attribute content
		$table.find('[' + wo.print_dataAttrib + ']').each(function(){
			$this = $(this);
			$this.text( $this.attr(wo.print_dataAttrib) );
		});

		// === rows ===
		// Assume "visible" means rows hidden by the pager (rows set to "display:none")
		// or hidden by a class name which is added to the wo.print_extraCSS definition
		if (/a/i.test(wo.print_rows)) {
			// force show of all rows
			printStyle += 'tbody tr { display: table-row !important; }';
		} else if (/f/i.test(wo.print_rows)) {
			// add definition to show all non-filtered rows (cells hidden by the pager)
			printStyle += 'tbody tr:not(.' + (wo.filter_filteredRow || 'filtered') + ') { display: table-row !important; }';
		}

		// === columns ===
		// columnSelector -> c.selector.$style
		// Assume "visible" means hidden columns have a "display:none" style, or a class name
		// add the definition to the wo.print_extraCSS option
		if (/s/i.test(wo.print_columns) && c.selector && c.widgets.indexOf('columnSelector') >= 0) {
			// show selected (visible) columns; make a copy of the columnSelector widget css (not media queries)
			printStyle += c.selector.auto ? '' : c.selector.$style.text();
		} else if (/a/i.test(wo.print_columns)) {
			// force show all cells
			printStyle += 'td, th { display: table-cell !important; }';
		}

		printStyle += wo.print_extraCSS;

		// callback function
		if ( $.isFunction(wo.print_callback) ) {
			wo.print_callback( c, $table, printStyle );
		} else {
			printTable.printOutput(c, $table.html(), printStyle);
		}

	}, // end process

	printOutput : function(c, data, style) {
		var wo = c.widgetOptions,
			generator = window.open('', wo.print_title, 'width=500,height=300'),
			t = wo.print_title || c.$table.find('caption').text() || c.$table[0].id || document.title || 'table';
		generator.document.write(
			'<html><head><title>' + t + '</title>' +
			( wo.print_styleSheet ? '<link rel="stylesheet" href="' + wo.print_styleSheet + '">' : '' ) +
			'<style>' + style + '</style>' +
			'</head><body>' + data + '</body></html>'
		);
		generator.document.close();
		generator.print();
		generator.close();
		return true;
	},

	remove : function(c) {
		c.$table.off(printTable.event);
	}

};

ts.addWidget({
	id: 'print',
	options: {
		print_title      : '',          // this option > caption > table id > "table"
		print_dataAttrib : 'data-name', // header attrib containing modified header name
		print_rows       : 'filtered',  // (a)ll, (v)isible or (f)iltered
		print_columns    : 'selected',  // (a)ll or (s)elected (if columnSelector widget is added)
		print_extraCSS   : '',          // add any extra css definitions for the popup window here
		print_styleSheet : '',          // add the url of your print stylesheet
		// callback executed when processing completes
		// to continue printing, use the following function:
		// function( config, $table, printStyle ) {
		//   // do something to the table or printStyle string
		//   $.tablesorter.printTable.printOutput( config, $table.html(), printStyle );
		// }
		print_callback   : null
	},
	init: function(table, thisWidget, c) {
		printTable.init(c);
	},
	remove: function(table, c){
		printTable.remove(c);
	}

});

})(jQuery);
