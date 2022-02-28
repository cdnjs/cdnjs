/*! PageResize for DataTables v1.0.0
 * 2015 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     PageResize
 * @description Automatically alter the DataTables page length to fit the table
     into a container
 * @version     1.0.0
 * @file        dataTables.pageResize.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2015 SpryMedia Ltd.
 * 
 * License      MIT - http://datatables.net/license/mit
 *
 * This feature plug-in for DataTables will automatically change the DataTables
 * page length in order to fit inside its container. This can be particularly
 * useful for control panels and other interfaces which resize dynamically with
 * the user's browser window instead of scrolling.
 *
 * Page resizing in DataTables can be enabled by using any one of the following
 * options:
 *
 * * Adding the class `pageResize` to the HTML table
 * * Setting the `pageResize` parameter in the DataTables initialisation to
 *   be true - i.e. `pageResize: true`
 * * Setting the `pageResize` parameter to be true in the DataTables
 *   defaults (thus causing all tables to have this feature) - i.e.
 *   `$.fn.dataTable.defaults.pageResize = true`.
 * * Creating a new instance: `new $.fn.dataTable.PageResize( table );` where
 *   `table` is a DataTable's API instance.
 *
 * For more detailed information please see:
 *     http://datatables.net/blog/2015-04-10
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
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
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


var PageResize = function ( dt, pageResizeManualDelta )
{
	var table = dt.table();

	this.s = {
		dt:        dt,
		host:      $(table.container()).parent(),
		header:    $(table.header()),
		footer:    $(table.footer()),
		body:      $(table.body()),
		container: $(table.container()),
		table:     $(table.node()),
		delta:     pageResizeManualDelta
	};

	var host = this.s.host;
	if ( host.css('position') === 'static' ) {
		host.css( 'position', 'relative' );
	}

	this._attach();
	this._size();
};


PageResize.prototype = {
	_size: function ()
	{
		var settings = this.s;
		var dt = settings.dt;
		var t = dt.table();
		var offsetTop = $( settings.table ).offset().top;
		var rows = $( 'tr', settings.body );
		var rowHeight = rows.eq( rows.length > 1 ? 1 : 0 ).height(); // Attempt to use the second row if poss, for top and bottom border
		var availableHeight = settings.host.height();
		var scrolling = t.header().parentNode !== t.body().parentNode;
		var delta = settings.delta;

		// Subtract the height of the header, footer and the elements
		// surrounding the table
		if ( ! scrolling ) {
			if ( t.header() ) {
			    availableHeight -= settings.header.height();
			}
			if ( t.footer() ) {
			    availableHeight -= settings.footer.height();
			}
		}
		availableHeight -= offsetTop;
		availableHeight -= settings.container.height() - ( offsetTop + settings.table.height() );

		if ( !isNaN( parseFloat( delta ) ) && isFinite( delta ) ) {
			availableHeight -= delta;
		}

		var drawRows = Math.floor( availableHeight / rowHeight );

		if ( drawRows !== Infinity && drawRows !== -Infinity && 
			 ! isNaN( drawRows )   && drawRows > 0 &&
			 drawRows !== dt.page.len()
		) {
			dt.page.len( drawRows ).draw();
		}
	},

	_attach: function () {
		// There is no `resize` event for elements, so to trigger this effect,
		// create an empty HTML document using an <object> which will issue a
		// resize event inside itself when the document resizes. Since it is
		// 100% x 100% that will occur whenever the host element is resized.
		var that = this;
		var obj = $('<object/>')
			.css( {
				position: 'absolute',
				top: 0,
				left: 0,
				height: '100%',
				width: '100%',
				zIndex: -1
			} )
			.attr( 'type', 'text/html' );

		obj[0].onload = function () {
			var body = this.contentDocument.body;
			var height = body.offsetHeight;

			this.contentDocument.defaultView.onresize = function () {
				var newHeight = body.clientHeight || body.offsetHeight;

				if ( newHeight !== height ) {
					height = newHeight;

					that._size();
				}
			};
		};

		obj
			.appendTo( this.s.host )
			.attr( 'data', 'about:blank' );
	}
};


$.fn.dataTable.PageResize = PageResize;
$.fn.DataTable.PageResize = PageResize;

// Automatic initialisation listener
$(document).on( 'preInit.dt', function ( e, settings ) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var api = new $.fn.dataTable.Api( settings );

	if ( $( api.table().node() ).hasClass( 'pageResize' ) ||
		 settings.oInit.pageResize ||
		 $.fn.dataTable.defaults.pageResize )
	{
		new PageResize( api, settings.oInit.pageResizeManualDelta );
	}
} );


}));
