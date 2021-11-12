( function ( $ ) {
	'use strict';

	var yoTilde = {
		id: 'yo-tilde',
		name: 'yo-tilde',
		description: 'Yoruba input keyboard - tilde',
		date: '2018-11-30',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~E', 'Ẹ' ],
			[ '~e', 'ẹ' ],
			[ '~O', 'Ọ' ],
			[ '~o', 'ọ' ],
			[ '~S', 'Ṣ' ],
			[ '~s', 'ṣ' ],
			[ '~\\\\', '\u0300' ], // Combining grave
			[ '~/', '\u0301' ], // Combining acute
			[ '~\\^', '\u0302' ], // Combining circumflex
			[ '~\\-', '\u0304' ], // Combining macron
			[ '~v', '\u030C' ] // Combining caron
		]
	};

	$.ime.register( yoTilde );
}( jQuery ) );
