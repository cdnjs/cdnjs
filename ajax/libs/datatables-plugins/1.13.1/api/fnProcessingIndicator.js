/**
 * When doing some heavy processing of your own (for example using fnOpen with
 * data loading from the server) it can be useful to make use of the
 * 'processing' indicator built-into DataTables. This plug-in function exposes
 * the internal DataTables function so it can be used for exactly this.
 *
 *  @name fnProcessingIndicator
 *  @summary Show and hide the DataTables processing element through the API.
 *  @author Allan Chappell
 *
 *  @param {boolean} [onoff=true] Show (`true`) or hide (`false`) the processing
 *    element.
 *
 *  @example
 *    var table = $('#example').dataTable();
 *    table.fnProcessingIndicator();      // On
 *    table.fnProcessingIndicator(false); // Off
 */

jQuery.fn.dataTableExt.oApi.fnProcessingIndicator = function ( oSettings, onoff )
{
	if ( onoff === undefined ) {
		onoff = true;
	}
	this.oApi._fnProcessingDisplay( oSettings, onoff );
};
