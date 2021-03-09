/*! ScrollResize for DataTables v1.0.0
 * 2015 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     ScrollResize
 * @description Automatically alter the DataTables page length to fit the table
     into a container
 * @version     1.0.0
 * @file        dataTables.scrollResize.js
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
 * * Setting the `scrollResize` parameter in the DataTables initialisation to
 *   be true - i.e. `scrollResize: true`
 * * Setting the `scrollResize` parameter to be true in the DataTables
 *   defaults (thus causing all tables to have this feature) - i.e.
 *   `$.fn.dataTable.defaults.scrollResize = true`.
 * * Creating a new instance: `new $.fn.dataTable.ScrollResize( table );` where
 *   `table` is a DataTable's API instance.
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


var ScrollResize = function ( dt )
{
	var that = this;
	var table = dt.table();

	this.s = {
		dt:        dt,
		host:      $(table.container()).parent(),
		header:    $(table.header()),
		footer:    $(table.footer()),
		body:      $(table.body()),
		container: $(table.container()),
		table:     $(table.node())
	};

	var host = this.s.host;
	if ( host.css('position') === 'static' ) {
		host.css( 'position', 'relative' );
	}

	dt.on( 'draw', function () {
		that._size();
	} );

	this._attach();
	this._size();
};


ScrollResize.prototype = {
	_size: function ()
	{
		var settings = this.s;
		var dt = settings.dt;
		var t = dt.table();
		var offsetTop = $( settings.table ).offset().top;
		var availableHeight = settings.host.height();
		var scrollBody = $('div.dataTables_scrollBody', t.container());

		// Subtract the height of the header, footer and the elements
		// surrounding the table
		availableHeight -= offsetTop;
		availableHeight -= settings.container.height() - ( offsetTop + scrollBody.height() );

		$('div.dataTables_scrollBody', t.container()).css( {
			maxHeight: availableHeight,
			height: availableHeight
		} );

		if ( dt.fixedColumns ) {
			dt.fixedColumns().relayout();
		}
	},

	_attach: function () {
		// There is no `resize` event for elements, so to trigger this effect,
		// create an empty HTML document using an <iframe> which will issue a
		// resize event inside itself when the document resizes. Since it is
		// 100% x 100% that will occur whenever the host element is resized.
		var that = this;
		var obj = $('<iframe/>')
			.css( {
				position: 'absolute',
				top: 0,
				left: 0,
				height: '100%',
				width: '100%',
				zIndex: -1,
				border: 0
			} )
			.attr( 'frameBorder', '0' )
			.attr( 'src', 'about:blank' );

		obj[0].onload = function () {
			var body = this.contentDocument.body;
			var height = body.offsetHeight;
			var contentDoc = this.contentDocument;
			var defaultView = contentDoc.defaultView || contentDoc.parentWindow;

			defaultView.onresize = function () {
				// Three methods to get the iframe height, to keep all browsers happy
				var newHeight = body.clientHeight || body.offsetHeight;
				var docClientHeight = contentDoc.documentElement.clientHeight;

				if ( ! newHeight && docClientHeight ) {
					newHeight = docClientHeight;
				}

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


$.fn.dataTable.ScrollResize = ScrollResize;
$.fn.DataTable.ScrollResize = ScrollResize;

// Automatic initialisation listener
$(document).on( 'init.dt', function ( e, settings ) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var api = new $.fn.dataTable.Api( settings );

	if ( settings.oInit.scrollResize || $.fn.dataTable.defaults.scrollResize ) {
		new ScrollResize( api );
	}
} );

}));
