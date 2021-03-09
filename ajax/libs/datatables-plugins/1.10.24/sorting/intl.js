/**
 * This sorting type will replace DataTables' default string sort with one that
 * will use a locale aware collator. This is supported by IE11, Edge, Chrome,
 * Firefox and Safari 10+. Any browser that does not support the Intl will
 * simply fall back to UTF8 string sorting.
 *
 * This method simply needs to be called prior to the DataTables' initialisation
 * to replace the default string sort with locale aware sorting. The method
 * optionally takes two arguments:
 *
 * 1. [Optional] Locale or array of locales
 * 2. [Optional] Collator options
 *
 * For the supported options please see the
 * [MDN Intl documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator).
 *
 * @name intl
 * @summary Sort string data using the Intl Javascript API
 * @author [Allan Jardine](//datatables.net)
 * @depends DataTables 1.10+
 *
 * @example
 *    // Host's current locale
 *    $.fn.dataTable.ext.order.intl();
 *
 * @example
 *    // Explicit locale
 *    $.fn.dataTable.ext.order.intl('de-u-co-phonebk');
 *
 * @example
 *    // Locale with configuration options
 *    $.fn.dataTable.ext.order.intl('fr', {
 *      sensitivity: 'base'
 *    } );
 */


// UMD
(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ?
					require('jquery') :
					require('jquery')( root );
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}
(function( $, window, document ) {


$.fn.dataTable.ext.order.intl = function ( locales, options ) {
	if ( window.Intl ) {
		var collator = new Intl.Collator( locales, options );
		var types = $.fn.dataTable.ext.type;

		delete types.order['string-pre'];
		types.order['string-asc'] = collator.compare;
		types.order['string-desc'] = function ( a, b ) {
			return collator.compare( a, b ) * -1;
		};
	}
};


}));
