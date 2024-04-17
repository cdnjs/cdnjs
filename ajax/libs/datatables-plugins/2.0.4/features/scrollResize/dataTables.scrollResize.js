/*! © SpryMedia Ltd - datatables.net/license */

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
 * @summary     ScrollResize
 * @description Automatically alter the DataTables page length to fit the table
     into a container
 * @version     1.1.0
 * @author      SpryMedia Ltd
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
 *   `DataTable.defaults.scrollResize = true`.
 * * Creating a new instance: `new DataTable.ScrollResize( table );` where
 *   `table` is a DataTable's API instance.
 */
var ScrollResize = function (dt) {
    var that = this;
    var table = dt.table();
    this.s = {
        dt: dt,
        host: $(table.container()).parent(),
        header: $(table.header()),
        footer: $(table.footer()),
        body: $(table.body()),
        container: $(table.container()),
        table: $(table.node()),
    };
    var host = this.s.host;
    if (host.css('position') === 'static') {
        host.css('position', 'relative');
    }
    dt.on('draw.scrollResize', function () {
        that._size();
    });
    dt.on('destroy.scrollResize', function () {
        dt.off('.scrollResize');
        this.s.obj && this.s.obj.remove();
    }.bind(this));
    this._attach();
    this._size();
    // Redraw the header if the scrollbar was visible before feature
    // initialization, but no longer after initialization. Otherwise,
    // the header width would differ from the body width, because the
    // scrollbar is no longer present.
    var settings = dt.settings()[0];
    var divBodyEl = settings.nScrollBody;
    var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;
    if (settings.scrollBarVis && !scrollBarVis) {
        dt.columns.adjust();
    }
};
ScrollResize.prototype = {
    _size: function () {
        var settings = this.s;
        var dt = settings.dt;
        var t = dt.table();
        var offsetTop = $(settings.table).offset().top;
        var availableHeight = settings.host.height();
        var scrollBody = $('div.dt-scroll-body', t.container());
        // Subtract the height of the header, footer and the elements
        // surrounding the table
        availableHeight -= offsetTop;
        availableHeight -=
            settings.container.height() - (offsetTop + scrollBody.height());
        $('div.dt-scroll-body', t.container()).css({
            maxHeight: availableHeight,
            height: availableHeight,
        });
    },
    _attach: function () {
        // There is no `resize` event for elements, so to trigger this effect,
        // create an empty HTML document using an <iframe> which will issue a
        // resize event inside itself when the document resizes. Since it is
        // 100% x 100% that will occur whenever the host element is resized.
        var that = this;
        var obj = $('<iframe/>')
            .css({
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: -1,
            border: 0,
        })
            .attr('frameBorder', '0')
            .attr('src', 'about:blank');
        obj[0].onload = function () {
            var contentDocument = this.contentDocument;
            var body = contentDocument.body;
            var height = body.offsetHeight;
            var contentDoc = contentDocument;
            var defaultView = contentDoc.defaultView || contentDoc.parentWindow;
            defaultView.onresize = function () {
                // Three methods to get the iframe height, to keep all browsers happy
                var newHeight = body.clientHeight || body.offsetHeight;
                var docClientHeight = contentDoc.documentElement.clientHeight;
                if (!newHeight && docClientHeight) {
                    newHeight = docClientHeight;
                }
                if (newHeight !== height) {
                    height = newHeight;
                    that._size();
                }
            };
        };
        obj.appendTo(this.s.host).attr('data', 'about:blank');
        this.s.obj = obj;
    },
};
DataTable.ScrollResize = ScrollResize;
// Automatic initialisation listener
$(document).on('init.dt', function (e, settings) {
    if (e.namespace !== 'dt') {
        return;
    }
    var api = new DataTable.Api(settings);
    if (settings.oInit.scrollResize || DataTable.defaults.scrollResize) {
        new ScrollResize(api);
    }
});


return DataTable;
}));
