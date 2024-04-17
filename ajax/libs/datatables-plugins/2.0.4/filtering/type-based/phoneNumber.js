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
 * Telephone numbers are a common data point to display in HTML tables, and are
 * often formatted (e.g. `dt-string 555-1234`). Typically, when searching a
 * table a user would need to enter the number in exactly the same format it is
 * displayed in, but this is not always convenient (e.g. you might search for
 * `dt-string 5551`).
 *
 * This filtering plug-in will allow both forms to be matched be providing both
 * the formatted and de-formatted data to the table's search.
 *
 *  @summary Make phone numbers searchable formatted or unformatted
 *  @name Phone number
 *  @author Allan Jardine
 *
 *  @example
 *    $(document).ready(function() {
 *      $('#example').dataTable( {
 *        columnDefs: [
 *          { type: 'phoneNumber', target: 4 }
 *        ]
 *      } );
 *    } );
 */
DataTable.ext.type.search.phoneNumber = function (data) {
    return !data
        ? ''
        : typeof data === 'string'
            ? data + data.replace(/[ \-]/g, '')
            : data;
};


return DataTable;
}));
