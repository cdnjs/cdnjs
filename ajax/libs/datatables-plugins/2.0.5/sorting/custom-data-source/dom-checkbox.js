/**
 * Read information from a column of checkboxes (input elements with type
 * checkbox) and return an array to use as a basis for sorting.
 *
 *  @summary Sort based on the checked state of checkboxes in a column
 *  @name Checkbox data source
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 */

$.fn.dataTable.ext.order['dom-checkbox'] = function  ( settings, col )
{
	return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		return $('input', td).prop('checked') ? '1' : '0';
	} );
};
