/*! © Ulises Gomez / Gravity Lending, SpryMedia Ltd - datatables.net/license */

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
 * @summary     ExcludeSearch
 * @description Add an input box that will remove matching items from the table
 * @version     1.0.1
 * @file        dataTables.excludeSearch.js
 * @author      Ulises Gomez / Gravity Lending (https://www.linkedin.com/in/ulises-gomez/)
 * @copyright   Copyright 2023 Ulises Gomez
 *
 * License      MIT - http://datatables.net/license/mit
 *
 * This feature adds a search input box to DataTables that will remove any rows that
 * match the user's input from the display. Think of it as the inverse of the default
 * search.
 *
 * An [example is available here](http://live.datatables.net/zohoyoqa/1/edit).
 *
 * @example
 *    $('#myTable').DataTable({
 *        excludeSearch: true
 *    });
 */
DataTable.Api.register('excludeSearch()', function (searchTerm) {
    this.iterator('table', function (context) {
        context.exclude_search = searchTerm;
    });
    return this;
});
DataTable.ext.search.push(function (context, search_data) {
    if (context.exclude_search === '' ||
        context.exclude_search === undefined ||
        context.exclude_search === null) {
        // No search term - all results shown
        return true;
    }
    let show_row = true;
    search_data.forEach(val => {
        if (val.toUpperCase().includes(context.exclude_search.toUpperCase())) {
            show_row = false;
        }
    });
    return show_row;
});
DataTable.ExcludeSearch = function (context) {
    let table = new DataTable.Api(context);
    // class mx-3 is from bootstrap v4
    let input_container = $('<div class="mx-3 dataTables_filter"><label>Exclude: </label><input type="text" /></div>');
    input_container.find('input').on('input', function () {
        table.excludeSearch($(this).val()).draw();
    });
    this.node = function () {
        return input_container;
    };
};
DataTable.ext.feature.push({
    fnInit: function (settings) {
        return new DataTable.ExcludeSearch(settings).node();
    },
    cFeature: 'X',
});


return DataTable;
}));
