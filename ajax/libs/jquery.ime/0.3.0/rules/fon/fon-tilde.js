( function ( $ ) {
	'use strict';

	var fonTilde = {
		id: 'fon-tilde',
		name: 'fon-tilde',
		description: 'Fon input keyboard',
		date: '2018-05-18',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Mahuton POSSOUPE, Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.1',
		patterns: [
			[ '~D', 'Ɖ' ],
			[ '~d', 'ɖ' ],
			[ '~E', 'Ɛ' ],
			[ '~e', 'ɛ' ],
			[ '~O', 'Ɔ' ],
			[ '~o', 'ɔ' ],
			[ '~\\\\', '\u0300' ], // Combining grave accent
			[ '~/', '\u0301' ], // Combining acute accent
			[ '~\\^', '\u0302' ], // Combining circumflex accent
			[ '~-', '\u0304' ], // Combining macron
			[ '~v', '\u030C' ] // Combining caron
		]
	};

	$.ime.register( fonTilde );
}( jQuery ) );
