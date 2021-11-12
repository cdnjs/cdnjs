( function ( $ ) {
	'use strict';

	var sgTilde = {
		id: 'sg-tilde',
		name: 'sg-tilde',
		description: 'Sango tilde keyboard',
		date: '2019-03-28',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~\\\\', '\u0300' ], // Combining grave
			[ '~/', '\u0301' ], // Combining acute
			[ '~\\^', '\u0302' ], // Combining circumflex
			[ '~\\-', '\u0304' ], // Combining macron
			[ '~\\:', '\u0308' ], // Combining diaeresis
			[ '~v', '\u030C' ] // Combining caron
		]
	};

	$.ime.register( sgTilde );
}( jQuery ) );
