( function ( $ ) {
	'use strict';

	var defs = {
		id: 'ak-qx',
		name: 'QX replacement',
		description: 'Akan input method with Q and X replaced by Ɛ and Ɔ',
		date: '2016-06-23',
		URL: 'http://www.kasahorow.org/node/260',
		author: 'Amir E. Aharoni, based on Kasahorow',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 1,
		maxKeyLength: 1,
		patterns: [
			[ 'Q', 'Ɛ' ],
			[ 'q', 'ɛ' ],
			[ 'X', 'Ɔ' ],
			[ 'x', 'ɔ' ]
		]
	};

	$.ime.register( defs );
}( jQuery ) );
