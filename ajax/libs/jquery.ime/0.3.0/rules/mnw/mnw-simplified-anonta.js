( function ( $ ) {
	'use strict';

	var mnwAnonta = {
		id: 'mnw-simplified-anonta',
		name: 'Mon Simplified Anonta',
		description: 'Mon Simplified Anonta keyboard layout',
		date: '2021-11-08',
		URL: 'https://help.keyman.com/keyboard/mon_anonta/1.0.1/mon_anonta',
		author: 'Amir E. Aharoni, based on Keyman',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '`', 'ၝ' ],
			[ '~', 'ဎ' ],
			[ '1', '၁' ],
			[ '!', 'ဍ' ],
			[ '2', '၂' ],
			[ '@', 'ဏ္ဍ' ],
			[ '3', '၃' ],
			[ '#', 'ဋ' ],
			[ '4', '၄' ],
			[ '\\$', '\u102D\u1032' ], // SIGN I and SIGN AI
			[ '5', '၅' ],
			[ '6', '၆' ],
			[ '\\^', '\u1035' ], // SIGN E ABOVE
			[ '7', '၇' ],
			[ '&', 'ရ' ],
			[ '8', '၈' ],
			[ '\\*', 'ဂ' ],
			[ '9', '၉' ],
			[ '0', '၀' ],
			[ '_', '×' ],

			[ 'q', 'ဆ' ],
			[ 'Q', 'ၛ' ],
			[ 'w', 'တ' ],
			[ 'W', 'ဝ' ],
			[ 'e', 'န' ],
			[ 'E', 'ဣ' ],
			[ 'r', 'မ' ],
			[ 'R', '\u105F' ], // MON MON MEDIAL MA
			[ 't', 'အ' ],
			[ 'T', '\u1033' ], // MON II
			[ 'y', 'ပ' ],
			[ 'Y', '\u1060' ], // MON MEDIAL LA
			[ 'u', 'က' ],
			[ 'U', 'ဥ' ],
			[ 'i', 'ၚ' ],
			[ 'I', '၎' ],
			[ 'o', 'သ' ],
			[ 'O', 'ဿ' ],
			[ 'p', 'စ' ],
			[ 'P', 'ဏ' ],
			[ '\\[', 'ဟ' ],
			[ '\\{', 'ဨ' ],
			[ '\\]', 'ဩ' ],
			[ '\\}', 'အဴ' ], // A and SIGN MON O
			[ '\\\\', 'ၑ' ],
			[ '\\|', 'ဋ္ဌ' ], // TTA and VIRAMA and TTHA

			[ 'a', '\u1031' ], // SIGN E
			[ 'A', 'ဗ' ],
			[ 's', '\u103B' ], // SIGN MEDIAL YA
			[ 'S', '\u103E' ], // SIGN MEDIAL HA
			[ 'd', '\u102D' ], // SIGN I
			[ 'D', '\u102E' ], // SIGN II
			[ 'f', '\u103A' ], // ASAT
			[ 'F', '\u1039' ], // VIRAMA
			[ 'g', '\u102B' ], // TALL AA
			[ 'G', '\u103D' ], // MEDIAL WA
			[ 'h', '\u1034' ], // SIGN MON O
			[ 'H', '\u1036' ], // ANUSVARA
			[ 'j', '\u103C' ], // SIGN MEDIAL RA
			[ 'J', '\u1032' ], // SIGN AI
			[ 'k', '\u102F' ], // SIGN U
			[ 'K', 'ဒ' ],
			[ 'l', '\u1030' ], // SIGN UU
			[ 'L', 'ဓ' ],
			[ ';', '\u1038' ], // VISARGA

			[ 'z', 'ဖ' ],
			[ 'Z', 'ဇ' ],
			[ 'x', 'ထ' ],
			[ 'X', 'ဌ' ],
			[ 'c', 'ခ' ],
			[ 'C', 'ဃ' ],
			[ 'v', 'လ' ],
			[ 'V', 'ဠ' ],
			[ 'b', 'ဘ' ],
			[ 'B', 'ၐ' ],
			[ 'n', 'ည' ],
			[ 'N', 'ဉ' ],
			[ 'm', '\u102C' ], // SIGN AA
			[ 'M', '÷' ],
			[ ',', 'ယ' ],
			[ '\\<', '\u105E' ], // MON MEDIAL NA
			[ '\\.', 'ၜ' ],
			[ '/', '။' ],
			[ '\\?', '၊' ]
		],
	};

	$.ime.register( mnwAnonta );
}( jQuery ) );
