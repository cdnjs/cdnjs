/*! © Fedonyuk Anton - datatables.net/license */

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
 *  @name anchor
 *  @summary Renders the column data as HTML anchor (`a` tag)
 *  @author [Fedonyuk Anton](http://ensostudio.ru)
 *  @requires DataTables 1.10+
 *
 *  @param {string} type The anchor type: 'link'(by default), 'phone' or 'email'
 *  @param {object|function} attributes The attributes of the anchor tag or the
 *       callback function returning the tag attributes, the callback syntax:
 *      `function (mixed data, object|array row, object meta): object`
 *  @param {string|null} innerText The inner text of the anchor tag or `null` to
 *      set text by column `data` (by default)
 *  @returns {string}
 *
 *  @example
 *    // Display `<a href="..." target="_blank">...</a>`
 *    $('#example').DataTable({
 *      columnDefs: [{
 *        targets: 1,
 *        render: $.fn.dataTable.render.anchor()
 *      }]
 *    });
 *
 *  @example
 *    // Display `<a href="mailto:..." class="link">...</a>`
 *    $('#example').DataTable({
 *      columnDefs: [{
 *        targets: 2,
 *        render: $.fn.dataTable.render.anchor('email', {'class': 'link'})
 *      }]
 *    });
 */
DataTable.render.anchor = function (type = 'link', attributes = {}, innerText = null) {
    return function (data, type, row, meta = {}) {
        // restriction only for table display rendering
        if (type !== 'display') {
            return data;
        }
        if (innerText === null) {
            innerText = data;
        }
        var attrs = typeof attributes === 'function'
            ? attributes(data, row, meta)
            : attributes;
        if (!attrs.href) {
            switch (type) {
                case 'mail':
                    attrs.href = 'mailto:' + data;
                    break;
                case 'phone':
                    attrs.href = 'tel:' + data.replace(/[^+\d]+/g, '');
                    break;
                case 'link':
                default:
                    try {
                        attrs.href = new URL(data);
                    }
                    catch (e) {
                        attrs.href = data;
                    }
            }
        }
        var anchorEl = jQuery('<a/>');
        return anchorEl.attr(attrs).text(innerText || '')[0].outerText;
    };
};


return DataTable;
}));
