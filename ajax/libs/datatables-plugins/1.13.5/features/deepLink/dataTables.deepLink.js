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
 * @summary     LengthLinks
 * @description Deep linking options parsing support for DataTables
 * @version     1.1.0
 * @file        dataTables.deepLink.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @copyright   Copyright SpryMedia Ltd.
 *
 * License      MIT - http://datatables.net/license/mit
 *
 * This feature plug-in for DataTables provides a function which will
 * take DataTables options from the browser's URL search string and
 * return an object that can be used to construct a DataTable. This
 * allows deep linking to be easily implemented with DataTables - for
 * example a URL might be `myTable?displayStart=10` which will
 * automatically cause the second page of the DataTable to be displayed.
 *
 * This plug-in works on a whitelist basis - you must specify which
 * [initialisation parameters](//datatables.net/reference/option) you
 * want the URL search string to specify. Any parameter given in the
 * URL which is not listed will be ignored (e.g. you are unlikely to
 * want to let the URL search string specify the `ajax` option).
 *
 * This specification is done by passing an array of property names
 * to the `DataTable.ext.deepLink` function. If you do which to
 * allow _every_ parameter (I wouldn't recommend it) you can use `all`
 * instead of an array.
 *
 * @example
 *   // Allow a display start point and search string to be specified
 *   $('#myTable').DataTable(
 *     DataTable.ext.deepLink( [ 'displayStart', 'search.search' ] )
 *   );
 *
 * @example
 *   // As above, but with a default search
 *   var options = DataTable.ext.deepLink(['displayStart', 'search.search']);
 *
 *   $('#myTable').DataTable(
 *     $.extend( true, {
 *       search: { search: 'Initial search value' }
 *     }, options )
 *   );
 */
DataTable.ext.deepLink = function (whitelist) {
    var search = location.search.replace(/^\?/, '').split('&');
    var out = {};
    for (var i = 0, ien = search.length; i < ien; i++) {
        var pair = search[i].split('=');
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        // "Casting"
        if (value === 'true') {
            value = true;
        }
        else if (value === 'false') {
            value = false;
        }
        else if (!value.match(/[^\d]/) && key !== 'search.search') {
            // don't convert if searching or it'll break the search
            value = value * 1;
        }
        else if (value.indexOf('{') === 0 || value.indexOf('[') === 0) {
            // Try to JSON parse for arrays and obejcts
            try {
                value = $.parseJSON(value);
            }
            catch (e) { }
        }
        if (whitelist === 'all' || $.inArray(key, whitelist) !== -1) {
            var setter = DataTable.util.set(key);
            setter(out, value, {});
        }
    }
    return out;
};


return DataTable;
}));
