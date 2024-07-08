/*! DataTables Foundation integration
 * ©2011-2014 SpryMedia Ltd - datatables.net/license
 */

/*
 * IMPORTANT
 * This file has now been deprecated and replaced by support for the styling
 * integration with Foundation in the DataTables core software and its
 * accompanying extensions. Please refer to the styling documentation for
 * details:
 * 	https://datatables.net/manual/styling/
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
				api.page( e.data.action ).draw( false );
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


/*
 * TableTools Foundation compatibility
 * Required TableTools 2.1+
 */
if ( DataTable.TableTools ) {
	// Set the classes that TableTools uses to something suitable for Foundation
	$.extend( true, DataTable.TableTools.classes, {
		"container": "DTTT button-group",
		"buttons": {
			"normal": "button small",
			"disabled": "disabled"
		},
		"collection": {
			"container": "DTTT_dropdown dropdown-menu",
			"buttons": {
				"normal": "",
				"disabled": "disabled"
			}
		},
		"select": {
			"row": "active"
		}
	} );

	// Have the collection use a bootstrap compatible dropdown
	$.extend( true, DataTable.TableTools.DEFAULTS.oTags, {
		"collection": {
			"container": "ul",
			"button": "li",
			"liner": "a"
		}
	} );
}

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

