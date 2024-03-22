/*! DataTables jQuery UI integration
 * ©2011-2014 SpryMedia Ltd - datatables.net/license
 */

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
 * DataTables integration for jQuery UI. This requires jQuery UI and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using jQuery UI. See https://datatables.net/manual/styling/jqueryui
 * for further information.
 */

$.extend( true, DataTable.ext.classes, {
	container: 'dt-container dt-jqueryui',
	paging: {
		active: 'ui-state-disabled',
		button: 'fg-button ui-button ui-state-default',
		container: 'dt-paging fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi',
		disabled: 'ui-state-disabled'
	},
	thead: {
		cell: 'ui-state-default'
	},
	tfoot: {
		cell: 'ui-state-default'
	}
} );


DataTable.ext.renderer.layout.jqueryui = function ( settings, container, items ) {
	var rowHasDt = false;
	var row = $( '<div/>', {
			"class": 'dt-layout-row ui-helper-clearfix'
		} )
		.appendTo( container );

	$.each( items, function (key, val) {
		var cell = $( '<div/>', {
				id: val.id || null,
				"class": 'dt-layout-cell dt-'+key+' '+(val.className || '')
			} )
			.append( val.contents )
			.appendTo( row );

		if ($(val.contents).hasClass('dataTable')) {
			rowHasDt = true;
			cell.addClass('table');
		}
	} );
	
	if (! rowHasDt) {
		row.addClass('fg-toolbar ui-toolbar ui-widget-header');
	}
};


return DataTable;
}));
