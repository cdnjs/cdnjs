/**
 * Return an array of table values from a particular column, with various
 * filtering options.
 *
 * DataTables 1.10+ provides the `dt-api column().data()` method, built-in to
 * the core, to provide this ability. As such, this method is marked deprecated,
 * but is available for use with legacy version of DataTables. Please use the
 * new API if you are used DataTables 1.10 or newer.
 *
 *  @name fnGetColumnData
 *  @summary Get the data from a column
 *  @author [Benedikt Forchhammer](http://mind2.de)
 *  @deprecated
 *
 *  @param {integer} iColumn Column to get data from
 *  @param {boolean} [bFiltered=true] Reduce the data set to only unique values
 *  @param {boolean} [bUnique=true] Get data from filter results only
 *  @param {boolean} [bIgnoreEmpty=true] Remove data elements which are empty
 *  @returns {array} Array of data from the column
 *
 *  @example
 *    var table = $('#example').dataTable();
 *    table.fnGetColumnData( 3 );
 */

jQuery.fn.dataTableExt.oApi.fnGetColumnData = function ( oSettings, iColumn, bUnique, bFiltered, bIgnoreEmpty ) {
	// check that we have a column id
	if ( typeof iColumn == "undefined" ) {
		return [];
	}

	// by default we only wany unique data
	if ( typeof bUnique == "undefined" ) {
		bUnique = true;
	}

	// by default we do want to only look at filtered data
	if ( typeof bFiltered == "undefined" ) {
		bFiltered = true;
	}

	// by default we do not wany to include empty values
	if ( typeof bIgnoreEmpty == "undefined" ) {
		bIgnoreEmpty = true;
	}

	// list of rows which we're going to loop through
	var aiRows;

	// use only filtered rows
	if (bFiltered === true) {
		aiRows = oSettings.aiDisplay;
	}
	// use all rows
	else {
		aiRows = oSettings.aiDisplayMaster; // all row numbers
	}

	// set up data array    
	var asResultData = [];

	for (var i=0,c=aiRows.length; i<c; i++) {
		var iRow = aiRows[i];
		var sValue = this.fnGetData(iRow, iColumn);

		// ignore empty values?
		if (bIgnoreEmpty === true && sValue.length === 0) {
			continue;
		}

		// ignore unique values?
		else if (bUnique === true && jQuery.inArray(sValue, asResultData) > -1) {
			continue;
		}

		// else push the value onto the result data array
		else {
			asResultData.push(sValue);
		}
	}

	return asResultData;
};
