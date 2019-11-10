( function ( $ ) {
	'use strict';

	var kyCyrlAlt = {
		id: 'ky-cyrl-alt',
		name: 'Кыргыз Alt',
		description: 'Кыргыз Alt',
		date: '2013-08-10',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Amir (Алексей) Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [],
		patterns_x: [
			[ 'н', 'ң' ],
			[ 'Н', 'Ң' ],
			[ 'о', 'ө' ],
			[ 'О', 'Ө' ],
			[ 'у', 'ү' ],
			[ 'У', 'Ү' ]
		]
	};

	$.ime.register( kyCyrlAlt );
}( jQuery ) );
