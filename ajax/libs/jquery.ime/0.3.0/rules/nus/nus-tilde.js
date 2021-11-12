( function ( $ ) {
	'use strict';

	var nusTilde = {
		id: 'nus-tilde',
		name: 'nus-tilde',
		description: 'Nuer input keyboard',
		date: '2021-01-18',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~E', 'Ɛ' ],
			[ '~e', 'ɛ' ],
			[ '~G', 'Ɣ' ],
			[ '~g', 'ɣ' ],
			[ '~N', 'Ŋ' ],
			[ '~n', 'ŋ' ],
			[ '~O', 'Ɔ' ],
			[ '~o', 'ɔ' ],
			[ '~:', '\u0308' ], // Combining diaeresis
			[ '~_', '\u0331' ] // Combining macron below
		]
	};

	$.ime.register( nusTilde );
}( jQuery ) );
