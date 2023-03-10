/*! © SpryMedia Ltd, David Konrad - datatables.net/license */

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
 * Sorts columns by any number, ignoring text. This plugin is useful if you have
 * mixed content in a column, but still want to sort by numbers. Any number means
 *
 *  - integers, like 42
 *  - decimal numbers, like 42.42 / 42,42
 *  - signed numbers, like -42.42 / +42.42
 *  - scientific numbers, like 42.42e+10
 *  - illegal numbers, like 042, which is considered as 42,
 *  - currency numbers, like €42,00
 *
 * Plain text is ignored; columns with no recognizable numerical content
 * is pushed to the bottom of the table, both ascending and descending.
 *
 *  @demo http://jsfiddle.net/vkkL5tv7/
 *
 *  @name Any number
 *  @summary Sort column with mixed numerical content by number
 *  @author David Konrad
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'any-number', targets : 0 }
 *       ]
 *    } );
 *
 */
function _anyNumberSort(a, b, high) {
    var reg = /[+-]?((\d+(\.\d*)?)|\.\d+)([eE][+-]?[0-9]+)?/;
    a = a.replace(',', '.').match(reg);
    a = a !== null ? parseFloat(a[0]) : high;
    b = b.replace(',', '.').match(reg);
    b = b !== null ? parseFloat(b[0]) : high;
    return a < b ? -1 : a > b ? 1 : 0;
}
DataTable.ext.order['any-number-asc'] = function (a, b) {
    return _anyNumberSort(a, b, Number.POSITIVE_INFINITY);
};
DataTable.ext.order['any-number-desc'] = function (a, b) {
    return _anyNumberSort(a, b, Number.NEGATIVE_INFINITY) * -1;
};


return DataTable;
}));
