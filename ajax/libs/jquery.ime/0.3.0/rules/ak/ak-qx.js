( function ( $ ) {
	'use strict';

	var akQx = {
		id: 'ak-qx',
		name: 'Akan QX replacement',
		description: 'Akan input method with Q and X replaced by Ɛ and Ɔ',
		date: '2016-06-23',
		URL: 'https://www.kasahorow.org/node/260',
		author: 'Amir E. Aharoni, based on Kasahorow',
		license: 'GPLv3',
		version: '1.1',
		patterns: [
			[ '\\\\Q', 'Q' ],
			[ '\\\\q', 'q' ],
			[ '\\\\X', 'X' ],
			[ '\\\\x', 'x' ],
			[ 'Q', 'Ɛ' ],
			[ 'q', 'ɛ' ],
			[ 'X', 'Ɔ' ],
			[ 'x', 'ɔ' ]
		]
	};

	$.ime.register( akQx );
}( jQuery ) );
