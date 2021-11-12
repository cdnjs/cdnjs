( function ( $ ) {
	'use strict';

	var haTilde = {
		id: 'ha-tilde',
		name: 'ha-tilde',
		description: 'Hausa input keyboard',
		date: '2018-11-30',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~B', 'Ɓ' ],
			[ '~b', 'ɓ' ],
			[ '~D', 'Ɗ' ],
			[ '~d', 'ɗ' ],
			[ '~E', 'Ɛ' ],
			[ '~e', 'ɛ' ],
			[ '~K', 'Ƙ' ],
			[ '~k', 'ƙ' ],
			[ '~R', 'R̃' ],
			[ '~r', 'r̃' ],
			[ '~Y', 'Ƴ' ],
			[ '~y', 'ƴ' ],
			[ '~\\\\', '\u0300' ], // Combining grave
			[ '~/', '\u0301' ], // Combining acute
			[ '~\\^', '\u0302' ] // Combining circumflex
		]
	};

	$.ime.register( haTilde );
}( jQuery ) );
