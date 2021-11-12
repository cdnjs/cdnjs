( function ( $ ) {
	'use strict';

	var nmzTilde = {
		id: 'nmz-tilde',
		name: 'nmz-tilde',
		description: 'Nawdm tilde keyboard',
		date: '2021-11-01',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~E', 'Ɛ' ],
			[ '~e', 'ɛ' ],
			[ '~H', 'Ĥ' ],
			[ '~h', 'ɦ' ],
			[ '~N', 'Ŋ' ],
			[ '~n', 'ŋ' ],
			[ '~O', 'Ɔ' ],
			[ '~o', 'ɔ' ],
			[ '~\\\\', '\u0300' ], // Combining grave accent
			[ '~/', '\u0301' ], // Combining acute accent
			[ '~:', '\u0308' ] // Combining diaeresis
		]
	};

	$.ime.register( nmzTilde );
}( jQuery ) );
