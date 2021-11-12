( function ( $ ) {
	'use strict';

	var kabTilde = {
		id: 'kab-tilde',
		name: 'kab-tilde',
		description: 'Kabyle Latin tilde keyboard',
		date: '2018-11-30',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~C', 'C\u030C' ], // C with combining caron
			[ '~c', 'c\u030C' ], // c with combining caron
			[ '~D', 'D\u0323' ], // D with combining dot below
			[ '~d', 'd\u0323' ], // d with combining dot below
			[ '~E', 'Ɛ' ],
			[ '~e', 'ɛ' ],
			[ '~G', 'G\u030C' ], // G with combining caron
			[ '~g', 'g\u030C' ], // g with combining caron
			[ '~Y', 'Ɣ' ],
			[ '~y', 'ɣ' ],
			[ '~H', 'H\u0323' ], // H with combining dot below
			[ '~h', 'h\u0323' ], // h with combining dot below
			// ~R is not provided to avoided confusion between caron and dot below
			[ '~S', 'S\u0323' ], // S with combining dot below
			[ '~s', 's\u0323' ], // s with combining dot below
			[ '~T', 'T\u0323' ], // T with combining dot below
			[ '~t', 't\u0323' ], // t with combining dot below
			[ '~Z', 'Z\u0323' ], // Z with combining dot below
			[ '~z', 'z\u0323' ], // z with combining dot below
			[ '~w', 'ʷ' ],
			[ '~v', '\u030C' ], // Combining caron
			[ '~\\.', '\u0323' ], // Combining dot below
			[ '~,', '\u0327' ] // Combining cedilla
		]
	};

	$.ime.register( kabTilde );
}( jQuery ) );
