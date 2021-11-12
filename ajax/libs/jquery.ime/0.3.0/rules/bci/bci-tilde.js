( function ( $ ) {
	'use strict';

	var bciTilde = {
		id: 'bci-tilde',
		name: 'bci-tilde',
		description: 'Baoulé tilde keyboard',
		date: '2020-06-06',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~E', 'Ɛ' ],
			[ '~e', 'ɛ' ],
			[ '~N', 'Ɲ' ],
			[ '~n', 'ɲ' ],
			[ '~O', 'Ɔ' ],
			[ '~o', 'ɔ' ],
			[ '~/', '\u0301' ], // Combining acute
			[ '~\\\\', '\u0300' ], // Combining grave
			[ '~\\^', '\u0302' ], // Combining caron
			[ '~\\{', '\u0303' ] // Combining tilde
		]
	};

	$.ime.register( bciTilde );
}( jQuery ) );
