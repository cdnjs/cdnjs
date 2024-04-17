/**
 * Read information from a column of select (drop down) menus and return an
 * array to use as a basis for sorting.
 *
 *  @summary Sort based on the value of the `dt-tag select` options in a column
 *  @name Select menu data source
 *  @requires DataTables 1.10+
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 */

$.fn.dataTable.ext.order['dom-select'] = function  ( settings, col )
{
	return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		return $('select', td).val();
	} );
};
