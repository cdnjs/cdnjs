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
 * When using `-init deferRender` you might find that under a specific set of circumstances you
 * need the `-tag tr` element for a row which hasn't yet been drawn. This method can be used to
 * create the nodes for the rows which haven't yet been drawn.
 *
 * @name rows().generate()
 * @summary Create tr elements for rows which have not yet had their nodes created.
 * @author [Allan Jardine](http://datatables.net)
 * @requires DataTables 1.10+
 *
 * @returns {DataTable.Api} DataTables API instance
 *
 * @example
 *    // Create nodes for all rows
 *    table.rows().generate();
 */
DataTable.Api.register('rows().generate()', function () {
    return this.iterator('row', function (context, index) {
        context.oApi._fnCreateTr(context, index);
    });
});


return DataTable;
}));
