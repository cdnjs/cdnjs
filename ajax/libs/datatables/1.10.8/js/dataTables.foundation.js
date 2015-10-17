/*! DataTables Foundation integration
 * ©2011-2014 SpryMedia Ltd - datatables.net/license
 */

/**
 * DataTables integration for Foundation. This requires Foundation 5 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Foundation. See http://datatables.net/manual/styling/foundation
 * for further information.
 */
(function(window, document, undefined){

var factory = function( $, DataTable ) {
"use strict";


$.extend( DataTable.ext.classes, {
	sWrapper: "dataTables_wrapper dt-foundation"
} );


/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	dom:
		"<'row'<'small-6 columns'l><'small-6 columns'f>r>"+
		"t"+
		"<'row'<'small-6 columns'i><'small-6 columns'p>>",
	renderer: 'foundation'
} );


/* Page button renderer */
DataTable.ext.renderer.pageButton.foundation = function ( settings, host, idx, buttons, page, pages ) {
	var api = new DataTable.Api( settings );
	var classes = settings.oClasses;
	var lang = settings.oLanguage.oPaginate;
	var btnDisplay, btnClass;

	var attach = function( container, buttons ) {
		var i, ien, node, button;
		var clickHandler = function ( e ) {
			e.preventDefault();
			if ( e.data.action !== 'ellipsis' ) {
				api.page( e.data.action ).draw( 'page' );
			}
		};

		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( $.isArray( button ) ) {
				attach( container, button );
			}
			else {
				btnDisplay = '';
				btnClass = '';

				switch ( button ) {
					case 'ellipsis':
						btnDisplay = '&hellip;';
						btnClass = 'unavailable';
						break;

					case 'first':
						btnDisplay = lang.sFirst;
						btnClass = button + (page > 0 ?
							'' : ' unavailable');
						break;

					case 'previous':
						btnDisplay = lang.sPrevious;
						btnClass = button + (page > 0 ?
							'' : ' unavailable');
						break;

					case 'next':
						btnDisplay = lang.sNext;
						btnClass = button + (page < pages-1 ?
							'' : ' unavailable');
						break;

					case 'last':
						btnDisplay = lang.sLast;
						btnClass = button + (page < pages-1 ?
							'' : ' unavailable');
						break;

					default:
						btnDisplay = button + 1;
						btnClass = page === button ?
							'current' : '';
						break;
				}

				if ( btnDisplay ) {
					node = $('<li>', {
							'class': classes.sPageButton+' '+btnClass,
							'aria-controls': settings.sTableId,
							'tabindex': settings.iTabIndex,
							'id': idx === 0 && typeof button === 'string' ?
								settings.sTableId +'_'+ button :
								null
						} )
						.append( $('<a>', {
								'href': '#'
							} )
							.html( btnDisplay )
						)
						.appendTo( container );

					settings.oApi._fnBindAction(
						node, {action: button}, clickHandler
					);
				}
			}
		}
	};

	attach(
		$(host).empty().html('<ul class="pagination"/>').children('ul'),
		buttons
	);
};


}; // /factory


// Define as an AMD module if possible
if ( typeof define === 'function' && define.amd ) {
	define( ['jquery', 'datatables'], factory );
}
else if ( typeof exports === 'object' ) {
    // Node/CommonJS
    factory( require('jquery'), require('datatables') );
}
else if ( jQuery ) {
	// Otherwise simply initialise as normal, stopping multiple evaluation
	factory( jQuery, jQuery.fn.dataTable );
}


})(window, document);

