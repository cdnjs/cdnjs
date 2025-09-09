/*! Fomantic UI styling wrapper for ColumnControl
 * © SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-se', 'datatables.net-columncontrol'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net-se')(root, $);
			}

			if ( ! $.fn.dataTable.ColumnControl ) {
				require('datatables.net-columncontrol')(root, $);
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



DataTable.ColumnControl.content.dropdown.classes.container = [
	'dtcc-dropdown',
	'menu',
	'transition',
	'visible'
];

DataTable.ColumnControl.CheckList.classes.container = ['dtcc-list', 'ui', 'form'];
DataTable.ColumnControl.CheckList.classes.input = ['dtcc-list-search', 'ui', 'input'];
DataTable.ColumnControl.SearchInput.classes.container = [
	'dtcc-content',
	'dtcc-search',
	'ui',
	'form'
];
DataTable.ColumnControl.SearchInput.classes.input = ['ui', 'input'];
DataTable.ColumnControl.SearchInput.classes.select = ['ui', 'dropdown'];


return DataTable;
}));
