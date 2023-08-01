/*! © SpryMedia Ltd, Garrett Hyder - datatables.net/license */

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
 * @summary     ConditionalPageLength
 * @description Hide the page length control when the amount of pages is <= 1
 * @version     1.0.0
 * @author      Garrett Hyder (https://github.com/garretthyder)
 * @copyright   Copyright 2020 Garrett Hyder
 *
 * License      MIT - http://datatables.net/license/mit
 *
 * This feature plugin for DataTables hides the page length control when the amount
 * of pages is <= 1. The control can either appear / disappear or fade in / out.
 *
 * Based off conditionalPaging by Matthew Hasbach (https://github.com/mjhasbach)
 * Reference: https://github.com/DataTables/Plugins/blob/master/features/conditionalPaging/dataTables.conditionalPaging.js
 *
 * @example
 *    $('#myTable').DataTable({
 *        conditionalPageLength: true
 *    });
 *
 * @example
 *    $('#myTable').DataTable({
 *        conditionalPageLength: {
 *            style: 'fade',
 *            speed: 500 // optional
 *        }
 *    });
 *
 * Conditionally hide the Page Length options that are less than the current result size.
 * @example
 *    $('#myTable').DataTable({
 *        conditionalPageLength: {
 *            conditionalOptions: true
 *        }
 *    });
 */
$(document).on('init.dt', function (e, dtSettings) {
    if (e.namespace !== 'dt') {
        return;
    }
    var options = dtSettings.oInit.conditionalPageLength ||
        DataTable.defaults.conditionalPageLength, lengthMenu = dtSettings.aLengthMenu || DataTable.defaults.lengthMenu, lengthMenuValues = Array.isArray(lengthMenu[0])
        ? lengthMenu[0]
        : lengthMenu;
    lengthMenuValues = lengthMenuValues.filter(function (n) {
        return n > 0;
    });
    var smallestLength = Math.min.apply(Math, lengthMenuValues);
    if ($.isPlainObject(options) || options === true) {
        var config = $.isPlainObject(options) ? options : {}, api = new DataTable.Api(dtSettings), speed = 500, conditionalPageLength = function (e) {
            var $paging = $(api.table().container()).find('div.dataTables_length'), pages = api.page.info().pages, size = api.rows({ search: 'applied' }).count();
            if (e instanceof $.Event) {
                if (pages <= 1 && size <= smallestLength) {
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
            else if (pages <= 1 && size <= smallestLength) {
                if (config.style === 'fade') {
                    $paging.css('opacity', 0);
                }
                else {
                    $paging.css('visibility', 'hidden');
                }
            }
            if (config.conditionalOptions) {
                $paging.find('select option').each(function (index) {
                    if (parseInt($(this).attr('value'), 10) > size) {
                        $(this).hide();
                    }
                    else {
                        $(this).show();
                    }
                });
            }
        };
        if (config.speed !== undefined) {
            speed = config.speed;
        }
        conditionalPageLength(null);
        api.on('draw.dt', conditionalPageLength);
    }
});


return DataTable;
}));
