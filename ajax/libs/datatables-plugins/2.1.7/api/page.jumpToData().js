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

		if (typeof window === 'undefined') {
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
 * It can be quite useful to jump straight to a page which contains a certain
 * piece of data (a user name for example). This plug-in provides exactly that
 * ability, searching for a given data parameter from a given column and
 * immediately shifting the paging of the table to jump to that point.
 *
 * If multiple data points match the requested data, the paging will be shifted
 * to show the first instance. If there are no matches, the paging will not
 * change.
 *
 * Note that unlike the core DataTables API methods, this plug-in will
 * automatically call `dt-api draw()` to redraw the table with the current page
 * shown.
 *
 * @name page.JumpToData()
 * @summary Jump to a page by searching for data from a column
 * @author [Allan Jardine](http://datatables.net)
 * @requires DataTables 1.10+
 *
 * @param {*} data Data to search for
 * @param {integer} column Column index
 * @returns {Api} DataTables API instance
 *
 * @example
 *    var table = $('#example').DataTable();
 *    table.page.jumpToData( "Allan Jardine", 0 );
 */
DataTable.Api.register('page.jumpToData()', function (data, column) {
    var pos = this.column(column, { order: 'current' }).data().indexOf(data);
    if (pos >= 0) {
        var page = Math.floor(pos / this.page.info().length);
        this.page(page).draw(false);
    }
    return this;
});


return DataTable;
}));
