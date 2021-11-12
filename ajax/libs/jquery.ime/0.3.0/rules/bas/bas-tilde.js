( function ( $ ) {
	'use strict';

	var basTilde = {
		id: 'bas-tilde',
		name: 'bas-tilde',
		description: 'Basaa tilde keyboard',
		date: '2021-03-31',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~B', 'Ɓ' ],
			[ '~b', 'ɓ' ],
			[ '~E', 'Ɛ' ],
			[ '~e', 'ɛ' ],
			[ '~N', 'Ŋ' ],
			[ '~n', 'ŋ' ],
			[ '~O', 'Ɔ' ],
			[ '~o', 'ɔ' ],
			[ '~\\\\', '\u0300' ], // Combining grave accent
			[ '~/', '\u0301' ], // Combining acute accent
			[ '~\\^', '\u0302' ], // Combining circumflex accent
			[ '~-', '\u0304' ], // Combining macron
			[ '~v', '\u030C' ] // Combining caron
		]
	};

	$.ime.register( basTilde );
}( jQuery ) );
