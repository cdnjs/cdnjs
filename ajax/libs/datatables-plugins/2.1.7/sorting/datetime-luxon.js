/**
 * This plug-in for DataTables represents the ultimate option in extensibility
 * for sorting date / time strings correctly. It uses
 * [luxon](https://moment.github.io/luxon/) to create automatic type detection and
 * sorting plug-ins for DataTables based on a given format. This way, DataTables
 * will automatically detect your temporal information and sort it correctly.
 *
 * For usage instructions, please see the DataTables blog
 * post that [introduces it](//datatables.net/blog/2014-12-18).
 *
 * @name Ultimate Date / Time sorting
 * @summary Sort date and time in any format using luxon
 * @author [Allan Jardine](//datatables.net)
 * @depends DataTables 1.10+, luxon.js 1.0+
 * @deprecated
 *
 * @example
 *    $.fn.dataTable.luxon( 'HH:mm MMM d, yy' );
 *    $.fn.dataTable.luxon( 'EEE, MMMM Do, yyyy' );
 *
 *    $('#example').DataTable();
 */

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery", "luxon", "datatables.net"], factory);
	} else {
		factory(jQuery, luxon);
	}
}(function ($, luxon) {

function strip (d) {
	// Strip HTML tags and newline characters if possible
	d = d.replace(/(<.*?>)|(\r?\n|\r)/g, '');

	// Strip out surrounding white space
	d = d.trim();

	return d;
}

$.fn.dataTable.luxon = function ( format, locale, reverseEmpties ) {
	var types = $.fn.dataTable.ext.type;

	// Add type detection
	types.detect.unshift( function ( d ) {
		// Null values are acceptable
		if ( d === null ) {
			return 'luxon-'+format;
                }
		if ( typeof d === 'string' ) {
			d = strip(d);

			// Empty values are acceptable
			if ( d === '' ) {
				return 'luxon-'+format;
			}

			return luxon.DateTime.fromFormat( d, format).isValid ?
				'luxon-'+format :
				null;
		} else {
			return null;
                }
	} );

	// Add sorting method - use an integer for the sorting
	types.order[ 'luxon-'+format+'-pre' ] = function ( d ) {
		if ( typeof d === 'string' ) {
			d = strip(d);

			return !luxon.DateTime.fromFormat(d, format).isValid ?
				(reverseEmpties ? -Infinity : Infinity) :
				parseInt( luxon.DateTime.fromFormat( d, format).ts, 10 );
		} else {
			return null;
                }
	};
};

}));
