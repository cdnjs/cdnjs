( function ( $ ) {
	'use strict';

	var lutTulalip = {
		id: 'lut-tulalip',
		name: 'Lushootseed Tulalip',
		description: 'Lushootseed Keyboard with Tulalip Layout',
		date: '2014-03-01',
		URL: 'https://github.com/jcrowgey/jquery.ime',
		author: 'Joshua Crowgey, jcrowgey@u.washington.edu',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ 'e', 'ə' ], // U+0259
			[ 'r', 'š' ], // U+0161
			[ 'o', 'ʷ' ], // U+02B7
			[ 'f', 'ʔ' ], // U+0294
			[ 'j', 'ǰ' ], // U+01F0
			[ ';', 'ɬ' ], // U+026C
			[ 'z', 'x̌' ], // U+0078 U+030C
			[ 'v', 'č' ], // U+010D
			// shifted
			[ 'Q', 'q̓' ], // U+0071 U+0313
			[ 'W', 'w̓' ], // U+0077 U+0313
			[ 'E', 'q̓ʷ' ], // U+0071 U+0313 U+02B7
			[ 'R', '√' ], // U+221A
			[ 'T', 't̕' ], // U+0074 U+0315
			[ 'Y', 'y̓' ], // U+0079 U+0313
			[ 'U', '' ], // nul
			[ 'I', 'kʷ' ], // U+006B U+02B7
			[ 'O', '' ], // nul
			[ 'P', 'p̓' ], // U+0070 U+0313
			// middle row shifted
			[ 'A', 'qʷ' ], // U+0071 U+02B7
			[ 'S', '' ], // nul
			[ 'D', 'dᶻ' ], // U+0064 U+1DBB
			[ 'F', '' ], // nul
			[ 'G', 'gʷ' ], // U+0067 U+02B7
			[ 'H', '' ], // nul
			[ 'J', 'k̓ʷ' ], // U+006B U+0313 U+02B7
			[ 'K', 'k̓' ], // U+006B U+0313
			[ 'L', 'l̕' ], // U+006C U+0315
			[ ':', 'ƛ̕' ], // U+019B U+0315
			// bottom row shifted
			[ 'Z', 'x̌ʷ' ], // U+0078 U+030C U+02B7
			[ 'X', 'xʷ' ], // U+0078 U+02B7
			[ 'C', 'c̓' ], // U+0063 U+0313
			[ 'V', 'č̓' ], // U+010D U+0313
			[ 'B', 'b̓' ], // U+0062 U+0313
			[ 'N', 'n̓' ], // U+006E U+0313
			[ 'M', 'm̓' ] // U+006D U+0313
		]
	};
	$.ime.register( lutTulalip );
}( jQuery ) );
