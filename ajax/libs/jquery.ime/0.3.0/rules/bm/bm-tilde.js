( function ( $ ) {
	'use strict';

	var bmTilde = {
		id: 'bm-tilde',
		name: 'Bamanankan tilde',
		description: 'Bamanankan tilde',
		date: '2019-05-06',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		maxKeyLength: 1,
		patterns: [
			[ '~E', 'Ɛ' ],
			[ '~e', 'ɛ' ],
			[ '~N', 'Ɲ' ],
			[ '~n', 'ɲ' ],
			[ '~G', 'Ŋ' ],
			[ '~g', 'ŋ' ],
			[ '~O', 'Ɔ' ],
			[ '~o', 'ɔ' ],
			[ '~\\\\', '\u0300' ], // Combining grave accent
			[ '~/', '\u0301' ], // Combining acute accent
			[ '~\\^', '\u0302' ], // Combining circumflex accent
			[ '~v', '\u030C' ] // Combining caron
		]
	};

	$.ime.register( bmTilde );
}( jQuery ) );
