( function ( $ ) {
	'use strict';

	var nqoTransliteration = {
		id: 'nqo-transliteration',
		name: "N'Ko transliteration",
		description: "N'Ko transliteration",
		date: '2019-04-26',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		maxKeyLength: 3,
		patterns: [
			// Sequences
			[ 'ߣn', 'ߠ' ], // nn
			[ 'ߢw', 'ߧ' ], // nyw
			[ 'ߣy', 'ߢ' ], // ny
			[
				'ߖ\\/',
				'ߨ'
			], // j/
			[
				'ߗ\\/',
				'ߩ'
			], // c/
			[
				'ߙ\\/',
				'ߪ'
			], // r/
			[ '\u07F2\u07F2\\.', '߷' ], // ...
			[ '\u07EB-', '-' ], // --
			[ '\u07EC~', '~' ], // ~~
			[ '\\\\\\?', '?' ], // \?
			[ '\\?', '؟' ],

			// Unshifted

			[ '`', 'ߑ' ],
			[ '1', '߁' ],
			[ '2', '߂' ],
			[ '3', '߃' ],
			[ '4', '߄' ],
			[ '5', '߅' ],
			[ '6', '߆' ],
			[ '7', '߇' ],
			[ '8', '߈' ],
			[ '9', '߉' ],
			[ '0', '߀' ],

			[ 'w', 'ߥ' ],
			[ 'e', 'ߍ' ],
			[ 'r', 'ߙ' ],
			[ 't', 'ߕ' ],
			[ 'y', 'ߦ' ],
			[ 'u', 'ߎ' ],
			[ 'i', 'ߌ' ],
			[ 'o', 'ߐ' ],
			[ 'p', 'ߔ' ],

			[ 'a', 'ߊ' ],
			[ 's', 'ߛ' ],
			[ 'd', 'ߘ' ],
			[ 'f', 'ߝ' ],
			[ 'g', 'ߜ' ],
			[ 'h', 'ߤ' ],
			[ 'j', 'ߖ' ],
			[ 'k', 'ߞ' ],
			[ 'l', 'ߟ' ],

			[ 'c', 'ߗ' ],
			[ 'b', 'ߓ' ],
			[ 'n', 'ߣ' ],
			[ 'm', 'ߡ' ],

			// Shifted

			[ '~', '\u07EC' ],
			[ '!', '߹' ],
			[ '#', '\u07F0' ],
			[ '%', '\u07F3' ],

			[ 'E', 'ߋ' ],
			[ 'R', 'ߚ' ],
			[ 'O', 'ߏ' ],
			[ 'N', 'ߒ' ],
			[ '<', '\u07F1' ],
			[ '>', '\u07EF' ],
			[ '\u07EE\\.', '\u07ED' ], // ^.
			[ '\\^', '\u07EE' ], // ^
			[ '߸\\/', 'ߺ' ], // ,/
			[ '\\.', '\u07F2' ], // Combining nasalization mark ("dot below")
			[ ',', '߸' ], // Comma
			[ '/', '߶' ],
			[ "'", 'ߴ' ], // High tone apostrophe
			[ '"', 'ߵ' ], // Low tone apostrophe
			[ '-', '\u07EB' ] // Combining short high tone ("macron")
		]
	};

	$.ime.register( nqoTransliteration );
}( jQuery ) );
