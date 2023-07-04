/*! © SpryMedia Ltd, - datatables.net/license */

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
 * This plug-in will add automatic negative currency detection for currency columns to
 * DataTables. Note that only $, c, £ and € symbols are detected with this code,
 * This plugin has also been updated to automatically detect negative values either those
 * using '-' as well as numbers using '()' to specify negatives.
 * This plugin also includes automatic type detection
 *
 *  @name brackets-negative
 *  @summary Detect data of currency type with a leading currency symbol as well at detect two types of negative number formatting
 *  @author Tom Buckle
 */
// Change this list to the valid characters you want to be detected
var validChars = '$£€c' + '0123456789' + ".-,()'";
// Init the regex just once for speed - it is "closure locked"
var str = DataTable.util.escapeRegex(validChars), re = new RegExp('[^' + str + ']');
DataTable.ext.type.detect.unshift(function (data) {
    if (typeof data !== 'string' || re.test(data)) {
        return null;
    }
    return 'currency';
});
DataTable.ext.type.order['currency-pre'] = function (data) {
    if (data === '') {
        return 0;
    }
    //Check if its in the proper format
    if (data.match(/[\()]/g)) {
        if (data.match(/[\-]/g) !== true) {
            //It matched - strip out parentheses & any characters we dont want and append - at front
            data = '-' + data.replace(/[\$£€c\(\),]/g, '');
        }
        else {
            //Already has a '-' so just strip out non-numeric charactors exluding '-'
            data = data.replace(/[^\d\-\.]/g, '');
        }
    }
    else {
        data = data.replace(/[\$£€\,]/g, '');
    }
    return parseFloat(data);
};


return DataTable;
}));
