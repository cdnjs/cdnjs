/**
 * When using `-init deferRender` you might find that under a specific set of circumstances you
 * need the `-tag tr` element for a row which hasn't yet been drawn. This method can be used to
 * create the nodes for the rows which haven't yet been drawn.
 *
 *  @name rows().generate()
 *  @summary Create tr elements for rows which have not yet had their nodes created.
 *  @author [Allan Jardine](http://datatables.net)
 *  @requires DataTables 1.10+
 *
 * @returns {DataTable.Api} DataTables API instance
 *
 *  @example
 *    // Create nodes for all rows
 *    table.rows().generate();
 */

 $.fn.dataTable.Api.register( 'rows().generate()', function () {
    return this.iterator( 'row', function ( context, index ) {
      context.oApi._fnCreateTr( context, index );
    } );
} );