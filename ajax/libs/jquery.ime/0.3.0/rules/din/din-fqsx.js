( function ( $ ) {
	'use strict';

	var defs = {
		id: 'din-fqsx',
		name: 'FQSX replacement',
		description: 'Dinka input method with F, Q, S and X replaced by Ɣ, Ŋ, Ɛ, and Ɔ',
		date: '2017-04-26',
		URL: 'https://keymanweb.com/#dib,Keyboard_dinkaweb11',
		author: 'Amir E. Aharoni, based on Keyman',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 2,
		maxKeyLength: 2,
		patterns: [
			[ '\\\\F', 'F' ],
			[ '\\\\f', 'f' ],
			[ '\\\\Q', 'Q' ],
			[ '\\\\q', 'q' ],
			[ '\\\\S', 'S' ],
			[ '\\\\s', 's' ],
			[ '\\\\X', 'X' ],
			[ '\\\\x', 'x' ],
			[ '\\\\;', ';' ],
			[ 'A;', 'Ä' ],
			[ 'a;', 'ä' ],
			[ 'E;', 'Ë' ],
			[ 'e;', 'ë' ],
			[ 'Ɛ;', 'Ɛ̈' ],
			[ 'ɛ;', 'ɛ̈' ],
			[ 'I;', 'Ï' ],
			[ 'i;', 'ï' ],
			[ 'O;', 'Ö' ],
			[ 'o;', 'ö' ],
			[ 'Ɔ;', 'Ɔ̈' ],
			[ 'ɔ;', 'ɔ̈' ],
			[ 'F', 'Ɣ' ],
			[ 'f', 'ɣ' ],
			[ 'Q', 'Ŋ' ],
			[ 'q', 'ŋ' ],
			[ 'S', 'Ɛ' ],
			[ 's', 'ɛ' ],
			[ 'X', 'Ɔ' ],
			[ 'x', 'ɔ' ]
		]
	};

	$.ime.register( defs );
}( jQuery ) );
