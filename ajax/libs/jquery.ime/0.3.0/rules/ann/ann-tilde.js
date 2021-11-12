( function ( $ ) {
	'use strict';

	var annTilde = {
		id: 'ann-tilde',
		name: 'ann-tilde',
		description: 'Obolo input keyboard',
		date: '2020-11-03',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.1',
		patterns: [
			[ '~N', 'N̄' ],
			[ '~n', 'n̄' ],
			[ '~O', 'Ọ' ],
			[ '~o', 'ọ' ],
			[ '~S', 'Ṣ' ],
			[ '~s', 'ṣ' ],
			[ '~\\\\', '\u0300' ], // Combining grave accent
			[ '~/', '\u0301' ], // Combining acute accent
			[ '~\\^', '\u0302' ], // Combining circumflex accent
			[ '~-', '\u0304' ], // Combining macron
			[ '~v', '\u030C' ], // Combining caron
			[ '~\\.', '\u0323' ] // Combining dot below
		]
	};

	$.ime.register( annTilde );
}( jQuery ) );
