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
 * Sorts a column containing nepali numbers. Nepali numbers can easily be
 * mapped 1:1 to latin numbers - १ = 1, २ = 2, १२ = 12 and so on.
 *
 * <https://en.wikipedia.org/wiki/Numbers_in_Nepali_language>
 * <http://www.imnepal.com/nepali-numbers>
 * <http://stackoverflow.com/q/26856481/1407478>
 * <http://jsfiddle.net/ft7f16yt>
 *
 *  @name Nepali numbers
 *  @summary Sorts columns containing UTF8 nepali numbers
 *  @author David Konrad
 *
 *  @example
 *    $('#example').DataTable( {
 *       columnDefs: [
 *         { type: 'nepali-numbers', targets: 0 }
 *       ]
 *    } );
 */
function nepaliToLatin(nepali) {
    switch (nepali) {
        case '०':
            return 0;
            break;
        case '१':
            return 1;
            break;
        case '२':
            return 2;
            break;
        case '३':
            return 3;
            break;
        case '४':
            return 4;
            break;
        case '५':
            return 5;
            break;
        case '६':
            return 6;
            break;
        case '७':
            return 7;
            break;
        case '८':
            return 8;
            break;
        case '९':
            return 9;
            break;
        default:
            return 0;
            break;
    }
}
DataTable.ext.order['nepali-numbers-pre'] = function (a) {
    var latin = '', i = 0;
    for (i; i < a.length; i++) {
        latin += nepaliToLatin(a.charAt(i));
    }
    return parseInt(latin, 10);
};


return DataTable;
}));
