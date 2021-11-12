( function ( $ ) {
	'use strict';

	var ffAlt = {
		id: 'ff-alt',
		name: 'Fulfulde Alt',
		description: 'Fulfulde Alt',
		date: '2017-05-30',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 0,
		maxKeyLength: 2,
		patterns: [
			[ 'n~', 'ñ' ],
			[ 'N~', 'Ñ' ],
			[ 'ñ~', 'n~' ],
			[ 'Ñ~', 'N~' ]
		],
		patterns_x: [
			[ 'b', 'ɓ' ],
			[ 'B', 'Ɓ' ],
			[ 'd', 'ɗ' ],
			[ 'D', 'Ɗ' ],
			[ 'g', 'ɠ' ],
			[ 'G', 'Ɠ' ],
			[ 'j', 'ɲ' ],
			[ 'J', 'Ɲ' ],
			[ 'n', 'ŋ' ],
			[ 'N', 'Ŋ' ],
			[ 'y', 'ƴ' ],
			[ 'Y', 'Ƴ' ]
		]
	};

	$.ime.register( ffAlt );
}( jQuery ) );
