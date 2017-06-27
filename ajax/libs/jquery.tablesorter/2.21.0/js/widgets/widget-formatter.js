/*! tablesorter Formatter widget - 2/9/2015 (v2.19.1)
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
'use strict';
	var ts = $.tablesorter;

	ts.formatter = {
		init : function( c ) {
			var events = c.widgetOptions.formatter_event +
				' pagerComplete updateComplete '.split(' ').join('.tsformatter ');
			c.$table
				.off( events.replace(/\s+/g, ' ') )
				.on( events, function() {
					ts.formatter.setup( c );
				});
			ts.formatter.setup( c );
		},
		setup : function( c ) {
			// do nothing for empty tables
			if ( $.isEmptyObject( c.cache ) ) { return; }
			var $tbody, tbodyIndex, rowIndex, rows, cell, len, column,
				wo = c.widgetOptions,
				data = { config: c, wo: wo },
				formatter = [],
				$headers = [];
			// set up variables
			for ( column = 0; column < c.columns; column++ ) {
				$headers[ column ] = c.$headerIndexed[ column ];
				formatter[ column ] = ts.getColumnData( c.table, wo.formatter_column, column ) || false;
			}
			// main loop
			for ( tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++ ){
				$tbody = ts.processTbody( c.table, c.$tbodies.eq( tbodyIndex ), true ); // detach tbody
				rows = c.cache[ tbodyIndex ];
				len = rows.normalized.length;
				for ( rowIndex = 0; rowIndex < len; rowIndex++ ) {
					data.$row = rows.normalized[ rowIndex ][ c.columns ].$row;
					data.$cells = data.$row.children( 'th, td' );
					for ( column = 0; column < c.columns; column++ ) {
						if ( formatter[ column ] ) {
							data.columnIndex = column;
							data.$header = $headers[ column ];
							data.$cell = data.$cells.eq( column );
							cell = data.$cell[0];
							// get text from attribute first, just in case we're updating
							data.text = cell.getAttribute( c.textAttribute ) || cell.textContent || data.$cell.text();
							cell.innerHTML = formatter[ column ]( data.text, data );
						}
					}
				}
				ts.processTbody( c.table, $tbody, false); // restore tbody
			}
		}
	};

	ts.addWidget({
		id: 'formatter',
		priority: 100,
		options: {
			formatter_column : {},
			formatter_event  : 'applyFormatter'
		},
		init: function( table ) {
			ts.formatter.init( table.config );
		}
	});

})( jQuery );
