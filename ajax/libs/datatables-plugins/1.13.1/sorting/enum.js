/**
 * Sort data by a defined enumerated (enum) list. The options for the values in
 * the enum are defined by passing the values in an array to the method
 * `$.fn.dataTable.enum`. Type detection and sorting plug-ins for DataTables will
 * automatically be generated and added to the table.
 *
 * For full details and instructions please see [this DataTables blog
 * post](//datatables.net/blog/2016-06-16).
 *
 * @name enum
 * @summary Dynamically create enum sorting options for a DataTable
 * @author [SpryMedia Ltd](http://datatables.net)
 *
 *  @example
 *    $.fn.dataTable.enum( [ 'High', 'Medium', 'Low' ] );
 *
 *    $('#example').DataTable();
 */


(function ($) {


var unique = 0;
var types = $.fn.dataTable.ext.type;

// Using form $.fn.dataTable.enum breaks at least YuiCompressor since enum is
// a reserved word in JavaScript
$.fn.dataTable['enum'] = function ( arr ) {
	var name = 'enum-'+(unique++);
	var lookup = window.Map ? new Map() : {};

	for ( var i=0, ien=arr.length ; i<ien ; i++ ) {
		lookup[ arr[i] ] = i;
	}

	// Add type detection
	types.detect.unshift( function ( d ) {
		return lookup[ d ] !== undefined ?
			name :
			null;
	} );

	// Add sorting method
	types.order[ name+'-pre' ] = function ( d ) {
		return lookup[ d ];
	};
};


})(jQuery);
