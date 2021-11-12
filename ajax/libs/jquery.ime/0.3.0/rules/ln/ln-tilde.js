( function ( $ ) {
	'use strict';

	var lnTilde = {
		id: 'ln-tilde',
		name: 'ln-tilde',
		description: 'Lingala tilde keyboard',
		date: '2019-03-28',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~E', 'Ɛ' ],
			[ '~e', 'ɛ' ],
			[ '~O', 'Ɔ' ],
			[ '~o', 'ɔ' ],
			[ '~/', '\u0301' ], // Combining acute
			[ '~\\^', '\u0302' ], // Combining circumflex
			[ '~v', '\u030C' ] // Combining caron
		]
	};

	$.ime.register( lnTilde );
}( jQuery ) );
