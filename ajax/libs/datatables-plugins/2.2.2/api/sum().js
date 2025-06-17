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
 * Fairly simply, this plug-in will take the data from an API result set
 * and sum it, returning the summed value. The data can come from any data
 * source, including column data, cells or rows.
 *
 * Note that it will attempt to 'deformat' any string based data that is passed
 * into it - i.e. it will strip any non-numeric characters in order to make a
 * best effort attempt to sum all data types. This can be useful when working
 * with formatting numbers such as currency. However the trade-off is that no
 * error is thrown if non-numeric data is passed in. You should be aware of this
 * in case unexpected values are returned - likely the input data is not what is
 * expected.
 *
 * @name sum()
 * @summary Sum the values in a data set.
 * @author [Allan Jardine](http://datatables.net)
 * @requires DataTables 1.10+
 *
 * @returns {Number} Summed value
 *
 * @example
 *    // Simply get the sum of a column
 *    var table = $('#example').DataTable();
 *    table.column( 3 ).data().sum();
 *
 * @example
 *    // Insert the sum of a column into the columns footer, for the visible
 *    // data on each draw
 *    $('#example').DataTable( {
 *      drawCallback: function () {
 *        var api = this.api();
 *        $( api.table().footer() ).html(
 *          api.column( 4, {page:'current'} ).data().sum()
 *        );
 *      }
 *    } );
 */
DataTable.Api.register('sum()', function () {
    return this.flatten().reduce(function (a, b) {
        if (typeof a === 'string') {
            a = a.replace(/[^\d.-]/g, '') * 1;
        }
        if (typeof b === 'string') {
            b = b.replace(/[^\d.-]/g, '') * 1;
        }
        return a + b;
    }, 0);
});


return DataTable;
}));
