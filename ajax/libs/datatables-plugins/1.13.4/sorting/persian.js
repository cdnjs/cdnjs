/*! © SpryMedia Ltd, Afshin Mehrabani - datatables.net/license */

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
 * Sorting in Javascript can be difficult to get right with non-Roman
 * characters - for which special consideration must be made. This plug-in
 * performs correct sorting on Persian characters.
 *
 *  @name Persian
 *  @summary Sort Persian strings alphabetically
 *  @author [Afshin Mehrabani](http://www.afshinm.name/)
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'pstring', targets: 0 }
 *       ]
 *    } );
 */
var persianSort = [
    'آ',
    'ا',
    'ب',
    'پ',
    'ت',
    'ث',
    'ج',
    'چ',
    'ح',
    'خ',
    'د',
    'ذ',
    'ر',
    'ز',
    'ژ',
    'س',
    'ش',
    'ص',
    'ط',
    'ظ',
    'ع',
    'غ',
    'ف',
    'ق',
    'ک',
    'گ',
    'ل',
    'م',
    'ن',
    'و',
    'ه',
    'ی',
    'ي',
];
function GetUniCode(source) {
    source = source.trim();
    var result = '';
    var i, index;
    for (i = 0; i < source.length; i++) {
        index = persianSort.indexOf(source.charAt(i));
        if (index < 0) {
            index = source.charCodeAt(i);
        }
        if (index < 10) {
            index = '0' + index;
        }
        result += '00' + index;
    }
    return 'a' + result;
}
DataTable.ext.order['pstring-pre'] = function (a, b) {
    return GetUniCode(a.toLowerCase());
};


return DataTable;
}));
