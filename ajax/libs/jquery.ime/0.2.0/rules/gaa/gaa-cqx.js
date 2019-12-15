( function ( $ ) {
	'use strict';

	var defs = {
		id: 'gaa-cqx',
		name: 'Ga - CQX replacement',
		description: 'Ga input method with C, Q and X replaced by Ŋ, Ɛ and Ɔ',
		date: '2016-06-23',
		URL: 'http://www.kasahorow.org/node/260',
		author: 'Amir E. Aharoni, based on Kasahorow Akan',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 1,
		maxKeyLength: 1,
		patterns: [
			[ 'C', 'Ŋ' ],
			[ 'c', 'ŋ' ],
			[ 'Q', 'Ɛ' ],
			[ 'q', 'ɛ' ],
			[ 'X', 'Ɔ' ],
			[ 'x', 'ɔ' ]
		]
	};

	$.ime.register( defs );
}( jQuery ) );
