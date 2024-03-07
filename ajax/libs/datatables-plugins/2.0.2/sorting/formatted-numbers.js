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
}(function( $, window, document ) {
'use strict';
var DataTable = $.fn.dataTable;


/**
 * This plug-in will provide numeric sorting for numeric columns which have
 * extra formatting, such as thousands separators, currency symbols or any other
 * non-numeric data.
 *
 * By default when a cell is found to have no numeric data its value is sorted
 * numerically as if its value were 0. This could also be altered to be Inifnity
 * or -Infinity as required.
 *
 * DataTables 1.10+ has formatted number detection and sorting abilities built-
 * in. As such this plug-in is marked as deprecated, but might be useful when
 * working with old versions of DataTables.
 *
 *  @name Formatted numbers
 *  @summary Sort numbers which are displayed with thousand separators
 *  @deprecated
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'formatted-num', targets: 0 }
 *       ]
 *    } );
 */
DataTable.ext.type.order['formatted-num-pre'] = function (a) {
    a = a === '-' || a === '' ? 0 : a.replace(/[^\d\-\.]/g, '');
    return parseFloat(a);
};


return DataTable;
}));
