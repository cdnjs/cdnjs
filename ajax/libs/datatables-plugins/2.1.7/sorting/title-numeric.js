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
 * An alternative to the formatted number sorting function above (particularly
 * useful when considering localisation which uses dots / periods for 10^3
 * separation rather than decimal places). Another method of overcoming it
 * difficulties of sorting formatted numbers is to have the data to be sorted
 * upon separate from the visual data. This sorting function pair will use the
 * 'title' attribute of en empty span element (or anything else) to sort
 * numerically (for example `<span title="1000000"><span>1'000'000`).
 *
 * Note that the HTML5 `data-sort` attribute can be [used to supply sorting data
 * to DataTables](//datatables.net/manual/orthogonal-data) and is preferable to
 * using this method, which is therefore marked as deprecated.
 *
 *  @name Hidden title numeric sorting
 *  @summary Sort data numerically based on an attribute on an empty element.
 *  @deprecated
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'title-numeric', targets: 0 }
 *       ]
 *    } );
 */
DataTable.ext.type.order['title-numeric-pre'] = function (a) {
    var x = a.match(/title="*(-?[0-9\.]+)/)[1];
    return parseFloat(x);
};


return DataTable;
}));
