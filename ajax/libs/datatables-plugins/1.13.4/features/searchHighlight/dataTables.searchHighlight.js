/*! © SpryMedia Ltd - datatables.net/license */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net')(root, $);
			}
		};

		if (typeof window !== 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/**
 * @summary     SearchHighlight
 * @description Search term highlighter for DataTables
 * @version     1.1.0
 * @author      SpryMedia Ltd
 *
 * License      MIT - http://datatables.net/license/mit
 *
 * This feature plug-in for DataTables will highlight search terms in the
 * DataTable as they are entered into the main search input element, or via the
 * `search()` API method.
 *
 * It depends upon the jQuery Highlight plug-in by Bartek Szopka:
 * 	  http://bartaz.github.io/sandbox.js/jquery.highlight.js
 *
 * Search highlighting in DataTables can be enabled by:
 *
 * * Adding the class `searchHighlight` to the HTML table
 * * Setting the `searchHighlight` parameter in the DataTables initialisation to
 *   be true
 * * Setting the `searchHighlight` parameter to be true in the DataTables
 *   defaults (thus causing all tables to have this feature) - i.e.
 *   `DataTable.defaults.searchHighlight = true`.
 *
 * For more detailed information please see:
 *     http://datatables.net/blog/2014-10-22
 */
function highlight(body, table) {
    // Removing the old highlighting first
    body.unhighlight();
    // Don't highlight the "not found" row, so we get the rows using the api
    if (table.rows({ filter: 'applied' }).data().length) {
        table.columns().every(function () {
            var column = this;
            column.nodes().flatten().to$().unhighlight({ className: 'column_highlight' });
            column.nodes().flatten().to$().highlight(column.search().trim().split(/\s+/), { className: 'column_highlight' });
        });
        body.highlight(table.search().trim().split(/\s+/));
    }
}
// Listen for DataTables initialisations
$(document).on('init.dt.dth', function (e, settings, json) {
    if (e.namespace !== 'dt') {
        return;
    }
    var table = new DataTable.Api(settings);
    var body = $(table.table().body());
    if ($(table.table().node()).hasClass('searchHighlight') || // table has class
        settings.oInit.searchHighlight || // option specified
        DataTable.defaults.searchHighlight // default set
    ) {
        table
            .on('draw.dt.dth column-visibility.dt.dth column-reorder.dt.dth', function () {
            highlight(body, table);
        })
            .on('destroy', function () {
            // Remove event handler
            table.off('draw.dt.dth column-visibility.dt.dth column-reorder.dt.dth');
        });
        // initial highlight for state saved conditions and initial states
        if (table.search()) {
            highlight(body, table);
        }
    }
});


return DataTable;
}));
