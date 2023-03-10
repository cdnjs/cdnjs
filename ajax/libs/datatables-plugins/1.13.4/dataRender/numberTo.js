/*! © SpryMedia Ltd, Alireza Mohammadi Doost - datatables.net/license */

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
 * Convert numbers to farsi, english, arabic.
 * تبدیل عداد به فارسی, انگلیسی, عربی
 *
 *  @name convertTo
 *  @summary convert numbers to farsi, english, arabic.
 *  @author Alireza Mohammadi Doost
 *
 *  @example
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 2,
 *        render: DataTable.render.numberTo('fa')
 *      } ]
 *    } );
 */
DataTable.render.numberTo = function (to = 'fa') {
    let result = null;
    const faNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const enNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const arNumbers = ['۰', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return function (d, type, row) {
        if (type !== 'display') {
            return d;
        }
        if (!d && to === 'fa') {
            return 'مقدار ورودی صحیح نمی‌باشد.';
        }
        else if (!d) {
            return 'numbers is empty.';
        }
        switch (to) {
            case 'fa':
                result = d.toString().replace(/\d/g, x => faNumbers[x]);
                break;
            case 'en':
                result = d.toString().replace(/\d/g, x => enNumbers[x]);
                break;
            case 'ar':
                result = d.toString().replace(/\d/g, x => arNumbers[x]);
                break;
        }
        return result;
    };
};


return DataTable;
}));
