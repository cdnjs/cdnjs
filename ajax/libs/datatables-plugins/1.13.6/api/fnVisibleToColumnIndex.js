/**
 * When DataTables removes columns from the display (bVisible or fnSetColumnVis)
 * it removes these elements from the DOM, effecting the index value for the
 * column positions. This function converts the visible column index into a data
 * column index (i.e. all columns regardless of visibility).
 *
 * DataTables 1.10+ has this ability built-in through the
 * `dt-api column.index()` method. As such this method is marked deprecated, but
 * is available for use with legacy version of DataTables.
 *
 *  @name fnVisibleToColumnIndex
 *  @summary Convert a column visible index to a data index.
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *  @deprecated
 *
 *  @param {integer} iMatch Column data index to convert to data index
 *  @returns {integer} Visible column index
 *
 *  @example
 *    var table = $('#example').dataTable( {
 *      aoColumnDefs: [
 *        { bVisible: false, aTargets: [1] }
 *      ]
 *    } );
 *
 *    // This will show 2
 *    alert( 'Visible Column 1 data index: '+table.fnVisibleToColumnIndex(1) );
 */

jQuery.fn.dataTableExt.oApi.fnVisibleToColumnIndex = function ( oSettings, iMatch )
{
	return oSettings.oApi._fnVisibleToColumnIndex( oSettings, iMatch );
};
