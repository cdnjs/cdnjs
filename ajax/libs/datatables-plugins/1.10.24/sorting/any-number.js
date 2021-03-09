/**
 * Sorts columns by any number, ignoring text. This plugin is useful if you have 
 * mixed content in a column, but still want to sort by numbers. Any number means
 *
 *  - integers, like 42
 *  - decimal numbers, like 42.42 / 42,42
 *  - signed numbers, like -42.42 / +42.42 
 *  - scientific numbers, like 42.42e+10
 *  - illegal numbers, like 042, which is considered as 42,
 *  - currency numbers, like €42,00 
 *
 * Plain text is ignored; columns with no recognizable numerical content 
 * is pushed to the bottom of the table, both ascending and descending.
 *
 *  @demo http://jsfiddle.net/vkkL5tv7/
 * 
 *  @name Any number
 *  @summary Sort column with mixed numerical content by number
 *  @author [david konrad](davidkonrad at gmail com)
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'any-number', targets : 0 }
 *       ]
 *    } );

 *
 */
 
_anyNumberSort = function(a, b, high) {
	var reg = /[+-]?((\d+(\.\d*)?)|\.\d+)([eE][+-]?[0-9]+)?/;        
	a = a.replace(',','.').match(reg);
	a = a !== null ? parseFloat(a[0]) : high;
	b = b.replace(',','.').match(reg);
	b = b !== null ? parseFloat(b[0]) : high;
	return ((a < b) ? -1 : ((a > b) ? 1 : 0));    
}

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"any-number-asc": function (a, b) {
		return _anyNumberSort(a, b, Number.POSITIVE_INFINITY);
	},
	"any-number-desc": function (a, b) {
		return _anyNumberSort(a, b, Number.NEGATIVE_INFINITY) * -1;
	}
});


