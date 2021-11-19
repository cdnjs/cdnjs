/**
 *  This plugin jumps to the right page of the DataTable to show the required row
 *
 *  @version 1.0
 *  @name row().show()
 *  @summary See the row in datable by display the right pagination page
 *  @author [Edouard Labre](http://www.edouardlabre.com)
 *
 *  @param {void} a row must be selected
 *  @returns {DataTables.Api.Rows} DataTables Rows API instance
 *
 *  @example
 *    // Add an element to a huge table and go to the right pagination page
 *    var table = $('#example').DataTable();
 *    var new_row = {
 *      DT_RowId: 'row_example',
 *      name: 'example',
 *      value: 'an example row'
 *    };
 *
 *    table.row.add( new_row ).draw().show().draw(false);
 */
$.fn.dataTable.Api.register('row().show()', function() {
	var page_info = this.table().page.info();
	// Get row index
	var new_row_index = this.index();
	// Row position
	var row_position = this.table()
		.rows({ search: 'applied' })[0]
		.indexOf(new_row_index);
	// Already on right page ?
	if ((row_position >= page_info.start && row_position < page_info.end) || row_position < 0) {
		// Return row object
		return this;
	}
	// Find page number
	var page_to_display = Math.floor(row_position / this.table().page.len());
	// Go to that page
	this.table().page(page_to_display);
	// Return row object
	return this;
});
