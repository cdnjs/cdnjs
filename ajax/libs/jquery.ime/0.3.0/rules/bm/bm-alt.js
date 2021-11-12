( function ( $ ) {
	'use strict';

	var defs = {
		id: 'bm-alt',
		name: 'Bamanankan Alt',
		description: 'Bambara input method with Alt-H/B/E/J/N/O combinations',
		date: '2017-05-29',
		URL: 'http://www.mali-pense.net/Ressources-pour-la-pratique-du.html',
		author: 'Amir E. Aharoni, based on mali-pense.net',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 1,
		maxKeyLength: 1,
		patterns_x: [
			[ 'H', '̂' ], // Combining circumflex
			[ 'h', '́' ], // Combining acute accent
			[ 'B', '̌' ], // Combining caron
			[ 'b', '̀' ], // Combining grave accent
			[ 'E', 'Ɛ' ],
			[ 'e', 'ɛ' ],
			[ 'J', 'Ɲ' ],
			[ 'j', 'ɲ' ],
			[ 'N', 'Ŋ' ],
			[ 'n', 'ŋ' ],
			[ 'O', 'Ɔ' ],
			[ 'o', 'ɔ' ]
		]
	};

	$.ime.register( defs );
}( jQuery ) );
