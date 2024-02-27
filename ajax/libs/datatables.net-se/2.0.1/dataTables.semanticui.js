/*! DataTables Bootstrap 3 integration
 * ©2011-2015 SpryMedia Ltd - datatables.net/license
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
 * DataTables integration for FomanticUI (formally SemanticUI)
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See https://datatables.net/manual/styling/bootstrap
 * for further information.
 */

/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	renderer: 'semanticUI'
} );


/* Default class modification */
$.extend( true, DataTable.ext.classes, {
	container: "dt-container dt-semanticUI ui stackable grid",
	search: {
		input: "dt-search ui input"
	},
	processing: {
		container: "dt-processing ui segment"
	},
	table: 'dataTable table unstackable'
} );


/* Fomantic paging button renderer */
DataTable.ext.renderer.pagingButton.semanticUI = function (settings, buttonType, content, active, disabled) {
	var btnClasses = ['dt-paging-button', 'item'];

	if (active) {
		btnClasses.push('active');
	}

	if (disabled) {
		btnClasses.push('disabled')
	}

	var li = $('<li>').addClass(btnClasses.join(' '));
	var a = $('<'+(disabled ? 'div' : 'a')+'>', {
		'href': disabled ? null : '#',
		'class': 'page-link'
	})
		.html(content)
		.appendTo(li);

	return {
		display: li,
		clicker: a
	};
};

DataTable.ext.renderer.pagingContainer.semanticUI = function (settings, buttonEls) {
	return $('<div/>').addClass('ui unstackable pagination menu').append(buttonEls);
};


// Javascript enhancements on table initialisation
$(document).on( 'init.dt', function (e, ctx) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var api = new $.fn.dataTable.Api( ctx );

	// Length menu drop down
	if ( $.fn.dropdown ) {
		$( 'div.dt-length select', api.table().container() ).dropdown();
	}

	// Filtering input
	$( 'div.dt-search.ui.input', api.table().container() ).removeClass('input').addClass('form');
	$( 'div.dt-search input', api.table().container() ).wrap( '<span class="ui input" />' );
} );


DataTable.ext.renderer.layout.semanticUI = function ( settings, container, items ) {
	var row = $( '<div/>', {
			"class": items.full ?
				'row' :
				'row'
		} )
		.appendTo( container );

	$.each( items, function (key, val) {
		var klass = '';
		if ( key === 'start' ) {
			klass += 'left floated eight wide column';
		}
		else if ( key === 'end' ) {
			klass += 'right floated right aligned eight wide column';
		}
		else if ( key === 'full' ) {
			klass += 'center aligned sixteen wide column';
		}

		$( '<div/>', {
				id: val.id || null,
				"class": klass+' '+(val.className || '')
			} )
			.append( val.contents )
			.appendTo( row );
	} );
};


return DataTable;
}));
