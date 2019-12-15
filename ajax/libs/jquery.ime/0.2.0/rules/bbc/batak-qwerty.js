( function ( $ ) {
	'use strict';

	var batakQwertyKbd = {
		id: 'batak-qwerty',
		name: 'Batak QWERTY',
		description: 'QWERTY-based Batak keyboard',
		date: '2014-04-20',
		URL: 'http://evertype.com/fonts/batak/',
		author: 'design by Michael Everson, implementation by Amir E. Aharoni',
		version: '1.0',
		patterns: [
			[ 'q', 'ᯥ' ],
			[ 'w', 'ᯋ' ],
			[ 'e', 'ᯧ' ],
			[ 'r', 'ᯒ' ],
			[ 't', 'ᯖ' ],
			[ 'y', 'ᯛ' ],
			[ 'u', 'ᯮ' ],
			[ 'i', 'ᯪ' ],
			[ 'o', 'ᯬ' ],
			[ 'p', 'ᯇ' ],

			[ 'a', 'ᯀ' ],
			[ 's', 'ᯘ' ],
			[ 'd', 'ᯑ' ],
			[ 'f', '᯲' ],
			[ 'g', 'ᯎ' ],
			[ 'h', 'ᯂ' ],
			[ 'j', 'ᯐ' ],
			[ 'k', 'ᯤ' ],
			[ 'l', 'ᯞ' ],

			[ 'z', 'ᯝ' ],
			[ 'x', 'ᯢ' ],
			[ 'c', 'ᯡ' ],
			[ 'v', 'ᯣ' ],
			[ 'b', 'ᯅ' ],
			[ 'n', 'ᯉ' ],
			[ 'm', 'ᯔ' ],

			[ 'Q', 'ᯍ' ],
			[ 'W', 'ᯌ' ],
			[ 'E', 'ᯨ' ],
			[ 'R', 'ᯓ' ],
			[ 'T', 'ᯗ' ],
			[ 'Y', 'ᯜ' ],
			[ 'U', 'ᯯ' ],
			[ 'I', 'ᯫ' ],
			[ 'O', 'ᯭ' ],
			[ 'P', 'ᯈ' ],

			[ 'A', 'ᯁ' ],
			[ 'S', 'ᯙ' ],

			[ 'F', '᯳' ],
			[ 'G', 'ᯏ' ],
			[ 'H', 'ᯃ' ],
			[ 'J', 'ᯄ' ],

			[ 'L', 'ᯟ' ],

			[ 'Z', 'ᯚ' ],

			[ 'B', 'ᯆ' ],
			[ 'N', 'ᯊ' ],
			[ 'M', 'ᯕ' ],

			[ '`', 'ᯠ' ],
			[ '=', 'ᯱ' ],
			[ '\\+', '᯦' ],
			[ '-', '' ],
			[ '_', 'ᯩ' ],

			[ 'B', 'ᯆ' ]
		],
		patterns_x: [
			[ '4', '᯼' ],
			[ '5', '᯽' ],
			[ '6', '᯾' ],
			[ '7', '᯿' ],

			[ 'w', 'ᯍ' ],
			[ '`', '`' ]
		]
	};

	$.ime.register( batakQwertyKbd );
}( jQuery ) );
