( function ( $ ) {
	'use strict';

	var mapping = {
		id: 'lud-transliteration',
		name: 'lud',
		description: 'Ludic transliteration',
		date: '2014-06-14',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Niklas Laxström',
		license: 'MIT',
		version: '1.0',
		contextLength: 0,
		maxKeyLength: 2,
		patterns: [
			[ 'ch', 'č' ],
			[ 'C[hH]', 'Č' ],
			[ 'sh', 'š' ],
			[ 'S[hH]', 'Š' ],
			[ 'zh', 'ž' ],
			[ 'Z[hH]', 'Ž' ],
			[ 'y', 'ü' ],
			[ 'Y', 'Ü' ],
			[ '\'', '’' ]
		]
	};

	$.ime.register( mapping );
}( jQuery ) );
