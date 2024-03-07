/**
 * Set the point at which DataTables will start it's display of data in the
 * table.
 *
 *  @name fnDisplayStart
 *  @summary Change the table's paging display start.
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *  @deprecated
 *
 *  @param {integer} iStart Display start index.
 *  @param {boolean} [bRedraw=false] Indicate if the table should do a redraw or not.
 *
 *  @example
 *    var table = $('#example').dataTable();
 *    table.fnDisplayStart( 21 );
 */

jQuery.fn.dataTableExt.oApi.fnDisplayStart = function ( oSettings, iStart, bRedraw )
{
    if ( typeof bRedraw == 'undefined' ) {
        bRedraw = true;
    }

    oSettings._iDisplayStart = iStart;
    if ( oSettings.oApi._fnCalculateEnd ) {
        oSettings.oApi._fnCalculateEnd( oSettings );
    }

    if ( bRedraw ) {
        oSettings.oApi._fnDraw( oSettings );
    }
};
