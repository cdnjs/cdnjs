( function ( $ ) {
	'use strict';

	var kbpTilde = {
		id: 'kbp-tilde',
		name: 'Kabɩyɛ tilde',
		description: 'Kabiye input keyboard',
		date: '2018-12-18',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~D', 'Ɖ' ],
			[ '~d', 'ɖ' ],
			[ '~E', 'Ɛ' ],
			[ '~e', 'ɛ' ],
			[ '~G', 'Ɣ' ],
			[ '~g', 'ɣ' ],
			[ '~I', 'Ɩ' ],
			[ '~i', 'ɩ' ],
			[ '~N', 'Ŋ' ],
			[ '~n', 'ŋ' ],
			[ '~O', 'Ɔ' ],
			[ '~o', 'ɔ' ],
			[ '~V', 'Ʋ' ],
			[ '~v', 'ʋ' ],
			[ '~/', '\u0301' ], // Combining acute
			[ '~\\\\', '\u0300' ], // Combining grave
			[ '~\\{', '\u0303' ] // Combining tilde
		]
	};

	$.ime.register( kbpTilde );
}( jQuery ) );
