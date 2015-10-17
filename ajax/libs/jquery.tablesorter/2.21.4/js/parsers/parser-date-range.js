/*! Parser: date ranges - updated 2/23/2015 (v2.21.0) */
/* Include the 'widget-filter-type-insideRange.js' to filter ranges */
/*jshint jquery:true */
;(function($){
'use strict';

	var regex = {
		mdy        : /(\d{1,2}[-\s]\d{1,2}[-\s]\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/gi,

		dmy        : /(\d{1,2}[-\s]\d{1,2}[-\s]\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/gi,
		dmyreplace : /(\d{1,2})[-\s](\d{1,2})[-\s](\d{4})/,

		ymd        : /(\d{4}[-\s]\d{1,2}[-\s]\d{1,2}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/gi,
		ymdreplace : /(\d{4})[-\s](\d{1,2})[-\s](\d{1,2})/
	};

	/*! date-range MMDDYYYY *//* (2/15/2000 - 5/18/2000) */
	$.tablesorter.addParser({
		id: 'date-range-mdy',
		is: function () {
			return false;
		},
		format: function (text) {
			var date, str, i, len,
				parsed = [];
			str = text.replace( /\s+/g, ' ' ).replace( /[\/\-.,]/g, '-' ).match( regex.mdy );
			len = str && str.length;
			// work on dates, even if there is no range
			if ( len ) {
				for (i = 0; i < len; i++) {
					date = new Date( str[i] );
					parsed.push( date instanceof Date && isFinite(date) ? date.getTime() : str[i] );
				}
				// sort from min to max
				return parsed.sort().join( ' - ' );
			}
			return text;
		},
		type: 'text'
	});

	/*! date-range DDMMYYYY *//* (15/2/2000 - 18/5/2000) */
	$.tablesorter.addParser({
		id: 'date-range-dmy',
		is: function () {
			return false;
		},
		format: function (text) {
			var date, str, i, len,
				parsed = [];
			str = text.replace( /\s+/g, ' ' ).replace( /[\/\-.,]/g, '-' ).match( regex.dmy );
			len = str && str.length;
			if ( len ) {
				for (i = 0; i < len; i++) {
					date = new Date( ( '' + str[i] ).replace( regex.dmyreplace, '$2/$1/$3' ) );
					parsed.push( date instanceof Date && isFinite(date) ? date.getTime() : str[i] );
				}
				// sort from min to max
				return parsed.sort().join( ' - ' );
			}
			return text;
		},
		type: 'text'
	});

	/*! date-range DDMMYYYY *//* (2000/2/15 - 2000/5/18) */
	$.tablesorter.addParser({
		id: 'date-range-ymd',
		is: function () {
			return false;
		},
		format: function (text) {
			var date, str, i, len,
				parsed = [];
			str = text.replace( /\s+/g, ' ' ).replace( /[\/\-.,]/g, '-' ).match( regex.ymd );
			len = str && str.length;
			if ( len ) {
				for (i = 0; i < len; i++) {
					date = new Date( ( '' + str[i] ).replace( regex.ymdreplace, '$2/$3/$1' ) );
					parsed.push( date instanceof Date && isFinite(date) ? date.getTime() : str[i] );
				}
				// sort from min to max
				return parsed.sort().join( ' - ' );
			}
			return text;
		},
		type: 'text'
	});

})(jQuery);
