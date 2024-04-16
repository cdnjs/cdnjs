/*! Foundation integration for DataTables' Buttons
 * © SpryMedia Ltd - datatables.net/license
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
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net-zf')(root, $);
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
			tag: 'div',
			className: 'dt-buttons button-group'
		},
		button: {
			tag: 'a',
			className: 'dt-button button small',
			active: 'secondary active'
		},
		collection: {
			action: {
				dropHtml: ''
			},
			button: {
				tag: 'li',
				className: 'dt-button',
				active: 'dt-button-active-a',
				liner: {
					tag: 'a'
				}
			},
			container: {
				tag: 'div',
				className: 'dt-button-collection',
				content: {
					tag: 'ul',
					className: 'dropdown menu is-dropdown-submenu'
				}
			}
		},
		split: {
			action: {
				tag: 'button',
				className: 'button small'
			},
			dropdown: {
				tag: 'button',
				className: 'button dropdown arrow-only',
				dropHtml: ''
			},
			wrapper: {
				tag: 'div',
				className: 'button-group dt-button-split'
			}
		}
	}
});

DataTable.ext.buttons.collection.className = 'dropdown';

$(document).on('buttons-popover.dt', function () {
	var notButton = false;
	$('.dtsp-panesContainer').each(function () {
		if (!$(this).is('button')) {
			notButton = true;
		}
	});
	if (notButton) {
		$('.dtsp-panesContainer').removeClass('button-group stacked');
	}
});


return DataTable;
}));
