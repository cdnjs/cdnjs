/*! DataTables Foundation integration
 * ©2011-2015 SpryMedia Ltd - datatables.net/license
 */

import $ from 'jquery';
import DataTable from 'datatables.net';



/**
 * DataTables integration for Foundation. This requires Foundation 5 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Foundation. See http://datatables.net/manual/styling/foundation
 * for further information.
 */

// Detect Foundation 5 / 6 as they have different element and class requirements
var meta = $('<meta class="foundation-mq"/>').appendTo('head');
DataTable.ext.foundationVersion = meta.css('font-family').match(/small|medium|large/) ? 6 : 5;
meta.remove();


$.extend( DataTable.ext.classes, {
	sWrapper:    "dataTables_wrapper dt-foundation",
	sProcessing: "dataTables_processing panel callout"
} );


/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	dom:
		"<'row grid-x'<'small-6 columns cell'l><'small-6 columns cell'f>r>"+
		"t"+
		"<'row grid-x'<'small-6 columns cell'i><'small-6 columns cell'p>>",
	renderer: 'foundation'
} );


/* Page button renderer */
DataTable.ext.renderer.pageButton.foundation = function ( settings, host, idx, buttons, page, pages ) {
	var api = new DataTable.Api( settings );
	var classes = settings.oClasses;
	var lang = settings.oLanguage.oPaginate;
	var aria = settings.oLanguage.oAria.paginate || {};
	var btnDisplay, btnClass;
	var tag;
	var v5 = DataTable.ext.foundationVersion === 5;

	var attach = function( container, buttons ) {
		var i, ien, node, button;
		var clickHandler = function ( e ) {
			e.preventDefault();
			if ( !$(e.currentTarget).hasClass('unavailable') && api.page() != e.data.action ) {
				api.page( e.data.action ).draw( 'page' );
			}
		};

		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( Array.isArray( button ) ) {
				attach( container, button );
			}
			else {
				btnDisplay = '';
				btnClass = '';
				tag = null;

				switch ( button ) {
					case 'ellipsis':
						btnDisplay = '&#x2026;';
						btnClass = 'unavailable disabled';
						tag = null;
						break;

					case 'first':
						btnDisplay = lang.sFirst;
						btnClass = button + (page > 0 ?
							'' : ' unavailable disabled');
						tag = page > 0 ? 'a' : null;
						break;

					case 'previous':
						btnDisplay = lang.sPrevious;
						btnClass = button + (page > 0 ?
							'' : ' unavailable disabled');
						tag = page > 0 ? 'a' : null;
						break;

					case 'next':
						btnDisplay = lang.sNext;
						btnClass = button + (page < pages-1 ?
							'' : ' unavailable disabled');
						tag = page < pages-1 ? 'a' : null;
						break;

					case 'last':
						btnDisplay = lang.sLast;
						btnClass = button + (page < pages-1 ?
							'' : ' unavailable disabled');
						tag = page < pages-1 ? 'a' : null;
						break;

					default:
						btnDisplay = button + 1;
						btnClass = page === button ?
							'current' : '';
						tag = page === button ?
							null : 'a';
						break;
				}

				if ( v5 ) {
					tag = 'a';
				}

				if ( btnDisplay ) {
					var disabled = btnClass.indexOf('disabled') !== -1;

					node = $('<li>', {
							'class': classes.sPageButton+' '+btnClass,
							'id': idx === 0 && typeof button === 'string' ?
								settings.sTableId +'_'+ button :
								null
						} )
						.append( tag ?
							$('<'+tag+'/>', {
								'href': disabled ? null : '#',
								'aria-controls': settings.sTableId,
								'aria-disabled': disabled ? 'true' : null,
								'aria-label': aria[ button ],
								'aria-role': 'link',
								'aria-current': btnClass === 'current' ? 'page' : null,
								'tabindex': settings.iTabIndex,
							} ).html( btnDisplay ) :
							btnDisplay
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


export default DataTable;
