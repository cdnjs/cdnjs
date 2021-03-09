/**
 * Add a new row to the table and display it on the screen by jumping the
 * pagination to the required location. This function also returns an object
 * with the added `dt-tag TR` element and it's index in `aoData` such that you
 * could provide an effect (fade for example) to show which row has been added.
 *
 * This function is a drop in replacement for `fnAddData` with one important
 * exception, it will only take a 1D array or an object, and not a 2D array
 * (i.e. it will not add multiple rows like `fnAddData`).
 *
 *  @name fnAddDataAndDisplay
 *  @summary Add data and shift the paging to display it immediately
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *
 *  @param {data} aData Data to add to the table
 *  @returns {object} Object with `nTr` and `iPos` parameters, where the former
 *    is the added `dt-tag tr` element and the latter is the row's index.
 *
 *  @example
 *    $(document).ready(function() {
 *        var table = $('#example').dataTable();
 *        table.fnAddDataAndDisplay( [ 1, 2, 3, 4, 5, ... ] );
 *    } );
 */

jQuery.fn.dataTableExt.oApi.fnAddDataAndDisplay = function ( oSettings, aData )
{
	/* Add the data */
	var iAdded = this.oApi._fnAddData( oSettings, aData );
	var nAdded = oSettings.aoData[ iAdded ].nTr;

	/* Need to re-filter and re-sort the table to get positioning correct, not perfect
	 * as this will actually redraw the table on screen, but the update should be so fast (and
	 * possibly not alter what is already on display) that the user will not notice
	 */
	this.oApi._fnReDraw( oSettings );

	/* Find it's position in the table */
	var iPos = -1;
	for( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )
	{
		if( oSettings.aoData[ oSettings.aiDisplay[i] ].nTr == nAdded )
		{
			iPos = i;
			break;
		}
	}

	/* Get starting point, taking account of paging */
	if( iPos >= 0 )
	{
		oSettings._iDisplayStart = ( Math.floor(i / oSettings._iDisplayLength) ) * oSettings._iDisplayLength;
		if ( this.oApi._fnCalculateEnd ) {
			this.oApi._fnCalculateEnd( oSettings );
		}
	}

	this.oApi._fnDraw( oSettings );
	return {
		"nTr": nAdded,
		"iPos": iAdded
	};
};
