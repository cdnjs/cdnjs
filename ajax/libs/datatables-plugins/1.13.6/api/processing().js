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
 * Externally trigger the display of DataTables' "processing" indicator.
 *
 * Please note that of DataTables 2.0.0 this functionality is now built into
 * DataTables core and this plug-in is no longer required.
 *
 * @name processing()
 * @summary Show / hide the processing indicator via the API
 * @author [Allan Jardine](http://datatables.net)
 * @requires DataTables 1.10+
 * @param {boolean} show `true` to show the processing indicator, `false` to
 *  hide it.
 *
 * @returns {DataTables.Api} Unmodified API instance
 *
 * @example
 *    // Show a processing indicator for two seconds on initialisation
 *    var table = $('#example').DataTable( {
 *      processing: true
 *    } );
 *
 *    table.processing( true );
 *
 *    setTimeout( function () {
 *      table.processing( false );
 *    }, 2000 );
 */
DataTable.Api.register('processing()', function (show) {
    return this.iterator('table', function (ctx) {
        ctx.oApi._fnProcessingDisplay(ctx, show);
    });
});


return DataTable;
}));
