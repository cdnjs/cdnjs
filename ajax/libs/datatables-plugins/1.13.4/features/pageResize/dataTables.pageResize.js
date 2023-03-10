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

		if (typeof window !== 'undefined') {
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
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/**
 * @summary     PageResize
 * @description Automatically alter the DataTables page length to fit the table
     into a container
 * @version     1.1.0
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
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
 *   `DataTable.defaults.pageResize = true`.
 * * Creating a new instance: `new DataTable.PageResize( table );` where
 *   `table` is a DataTable's API instance.
 *
 * For more detailed information please see:
 *     http://datatables.net/blog/2015-04-10
 */
var PageResize = function (dt, pageResizeManualDelta) {
    var table = dt.table();
    this.s = {
        dt: dt,
        host: $(table.container()).parent(),
        header: $(table.header()),
        footer: $(table.footer()),
        body: $(table.body()),
        container: $(table.container()),
        table: $(table.node()),
        delta: pageResizeManualDelta,
    };
    this.sizes = {
        offsetTop: this._getOffsetTop(),
        tableHeight: this._getTableHeight(),
        containerHeight: this._getContainerHeight(),
        headerHeight: this._getHeaderHeight(),
        footerHeight: this._getFooterHeight(),
    };
    var host = this.s.host;
    if (host.css('position') === 'static') {
        host.css('position', 'relative');
    }
    var onDestroy = function () {
        dt.off('.pageResize', onDestroy);
        this.s.obj && this.s.obj.remove();
    }.bind(this);
    dt.on('destroy.pageResize', onDestroy);
    this._attach();
    // Delay the initial sizing until the table is fully initialized
    // such that the pagination element is also added and can be taken
    // into account.
    var initEvent = 'init.pageResize';
    dt.on(initEvent, function () {
        dt.off(initEvent);
        this._size();
    }.bind(this));
};
PageResize.prototype = {
    _size: function () {
        var settings = this.s;
        var dt = settings.dt;
        var t = dt.table();
        var rows = $('tr', settings.body);
        var rowHeight = rows.eq(rows.length > 1 ? 1 : 0).height(); // Attempt to use the second row if poss, for top and bottom border
        var availableHeight = settings.host.height();
        var scrolling = t.header().parentNode !== t.body().parentNode;
        var delta = settings.delta;
        var offsetTop = (this.sizes.offsetTop = this._getOffsetTop());
        var tableHeight = (this.sizes.tableHeight = this._getTableHeight());
        var containerHeight = (this.sizes.containerHeight =
            this._getContainerHeight());
        var headerHeight = (this.sizes.headerHeight = this._getHeaderHeight());
        var footerHeight = (this.sizes.footerHeight = this._getFooterHeight());
        // Subtract the height of the header, footer and the elements
        // surrounding the table
        if (!scrolling) {
            if (t.header()) {
                availableHeight -= headerHeight;
            }
            if (t.footer()) {
                availableHeight -= footerHeight;
            }
        }
        availableHeight -= offsetTop;
        availableHeight -= containerHeight - (offsetTop + tableHeight);
        if (!isNaN(parseFloat(delta)) && isFinite(delta)) {
            availableHeight -= delta;
        }
        var drawRows = Math.floor(availableHeight / rowHeight);
        if (drawRows !== Infinity &&
            drawRows !== -Infinity &&
            !isNaN(drawRows) &&
            drawRows > 0 &&
            drawRows !== dt.page.len()) {
            dt.page.len(drawRows).draw();
        }
    },
    _attach: function () {
        // There is no `resize` event for elements, so to trigger this effect,
        // create an empty HTML document using an <object> which will issue a
        // resize event inside itself when the document resizes. Since it is
        // 100% x 100% that will occur whenever the host element is resized.
        var that = this;
        var obj = $('<object/>')
            .css({
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: -1,
        })
            .attr('type', 'text/html');
        obj[0].onload = function () {
            var contentDocument = this.contentDocument;
            var body = contentDocument.body;
            var height = body.offsetHeight;
            contentDocument.defaultView.onresize = function () {
                var newHeight = body.clientHeight || body.offsetHeight;
                if (newHeight !== height) {
                    height = newHeight;
                    that._size();
                    return;
                }
                // Width changes might lead to layout changes, which might require
                // resizing the table
                if (that.sizes.offsetTop !== that._getOffsetTop() ||
                    that.sizes.containerHeight !== that._getContainerHeight() ||
                    that.sizes.tableHeight !== that._getTableHeight() ||
                    that.sizes.headerHeight !== that._getHeaderHeight() ||
                    that.sizes.footerHeight !== that._getFooterHeight()) {
                    that._size();
                    return;
                }
            };
        };
        obj.appendTo(this.s.host).attr('data', 'about:blank');
        this.s.obj = obj;
    },
    _getOffsetTop: function () {
        return $(this.s.table).offset().top;
    },
    _getTableHeight: function () {
        return this.s.table.height();
    },
    _getContainerHeight: function () {
        return this.s.container.height();
    },
    _getHeaderHeight: function () {
        return this.s.dt.table().header() ? this.s.header.height() : 0;
    },
    _getFooterHeight: function () {
        return this.s.dt.table().footer() ? this.s.footer.height() : 0;
    },
};
DataTable.PageResize = PageResize;
// Automatic initialisation listener
$(document).on('preInit.dt', function (e, settings) {
    if (e.namespace !== 'dt') {
        return;
    }
    var api = new DataTable.Api(settings);
    if ($(api.table().node()).hasClass('pageResize') ||
        settings.oInit.pageResize ||
        DataTable.defaults.pageResize) {
        new PageResize(api, settings.oInit.pageResizeManualDelta);
    }
});


return DataTable;
}));
