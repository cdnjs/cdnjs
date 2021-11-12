( function ( $ ) {
	'use strict';

	var woAlt = {
		id: 'wo-alt',
		name: 'Wolof Alt',
		description: 'Wolof Alt',
		date: '2017-05-27',
		URL: 'http://github.com/wikimedia/jquery.ime',
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
			[ 'E', 'Ë' ],
			[ 'e', 'ë' ],
			[ 'N', 'Ŋ' ],
			[ 'n', 'ŋ' ],
			[ '/', '́' ], // Combining acute accent
			[ '\\\\', '̀' ] // Combining grave accent
		]
	};

	$.ime.register( woAlt );
}( jQuery ) );
