/*! Bootstrap integration for DataTables' Buttons
 * © SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-bs', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net-bs')(root, $);
			}

			if ( ! $.fn.dataTable.Buttons ) {
				require('datatables.net-buttons')(root, $);
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



$.extend(true, DataTable.Buttons.defaults, {
	dom: {
		container: {
			className: 'dt-buttons btn-group flex-wrap'
		},
		button: {
			className: 'btn btn-default',
			active: 'active'
		},
		collection: {
			action: {
				dropHtml: '<span class="caret"></span>'
			},
			container: {
				tag: 'div',
				className: 'dt-button-collection',
				content: {
					tag: 'ul',
					className: 'dropdown-menu'
				}
			},
			closeButton: false,
			button: {
				tag: 'li',
				className: 'dt-button',
				active: 'dt-button-active-a',
				disabled: 'disabled',
				liner: {
					tag: 'a'
				},
				spacer: {
					className: 'divider',
					tag: 'li'
				}
			}
		},
		split: {
			action: {
				tag: 'a',
				className: 'btn btn-default dt-button-split-drop-button',
				closeButton: false
			},
			dropdown: {
				tag: 'button',
				dropHtml: '<span class="caret"></span>',
				className:
					'btn btn-default dt-button-split-drop dropdown-toggle dropdown-toggle-split',
				closeButton: false,
				align: 'split-left',
				splitAlignClass: 'dt-button-split-left'
			},
			wrapper: {
				tag: 'div',
				className: 'dt-button-split btn-group',
				closeButton: false
			}
		}
	}
});


return DataTable;
}));
