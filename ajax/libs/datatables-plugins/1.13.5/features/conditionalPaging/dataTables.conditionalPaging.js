/*! © SpryMedia Ltd, Matthew Hasbach - datatables.net/license */

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
 * @summary     ConditionalPaging
 * @description Hide paging controls when the amount of pages is <= 1
 * @version     1.0.0
 * @author      Matthew Hasbach (https://github.com/mjhasbach)
 * @copyright   Copyright 2015 Matthew Hasbach
 *
 * License      MIT - http://datatables.net/license/mit
 *
 * This feature plugin for DataTables hides paging controls when the amount
 * of pages is <= 1. The controls can either appear / disappear or fade in / out
 *
 * @example
 *    $('#myTable').DataTable({
 *        conditionalPaging: true
 *    });
 *
 * @example
 *    $('#myTable').DataTable({
 *        conditionalPaging: {
 *            style: 'fade',
 *            speed: 500 // optional
 *        }
 *    });
 */
$(document).on('init.dt', function (e, dtSettings) {
    if (e.namespace !== 'dt') {
        return;
    }
    var options = dtSettings.oInit.conditionalPaging ||
        DataTable.defaults.conditionalPaging;
    if ($.isPlainObject(options) || options === true) {
        var config = $.isPlainObject(options) ? options : {}, api = new DataTable.Api(dtSettings), speed = 500, conditionalPaging = function (e) {
            var $paging = $(api.table().container()).find('div.dataTables_paginate'), pages = api.page.info().pages;
            if (e instanceof $.Event) {
                if (pages <= 1) {
                    if (config.style === 'fade') {
                        $paging.stop().fadeTo(speed, 0);
                    }
                    else {
                        $paging.css('visibility', 'hidden');
                    }
                }
                else {
                    if (config.style === 'fade') {
                        $paging.stop().fadeTo(speed, 1);
                    }
                    else {
                        $paging.css('visibility', '');
                    }
                }
            }
            else if (pages <= 1) {
                if (config.style === 'fade') {
                    $paging.css('opacity', 0);
                }
                else {
                    $paging.css('visibility', 'hidden');
                }
            }
        };
        if (config.speed !== undefined) {
            speed = config.speed;
        }
        conditionalPaging(null);
        api.on('draw.dt', conditionalPaging);
    }
});


return DataTable;
}));
