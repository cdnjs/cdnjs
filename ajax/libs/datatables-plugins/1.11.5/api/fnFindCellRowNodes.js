/**
 * Much like `fnFindCellRowIndexes` this plug-in will search a table for
 * matching data (optionally the search can be restricted to a single column),
 * but in this case the returned array contains `dt-tag tr` nodes of the
 * matching rows, rather than data indexes.
 *
 *  @name fnFindCellRowNodes
 *  @summary Search for data, returning row nodes
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *
 *  @param {string} sSearch Data to search for
 *  @param {integer} [iColumn=null] Limit search to this column
 *  @returns {array} Array of `dt-tag tr` element with this data
 *
 *  @example
 *    $(document).ready(function() {
 *        var table = $('#example').dataTable();
 *    
 *        var a = table.fnFindCellRowNodes( '1.7' );    // Search all columns
 *    
 *        var b = table.fnFindCellRowNodes( '1.7', 3 ); // Search only column 3
 *    } );
 */

jQuery.fn.dataTableExt.oApi.fnFindCellRowNodes = function ( oSettings, sSearch, iColumn )
{
	var
		i,iLen, j, jLen, val,
		aOut = [], aData,
		columns = oSettings.aoColumns;

	for ( i=0, iLen=oSettings.aoData.length ; i<iLen ; i++ )
	{
		aData = oSettings.aoData[i]._aData;

		if ( iColumn === undefined )
		{
			for ( j=0, jLen=columns.length ; j<jLen ; j++ )
			{
				val = this.fnGetData(i, j);

				if ( val == sSearch )
				{
					aOut.push( oSettings.aoData[i].nTr );
				}
			}
		}
		else if (this.fnGetData(i, iColumn) == sSearch )
		{
			aOut.push( oSettings.aoData[i].nTr );
		}
	}

	return aOut;
};
