/**
 * Maintenance of web-sites can often cause unexpected headaches, particularly
 * if the hardcoded index of an array (the columns in a DataTables instance)
 * needs to change due to an added or removed column. This plug-in function
 * will match a given string to the title of a column in the table and return
 * the column index, helping to overcome this problem.
 *
 *  @name fnGetColumnIndex
 *  @summary Get the column index by searching the column titles
 *  @author [Michael Ross](http://www.rosstechassociates.com/)
 *
 *  @param {string} sCol Column title to search for
 *  @returns {integer} Column index, or -1 if not found
 *
 *  @example
 *    var table = $('#example').dataTable();
 *    table.fnGetColumnIndex( 'Browser' );
 */

jQuery.fn.dataTableExt.oApi.fnGetColumnIndex = function ( oSettings, sCol )
{
	var cols = oSettings.aoColumns;
	for ( var x=0, xLen=cols.length ; x<xLen ; x++ )
	{
		if ( cols[x].sTitle.toLowerCase() == sCol.toLowerCase() )
		{
			return x;
		}
	}
	return -1;
};
