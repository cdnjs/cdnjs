( function ( $ ) {
	'use strict';

	var roaTara = {
		id: 'roa-tara-GVU',
		name: 'Tarandine',
		description: 'Tarandine input method.',
		date: '2013-09-01',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'roa-tara.wiki community',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 0,
		maxKeyLength: 2,
		patterns: [
			[ 'a§', 'á' ],
			[ 'o§', 'ó' ],
			[ 'A§', 'Á' ],
			[ 'O§', 'Ó' ]
		]
	};

	$.ime.register( roaTara );
}( jQuery ) );
