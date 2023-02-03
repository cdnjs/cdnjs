/*! Bootstrap integration for DataTables' SearchPanes
 * © SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-bs', 'datatables.net-searchpanes'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				// CommonJS environments without a window global must pass a
				// root. This will give an error otherwise
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
					require('jquery') :
					require('jquery')( root );
			}

			if ( ! $.fn.dataTable ) {
				require('datatables.net-bs')(root, $);
			}

			if ( ! $.fn.dataTable.SearchPanes ) {
				require('datatables.net-searchpanes')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


$.extend(true, DataTable.SearchPane.classes, {
    buttonGroup: 'btn-group',
    disabledButton: 'disabled',
    narrow: 'col narrow',
    narrowSub: 'row',
    pane: {
        container: 'table'
    },
    paneButton: 'btn btn-light',
    pill: 'badge badge-pill badge-light pill',
    search: 'col-sm form-control search',
    searchCont: 'input-group dtsp-searchCont',
    searchLabelCont: 'input-group-btn',
    subRow1: 'dtsp-subRow1 text-right',
    subRow2: 'dtsp-subRow2 text-right',
    table: 'table table-condensed'
});
$.extend(true, DataTable.SearchPanes.classes, {
    clearAll: 'dtsp-clearAll btn btn-light',
    collapseAll: 'dtsp-collapseAll btn btn-light',
    disabledButton: 'disabled',
    showAll: 'dtsp-showAll btn btn-light'
});


return DataTable;
}));
