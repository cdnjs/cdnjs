/**
 * Sorts a column containing Farsi numbers. Farsi numbers can easily be 
 * mapped 1:1 to latin numbers - ۱ = 1, ۲ = 2, ۱۲ = 12 and so on.
 *
 *
 *  @name Farsi numbers
 *  @summary Sorts columns containing UTF8 Farsi numbers
 *  @author [Behrooz Janfada](behrooz dot janfada at gmail com)
 *
 *  @example
 *    $('#example').DataTable( {
 *       columnDefs: [
 *         { type: 'farsi-numbers', targets: 0 }
 *       ]
 *    } );
 */

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"farsi-numbers-pre" : function(a) {
		function farsiToLatin(farsi) {
			switch(farsi) {
				case "۰": return 0; break;
				case "۱": return 1; break;
				case "۲": return 2; break;
				case "۳": return 3; break;
				case "۴": return 4; break;
				case "۵": return 5; break;
				case "۶": return 6; break;
				case "۷": return 7; break;
				case "۸": return 8; break;
				case "۹": return 9; break;        
				default : return 0; break;
			}        
		}
		var latin = '', i = 0;
		for (i; i<a.length; i++) {
			latin += farsiToLatin(a.charAt(i))
		}
		return parseInt(latin)
	},

	"farsi-numbers-asc": function(a, b) {
		return ((a < b) ? -1 : ((a > b) ? 1 : 0))
	},

	"farsi-numbers-desc": function(a, b) {
		return ((a < b) ? 1 : ((a > b) ? -1 : 0))
	}

} );
