/*! DataTables Foundation integration
 * © SpryMedia Ltd - datatables.net/license
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
 * DataTables integration for Foundation. This requires Foundation 5.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Foundation. See https://datatables.net/manual/styling/foundation
 * for further information.
 */

$.extend( true, DataTable.ext.classes, {
	container: "dt-container dt-foundation",
	layout: {
		row: 'grid-x',
		cell: 'flex-container align-justify align-middle',
		tableRow: 'dt-layout-table',
		tableCell: 'cell small-12',
		start: 'dt-layout-start cell shrink',
		end: 'dt-layout-end cell shrink',
		full: 'dt-layout-full cell'
	},
	processing: {
		container: "dt-processing panel callout"
	}
} );


/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	renderer: 'foundation'
} );

DataTable.ext.renderer.pagingButton.foundation = function (settings, buttonType, content, active, disabled) {
	var btnClasses = [];
	var li;

	if (buttonType === 'ellipsis') {
		// No `a` tag for ellipsis
		li = $('<li>', {
			class: 'ellipsis'
		});

		return {
			display: li,
			clicker: li
		};
	}
	else if (active || disabled) {
		// No `a` tag for current or disabled
		li = $('<li>', {
			class: active
				? 'current'
				: 'disabled ' + btnClasses.join(' ')
		}).html(content);

		return {
			display: li,
			clicker: li
		};
	}

	li = $('<li>').addClass(btnClasses.join(' '));
	var a = $('<a>', {
		'href': '#'
	})
		.html(content)
		.appendTo(li);

	return {
		display: li,
		clicker: a
	};
};

DataTable.ext.renderer.pagingContainer.foundation = function (settings, buttonEls) {
	return $('<ul/>').addClass('pagination').append(buttonEls);
};

DataTable.ext.renderer.layout.foundation = function ( settings, container, items ) {
	var classes = settings.oClasses.layout;
	var row = $('<div/>')
		.attr('id', items.id || null)
		.addClass(items.className || classes.row)
		.appendTo( container );

	DataTable.ext.renderer.layout._forLayoutRow(items, function (key, val) {
		if (key === 'id' || key === 'className') {
			return;
		}

		var klass = '';
		var style = {};

		if (val.table) {
			row.addClass(classes.tableRow);
			klass += classes.tableCell + ' ';
		}

		if (key === 'start') {
			klass += classes.start;
		}
		else if (key === 'end') {
			klass += classes.end;
			style.marginLeft = 'auto';
		}
		else {
			klass += classes.full;
		}

		$('<div/>')
			.attr({
				id: val.id || null,
				"class": val.className
					? val.className
					: classes.cell + ' ' + klass
			})
			.css(style)
			.append( val.contents )
			.appendTo( row );
	} );
};


return DataTable;
}));
