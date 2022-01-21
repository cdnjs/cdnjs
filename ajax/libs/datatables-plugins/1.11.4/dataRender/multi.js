/**
 * This renderer doesn't format the output itself, but rather allows multiple
 * renderers to be easily called, which will render the content in sequence.
 * 
 * Pass the renderers you wish to chain together as elements in an array to
 * this function. Important - you should pass the renderer as if you were
 * going to give it to the `render` property directly (i.e. if it is just a
 * simple function, don't execute it).
 *
 *  @name multi
 *  @summary Use multiple renderers
 *  @author [Allan Jardine](http://datatables.net)
 *  @requires DataTables 1.10+
 *
 *  @example
 *    // Convert dates using moment renderer and ensure they are HTML safe
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 1,
 *        render: $.fn.dataTable.render.multi( [
 *          $.fn.dataTable.render.moment( 'Do MMM YYYY' ),
 *          $.fn.dataTable.render.text(),
 *        ] )
 *      } ]
 *    } );
 */


// UMD
(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ?
					require('jquery') :
					require('jquery')( root );
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}
(function( $, window, document ) {


$.fn.dataTable.render.multi = function (renderArray) {
	return function (d, type, row, meta) {
		for (var r = 0; r < renderArray.length; r++) {
			if (typeof renderArray[r] === "function") {
				d = renderArray[r](d, type, row, meta);
			} else if (typeof renderArray[r][type] === "function") {
				d = renderArray[r][type](d, type, row, meta);
			} else if (typeof renderArray[r]._ === "function") {
				d = renderArray[r]._(d, type, row, meta);
			}
		}
		return d;
	};
};
	

}));
