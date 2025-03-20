

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
 * Add event listeners to apply orderNumbers to a table
 *
 * @param src An element, selector, or DataTables API or settings object
 */
function orderNumbers(src, opts) {
    let table = new DataTable.Api(src);
    table.on('draw.orderNumbers', function () {
        remove(table, opts);
        draw(table, opts);
    });
    table.on('destroy', function () {
        remove(table, opts);
        table.off('draw.orderNumbers');
    });
    // Initial draw
    draw(table, opts);
}
/** Remove all existing indicators */
function remove(table, opts) {
    $('span.' + opts.className, table.table().header()).remove();
}
/** Draw in new indicators for the currently applied order */
function draw(table, opts) {
    var order = table.order();
    if (order.length > 1) {
        for (var i = 0; i < order.length; i++) {
            var col = table.column(order[i][0]);
            var cell = col.header();
            if (!col.visible()) {
                continue;
            }
            $('<span>')
                .addClass(opts.className)
                .text(i + 1)
                .appendTo(cell);
        }
    }
}
function applyOptions(optsOut, optsIn) {
    if (optsIn) {
        if (typeof optsIn === 'boolean') {
            optsOut.enable = optsIn;
        }
        else if (typeof optsIn === 'object') {
            Object.assign(optsOut, optsIn);
            // If `enable` is not given, but the object is, then we assume that
            // the feature should be enabled. Use `enable: false` if you want to
            // disable it.
            if (!optsIn.enable) {
                optsOut.enable = true;
            }
        }
    }
}
// Listen for DataTable's initialisation's so we can check if the plug-in should
// be automatically activated or not.
$(document).on('init.dt', function (e, settings) {
    if (e.namespace !== 'dt') {
        return;
    }
    let opts = Object.assign({}, orderNumbers.defaults);
    applyOptions(opts, DataTable.defaults.orderNumbers);
    applyOptions(opts, settings.oInit.orderNumbers);
    if (opts.enable) {
        orderNumbers(settings, opts);
    }
});
orderNumbers.defaults = {
    enable: false,
    className: 'dt-order-number',
};
DataTable.orderNumbers = orderNumbers;


return DataTable;
}));
