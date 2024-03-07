/**
 * Update the internal data for a `dt-tag tr` element based on what is used in the 
 * DOM. You will likely want to call fnDraw() after this function.
 *
 * DataTables 1.10+ has this ability built-in through the
 * `dt-api row().invalidate()` method. As such this method is marked deprecated,
 * but is available for use with legacy version of DataTables. Please use the
 * new API if you are used DataTables 1.10 or newer.
 * 
 *  @name fnDataUpdate
 *  @summary Update DataTables cached data from the DOM
 *  @author Lior Gerson
 *  @deprecated
 *
 *  @param {node} nTr `dt-tag tr` element to get the data from
 *  @param {integer} iRowIndex Row's position in the table (`fnGetPosition`).
 */

jQuery.fn.dataTableExt.oApi.fnDataUpdate = function ( oSettings, nRowObject, iRowIndex )
{
	jQuery(nRowObject).find("TD").each( function(i) {
		  var iColIndex = oSettings.oApi._fnVisibleToColumnIndex( oSettings, i );
		  oSettings.oApi._fnSetCellData( oSettings, iRowIndex, iColIndex, jQuery(this).html() );
	} );
};
