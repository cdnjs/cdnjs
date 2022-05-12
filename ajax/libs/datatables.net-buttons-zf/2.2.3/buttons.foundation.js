/*! Foundation integration for DataTables' Buttons
 * ©2016 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-zf', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net-zf')(root, $).$;
			}

			if ( ! $.fn.dataTable.Buttons ) {
				require('datatables.net-buttons')(root, $);
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


// F6 has different requirements for the dropdown button set. We can use the
// Foundation version found by DataTables in order to support both F5 and F6 in
// the same file, but not that this requires DataTables 1.10.11+ for F6 support.
var collection = DataTable.ext.foundationVersion === 6 ?
	{
		tag: 'div',
		className: 'dropdown-pane is-open button-group stacked'
	} :
	{
		tag: 'ul',
		className: 'f-dropdown open dropdown-pane is-open',
		closeButton: false,
		button: {
			tag: 'li',
			className: 'small',
			active: 'active',
			disabled: 'disabled'
		},
		buttonLiner: {
			tag: 'a'
		}
	};

$.extend( true, DataTable.Buttons.defaults, {
	dom: {
		container: {
			tag: 'div',
			className: 'dt-buttons button-group'
		},
		buttonContainer: {
			tag: null,
			className: ''
		},
		button: {
			tag: 'a',
			className: 'dt-button button small',
			active: 'secondary'
		},
		buttonLiner: {
			tag: null
		},
		collection: collection,
		splitWrapper: {
			tag: 'div',
			className: 'dt-btn-split-wrapper button-group',
			closeButton: false,
		},
		splitDropdown: {
			tag: 'button',
			text: '',
			className: 'button dt-btn-split-drop dropdown arrow-only',
			closeButton: false,
		},
		splitDropdownButton: {
			tag: 'button',
			className: 'dt-btn-split-drop-button button small',
			closeButton: false
		}
	}
} );


DataTable.ext.buttons.collection.className = 'dropdown';

$(document).on('buttons-popover.dt', function () {
	var notButton = false;
	$('.dtsp-panesContainer').each(function() {
		if(!$(this).is('button')){
			notButton = true;
		}
	});
	if(notButton){
		$('.dtsp-panesContainer').removeClass('button-group stacked')
	}
});

return DataTable.Buttons;
}));
