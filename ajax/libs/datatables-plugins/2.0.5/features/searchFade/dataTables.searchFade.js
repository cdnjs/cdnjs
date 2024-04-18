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
 * @summary     SearchFade
 * @description Search and Fade unmatching rows in a DataTables
 * @version     1.0.0
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This feature will fade out rows which don't match from the input
 *
 * @example
 *   $('#myTable').DataTable( {
 *     layout: {
 *       topStart: 'searchFade;
 *     }
 *   } );
 */
DataTable.Api.register('searchFade()', function () {
    return this;
});
DataTable.Api.register('searchFade().node()', function () {
    return this.settings()[0].searchFadeNode;
});
function _draw(table, searchFade) {
    searchFade.empty();
    searchFade.append('Search: ');
    $('<input type="text" class="searchFadeInput' +
        table.settings()[0].sTableId +
        '">').appendTo(searchFade);
}
DataTable.SearchFade = function (settings) {
    var table = new DataTable.Api(settings);
    var searchFade = $('<div class="searchFade"/>');
    table.settings()[0].searchFadeNode = searchFade;
    _draw(table, searchFade);
    // Trigger a search
    searchFade.on('keyup redraw', 'input', function () {
        table.rows(':visible').every(function (rowIdx, tableLoop, rowLoop) {
            var present = true;
            var val = $('.searchFadeInput' + table.settings()[0].sTableId).val();
            if (val.length) {
                present = table
                    .row(rowIdx)
                    .data()
                    .some(function (v) {
                    return v.match(new RegExp(val, 'i')) != null;
                });
            }
            $(table.row(rowIdx).node()).toggleClass('notMatched', !present);
        });
    });
    table.on('draw', function () {
        $('input', searchFade).trigger('redraw');
    });
    // API method to get the searchFade container node
    this.node = function () {
        return searchFade;
    };
};
DataTable.ext.feature.push({
    fnInit: function (settings) {
        var search = new DataTable.SearchFade(settings);
        return search.node();
    },
    cFeature: 'F',
});
DataTable.feature.register('searchFade', function (settings) {
    var search = new DataTable.SearchFade(settings);
    return search.node();
});
$(document).on('init.dt', function (e, settings) {
    if (e.namespace !== 'dt') {
        return;
    }
    if (settings.oInit.searchFade || DataTable.defaults.searchFade) {
        DataTable.SearchFade(settings);
    }
    return;
});


return DataTable;
}));
