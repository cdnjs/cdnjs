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
 * Sorts a column containing chapter numbers. This can be most useful when
 * using DataTables for a book or book reference style application. By
 * default, five sections are supported (a.b.c.d.e) with each being upto
 * four-digits long. Those defaults are controlled by constMaxSections and
 * constMaxSectionDigits respectively, and can be easily changed
 *
 *  @name chapter
 *  @summary Sort book chapters numerically
 *  @author Colin Marks
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'chapter', targets: 0 }
 *       ]
 *    } );
 */
DataTable.ext.type.order['chapter-pre'] = function (a) {
    var constMaxSections = 5;
    var constMaxSectionDigits = 4;
    var filler;
    var result = '';
    var sections = a.split('.');
    for (var i = 0; i < constMaxSections; i++) {
        filler =
            i < sections.length
                ? constMaxSectionDigits - sections[i].length
                : constMaxSectionDigits;
        result += filler === 0 ? '' : Array(filler + 1).join('0');
        result += i < sections.length ? sections[i] : '';
    }
    return result;
};


return DataTable;
}));
