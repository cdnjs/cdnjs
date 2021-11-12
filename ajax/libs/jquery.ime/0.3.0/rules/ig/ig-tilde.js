( function ( $ ) {
	'use strict';

	var igTilde = {
		id: 'ig-tilde',
		name: 'ig-tilde',
		description: 'Igbo input keyboard',
		date: '2018-11-30',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~I', 'Ị' ],
			[ '~i', 'ị' ],
			[ '~N', 'Ṅ' ],
			[ '~n', 'ṅ' ],
			[ '~O', 'Ọ' ],
			[ '~o', 'ọ' ],
			[ '~U', 'Ụ' ],
			[ '~u', 'ụ' ],
			[ '~\\\\', '\u0300' ], // Combining grave
			[ '~/', '\u0301' ], // Combining acute
			[ '~\\-', '\u0304' ] // Combining macron
		]
	};

	$.ime.register( igTilde );
}( jQuery ) );
