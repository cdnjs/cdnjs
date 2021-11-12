( function ( $ ) {
	'use strict';

	var afTilde = {
		id: 'af-tilde',
		name: 'Afrikaans tilde',
		description: 'Afrikaans tilde',
		date: '2019-04-30',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		maxKeyLength: 2,
		patterns: [
			[ "~\\'", '’' ], // Initial apostrophe
			[ '~\\\\', '\u0300' ], // Combining grave accent
			[ '~/', '\u0301' ], // Combining acute accent
			[ '~\\^', '\u0302' ], // Combining circumflex accent
			[ '~:', '\u0308' ] // Combining diaeresis
		]
	};

	$.ime.register( afTilde );
}( jQuery ) );
