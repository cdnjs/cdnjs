( function ( $ ) {
	'use strict';

	var woTilde = {
		id: 'wo-tilde',
		name: 'Wolof tilde',
		description: 'Wolof tilde',
		date: '2019-05-06',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		maxKeyLength: 2,
		patterns: [
			[ '~E', 'Ë' ],
			[ '~e', 'ë' ],
			[ '~G', 'Ŋ' ],
			[ '~g', 'ŋ' ],
			[ '~n', 'ñ' ],
			[ '~N', 'Ñ' ],
			[ '~\\\\', '\u0300' ], // Combining grave
			[ '~/', '\u0301' ], // Combining acute
			[ '~:', '\u0308' ] // Combining diaeresis
		]
	};

	$.ime.register( woTilde );
}( jQuery ) );
