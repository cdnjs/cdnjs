/**
 * This plug-in adds to DataTables the ability to set multiple column filtering
 * terms in a single call (particularly useful if using server-side processing).
 * Used in combination with the column sName parameter, simply pass in an object
 * with the key/value pair being the column you wish to search on, and the value
 * you wish to search for.
 *
 * DataTables 1.10's API provides a easy built-in way to apply multiple filters
 * to the table without redrawing until required. For example, the example below
 * with the DataTables 1.10 API could be written as:
 *
 * ```js
 * var table = $('#example').DataTable();
 * table
 *   .column( 0 ).search( 'Gecko' )
 *   .column( 1 ).search( 'Cam' )
 *   .draw();
 * ```
 *
 * As such this method is marked deprecated, but is available for use with
 * legacy version of DataTables. Please use the new API if you are used
 * DataTables 1.10 or newer.
 *
 *  @name fnMultiFilter
 *  @summary Apply multiple column filters together
 *  @author _mrkevans_
 *  @deprecated
 *
 *  @param {object} oData Data to search for
 *
 *  @example
 *    $(document).ready(function() {
 *        var table = $('#example').dataTable( {
 *            "aoColumns": [
 *                { "sName": "engine" },
 *                { "sName": "browser" },
 *                { "sName": "platform" },
 *                { "sName": "version" },
 *                { "sName": "grade" }
 *            ]
 *        } );
 *        table.fnMultiFilter( { "engine": "Gecko", "browser": "Cam" } );
 *    } );
 */

jQuery.fn.dataTableExt.oApi.fnMultiFilter = function( oSettings, oData ) {
	for ( var key in oData )
	{
		if ( oData.hasOwnProperty(key) )
		{
			for ( var i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				if( oSettings.aoColumns[i].sName == key )
				{
					/* Add single column filter */
					oSettings.aoPreSearchCols[ i ].sSearch = oData[key];
					break;
				}
			}
		}
	}
	this.oApi._fnReDraw( oSettings );
};
