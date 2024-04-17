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
}(function( $, window, document ) {
'use strict';
var DataTable = $.fn.dataTable;


/**
 * This plug-in provides locale aware sorting for Czech.
 *
 *  @name Czech
 *  @summary Sort locale aware sorting for Czech.
 *  @author
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'czech', targets: 0 }
 *       ]
 *    } );
 */
DataTable.ext.type.order['czech-pre'] = function (a) {
    var special_letters = {
        A: 'Aa',
        a: 'aa',
        Á: 'Ab',
        á: 'ab',
        C: 'Ca',
        c: 'ca',
        Č: 'Cb',
        č: 'cb',
        D: 'Da',
        d: 'da',
        Ď: 'db',
        ď: 'db',
        E: 'Ea',
        e: 'ea',
        É: 'eb',
        é: 'eb',
        Ě: 'Ec',
        ě: 'ec',
        I: 'Ia',
        i: 'ia',
        Í: 'Ib',
        í: 'ib',
        N: 'Na',
        n: 'na',
        Ň: 'Nb',
        ň: 'nb',
        O: 'Oa',
        o: 'oa',
        Ó: 'Ob',
        ó: 'ob',
        R: 'Ra',
        r: 'ra',
        Ř: 'Rb',
        ř: 'rb',
        S: 'Sa',
        s: 'sa',
        Š: 'Sb',
        š: 'sb',
        T: 'Ta',
        t: 'ta',
        Ť: 'Tb',
        ť: 'tb',
        U: 'Ua',
        u: 'ua',
        Ú: 'Ub',
        ú: 'ub',
        Ů: 'Uc',
        ů: 'uc',
        Y: 'Ya',
        y: 'ya',
        Ý: 'Yb',
        ý: 'yb',
        Z: 'Za',
        z: 'za',
        Ž: 'Zb',
        ž: 'zb',
    };
    for (var val in special_letters) {
        a = a.split(val).join(special_letters[val]).toLowerCase();
    }
    return a;
};


return DataTable;
}));
