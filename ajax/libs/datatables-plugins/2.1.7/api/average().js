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
 * It can sometimes be useful to get the average of data in an API result set,
 * be it from a column, or a collection of cells. This method provides exactly
 * that ability.
 *
 * @name average()
 * @summary Average the values in a data set.
 * @author [Allan Jardine](http://sprymedia.co.uk)
 * @requires DataTables 1.10+
 *
 * @returns {Number} Calculated average
 *
 * @example
 *    // Average a column
 *    var table = $('#example').DataTable();
 *    table.column( 3 ).data().average();
 *
 * @example
 *    // Average two cells
 *    var table = $('#example').DataTable();
 *    table.cells( 0, [3,4] ).data().average();
 */
DataTable.Api.register('average()', function () {
    var data = this.flatten();
    var sum = data.reduce(function (a, b) {
        return a * 1 + b * 1; // cast values in-case they are strings
    }, 0);
    return sum / data.length;
});


return DataTable;
}));
