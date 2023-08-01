/**
 * Sort numeric data which has a percent sign with it.
 *
 * DataTables 1.10+ has percentage data type detection and sorting abilities
 * built-in. As such this plug-in is marked as deprecated, but might be useful
 * when working with old versions of DataTables.
 * 
 *  @name Percentage
 *  @summary Sort numeric data with a postfixed percentage symbol
 *  @deprecated
 *  @author [Jonathan Romley](http://jonathanromley.org/)
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'percent', targets: 0 }
 *       ]
 *    } );
 */

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"percent-pre": function ( a ) {
		var x = (a == "-") ? 0 : a.replace( /%/, "" );
		return parseFloat( x );
	},

	"percent-asc": function ( a, b ) {
		return ((a < b) ? -1 : ((a > b) ? 1 : 0));
	},

	"percent-desc": function ( a, b ) {
		return ((a < b) ? 1 : ((a > b) ? -1 : 0));
	}
} );
