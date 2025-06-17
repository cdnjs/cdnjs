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
 * When sorting a DataTable you might find that you want to keep a specific
 * item at the top or bottom of the table. For example when sorting a column
 * of numbers, if a value is `null` or `N/A` you might want to keep it at the
 * bottom of the table, regardless of if ascending or descending sorting is
 * applied. This plug-in provides that ability.
 *
 * You must call the `$.fn.dataTable.absoluteOrder` with information about the
 * value(s) you wish to make absolute in the sorting order and store the
 * returned value, assigning it to the `columns.type` option for the column
 * you wish this sorting to be applied to.
 *
 * For number based columns a `$.fn.dataTable.absoluteOrderNumber` function is
 * also available.
 *
 * @name Absolute sorting
 * @summary Keep one or more items at the top and/or bottom of a table when sorting
 * @author [Allan Jardine](//datatables.net)
 * @depends DataTables 1.10+
 *
 * @example
 *    var namesType = $.fn.dataTable.absoluteOrder( [
 *      { value: '', position: 'top' }
 *    ] );
 *
 *    var numbersType = $.fn.dataTable.absoluteOrderNumber( [
 *      { value: 'N/A', position: 'bottom' }
 *    ] );
 *
 *    $('#example').DataTable( {
 *      columnDefs: [
 *        { type: namesType, targets: 0 },
 *        { type: numbersType, targets: 1 }
 *      ]
 *    } );
 */
// Unique value allowing multiple absolute ordering use cases on a single page.
var _unique = 0;
// Function to encapsulate code that is common to both the string and number
// ordering plug-ins.
var _setup = function (values) {
    if (!Array.isArray(values)) {
        values = [values];
    }
    var o = {
        name: 'absoluteOrder' + _unique++,
        alwaysTop: {},
        alwaysBottom: {},
        asc: function (a, b, isNumber) { },
        desc: function (a, b, isNumber) { },
    };
    // In order to provide performance, the symbols that are to be looked for
    // are stored as parameter keys in an object, allowing O(1) lookup, rather
    // than O(n) if it were in an array.
    for (var i = 0, ien = values.length; i < ien; i++) {
        var conf = values[i];
        if (typeof conf === 'string') {
            o.alwaysTop[conf] = true;
        }
        else if (conf.position === undefined || conf.position === 'top') {
            o.alwaysTop[conf.value] = true;
        }
        else {
            o.alwaysBottom[conf.value] = true;
        }
    }
    // Ascending ordering method
    o.asc = function (a, b, isNumber) {
        if (o.alwaysTop[a] && o.alwaysTop[b]) {
            return 0;
        }
        else if (o.alwaysBottom[a] && o.alwaysBottom[b]) {
            return 0;
        }
        else if (o.alwaysTop[a] || o.alwaysBottom[b]) {
            return -1;
        }
        else if (o.alwaysBottom[a] || o.alwaysTop[b]) {
            return 1;
        }
        if (isNumber) {
            // Cast as a number if required
            if (typeof a === 'string') {
                a = a.replace(/[^\d\-\.]/g, '') * 1;
            }
            if (typeof b === 'string') {
                b = b.replace(/[^\d\-\.]/g, '') * 1;
            }
        }
        return a < b ? -1 : a > b ? 1 : 0;
    };
    // Descending ordering method
    o.desc = function (a, b, isNumber) {
        if (o.alwaysTop[a] && o.alwaysTop[b]) {
            return 0;
        }
        else if (o.alwaysBottom[a] && o.alwaysBottom[b]) {
            return 0;
        }
        else if (o.alwaysTop[a] || o.alwaysBottom[b]) {
            return -1;
        }
        else if (o.alwaysBottom[a] || o.alwaysTop[b]) {
            return 1;
        }
        if (isNumber) {
            if (typeof a === 'string') {
                a = a.replace(/[^\d\-\.]/g, '') * 1;
            }
            if (typeof b === 'string') {
                b = b.replace(/[^\d\-\.]/g, '') * 1;
            }
        }
        return a < b ? 1 : a > b ? -1 : 0;
    };
    return o;
};
// String based ordering
DataTable.absoluteOrder = function (values) {
    var conf = _setup(values);
    DataTable.ext.type.order[conf.name + '-asc'] = conf.asc;
    DataTable.ext.type.order[conf.name + '-desc'] = conf.desc;
    // Return the name of the sorting plug-in that was created so it can be used
    // with the `columns.type` parameter. There is no auto-detection here.
    return conf.name;
};
// Number based ordering - strips out everything but the number information
DataTable.absoluteOrderNumber = function (values) {
    var conf = _setup(values);
    DataTable.ext.type.order[conf.name + '-asc'] = function (a, b) {
        return conf.asc(a, b, true);
    };
    DataTable.ext.type.order[conf.name + '-desc'] = function (a, b) {
        return conf.desc(a, b, true);
    };
    return conf.name;
};


return DataTable;
}));
