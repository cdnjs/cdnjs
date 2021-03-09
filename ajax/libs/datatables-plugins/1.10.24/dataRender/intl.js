/**
 * Rendering methods using the Javascript Intl API. This is supported by IE11,
 * Edge, Chrome, Firefox and Safari 10+. Any browser that does not support the
 * Intl will simply show the unformatted data to the end user.
 *
 * The great advantage of using these methods is that your table's data will
 * automatically be shown to your end user formatted for their locale. For
 * example a date might be formatted as "m/d/yyyy" in the US, while in France
 * it would show as "dd/mm/yyyy".
 *
 * Two rendering methods are available:
 *
 * * `intlNumber` which will format numbers.
 * * `intlDateTime` which formats date times.
 *
 * Both optionally takes two arguments:
 *
 * 1. [Optional] Locale or array of locales
 * 2. [Optional] Formatter options
 *
 * For the supported options please see the MDN documentation for
 * [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) and
 * [NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).
 *
 *  @name intl
 *  @summary Use the Intl Javascript API to render dates and numbers
 *  @author [Allan Jardine](http://datatables.net)
 *  @requires DataTables 1.10+
 *
 *  @example
 *    // Number renderer - using the `columns.render` option:
 *    render: $.fn.dataTable.render.intlNumber()
 *
 *  @example
 *    // Number renderer - with specified locale:
 *    render: $.fn.dataTable.render.intlNumber('de')
 *
 *  @example
 *    // Number renderer - with specified locale and options:
 *    render: $.fn.dataTable.render.intlNumber('de', {
 *      style: 'currency',
 *      currency: 'USD'
 *    } )
 *
 * 
 *  @example
 *    // Date time renderer - using the `columns.render` option:
 *    render: $.fn.dataTable.render.intlDateTime()
 *
 *  @example
 *    // Date time renderer - with specified locale:
 *    render: $.fn.dataTable.render.intlDateTime('en-US')
 *
 *  @example
 *    // Date time renderer - with specified locale and options:
 *    render: $.fn.dataTable.render.intlDateTime('de', {
 *      weekday: 'long'
 *    } )
 *  
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


$.fn.dataTable.render.intlNumber = function ( locale, options ) {
	if ( window.Intl ) {
		var formatter = new Intl.NumberFormat( locale, options );

		return function ( d, type ) {
			if ( type === 'display' ) {
				return formatter.format( d );
			}
			else if ( type === 'filter' ) {
				return d +' '+ formatter.format( d );
			}
			return d;
		};
	}
	else {
		return function ( d ) {
			return d;
		};
	}
};


$.fn.dataTable.render.intlDateTime = function ( locale, options ) {
	if ( window.Intl ) {
		var formatter = new Intl.DateTimeFormat( locale, options );

		return function ( data, type ) {
			var date;

			if ( typeof data === 'string' ) {
				date = Date.parse( data );
			}
			else if ( data instanceof Date ) {
				date = data;
			}

			if ( isNaN( date ) || type === 'type' || type === 'sort' ) {
				return data;
			}

			return formatter.format( date );
		};
	}
	else {
		return function ( d ) {
			return d;
		};
	}
};


}));
