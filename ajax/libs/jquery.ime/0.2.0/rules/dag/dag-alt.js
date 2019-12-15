( function ( $ ) {
	'use strict';

	var dagAlt = {
		id: 'dag-alt',
		name: 'Dagbani Alt',
		description: 'Dagbani Alt',
		date: '2017-05-27',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns_x: [
			[ 'E', 'Ɛ' ],
			[ 'e', 'ɛ' ],
			[ 'G', 'Ɣ' ],
			[ 'g', 'ɣ' ],
			[ 'Y', 'Ɣ' ],
			[ 'y', 'ɣ' ],
			[ 'N', 'Ŋ' ],
			[ 'n', 'ŋ' ],
			[ 'O', 'Ɔ' ],
			[ 'o', 'ɔ' ],
			[ 'Z', 'Ʒ' ],
			[ 'z', 'ʒ' ]
		]
	};

	$.ime.register( dagAlt );
}( jQuery ) );
