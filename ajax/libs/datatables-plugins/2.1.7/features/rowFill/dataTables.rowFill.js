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
 * @summary     RowFill
 * @description Match the number of rows in a table to the page length
 * @version     1.1.0
 * @author      SpryMedia Ltd
 *
 * This feature plug-in for DataTables will automatically insert temporary rows
 * into a DataTable that draws a page that is less than the configured page
 * length. This can be handy to ensure that your table always as (e.g.) 10 rows
 * visible.
 *
 * Filler rows have the class `dt-rowFill--filler` assigned to them allowing for
 * additional styling (e.g. reducing opacity).
 *
 * To enable for a table add `rowFill: true` to your DataTables configuration.
 */
var RowFill = function (dt) {
    var table = dt.table();
    this.s = {
        dt: dt,
        body: $(table.body()),
    };
    this._attach();
};
RowFill.prototype = {
    _attach: function () {
        var dt = this.s.dt;
        var body = this.s.body;
        dt.on('draw', function () {
            var colspan = dt.columns(':visible').count();
            var rowCount = dt.rows({ page: 'current' }).count();
            var class1 = 'even';
            var class2 = 'odd';
            // Take account of the fact that DataTables will show a "Nothing found" row
            // for an empty record set
            if (rowCount === 0) {
                rowCount = 1;
            }
            // Reverse for continuation from the DataTable rows when a odd number of rows
            if (rowCount % 2 === 0) {
                class1 = 'odd';
                class2 = 'even';
            }
            for (var i = 0; i < dt.page.len() - rowCount; i++) {
                body.append($('<tr><td colspan="' + colspan + '">&nbsp;</td></tr>')
                    .addClass(i % 2 === 0 ? class1 : class2)
                    .addClass('dt-rowFill--filler'));
            }
        });
    },
};
DataTable.RowFill = RowFill;
// Automatic initialisation listener
$(document).on('preInit.dt', function (e, settings) {
    if (e.namespace !== 'dt') {
        return;
    }
    var api = new DataTable.Api(settings);
    if (settings.oInit.rowFill || DataTable.defaults.rowFill) {
        new RowFill(api);
    }
});


return DataTable;
}));
