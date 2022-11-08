/*! Bootstrap integration for DataTables' Buttons
 * ©2016 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-se', 'datatables.net-buttons'], function ( $ ) {
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
				require('datatables.net-se')(root, $);
			}

			if ( ! $.fn.dataTable ) {
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



$.extend( true, DataTable.Buttons.defaults, {
	dom: {
		container: {
			className: 'dt-buttons ui basic buttons'
		},
		button: {
			tag: 'button',
			className: 'dt-button ui button',
			spacerClass: 'dt-button ui button'
		},
		collection: {
			tag: 'div',
			className: 'ui basic vertical buttons',
			closeButton: false
		},
		splitWrapper: {
			tag: 'div',
			className: 'dt-btn-split-wrapper buttons',
			closeButton: false
		},
		splitDropdown: {
			tag: 'button',
			text: '&#x25BC;',
			className: 'ui floating button dt-btn-split-drop dropdown icon',
			closeButton: false
		},
		splitDropdownButton: {
			tag: 'button',
			className: 'dt-btn-split-drop-button ui button',
			closeButton: false
		}
	}
} );

$(document).on('buttons-popover.dt', function () {
	var notButton = false;
	$('.dtsp-panesContainer').each(function() {
		if(!$(this).is('button')){
			notButton = true;
		}
	});
	if(notButton){
		$('.dtsp-panesContainer').removeClass('vertical buttons')
	}
});


return DataTable;
}));
