/*! © SpryMedia Ltd, caochenghua - datatables.net/license */

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
 * When dealing with time elapsed, it is common to append a post fix
 * such as d(day), h(hour), m(minute) or s(second) to a string in order to easily denote the brief duration
 * of the time span from now. This plug-in allows sorting to take these
 * indicates of size into account.
 *
 * A counterpart type detection plug-in is also available.
 *
 *  @name Time span
 *  @summary Sort abbreviated time span correctly (2d 3h, 2h 8m, 3m 8s, 30s, etc)
 *  @author [Allan Jardine](//datatables.net), caochenghua
 *
 *  @example
 *    $('#example').DataTable( {
 *       columnDefs: [
 *         { type: 'time-elapsed-dhms', targets: 0 }
 *       ]
 *    } );
 */
DataTable.ext.type.order['time-elapsed-dhms-pre'] = function (data) {
    var matches = data.match(/^(\d+(?:\.\d+)?)\s*([a-z]+)/i);
    var multipliers = {
        s: 1,
        m: 60,
        h: 3600,
        d: 86400,
    };
    if (matches) {
        var multiplier = multipliers[matches[2].toLowerCase()];
        return parseFloat(matches[1]) * multiplier;
    }
    return -1;
};


return DataTable;
}));
