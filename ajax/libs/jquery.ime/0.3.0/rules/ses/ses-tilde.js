( function ( $ ) {
	'use strict';

	var sesTilde = {
		id: 'ses-tilde',
		name: 'ses-tilde',
		description: 'Koyraboro Senni Songhay input keyboard - tilde',
		date: '2019-01-22',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~A', 'Ã' ],
			[ '~a', 'ã' ],
			[ '~E', 'Ẽ' ],
			[ '~e', 'ẽ' ],
			[ '~I', 'Ĩ' ],
			[ '~i', 'ĩ' ],
			[ '~O', 'Õ' ],
			[ '~o', 'õ' ],
			[ '~U', 'Ũ' ],
			[ '~u', 'ũ' ],
			[ '~G', 'Ŋ' ],
			[ '~g', 'ŋ' ],
			[ '~Y', 'Ɲ' ],
			[ '~y', 'ɲ' ],
			[ '~S', 'Š' ],
			[ '~s', 'š' ],
			[ '~Z', 'Ž' ],
			[ '~z', 'ž' ],
			[ '~\\\\', '\u0300' ], // Combining grave
			[ '~/', '\u0301' ], // Combining acute
			[ '~\\^', '\u0302' ], // Combining circumflex
			[ '~v', '\u030C' ] // Combining caron
		]
	};

	$.ime.register( sesTilde );
}( jQuery ) );
