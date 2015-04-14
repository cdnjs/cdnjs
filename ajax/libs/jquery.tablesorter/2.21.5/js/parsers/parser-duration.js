/*! Parser: duration & countdown - updated 2/7/2015 (v2.19.0) */
/*jshint jquery:true, unused:false */
;(function($){
'use strict';

	// If any number > 9999, then set table.config.durationLength = 5
	// The below regex matches this duration example: 1y 23d 12h 44m 9s
	$.tablesorter.addParser({
		id: 'duration',
		is: function() {
			return false;
		},
		format: function(s, table) {
			var i, time,
				c = table.config,
				t = '',
				duration = '',
				len = c.durationLength || 4,
				str = new Array(len + 1).join('0'),
				labels = (c.durationLabels || '(?:years|year|y),(?:days|day|d),(?:hours|hour|h),(?:minutes|minute|min|m),(?:seconds|second|sec|s)').split(/\s*,\s*/),
				llen = labels.length;
			// build regex
			if (!c.durationRegex) {
				for (i = 0; i < llen; i++) {
					t += '(?:(\\d+)\\s*' + labels[i] + '\\s*)?';
				}
				c.durationRegex = new RegExp(t, 'i');
			}
			// remove commas from value
			time = ( c.usNumberFormat ? s.replace(/,/g, '') : s.replace( /(\d)(?:\.|\s*)(\d)/g, '$1$2') ).match(c.durationRegex);
			for (i = 1; i < llen + 1; i++) {
				duration += ( str + ( time[i] || 0 ) ).slice(-len);
			}
			return duration;
		},
		type: 'text'
	});

	/*! Countdown parser ( hh:mm:ss ) */
	/* Added 2/7/2015 (v2.19.0) - see http://stackoverflow.com/a/27023733/145346 */
	$.tablesorter.addParser({
		id: 'countdown',
		is: function () {
			return false;
		},
		format: function ( text, table ) {
			// change maxDigits to 4, if values go > 999
			// or to 5 for values > 9999, etc.
			var maxDigits = table.config.durationLength || 4,
				// prefix contains leading zeros that are tacked
				prefix = new Array( maxDigits + 1 ).join( '0' ),
				// split time into blocks
				blocks = text.split( /\s*:\s*/ ),
				len = blocks.length,
				result = [];
			// add values in reverse, so if there is only one block
			// ( e.g. '10' ), then it would be the time in seconds
			while ( len ) {
				result.push( ( prefix + ( blocks[ --len ] || 0 ) ).slice( -maxDigits ) );
			}
			// reverse the results and join them
			return result.length ? result.reverse().join( '' ) : text;
		},
		type: 'text'
	});

})(jQuery);
