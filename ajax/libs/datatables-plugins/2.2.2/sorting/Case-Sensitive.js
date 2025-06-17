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
 *
 *This plug in will sort data taking into account upper and lower case. In ascending order it will prioritise
 *upper case letters, before continuing to the lower case letters.
 *
 *  @name Case-Sensitive
 *  @summary Sort based on case of data, In ascending order capitals are prioritised over lower case.
 *  @author [Sandy Galloway](http://datatables.net)
 *
 *
 *  @example
 * //This example shows how to invoke the case-sensitive plugin on the first column.
 * //It will sort the data in alphabetical order Prioritising the capital letters to take
 * //a form similar to [A,B,C,D,...,a,b,c,d,...] for ascending order.
 *   var table = $('#example').DataTable({
 *      columnDefs: [
 *            {type: "case-sensitive", targets:0}
 *       ]
 *   });
 **/
DataTable.ext.type.order['case-sensitive-asc'] = function (a, b) {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    return 0;
};
DataTable.ext.type.order['case-sensitive-desc'] = function (a, b) {
    if (a > b) {
        return -1;
    }
    else if (a < b) {
        return 1;
    }
    return 0;
};


return DataTable;
}));
