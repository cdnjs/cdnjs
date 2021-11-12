( function ( $ ) {
	'use strict';

	var bkmTilde = {
		id: 'bkm-tilde',
		name: 'bkm-tilde',
		description: 'Kom tilde keyboard',
		date: '2021-03-31',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		maxKeyLength: 2,
		patterns: [
			[ 'AE', 'Æ' ],
			[ 'Ae', 'Æ' ],
			[ 'ae', 'æ' ],
			[ 'A~E', 'AE' ],
			[ 'A~e', 'Ae' ],
			[ 'a~e', 'ae' ],
			[ '~A', 'Æ' ],
			[ '~a', 'æ' ],
			[ '~I', 'Ɨ' ],
			[ '~i', 'ɨ' ],
			[ '~N', 'Ŋ' ],
			[ '~n', 'ŋ' ],
			[ 'OE', 'Œ' ],
			[ 'Oe', 'Œ' ],
			[ 'oe', 'œ' ],
			[ 'O~E', 'OE' ],
			[ 'O~e', 'Oe' ],
			[ 'o~e', 'oe' ],
			[ '~O', 'Œ' ],
			[ '~o', 'œ' ],
			[ '~\\\\', '\u0300' ], // Combining grave accent
			[ '~\\^', '\u0302' ] // Combining circumflex accent
		]
	};

	$.ime.register( bkmTilde );
}( jQuery ) );
